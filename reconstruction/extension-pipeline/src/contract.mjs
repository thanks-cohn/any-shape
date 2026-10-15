import {readFileSync} from 'node:fs';
import Ajv from 'ajv';
import {fail, digest, slug} from './safety.mjs';
const schema=JSON.parse(readFileSync(new URL('../schemas/eir-v1.schema.json',import.meta.url),'utf8'));
const validate=new Ajv({allErrors:true,strict:true}).compile(schema);
export function validateContract(contract,{accepted=false}={}) {
  if (!validate(contract)) fail('INVALID_EIR','EIR schema validation failed.',{errors:validate.errors});
  slug(contract.extensionId);
  const ids=new Set();
  for (const obs of contract.observations) {
    if (ids.has(obs.id)) fail('DUPLICATE_ID','Duplicate observation.',{id:obs.id});
    ids.add(obs.id);
  }
  const caps=new Set();
  for (const cap of contract.capabilities) {
    if (caps.has(cap.id)) fail('DUPLICATE_ID','Duplicate capability.',{id:cap.id});
    caps.add(cap.id);
    if (!cap.evidence.length || cap.evidence.some(id=>!ids.has(id))) fail('INVALID_REFERENCE','Capability must cite known observations.',{id:cap.id});
  }
  const decisions=new Set();
  for (const decision of contract.review.decisions) {
    if (!caps.has(decision.capabilityId)||decisions.has(decision.capabilityId)) fail('INVALID_REVIEW','Review decision is unknown or duplicated.');
    decisions.add(decision.capabilityId);
  }
  if (contract.review.status==='accepted') {
    if (!contract.review.reviewer?.trim() || decisions.size!==caps.size) fail('INVALID_REVIEW','Accepted contracts require a named reviewer and one explicit decision for every capability.');
    for (const decision of contract.review.decisions) if (['preserve','correct'].includes(decision.disposition)) {
      const cap=contract.capabilities.find(x=>x.id===decision.capabilityId);
      if (!cap.acceptance.length || !cap.invariants.length || !cap.uiSemantics.length) fail('INCOMPLETE_REQUIREMENTS','Preserved/corrected capabilities need invariants, UI semantics and independent acceptance cases.',{id:cap.id});
    }
  }
  if (accepted && contract.review.status!=='accepted') fail('REVIEW_REQUIRED','Review the contract and provide explicit capability decisions before generation.');
  return {valid:true,sha256:digest(contract)};
}
export function acceptContract(contract,review) {
  const result=structuredClone(contract);
  result.review={...review,status:'accepted'};
  validateContract(result,{accepted:true});
  return result;
}
export function planContract(contract) {
  validateContract(contract);
  return {format:'any-shape-target-plan',schemaVersion:1,extensionId:contract.extensionId,contractHash:digest(contract),reviewStatus:contract.review.status,
    targets:Object.fromEntries(['windows','linux','android'].map(target=>[target,{
      target,status:contract.review.status==='accepted'?'IMPLEMENTATION_REQUIRED':'REVIEW_REQUIRED',
      capabilities:contract.capabilities.map(cap=>({id:cap.id,...cap.targets[target],disposition:contract.review.decisions.find(d=>d.capabilityId===cap.id)?.disposition||'unreviewed',acceptance:cap.acceptance})),
      requiredChecks:['architecture','build','package','install','launch','domain','ui','persistence','effects','denied-permissions','security','accessibility','resources','upgrade','recovery','license','release-review'],
      hostRequirements:target==='android'?['.NET Android workload','Android SDK/JDK','Emulator or device','Touch/back/lifecycle/scoped-storage evidence']:['.NET SDK',`${target} build and runtime host`],
      next:'Implement accepted obligations through target-specific ports; generated skeletons are never release evidence.'
    }]))};
}
export function foreverMapping(contract) {
  validateContract(contract);
  return {format:'any-shape-forever-concept-map',schemaVersion:1,note:'Project-local mapping only; does not change or emit canonical records.',sourceHash:contract.source.sha256,concepts:{capability:contract.capabilities.map(x=>x.id),invariant:contract.capabilities.flatMap(x=>x.invariants),constraint:contract.capabilities.flatMap(x=>x.authority),evidence:contract.observations.map(x=>x.id),implementation:[]}};
}
