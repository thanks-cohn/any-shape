import {SourceAdapter} from '../adapters/contracts.mjs';
import {analyzeExtension} from '../extension-pipeline/src/analyze.mjs';
import {validateContract} from '../extension-pipeline/src/contract.mjs';
import {digest} from '../core/safety.mjs';
export class ChromeExtensionSourceAdapter extends SourceAdapter {
  constructor(){super({id:'chrome-extension',kind:'source',requiresPath:true,version:'0.1',status:'implemented',types:['chrome-extension-source'],capabilities:['bounded-read-only-intake','syntax-observations','eir-v1-compatibility'],limits:['No imported code execution or inferred runtime success.','Browser permissions are observations, never derived-product grants.'],evidence:'npm run test:pipeline; npm run test:foundation'});}
  async inspect({source,root}) {
    const {inventory,contract}=await analyzeExtension(root,{extensionId:source.id});validateContract(contract);
    return {status:'OBSERVED',sourceHash:inventory.source.sha256,confidence:'static-syntax-only',
      observations:contract.observations.map(observation=>({...observation,sourceId:source.id})),unknowns:contract.unknowns,
      compatibility:{format:'eir-v1',hash:digest(contract),contract},authorityGranted:[]};
  }
}
