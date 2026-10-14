import {test,expect} from '@playwright/test';
for(const form of ['openform','openform-flow','openform-schema']){
 test(form+' published view shows only respondent interface',async({page})=>{
  await page.goto('/examples/'+form+'/?edit=1');
  await page.evaluate(()=>localStorage.clear());
  await page.reload();
  await page.getByRole('button',{name:'Publish locally'}).click();
  await expect(page.locator('body')).toHaveClass(/respondent-mode/);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.sidebar, .panel, aside')).toBeHidden();
  await expect(page.locator('header, .top, .header')).toBeHidden();
  await expect(page.getByRole('button',{name:'Connections'})).toBeHidden();
  await expect(page.locator('h2').first()).toBeVisible();
  await page.goto('/examples/'+form+'/');
  await expect(page.locator('body')).toHaveClass(/respondent-mode/);
  await expect(page.locator('header')).toBeHidden();
  await page.goto('/examples/'+form+'/?edit=1');
  await expect(page.locator('body')).not.toHaveClass(/respondent-mode/);
 });
}
