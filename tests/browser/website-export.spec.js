import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';

function unpackStoredZip(bytes){
 const files=new Map();let offset=0;
 while(offset+30<=bytes.length&&bytes.readUInt32LE(offset)===0x04034b50){
  const compressedSize=bytes.readUInt32LE(offset+18),nameLength=bytes.readUInt16LE(offset+26),extraLength=bytes.readUInt16LE(offset+28);
  const name=bytes.subarray(offset+30,offset+30+nameLength).toString('utf8');
  const begin=offset+30+nameLength+extraLength;
  files.set(name,bytes.subarray(begin,begin+compressedSize).toString('utf8'));
  offset=begin+compressedSize;
 }
 return files;
}

for(const directory of ['openform','openform-flow','openform-schema']){
 test(directory+' exports a respondent-only static site ZIP with its configured webhook',async({page})=>{
  await page.goto('/examples/'+directory+'/?edit=1');
  await page.evaluate(()=>localStorage.clear());
  await page.reload();
  await page.getByRole('button',{name:'Connections'}).click();
  await page.getByRole('button',{name:'+ Add destination'}).click();
  await page.getByPlaceholder('Destination label').last().fill('Public form receiver');
  await page.getByPlaceholder('https://your-domain.example/receive').last().fill('https://example.org/api/forms');
  await page.getByRole('button',{name:'Save connections'}).click();
  const downloaded=page.waitForEvent('download');
  await page.getByRole('button',{name:'Export ready-to-upload website ZIP'}).click();
  const download=await downloaded;
  expect(download.suggestedFilename()).toBe('website-form.zip');
  const files=unpackStoredZip(await readFile(await download.path()));
  expect([...files.keys()]).toEqual(['index.html','style.css','app.js','form.json','README.md']);
  expect(files.get('index.html')).not.toMatch(/settings|editor|any.shape/i);
  expect(files.get('index.html')).toContain('<form id="form">');
  expect(files.get('README.md')).toContain('Access-Control-Allow-Origin');
  const definition=JSON.parse(files.get('form.json'));
  expect(definition.delivery.webhooks).toEqual(expect.arrayContaining([expect.objectContaining({name:'Public form receiver',url:'https://example.org/api/forms',method:'POST'})]));
  expect(definition.delivery.webhooks.every(target=>target.kind!=='local')).toBe(true);
  expect(files.get('app.js')).not.toContain('localStorage');
 });
}
