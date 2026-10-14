import {test,expect} from '@playwright/test';
test.beforeEach(async({page})=>{await page.goto('/examples/openform-flow/?edit=1');await page.evaluate(()=>localStorage.clear());await page.reload()});
test('author can add named endpoint while published users never see connections',async({page})=>{
 await page.getByRole('button',{name:'Connections'}).click();
 await expect(page.getByRole('dialog',{name:'Connections and destinations'})).toBeVisible();
 await page.getByRole('button',{name:'+ Add destination'}).click();
 await page.getByPlaceholder('Destination label').last().fill('Webhook relay');
 await page.getByPlaceholder('https://your-domain.example/receive').last().fill('https://api.example.test/submit');
 await page.getByRole('button',{name:'Save connections'}).click();
 const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('anyshape.flow.draft.v1')));
 expect(stored.model.connections.targets.some(x=>x.url==='https://api.example.test/submit')).toBe(true);
 await page.getByRole('button',{name:'Publish locally'}).click();
 await expect(page.getByRole('button',{name:'Connections'})).toBeHidden();
 await expect(page.locator('.panel')).toBeHidden();
});
test('unsafe HTTP destination is rejected',async({page})=>{
 await page.getByRole('button',{name:'Connections'}).click();
 await page.getByRole('button',{name:'+ Add destination'}).click();
 await page.getByPlaceholder('https://your-domain.example/receive').last().fill('http://example.org/submit');
 await page.getByRole('button',{name:'Save connections'}).click();
 await expect(page.getByRole('dialog',{name:'Connections and destinations'})).toBeVisible();
 await expect(page.getByRole('status').last()).toContainText('HTTPS');
});
test('shared destination adapter submits canonical record to configured HTTPS receiver',async({page})=>{
 let sent;
 await page.route('https://api.example.test/submit',async route=>{
  sent=JSON.parse(route.request().postData());
  await route.fulfill({status:202,contentType:'application/json',body:'{"ok":true}',headers:{'access-control-allow-origin':'*'}});
 });
 await page.getByRole('button',{name:'Connections'}).click();
 await page.getByRole('button',{name:'+ Add destination'}).click();
 await page.getByPlaceholder('https://your-domain.example/receive').last().fill('https://api.example.test/submit');
 await page.getByRole('button',{name:'Save connections'}).click();
 await page.getByRole('button',{name:'Publish locally'}).click();
 await page.getByRole('button',{name:'Continue'}).click();
 await page.locator('textarea').first().fill('Example request');
 await page.getByRole('button',{name:'Continue'}).click();
 await page.locator('input[type=checkbox]').last().check();
 await page.getByRole('button',{name:'Submit response'}).click();
 await expect(page.getByRole('status')).toContainText('Response accepted');
 expect(sent.formId).toBe('openform-flow-reference');
 expect(sent.answers.summary).toBe('Example request');
});
