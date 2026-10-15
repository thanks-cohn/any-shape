import {slug,fail} from '../core/safety.mjs';
export class AdapterCatalog {
  #sources=new Map();#targets=new Map();
  register(kind,adapter) {
    if(!['source','target'].includes(kind))fail('INVALID_ADAPTER_KIND','Expected source or target role.');
    const d=adapter?.descriptor;
    if(!d||d.kind!==kind||!['implemented','planned'].includes(d.status)||!Array.isArray(d.types)||!d.types.length||!d.types.every(x=>typeof x==='string')||!Array.isArray(d.limits)||typeof d.version!=='string'||typeof d.evidence!=='string')fail('INVALID_ADAPTER','Invalid adapter descriptor.');
    slug(d.id);for(const type of d.types)slug(type);
    const registry=kind==='source'?this.#sources:this.#targets;
    if(registry.has(d.id))fail('DUPLICATE_ADAPTER','Adapter ID already registered.',{kind,id:d.id});
    // Snapshot descriptors so callers cannot mutate advertised capability later.
    registry.set(d.id,{adapter,descriptor:structuredClone(d)});return this;
  }
  source(type) {
    const matches=[...this.#sources.values()].filter(x=>x.descriptor.types.includes(type));
    if(matches.length>1)fail('AMBIGUOUS_SOURCE_ADAPTER','Several adapters advertise this input type.',{type});
    return matches[0]?.adapter||null;
  }
  target(id,type) {const entry=this.#targets.get(id);return entry?.descriptor.types.includes(type)?entry.adapter:null;}
  discover() {return {format:'any-shape-adapter-catalog',version:'0.1',sources:[...this.#sources.values()].map(x=>structuredClone(x.descriptor)).sort((a,b)=>a.id.localeCompare(b.id)),targets:[...this.#targets.values()].map(x=>structuredClone(x.descriptor)).sort((a,b)=>a.id.localeCompare(b.id))};}
}
