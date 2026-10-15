import {resolve} from 'node:path';
import {validateSpecification} from '../specifications/validate.mjs';
import {safePath,fail,digest} from '../core/safety.mjs';
const PARITY=new Set(['reconstruct','port','adapt','extend']);
export async function planDerivation(loaded,{workspace,catalog}={}) {
  const spec=loaded.specification||loaded;validateSpecification(spec);
  if(!catalog)fail('ADAPTER_CATALOG_REQUIRED','Supply a source/target adapter catalog.');
  workspace=resolve(workspace||process.cwd());
  const sourceReports=[],nodes=[],edges=[],evidenceIds=new Map();
  const node=(id,kind,data={})=>nodes.push({id,kind,...data});
  const edge=(from,to,relationship)=>edges.push({from,to,relationship});
  for(const source of spec.sources) {
    const adapter=catalog.source(source.type);let report;
    if(source.access.authorization!=='declared')report={status:source.access.authorization==='denied'?'DENIED':'REVIEW_REQUIRED',reason:'Owner access declaration is missing or denied. No source read was attempted.',observations:[],authorityGranted:[]};
    else if(!adapter)report={status:'UNSUPPORTED',reason:'No source adapter registered for this declared input type.',observations:[],authorityGranted:[]};
    else {
      // Metadata-only adapters must not inspect or fabricate missing input files.
      const root=adapter.descriptor.requiresPath?await safePath(workspace,[source.path]):null;
      report=await adapter.inspect({source,root,specification:spec});
      if(report.sourceHash&&source.contentHash&&report.sourceHash!==source.contentHash)fail('SOURCE_HASH_MISMATCH','Observed source no longer matches immutable specification pin.',{sourceId:source.id});
    }
    sourceReports.push({sourceId:source.id,type:source.type,adapterId:adapter?.descriptor.id||null,expectedHash:source.contentHash,...report});
    node(`source:${source.id}`,'source',{sourceId:source.id,status:report.status,observedHash:report.sourceHash||null});
    for(const observation of report.observations||[]) {
      const id=`observation:${source.id}:${observation.id}`;
      node(id,'observation',{sourceId:source.id,claim:'observed',provenance:observation.source});edge(`source:${source.id}`,id,'observed-at');
      evidenceIds.set(`${source.id}.${observation.id}`,id);
    }
  }
  for(const requirement of spec.requirements) {
    node(`requirement:${requirement.id}`,'requirement',{claim:requirement.claim,provenance:requirement.provenance});
    for(const evidence of requirement.evidence) {
      if(evidenceIds.has(evidence))edge(evidenceIds.get(evidence),`requirement:${requirement.id}`,'supports-syntax-only');
      else {node(`external-evidence:${requirement.id}:${evidence}`,'unverified-evidence',{reference:evidence,status:'NOT_RUN'});edge(`external-evidence:${requirement.id}:${evidence}`,`requirement:${requirement.id}`,'requires-verification');}
    }
  }
  for(const acceptance of spec.acceptanceCases) {
    node(`case:${acceptance.id}`,'acceptance-case',{status:'NOT_RUN'});
    for(const requirement of acceptance.requirements)edge(`requirement:${requirement}`,`case:${acceptance.id}`,'specified-oracle');
  }
  const products=[];
  for(const product of spec.requestedProducts) {
    node(`product:${product.id}`,'product',{relationship:product.relationship});
    for(const source of product.sourceIds)edge(`source:${source}`,`product:${product.id}`,product.relationship);
    for(const peer of product.relatedProductIds)edge(`product:${peer}`,`product:${product.id}`,product.relationship);
    const targets=[];
    for(const target of product.targets) {
      const adapter=catalog.target(target.adapter,target.id),blockers=[];
      if(spec.review.status!=='accepted')blockers.push({code:'OWNER_REVIEW_REQUIRED',reason:'Specification is not accepted.'});
      if(!product.acceptance.length)blockers.push({code:'ACCEPTANCE_REQUIRED',reason:'Product needs its own declared acceptance cases.'});
      for(const sourceId of product.sourceIds) {
        const source=sourceReports.find(x=>x.sourceId===sourceId);
        if(['DENIED','REVIEW_REQUIRED'].includes(source.status))blockers.push({code:'SOURCE_ACCESS_UNAVAILABLE',sourceId,reason:source.reason});
        if(PARITY.has(product.relationship)&&source.status!=='OBSERVED')blockers.push({code:'SOURCE_PARITY_UNKNOWN',sourceId,reason:'No applicable source observations; metadata cannot establish behavior.'});
        if(source.status==='OBSERVED'&&!source.expectedHash)blockers.push({code:'SOURCE_PIN_REQUIRED',sourceId,reason:'Pin the observed source hash before accepting downstream work.'});
      }
      const selected=new Set([...product.preserve,...product.transform,...product.add,...product.invariants,...Object.values(target.requirements).flat()]);
      const requirements=spec.requirements.filter(x=>selected.has(x.id));
      for(const requirement of requirements) {
        if(requirement.claim!=='accepted')blockers.push({code:'REQUIREMENT_REVIEW_REQUIRED',requirementId:requirement.id,reason:'Requested/inferred/observed requirements are not accepted implementation obligations.'});
        if(requirement.evidence.some(id=>!evidenceIds.has(id)))blockers.push({code:'EVIDENCE_NOT_VERIFIED',requirementId:requirement.id,reason:'Referenced evidence has not been collected by this job.'});
      }
      const relevantInteractions=spec.interactions.filter(x=>[x.from,x.to].some(endpoint=>endpoint.kind==='product'&&endpoint.id===product.id));
      for(const interaction of relevantInteractions) {
        if(interaction.api.status!=='declared'||interaction.authorization.status!=='approved')blockers.push({code:'INTEGRATION_REVIEW_REQUIRED',interactionId:interaction.id,reason:'Companion/integration access requires a declared API and explicit scoped review; source privileges are never inherited.'});
      }
      if(['companion','assistant','integrate'].includes(product.relationship)&&!relevantInteractions.length)blockers.push({code:'INTEGRATION_CONTRACT_REQUIRED',reason:'Related products need explicit authorized interaction boundaries.'});
      const assessment=adapter?adapter.assess({specification:spec,product,target,sourceReports}):{status:'UNSUPPORTED',reason:'Unknown target adapter/type pairing.',releaseEligible:false};
      const status=assessment.status==='UNSUPPORTED'?'UNSUPPORTED':blockers.length?'REVIEW_REQUIRED':assessment.status;
      const targetNode=`target:${product.id}:${target.id}`;node(targetNode,'target-plan',{productId:product.id,targetId:target.id,status});edge(`product:${product.id}`,targetNode,'requested-target');
      for(const requirement of requirements)edge(`requirement:${requirement.id}`,targetNode,'must-satisfy');
      for(const acceptance of product.acceptance)edge(targetNode,`case:${acceptance}`,'must-execute');
      targets.push({targetId:target.id,adapterId:target.adapter,status,reason:assessment.reason,blockers,
        context:{purpose:product.purpose,relationship:product.relationship,requirements,targetRequirements:target.requirements,constraints:target.constraints,interactions:relevantInteractions},
        evaluation:{mode:PARITY.has(product.relationship)?'source-parity-and-declared-deviations':'specified-outcomes-and-authorized-interactions',acceptance:product.acceptance,build:'NOT_RUN',runtime:'NOT_RUN',effects:'NOT_RUN',permissions:'NOT_RUN',release:'NOT_RUN'},
        candidatePath:`candidates/products/${product.id}/${target.id}`,releaseEligible:false});
    }
    products.push({productId:product.id,purpose:product.purpose,relationship:product.relationship,targets,excludedRequirements:product.exclude,releaseEligible:false});
  }
  for(const interaction of spec.interactions) {node(`interaction:${interaction.id}`,'integration-contract',{status:'NOT_RUN',authorityGranted:[]});edge(`${interaction.from.kind}:${interaction.from.id}`,`interaction:${interaction.id}`,'requested-data-flow');edge(`interaction:${interaction.id}`,`${interaction.to.kind}:${interaction.to.id}`,'requested-data-flow');}
  return {format:'any-shape-derivation-plan',version:'0.1',jobId:spec.jobId,specificationHash:digest(spec),bundleHash:loaded.bundleHash||null,reviewStatus:spec.review.status,
    sources:sourceReports,products,graph:{nodes:nodes.sort((a,b)=>a.id.localeCompare(b.id)),edges:edges.sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)))},
    status:'PLANNED_NOT_IMPLEMENTED',authorityGranted:[],releaseEligible:false,note:'Validation/planning is not generation, OS/API authorization, behavior verification or release approval.'};
}
