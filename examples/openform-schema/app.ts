import {downloadWebsite} from "../shared/website-export.js";
import type {SchemaConfig, QuoteState, LineItem} from "./types.js";
import {createDestinationSettings,dispatchDestinations,formatDeliveryResults} from "../shared/destinations.js";
const $=(id:string)=>document.getElementById(id)!;
const DRAFT="anyshape.schema.draft.v1",RESP="anyshape.schema.responses.v1";
let config:SchemaConfig;
let state:QuoteState={answers:{},items:[{id:"item1",description:"",quantity:1,unitPrice:0}],stage:0,published:false};
const newId=()=>crypto.randomUUID?.()??"id-"+Date.now().toString(36)+Math.random().toString(36).slice(2);
const node=<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string):HTMLElementTagNameMap[K]=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e};
const announce=(s:string)=>{$("status").textContent=s;$("status").hidden=false};
const save=()=>{try{localStorage.setItem(DRAFT,JSON.stringify({config,state}))}catch{announce("Could not save draft; export your configuration.")}};
const allRecords=():unknown[]=>{try{const x=JSON.parse(localStorage.getItem(RESP)||"[]");return Array.isArray(x)?x:[]}catch{return []}};
const cents=(number:unknown)=>{const n=Number(number);return Number.isFinite(n)&&n>=0?Math.round((n+Number.EPSILON)*100):0};
const total=()=>{const subtotal=state.items.reduce((sum,i)=>sum+Math.round(Math.max(0,Number(i.quantity))*cents(i.unitPrice)),0);const tax=Math.round(subtotal*Math.max(0,config.taxRate));return {subtotalCents:subtotal,taxCents:tax,totalCents:subtotal+tax,currency:config.currency}};
const currency=(n:number)=>new Intl.NumberFormat(undefined,{style:"currency",currency:config.currency}).format(n/100);
function validate(value:SchemaConfig){if(value.schemaVersion!==1||!value.id||!Array.isArray(value.sections)||!value.sections.length||!["light","dark"].includes(value.appearance.theme)||!["USD","EUR","GBP","CAD","AUD"].includes(value.currency)||!Number.isFinite(value.taxRate)||value.taxRate<0||value.taxRate>1)throw Error("Invalid form configuration.");if(value.sections.length>30)throw Error("Too many sections.");for(const sec of value.sections){if(!sec.id||!Array.isArray(sec.fields)||sec.fields.length>100)throw Error("Invalid section.");for(const f of sec.fields){if(!f.id||!["text","email","textarea","date","select"].includes(f.type))throw Error("Invalid field.");}}return value}
function setState(k:string,value:unknown){state.answers[k]=value;save()}
function makeField(f:SchemaConfig["sections"][number]["fields"][number]){
 const wrap=node("div");wrap.className="field";const label=node("label",f.label+(f.required?" *":""));label.htmlFor="field-"+f.id;wrap.append(label);
 let input:HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement;
 if(f.type==="textarea")input=node("textarea") as HTMLTextAreaElement;
 else if(f.type==="select"){const sel=node("select") as HTMLSelectElement;const first=node("option","Choose one") as HTMLOptionElement;first.value="";sel.append(first);for(const o of f.options||[]){const opt=node("option",o) as HTMLOptionElement;opt.value=o;sel.append(opt)}input=sel;}
 else{input=node("input") as HTMLInputElement;input.type=f.type}
 input.id="field-"+f.id;input.value=String(state.answers[f.id]??"");input.addEventListener("input",()=>setState(f.id,input.value));input.addEventListener("change",()=>setState(f.id,input.value));wrap.append(input);
 const error=node("p");error.className="field-error";error.hidden=true;error.dataset.error=f.id;wrap.append(error);return wrap
}
function rowField(label:string,type:string,value:string,onChange:(value:string)=>void){const d=node("div");d.className="field";const l=node("label",label),input=node("input") as HTMLInputElement;input.type=type;input.value=value;input.addEventListener("input",()=>onChange(input.value));d.append(l,input);return d}
function renderItems(host:HTMLElement){const h=node("h2","Line items");host.append(h);state.items.forEach((item,index)=>{const r=node("div");r.className="item";const heading=node("h3","Item "+(index+1));r.append(heading);const fields=node("div");fields.className="row";fields.append(rowField("Description","text",item.description,v=>{item.description=v;save()}),rowField("Quantity","number",String(item.quantity),v=>{item.quantity=Math.max(0,Number(v)||0);save();renderTotals()}),rowField("Unit price","number",String(item.unitPrice),v=>{item.unitPrice=Math.max(0,Number(v)||0);save();renderTotals()}));r.append(fields);const remove=node("button","Remove item");remove.type="button";remove.addEventListener("click",()=>{state.items.splice(index,1);if(!state.items.length)state.items.push({id:newId(),description:"",quantity:1,unitPrice:0});save();render()});r.append(remove);host.append(r)});const add=node("button","+ Add line item");add.type="button";add.addEventListener("click",()=>{if(state.items.length>=50){announce("Maximum 50 line items.");return}state.items.push({id:newId(),description:"",quantity:1,unitPrice:0});save();render()});host.append(add);const totals=node("div");totals.id="totals";totals.className="totals";host.append(totals);renderTotals()}
function renderTotals(){const box=$("totals");if(!box)return;const t=total();box.replaceChildren(node("p","Subtotal: "+currency(t.subtotalCents)),node("p","Tax: "+currency(t.taxCents)),Object.assign(node("p","Estimated total: "+currency(t.totalCents)),{className:"amount"}))}
function renderReview(host:HTMLElement){
 const t=total();
 const heading=node("div");heading.className="review-intro";heading.append(node("p","FINAL CHECK"),node("h2","Review before submitting"),node("p","Please confirm your details and estimated total. You can go back to make changes before submitting."));host.append(heading);
 for(const section of config.sections.filter(s=>s.id!=="review")){
  const panel=node("section");panel.className="review-panel";panel.append(node("h3",section.title));
  const list=node("dl");list.className="review-details";
  for(const field of section.fields){
   const row=node("div");row.className="review-detail";
   const value=state.answers[field.id];
   let formatted=value==null||value===""?"Not provided":Array.isArray(value)?value.join(", "):typeof value==="object"?JSON.stringify(value):String(value);
   if(field.type==="date"&&typeof value==="string"&&/^\\d{4}-\\d{2}-\\d{2}$/.test(value)){
    const parts=value.split("-");formatted=parts[1]+"/"+parts[2]+"/"+parts[0];
   }
   row.append(node("dt",field.label),node("dd",formatted));list.append(row);
  }
  if(section.id==="estimate"){
   const items=node("div");items.className="review-items";items.append(node("h4","Line items"));
   state.items.forEach((item,index)=>{
    const line=node("div");line.className="review-item";
    const title=node("div");title.append(node("strong",item.description.trim()||"Item "+(index+1)),node("span",String(item.quantity)+" × "+currency(Math.round(item.unitPrice*100))));
    line.append(title,node("strong",currency(Math.round(item.quantity*item.unitPrice*100))));items.append(line);
   });panel.append(list,items);
   const sums=node("dl");sums.className="review-totals";
   for(const [label,amount] of [["Subtotal",t.subtotalCents],["Tax",t.taxCents],["Estimated total",t.totalCents]]){
    const row=node("div");row.append(node("dt",label),node("dd",currency(amount)));if(label==="Estimated total")row.className="review-grand-total";sums.append(row);
   }
   panel.append(sums);
  }else panel.append(list);
  host.append(panel);
 }
 const foot=node("p","Your information will be sent to the destinations configured for this form. Confirm the information above before selecting Submit response.");foot.className="review-foot";host.append(foot);
}
function render(){document.documentElement.dataset.theme=config.appearance.theme;document.body.classList.toggle("respondent-mode",state.published);$("appearance").setAttribute("value",config.appearance.theme);($("appearance") as HTMLSelectElement).value=config.appearance.theme;$("title").textContent=config.title;$("description").textContent=config.description;$("publish").textContent=state.published?"Published locally":"Publish locally";const sec=config.sections[state.stage];$("fields").replaceChildren(node("h2",sec.title));for(const field of sec.fields)$("fields").append(makeField(field));if(sec.id==="estimate")renderItems($("fields"));if(sec.id==="review")renderReview($("fields"));$("steps").replaceChildren();config.sections.forEach((s,i)=>{const b=node("button",(i+1)+". "+s.title);b.type="button";if(i===state.stage)b.setAttribute("aria-current","step");b.addEventListener("click",()=>{state.stage=i;save();render()});$("steps").append(b)});($("back") as HTMLButtonElement).disabled=state.stage===0;$("next").textContent=state.stage===config.sections.length-1?"Submit response":"Continue";($("next") as HTMLButtonElement).disabled=!state.published&&state.stage===config.sections.length-1;}
function check(){const section=config.sections[state.stage];for(const f of section.fields){const input=document.getElementById("field-"+f.id) as HTMLInputElement|null;const val=String(state.answers[f.id]??"");const bad=(f.required&&!val.trim())||(f.type==="email"&&val&&input&&!input.checkValidity());if(bad){const err=document.querySelector('[data-error="'+f.id+'"]') as HTMLElement;err.textContent="Please provide a valid answer.";err.hidden=false;input?.focus();return false}}return true}
async function submit(){const record={schemaVersion:1,formId:config.id,id:newId(),submittedAt:new Date().toISOString(),answers:{...state.answers,items:state.items.map(x=>({...x})),estimate:total()}};const next=$("next") as HTMLButtonElement;next.disabled=true;const result=await dispatchDestinations(record,config.connections,{storageKey:RESP});next.disabled=false;if(!result.success){announce("Delivery incomplete: "+formatDeliveryResults(result.results)+". Retrying may duplicate a previously completed effect.");return}state.answers={};state.items=[{id:newId(),description:"",quantity:1,unitPrice:0}];state.stage=0;save();render();announce("Submission accepted by configured destinations: "+formatDeliveryResults(result.results))}
function download(name:string,text:string){const url=URL.createObjectURL(new Blob([text],{type:"application/json"}));const a=node("a") as HTMLAnchorElement;a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
$("back").addEventListener("click",()=>{if(state.stage>0){state.stage--;save();render()}});
$("next").addEventListener("click",async()=>{if(!state.published){announce("Publish locally to enable submissions.");return}if(!check())return;if(state.stage<config.sections.length-1){state.stage++;save();render()}else await submit()});
$("theme").addEventListener("click",()=>{config.appearance.theme=config.appearance.theme==="light"?"dark":"light";save();render()});
$("appearance").addEventListener("change",()=>{config.appearance.theme=($("appearance") as HTMLSelectElement).value as "light"|"dark";save();render()});
$("publish").addEventListener("click",()=>{state.published=true;state.stage=0;save();render();announce("Your form is ready to receive responses.")});
$("saveDraft").addEventListener("click",()=>{save();announce("Draft saved.")});
$("clearDraft").addEventListener("click",()=>{if(confirm("Clear draft answers?")){state.answers={};state.items=[{id:newId(),description:"",quantity:1,unitPrice:0}];state.stage=0;save();render()}});
$("exportConfig").addEventListener("click",()=>download("openform-schema.config.json",JSON.stringify(config,null,2)));
$("export").addEventListener("click",()=>download("openform-schema.responses.json",JSON.stringify(allRecords(),null,2)));
$("view").addEventListener("click",()=>{$("responseView").textContent=JSON.stringify(allRecords(),null,2);($("responsesDialog") as HTMLDialogElement).showModal()});
$("closeResponses").addEventListener("click",()=>($("responsesDialog") as HTMLDialogElement).close());
$("importConfig").addEventListener("change",async e=>{const file=(e.target as HTMLInputElement).files?.[0];if(!file)return;try{if(file.size>250000)throw Error("Configuration too large.");const value=validate(JSON.parse(await file.text()) as SchemaConfig);if(!confirm("Replace current settings?"))return;config=value;state.published=false;state.stage=0;save();render();announce("Configuration imported.")}catch(err){announce("Import failed: "+String(err))}});
const connections=createDestinationSettings({getConfig:()=>config.connections,onSave:value=>{config.connections=value;save();announce("Connections saved.")}});$("connections").replaceWith(connections);
async function init(){try{const r=await fetch("./form.config.json");if(!r.ok)throw Error("Cannot load form config");config=validate(await r.json() as SchemaConfig);try{const saved=JSON.parse(localStorage.getItem(DRAFT)||"null");if(saved){config=validate(saved.config);state=saved.state}}catch{}if(new URLSearchParams(location.search).get("edit")==="1"){state.published=false;save()}render()}catch(err){announce("Failed to start: "+String(err))}}
init();

document.getElementById("exportWebsite").addEventListener("click",()=>downloadWebsite(config,config.connections));document.getElementById("exportWebsiteJson").addEventListener("click",()=>downloadWebsite(config,config.connections,"json"));
