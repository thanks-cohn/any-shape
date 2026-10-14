import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createWebhookLab} from '../scripts/webhook-lab.mjs';

test('webhook lab records actual HTTP effects and controlled outcomes',async()=>{
 const {server}=createWebhookLab({limit:3});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const origin='http://127.0.0.1:'+server.address().port;
 try{
  const headers={'Content-Type':'application/json','Origin':'http://127.0.0.1:4173'};
  const payload={schemaVersion:1,formId:'example-form',id:'sample-001',answers:{title:'Synthetic test'}};
  for(const [scenario,status] of [['success',202],['reject',400],['error',500]]){
   const r=await fetch(origin+'/receive/'+scenario,{method:'POST',headers,body:JSON.stringify(payload)});
   assert.equal(r.status,status);
   assert.equal((await r.json()).accepted,status===202);
  }
  const log=await (await fetch(origin+'/events')).json();
  assert.equal(log.count,3);
  assert.deepEqual(log.events.map(x=>x.scenario),['success','reject','error']);
  assert.equal(log.events[0].method,'POST');
  assert.equal(log.events[0].formId,'example-form');
  assert.equal(log.events[0].body.answers.title,'Synthetic test');
  const denied=await fetch(origin+'/receive/success',{method:'POST',headers:{...headers,Origin:'https://untrusted.example'},body:JSON.stringify(payload)});
  assert.equal(denied.status,403);
  const invalid=await fetch(origin+'/receive/success',{method:'POST',headers,body:'not-json'});
  assert.equal(invalid.status,400);
  const cleared=await fetch(origin+'/events',{method:'DELETE'});
  assert.equal(cleared.status,200);
  assert.equal((await (await fetch(origin+'/events')).json()).count,0);
 }finally{await new Promise(resolve=>server.close(resolve))}
});
