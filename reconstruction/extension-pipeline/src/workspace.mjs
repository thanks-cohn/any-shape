import {readJSON,immutable} from '../../core/files.mjs';
export {readJSON,immutable};
import {mkdir, readFile, writeFile, readdir, lstat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join, dirname, resolve} from 'node:path';
import {inspectExtension} from './inspect.mjs';
import {analyzeExtension} from './analyze.mjs';
import {validateContract, planContract, foreverMapping} from './contract.mjs';
import {AvaloniaAdapter, TARGETS, verifyCandidate, assertPromotable} from './adapter.mjs';
import {slug, safePath, resourcePath, fail, json, digest, sha256, readTree} from './safety.mjs';

async function engineFingerprint() {
  const files=await readTree(fileURLToPath(new URL('.',import.meta.url)));
  return digest({files:files.map(({content,...file})=>file),lockfile:sha256(await readFile(new URL('../../../package-lock.json',import.meta.url)))});
}

export async function sourceRoot(workspace,id) {
  slug(id);
  try { return await safePath(workspace,['extensions',id,'source']); }
  catch(e) { if (e.code==='ENOENT') fail('SOURCE_NOT_FOUND',`Place authorized unpacked extension files in extensions/${id}/source/.`); throw e; }
}
export async function inspectRegistered(workspace,id) { return inspectExtension(await sourceRoot(workspace,id)); }
export async function analyzeRegistered(workspace,id,runId) {
  const source=await sourceRoot(workspace,id);
  const {inventory,contract}=await analyzeExtension(source,{extensionId:id});
  validateContract(contract);
  const engineHash=await engineFingerprint();
  runId=slug(runId || 'run-'+digest({contract,engineHash}).slice(0,20));
  const relative=`runs/${id}/${runId}`;
  const dir=await safePath(workspace,[relative],{missing:true});
  await mkdir(dir,{recursive:true});
  await safePath(workspace,[relative]);
  const run={engineHash,format:'any-shape-run',schemaVersion:1,extensionId:id,runId,sourceHash:inventory.source.sha256,inventoryHash:digest(inventory),analysisHash:digest(contract),analyzerVersion:1,trust:'Input is untrusted data; static inspection never executes extension source.'};
  // A conflicting run is rejected BEFORE writing any stage files.
  await immutable(dir,'run.json',run);
  for (const [path,value] of Object.entries({'inventory.json':inventory,'eir.json':contract,'plan.json':planContract(contract),'forever-map.json':foreverMapping(contract)})) await immutable(dir,path,value);
  return {runId,path:relative,status:'REVIEW_REQUIRED',sourceHash:run.sourceHash,contractHash:digest(contract),capabilities:contract.capabilities.length};
}
async function getRun(workspace,id,runId,{fresh=true}={}) {
  slug(id); slug(runId);
  const root=await safePath(workspace,['runs',id,runId]);
  const run=await readJSON(join(root,'run.json'));
  if (run.extensionId!==id || run.runId!==runId) fail('RUN_ID_MISMATCH','Run identity differs from directory.');
  const inventory=await readJSON(join(root,'inventory.json'));
  const original=await readJSON(join(root,'eir.json'));
  validateContract(original);
  if (digest(original)!==run.analysisHash || digest(inventory)!==run.inventoryHash || inventory.source.sha256!==run.sourceHash) fail('RUN_TAMPERED','Stored intake or analysis no longer matches the run manifest.');
  if (fresh && (await inspectRegistered(workspace,id)).source.sha256!==run.sourceHash) fail('SOURCE_CHANGED','Source changed since analysis; start a new run.');
  return {root,run,original};
}
function sameObservations(original,contract) {
  for (const field of ['extensionId','source','inventoryHash','observations','resourceGraph','unknowns']) if (digest(original[field])!==digest(contract[field])) fail('SOURCE_EVIDENCE_CHANGED',`Reviewed contract changed immutable ${field}. Re-analyze source instead.`);
  const originalIds=original.capabilities.map(x=>x.id).sort();
  if (digest(originalIds)!==digest(contract.capabilities.map(x=>x.id).sort())) fail('CAPABILITY_SET_CHANGED','Review must decide every discovered capability; adding new capability derivations requires analyzer support.');
}
export async function reviewRegistered(workspace,id,runId,contractPath) {
  const {root,run,original}=await getRun(workspace,id,runId);
  const contract=await readJSON(resolve(contractPath));
  validateContract(contract,{accepted:true});
  sameObservations(original,contract);
  const hash=digest(contract);
  await immutable(root,`contracts/${hash}.json`,contract);
  await immutable(root,`reviews/${hash}.json`,{status:'CONTRACT_REVIEWED',contractHash:hash,sourceHash:run.sourceHash,reviewer:contract.review.reviewer,note:'Local reviewer assertion; not authenticated or release/evaluator approval.'});
  return {runId,contractHash:hash,path:`contracts/${hash}.json`,status:'CONTRACT_REVIEWED'};
}
async function reviewed(workspace,id,runId,hash) {
  if (!/^[a-f0-9]{64}$/.test(hash||'')) fail('CONTRACT_HASH_REQUIRED','Provide the 64-character reviewed contract hash.');
  const context=await getRun(workspace,id,runId);
  const contract=await readJSON(join(context.root,'contracts',hash+'.json'));
  validateContract(contract,{accepted:true});
  sameObservations(context.original,contract);
  if (digest(contract)!==hash) fail('CONTRACT_TAMPERED','Reviewed contract hash mismatch.');
  const approval=await readJSON(join(context.root,'reviews',hash+'.json'));
  if (approval.contractHash!==hash || approval.sourceHash!==context.run.sourceHash) fail('INVALID_REVIEW','Review checkpoint mismatch.');
  return {...context,contract};
}
export async function planRegistered(workspace,id,runId,hash) {
  const context=hash?await reviewed(workspace,id,runId,hash):await getRun(workspace,id,runId);
  return planContract(context.contract||context.original);
}
export async function generateRegistered(workspace,id,runId,hash) {
  const {root,contract}=await reviewed(workspace,id,runId,hash);
  const adapter=new AvaloniaAdapter(),products={};
  for (const target of TARGETS) {
    const files=adapter.generate(contract,target);
    const candidate=`candidates/${target}`;
    for (const [path,content] of Object.entries(files)) await immutable(root,`${candidate}/${path}`,content,{raw:true});
    products[target]={path:candidate,status:'INCOMPLETE',files:Object.fromEntries(Object.entries(files).map(([path,content])=>[path,sha256(content)]))};
  }
  const report={format:'any-shape-generation',schemaVersion:1,engineHash:await engineFingerprint(),contractHash:hash,products,releaseEligible:false};
  await immutable(root,'generation.json',report);
  return report;
}
export async function verifyRegistered(workspace,id,runId,target,{build=false}={}) {
  if (!TARGETS.includes(target)) fail('INVALID_TARGET','Expected windows, linux or android.');
  const {root}=await getRun(workspace,id,runId);
  const generation=await readJSON(join(root,'generation.json'));
  const context=await reviewed(workspace,id,runId,generation.contractHash);
  const candidate=await safePath(root,['candidates',target]);
  const evidence=await verifyCandidate(candidate,target,{build});
  evidence.generationEngineHash=generation.engineHash;
  evidence.verificationEngineHash=await engineFingerprint();
  if (evidence.contractHash!==digest(context.contract) || evidence.sourceExtensionHash!==context.run.sourceHash) fail('EVIDENCE_MISMATCH','Candidate source/contract provenance differs from run.');
  const name=`evidence/${target}/${digest(evidence)}.json`;
  await immutable(root,name,evidence);
  return {...evidence,evidencePath:name};
}
export async function releaseRegistered(workspace,id,runId,target,evidenceHash) {
  if (!TARGETS.includes(target)) fail('INVALID_TARGET','Expected windows, linux or android.');
  if (!/^[a-f0-9]{64}$/.test(evidenceHash||'')) fail('EVIDENCE_REQUIRED','Provide the target evidence hash.');
  const {root}=await getRun(workspace,id,runId);
  const product=await readJSON(join(root,'candidates',target,'product.json'));
  const evidence=await readJSON(join(root,'evidence',target,evidenceHash+'.json'));
  if (digest(evidence)!==evidenceHash) fail('EVIDENCE_MISMATCH','Evidence hash mismatch.');
  assertPromotable(product,evidence);
}
export async function statusRegistered(workspace,id,runId) {
  const {root,run}=await getRun(workspace,id,runId,{fresh:false});
  const exists=async path=>{try{await safePath(root,[path]);return true;}catch(e){if(e.code==='ENOENT')return false;throw e;}};
  const reviews=await exists('reviews')?await readdir(join(root,'reviews')):[];
  const candidates={};
  for (const target of TARGETS) candidates[target]=await exists(`candidates/${target}/product.json`)?await readJSON(join(root,'candidates',target,'product.json')):{status:'NOT_RUN'};
  let sourceStatus='UNKNOWN';
  try {sourceStatus=(await inspectRegistered(workspace,id)).source.sha256===run.sourceHash?'UNCHANGED':'CHANGED';}catch(e){sourceStatus=e.code||'SOURCE_UNAVAILABLE';}
  const evidenceReports={};
  for (const target of TARGETS) {
    evidenceReports[target]=[];
    if (await exists(`evidence/${target}`)) for (const name of (await readdir(join(root,'evidence',target))).sort()) {
      if (!/^[a-f0-9]{64}\.json$/.test(name)) fail('INVALID_EVIDENCE_FILE','Unexpected evidence filename.');
      const evidence=await readJSON(join(root,'evidence',target,name));
      if (digest(evidence)!==name.slice(0,-5)||evidence.target!==target) fail('EVIDENCE_MISMATCH','Target evidence integrity check failed.');
      evidenceReports[target].push({hash:name.slice(0,-5),candidateHash:evidence.sourceHash,checks:Object.fromEntries(Object.entries(evidence.checks).map(([key,value])=>[key,value.status]))});
    }
  }
  return {...run,sourceStatus,evidenceReports,reviewedContracts:reviews.map(x=>x.replace(/\.json$/,'')),targets:candidates,release:'BLOCKED: no trusted independent evaluator configured'};
}

export async function recordFailure(workspace,id,runId,error) {
  const {root}=await getRun(workspace,id,runId,{fresh:false});
  const report={format:'any-shape-stage-failure',schemaVersion:1,extensionId:id,runId,...error};
  await immutable(root,`failures/${digest(report)}.json`,report);
}
