import {exportWebsiteForm} from './portable-form.js';

/* Website export v1: a normal static site with only the respondent experience. */
const html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Form</title><link rel="stylesheet" href="./style.css"><script src="./app.js" defer></script></head><body><main><h1 id="title">Form</h1><p id="description"></p><form id="form"></form><p id="status" role="status" aria-live="polite"></p></main></body></html>';
const css = `:root{font:16px/1.55 system-ui,-apple-system,Segoe UI,sans-serif;color-scheme:light;--bg:#fff;--fg:#191919;--muted:#626262;--line:#dedede;--panel:#fafafa}html[data-theme=dark]{color-scheme:dark;--bg:#111;--fg:#f7f7f7;--muted:#bbb;--line:#444;--panel:#1c1c1c}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg)}main{max-width:780px;margin:clamp(24px,6vw,70px) auto;padding:0 18px 80px}h1{font-size:clamp(2rem,5vw,3rem);letter-spacing:-.04em;line-height:1.16;margin:0 0 12px}#description{color:var(--muted);margin-bottom:28px}.section{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:clamp(16px,3vw,30px);margin-bottom:18px}.section h2{font-size:1.25rem;margin:0 0 12px}.field{margin:20px 0}.field>label,.field legend{display:block;font-weight:650;margin:0 0 6px}.field small{display:block;color:var(--muted);margin:4px 0}.field input:not([type=radio]):not([type=checkbox]):not([type=range]),.field textarea,.field select,.line-item input{width:100%;max-width:100%;min-height:44px;font:inherit;color:var(--fg);background:var(--bg);padding:10px 12px;border:1px solid var(--line);border-radius:7px}.field textarea{min-height:110px}.field fieldset{border:0;margin:0;padding:0}.option{display:flex;align-items:center;gap:8px;margin:8px 0}.option input{accent-color:var(--fg)}.option label{font-weight:400}.matrix-row{border-top:1px solid var(--line);padding:10px 0}.line-item{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,160px),1fr));gap:12px;margin:12px 0}.line-item label{font-weight:650}.line-item input{display:block;margin-top:5px}.repeat-group{border-top:1px solid var(--line);padding:12px 0}button{font:inherit;min-height:44px;padding:10px 18px;background:var(--fg);color:var(--bg);border:1px solid var(--fg);border-radius:7px;cursor:pointer}button:disabled{opacity:.55}button.secondary{background:transparent;color:var(--fg)}:focus-visible{outline:3px solid #5b95df;outline-offset:3px}#status{overflow-wrap:anywhere;padding:14px;border-radius:9px;background:var(--panel);border:1px solid var(--line);margin-top:20px}#status:empty{display:none}@media(max-width:430px){button{width:100%}}`;

