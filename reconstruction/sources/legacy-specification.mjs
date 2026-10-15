// Compatibility composition only. Neutral schemas/planners do not depend on EIR,
// browser types, desktop targets or an output framework.
import {validateContract} from '../extension-pipeline/src/contract.mjs';
import {slug,digest} from '../core/safety.mjs';
export function specificationFromLegacyEir(eir,{jobId=eir.extensionId,productId=eir.extensionId,path=`extensions/${eir.extensionId}/source`}={}) {
  validateContract(eir);slug(jobId);slug(productId);
  const provenance={origin:'owner',reference:'Reviewable defaults translated from the historical extension workflow; not automatic owner acceptance.'};
  const capabilityIds=Object.fromEntries(eir.capabilities.map(cap=>[cap.id,/^[a-z][a-z0-9]*(?:[.-][a-z0-9]+)*$/.test(cap.id)&&cap.id.length<=128?cap.id:'legacy-'+digest(cap.id).slice(0,24)]));
  const requirements=eir.capabilities.map(cap=>({id:capabilityIds[cap.id],kind:'capability',statement:cap.description,claim:'inferred',provenance:{origin:'analysis',reference:`eir-v1:${cap.id}`},evidence:cap.evidence.map(id=>`${eir.extensionId}.${id}`)}));
  return {specificationVersion:'0.1',jobId,purpose:'Reviewable compatibility job for the existing three-target extension experiment.',
    sources:[{id:eir.extensionId,type:'chrome-extension-source',path,contentHash:eir.source.sha256,original:{name:eir.source.name,version:eir.source.version},provenance,access:{authorization:'review-required',scope:[],reference:null},unknowns:eir.unknowns.map(x=>x.reason)}],
    requestedProducts:[{id:productId,purpose:'Reconstruct accepted extension obligations on explicitly requested native targets.',relationship:'reconstruct',sourceIds:[eir.extensionId],relatedProductIds:[],
      targets:['windows','linux','android'].map(id=>({id,adapter:'avalonia',requirements:{ux:[],security:[],authority:[],data:[]},constraints:['Retain target-specific host behavior and independent evaluation.']})),preserve:requirements.map(x=>x.id),transform:[],exclude:[],add:[],invariants:[],acceptance:[],provenance}],
    requirements,acceptanceCases:[],interactions:[],dependencies:[],review:{status:'unreviewed',reviewer:null,unresolved:['Confirm source access, capability dispositions, target UX, authority, acceptance and release obligations.']},provenance,extensions:{'org.any-shape.legacy':{eirFormatVersion:eir.schemaVersion,eirExtensionId:eir.extensionId,sourceHash:eir.source.sha256,capabilityIds}}};
}
