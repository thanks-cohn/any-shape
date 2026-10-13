import { test, expect } from '@playwright/test';

test('independent static primitives preserve geometry without lab styles or scripts', async ({ page }) => {
  await page.goto('/examples/');
  await page.setContent(`<!doctype html><html lang="en"><head><link rel="stylesheet" href="/src/any-shape.css"><title>Primitive consumer</title></head><body>
    <main class="as-center" style="--as-max:60rem">
      <div id="stack" class="as-stack"><p>Alpha</p><p>Beta</p></div>
      <div id="cluster" class="as-cluster"><button>First</button><button>Second</button><button>Third</button></div>
      <div id="grid" class="as-grid"><p>Alpha</p><p>Beta</p><p>Gamma</p></div>
      <div id="switcher" class="as-switcher"><p>Alpha</p><p>Beta</p></div>
      <div id="frame" class="as-frame" style="--as-ratio:2/1"><svg viewBox="0 0 200 100" aria-hidden="true"><rect width="200" height="100" fill="green"/></svg></div>
    </main></body></html>`, { waitUntil: 'networkidle' });
  const boxes = selector => page.locator(selector).evaluateAll(els => els.map(el => ({ x: el.getBoundingClientRect().x, y: el.getBoundingClientRect().y, width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height })));
  await page.setViewportSize({ width: 1200, height: 800 });
  const stack = await boxes('#stack > *');
  expect(stack[1].y).toBeGreaterThan(stack[0].y + stack[0].height);
  const grid = await boxes('#grid > *');
  expect(grid[0].y).toBe(grid[2].y);
  expect(grid[2].x).toBeGreaterThan(grid[0].x);
  const switcher = await boxes('#switcher > *');
  expect(switcher[0].y).toBe(switcher[1].y);
  const frame = (await boxes('#frame'))[0];
  expect(frame.width / frame.height).toBeCloseTo(2, 1);
  await page.setViewportSize({ width: 280, height: 400 });
  const narrow = await boxes('#grid > *');
  expect(narrow[2].y).toBeGreaterThan(narrow[0].y);
  const switched = await boxes('#switcher > *');
  expect(switched[1].y).toBeGreaterThan(switched[0].y);
  const cluster = await boxes('#cluster > *');
  expect(cluster[2].y).toBeGreaterThan(cluster[0].y);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test('diagnostic cost and read-only behavior on the actual showcase', async ({ page }, testInfo) => {
  await page.goto('/examples/');
  const observation = await page.evaluate(async () => {
    const { inspectLayout } = await import('/src/diagnostics.js');
    const root = document.querySelector('main');
    const before = root.outerHTML;
    inspectLayout(root); // Warm up, no production polling.
    const samples = [];
    for (let i = 0; i < 20; i++) {
      const start = performance.now();
      inspectLayout(root);
      samples.push(performance.now() - start);
    }
    samples.sort((a, b) => a - b);
    return { elements: root.querySelectorAll('*').length + 1, medianMs: samples[10], maxMs: samples[19], mutated: root.outerHTML !== before };
  });
  expect(observation.mutated).toBe(false);
  await testInfo.attach('diagnostic-timing', { body: JSON.stringify(observation), contentType: 'application/json' });
});
