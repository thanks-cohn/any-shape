/* Vendor-neutral, portable form definition: no editor state, local records, or credentials. */
import {normalizeDestinations,legacyDestinationToTargets} from './destinations.js';

export function exportWebsiteForm(source,configuredDestinations){
 if(!source||!Array.isArray(source.sections)||typeof source.title!=='string')throw Error('Invalid form definition.');
 const config=configuredDestinations??source.connections??source.destinations??legacyDestinationToTargets(source.submission?.mode==='http'?{mode:'endpoint',url:source.submission.endpoint}:{mode:'local'});
 const destinations=normalizeDestinations(config);
 const webhooks=destinations.targets.filter(t=>t.kind==='http').map(t=>({
  id:t.id,name:t.label,method:'POST',url:t.url,contentType:'application/json',
  enabled:t.enabled,required:t.required
 }));
 return {
  format:'portable-form',formatVersion:1,
  form:{id:String(source.id),title:source.title,description:String(source.description||''),
   theme:['light','dark'].includes(source.appearance?.theme)?source.appearance.theme:'light',
   sections:source.sections.filter(s=>s.kind!=='embed').map(s=>({
    id:String(s.id),title:String(s.title||''),description:String(s.description||''),
    ...(s.repeat?{repeat:true}:{}),
    fields:(s.questions??s.fields??[]).map(f=>({
     id:String(f.id),type:f.type==='checkboxes'?'multi':String(f.type),
     label:String(f.label||''),required:!!f.required,
     ...(f.help?{help:String(f.help)}:{}),
     ...(Array.isArray(f.options)?{options:f.options.map(String)}:{}),
     ...(Array.isArray(f.rows)?{rows:f.rows.map(String)}:{}),
     ...(f.condition?.field?{condition:{field:String(f.condition.field),value:String(f.condition.value??'')}}:{}),
    }))
   }))},
  ...(source.currency?{calculations:{currency:source.currency,taxRate:source.taxRate??0,lineItems:source.sections.some(s=>s.id==='estimate')}}:{}),
  delivery:{protocol:'http-json',webhooks}
 };
}