const js = String.raw`(async () => {
 const $ = id => document.getElementById(id);
 const el = (tag,text) => { const n=document.createElement(tag); if(text!==undefined)n.textContent=String(text); return n };
 let spec;
 try {const r=await fetch('./form.json',{cache:'no-store'});if(!r.ok)throw Error('form.json unavailable');spec=await r.json();if(spec.format!=='portable-form'||spec.formatVersion!==1)throw Error('Unsupported form definition')}catch(e){$('status').textContent='Unable to load form: '+e.message;return}
 document.title=spec.form.title;document.documentElement.dataset.theme=spec.form.theme;
 $('title').textContent=spec.form.title;$('description').textContent=spec.form.description;
 const form=$('form'), registry=[];
 const makeField=(f,prefix='')=>{
  const name=prefix+f.id,box=el('div');box.className='field';box.dataset.name=name;const kind=f.type;
  const label=el('label',f.label+(f.required?' *':''));let input;
  const mk=(type)=>{const x=el('input');x.type=type;x.name=name;x.id='f-'+name;x.required=!!f.required;return x};
  if(kind==='info'){box.append(el('p',f.label));return box}
  if(['radio','multi','rank'].includes(kind)){const fs=el('fieldset');fs.append(el('legend',f.label));for(const v of f.options||[]){const row=el('div');row.className='option';const x=mk(kind==='radio'?'radio':'checkbox');x.value=v;x.required=false;const l=el('label',v);l.htmlFor=x.id='f-'+name+'-'+fs.childElementCount;row.append(x,l);fs.append(row)}box.append(fs);registry.push({f,name,box});return box}
  if(kind==='matrix'){const fs=el('fieldset');fs.append(el('legend',f.label));for(const rowName of f.rows||[]){const row=el('div');row.className='matrix-row';row.append(el('strong',rowName));for(const v of f.options||[]){const pair=el('div');pair.className='option';const x=mk('radio');x.name=name+'::'+rowName;x.value=v;x.required=!!f.required;const l=el('label',v);l.htmlFor=x.id='f-'+name+'-'+rowName+'-'+v;pair.append(x,l);row.append(pair)}fs.append(row)}box.append(fs);registry.push({f,name,box});return box}
  if(kind==='textarea'){input=el('textarea');input.id='f-'+name;input.name=name;input.required=!!f.required}
  else if(kind==='select'){input=el('select');input.id='f-'+name;input.name=name;input.required=!!f.required;const blank=el('option','Select an option');blank.value='';input.append(blank);for(const v of f.options||[]){const o=el('option',v);o.value=v;input.append(o)}}
  else if(kind==='checkbox'){input=mk('checkbox');box.append(input,label);registry.push({f,name,box});return box}
  else{input=mk(({currency:'number',rating:'range',scale:'range',signature:'text'}[kind]||kind));if(input.type==='number'){input.min='0';input.step=kind==='currency'?'0.01':'any'}if(input.type==='range'){input.min='1';input.max='10'}if(input.type==='file')box.append(el('small','Only the filename and metadata will be sent; this is not a file upload.'))}
  label.htmlFor=input.id;box.prepend(label);box.append(input);if(f.help)box.append(el('small',f.help));registry.push({f,name,box});return box
 };
 for(const section of spec.form.sections){const group=el('section');group.className='section';group.append(el('h2',section.title));if(section.description)group.append(el('p',section.description));const host=el('div');let count=0;const add=()=>{const block=el('div');if(section.repeat){block.className='repeat-group';block.append(el('h3','Entry '+(count+1)))}for(const f of section.fields)block.append(makeField(f,section.repeat?count+'__':''));host.append(block);count++};add();group.append(host);if(section.repeat){const button=el('button','Add another entry');button.type='button';button.className='secondary';button.onclick=add;group.append(button)}form.append(group)}
 if(spec.calculations?.lineItems){const group=el('section');group.className='section';group.append(el('h2','Line items'));const host=el('div');const add=()=>{const row=el('div');row.className='line-item';for(const [name,type] of [['Description','text'],['Quantity','number'],['Unit price','number']]){const l=el('label',name),x=el('input');x.name='line-'+name;x.type=type;x.required=true;if(type==='number'){x.min='0';x.step=name==='Unit price'?'0.01':'any'}if(name==='Quantity')x.value='1';l.append(x);row.append(l)}host.append(row)};add();const b=el('button','Add line item');b.type='button';b.className='secondary';b.onclick=add;group.append(host,b);form.append(group)}
 const button=el('button','Submit response');button.type='submit';form.append(button);
 const read=()=>{const data=new FormData(form),answers={};for(const {f,name,box} of registry){if(box.hidden)continue;const kind=f.type;if(kind==='multi'||kind==='rank')answers[name]=data.getAll(name);else if(kind==='matrix'){const result={};for(const row of f.rows||[]){const v=data.get(name+'::'+row);if(v!==null)result[row]=v}answers[name]=result}else if(kind==='checkbox')answers[name]=data.has(name);else if(kind==='file'){const file=data.get(name);answers[name]=file?.name?{filename:file.name,size:file.size,type:file.type,uploaded:false}:null}else answers[name]=data.get(name)??''}return answers};
 const conditions=()=>{const answers=read();for(const {f,box} of registry){const c=f.condition;box.hidden=!!c&&!(Array.isArray(answers[c.field])?answers[c.field].includes(c.value):String(answers[c.field]??'')===String(c.value));for(const input of box.querySelectorAll('input,select,textarea'))input.disabled=box.hidden}};form.addEventListener('change',conditions);conditions();
 form.addEventListener('submit',async e=>{e.preventDefault();const active=(spec.delivery?.webhooks||[]).filter(x=>x.enabled);if(!active.length){$('status').textContent='No delivery endpoint is configured. Please contact the form owner.';return}
  const record={schemaVersion:1,formId:spec.form.id,id:crypto.randomUUID?.()??String(Date.now()),submittedAt:new Date().toISOString(),answers:read()};
  if(spec.calculations?.lineItems){const items=[...form.querySelectorAll('.line-item')].map((row,i)=>({id:'line-'+(i+1),description:row.querySelector('[name="line-Description"]').value,quantity:Number(row.querySelector('[name="line-Quantity"]').value),unitPrice:Number(row.querySelector('[name="line-Unit price"]').value}));const subtotalCents=items.reduce((sum,item)=>sum+Math.round(item.quantity*item.unitPrice*100),0),taxCents=Math.round(subtotalCents*(spec.calculations.taxRate||0));record.answers.items=items;record.answers.estimate={subtotalCents,taxCents,totalCents:subtotalCents+taxCents,currency:spec.calculations.currency}}
  button.disabled=true;$('status').textContent='Sending…';const results=[];for(const target of active){try{const response=await fetch(target.url,{method:'POST',mode:'cors',credentials:'omit',redirect:'error',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(record)});results.push({name:target.name,required:target.required,status:response.ok?'accepted':'failed',error:response.ok?'':'HTTP '+response.status})}catch{results.push({name:target.name,required:target.required,status:'failed',error:'Network or CORS error'})}}
  const failure=results.some(x=>x.required&&x.status!=='accepted');$('status').textContent=(failure?'Delivery incomplete. ':'Submission accepted. ')+results.map(x=>x.name+': '+x.status+(x.error?' ('+x.error+')':'')).join('; ')+(failure?' Check before retrying to avoid duplicates.':'');if(!failure)form.reset();button.disabled=false
 });
})();`;

