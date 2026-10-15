import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,cp,writeFile,rm,readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {analyzeExtension} from '../src/analyze.mjs';
import {validateContract,acceptContract,planContract,foreverMapping} from '../src/contract.mjs';
import {digest} from '../src/safety.mjs';
const fixture=name=>fileURLToPath(new URL('../fixtures/'+name,import.meta.url));
for (const name of ['popup-basic','content-worker','download-manager']) test(`${name}: deterministic validated EIR with target matrices`,async()=>{
  const a=await analyzeExtension(fixture(name),{extensionId:name}),b=await analyzeExtension(fixture(name),{extensionId:name});
  assert.deepEqual(a,b);assert(validateContract(a.contract).valid);assert(a.contract.capabilities.length>0);
  assert(a.contract.unknowns.some(x=>x.code==='STATIC_ANALYSIS_LIMIT'));
  assert.equal(planContract(a.contract).targets.android.status,'REVIEW_REQUIRED');
  assert.deepEqual(Object.keys(a.contract.capabilities[0].targets),['windows','linux','android']);
  assert.equal(foreverMapping(a.contract).concepts.implementation.length,0);
});
test('HTML and JS parsers trace imports, storage, messages, events and UI without inventing behavior',async()=>{
  const {contract}=await analyzeExtension(fixture('download-manager'),{extensionId:'queue'});
  const apis=contract.observations.filter(x=>x.kind==='browser-api').map(x=>x.detail.api);
  for (const api of ['chrome.downloads.download','chrome.storage.local.set','chrome.runtime.sendMessage','chrome.alarms.onAlarm.addListener']) assert(apis.includes(api),api);
  assert(contract.resourceGraph.some(x=>x.from==='ui/options.js'&&x.to==='policy.js'&&x.present));
  assert(contract.observations.some(x=>x.kind==='ui-element'&&x.detail.tag==='input'));
  assert(!contract.unknowns.some(x=>x.code==='UNSAFE_RESOURCE_REFERENCE'));
});
test('browser DOM powers stay unsupported in every native target',async()=>{
  const {contract}=await analyzeExtension(fixture('content-worker'),{extensionId:'coupled'});
  const cap=contract.capabilities.find(x=>x.description.includes('content-script'));
  for (const target of Object.values(cap.targets)) assert.equal(target.support,'unsupported');
});
test('computed calls, parse errors and unsafe resources stay explicit unknowns',async t=>{
  const root=await mkdtemp(join(tmpdir(),'pipeline-analysis-'));t.after(()=>rm(root,{recursive:true,force:true}));await cp(fixture('popup-basic'),root,{recursive:true});
  await writeFile(join(root,'unknown.js'),`chrome.tabs[method](); fetch(url); import('../../../etc/passwd');`);
  await writeFile(join(root,'broken.js'),'function {');
  const {contract}=await analyzeExtension(root,{extensionId:'unknown'});
  for (const code of ['DYNAMIC_CALL','PARSE_ERROR','UNSAFE_RESOURCE_REFERENCE']) assert(contract.unknowns.some(x=>x.code===code),code);
  assert(contract.observations.some(x=>x.kind==='network-call'&&x.detail.destination===null));
});
test('schema rejects extensions outside namespaces, unresolved references and wrong target enums',async()=>{
  const {contract}=await analyzeExtension(fixture('popup-basic'),{extensionId:'sample'});
  const bad=structuredClone(contract);bad.capabilities[0].evidence=['nonexistent'];assert.throws(()=>validateContract(bad),{code:'INVALID_REFERENCE'});
  const unknown=structuredClone(contract);unknown.extensions.random={};assert.throws(()=>validateContract(unknown),{code:'INVALID_EIR'});
  const target=structuredClone(contract);target.capabilities[0].targets.android.support='PASS';assert.throws(()=>validateContract(target),{code:'INVALID_EIR'});
  const dupe=structuredClone(contract);dupe.capabilities.push(dupe.capabilities[0]);assert.throws(()=>validateContract(dupe),{code:'DUPLICATE_ID'});
});
test('review requires every capability, identity, and acceptance requirements for preserved behavior',async()=>{
  const {contract}=await analyzeExtension(fixture('popup-basic'),{extensionId:'sample'});
  assert.throws(()=>validateContract(contract,{accepted:true}),{code:'REVIEW_REQUIRED'});
  assert.throws(()=>acceptContract(contract,{reviewer:'owner',decisions:[]}),{code:'INVALID_REVIEW'});
  const decisions=contract.capabilities.map(cap=>({capabilityId:cap.id,disposition:'defer',reason:'Need runtime evidence.'}));
  const reviewed=acceptContract(contract,{reviewer:'fixture-reviewer',decisions});assert.equal(reviewed.review.status,'accepted');
  assert.equal(contract.review.status,'unreviewed');
  decisions[0].disposition='preserve';assert.throws(()=>acceptContract(contract,{reviewer:'owner',decisions}),{code:'INCOMPLETE_REQUIREMENTS'});
});
