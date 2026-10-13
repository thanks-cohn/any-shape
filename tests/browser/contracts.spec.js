import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import Ajv from 'ajv';

const matrix = [[320,640],[360,780],[667,375],[768,1024],[1024,768],[1366,768],[1920,1080],[3440,1440],[280,280],[375,320],[480,400],[600,360],[900,400],[1200,400],[713,333]];

async function geometry(page) {
  const failures = await page.evaluate(() => {
    const errors = [];
    if (document.documentElement.scrollWidth > innerWidth + 1) errors.push('document overflow');
    for (const element of document.querySelectorAll('main a, main button, main input, main select, .as-card h3')) {
      // Optional script-only tools are intentionally absent in the no-JS workflow.
      if (element.closest('.lab-controls[hidden]')) continue;
      const rect = element.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1 || rect.left < -1 || rect.right > innerWidth + 1) errors.push(element.tagName + ' unreachable');
      if (element.scrollWidth > element.clientWidth + 1 && !['INPUT','SELECT'].includes(element.tagName)) errors.push(element.tagName + ' text overflow');
    }
    return errors;
  });
  expect(failures).toEqual([]);
}

for (const [width, height] of matrix) {
  test(`AS-002/010 matrix ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/examples/');
    await geometry(page);
    await page.getByRole('button', { name: 'Apply preferences' }).scrollIntoViewIfNeeded();
    await expect(page.getByRole('button', { name: 'Apply preferences' })).toBeInViewport();
  });
}

test('AS-001/013 cards respond to their containers, not the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto('/examples/');
  const modes = () => page.locator('.comparison .as-card').evaluateAll(cards => cards.map(card => getComputedStyle(card).getPropertyValue('--as-layout-mode').trim()));
  expect(await modes()).toEqual(['stack', 'split']);
  const composition = () => page.locator('.comparison .as-card').evaluateAll(cards => cards.map(card => {
    const art = card.firstElementChild.getBoundingClientRect();
    const body = card.lastElementChild.getBoundingClientRect();
    return body.left > art.right ? 'split' : body.top >= art.bottom ? 'stack' : 'invalid';
  }));
  expect(await composition()).toEqual(['stack', 'split']);
  await page.locator('#wide-panel .as-panel').evaluate(el => el.style.inlineSize = '250px');
  expect(await modes()).toEqual(['stack', 'stack']);
  expect(await composition()).toEqual(['stack', 'stack']);
  const report = await page.evaluate(async () => (await import('/src/diagnostics.js')).inspectLayout(document.querySelector('.comparison')));
  const mode = report.findings.find(f => f.code === 'layout-mode');
  expect(mode.evidence.container.width).toBeGreaterThan(0);
  expect(mode.evidence.reason).toBe('authored-css-marker');
  expect(mode.evidence.mode).toBe('stack');
});

test('AS-004/005 200% and 400% equivalent reflow and enlarged translated content', async ({ page }) => {
  for (const width of [640, 320]) {
    await page.setViewportSize({ width, height: 720 });
    await page.goto('/examples/?stress=1');
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    await geometry(page);
    await expect(page.locator('.as-card h3').first()).toContainText('Wissens');
  }
});

test('AS-006 keyboard order, focus, navigation and form submission', async ({ page }) => {
  await page.goto('/examples/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Explore the lab' }).first()).toBeFocused();
  const outline = await page.locator(':focus').evaluate(el => getComputedStyle(el).outlineWidth);
  expect(parseFloat(outline)).toBeGreaterThanOrEqual(2);
  await page.getByLabel('Display name').focus();
  await page.keyboard.type('Ada');
  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Reading density')).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Apply preferences' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toHaveText('Preferences applied locally.');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Apply preferences' })).toBeFocused();
});

test('AS-007/015 no JavaScript and missing diagnostics preserve native interactions', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 640 } });
  const page = await context.newPage();
  await page.goto('/examples/');
  await geometry(page);
  await page.getByLabel('Display name').fill('Ada');
  await page.getByRole('button', { name: 'Apply preferences' }).click();
  await expect(page).toHaveURL(/density=/);
  await page.getByText('How adaptation works', { exact: true }).click();
  await expect(page.locator('details p')).toBeVisible();
  await context.close();
});

test('AS-015 remove diagnostics only, keep enhancement working', async ({ page }) => {
  await page.route('**/src/diagnostics.js', route => route.abort());
  await page.goto('/examples/');
  await geometry(page);
  await page.getByLabel('Display name').fill('Ada');
  await page.getByRole('button', { name: 'Apply preferences' }).click();
  await expect(page.getByRole('status')).toHaveText('Preferences applied locally.');
});

test('AS-008/009 reduced motion, RTL and touch targets', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/examples/?rtl=1&stress=1');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await geometry(page);
  const controls = await page.locator('main button, main input, main select, nav a').evaluateAll(els => els.map(el => ({ height: el.getBoundingClientRect().height, animation: getComputedStyle(el).animationName })));
  for (const control of controls) {
    expect(control.height).toBeGreaterThanOrEqual(44);
    expect(control.animation).toBe('none');
  }
});

test('touch interaction works without hover', async ({ browser }) => {
  const context = await browser.newContext({ hasTouch: true, viewport: { width: 360, height: 780 } });
  const page = await context.newPage();
  await page.goto('/examples/');
  await page.getByText('How adaptation works', { exact: true }).tap();
  await expect(page.locator('details p')).toBeVisible();
  await context.close();
});

test('AS-011 removing container rules leaves a usable baseline', async ({ page }) => {
  await page.route('**/src/any-shape.css', async route => {
    const css = await readFile('src/any-shape.css', 'utf8');
    // Container enhancements are the final named layer; remove it entirely.
    await route.fulfill({ contentType: 'text/css', body: css.split('/* CONTAINER ENHANCEMENT */')[0] });
  });
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/examples/');
  await geometry(page);
  await expect(page.locator('.as-card').first()).toHaveCSS('display', 'grid');
});

test('AS-012/014 broken fixtures are diagnosed and reports redact sensitive data', async ({ page }) => {
  const requests = [];
  const logs = [];
  page.on('request', req => requests.push(req.url()));
  page.on('console', message => logs.push(message.text()));
  await page.goto('/examples/broken.html');
  await page.evaluate(() => import('/src/diagnostics.js'));
  const countBefore = requests.length;
  const logsBefore = logs.length;
  const report = await page.evaluate(async () => {
    const { inspectLayout } = await import('/src/diagnostics.js');
    const before = document.documentElement.outerHTML;
    const report = inspectLayout(document.querySelector('main'));
    if (before !== document.documentElement.outerHTML) throw new Error('Inspector mutated the DOM');
    return report;
  });
  const validate = new Ajv().compile(JSON.parse(await readFile('src/diagnostic.schema.json', 'utf8')));
  expect(validate(report), JSON.stringify(validate.errors)).toBe(true);
  for (const code of ['overflow-x', 'clipped-control', 'container-mismatch']) expect(report.findings.some(f => f.code === code)).toBe(true);
  const overflow = report.findings.find(f => f.code === 'overflow-x');
  expect(overflow.evidence.scrollWidth).toBeGreaterThan(overflow.evidence.box.width);
  expect(overflow.evidence.ancestors.length).toBeGreaterThan(0);
  expect(overflow.evidence.css.whiteSpace).toBe('nowrap');
  const serialized = JSON.stringify(report);
  for (const secret of ['PRIVATE_TEXT_CANARY','PRIVATE_TOKEN_CANARY','PRIVATE_URL_CANARY','PRIVATE_ATTRIBUTE_CANARY']) expect(serialized).not.toContain(secret);
  expect(requests.length).toBe(countBefore); // Scanning makes no requests; module is already loaded.
  expect(logs.length).toBe(logsBefore);
  await expect(page.evaluate(async () => {
    try { (await import('/src/diagnostics.js')).inspectLayout(document.body, { includeContent: true }); }
    catch (error) { return error.message; }
  })).resolves.toContain('unsupported');
});

test('overlay lifecycle is opt-in, click-through and fully reversible', async ({ page }) => {
  await page.goto('/examples/broken.html');
  const result = await page.evaluate(async () => {
    const { createOverlay } = await import('/src/diagnostics.js');
    const before = document.querySelectorAll('body *').length;
    const overlay = createOverlay(document.querySelector('main'));
    const untouched = document.querySelectorAll('body *').length === before;
    overlay.enable(); overlay.enable(); overlay.refresh();
    const host = document.querySelector('[data-as-overlay]');
    const clickThrough = getComputedStyle(host).pointerEvents;
    const marks = host.shadowRoot.querySelectorAll('div').length;
    overlay.disable();
    const disabled = !document.querySelector('[data-as-overlay]');
    overlay.enable(); overlay.destroy(); overlay.destroy();
    return { untouched, clickThrough, marks, disabled, cleaned: document.querySelectorAll('body *').length === before };
  });
  expect(result).toMatchObject({ untouched: true, clickThrough: 'none', disabled: true, cleaned: true });
  expect(result.marks).toBeGreaterThan(0);
});

test('accessibility audit: showcase at narrow and wide widths', async ({ page }) => {
  const axe = await readFile('node_modules/axe-core/axe.min.js', 'utf8');
  for (const width of [320, 1366]) {
    await page.setViewportSize({ width, height: 768 });
    await page.goto('/examples/');
    await page.addScriptTag({ content: axe });
    const results = await page.evaluate(() => axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa','wcag22aa'] } }));
    expect(results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
  }
});

test('AS-003 screenshots for human review, never auto-approved goldens', async ({ page }, testInfo) => {
  for (const [width, height] of [[320,640],[1366,768],[1920,1080]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/examples/');
    await geometry(page);
    const path = testInfo.outputPath(`showcase-${width}.png`);
    await page.screenshot({ path, fullPage: true });
    await testInfo.attach(`showcase-${width}`, { path, contentType: 'image/png' });
  }
});
