import Ajv from 'ajv';
import {readFileSync} from 'node:fs';
import {slug,resourcePath,fail,digest} from '../core/safety.mjs';
const ajv=new Ajv({allErrors:true,strict:true,ownProperties:true});
const compile=name=>ajv.compile(JSON.parse(readFileSync(new URL(`./schemas/${name}-v0.1.schema.json`,import.meta.url),'utf8')));
const rootCheck=compile('specifications'),moduleCheck=compile('module');
export const SECTIONS=Object.freeze(['sources','requestedProducts','requirements','acceptanceCases','interactions','dependencies']);
export function validateDocument(document,{module=false}={}) {
  const check=module?moduleCheck:rootCheck;
  if (!check(document)) fail('INVALID_SPECIFICATION','Specification schema validation failed.',{errors:structuredClone(check.errors)});
  if (!module) slug(document.jobId); else slug(document.moduleId);
  for (const source of document.sources||[]) {slug(source.id);slug(source.type);resourcePath(source.path);}
  for (const product of document.requestedProducts||[]) {slug(product.id);for (const target of product.targets) {slug(target.id);slug(target.adapter);}}
  for (const reference of document.modules||[]) {slug(reference.id);resourcePath(reference.path);if(!reference.path.endsWith('.json'))fail('INVALID_MODULE_PATH','Modules must reference JSON files.');}
  return true;
}
function unique(items,kind) {
  const seen=new Map();
  for (const item of items) {if(seen.has(item.id))fail('DUPLICATE_ID',`Duplicate ${kind} identity.`,{id:item.id});seen.set(item.id,item);}
  return seen;
}
export function validateSpecification(spec) {
  validateDocument(spec);
  if (spec.modules?.length) fail('UNRESOLVED_MODULES','Load local module references before validating the resolved job.');
  const sources=unique(spec.sources,'source'),products=unique(spec.requestedProducts,'product'),requirements=unique(spec.requirements,'requirement'),cases=unique(spec.acceptanceCases,'acceptance case');
  unique(spec.interactions,'interaction');unique(spec.dependencies,'dependency');
  const reference=(map,id,kind)=>{if(!map.has(id))fail('UNRESOLVED_REFERENCE',`Unknown ${kind} reference.`,{id});return map.get(id);};
  for (const source of sources.values()) if(source.provenance.origin!=='owner') fail('UNTRUSTED_SOURCE_DECLARATION','Source access must be declared in the owner job, not inherited from imported source.',{id:source.id});
  for (const requirement of requirements.values()) {
    if (requirement.claim==='accepted' && (requirement.provenance.origin!=='owner'||spec.review.status!=='accepted')) fail('UNTRUSTED_ACCEPTANCE','Accepted requirements need owner review; source observations cannot accept themselves.',{id:requirement.id});
    if (requirement.kind==='authority' && requirement.claim==='observed') fail('AUTHORITY_NOT_GRANTED','Observed permissions do not grant authority to a derived product.',{id:requirement.id});
  }
  for (const product of products.values()) {
    if(product.provenance.origin!=='owner')fail('UNTRUSTED_PRODUCT_REQUEST','Products must be requested by the owner specification.',{id:product.id});
    for (const id of product.sourceIds) reference(sources,id,'source');
    for (const id of product.relatedProductIds) {reference(products,id,'product');if(id===product.id)fail('SELF_DERIVATION','A product cannot derive from itself.');}
    const origins=product.sourceIds.length+product.relatedProductIds.length;
    if(product.relationship!=='new'&&!origins)fail('MISSING_DERIVATION_ORIGIN','Non-new relationships need an explicit source or related product.',{id:product.id});
    if(product.relationship==='integrate'&&origins<2)fail('MISSING_INTEGRATION_PEERS','Integration requires at least two peers.',{id:product.id});
    const declared=new Set();
    for (const field of ['preserve','transform','exclude','add']) for (const id of product[field]) {
      reference(requirements,id,'requirement');if(declared.has(id))fail('CONFLICTING_DISPOSITION','A requirement cannot be preserved, transformed, excluded or added twice.',{productId:product.id,id});declared.add(id);
    }
    for (const id of product.invariants) if(reference(requirements,id,'invariant').kind!=='invariant')fail('REFERENCE_KIND_MISMATCH','Expected an invariant requirement.',{id});
    for (const id of product.acceptance) reference(cases,id,'acceptance case');
    unique(product.targets,`target in ${product.id}`);
    for (const target of product.targets) for (const [kind,ids] of Object.entries(target.requirements)) for (const id of ids) {
      if(reference(requirements,id,'target requirement').kind!==kind)fail('REFERENCE_KIND_MISMATCH','Target requirements must retain their declared kind.',{productId:product.id,targetId:target.id,id});
    }
  }
  for (const acceptance of cases.values()) for (const id of acceptance.requirements) reference(requirements,id,'acceptance requirement');
  for (const interaction of spec.interactions) {
    for (const endpoint of [interaction.from,interaction.to]) reference(endpoint.kind==='source'?sources:products,endpoint.id,endpoint.kind);
    for (const id of interaction.data) if(reference(requirements,id,'interaction data').kind!=='data')fail('REFERENCE_KIND_MISMATCH','Interaction data must cite data requirements.',{id});
    if (interaction.authorization.status==='approved' && (interaction.provenance.origin!=='owner'||!interaction.authorization.reviewReference||!interaction.authorization.scope.length)) fail('AUTHORITY_NOT_GRANTED','Approved interaction requests need owner provenance, a review reference and scope. No OS/API grant is inferred.',{id:interaction.id});
    if(interaction.api.status==='declared'&&!interaction.api.reference)fail('MISSING_API_REFERENCE','Declared integrations need an explicit API reference.',{id:interaction.id});
  }
  const edges=new Map([...products.keys()].map(id=>[id,[]]));
  for (const dependency of spec.dependencies) {reference(products,dependency.productId,'dependent product');reference(products,dependency.dependsOnProductId,'dependency product');edges.get(dependency.productId).push(dependency.dependsOnProductId);}
  for (const product of products.values()) edges.get(product.id).push(...product.relatedProductIds);
  const active=new Set(),done=new Set();
  function visit(id) {if(active.has(id))fail('PRODUCT_DEPENDENCY_CYCLE','Product derivation/dependency cycle.',{id});if(done.has(id))return;active.add(id);for(const next of edges.get(id))visit(next);active.delete(id);done.add(id);}
  for(const id of products.keys())visit(id);
  if(spec.review.status==='accepted'&&(!spec.review.reviewer?.trim()||spec.review.unresolved.length))fail('INVALID_REVIEW','Accepted specifications need a reviewer and no unresolved decisions.');
  return {valid:true,specificationHash:digest(spec)};
}
