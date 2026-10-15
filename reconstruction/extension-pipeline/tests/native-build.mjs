// Opt-in real compiler integration. Run with test:pipeline:native after SDK setup.
// These checks establish scaffold compilation, never extension equivalence.
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm,appendFile} from 'node:fs/promises';
import {join,dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
import {analyzeExtension} from '../src/analyze.mjs';
import {acceptContract} from '../src/contract.mjs';
import {AvaloniaAdapter,verifyCandidate} from '../src/adapter.mjs';

test('real .NET compiler builds Linux/Windows hosts and detects broken generated C#',async t=>{
  const root=await mkdtemp(join(tmpdir(),'pipeline-native-'));t.after(()=>rm(root,{recursive:true,force:true}));
  const {contract}=await analyzeExtension(fileURLToPath(new URL('../fixtures/popup-basic',import.meta.url)),{extensionId:'neutral-host-proof'});
  const accepted=acceptContract(contract,{reviewer:'Synthetic scaffold test (not release approval)',decisions:contract.capabilities.map(c=>({capabilityId:c.id,disposition:'defer',reason:'Only exercise compiler integration.'}))});
  for (const target of ['linux','windows']) {
    const dir=join(root,target);await mkdir(dir);
    for (const [path,content] of Object.entries(new AvaloniaAdapter().generate(accepted,target))) {await mkdir(dirname(join(dir,path)),{recursive:true});await writeFile(join(dir,path),content);}
    const report=await verifyCandidate(dir,target,{build:true});
    assert.equal(report.checks.build.status,'PASS',JSON.stringify(report.checks.build));
    assert.equal(report.checks.launch.status,'NOT_RUN');assert.equal(report.releaseEligible,false);
    assert(report.dependencyLocks.length>0,'Resolved dependency hashes must be retained.');
    const repeated=await verifyCandidate(dir,target,{build:true});assert.equal(repeated.checks.build.status,'PASS');
    await appendFile(join(dir,'Program.cs'),'\nthis is invalid C#;\n');
    const broken=await verifyCandidate(dir,target,{build:true});assert.equal(broken.checks.build.status,'FAIL');
    assert.match(broken.checks.build.stdout,/error CS/);assert.notEqual(broken.sourceHash,report.sourceHash);
  }
});
