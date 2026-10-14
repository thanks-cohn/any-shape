import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

async function mutant(t, change) {
  const scratch = await mkdtemp(join(tmpdir(), 'any-shape-model-test-'));
  t.after(() => rm(scratch, { recursive: true, force: true }));
  const model = join(scratch, 'forever');
  await cp('forever', model, { recursive: true });
  await change(model);
  const result = spawnSync(process.execPath, ['scripts/validate-forever.mjs', model, join(scratch, 'evidence')], { encoding: 'utf8' });
  return { result, summary: JSON.parse(await readFile(join(scratch, 'evidence/forever-validation.json'), 'utf8')) };
}

test('published schema rejects noncanonical pending provenance even when CLI misses it', async t => {
  const { result, summary } = await mutant(t, async model => {
    const path = join(model, 'invariants/identity.json');
    const record = JSON.parse(await readFile(path));
    record.provenance.reviewStatus = 'pending';
    await writeFile(path, JSON.stringify(record));
  });
  assert.equal(result.status, 1);
  assert.equal(JSON.parse(summary.commands.validate.stdout).valid, true);
  assert.equal(summary.schemaValidation.valid, false);
  assert(summary.schemaValidation.errors.some(e => e.errors?.some(error => error.instancePath === '/provenance/reviewStatus')));
});

test('supplementary graph check rejects orphan replacement requirements', async t => {
  const { result, summary } = await mutant(t, async model => {
    const path = join(model, 'dependencies/browser-css.json');
    const record = JSON.parse(await readFile(path));
    record.replacementRequirements.push('capability.orphan');
    await writeFile(path, JSON.stringify(record));
  });
  assert.equal(result.status, 1);
  assert(summary.schemaValidation.errors.some(error => error.missingReference === 'capability.orphan'));
});

test('candidate blind bundle omits machinery and history and remains schema-valid', async t => {
  const scratch = await mkdtemp(join(tmpdir(), 'any-shape-bundle-test-'));
  t.after(() => rm(scratch, { recursive: true, force: true }));
  const target = join(scratch, 'input');
  const built = spawnSync('python3', ['scripts/create-reconstruction-bundle.py', target], { encoding: 'utf8' });
  assert.equal(built.status, 0, built.stderr);
  const manifest = JSON.parse(await readFile(join(target, 'forever/manifest.json')));
  assert.deepEqual(Object.keys(manifest.records).sort(), ['capabilities','constraints','intent','invariants']);
  const inventory = JSON.parse(await readFile(join(target, 'INPUT_INVENTORY.json')));
  assert(Object.keys(inventory.files).every(path => !path.startsWith('src/') && !path.startsWith('tests/') && !path.startsWith('.git/') && !path.includes('IMPLEMENTATION_REPORT')));
  const checked = spawnSync(process.execPath, ['scripts/validate-forever.mjs', join(target, 'forever'), join(scratch, 'evidence')], { encoding: 'utf8' });
  assert.equal(checked.status, 0, checked.stdout + checked.stderr);
  const rerun = spawnSync('python3', ['scripts/create-reconstruction-bundle.py', target], { encoding: 'utf8' });
  assert.notEqual(rerun.status, 0); // Existing user inputs are never overwritten.
});

test('proof fixture copy is identical to canonical neutral fixture', async () => {
  assert.equal(await readFile(resolve('conformance/universal-v01.json'), 'utf8'), await readFile(resolve('reconstruction/python-proof/universal-v01.json'), 'utf8'));
});
