import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('/examples/openform/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('twenty questions, accessible controls and responsive structure', async ({page}) => {
  await expect(page.locator('.question')).toHaveCount(20);
  await expect(page.getByRole('heading', {name:'Project & Feedback Intake'})).toBeVisible();
  await expect(page.getByRole('radio', {name:'Project', exact:true})).toBeVisible();
  await expect(page.getByRole('checkbox', {name:'Learning'})).toBeVisible();
  await expect(page.locator('input[type=date]')).toHaveCount(1);
  await expect(page.locator('input[type=range]')).toHaveCount(1);
  await expect(page.getByRole('button', {name:'Publish to enable submissions'})).toBeDisabled();
  for (const width of [320, 390, 700, 1024, 1440]) {
    await page.setViewportSize({width,height:760});
    const horizontalOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    expect(horizontalOverflow, 'overflow at '+width).toBe(false);
    await expect(page.getByRole('heading', {name:'Your project'})).toBeVisible();
    await expect(page.getByRole('button', {name:'Publish locally'})).toBeVisible();
  }
});

test('theme choice and accessible editing survive local publish', async ({page}) => {
  await page.getByLabel('Appearance').selectOption('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.getByRole('button', {name:'Edit Project or request title'}).click();
  await page.getByLabel('Title / label').fill('What would you like to create?');
  await page.getByRole('button', {name:'Save changes'}).click();
  await expect(page.getByLabel('What would you like to create? *')).toBeVisible();
  await page.getByRole('button', {name:'+ Add question'}).click();
  await page.getByLabel('Title / label').fill('New optional input');
  await page.getByRole('button', {name:'Save changes'}).click();
  await expect(page.locator('.question')).toHaveCount(21);
  await page.getByRole('button', {name:'Publish locally'}).click();
  await expect(page.getByRole('button', {name:'Submit response'})).toBeEnabled();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await expect(page.locator('.question')).toHaveCount(21);
  await expect(page.getByText('New optional input')).toBeVisible();
});

test('published form validates and stores a real response locally', async ({page}) => {
  await page.getByRole('button', {name:'Publish locally'}).click();
  await page.getByRole('button', {name:'Submit response'}).click();
  await expect(page.getByRole('alert')).toContainText('Please correct');
  await page.getByLabel('Project or request title *').fill('A useful example');
  await page.getByLabel('Tell us about your idea or request *').fill('Independent input-state demonstration');
  await page.getByRole('radio', {name:'Project', exact:true}).check();
  await page.getByRole('checkbox', {name:'Learning'}).check();
  await page.getByRole('button', {name:'Submit response'}).click();
  await expect(page.getByRole('status')).toContainText('Response saved');
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('any-shape.openform.responses.v1')));
  expect(saved).toHaveLength(1);
  expect(saved[0].answers.title).toBe('A useful example');
  expect(saved[0].answers.interests).toContain('Learning');
  expect(saved[0].answers.reason).toBe('Project');
});

test('embedding only permits vetted HTTPS media; export stays local', async ({page}) => {
  await page.getByRole('button', {name:'+ Add section / embed'}).click();
  page.once('dialog', d=>d.accept());
  // Dialog confirmation opens before the editor.
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByLabel('Embed URL (https; trusted providers only)').fill('https://www.youtube-nocookie.com/embed/abc123');
  await page.getByRole('button', {name:'Save changes'}).click();
  await expect(page.locator('iframe.embed-panel')).toHaveCount(1);
  await expect(page.locator('iframe.embed-panel')).toHaveAttribute('sandbox',/allow-scripts/);
  const requestUrls=[];
  page.on('request', req=>requestUrls.push(req.url()));
  await page.getByRole('button', {name:'Export form JSON'}).click();
  expect(requestUrls.some(x=>x.includes('telemetry'))).toBe(false);
});
