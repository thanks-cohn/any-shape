import {TargetAdapter} from '../adapters/contracts.mjs';
export class PlannedTargetAdapter extends TargetAdapter {
  constructor(id,types){super({id,kind:'target',version:'0.1',status:'planned',types,capabilities:[],limits:['No generation/build/runtime adapter implemented.'],evidence:'No implementation evidence; explicitly unsupported.'});}
}
