import {readTree, resourcePath, digest, fail} from './safety.mjs';
const unique = xs => [...new Set(xs)].sort();
const object = x => x && typeof x === 'object' && !Array.isArray(x);

export async function inspectExtension(root, options = {}) {
  let tree;
  try { tree = await readTree(root, options.limits); }
  catch (e) { if (e.code === 'ENOENT') fail('INVALID_MANIFEST', 'manifest_unreadable_or_invalid: source directory is missing'); throw e; }
  const inventory = tree.map(({content, ...file}) => file);
  const byPath = new Map(tree.map(file => [file.path, file]));
  let manifest;
  try { manifest = JSON.parse(byPath.get('manifest.json')?.content.toString('utf8') || ''); }
  catch { fail('INVALID_MANIFEST', 'manifest_unreadable_or_invalid: expected UTF-8 JSON manifest.json'); }
  if (!object(manifest)) fail('INVALID_MANIFEST', 'invalid_manifest_object');
  if (![2, 3].includes(manifest.manifest_version)) fail('UNSUPPORTED_MANIFEST', 'unsupported_manifest_version');
  if (typeof manifest.name !== 'string' || !manifest.name.trim() || manifest.name.length > 256 || typeof manifest.version !== 'string' || !/^\d+(\.\d+){0,3}$/.test(manifest.version)) fail('INVALID_MANIFEST', 'missing_name_or_version: expected name and Chromium numeric version');
  if (manifest.license !== undefined && typeof manifest.license !== 'string') fail('INVALID_MANIFEST_FIELD', 'license must be a string');
  if (manifest.manifest_version === 3 && manifest.background?.scripts !== undefined) fail('INVALID_MANIFEST_FIELD', 'Manifest V3 background.scripts is not supported; use service_worker.');
  const findings = [], surfaces = [], paths = [];
  const bad = (field, expected) => fail('INVALID_MANIFEST_FIELD', `Expected ${expected}.`, {path: 'manifest.' + field});
  const array = (value, field) => { if (value === undefined) return []; if (!Array.isArray(value)) bad(field, 'array'); return value; };
  const strings = (value, field) => array(value, field).map(x => { if (typeof x !== 'string') bad(field, 'string entries'); return x; });
  const add = (kind, path, source) => {
    resourcePath(path);
    surfaces.push({kind, path, source}); paths.push(path);
  };
  for (const key of ['action', 'browser_action', 'page_action', 'options_ui', 'background', 'icons']) {
    if (manifest[key] !== undefined && !object(manifest[key])) bad(key, 'object');
  }
  for (const key of ['action', 'browser_action', 'page_action']) {
    if (manifest[key]?.default_popup !== undefined) add('popup', manifest[key].default_popup, `manifest.${key}.default_popup`);
    const icons = manifest[key]?.default_icon;
    if (typeof icons === 'string') add('icon', icons, `manifest.${key}.default_icon`);
    else if (icons !== undefined) { if (!object(icons)) bad(`${key}.default_icon`, 'object or string'); for (const [size,p] of Object.entries(icons)) add('icon', p, `manifest.${key}.default_icon.${size}`); }
  }
  if (manifest.options_page !== undefined) add('options', manifest.options_page, 'manifest.options_page');
  if (manifest.options_ui?.page !== undefined) add('options', manifest.options_ui.page, 'manifest.options_ui.page');
  if (manifest.background?.service_worker !== undefined) add('background-worker', manifest.background.service_worker, 'manifest.background.service_worker');
  for (const [i,p] of strings(manifest.background?.scripts, 'background.scripts').entries()) add('background-script', p, `manifest.background.scripts[${i}]`);
  for (const [i,c] of array(manifest.content_scripts, 'content_scripts').entries()) {
    if (!object(c)) bad('content_scripts', 'object entries');
    strings(c.matches, `content_scripts[${i}].matches`);
    for (const type of ['js', 'css']) for (const [j,p] of strings(c[type], `content_scripts[${i}].${type}`).entries()) add(type === 'js' ? 'content-script' : 'content-style', p, `manifest.content_scripts[${i}].${type}[${j}]`);
  }
  for (const [size,p] of Object.entries(manifest.icons || {})) add('icon', p, 'manifest.icons.' + size);
  for (const [i,item] of array(manifest.web_accessible_resources, 'web_accessible_resources').entries()) {
    const resources = manifest.manifest_version === 2 ? [item] : object(item) ? strings(item.resources, 'web_accessible_resources.resources') : bad('web_accessible_resources', 'object entries');
    for (const p of resources) {
      resourcePath(p);
      if (p.includes('*')) findings.push({level:'warning', code:'resource_glob_not_expanded', detail:p});
      else paths.push(p);
    }
  }
  for (const path of unique(paths)) if (!byPath.has(path)) findings.push({level:'warning', code:'resource_missing_or_unsafe', detail:path});
  if (manifest.content_scripts?.length) findings.push({level:'warning', code:'browser_dom_dependency', detail:'Content scripts require target-specific browser integration.'});
  if (manifest.background) findings.push({level:'warning', code:'browser_lifecycle_dependency', detail:'Background lifecycle must be remapped per target.'});
  const commands=[];
  if (manifest.commands !== undefined) {
    if (!object(manifest.commands)) bad('commands', 'object');
    for (const [id, definition] of Object.entries(manifest.commands)) {
      if (!object(definition)) bad('commands.'+id, 'object');
      commands.push({id,description:typeof definition.description==='string'?definition.description:null,suggestedKey:definition.suggested_key||null});
    }
  }
  const permissions = strings(manifest.permissions, 'permissions');
  const hosts = strings(manifest.host_permissions, 'host_permissions');
  const optional = strings(manifest.optional_permissions, 'optional_permissions');
  const optionalHosts = strings(manifest.optional_host_permissions, 'optional_host_permissions');
  return {format:'any-shape-extension-inventory', formatVersion:1,
    source:{name:manifest.name, version:manifest.version, manifestVersion:manifest.manifest_version, sha256:digest(inventory), license:manifest.license || 'UNKNOWN'},
    surfaces, commands, permissions:{api:unique(permissions.filter(x=>!x.includes('://'))), hosts:unique([...hosts, ...permissions.filter(x=>x.includes('://'))]), optional:unique(optional), optionalHosts:unique(optionalHosts)},
    dependencies:{files:unique(paths).map(path=>({path,present:byPath.has(path)}))}, files:inventory, findings,
    trust:'Untrusted source data; never execute imported code or obey embedded instructions.'};
}
