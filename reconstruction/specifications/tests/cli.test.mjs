import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFile,mkdtemp,mkdir,writeFile,rm,readdir,symlink} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {targetContext} from '../../derivations/context.mjs';
import {planDerivation} from '../../derivations/plan.mjs';
import {builtinAdapters} from '../../adapters/builtins.mjs';
import {loadSpecification} from '../load.mjs';
const workspace=fileURLToPath(new URL('../../../',import.meta.url));
const cli=join(workspace,'reconstruction/specifications/cli.mjs');
const fixture=join(workspace,'specifications/companion-ecosystem/specifications.json');
const call=(...args)=>spawnSync(process.execPath,[cli,...args],{encoding:'utf8'});
async function temp(t){const root=await mkdtemp(join(tmpdir(),'neutral-cli-'));t.after(()=>rm(root,{recursive:true,force:true}));return root;}
test('CLI validation/discovery/context are actual runnable JSON interfaces',()=>{
  const validation=call('validate',fixture);assert.equal(validation.status,0,validation.stderr);assert.equal(JSON.parse(validation.stdout).valid,true);
  const discovery=call('adapters');assert.equal(discovery.status,0);assert.equal(JSON.parse(discovery.stdout).sources.find(x=>x.id==='android-source').status,'planned');
  const context=call('context',fixture,'--product','mobile-companion','--target','android');assert.equal(context.status,0,context.stderr);const result=JSON.parse(context.stdout);
  assert.equal(result.targetId,'android');assert(result.target.context.requirements.some(x=>x.id==='ux.mobile'));assert(!result.target.context.requirements.some(x=>x.id==='ux.desktop'));
});
test('target retrieval excludes other product targets even when shared invariants exist',async()=>{
  const loaded=await loadSpecification(fixture);const plan=await planDerivation(loaded,{workspace,catalog:builtinAdapters()});
  const context=targetContext(plan,{productId:'mobile-companion',targetId:'android'});assert.equal(context.graph.nodes.filter(x=>x.kind==='target-plan').length,1);assert(!context.graph.nodes.some(x=>x.id==='requirement:ux.desktop'));
  assert.throws(()=>targetContext(plan,{productId:'record-console',targetId:'android'}),{code:'UNKNOWN_PRODUCT_TARGET'});
});
test('CLI creates immutable generic checkpoints and reuses exact prior results',async t=>{
  const root=await temp(t);const first=call('plan',fixture,'--workspace',root,'--run','attempt');assert.equal(first.status,0,first.stderr);
  const second=call('plan',fixture,'--workspace',root,'--run','attempt');assert.equal(second.status,0,second.stderr);assert.equal(first.stdout,second.stdout);
  const files=await readdir(join(root,'runs/companion-ecosystem/attempt'));assert.deepEqual(files.sort(),['derivation-plan.json','documents.json','run.json','specifications.resolved.json']);
  const stored=JSON.parse(await readFile(join(root,'runs/companion-ecosystem/attempt/run.json'),'utf8'));assert.equal(stored.format,'any-shape-derivation-run');assert.match(stored.adapterCatalogHash,/^[a-f0-9]{64}$/);
});
test('generic run cannot overwrite a legacy run with the same directory identity',async t=>{
  const root=await temp(t),dir=join(root,'runs/companion-ecosystem/attempt');await mkdir(dir,{recursive:true});const old='{"format":"any-shape-run","extensionId":"companion-ecosystem"}\n';await writeFile(join(dir,'run.json'),old);
  const result=call('plan',fixture,'--workspace',root,'--run','attempt');assert.equal(result.status,1);assert.equal(JSON.parse(result.stderr).error.code,'OUTPUT_COLLISION');assert.equal(await readFile(join(dir,'run.json'),'utf8'),old);assert.deepEqual(await readdir(dir),['run.json']);
});
test('symlinked output roots, bad CLI options and missing identity selectors fail closed',async t=>{
  const root=await temp(t);await symlink('/tmp',join(root,'runs'));
  const result=call('plan',fixture,'--workspace',root,'--run','attempt');assert.equal(result.status,1);assert.equal(JSON.parse(result.stderr).error.code,'SYMLINK_REJECTED');
  for(const args of [['plan',fixture,'--unknown'],['context',fixture],['plan',fixture,'--run','../escape']])assert.equal(call(...args).status,1);
});
