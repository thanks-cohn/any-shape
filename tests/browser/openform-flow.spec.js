import {test, expect} from '@playwright/test';

test.beforeEach(async({page})=>{
  await page.goto('/examples/openform-flow/');
  await page.evaluate(()=>localStorage.clear());
  await page.reload();
});
test('loads representative advanced fields and resizes without horizontal overflow',async({page})=>{
 await expect(page.getByRole('heading',{name:'Your next form, exactly how you need it.'})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Start with the basics'})).toBeVisible();
 await expect(page.locator('[data-question]')).toHaveCount(5);
 for(const width of [320,390,768,1024,1440]){
  await page.setViewportSize({width,height:780});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await expect(page.getByRole('button',{name:'Publish locally'})).toBeVisible();
 }
});
test('edit form and add a question, then publish respondent view',async({page})=>{
 await page.getByRole('button',{name:'＋ Add question'}).click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.getByLabel('Label or section title').fill('What matters most?');
 await page.getByRole('button',{name:'Save',exact:true}).click();
 await expect(page.getByText('What matters most?')).toBeVisible();
 await page.getByRole('button',{name:'Publish locally'}).click();
 await expect(page.locator('body')).toHaveClass(/respondent-mode/);
 await expect(page.getByRole('button',{name:'＋ Add question'})).toBeHidden();
 await expect(page.getByRole('button',{name:'Continue'})).toBeEnabled();
 await page.reload();
 await expect(page.locator('body')).toHaveClass(/respondent-mode/);
});
test('theme switching and complete local submit use real answers',async({page})=>{
 await page.getByLabel('Theme').selectOption('dark');
 await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
 await page.getByRole('button',{name:'Publish locally'}).click();
 await page.getByRole('button',{name:'Continue'}).click();
 await expect(page.getByRole('heading',{name:'Tell us more'})).toBeVisible();
 await page.getByRole('button',{name:'Continue'}).click();
 await expect(page.getByText('Please answer this question.')).toBeVisible();
 await page.getByRole('textbox',{name:'A short description'}).fill('We need an accessible form.');
 await page.getByRole('button',{name:'Continue'}).click();
 await expect(page.getByRole('heading',{name:'Finalize your submission'})).toBeVisible();
 await page.locator('input[type=checkbox]').last().check();
 await page.getByRole('button',{name:'Submit response'}).click();
 await expect(page.getByRole('status')).toContainText('Response accepted');
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('anyshape.flow.responses.v1')));
 expect(saved).toHaveLength(1);
 expect(saved[0].answers.summary).toBe('We need an accessible form.');
 expect(saved[0].answers.consent).toBe(true);
});
