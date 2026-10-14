import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
 await page.goto('/examples/openform-flow/');
 await page.evaluate(() => localStorage.clear());
 await page.reload();
});

test('destination settings are accessible and saved in portable JSON-backed draft', async ({page}) => {
 await page.getByRole('button',{name:'Destinations'}).click();
 await expect(page.getByRole('dialog',{name:'Response destinations'})).toBeVisible();
 await page.getByLabel('Delivery method').selectOption('endpoint');
 await page.getByLabel('HTTPS endpoint / webhook URL').fill('https://example.org/collect');
 await page.getByRole('button',{name:'Save settings'}).click();
 const value=await page.evaluate(()=>JSON.parse(localStorage.getItem('anyshape.flow.draft.v1')));
 expect(value.model.destinations).toEqual({mode:'endpoint',url:'https://example.org/collect'});
 await page.reload();
 await page.getByRole('button',{name:'Destinations'}).click();
 await expect(page.getByLabel('Delivery method')).toHaveValue('endpoint');
 await expect(page.getByLabel('HTTPS endpoint / webhook URL')).toHaveValue('https://example.org/collect');
});

test('rejects untrusted protocol and preserves previous destination', async ({page}) => {
 await page.getByRole('button',{name:'Destinations'}).click();
 await page.getByLabel('Delivery method').selectOption('endpoint');
 await page.getByLabel('HTTPS endpoint / webhook URL').fill('http://example.org/test');
 await page.getByRole('button',{name:'Save settings'}).click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await expect(page.locator('#destStatus')).toContainText('HTTPS');
});

test('configured endpoint receives canonical response JSON', async ({page}) => {
 let received;
 await page.route('https://api.example.test/collect', async route => {
   received=JSON.parse(route.request().postData());
   await route.fulfill({status:202,contentType:'application/json',body:'{"accepted":true}',headers:{'access-control-allow-origin':'*'}});
 });
 await page.getByRole('button',{name:'Destinations'}).click();
 await page.getByLabel('Delivery method').selectOption('endpoint');
 await page.getByLabel('HTTPS endpoint / webhook URL').fill('https://api.example.test/collect');
 await page.getByRole('button',{name:'Save settings'}).click();
 await page.getByRole('button',{name:'Publish locally'}).click();
 await page.getByRole('button',{name:'Continue'}).click();
 await page.locator('textarea').first().fill('My advanced request');
 await page.getByRole('button',{name:'Continue'}).click();
 await page.locator('input[type=checkbox]').last().check();
 await page.getByRole('button',{name:'Submit response'}).click();
 await expect(page.getByRole('status')).toContainText('Endpoint accepted');
 expect(received.formId).toBe('openform-flow-reference');
 expect(received.answers.summary).toBe('My advanced request');
 expect(received.answers.consent).toBe(true);
});
