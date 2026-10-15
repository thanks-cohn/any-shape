#!/usr/bin/env node
import {fileURLToPath} from 'node:url';
import {resolve,join} from 'node:path';
import {mkdir,readFile} from 'node:fs/promises';
import {loadSpecification} from './load.mjs';
import {builtinAdapters} from '../adapters/builtins.mjs';
import {targetContext} from '../derivations/context.mjs';
import {planDerivation} from '../derivations/plan.mjs';
import {specificationFromLegacyEir} from '../sources/legacy-specification.mjs';
import {PipelineError,fail,slug,safePath,json,digest} from '../core/safety.mjs';
// The legacy immutable writer preserves the original collision semantics. New
// jobs use a distinct format/identity, and cannot overwrite an old run manifest.
import {immutable,readJSON} from '../core/files.mjs';
const help='Usage: npm run reconstitute -- adapters | validate <specifications.json> | plan <specifications.json> [--workspace <root>] [--run <id>] | context <specifications.json> --product <id> --target <id> | from-extension <eir.json> [--job <id>] [--product <id>]';
try {
  const positional=[],options={};
  const args=process.argv.slice(2);
  for(let i=0;i<args.length;i++) {
    if(!args[i].startsWith('--')){positional.push(args[i]);continue;}
    const name=args[i].slice(2);
    if(!['workspace','run','job','product','target'].includes(name)||name in options||!args[i+1]||args[i+1].startsWith('--'))fail('INVALID_ARGUMENT',help);
    options[name]=args[++i];
  }
  const [command,path]=positional;if(positional.length>2)fail('INVALID_ARGUMENT',help);
  const allowed={adapters:[],validate:[],plan:['workspace','run'],context:['workspace','product','target'],'from-extension':['job','product']};
  if(!allowed[command]||Object.keys(options).some(key=>!allowed[command].includes(key))||command==='adapters'&&path)fail('INVALID_ARGUMENT',help);
  const catalog=builtinAdapters();let result;
  if(command==='adapters')result=catalog.discover();
  else if(command==='from-extension') {
    if(!path)fail('INVALID_ARGUMENT',help);
    const loadedPath=resolve(path);
    result=specificationFromLegacyEir(await readJSON(loadedPath),{...(options.job?{jobId:options.job}:{}),...(options.product?{productId:options.product}:{})});
  } else if(command==='validate'||command==='plan'||command==='context') {
    if(!path)fail('INVALID_ARGUMENT',help);
    const loaded=await loadSpecification(path);
    if(command==='validate')result={...loaded.validation,jobId:loaded.specification.jobId,bundleHash:loaded.bundleHash,documents:loaded.documents,limits:loaded.limits,status:'VALID_SPECIFICATION_NOT_IMPLEMENTED'};
    else {
      const workspace=resolve(options.workspace||fileURLToPath(new URL('../../',import.meta.url)));
      result=await planDerivation(loaded,{workspace,catalog});
      if(command==='context') {
        if(!options.product||!options.target||options.run)fail('INVALID_ARGUMENT','Context requires --product and --target and cannot create a run.');
        result=targetContext(result,{productId:options.product,targetId:options.target});
      }
      if(options.run) {
        slug(options.run);
        const relative=`runs/${loaded.specification.jobId}/${options.run}`,root=await safePath(workspace,[relative],{missing:true});await mkdir(root,{recursive:true});
        await immutable(root,'run.json',{format:'any-shape-derivation-run',version:'0.1',jobId:loaded.specification.jobId,runId:options.run,specificationHash:result.specificationHash,bundleHash:loaded.bundleHash,adapterCatalogHash:result.adapterCatalogHash});
        await immutable(root,'specifications.resolved.json',loaded.specification);await immutable(root,'documents.json',loaded.documents);await immutable(root,'derivation-plan.json',result);
        result={...result,runPath:relative,planHash:digest(result)};
      }
    }
  } else fail('INVALID_COMMAND',help);
  console.log(json(result));
} catch(error) {console.error(JSON.stringify({status:'ERROR',error:error instanceof PipelineError?error.toJSON():{code:error.code||'JOB_FAILURE',detail:error.message}},null,2));process.exitCode=1;}
