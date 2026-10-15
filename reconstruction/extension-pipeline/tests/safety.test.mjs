import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,symlink,link,rm,readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {inspectExtension} from '../src/inspect.mjs';
import {slug,resourcePath,readTree,digest} from '../src/safety.mjs';
const manifest={manifest_version:3,name:'Synthetic',version:'1.0',action:{default_popup:'ui/popup.html'}};
async function source(t,change={}) {
  const root=await mkdtemp(join(tmpdir(),'pipeline-safety-')); t.after(()=>rm(root,{recursive:true,force:true}));
  await mkdir(join(root,'ui'));await writeFile(join(root,'manifest.json'),JSON.stringify({...manifest,...change}));await writeFile(join(root,'ui/popup.html'),'<h1>safe</h1>');return root;
}
for (const value of ['../escape','Upper','a/b','a\\b','con','com1','lpt9','','a--b','a-','-a','a'.repeat(65)]) test(`slug rejects ${JSON.stringify(value)}`,()=>assert.throws(()=>slug(value),{code:'INVALID_ID'}));
for (const value of ['../x','a/../x','/tmp/x','a\\x','https://example.test/x','%2e%2e/x','a?b','a#b','a\0b','a//b','./a','a./b']) test(`resource rejects ${JSON.stringify(value)}`,()=>assert.throws(()=>resourcePath(value),{code:'UNSAFE_RESOURCE'}));
test('inventory hashes every file and never evaluates extension code',async t=>{
  const root=await source(t);await writeFile(join(root,'danger.js'),'throw new Error("must never execute");');
  const before=await readTree(root),a=await inspectExtension(root),b=await inspectExtension(root);
  assert.deepEqual(a,b);assert.equal(a.files.length,3);assert.deepEqual(before,await readTree(root));
  await writeFile(join(root,'danger.js'),'changed');assert.notEqual((await inspectExtension(root)).source.sha256,a.source.sha256);
});
test('symlinked ancestor directory cannot escape',async t=>{
  const root=await source(t),outside=await source(t);await rm(join(root,'ui'),{recursive:true});await symlink(join(outside,'ui'),join(root,'ui'));
  await assert.rejects(()=>inspectExtension(root),{code:'SYMLINK_REJECTED'});
});
test('manifest and unused resource symlinks fail closed',async t=>{
  const root=await source(t);await symlink('/etc/passwd',join(root,'unused.txt'));await assert.rejects(()=>inspectExtension(root),{code:'SYMLINK_REJECTED'});
});
test('hardlinks fail closed',async t=>{const root=await source(t);await link(join(root,'ui/popup.html'),join(root,'other.html'));await assert.rejects(()=>inspectExtension(root),{code:'HARDLINK_REJECTED'});});
test('case-insensitive file collisions are rejected',async t=>{const root=await source(t);await writeFile(join(root,'UI'),'x');await assert.rejects(()=>inspectExtension(root),{code:'PATH_COLLISION'});});
test('file count and size budgets are enforced before reading',async t=>{const root=await source(t);await assert.rejects(()=>inspectExtension(root,{limits:{files:1}}),{code:'INPUT_LIMIT'});await assert.rejects(()=>inspectExtension(root,{limits:{fileBytes:1}}),{code:'INPUT_LIMIT'});});
for (const change of [{manifest_version:4},{permissions:{}},{permissions:[3]},{background:'x'},{content_scripts:[null]},{action:{default_popup:'../outside'}},{icons:{16:'/tmp/x'}},{version:'1.beta'}]) test(`malformed manifest rejects ${JSON.stringify(change)}`,async t=>{const root=await source(t,change);await assert.rejects(()=>inspectExtension(root));});
test('missing files remain findings, not invented source behavior',async t=>{const root=await source(t,{options_page:'missing.html'});const x=await inspectExtension(root);assert(x.findings.some(x=>x.code==='resource_missing_or_unsafe'));});
