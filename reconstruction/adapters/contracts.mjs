// Language-neutral roles: sources observe; targets assess/realize. Neither grants
// authority or release approval. The JSON descriptors are discoverable contracts.
export class SourceAdapter {
  constructor(descriptor){this.descriptor=descriptor;}
  async inspect(){return {status:'UNSUPPORTED',reason:'Source inspection is not implemented.',observations:[]};}
}
export class TargetAdapter {
  constructor(descriptor){this.descriptor=descriptor;}
  assess(){return {status:'UNSUPPORTED',reason:'Target realization is not implemented.',releaseEligible:false};}
  async generate(){return {status:'UNSUPPORTED',reason:'No implementation generator registered.',releaseEligible:false};}
}
