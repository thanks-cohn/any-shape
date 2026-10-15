import {SourceAdapter} from '../adapters/contracts.mjs';
export class SpecificationSourceAdapter extends SourceAdapter {
  constructor(){super({id:'specification',kind:'source',requiresPath:false,version:'0.1',status:'implemented',types:['specification-only'],capabilities:['validated-owner-requirements'],limits:['No preexisting application or behavioral parity is implied.'],evidence:'npm run test:foundation'});}
  async inspect(){return {status:'DECLARED',observations:[],authorityGranted:[],reason:'Requirements come from the validated job; they are instructions to plan products, not observed source behavior.'};}
}
