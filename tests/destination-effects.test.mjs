import {test} from 'node:test';
import assert from 'node:assert/strict';
import {dispatchDestinations,formatDeliveryResults} from '../examples/shared/destinations.js';

const targets={targets:[
 {id:'local',label:'Save on this device',kind:'local',required:true},
 {id:'remote',label:'Test Webhook',kind:'http',url:'http://127.0.0.1:4174/receive/success',required:true}
]};
const record={schemaVersion:1,formId:'fixture',id:'record-001',answers:{title:'Synthetic'}};
async function withStubs(status,run){
 const previousFetch=globalThis.fetch,previousStorage=globalThis.localStorage;
 const saved=new Map(),received=[];
 globalThis.localStorage={getItem:key=>saved.get(key)||null,setItem:(key,value)=>saved.set(key,value)};
 globalThis.fetch=async(url,options)=>{received.push({url,options});return {ok:status>=200&&status<300,status}};
 try{await run({saved,received})}finally{globalThis.fetch=previousFetch;globalThis.localStorage=previousStorage}
}
for(const [code,accepted] of [[202,true],[400,false],[500,false]]){
 test('delivery: local save and HTTP '+code,async()=>withStubs(code,async({saved,received})=>{
  const outcome=await dispatchDestinations(record,targets,{storageKey:'responses'});
  assert.equal(outcome.success,accepted);
  assert.equal(outcome.partial,!accepted);
  assert.deepEqual(outcome.results.map(x=>x.label),['Save on this device','Test Webhook']);
  assert.deepEqual(outcome.results.map(x=>x.kind),['local','http']);
  assert.equal(outcome.results[0].status,'accepted');
  assert.equal(outcome.results[1].status,accepted?'accepted':'failed');
  assert.equal(received.length,1);
  assert.equal(received[0].options.method,'POST');
  assert.deepEqual(JSON.parse(received[0].options.body),record);
  assert.equal(JSON.parse(saved.get('responses')).length,1);
  const message=formatDeliveryResults(outcome.results);
  assert.ok(message.includes('Save on this device [local storage]: accepted'));
  assert.ok(message.includes(accepted?'Test Webhook [HTTP webhook]: accepted':'Test Webhook [HTTP webhook]: failed (HTTP '+code+')'));
  assert.ok(!message.includes('local failed'));
 }));
}
test('no local save failure is mislabeled as webhook failure',async()=>withStubs(202,async()=>{
 const result=await dispatchDestinations(record,{targets:[targets.targets[1]]},{storageKey:'responses'});
 assert.equal(result.success,true);
 assert.equal(result.results[0].kind,'http');
 assert.ok(formatDeliveryResults(result.results).includes('HTTP webhook'));
}));
