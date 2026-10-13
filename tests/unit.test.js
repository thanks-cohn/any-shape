import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import Ajv from 'ajv';
import { inspectLayout, createOverlay, classifyGeometry } from '../src/diagnostics.js';

test('import has no browser side effects and rejects invalid roots', () => {
  assert.throws(() => inspectLayout(null), /Element/);
  assert.throws(() => createOverlay(null), /Element/);
});

test('geometry classification uses tolerance and explicit clipping context', () => {
  const box = { x: 0, y: 0, width: 100, height: 40 };
  assert.deepEqual(classifyGeometry({ box, scrollWidth: 101, scrollHeight: 40, overflowX: 'visible', overflowY: 'visible' }), []);
  assert.deepEqual(classifyGeometry({ box, scrollWidth: 150, scrollHeight: 40, overflowX: 'visible', overflowY: 'visible' }), ['overflow-x']);
  assert.deepEqual(classifyGeometry({ box, scrollWidth: 150, scrollHeight: 80, overflowX: 'hidden', overflowY: 'clip' }), ['overflow-x', 'overflow-y', 'clipping']);
  assert.deepEqual(classifyGeometry({ box, scrollWidth: 150, scrollHeight: 80, overflowX: 'auto', overflowY: 'auto' }), []);
});

test('schema rejects extra fields that could carry sensitive text', async () => {
  const schema = JSON.parse(await readFile(new URL('../src/diagnostic.schema.json', import.meta.url)));
  const validate = new Ajv().compile(schema);
  const report = { schemaVersion: '0.1', viewport: { width: 320, height: 640 }, findings: [] };
  assert.equal(validate(report), true);
  assert.equal(validate({ ...report, text: 'secret' }), false);
  assert.equal(validate({ ...report, viewport: { width: -1, height: 640 } }), false);
});
