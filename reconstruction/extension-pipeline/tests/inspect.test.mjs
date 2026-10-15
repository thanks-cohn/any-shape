import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {inspectExtension} from '../src/inspect.mjs';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
const base=resolve(dirname(fileURLToPath(import.meta.url)),'../fixtures');
test('popup-only extension inventory is deterministic and records references',async()=>{
 const a=await inspectExtension(resolve(base,'popup-basic')),b=await inspectExtension(resolve(base,'popup-basic'));
 assert.deepEqual(a,b); assert.equal(a.formatVersion,1);
 assert.deepEqual(a.permissions.api,['storage']);
 assert(a.surfaces.some(x=>x.kind==='popup' && x.path==='popup.html'));
 assert(a.dependencies.files.every(x=>x.present));
});
test('independent content/background architecture yields explicit compatibility uncertainty',async()=>{
 const x=await inspectExtension(resolve(base,'content-worker'));
 assert(x.surfaces.some(x=>x.kind==='content-script'));
 assert(x.surfaces.some(x=>x.kind==='background-worker'));
 assert(x.findings.some(x=>x.code==='browser_dom_dependency'));
 assert(x.findings.some(x=>x.code==='browser_lifecycle_dependency'));
});
test('invalid manifest fails closed',async()=>{await assert.rejects(()=>inspectExtension(resolve(base,'missing')),/manifest_unreadable_or_invalid/);});
