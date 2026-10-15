import {SourceAdapter} from '../adapters/contracts.mjs';
export class PlannedSourceAdapter extends SourceAdapter {
  constructor(id,types){super({id,kind:'source',requiresPath:false,version:'0.1',status:'planned',types,capabilities:[],limits:['Metadata only; no code/binary parser or behavioral extraction implemented.'],evidence:'No parser validation evidence; explicitly unsupported.'});}
}
