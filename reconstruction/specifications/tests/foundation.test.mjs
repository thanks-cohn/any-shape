import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,readFile,writeFile,rm,symlink,link,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import {loadSpecification} from '../load.mjs';
import {validateSpecification} from '../validate.mjs';
import {planDerivation} from '../../derivations/plan.mjs';
import {builtinAdapters} from '../../adapters/builtins.mjs';
import {AdapterCatalog} from '../../adapters/registry.mjs';
import {SourceAdapter,TargetAdapter} from '../../adapters/contracts.mjs';
import {specificationFromLegacyEir} from '../../sources/legacy-specification.mjs';
import {AvaloniaTargetAdapter} from '../../targets/avalonia.mjs';
import {AvaloniaAdapter} from '../../extension-pipeline/src/adapter.mjs';
import {acceptContract} from '../../extension-pipeline/src/contract.mjs';
import {analyzeExtension} from '../../extension-pipeline/src/analyze.mjs';
import {digest,json} from '../../core/safety.mjs';
const workspace=fileURLToPath(new URL('../../../',import.meta.url));
const fixture=name=>join(workspace,'specifications',name,'specifications.json');
const cli=join(workspace,'reconstruction/specifications/cli.mjs');
const owner={origin:'owner',reference:'Independent synthetic test declaration.'};
async function base(){return structuredClone((await loadSpecification(fixture('companion-ecosystem'))).specification);}
async function temp(t){const root=await mkdtemp(join(tmpdir(),'source-neutral-'));t.after(()=>rm(root,{recursive:true,force:true}));return root;}
async function put(root,name,value){const path=join(root,name);await mkdir(resolve(path,'..'),{recursive:true});await writeFile(path,json(value));return path;}
const planning=spec=>planDerivation(spec,{workspace,catalog:builtinAdapters()});

