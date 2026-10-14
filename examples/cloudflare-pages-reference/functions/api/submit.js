// Reference implementation: Cloudflare Pages Functions with optional R2, D1 and webhook.
// Each destination reports its own outcome; HTTP 200 means all enabled effects succeeded.
export async function onRequestPost({ request, env }) {
  let input;
  try {
    if (Number(request.headers.get("content-length") || 0) > 65536) return json({error:"payload_too_large"},413);
    const raw = await request.text();
    if (raw.length > 65536) return json({error:"payload_too_large"},413);
    input = JSON.parse(raw);
  } catch { return json({error:"invalid_json"},400); }
  if (!input || typeof input !== "object" || Array.isArray(input) ||
      !/^[a-zA-Z0-9_-]{1,64}$/.test(input.formId || "") ||
      !input.answers || typeof input.answers !== "object" || Array.isArray(input.answers))
    return json({error:"invalid_submission"},400);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const record = {schemaVersion:1,submissionId:id,formId:input.formId,createdAt,answers:input.answers};
  const key = "submissions/" + input.formId + "/submission-" + id + "-" + createdAt.replace(/[:.]/g,"-") + ".json";
  const effects = {};
  const payload = JSON.stringify(record);
  if (env.SUBMISSIONS_R2) {
    try {
      await env.SUBMISSIONS_R2.put(key,payload,{httpMetadata:{contentType:"application/json"}});
      effects.r2 = {status:"accepted",key};
    } catch { effects.r2 = {status:"failed"}; }
  }
  if (env.SUBMISSIONS_DB) {
    try {
      await env.SUBMISSIONS_DB.prepare("INSERT INTO submissions (id, form_id, created_at, payload_json) VALUES (?, ?, ?, ?)")
        .bind(id,input.formId,createdAt,payload).run();
      effects.d1 = {status:"accepted"};
    } catch { effects.d1 = {status:"failed"}; }
  }
  if (env.WEBHOOK_URL) {
    try {
      const url = new URL(env.WEBHOOK_URL);
      if (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost","127.0.0.1"].includes(url.hostname))) throw Error("invalid webhook target");
      const response = await fetch(url,{method:"POST",headers:{"content-type":"application/json"},body:payload,redirect:"error"});
      effects.webhook = {status:response.ok?"accepted":"failed",httpStatus:response.status};
    } catch { effects.webhook = {status:"failed"}; }
  }
  if (!Object.keys(effects).length) return json({error:"no_destinations_configured"},503);
  const ok = Object.values(effects).every(e=>e.status==="accepted");
  return json({submissionId:id,recordUrl:"/api/submissions/"+id,status:ok?"accepted":"partial_failure",effects},ok?200:207);
}
function json(value,status){return new Response(JSON.stringify(value),{status,headers:{"content-type":"application/json","cache-control":"no-store"}});}
