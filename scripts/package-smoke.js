import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, writeFile, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { createStaticServer } from './serve.js';

const scratch = await mkdtemp(join(tmpdir(), 'any-shape-package-'));
let browser;
let server;
try {
  const [packed] = JSON.parse(execFileSync('npm', ['pack','--ignore-scripts','--json','--pack-destination',scratch], { encoding: 'utf8' }));
  assert(packed.files.some(file => file.path === 'src/diagnostics.d.ts'));
  assert(!packed.files.some(file => file.path.startsWith('tests/') || file.path.startsWith('node_modules/')));
  const consumer = join(scratch, 'consumer');
  await mkdir(consumer);
  await writeFile(join(consumer, 'package.json'), JSON.stringify({ private: true, type: 'module' }));
  execFileSync('npm', ['install','--prefix',consumer,'--cache',resolve('.npm-cache'),'--ignore-scripts','--no-audit','--no-fund',join(scratch,packed.filename)], { stdio: 'pipe' });
  await writeFile(join(consumer, 'smoke.mjs'), `
    import assert from 'node:assert/strict';
    import { createRequire } from 'node:module';
    import { readFileSync } from 'node:fs';
    import { inspectLayout } from '@any-shape/core';
    const require = createRequire(import.meta.url);
    assert.match(readFileSync(require.resolve('@any-shape/core/css'), 'utf8'), /@container as-panel/);
    assert.equal(JSON.parse(readFileSync(require.resolve('@any-shape/core/schema'), 'utf8')).properties.schemaVersion.const, '0.1');
    assert.throws(() => inspectLayout(null), /Element/);
  `);
  execFileSync(process.execPath, [join(consumer, 'smoke.mjs')]);
  await writeFile(join(consumer, 'consumer.ts'), await readFile('tests/consumer.ts'));
  execFileSync(process.execPath, [resolve('node_modules/typescript/bin/tsc'), '--noEmit','--strict','--target','ES2022','--module','NodeNext','--moduleResolution','NodeNext',join(consumer,'consumer.ts')], { stdio: 'pipe' });
  const root = join(consumer, 'node_modules/@any-shape/core');
  const pkg = JSON.parse(await readFile(join(root, 'package.json')));
  assert.equal(pkg.dependencies, undefined);
  server = createStaticServer(root);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  browser = await chromium.launch(process.env.AS_CHROMIUM_PATH ? { executablePath: process.env.AS_CHROMIUM_PATH } : {});
  const page = await browser.newPage({ viewport: { width: 320, height: 640 } });
  await page.goto(`http://127.0.0.1:${server.address().port}/examples/`);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
  await page.getByRole('button', { name: 'Inspect layout', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('#report').textContent.includes('schemaVersion'));
  assert.match(await page.locator('#report').textContent(), /"schemaVersion": "0.1"/);
  console.log(`Package passed: ${packed.files.length} files, ${packed.size} packed bytes; external JS/CSS/schema/type resolution and static adopter smoke verified with no runtime dependencies.`);
} finally {
  await browser?.close();
  if (server) await new Promise(resolve => server.close(resolve));
  await rm(scratch, { recursive: true, force: true });
}
