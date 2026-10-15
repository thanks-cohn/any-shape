import {readFile, lstat} from 'node:fs/promises';
import {resolve, relative, isAbsolute, sep, join} from 'node:path';

const validPath = s => typeof s === 'string' && s.length>0 && !isAbsolute(s) && !s.includes('\\') && s.split('/').every(p=>p && p!=='.' && p!=='..');
const unique = xs => [...new Set(xs)].sort();
export async function inspectExtension(root){
  const dir=resolve(root);
  const error=(code,detail)=>({level:'warning',code,detail});
  const findings=[];
  let manifest;
  try {manifest=JSON.parse(await readFile(join(dir,'manifest.json'),'utf8'));}
  catch(e){throw new Error('manifest_unreadable_or_invalid: '+e.message);}
  if(!manifest || typeof manifest!=='object' || Array.isArray(manifest))throw new Error('invalid_manifest_object');
  if(![2,3].includes(manifest.manifest_version))throw new Error('unsupported_manifest_version');
  if(typeof manifest.name!=='string' || typeof manifest.version!=='string')throw new Error('missing_name_or_version');
  const surfaces=[], paths=[];
  const add=(kind,path,origin)=>{
    if(!path)return;
    if(!validPath(path)){findings.push(error('unsafe_or_dynamic_path',origin));return;}
    surfaces.push({kind,path,source:origin});paths.push(path);
  };
  if(manifest.action?.default_popup)add('popup',manifest.action.default_popup,'manifest.action.default_popup');
  if(manifest.browser_action?.default_popup)add('popup',manifest.browser_action.default_popup,'manifest.browser_action.default_popup');
  if(manifest.page_action?.default_popup)add('popup',manifest.page_action.default_popup,'manifest.page_action.default_popup');
  if(manifest.options_page)add('options',manifest.options_page,'manifest.options_page');
  if(manifest.options_ui?.page)add('options',manifest.options_ui.page,'manifest.options_ui.page');
  if(manifest.background?.service_worker)add('background-worker',manifest.background.service_worker,'manifest.background.service_worker');
  for(const [i,p] of (manifest.background?.scripts||[]).entries())add('background-script',p,'manifest.background.scripts['+i+']');
  for(const [i,c] of (manifest.content_scripts||[]).entries()){
    for(const [j,p] of (c.js||[]).entries())add('content-script',p,'manifest.content_scripts['+i+'].js['+j+']');
    for(const [j,p] of (c.css||[]).entries())add('content-style',p,'manifest.content_scripts['+i+'].css['+j+']');
  }
  for(const [size,p] of Object.entries(manifest.icons||{}))add('icon',p,'manifest.icons.'+size);
  const checked=[];
  for(const p of unique(paths)){
    try{
      const full=resolve(dir,p);
      if(full!==dir && !full.startsWith(dir+sep))throw new Error('outside_root');
      const st=await lstat(full);
      if(st.isSymbolicLink() || !st.isFile())throw new Error('non_regular_file');
      checked.push({path:p,present:true});
    }catch{findings.push(error('resource_missing_or_unsafe',p));checked.push({path:p,present:false});}
  }
  const permissions=unique((manifest.permissions||[]).filter(x=>typeof x==='string'));
  const hostPermissions=unique((manifest.host_permissions||[]).filter(x=>typeof x==='string'));
  if(manifest.content_scripts?.length)findings.push(error('browser_dom_dependency','content scripts require target-specific browser integration'));
  if(manifest.background)findings.push(error('browser_lifecycle_dependency','background lifecycle must be remapped per target'));
  return {format:'any-shape-extension-inventory',formatVersion:1,source:{name:manifest.name,version:manifest.version,manifestVersion:manifest.manifest_version},surfaces,permissions:{api:permissions,hosts:hostPermissions},dependencies:{files:checked},findings};
}
