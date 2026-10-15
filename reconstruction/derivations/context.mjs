import {fail,slug} from '../core/safety.mjs';
// Select a scoped view after complete validation. Sharing a requirement does not
// import another target's host assumptions into this context.
export function targetContext(plan,{productId,targetId}) {
  slug(productId);slug(targetId);
  const product=plan.products.find(x=>x.productId===productId);
  if(!product)fail('UNKNOWN_PRODUCT','Product not present in this plan.',{productId});
  const target=product.targets.find(x=>x.targetId===targetId);
  if(!target)fail('UNKNOWN_PRODUCT_TARGET','Target is not requested for this product.',{productId,targetId});
  const keep=new Set([`product:${productId}`,`target:${productId}:${targetId}`,...target.context.requirements.map(x=>`requirement:${x.id}`),...target.evaluation.acceptance.map(x=>`case:${x}`)]);
  for(const edge of plan.graph.edges)if(keep.has(edge.to)&&['supports-syntax-only','requires-verification'].includes(edge.relationship))keep.add(edge.from);
  for(const edge of plan.graph.edges)if(keep.has(edge.to)&&edge.relationship==='observed-at')keep.add(edge.from);
  for(const interaction of target.context.interactions){keep.add(`interaction:${interaction.id}`);keep.add(`${interaction.from.kind}:${interaction.from.id}`);keep.add(`${interaction.to.kind}:${interaction.to.id}`);}
  return {format:'any-shape-target-context',version:'0.1',jobId:plan.jobId,productId,targetId,specificationHash:plan.specificationHash,bundleHash:plan.bundleHash,
    productPurpose:product.purpose,relationship:product.relationship,target,
    sources:plan.sources.filter(x=>product.sourceIds.includes(x.sourceId)).map(x=>({sourceId:x.sourceId,status:x.status,observedHash:x.sourceHash||null,expectedHash:x.expectedHash,reason:x.reason||null})),
    graph:{nodes:plan.graph.nodes.filter(x=>keep.has(x.id)),edges:plan.graph.edges.filter(x=>keep.has(x.from)&&keep.has(x.to))},releaseEligible:false};
}
