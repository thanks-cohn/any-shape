import {parse as parseJS} from 'acorn';
import {parse as parseHTML} from 'parse5';
import {posix} from 'node:path';
import {inspectExtension} from './inspect.mjs';
import {readTree, digest, resourcePath, fail} from './safety.mjs';

function member(node) {
  if (node?.type === 'Identifier') return node.name;
  if (node?.type === 'MemberExpression') {
    const property = node.computed ? node.property.type === 'Literal' ? node.property.value : null : node.property.name;
    const parent = member(node.object);
    return typeof property === 'string' && parent ? parent + '.' + property : null;
  }
  return null;
}
function walk(node, fn, budget) {
  if (!node || typeof node !== 'object') return;
  if (typeof node.type === 'string') {
    if (--budget.remaining < 0) fail('ANALYSIS_LIMIT', 'Static analysis node budget exceeded.');
    fn(node);
  }
  for (const [key, value] of Object.entries(node)) {
    if (['loc', 'start', 'end'].includes(key)) continue;
    if (Array.isArray(value)) value.forEach(x => walk(x, fn, budget));
    else if (value && typeof value === 'object') walk(value, fn, budget);
  }
}
function objectKeys(node) {
  return node?.type==='ObjectExpression' ? node.properties.filter(p=>p.type==='Property'&&!p.computed).map(p=>p.key.name||p.key.value).filter(x=>typeof x==='string').sort() : null;
}
const literal = node => node?.type === 'Literal' && typeof node.value === 'string' ? node.value : null;
const targets = ['windows', 'linux', 'android'];
export async function analyzeExtension(root, {extensionId = 'unregistered', ...options} = {}) {
  const inventory = await inspectExtension(root, options);
  const tree = await readTree(root, options.limits);
  if (digest(tree.map(({content,...f})=>f)) !== inventory.source.sha256) throw new Error('Source changed during analysis');
  const files = new Set(tree.map(f=>f.path)), observations = [], unknowns = [], edges = [];
  const observationIds=new Set(), budget={remaining:options.analysisNodes ?? 200000};
  function observe(kind, path, line, detail) {
    const data = {kind, source:{path,line}, detail, claim:'observed'};
    const id = 'obs-' + digest(data).slice(0,16);
    if (!observationIds.has(id)) { observationIds.add(id); observations.push({id,...data}); }
    return id;
  }
  function reference(path, line, value, kind) {
    if (typeof value !== 'string') { unknowns.push({code:'DYNAMIC_RESOURCE', path,line,reason:`${kind} destination cannot be statically resolved.`}); return; }
    if (/^(https?:|data:|blob:|chrome:|chrome-extension:|\/\/)/i.test(value)) { observe('external-resource',path,line,{reference:value,kind}); return; }
    let resolved;
    try {
      if (/^[a-z][a-z0-9+.-]*:|^\/|[\\:%?#\x00-\x1f\x7f]/i.test(value)) throw new Error('unsafe reference');
      resolved=posix.normalize(posix.join(posix.dirname(path),value)); resourcePath(resolved);
    }
    catch { unknowns.push({code:'UNSAFE_RESOURCE_REFERENCE',path,line,reason:`Unsafe ${kind} reference: ${value}`}); return; }
    const present = files.has(resolved);
    edges.push({from:path,to:resolved,kind,line,present});
    if (!present) unknowns.push({code:'MISSING_RESOURCE',path,line,reason:`Missing ${kind}: ${resolved}`});
  }
  function script(text,path,lineOffset=0) {
    let ast;
    try { ast=parseJS(text,{ecmaVersion:'latest',sourceType:'module',locations:true,allowHashBang:true}); }
    catch(e) { unknowns.push({code:'PARSE_ERROR',path,line:(e.loc?.line||1)+lineOffset,reason:e.message}); return; }
    walk(ast,node=>{
      const line=node.loc.start.line+lineOffset;
      if (node.type === 'ImportDeclaration' || node.type === 'ExportNamedDeclaration' || node.type === 'ExportAllDeclaration') {
        if (node.source) reference(path,line,node.source.value,'import');
      }
      if (node.type === 'ImportExpression') reference(path,line,literal(node.source),'dynamic-import');
      if (node.type !== 'CallExpression') return;
      const api=member(node.callee);
      if (api && /^(chrome|browser)\./.test(api)) {
        const detail={api,arguments:node.arguments.map(x=>literal(x)).filter(x=>x!==null),payloadKeys:objectKeys(node.arguments[0]),flow:api.endsWith('.addListener')?'event-listener':/\.(sendMessage|connect|postMessage)$/.test(api)?'message-producer':api.includes('.storage.')?'state-access':'api-call'};
        observe('browser-api',path,line,detail);
      }
      if (api === 'fetch' || api === 'navigator.sendBeacon' || api === 'importScripts' || api === 'require') {
        observe(api === 'fetch' || api === 'navigator.sendBeacon' ? 'network-call' : 'script-load',path,line,{api,destination:literal(node.arguments[0])});
        if (api === 'importScripts' || api === 'require') for (const arg of node.arguments) reference(path,line,literal(arg),api);
      }
      if (api && /^(localStorage|sessionStorage)\./.test(api)) observe('web-storage',path,line,{api,key:literal(node.arguments[0])});
      if (!api && node.callee?.type === 'MemberExpression') unknowns.push({code:'DYNAMIC_CALL',path,line,reason:'Computed or aliased call requires manual inspection.'});
    },budget);
  }
  for (const file of tree) {
    if (/\.(css|ts|tsx|jsx|wasm)$/.test(file.path)) unknowns.push({code:'UNANALYZED_ASSET',path:file.path,line:1,reason:'Asset inventoried and hashed; this language is not statically analyzed by the current parser adapters.'});
    if (/\.(m?js|cjs)$/.test(file.path)) script(file.content.toString('utf8'),file.path);
    if (/\.html?$/.test(file.path)) {
      const html=parseHTML(file.content.toString('utf8'),{sourceCodeLocationInfo:true});
      const visit=node=>{
        if (--budget.remaining<0) fail('ANALYSIS_LIMIT', 'Static analysis node budget exceeded.');
        if (node.tagName) {
          const attrs=Object.fromEntries((node.attrs||[]).map(x=>[x.name,x.value]));
          const line=node.sourceCodeLocation?.startLine||1;
          if (['input','select','textarea','button','form','label','nav','main','dialog'].includes(node.tagName)) observe('ui-element',file.path,line,{tag:node.tagName,id:attrs.id||null,role:attrs.role||null,label:attrs['aria-label']||null,inputType:attrs.type||null});
          for (const attr of ['src','href']) if (attrs[attr] && !(attr==='href' && attrs[attr].startsWith('#'))) reference(file.path,line,attrs[attr],`${node.tagName}.${attr}`);
          if (node.tagName==='script' && !attrs.src && (!attrs.type || ['module','text/javascript','application/javascript'].includes(attrs.type))) script((node.childNodes||[]).map(x=>x.value||'').join(''),file.path,line-1);
          if (Object.keys(attrs).some(x=>x.startsWith('on'))) unknowns.push({code:'INLINE_HANDLER',path:file.path,line,reason:'Inline HTML event handlers require behavioral review.'});
        }
        for (const child of node.childNodes||[]) visit(child);
        if (node.content) visit(node.content);
      };
      visit(html);
    }
  }
  for (const command of inventory.commands) observe('browser-command','manifest.json',1,command);
  for (const surface of inventory.surfaces) observe('surface', 'manifest.json',1,surface);
  for (const permission of [...inventory.permissions.api,...inventory.permissions.optional]) observe('permission','manifest.json',1,{permission});
  for (const host of [...inventory.permissions.hosts,...inventory.permissions.optionalHosts]) observe('host-permission','manifest.json',1,{host});
  observations.sort((a,b)=>a.id.localeCompare(b.id));
  edges.sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
  unknowns.push({code:'STATIC_ANALYSIS_LIMIT',path:'manifest.json',line:1,reason:'Static syntax observations do not establish runtime success, complete behavior, authority, data models, or owner intent. Aliases, generated code, event ordering, dynamic calls and external services need review.'});
  const capabilities=observations.filter(x=>['browser-api','permission','surface','network-call','web-storage'].includes(x.kind)).map(observation=>{
    const descriptor=observation.detail.api||observation.detail.permission||observation.detail.kind||observation.kind;
    const browserCoupled=/^(chrome|browser)\.(tabs|scripting|webRequest|declarativeNetRequest|debugger|cookies|identity|nativeMessaging)\b/.test(descriptor) || ['tabs','activeTab','scripting','webRequest','declarativeNetRequest','debugger','cookies','identity','nativeMessaging','content-script'].includes(descriptor);
    return {id:'cap-'+observation.id.slice(4),description:`Review observed ${descriptor}`,claim:'inferred',evidence:[observation.id],invariants:[],permittedEffects:[],authority:[],state:[],messages:[],uiSemantics:[],acceptance:[],targets:Object.fromEntries(targets.map(target=>[target,{support:browserCoupled?'unsupported':'unknown',scope:'target-host',reason:browserCoupled?'Requires browser-host privileges; no native equivalent implemented.':'Observed syntax is insufficient to infer a tested native implementation.'}]))};
  });
  const contract={format:'any-shape-eir',schemaVersion:1,extensionId,source:inventory.source,inventoryHash:digest(inventory),observations,resourceGraph:edges,capabilities,unknowns,review:{status:'unreviewed',reviewer:null,decisions:[]},extensions:{}};
  return {inventory,contract};
}
