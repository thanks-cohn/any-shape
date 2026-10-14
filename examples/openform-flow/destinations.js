/* OpenForm portable submission destinations. No third-party runtime. */
export const isAllowedEndpoint = raw => {
 try { const u=new URL(raw);return !u.username&&!u.password&&!u.hash&&(u.protocol==="https:"||(u.protocol==="http:"&&["localhost","127.0.0.1","[::1]"].includes(u.hostname))); } catch {return false}
};
export function normalizeDestination(d={}){
 const mode=["local","endpoint","local-and-endpoint"].includes(d.mode)?d.mode:"local";
 const url=String(d.url||"").trim();
 if(mode!=="local"&&!isAllowedEndpoint(url))throw Error("Enter an HTTPS URL, or HTTP localhost for development.");
 return {mode,url};
}
export function saveLocalResponse(record,key){
 let existing;try{existing=JSON.parse(localStorage.getItem(key)||"[]");if(!Array.isArray(existing))existing=[]}catch{existing=[]}
 localStorage.setItem(key,JSON.stringify([...existing,record]));return {status:"completed",kind:"storage.write"};
}
export async function sendToEndpoint(record,endpoint,{test=false}={}){
 if(!isAllowedEndpoint(endpoint))throw Error("Endpoint URL is not permitted.");
 const request={...record,...(test?{test:true}:{})};
 const response=await fetch(endpoint,{method:"POST",mode:"cors",credentials:"omit",redirect:"error",headers:{"Content-Type":"application/json"},body:JSON.stringify(request)});
 if(!response.ok)throw Error("Endpoint returned HTTP "+response.status);
 return {status:"completed",kind:"http.post",httpStatus:response.status};
}
export function attachDestinations({getConfig,onChange,announce,themeRoot=document.body}){
 const button=document.createElement("button");button.type="button";button.className="outline";button.textContent="Destinations";button.id="destinationsButton";
 const header=document.querySelector(".header .actions");header?.insertBefore(button,header.querySelector("#publish"));
 const dialog=document.createElement("dialog");dialog.id="destinationsDialog";dialog.setAttribute("aria-labelledby","destTitle");
 dialog.innerHTML=`<form method="dialog" id="destinationForm"><h2 id="destTitle">Response destinations</h2>
 <p class="small">Choose where finished responses go. No account or external service required for local storage. This configuration is included in exported form JSON.</p>
 <label for="destinationMode">Delivery method</label><select id="destinationMode"><option value="local">Save on this device</option><option value="endpoint">Send to URL (POST)</option><option value="local-and-endpoint">Save locally and send to URL</option></select>
 <label for="destinationUrl">HTTPS endpoint / webhook URL</label><input id="destinationUrl" type="url" placeholder="https://example.org/api/submissions" autocomplete="off" spellcheck="false">
 <p class="small">The browser sends form JSON directly to this URL. Your server must permit CORS. A webhook URL stored in client-side JSON is public—never put secret tokens or private webhook credentials here. Use your own backend relay for protected integrations. Only HTTPS is allowed except local development.</p>
 <p class="small">A URL test sends a real synthetic POST with <code>test: true</code>; only test destinations you control.</p>
 <div id="destStatus" role="status" class="small"></div>
 <div class="dialog-actions"><button type="button" id="testDestination" class="outline">Send test</button><button type="button" id="cancelDestination" class="outline">Cancel</button><button type="submit" class="filled">Save settings</button></div></form>`;
 themeRoot.append(dialog);
 const mode=dialog.querySelector("#destinationMode"),url=dialog.querySelector("#destinationUrl"),status=dialog.querySelector("#destStatus");
 const open=()=>{const d=getConfig().destinations||{mode:"local",url:""};mode.value=d.mode||"local";url.value=d.url||"";status.textContent="";dialog.showModal()};
 button.addEventListener("click",open);
 dialog.querySelector("#cancelDestination").addEventListener("click",()=>dialog.close());
 dialog.querySelector("#destinationForm").addEventListener("submit",e=>{e.preventDefault();try{const d=normalizeDestination({mode:mode.value,url:url.value});onChange(d);dialog.close();announce("Response destination saved. Publish locally to activate submission.");}catch(err){status.textContent=err.message}});
 dialog.querySelector("#testDestination").addEventListener("click",async()=>{status.textContent="Sending a synthetic test POST…";try{const dest=normalizeDestination({mode:"endpoint",url:url.value});const result=await sendToEndpoint({schemaVersion:1,formId:getConfig().id,id:"test-"+Date.now(),submittedAt:new Date().toISOString(),answers:{}},dest.url,{test:true});status.textContent="Endpoint accepted test (HTTP "+result.httpStatus+"). This does not guarantee future delivery.";}catch(err){status.textContent="Test failed: "+err.message}});
 return {open};
}
