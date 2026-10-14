import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {websiteFiles} from '../examples/shared/website-export.js';
import {exportWebsiteForm} from '../examples/shared/portable-form.js';

const source={
 id:'public-inquiry',title:'Project inquiry',description:'Submit an inquiry',
 appearance:{theme:'light'},sections:[{id:'contact',title:'Your information',questions:[
 {id:'name',label:'Name',type:'text',required:true},
 {id:'email',label:'Email',type:'email',required:true},
 {id:'topic',label:'Topic',type:'select',options:['Research','Other']}
 ]}],
 destinations:{version:1,targets:[
 {id:'local',label:'Save here',kind:'local',enabled:true,required:true},
 {id:'webhook',label:'Project inbox',kind:'http',url:'https://example.org/api/submissions',enabled:true,required:true}
 ]}
};

test('portable form exports only configured webhook targets, not local storage or editor data',()=>{
 const spec=exportWebsiteForm(source);
 assert.equal(spec.format,'portable-form');
 assert.equal(spec.formatVersion,1);
 assert.equal(spec.form.title,'Project inquiry');
 assert.equal(spec.form.sections[0].fields.length,3);
 assert.deepEqual(spec.delivery.webhooks,[{
 id:'webhook',name:'Project inbox',method:'POST',url:'https://example.org/api/submissions',
 contentType:'application/json',enabled:true,required:true
 }]);
 const serialized=JSON.stringify(spec);
 assert.doesNotMatch(serialized,/Save here|localStorage|ANY.SHAPE|password|token/);
});
test('published website contains normal independent files and valid browser javascript',()=>{
 const files=websiteFiles(source);
 assert.deepEqual(Object.keys(files),['index.html','style.css','app.js','form.json','README.md']);
 assert.doesNotMatch(files['index.html'],/editor|settings|author|any.shape/i);
 assert.doesNotMatch(files['app.js'],/localStorage|studio|any.shape|editor/gi);
 assert.doesNotMatch(files['form.json'],/localStorage|Save here|any.shape/gi);
 assert.match(files['README.md'],/Access-Control-Allow-Origin/);
 assert.match(files['README.md'],/Content-Type: application\/json/);
 assert.match(files['style.css'],/@media/);
 assert.doesNotThrow(()=>new vm.Script(files['app.js'],{filename:'exported-app.js'}));
});
test('retains structured estimate fields and omits local-only connections',()=>{
 const model={...source,sections:[...source.sections,{id:'estimate',title:'Estimate',fields:[]}],currency:'USD',taxRate:0.05};
 const spec=exportWebsiteForm(model);
 assert.equal(spec.calculations.currency,'USD');
 assert.equal(spec.calculations.lineItems,true);
 assert.equal(spec.calculations.taxRate,0.05);
 assert.equal(spec.delivery.webhooks.length,1);
});
