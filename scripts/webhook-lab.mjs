/* Independent loopback webhook test receiver. No dependencies and no disk writes. */
import {createServer} from 'node:http';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

export function createWebhookLab({limit=100}={}){
 const events=[];let sequence=0;
 const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','Access-Control-Allow-Origin':'http://127.0.0.1:4173','Access-Control-Allow-Methods':'POST, GET, DELETE, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Accept','Vary':'Origin','X-Content-Type-Options':'nosniff'};
 const output=(res,status,value)=>res.writeHead(status,headers).end(JSON.stringify(value));
 const server=createServer(async(req,res)=>{
  const url=new URL(req.url||'/', 'http://127.0.0.1');
  const origin=req.headers.origin;
  if(origin&&origin!=='http://127.0.0.1:4173'){res.writeHead(403).end('Origin not allowed');return}
  if(req.method==='OPTIONS'){res.writeHead(204,headers).end();return}
  if(req.method==='GET'&&url.pathname==='/'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}).end(DASHBOARD);return}
  if(req.method==='GET'&&url.pathname==='/events'){output(res,200,{count:events.length,events});return}
  if(req.method==='DELETE'&&url.pathname==='/events'){events.length=0;output(res,200,{cleared:true});return}
  if(req.method!=='POST'||!url.pathname.startsWith('/receive/')){output(res,404,{error:'Not found'});return}
  const scenario=url.pathname.slice('/receive/'.length);
  if(!['success','reject','error','slow'].includes(scenario)){output(res,404,{error:'Unknown scenario'});return}
  let bytes=0;const chunks=[];
  try{for await(const chunk of req){bytes+=chunk.length;if(bytes>65536){output(res,413,{error:'Limit 64 KB'});return}chunks.push(chunk)}}catch{output(res,400,{error:'Read error'});return}
  let body;try{body=JSON.parse(Buffer.concat(chunks).toString('utf8'))}catch{output(res,400,{error:'Invalid JSON'});return}
  const event={sequence:++sequence,receivedAt:new Date().toISOString(),scenario,method:req.method,path:url.pathname,contentType:req.headers['content-type']||'',formId:body?.formId??null,recordId:body?.id??body?.recordId??null,answerKeys:body?.answers&&typeof body.answers==='object'?Object.keys(body.answers):[],test:body?.test===true,body};
  events.push(event);if(events.length>limit)events.shift();
  if(scenario==='slow')await new Promise(r=>setTimeout(r,2200));
  const status={success:202,reject:400,error:500,slow:202}[scenario];
  output(res,status,{accepted:status===202,scenario,sequence:event.sequence,receiptId:'lab-'+event.sequence});
 });
 return {server,events};
}
const DASHBOARD=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Any-Shape · Webhook Lab</title><style>:root{color-scheme:light}body{font:16px/1.55 system-ui,sans-serif;margin:0;color:#171717;background:#fff}main{max-width:900px;margin:auto;padding:clamp(20px,5vw,50px)}h1{font-size:clamp(2rem,4vw,3rem);letter-spacing:-.035em;margin:0 0 10px}p{color:#555}code{overflow-wrap:anywhere}pre{white-space:pre-wrap;overflow-wrap:anywhere;border:1px solid #ddd;border-radius:9px;padding:16px;background:#f8f8f8;font-size:.8rem}button{font:inherit;padding:9px 16px;background:#111;color:#fff;border:0;border-radius:6px;cursor:pointer}button:focus-visible{outline:3px solid #4787d9;outline-offset:3px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;margin:25px 0}.card{border:1px solid #ddd;border-radius:9px;padding:14px}.card strong{display:block}.muted{font-size:.85rem;color:#555}.controls{display:flex;gap:8px;align-items:center;flex-wrap:wrap}</style><main><p class="muted">ANY–SHAPE · INDEPENDENT LOCAL EFFECT RECEIVER</p><h1>Webhook laboratory</h1><p>Send a published form to one of these endpoints and watch the actual incoming request appear below. Only binds to your own computer. Events live in memory until restarted.</p><div class="grid"><div class="card"><strong>Accept (202)</strong><code>http://127.0.0.1:4174/receive/success</code></div><div class="card"><strong>Reject (400)</strong><code>http://127.0.0.1:4174/receive/reject</code></div><div class="card"><strong>Server error (500)</strong><code>http://127.0.0.1:4174/receive/error</code></div><div class="card"><strong>Delay response</strong><code>http://127.0.0.1:4174/receive/slow</code></div></div><div class="controls"><button id="refresh">Refresh now</button><button id="clear">Clear events</button><span id="count" role="status">Loading…</span></div><pre id="events">Loading…</pre><p class="muted">For development only. Payloads are visible locally; use synthetic answers, not sensitive information. Form server must run at 127.0.0.1:4173 for this CORS policy.</p></main><script>const els=id=>document.getElementById(id);async function refresh(){try{const r=await fetch('/events');const d=await r.json();els('count').textContent=d.count+' recorded request(s)';els('events').textContent=JSON.stringify(d.events.slice().reverse(),null,2)}catch(e){els('count').textContent='Receiver unreachable'}}els('refresh').onclick=refresh;els('clear').onclick=async()=>{if(confirm('Clear received test events?')){await fetch('/events',{method:'DELETE'});refresh()}};refresh();setInterval(refresh,1500)</script></html>`;
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const {server}=createWebhookLab();server.listen(4174,'127.0.0.1',()=>console.log('Any-Shape webhook lab: http://127.0.0.1:4174/'));
 for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close());
}
