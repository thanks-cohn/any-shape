// Reference retrieval: D1 lookup by public ID; R2 objects use recorded key stored in D1.
// This small reference uses D1 as index when both are enabled; in R2-only mode
// the deterministic object key is returned from POST and can be retrieved via the key query.
export async function onRequestGet({params,env,request}) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!id || !/^[a-f0-9-]{36}$/i.test(id)) return result({error:"invalid_id"},400);
  if (env.SUBMISSIONS_DB) {
    const row = await env.SUBMISSIONS_DB.prepare("SELECT payload_json FROM submissions WHERE id = ?").bind(id).first();
    if (!row) return result({error:"not_found"},404);
    return new Response(row.payload_json,{headers:{"content-type":"application/json","cache-control":"no-store"}});
  }
  // R2-only reference: a separate index or deterministic key scheme is required
  // for stable opaque-ID lookup. Fail honestly rather than claim resolution.
  return result({error:"retrieval_requires_index",message:"Enable D1 lookup or implement a verified R2 key index."},501);
}
function result(x,s){return new Response(JSON.stringify(x),{status:s,headers:{"content-type":"application/json"}});}
