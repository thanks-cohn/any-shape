import test from 'node:test';
import assert from 'node:assert/strict';
import {onRequestPost} from '../examples/cloudflare-pages-reference/functions/api/submit.js';
import {onRequestGet} from '../examples/cloudflare-pages-reference/functions/api/submissions/[[id]].js';

test('Pages reference stores identical JSON in R2 and D1 and retrieves by URL', async()=>{
 let object, row, sql; const objects=new Map();
 const env={
  SUBMISSIONS_R2:{async put(key,body,meta){objects.set(key,body);if(key.startsWith("submissions/"))object={key,body,meta}},async get(key){const value=objects.get(key);return value===undefined?null:{async json(){return JSON.parse(value)},async text(){return value}}}},
  SUBMISSIONS_DB:{prepare(query){sql=query;return {bind(...args){return {async run(){row=args},async first(){return {payload_json:row[3]}}}}}}}}
 };
 const request=new Request('https://example.test/api/submit',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({formId:'studio',answers:{message:'hello'}})});
 const response=await onRequestPost({request,env});
 assert.equal(response.status,200);
 const receipt=await response.json();
 assert.match(object.key,/submission-[a-f0-9-]{36}-\d{4}-/);
 assert.equal(JSON.parse(object.body).submissionId,receipt.submissionId);
 assert.equal(row[3],object.body);
 assert.match(sql,/INSERT INTO submissions/);
 const got=await onRequestGet({params:{id:receipt.submissionId},env,request:new Request('https://example.test')});
 assert.equal(got.status,200);
 assert.deepEqual(await got.json(),JSON.parse(object.body));
 assert.match(sql,/SELECT payload_json/);
});
test('rejects malformed payload and honestly reports missing lookup backend',async()=>{
 const r=await onRequestPost({request:new Request('https://example.test',{method:'POST',body:'garbage'}),env:{}});
 assert.equal(r.status,400);
 const missing=await onRequestGet({params:{id:'00000000-0000-4000-8000-000000000000'},env:{},request:new Request('https://example.test')});
 assert.equal(missing.status,503);
});

test('R2-only stable record URL fetches original JSON',async()=>{
 const objects=new Map();
 const env={SUBMISSIONS_R2:{async put(key,payload){objects.set(key,payload)},async get(key){const value=objects.get(key);return value===undefined?null:{async json(){return JSON.parse(value)},async text(){return value}}}}};
 const request=new Request('https://example.test/api/submit',{method:'POST',body:JSON.stringify({formId:'flow',answers:{count:2}})});
 const submitted=await onRequestPost({request,env});assert.equal(submitted.status,200);
 const receipt=await submitted.json();
 const loaded=await onRequestGet({params:{id:receipt.submissionId},env});
 assert.equal(loaded.status,200);
 assert.equal((await loaded.json()).answers.count,2);
});

test('multipart image and text files are saved by category and referenced by JSON',async()=>{
 const stored=new Map();
 const env={SUBMISSIONS_R2:{
  async put(key,value){stored.set(key,value)},
  async get(key){const value=stored.get(key);return value==null?null:{async json(){return JSON.parse(value)},async text(){return String(value)}}}
 }};
 const fd=new FormData();
 fd.append('submission',JSON.stringify({formId:'studio',answers:{note:'attached'}}));
 fd.append('files',new File(['fake-png'],'photo.png',{type:'image/png'}));
 fd.append('files',new File(['hello'],'readme.txt',{type:'text/plain'}));
 const response=await onRequestPost({request:new Request('https://example.test/api/submit',{method:'POST',body:fd}),env});
 assert.equal(response.status,200);
 const receipt=await response.json();
 const keys=[...stored.keys()];
 assert.ok(keys.some(x=>x.startsWith('Submitted-Files/Images/studio/')));
 assert.ok(keys.some(x=>x.startsWith('Submitted-Files/Text/studio/')));
 const result=await onRequestGet({params:{id:receipt.submissionId},env});
 assert.equal(result.status,200);
 const record=await result.json();
 assert.equal(record.files.length,2);
 assert.ok(record.files.every(x=>stored.has(x.r2Key)));
 assert.equal(record.answers.note,'attached');
});
test('files cannot be accepted without R2 binding',async()=>{
 const fd=new FormData();
 fd.append('submission',JSON.stringify({formId:'studio',answers:{}}));
 fd.append('files',new File(['x'],'file.txt',{type:'text/plain'}));
 const response=await onRequestPost({request:new Request('https://example.test/api/submit',{method:'POST',body:fd}),env:{SUBMISSIONS_DB:{}}});
 assert.equal(response.status,503);
});
