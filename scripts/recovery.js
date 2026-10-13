// Replacement exercise: Node assert + browser automation library replace the test runner.
// Core HTML/CSS continue working with the diagnostic artifact genuinely removed.
import assert from 'node:assert/strict';
import { mkdtemp, cp, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { createStaticServer } from './serve.js';

const scratch = await mkdtemp(join(tmpdir(), 'any-shape-recovery-'));
let browser;
let server;
try {
  await cp('src', join(scratch, 'src'), { recursive: true });
  await cp('examples', join(scratch, 'examples'), { recursive: true });
  await rm(join(scratch, 'src/diagnostics.js'));
  server = createStaticServer(scratch);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  browser = await chromium.launch(process.env.AS_CHROMIUM_PATH ? { executablePath: process.env.AS_CHROMIUM_PATH } : {});
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  const base = `http://127.0.0.1:${server.address().port}`;
  assert.equal((await fetch(base + '/src/diagnostics.js')).status, 404);
  await page.goto(base + '/examples/');
  assert.deepEqual(await page.locator('.comparison .as-card').evaluateAll(els => els.map(el => getComputedStyle(el).getPropertyValue('--as-layout-mode').trim())), ['stack','split']);
  await page.setViewportSize({ width: 320, height: 640 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
  await page.getByLabel('Display name').fill('Ada');
  await page.getByRole('button', { name: 'Apply preferences' }).click();
  assert.equal(await page.getByRole('status').textContent(), 'Preferences applied locally.');
  await page.getByRole('button', { name: 'Inspect layout', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('#report').textContent.includes('Optional diagnostics unavailable'));
  assert.match(await page.locator('#report').textContent(), /Optional diagnostics unavailable/);
  // Run accessibility through a separate harness, not @playwright/test.
  await page.addScriptTag({ content: await readFile('node_modules/axe-core/axe.min.js', 'utf8') });
  const violations = await page.evaluate(() => axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa','wcag22aa'] } }).then(result => result.violations.map(v => v.id)));
  assert.deepEqual(violations, []);
  console.log('Recovery passed: diagnostic artifact removed; replacement Node assertion harness proved container modes, narrow reflow, form behavior, graceful diagnostic failure and axe accessibility.');
} finally {
  await browser?.close();
  if (server) await new Promise(resolve => server.close(resolve));
  await rm(scratch, { recursive: true, force: true });
}
