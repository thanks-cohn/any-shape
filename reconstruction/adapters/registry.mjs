import Ajv from 'ajv';
import {readFileSync} from 'node:fs';
import {slug,fail} from '../core/safety.mjs';
const validate=new Ajv({strict:true,allErrors:true}).compile(JSON.parse(readFileSync(new URL('./adapter-v0.1.schema.json',import.meta.url),'utf8')));
function freeze(value){if(value&&typeof value==='object'){for(const child of Object.values(value))freeze(child);Object.freeze(value);}return value;}
export class AdapterCatalog {
  #sources=new Map();#targets=new Map();
  register(kind,adapter) {
    if(!['source','target'].includes(kind))fail('INVALID_ADAPTER_KIND','Expected source or target role.');
    const d=adapter?.descriptor;
    if(!validate(d)||d.kind!==kind)fail('INVALID_ADAPTER','Invalid adapter descriptor.',{errors:validate.errors});
    slug(d.id);for(const type of d.types)slug(type);
    const registry=kind==='source'?this.#sources:this.#targets;
    if(registry.has(d.id))fail('DUPLICATE_ADAPTER','Adapter ID already registered.',{kind,id:d.id});
    // Snapshot descriptors so callers cannot mutate advertised capability later.
    const descriptor=freeze(structuredClone(d));
    const methods=kind==='source'?['inspect']:['assess','generate'];
    if(methods.some(method=>typeof adapter[method]!=='function'))fail('INVALID_ADAPTER','Adapter does not implement its declared role.');
    const facade=Object.freeze({descriptor,...Object.fromEntries(methods.map(method=>[method,adapter[method].bind(adapter)]))});
    registry.set(d.id,{adapter:facade,descriptor});return this;
  }
  source(type) {
    const matches=[...this.#sources.values()].filter(x=>x.descriptor.types.includes(type));
    if(matches.length>1)fail('AMBIGUOUS_SOURCE_ADAPTER','Several adapters advertise this input type.',{type});
    return matches[0]?.adapter||null;
  }
  target(id,type) {const entry=this.#targets.get(id);return entry?.descriptor.types.includes(type)?entry.adapter:null;}
  discover() {return {format:'any-shape-adapter-catalog',version:'0.1',sources:[...this.#sources.values()].map(x=>structuredClone(x.descriptor)).sort((a,b)=>a.id.localeCompare(b.id)),targets:[...this.#targets.values()].map(x=>structuredClone(x.descriptor)).sort((a,b)=>a.id.localeCompare(b.id))};}
}