for(const name of ['companion-ecosystem','android-adaptation','extension-compatibility']) test(`${name} loads and plans deterministically`,async()=>{
  const loaded=await loadSpecification(fixture(name)),a=await planning(loaded),b=await planning(loaded);
  assert.deepEqual(a,b);assert.equal(a.status,'PLANNED_NOT_IMPLEMENTED');assert.equal(a.releaseEligible,false);assert.deepEqual(a.authorityGranted,[]);
  for(const product of a.products)for(const target of product.targets){assert.equal(target.evaluation.runtime,'NOT_RUN');assert.equal(target.releaseEligible,false);}
});
test('specification-only ecosystem represents distinct new/assistant/companion products without fabricating observations',async()=>{
  const plan=await planning(await base());assert.equal(plan.sources.length,0);assert.deepEqual(plan.products.map(p=>p.relationship),['new','assistant','companion']);
  const browser=plan.products.find(p=>p.productId==='browser-assistant');assert.equal(browser.targets[0].status,'UNSUPPORTED');
  const mobile=plan.products.find(p=>p.productId==='mobile-companion');assert(mobile.targets[0].blockers.some(x=>x.code==='INTEGRATION_REVIEW_REQUIRED'));
  assert.equal(mobile.targets[0].evaluation.mode,'specified-outcomes-and-authorized-interactions');
  assert(plan.graph.nodes.some(x=>x.kind==='integration-contract'&&x.status==='NOT_RUN'));
});
test('metadata-only Android input is explicitly unsupported; no filesystem read is faked',async()=>{
  const plan=await planning((await loadSpecification(fixture('android-adaptation'))));assert.equal(plan.sources[0].status,'UNSUPPORTED');assert.equal(plan.sources[0].adapterId,'android-source');
  assert.equal(plan.sources[0].observations.length,0);assert(!plan.sources[0].sourceHash);
  for(const target of plan.products[0].targets)assert(target.blockers.some(x=>x.code==='SOURCE_PARITY_UNKNOWN'));
});
test('real extension adapter retains original hashes/EIR and does not copy browser permissions into products',async()=>{
  const loaded=await loadSpecification(fixture('extension-compatibility'));const plan=await planning(loaded);const source=plan.sources[0];
  assert.equal(source.status,'OBSERVED');assert.equal(source.sourceHash,loaded.specification.sources[0].contentHash);assert(source.observations.length>0);assert.equal(source.compatibility.contract.schemaVersion,1);
  assert.deepEqual(source.authorityGranted,[]);for(const target of plan.products[0].targets)assert.deepEqual(target.context.targetRequirements.authority,[]);
  assert(plan.graph.nodes.some(x=>x.kind==='observation'));assert(plan.graph.edges.some(x=>x.relationship==='supports-syntax-only'));
});
test('target contexts isolate mobile UX from desktop requirements',async()=>{
  const plan=await planning(await base());const desktop=plan.products[0].targets[0],mobile=plan.products[2].targets[0];
  assert(desktop.context.requirements.some(x=>x.id==='ux.desktop'));assert(!desktop.context.requirements.some(x=>x.id==='ux.mobile'));
  assert(mobile.context.requirements.some(x=>x.id==='ux.mobile'));assert(!mobile.context.requirements.some(x=>x.id==='ux.desktop'));
  assert.notEqual(desktop.candidatePath,mobile.candidatePath);
});
for(const [label,change,code] of [
 ['relationship',s=>s.requestedProducts[0].relationship='clone','INVALID_SPECIFICATION'],
 ['duplicate product',s=>s.requestedProducts.push(s.requestedProducts[0]),'DUPLICATE_ID'],
 ['duplicate source',s=>{const x={id:'a',type:'future',path:'sources/a',contentHash:null,original:{name:'a',version:null},provenance:owner,access:{authorization:'declared',scope:[],reference:null},unknowns:[]};s.sources=[x,x];},'DUPLICATE_ID'],
 ['traversal',s=>s.sources=[{id:'a',type:'future',path:'../private',contentHash:null,original:{name:'a',version:null},provenance:owner,access:{authorization:'declared',scope:[],reference:null},unknowns:[]}],'UNSAFE_RESOURCE'],
 ['source/target mixup',s=>s.requestedProducts[0].sourceIds=['windows'],'UNRESOLVED_REFERENCE'],
 ['product/source mixup',s=>s.requestedProducts[0].relatedProductIds=['original-source'],'UNRESOLVED_REFERENCE'],
 ['conflicting dispositions',s=>s.requestedProducts[0].preserve=['cap.review'],'CONFLICTING_DISPOSITION'],
 ['self derivation',s=>s.requestedProducts[0].relatedProductIds=['record-console'],'SELF_DERIVATION'],
 ['missing companion origin',s=>s.requestedProducts[1].relatedProductIds=[],'MISSING_DERIVATION_ORIGIN'],
 ['incompatible target requirement',s=>s.requestedProducts[0].targets[0].requirements.authority=['ux.mobile'],'REFERENCE_KIND_MISMATCH'],
 ['foreign schema version',s=>s.specificationVersion='99','INVALID_SPECIFICATION'],
 ['unknown safety field',s=>s.autoGrantPermissions=true,'INVALID_SPECIFICATION'],
 ['false accepted observation',s=>{s.review={status:'accepted',reviewer:'test',unresolved:[]};s.requirements[0].claim='accepted';s.requirements[0].provenance.origin='source';},'UNTRUSTED_ACCEPTANCE'],
 ['observed authority',s=>s.requirements.find(x=>x.kind==='authority').claim='observed','AUTHORITY_NOT_GRANTED'],
 ['imported product instruction',s=>s.requestedProducts[0].provenance.origin='source','UNTRUSTED_PRODUCT_REQUEST'],
 ['smuggled authority',s=>{s.interactions[0].authorization={status:'approved',scope:['all'],reviewReference:'source-comment'};s.interactions[0].provenance.origin='source';},'AUTHORITY_NOT_GRANTED'],
 ['missing declared API',s=>s.interactions[0].api.status='declared','MISSING_API_REFERENCE'],
 ['product dependency cycle',s=>s.dependencies=[{id:'depends.a',productId:'record-console',dependsOnProductId:'browser-assistant',reason:'cycle'}],'PRODUCT_DEPENDENCY_CYCLE'],
 ['integration missing peer',s=>s.requestedProducts[2].relationship='integrate','MISSING_INTEGRATION_PEERS'],
]) test(`validation rejects ${label}`,async()=>{const spec=await base();change(spec);assert.throws(()=>validateSpecification(spec),{code});});

