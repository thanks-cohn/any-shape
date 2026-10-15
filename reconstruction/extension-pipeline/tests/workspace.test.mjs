import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,cp,readFile,writeFile,rm,symlink,access} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {analyzeRegistered,reviewRegistered,planRegistered,generateRegistered,verifyRegistered,statusRegistered,releaseRegistered,readJSON} from '../src/workspace.mjs';
import {acceptContract} from '../src/contract.mjs';
import {digest,json} from '../src/safety.mjs';
import {TARGETS,RELEASE_CHECKS,lintArchitecture,assertPromotable} from '../src/adapter.mjs';
const fixture=fileURLToPath(new URL('../fixtures/download-manager',import.meta.url));
const cli=fileURLToPath(new URL('../bin/any-shape.mjs',import.meta.url));
async function setup(t,id='unseen-queue') {
  const root=await mkdtemp(join(tmpdir(),'pipeline-workspace-'));t.after(()=>rm(root,{recursive:true,force:true}));
  await mkdir(join(root,'extensions',id),{recursive:true});await cp(fixture,join(root,'extensions',id,'source'),{recursive:true});
  return {root,id};
}
async function review(root,id,runId) {
  const original=await readJSON(join(root,'runs',id,runId,'eir.json'));
  const reviewed=acceptContract(original,{reviewer:'Synthetic fixture reviewer (not release approval)',decisions:original.capabilities.map(x=>({capabilityId:x.id,disposition:'defer',reason:'Need behavioral observations before implementing.'}))});
  const file=join(root,'reviewed.json');await writeFile(file,json(reviewed));return reviewRegistered(root,id,runId,file);
}
test('end-to-end: unseen slug -> safe intake -> explicit review -> three isolated skeletons -> fail-closed release',async t=>{
  const {root,id}=await setup(t);const first=await analyzeRegistered(root,id);const repeat=await analyzeRegistered(root,id);
  assert.deepEqual(first,repeat);const runId=first.runId;
  await assert.rejects(()=>generateRegistered(root,id,runId,null),{code:'CONTRACT_HASH_REQUIRED'});
  const accepted=await review(root,id,runId);assert.equal(accepted.status,'CONTRACT_REVIEWED');
  const plan=await planRegistered(root,id,runId,accepted.contractHash);assert.equal(plan.targets.android.status,'IMPLEMENTATION_REQUIRED');
  const generated=await generateRegistered(root,id,runId,accepted.contractHash);assert.deepEqual(await generateRegistered(root,id,runId,accepted.contractHash),generated);
  for (const target of TARGETS) {
    const evidence=await verifyRegistered(root,id,runId,target);
    assert.equal(evidence.target,target);assert.equal(evidence.checks.architecture.status,'PASS');assert.equal(evidence.checks.build.status,'NOT_RUN');
    assert.equal(evidence.checks.launch.status,'NOT_RUN');assert.equal(evidence.releaseEligible,false);
    const hash=evidence.evidencePath.split('/').at(-1).replace('.json','');
    await assert.rejects(()=>releaseRegistered(root,id,runId,target,hash),{code:'INCOMPLETE_CANDIDATE'});
    const dir=join(root,'runs',id,runId,'candidates',target);
    const project=await readFile(join(dir,'Candidate.csproj'),'utf8');assert(!project.includes('../'));assert(project.includes(target==='android'?'Avalonia.Android':'Avalonia.Desktop'));
  }
  await assert.rejects(()=>access(join(root,'productions')),{code:'ENOENT'});
  const status=await statusRegistered(root,id,runId);assert.equal(status.sourceStatus,'UNCHANGED');assert.equal(status.targets.android.status,'INCOMPLETE');
});
test('source changes invalidate generation and review while history remains readable',async t=>{
  const {root,id}=await setup(t);const run=await analyzeRegistered(root,id,'attempt-one');const accepted=await review(root,id,run.runId);
  await writeFile(join(root,'extensions',id,'source','policy.js'),'export const isPermitted = () => false;');
  await assert.rejects(()=>generateRegistered(root,id,run.runId,accepted.contractHash),{code:'SOURCE_CHANGED'});
  assert.equal((await statusRegistered(root,id,run.runId)).sourceStatus,'CHANGED');
  await assert.rejects(()=>analyzeRegistered(root,id,run.runId),{code:'OUTPUT_COLLISION'});
  const next=await analyzeRegistered(root,id);assert.notEqual(next.sourceHash,run.sourceHash);
});
test('review cannot rewrite original observations or source identity',async t=>{
  const {root,id}=await setup(t);const run=await analyzeRegistered(root,id);await review(root,id,run.runId);
  const file=join(root,'reviewed.json'),contract=await readJSON(file);contract.observations[0].detail={fake:'observed'};await writeFile(file,json(contract));
  await assert.rejects(()=>reviewRegistered(root,id,run.runId,file),{code:'SOURCE_EVIDENCE_CHANGED'});
});
test('tampered checkpoints and symlinked run outputs are rejected',async t=>{
  const {root,id}=await setup(t);await mkdir(join(root,'runs'));await symlink('/tmp',join(root,'runs',id));
  await assert.rejects(()=>analyzeRegistered(root,id),{code:'SYMLINK_REJECTED'});
  await rm(join(root,'runs',id));const run=await analyzeRegistered(root,id);const file=join(root,'runs',id,run.runId,'eir.json');const eir=await readJSON(file);eir.source.name='tampered';await writeFile(file,json(eir));
  await assert.rejects(()=>planRegistered(root,id,run.runId),{code:'RUN_TAMPERED'});
});
test('architecture gate catches OS APIs and invalid project edges, independently for each target',async t=>{
  const {root,id}=await setup(t);const run=await analyzeRegistered(root,id);const accepted=await review(root,id,run.runId);await generateRegistered(root,id,run.runId,accepted.contractHash);
  const base=join(root,'runs',id,run.runId,'candidates');
  await writeFile(join(base,'android','Leak.cs'),'using Microsoft.Win32;');
  assert.equal((await lintArchitecture(join(base,'android'),'android')).status,'FAIL');
  assert.equal((await lintArchitecture(join(base,'linux'),'linux')).status,'PASS');
  await writeFile(join(base,'linux','Domain','Leak.cs'),'using Avalonia; using System.IO;');
  assert.equal((await lintArchitecture(join(base,'linux'),'linux')).status,'FAIL');
  await writeFile(join(base,'windows','Evil.csproj'),'<Project><ProjectReference Include="../android/Candidate.csproj" /></Project>');
  assert.equal((await lintArchitecture(join(base,'windows'),'windows')).status,'FAIL');
});
test('cross-target evidence and forged all-PASS records never permit promotion',()=>{
  const product={status:'IMPLEMENTED',releaseEligible:true,target:'android',contractHash:'contract',sourceHash:'source'};
  const evidence={target:'windows',contractHash:'contract',sourceExtensionHash:'source',checks:Object.fromEntries(RELEASE_CHECKS.map(x=>[x,{status:'PASS'}]))};
  assert.throws(()=>assertPromotable(product,evidence),{code:'EVIDENCE_MISMATCH'});
  evidence.target='android';evidence.checks.effects.status='UNKNOWN';assert.throws(()=>assertPromotable(product,evidence),{code:'RELEASE_GATE_FAILED'});
  evidence.checks.effects.status='PASS';assert.throws(()=>assertPromotable(product,evidence),{code:'EVALUATOR_NOT_CONFIGURED'});
});
test('CLI emits structured errors and resumable run IDs',async t=>{
  const {root,id}=await setup(t);
  const call=(...args)=>spawnSync(process.execPath,[cli,...args,'--workspace',root],{encoding:'utf8'});
  const a=call('run',id);assert.equal(a.status,0,a.stderr);const result=JSON.parse(a.stdout);assert.equal(result.status,'REVIEW_REQUIRED');
  const b=call('status',id,result.runId);assert.equal(b.status,0,b.stderr);assert.equal(JSON.parse(b.stdout).targets.linux.status,'NOT_RUN');
  const bad=call('inspect','../escape');assert.equal(bad.status,1);assert.equal(JSON.parse(bad.stderr).error.code,'INVALID_ID');
  const unknown=call('inspect',id,'--wat');assert.equal(JSON.parse(unknown.stderr).error.code,'INVALID_ARGUMENT');
});
test('resumed orchestration verifies every target and retains stage failures',async t=>{
  const {root,id}=await setup(t);const run=await analyzeRegistered(root,id);const accepted=await review(root,id,run.runId);
  const call=(...args)=>spawnSync(process.execPath,[cli,...args,'--workspace',root],{encoding:'utf8'});
  const result=call('run',id,run.runId,'--contract',accepted.contractHash);assert.equal(result.status,0,result.stderr);
  const report=JSON.parse(result.stdout);assert.deepEqual(Object.keys(report.targets),TARGETS);
  for (const target of TARGETS) assert.equal(report.targets[target].checks.build.status,'NOT_RUN');
  const invalid=call('generate',id,run.runId);assert.equal(invalid.status,1);
  const error=JSON.parse(invalid.stderr).error;assert.equal(error.stage,'generate');assert.equal(error.code,'CONTRACT_HASH_REQUIRED');
  const {readdir}=await import('node:fs/promises');const failures=await readdir(join(root,'runs',id,run.runId,'failures'));assert(failures.length>0);
  const status=await statusRegistered(root,id,run.runId);assert.equal(status.evidenceReports.android[0].checks.build,'NOT_RUN');
});
