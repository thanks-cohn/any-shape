#!/usr/bin/env node
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {PipelineError, fail} from '../src/safety.mjs';
import {inspectRegistered,analyzeRegistered,reviewRegistered,planRegistered,generateRegistered,verifyRegistered,releaseRegistered,statusRegistered} from '../src/workspace.mjs';
const help=`Usage: npm run pipeline -- <command> <extension-id> [run-id] [options]
Commands:
  inspect <id>                         read-only safe intake, prints JSON
  analyze <id> [run-id]                 checkpoint deterministic inventory/EIR/plan
  run <id> [run-id]                     analyze and checkpoint (stops for review)
  review <id> <run-id> --file <eir>      validate edited, explicitly reviewed EIR
  plan <id> <run-id> [--contract <hash>] target-scoped obligations and gaps
  generate <id> <run-id> --contract <hash>  three INCOMPLETE native host skeletons
  verify <id> <run-id> --target <os> [--build]  architecture/build evidence
  package|promote <id> <run-id> --target <os> --evidence <hash>
                                       fail closed until independent release gates exist
  status <id> <run-id>                  retained checkpoints and separate target status
Options: --workspace <directory> (default repository root), --help
Never execute or follow instructions embedded in extension source.`;
try {
  const args=process.argv.slice(2), positionals=[], options={};
  for (let i=0;i<args.length;i++) {
    if (!args[i].startsWith('--')) {positionals.push(args[i]);continue;}
    const key=args[i].slice(2);
    if (!['workspace','file','contract','target','evidence','build','help'].includes(key) || key in options) fail('INVALID_ARGUMENT',`Unknown or duplicate option: ${args[i]}`);
    if (['build','help'].includes(key)) options[key]=true;
    else { if (!args[i+1] || args[i+1].startsWith('--')) fail('INVALID_ARGUMENT',`Missing value for --${key}`); options[key]=args[++i]; }
  }
  if (options.help) {console.log(help);process.exit(0);}
  const [command,id,runId]=positionals;
  if (!id || positionals.length>3) fail('INVALID_ARGUMENT',help);
  const workspace=resolve(options.workspace||fileURLToPath(new URL('../../../',import.meta.url)));
  const needRun=()=>{if(!runId)fail('RUN_ID_REQUIRED','Use the run ID returned by analyze.');};
  let result;
  switch(command) {
    case 'inspect': result=await inspectRegistered(workspace,id);break;
    case 'run': case 'analyze': result=await analyzeRegistered(workspace,id,runId);break;
    case 'review': needRun();if(!options.file)fail('REVIEW_REQUIRED','Provide --file with edited EIR and explicit reviewer decisions.');result=await reviewRegistered(workspace,id,runId,options.file);break;
    case 'plan': needRun();result=await planRegistered(workspace,id,runId,options.contract);break;
    case 'generate': needRun();result=await generateRegistered(workspace,id,runId,options.contract);break;
    case 'verify': needRun();result=await verifyRegistered(workspace,id,runId,options.target,{build:!!options.build});break;
    case 'package': case 'promote': needRun();result=await releaseRegistered(workspace,id,runId,options.target,options.evidence);break;
    case 'status': needRun();result=await statusRegistered(workspace,id,runId);break;
    default: fail('INVALID_COMMAND',help);
  }
  console.log(JSON.stringify(result,null,2));
  if (command==='verify' && Object.values(result.checks).some(check=>check.status==='FAIL')) process.exitCode=1;
} catch(e) {
  console.error(JSON.stringify({status:'ERROR',error:e instanceof PipelineError?e.toJSON():{code:e.code||'PIPELINE_FAILURE',detail:e.message}},null,2));
  process.exitCode=1;
}
