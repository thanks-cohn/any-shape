import {TargetAdapter} from '../adapters/contracts.mjs';
import {AvaloniaAdapter as LegacyAvaloniaAdapter} from '../extension-pipeline/src/adapter.mjs';
export class AvaloniaTargetAdapter extends TargetAdapter {
  constructor(){super({id:'avalonia',kind:'target',version:'0.1',status:'implemented',types:['windows','linux','android'],capabilities:['eir-v1-incomplete-host-generation','architecture-lint','compiler-invocation'],limits:['Only reviewed EIR v1 host skeletons; no generic semantic synthesis.','No native runtime/effect/release proof.','Android requires its own workload/device.'],evidence:'npm run test:pipeline:native (Linux/Windows RID compilation on Linux only)'});}
  assess({target}) {return {status:'IMPLEMENTATION_REQUIRED',reason:'A native host skeleton is available through the reviewed legacy EIR bridge; requested behavior is not implemented.',targetId:target.id,releaseEligible:false};}
  async generate({contract,target}) {
    if(!contract)return {status:'REVIEW_REQUIRED',reason:'Generic specifications cannot be coerced into accepted legacy EIR.',releaseEligible:false};
    return {status:'INCOMPLETE',files:new LegacyAvaloniaAdapter().generate(contract,target.id),releaseEligible:false};
  }
}
