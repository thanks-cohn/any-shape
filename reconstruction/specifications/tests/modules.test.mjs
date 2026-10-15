import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,readFile,writeFile,rm,symlink,link} from 'node:fs/promises';
import {join,dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
import {loadSpecification} from '../load.mjs';
import {json,sha256} from '../../core/safety.mjs';
const fixture=fileURLToPath(new URL('../../../specifications/companion-ecosystem/specifications.json',import.meta.url));
async function setup(t){const root=await mkdtemp(join(tmpdir(),'modular-job-'));t.after(()=>rm(root,{recursive:true,force:true}));const resolved=(await loadSpecification(fixture)).specification;resolved.modules=[];return {root,spec:structuredClone(resolved)};}
async function write(root,path,data){await mkdir(dirname(join(root,path)),{recursive:true});const content=json(data);await writeFile(join(root,path),content);return sha256(content);}
const mod=(id,extra={})=>({moduleVersion:'0.1',moduleId:id,...extra});
const reference=(id,path,hash=null)=>({id,path,sha256:hash});

test('nested root-relative module references are deterministic, hash-bound and deduplicated',async t=>{
  const {root,spec}=await setup(t);const shared=await write(root,'shared.json',mod('shared'));
  const a=await write(root,'nested/a.json',mod('a',{modules:[reference('shared','shared.json',shared)]}));
  const b=await write(root,'b.json',mod('b',{modules:[reference('shared','shared.json',shared)]}));
  spec.modules=[reference('b','b.json',b),reference('a','nested/a.json',a)];await write(root,'specifications.json',spec);
  const first=await loadSpecification(join(root,'specifications.json'));assert.equal(first.documents.length,4);assert(first.documents.filter(x=>x.moduleId).every(x=>x.pinned));
  const again=await loadSpecification(join(root,'specifications.json'),{limits:{files:4}});assert.deepEqual(first,again);
  spec.modules.reverse();await write(root,'specifications.json',spec);const reordered=await loadSpecification(join(root,'specifications.json'));assert.deepEqual(first.specification,reordered.specification);assert.notEqual(first.bundleHash,reordered.bundleHash);
});
test('mutated pinned module cannot be silently reinterpreted',async t=>{
  const {root,spec}=await setup(t);const hash=await write(root,'domain.json',mod('domain'));spec.modules=[reference('domain','domain.json',hash)];await write(root,'specifications.json',spec);await write(root,'domain.json',mod('domain',{extensions:{'org.example.note':{changed:true}}}));
  await assert.rejects(()=>loadSpecification(join(root,'specifications.json')),{code:'MODULE_HASH_MISMATCH'});
});
test('module cycle is rejected without recursive looping',async t=>{
  const {root,spec}=await setup(t);await write(root,'a.json',mod('a',{modules:[reference('b','b.json')]}));await write(root,'b.json',mod('b',{modules:[reference('a','a.json')]}));spec.modules=[reference('a','a.json')];await write(root,'specifications.json',spec);
  await assert.rejects(()=>loadSpecification(join(root,'specifications.json')),{code:'MODULE_CYCLE'});
});
test('module identity aliases and conflicting pins are rejected',async t=>{
  const {root,spec}=await setup(t);await write(root,'a.json',mod('a'));spec.modules=[reference('a','a.json'),reference('a','a.json','0'.repeat(64))];await write(root,'specifications.json',spec);
  await assert.rejects(()=>loadSpecification(join(root,'specifications.json')),{code:'MODULE_REFERENCE_CONFLICT'});
});
test('different files cannot claim one module ID',async t=>{
  const {root,spec}=await setup(t);await write(root,'a.json',mod('same'));await write(root,'b.json',mod('same'));spec.modules=[reference('same','a.json'),reference('same','b.json')];await write(root,'specifications.json',spec);
  await assert.rejects(()=>loadSpecification(join(root,'specifications.json')),{code:'DUPLICATE_MODULE_ID'});
});
test('module contents cannot claim an unexpected identity',async t=>{const {root,spec}=await setup(t);await write(root,'a.json',mod('not-a'));spec.modules=[reference('a','a.json')];await write(root,'specifications.json',spec);await assert.rejects(()=>loadSpecification(join(root,'specifications.json')),{code:'MODULE_ID_MISMATCH'});});
for(const path of ['../escape.json','/etc/private.json','https://example.test/job.json','%2e%2e/private.json','a/../private.json'])test(`unsafe modular reference ${path} is rejected`,async t=>{const {root,spec}=await setup(t);spec.modules=[reference('bad',path)];await write(root,'specifications.json',spec);await assert.rejects(()=>loadSpecification(join(root,'specifications.json')),{code:'UNSAFE_RESOURCE'});});
test('symlinked module ancestor and hard-linked documents are rejected',async t=>{
  const {root,spec}=await setup(t);const external=join(root,'external');await mkdir(external);await write(root,'external/a.json',mod('a'));await symlink(external,join(root,'modules'));spec.modules=[reference('a','modules/a.json')];await write(root,'specifications.json',spec);
  await assert.rejects(()=>loadSpecification(join(root,'specifications.json')),{code:'SYMLINK_REJECTED'});
  await link(join(root,'external/a.json'),join(root,'linked.json'));spec.modules=[reference('a','linked.json')];await write(root,'specifications.json',spec);await assert.rejects(()=>loadSpecification(join(root,'specifications.json')),{code:'UNSAFE_SPECIFICATION_FILE'});
});
test('duplicate requirements across modules conflict; no implicit override precedence',async t=>{
  const {root,spec}=await setup(t);await write(root,'domain.json',mod('domain',{requirements:[spec.requirements[0]]}));spec.modules=[reference('domain','domain.json')];await write(root,'specifications.json',spec);await assert.rejects(()=>loadSpecification(join(root,'specifications.json')),{code:'DUPLICATE_ID'});
});
test('extension namespace conflicts do not override root behavior',async t=>{
  const {root,spec}=await setup(t);spec.extensions={'org.example.policy':{value:'root'}};await write(root,'domain.json',mod('domain',{extensions:{'org.example.policy':{value:'module'}}}));spec.modules=[reference('domain','domain.json')];await write(root,'specifications.json',spec);await assert.rejects(()=>loadSpecification(join(root,'specifications.json')),{code:'MODULE_EXTENSION_CONFLICT'});
});
test('accepted modular jobs need immutable module pins',async t=>{
  const {root,spec}=await setup(t);spec.review={status:'accepted',reviewer:'Synthetic owner',unresolved:[]};await write(root,'domain.json',mod('domain'));spec.modules=[reference('domain','domain.json')];await write(root,'specifications.json',spec);await assert.rejects(()=>loadSpecification(join(root,'specifications.json')),{code:'UNPINNED_MODULE'});
});
test('module count, bytes, JSON complexity and reference depth budgets are enforced',async t=>{
  const {root,spec}=await setup(t);await write(root,'a.json',mod('a',{modules:[reference('b','b.json')]}));await write(root,'b.json',mod('b'));spec.modules=[reference('a','a.json')];await write(root,'specifications.json',spec);const path=join(root,'specifications.json');
  for(const limits of [{files:1},{fileBytes:10},{totalBytes:10},{nodes:2},{depth:1},{jsonDepth:1}])await assert.rejects(()=>loadSpecification(path,{limits}),{code:'SPECIFICATION_LIMIT'});
});
test('unknown module fields and safety-critical root fields fail schema validation',async t=>{
  const {root,spec}=await setup(t);await write(root,'domain.json',mod('domain',{grants:['root']}));spec.modules=[reference('domain','domain.json')];await write(root,'specifications.json',spec);await assert.rejects(()=>loadSpecification(join(root,'specifications.json')),{code:'INVALID_SPECIFICATION'});
});