const guide = `# Deploy this form

Upload \`index.html\`, \`style.css\`, \`app.js\`, and \`form.json\` together to any static web host, including GitHub Pages. Open the hosted HTTPS URL. Do not open \`index.html\` directly using file:// because browsers can block loading \`form.json\`.

There is no editor, settings panel, admin route, analytics or vendor branding in the public site. To change the form later, edit \`form.json\` directly and redeploy the files.

## Webhook delivery
The only default delivery mechanism is the configured HTTP(S) JSON POST webhooks in \`form.json\` under \`delivery.webhooks\`. Browser-local storage is deliberately excluded. The public form sends:

- Method: POST
- Request headers: \`Content-Type: application/json\`, \`Accept: application/json\`
- JSON body: \`{schemaVersion, formId, id, submittedAt, answers}\`
- Expected response: HTTP 2xx. A 2xx acknowledges HTTP receipt, not downstream business completion.

## CORS configuration for the receiving service
Your webhook receiver must allow the **deployed website origin**, not just localhost.

Typical CORS preflight request: \`OPTIONS /your-path\` with \`Origin: https://your-domain.example\`, \`Access-Control-Request-Method: POST\`, and \`Access-Control-Request-Headers: content-type\`.

Typical response headers from the server for OPTIONS and the POST response:
\`\`\`
Access-Control-Allow-Origin: https://your-domain.example
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Accept
Vary: Origin
\`\`\`
Return HTTP 204 for OPTIONS where appropriate. Use an explicit trusted origin rather than a wildcard when credentials or sensitive contexts are involved. This form intentionally omits browser credentials. Browsers control the Origin header; don't try to set it in JavaScript.

**Security:** Never put tokens, passwords, signing keys, or privileged service credentials in \`form.json\` or client JavaScript. Use a server-side relay if the receiver requires secrets, does not support CORS, or needs anti-spam, durable persistence, authorization, verified downstream processing, or idempotent delivery. Do not expose unrestricted privileged webhooks directly to public visitors.

**Capability limits:** The exported runtime supports standard fields, select/multiple choice, matrix, conditions, repeated sections, simple line items and JSON submissions. Some richer editor-specific semantics (e.g. full drag-ranking, actual file uploads, cryptographic signatures, sophisticated branching) require future audited adapters and must not be assumed equivalent. Test your exported form before deploying it publicly.
`;

const encoder=new TextEncoder();
function crc32(bytes){let c=~0;for(const b of bytes){c^=b;for(let i=0;i<8;i++)c=c&1?(c>>>1)^0xedb88320:c>>>1}return(~c)>>>0}
function concat(chunks){const size=chunks.reduce((sum,a)=>sum+a.length,0),all=new Uint8Array(size);let pos=0;for(const a of chunks){all.set(a,pos);pos+=a.length}return all}
function zip(files){
 const output=[],central=[];let offset=0;
 const u16=(dv,o,n)=>dv.setUint16(o,n,true),u32=(dv,o,n)=>dv.setUint32(o,n>>>0,true);
 for(const [name,body] of Object.entries(files)){
  const n=encoder.encode(name),b=encoder.encode(body),crc=crc32(b);
  const local=new Uint8Array(30+n.length);let view=new DataView(local.buffer);
  u32(view,0,0x04034b50);u16(view,4,20);u16(view,8,0);u32(view,14,crc);u32(view,18,b.length);u32(view,22,b.length);u16(view,26,n.length);local.set(n,30);
  output.push(local,b);
  const entry=new Uint8Array(46+n.length);view=new DataView(entry.buffer);
  u32(view,0,0x02014b50);u16(view,4,20);u16(view,6,20);u32(view,16,crc);u32(view,20,b.length);u32(view,24,b.length);u16(view,28,n.length);u32(view,42,offset);entry.set(n,46);central.push(entry);
  offset+=local.length+b.length;
 }
 const centralSize=central.reduce((sum,x)=>sum+x.length,0),end=new Uint8Array(22),view=new DataView(end.buffer);
 u32(view,0,0x06054b50);u16(view,8,central.length);u16(view,10,central.length);u32(view,12,centralSize);u32(view,16,offset);
 return concat([...output,...central,end]);
}
export function websiteFiles(source,connections){const definition=exportWebsiteForm(source,connections);return {'index.html':html,'style.css':css,'app.js':js,'form.json':JSON.stringify(definition,null,2),'README.md':guide}}
export function downloadWebsite(source,connections,kind='zip'){
 const files=websiteFiles(source,connections);
 const contents=kind==='json'?files['form.json']:kind==='html'?html:null;
 const name=kind==='json'?'form.json':kind==='html'?'index.html':'website-form.zip';
 const data=contents??zip(files);const blob=new Blob([data],{type:kind==='zip'?'application/zip':kind==='json'?'application/json':'text/html'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),3000);
}
