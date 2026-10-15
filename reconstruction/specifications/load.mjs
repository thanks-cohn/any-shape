import {readFile,lstat} from 'node:fs/promises';
import {resolve,dirname,basename,join} from 'node:path';
import {safePath,resourcePath,fail,sha256,digest} from '../core/safety.mjs';
import {validateDocument,validateSpecification,SECTIONS} from './validate.mjs';
export const SPECIFICATION_LIMITS=Object.freeze({files:64,depth:12,fileBytes:4*1024*1024,totalBytes:16*1024*1024,nodes:200000,jsonDepth:64});
export async function loadSpecification(path,{limits={}}={}) {
  limits={...SPECIFICATION_LIMITS,...limits};
  const rootPath=resolve(path),base=dirname(rootPath),snapshots=[],active=new Set(),visited=new Map(),moduleIds=new Map(),casePaths=new Map();
  let bytes=0,nodes=0;
  async function read(path) {
    const full=await safePath(base,[path]);
    const st=await lstat(full);
    if(!st.isFile()||st.nlink>1)fail('UNSAFE_SPECIFICATION_FILE','Specification files must be regular and not hard-linked.',{path});
    if(st.size>limits.fileBytes||bytes+st.size>limits.totalBytes)fail('SPECIFICATION_LIMIT','Specification byte budget exceeded.',{path});
    const content=await readFile(full);bytes+=content.length;
    if(content.length!==st.size)fail('SOURCE_CHANGED','Specification changed while loading.',{path});
    let data;try{data=JSON.parse(content.toString('utf8'));}catch(e){fail('INVALID_JSON',e.message,{path});}
    const pending=[[data,0]];
    while(pending.length) {
      const [value,depth]=pending.pop();
      if(++nodes>limits.nodes||depth>limits.jsonDepth)fail('SPECIFICATION_LIMIT','Specification structure budget exceeded.',{path});
      if(value&&typeof value==='object')for(const child of Object.values(value))pending.push([child,depth+1]);
    }
    const snapshot={path,sha256:sha256(content),bytes:content.length};snapshots.push(snapshot);
    return {data,snapshot};
  }
  const {data:root}=await read(basename(rootPath));validateDocument(root);
  const resolved=structuredClone(root);resolved.modules=[];
  const moduleExtensions=new Set(Object.keys(root.extensions||{}));
  async function visit(reference,depth) {
    resourcePath(reference.path);
    if(depth>limits.depth||snapshots.length>=limits.files)fail('SPECIFICATION_LIMIT','Specification module count/depth budget exceeded.');
    if(active.has(reference.path))fail('MODULE_CYCLE','Cyclic module reference.',{path:reference.path});
    if(reference.path===basename(rootPath))fail('MODULE_CYCLE','A module cannot reference the root specification.');
    const folded=reference.path.toLowerCase();
    if(casePaths.has(folded)&&casePaths.get(folded)!==reference.path)fail('MODULE_PATH_COLLISION','Module paths differ only in case.');
    casePaths.set(folded,reference.path);
    if(visited.has(reference.path)) {
      const existing=visited.get(reference.path);
      if(existing.id!==reference.id||existing.pin!==reference.sha256)fail('MODULE_REFERENCE_CONFLICT','Repeated module reference has conflicting identity/hash.');
      return;
    }
    if(moduleIds.has(reference.id)&&moduleIds.get(reference.id)!==reference.path)fail('DUPLICATE_MODULE_ID','Different module files claim the same ID.',{id:reference.id});
    moduleIds.set(reference.id,reference.path);active.add(reference.path);
    const {data:module,snapshot}=await read(reference.path);validateDocument(module,{module:true});
    if(module.moduleId!==reference.id)fail('MODULE_ID_MISMATCH','Module ID differs from its reference.',{path:reference.path});
    if(reference.sha256&&reference.sha256!==snapshot.sha256)fail('MODULE_HASH_MISMATCH','Module content differs from the pinned digest.',{path:reference.path});
    snapshot.moduleId=reference.id;snapshot.pinned=reference.sha256!==null;
    for(const nested of [...(module.modules||[])].sort((a,b)=>a.id.localeCompare(b.id)))await visit(nested,depth+1);
    for(const section of SECTIONS) resolved[section].push(...(module[section]||[]));
    for(const [namespace,value] of Object.entries(module.extensions||{})) {
      if(moduleExtensions.has(namespace))fail('MODULE_EXTENSION_CONFLICT','Modules cannot override extension namespaces.',{namespace});
      moduleExtensions.add(namespace);(resolved.extensions??={})[namespace]=value;
    }
    active.delete(reference.path);visited.set(reference.path,{id:reference.id,pin:reference.sha256});
  }
  for(const reference of [...(root.modules||[])].sort((a,b)=>a.id.localeCompare(b.id)))await visit(reference,1);
  const validation=validateSpecification(resolved);
  if(resolved.review.status==='accepted'&&snapshots.some(x=>x.moduleId&&!x.pinned))fail('UNPINNED_MODULE','Accepted specifications require immutable module pins.');
  snapshots.sort((a,b)=>a.path.localeCompare(b.path));
  return {specification:resolved,validation,documents:snapshots,bundleHash:digest(snapshots),limits:{files:snapshots.length,bytes,nodes}};
}
