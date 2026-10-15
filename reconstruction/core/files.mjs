import {mkdir,readFile,writeFile,lstat} from 'node:fs/promises';
import {dirname} from 'node:path';
import {safePath,resourcePath,fail,json} from './safety.mjs';

export async function readJSON(path) {
  await safePath(dirname(path),[path.split('/').at(-1)]);
  const stat=await lstat(path);
  if (!stat.isFile() || stat.size>8*1024*1024) fail('INVALID_JSON_FILE','Expected a regular JSON file smaller than 8 MiB.');
  try { return JSON.parse(await readFile(path,'utf8')); }
  catch(e) { fail('INVALID_JSON_FILE',e.message); }
}
export async function immutable(root,path,value,{raw=false}={}) {
  resourcePath(path);
  const full=await safePath(root,[path],{missing:true});
  await mkdir(dirname(full),{recursive:true});
  await safePath(root,[dirname(path)]);
  const data=raw?value:json(value);
  try { await writeFile(full,data,{flag:'wx'}); }
  catch(e) {
    if (e.code!=='EEXIST') throw e;
    await safePath(root,[path]);
    if ((await readFile(full,'utf8'))!==data) fail('OUTPUT_COLLISION','Immutable output already exists with different content. Use a new run ID.',{path});
  }
  return full;
}