test('zero-product inspection jobs remain valid',async()=>{const spec=await base();spec.requestedProducts=[];spec.interactions=[];const plan=await planning(spec);assert.deepEqual(plan.products,[]);});
test('unknown source and target adapters stay explicit gaps',async()=>{
  const spec=(await loadSpecification(fixture('android-adaptation'))).specification;spec.sources[0].type='future-binary';spec.requestedProducts[0].targets[0].adapter='future-ui';
  const plan=await planning(spec);assert.equal(plan.sources[0].status,'UNSUPPORTED');assert.equal(plan.products[0].targets[0].status,'UNSUPPORTED');
});
test('source access denial prevents reading even an invalid physical path',async()=>{
  const spec=(await loadSpecification(fixture('extension-compatibility'))).specification;spec.sources[0].access.authorization='denied';spec.sources[0].path='nonexistent';const plan=await planning(spec);assert.equal(plan.sources[0].status,'DENIED');
});
test('changed source hash is rejected instead of accepting stale provenance',async()=>{
  const spec=(await loadSpecification(fixture('extension-compatibility'))).specification;spec.sources[0].contentHash='0'.repeat(64);await assert.rejects(()=>planning(spec),{code:'SOURCE_HASH_MISMATCH'});
});
test('a reviewed requirement alone does not grant actual API permissions or runtime proof',async()=>{
  const spec=await base();spec.review={status:'accepted',reviewer:'Synthetic test review',unresolved:[]};for(const req of spec.requirements)req.claim='accepted';
  for(const interaction of spec.interactions){interaction.api={status:'declared',reference:'https://example.test/declared-interface'};interaction.authorization={status:'approved',scope:['approved-records'],reviewReference:'synthetic-owner-review'};}
  const plan=await planning(spec);assert.equal(plan.products[0].targets[0].status,'IMPLEMENTATION_REQUIRED');assert.equal(plan.products[2].targets[0].status,'IMPLEMENTATION_REQUIRED');
  assert.deepEqual(plan.authorityGranted,[]);assert.equal(plan.products[2].targets[0].evaluation.permissions,'NOT_RUN');
});
test('legacy translation is reviewable, preserves IDs/hash, and does not auto-approve the old review',async()=>{
  const {contract}=await analyzeExtension(join(workspace,'reconstruction/extension-pipeline/fixtures/popup-basic'),{extensionId:'popup-proof'});
  const accepted=acceptContract(contract,{reviewer:'synthetic',decisions:contract.capabilities.map(x=>({capabilityId:x.id,disposition:'defer',reason:'Only test scaffold compatibility.'}))});
  const spec=specificationFromLegacyEir(accepted);validateSpecification(spec);assert.equal(spec.review.status,'unreviewed');assert.equal(spec.sources[0].access.authorization,'review-required');assert.equal(spec.sources[0].contentHash,contract.source.sha256);
  const bridge=new AvaloniaTargetAdapter(),target={id:'linux'};assert.deepEqual((await bridge.generate({contract:accepted,target})).files,new AvaloniaAdapter().generate(accepted,'linux'));
  assert.equal((await bridge.generate({target})).status,'REVIEW_REQUIRED');
});
test('adapter catalog exposes implementation state and supports new media without schema/core edits',async()=>{
  const catalog=builtinAdapters(),discovery=catalog.discover();assert.equal(discovery.sources.find(x=>x.id==='android-source').status,'planned');assert.equal(discovery.sources.find(x=>x.id==='chrome-extension').status,'implemented');
  discovery.sources[0].types.push('poison');assert(!catalog.discover().sources[0].types.includes('poison'));
  class NewTarget extends TargetAdapter {assess(){return {status:'IMPLEMENTATION_REQUIRED',reason:'Synthetic adapter only; no realization.'};}}
  catalog.register('target',new NewTarget({id:'future-text',kind:'target',version:'1',status:'implemented',types:['text-console'],capabilities:['plan'],limits:['synthetic'],evidence:'this test'}));
  const spec=await base();spec.requestedProducts[0].targets[0]={...spec.requestedProducts[0].targets[0],id:'text-console',adapter:'future-text'};
  const plan=await planDerivation(spec,{workspace,catalog});assert.equal(plan.products[0].targets[0].adapterId,'future-text');assert.notEqual(plan.products[0].targets[0].status,'UNSUPPORTED');
  assert.throws(()=>catalog.register('source',catalog.source('chrome-extension-source')),{code:'DUPLICATE_ADAPTER'});
});
test('namespaced extensions survive validation but cannot silently alter target safety',async()=>{
  const spec=await base();spec.extensions={'org.example.auto-grant':{requested:true}};const validation=validateSpecification(spec);assert.equal(validation.uninterpretedExtensions[0].namespace,'org.example.auto-grant');
  const plan=await planning(spec);for(const product of plan.products)for(const target of product.targets)assert(target.blockers.some(x=>x.code==='UNINTERPRETED_EXTENSION'));
});
test('source-provided root instructions cannot authorize a job',async()=>{const spec=await base();spec.provenance.origin='source';assert.throws(()=>validateSpecification(spec),{code:'UNTRUSTED_JOB_REQUEST'});});
test('source adapters cannot smuggle permissions and target assessments cannot assert runtime PASS',async()=>{
  const spec=(await loadSpecification(fixture('android-adaptation'))).specification;spec.sources[0].type='hostile-source';
  class Hostile extends SourceAdapter {async inspect(){return {status:'OBSERVED',sourceHash:'0'.repeat(64),observations:[],authorityGranted:['all-data']};}}
  const catalog=builtinAdapters();catalog.register('source',new Hostile({id:'hostile',kind:'source',version:'1',status:'implemented',types:['hostile-source'],limits:['test'],evidence:'adversarial fixture',requiresPath:false}));
  await assert.rejects(()=>planDerivation(spec,{workspace,catalog}),{code:'SOURCE_AUTHORITY_SMUGGLING'});
  class FalseProof extends TargetAdapter {assess(){return {status:'PASS'};}}
  catalog.register('target',new FalseProof({id:'false-proof',kind:'target',version:'1',status:'implemented',types:['pretend'],limits:['test'],evidence:'adversarial fixture'}));
  const neutral=await base();neutral.requestedProducts[0].targets[0].id='pretend';neutral.requestedProducts[0].targets[0].adapter='false-proof';await assert.rejects(()=>planDerivation(neutral,{workspace,catalog}),{code:'INVALID_ADAPTER_RESULT'});
});
test('excluded requirements cannot reappear as mandatory target authority',async()=>{const spec=await base();spec.requestedProducts[0].exclude=['authority.read'];assert.throws(()=>validateSpecification(spec),{code:'EXCLUDED_REQUIREMENT_REUSED'});});
test('irrelevant acceptance cases do not cover a product capability',async()=>{const spec=await base();spec.requestedProducts[0].acceptance=['case.mobile'];const plan=await planning(spec);assert(plan.products[0].targets[0].blockers.some(x=>x.code==='ACCEPTANCE_COVERAGE_REQUIRED'&&x.requirementId==='cap.review'));});
test('source and product namespaces remain distinct even for identical numeric slugs',async()=>{
  const spec=(await loadSpecification(fixture('android-adaptation'))).specification;spec.sources[0].id='123';spec.requestedProducts[0].id='123';spec.requestedProducts[0].sourceIds=['123'];
  const plan=await planning(spec);assert(plan.graph.nodes.some(x=>x.id==='source:123'));assert(plan.graph.nodes.some(x=>x.id==='product:123'));
});
test('product execution order is deterministic and places origins before companions',async()=>{
  const spec=await base();spec.requestedProducts.reverse();const plan=await planning(spec);assert.equal(plan.productOrder[0],'record-console');assert(plan.productOrder.indexOf('record-console')<plan.productOrder.indexOf('browser-assistant'));assert(plan.productOrder.indexOf('record-console')<plan.productOrder.indexOf('mobile-companion'));
});
test('declared incompatibilities block only their product/target and remain traceable',async()=>{
  const spec=await base();spec.incompatibilities=[{id:'conflict.desktop',productId:'record-console',targetId:'windows',requirements:['cap.review'],reason:'Synthetic native integration unavailable on this target.'}];
  const plan=await planning(spec);const windows=plan.products[0].targets.find(x=>x.targetId==='windows'),linux=plan.products[0].targets.find(x=>x.targetId==='linux');assert.equal(windows.status,'UNSUPPORTED');assert(windows.blockers.some(x=>x.code==='DECLARED_INCOMPATIBILITY'));assert.notEqual(linux.status,'UNSUPPORTED');
});
test('target-local namespace extensions do not contaminate unrelated product plans',async()=>{
  const spec=await base();spec.requestedProducts[2].targets[0].extensions={'org.example.mobile-policy':{requiresReview:true}};
  const plan=await planning(spec);assert(plan.products[2].targets[0].blockers.some(x=>x.code==='UNINTERPRETED_EXTENSION'));assert(!plan.products[0].targets.some(target=>target.blockers.some(x=>x.code==='UNINTERPRETED_EXTENSION')));
});
test('legacy translation preserves numeric source IDs and maps nonportable capability IDs without changing EIR',async()=>{
  const {contract}=await analyzeExtension(join(workspace,'reconstruction/extension-pipeline/fixtures/popup-basic'),{extensionId:'123'});
  contract.capabilities[0].id='a legacy capability / arbitrary v1 ID';const original=structuredClone(contract);
  const spec=specificationFromLegacyEir(contract);validateSpecification(spec);assert.equal(spec.sources[0].id,'123');assert.match(spec.requirements[0].id,/^legacy-[a-f0-9]+$/);assert.deepEqual(contract,original);
  assert.equal(spec.extensions['org.any-shape.legacy'].capabilityIds[original.capabilities[0].id],spec.requirements[0].id);
});
