/* Any-Shape destinations v1: small, dependency-free browser adapter. */
export function allowedUrl(value){
 try{const u=new URL(value);return !u.username&&!u.password&&!u.hash&&(u.protocol==="https:"||(u.protocol==="http:"&&["localhost","127.0.0.1","[::1]"].includes(u.hostname)));}catch{return false}
}
export function normalizeDestinations(input={}){
 if(Array.isArray(input))input={targets:input};
 const targets=input.targets??[];
 if(!Array.isArray(targets)||targets.length>12)throw Error("Use at most 12 destinations.");
 const ids=new Set();
 return {version:1,targets:targets.map((target,i)=>{
  if(!target||typeof target!=="object")throw Error("Invalid destination.");
  const id=String(target.id||"destination-"+i),kind=target.kind||"http",label=String(target.label||"Destination "+(i+1));
  if(!/^[a-zA-Z0-9_-]{1,64}$/.test(id)||ids.has(id))throw Error("Destination IDs must be unique.");ids.add(id);
  if(!["http","local"].includes(kind))throw Error("Unsupported destination kind: "+kind);
  const url=String(target.url||"").trim();
  if(kind==="http"&&!allowedUrl(url))throw Error("Use an HTTPS destination or localhost for testing.");
  return {id,label:label.slice(0,90),kind,url:kind==="http"?url:"",enabled:target.enabled!==false,required:target.required!==false};
 })};
}
export function saveLocal(record,storageKey){
 const value=JSON.parse(localStorage.getItem(storageKey)||"[]");if(!Array.isArray(value))throw Error("Unexpected local response format.");
 localStorage.setItem(storageKey,JSON.stringify([...value,record]));
 return {kind:"local",status:"accepted"};
}
export async function postRecord(url,record){
 if(!allowedUrl(url))throw Error("Unsafe URL");
 const response=await fetch(url,{method:"POST",mode:"cors",credentials:"omit",redirect:"error",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(record)});
 if(!response.ok)throw Error("HTTP "+response.status);
 return {kind:"http",status:"accepted",httpStatus:response.status};
}
export async function dispatchDestinations(record,config,{storageKey,onResult}={}){
 const spec=normalizeDestinations(config),results=[];
 for(const target of spec.targets.filter(t=>t.enabled)){
  try{const result=target.kind==="local"?saveLocal(record,storageKey):await postRecord(target.url,record);
   const outcome={id:target.id,required:target.required,...result};results.push(outcome);onResult?.(outcome);
  }catch(error){const outcome={id:target.id,required:target.required,kind:target.kind,status:"failed",error:String(error.message||error)};results.push(outcome);onResult?.(outcome)}
 }
 return {results,success:!results.some(x=>x.required&&x.status!=="accepted"),partial:results.some(x=>x.status==="accepted")&&results.some(x=>x.status==="failed")};
}
export function createDestinationSettings({getConfig,onSave,cssClass="outline"}){
 const button=document.createElement("button");button.type="button";button.className=cssClass;button.textContent="Connections";button.id="connectionsButton";
 const dialog=document.createElement("dialog");dialog.className="connections-dialog";dialog.setAttribute("aria-label","Connections and destinations");
 const root=document.createElement("div");const h=document.createElement("h2");h.textContent="Connections & destinations";
 const intro=document.createElement("p");intro.textContent="Add local storage and HTTPS JSON POST destinations. No secrets in browser configuration. Each enabled destination receives an independent copy.";
 const list=document.createElement("div");const feedback=document.createElement("p");feedback.setAttribute("role","status");
 const add=document.createElement("button");add.type="button";add.textContent="+ Add destination";add.className=cssClass;
 const cancel=document.createElement("button");cancel.type="button";cancel.textContent="Cancel";cancel.className=cssClass;
 const save=document.createElement("button");save.type="button";save.textContent="Save connections";save.className=cssClass;
 const footer=document.createElement("div");footer.className="connections-actions";footer.append(add,cancel,save);
 const note=document.createElement("p");note.textContent="Webhook URLs in exported JSON are public. Use a trusted server relay for secret credentials, signing, guaranteed delivery, or services that reject browser CORS. Test POSTs reach real destinations.";
 root.append(h,intro,list,add===null?document.createTextNode(""):note,feedback,footer);dialog.append(root);document.body.append(dialog);
 let draft;
 function line(target){
  const row=document.createElement("fieldset");row.className="connection-row";const legend=document.createElement("legend");legend.textContent="Destination";row.append(legend);
  const label=(title,input)=>{const l=document.createElement("label");l.textContent=title;l.append(input);return l};
  const name=document.createElement("input");name.value=target.label||"";name.maxLength=90;name.placeholder="Destination label";
  const type=document.createElement("select");for(const [v,title]of [["local","Save locally"],["http","HTTPS endpoint / webhook"]]){const o=document.createElement("option");o.value=v;o.textContent=title;type.append(o)}type.value=target.kind;
  const url=document.createElement("input");url.value=target.url||"";url.type="url";url.placeholder="https://your-domain.example/receive";url.autocomplete="off";
  const enabled=document.createElement("input");enabled.type="checkbox";enabled.checked=target.enabled!==false;
  const required=document.createElement("input");required.type="checkbox";required.checked=target.required!==false;
  const remove=document.createElement("button");remove.type="button";remove.className=cssClass;remove.textContent="Remove";
  const test=document.createElement("button");test.type="button";test.className=cssClass;test.textContent="Send test POST";
  row.append(label("Name",name),label("Delivery type",type),label("Endpoint URL",url),label("Enabled",enabled),label("Required for success",required),remove,test);
  type.addEventListener("change",()=>{url.disabled=type.value==="local";test.disabled=type.value==="local"});type.dispatchEvent(new Event("change"));
  const sync=()=>Object.assign(target,{label:name.value,kind:type.value,url:url.value,enabled:enabled.checked,required:required.checked});
  for(const input of [name,type,url,enabled,required])input.addEventListener("change",sync);
  remove.addEventListener("click",()=>{draft.targets=draft.targets.filter(x=>x!==target);row.remove()});
  test.addEventListener("click",async()=>{sync();feedback.textContent="Sending test…";try{await postRecord(target.url,{schemaVersion:1,test:true,formId:"connection-test",id:"test-"+Date.now(),submittedAt:new Date().toISOString(),answers:{}});feedback.textContent="Test accepted by endpoint. Downstream processing is not verified."}catch(error){feedback.textContent="Test failed: "+error.message}});
  list.append(row);
 }
 button.addEventListener("click",()=>{draft=structuredClone(normalizeDestinations(getConfig()));list.replaceChildren();draft.targets.forEach(line);feedback.textContent="";dialog.showModal()});
 add.addEventListener("click",()=>{if(draft.targets.length>=12){feedback.textContent="Maximum 12 destinations.";return}const target={id:"d"+Date.now().toString(36)+Math.random().toString(36).slice(2,5),label:"New destination",kind:"http",url:"",enabled:true,required:true};draft.targets.push(target);line(target)});
 cancel.addEventListener("click",()=>dialog.close());
 save.addEventListener("click",()=>{try{const spec=normalizeDestinations(draft);onSave(spec);dialog.close()}catch(error){feedback.textContent=error.message}});
 return button;
}
export function legacyDestinationToTargets(value){
 if(value?.targets)return normalizeDestinations(value);
 if(value?.mode==="endpoint")return normalizeDestinations({targets:[{id:"remote",label:"Endpoint",kind:"http",url:value.url}]});
 if(value?.mode==="local-and-endpoint")return normalizeDestinations({targets:[{id:"local",label:"Local",kind:"local"},{id:"remote",label:"Endpoint",kind:"http",url:value.url}]});
 return normalizeDestinations({targets:[{id:"local",label:"Local",kind:"local"}]});
}
