import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createStaticServer } from '../scripts/serve.js';

test('static server delivers consumer assets and rejects metadata and writes', async t => {
  const server = createStaticServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const url = `http://127.0.0.1:${server.address().port}`;
  const response = await fetch(url + '/examples/');
  assert.equal(response.status, 200);
  assert.match(await response.text(), /One card. Two contexts./);
  assert.match((await fetch(url + '/src/any-shape.css')).headers.get('content-type'), /text\/css/);
  for (const path of ['/.git/config', '/package.json', '/node_modules/axe-core/axe.js', '/examples/%2e%2e/%2e%2e/etc/passwd']) {
    assert.equal((await fetch(url + path)).status, 404);
  }
  assert.equal((await fetch(url + '/examples/', { method: 'POST' })).status, 405);
});
