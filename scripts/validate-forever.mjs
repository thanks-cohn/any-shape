import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import Ajv2020 from 'ajv/dist/2020.js';

const upstream = resolve('vendor/forever-works');
const model = resolve(process.argv[2] || 'forever');
const evidence = resolve(process.argv[3] || 'docs/CODEX/evidence/002');
mkdirSync(evidence, { recursive: true });
const read = path => JSON.parse(readFileSync(path, 'utf8'));
const pin = read(resolve(upstream, 'UPSTREAM.json'));
for (const [path, expected] of Object.entries(pin.sha256)) {
  const actual = createHash('sha256').update(readFileSync(resolve(upstream, path))).digest('hex');
  if (actual !== expected) throw new Error(`Pinned upstream file changed: ${path}`);
}
const commands = {};
for (const operation of ['validate', 'audit']) {
  const args = ['--root', model, operation];
  const result = spawnSync(resolve(upstream, 'packages/cli/bin/forever'), args, { encoding: 'utf8', env: { ...process.env, PYTHONDONTWRITEBYTECODE: '1' } });
  writeFileSync(resolve(evidence, `forever-${operation}.stdout.json`), result.stdout || '');
  writeFileSync(resolve(evidence, `forever-${operation}.stderr.txt`), result.stderr || '');
  commands[operation] = { command: `vendor/forever-works/packages/cli/bin/forever --root ${relative(process.cwd(), model)} ${operation}`, exitCode: result.status, stdout: result.stdout || '', stderr: result.stderr || '' };
  if (result.status !== 0) throw new Error(`Upstream ${operation} failed; see captured stdout/stderr.`);
}
// The actual upstream Python CLI is deliberately narrower than JSON Schema.
// Validate against the actual published schemas as an additional, independent gate.
const schemaNames = { intent: 'project-intent', capability: 'capability', invariant: 'invariant', constraint: 'constraint', dependency: 'dependency-intent', decision: 'decision', compatibility: 'compatibility-contract', migration: 'migration', implementation: 'implementation', evidence: 'evidence' };
const ajv = new Ajv2020({ allErrors: true, strict: false });
const schemas = {};
for (const name of ['common', 'manifest', ...Object.values(schemaNames)]) {
  const schema = read(resolve(upstream, `spec/schemas/${name}.schema.json`));
  schemas[name] = schema;
  ajv.addSchema(schema, schema.$id || `https://forever.works/schemas/0.1/${name}.schema.json`);
}
const errors = [];
function validate(path, name, value) {
  const schema = schemas[name];
  const check = ajv.getSchema(schema.$id || `https://forever.works/schemas/0.1/${name}.schema.json`);
  if (!check(value)) errors.push({ path, errors: structuredClone(check.errors) });
}
const manifest = read(resolve(model, 'manifest.json'));
validate('manifest.json', 'manifest', manifest);
const entities = new Map();
const paths = new Set();
for (const files of Object.values(manifest.records)) {
  for (const file of files) {
    const path = resolve(model, file);
    if (relative(model, path).startsWith('..' + sep) || paths.has(file)) throw new Error(`Invalid or duplicate model path: ${file}`);
    paths.add(file);
    const record = read(path);
    if (!schemaNames[record.kind]) throw new Error(`Unsupported record kind: ${record.kind}`);
    validate(file, schemaNames[record.kind], record);
    if (entities.has(record.id)) errors.push({ path: file, duplicateId: record.id });
    entities.set(record.id, record);
  }
}
// Supplemental reference coverage includes fields omitted by upstream CLI's graph check.
const references = ['relatedCapabilities','relatedConstraints','relatedInvariants','relatedImplementations','requiredCapabilities','protectedInvariants','replacementRequirements','compatibilityObligations','relatedEntities','preservedCapabilities','preservedInvariants','compatibilityImpact','satisfiesCapabilities','constrainedByInvariants','satisfiesConstraints','compatibilityContracts','scope'];
for (const record of entities.values()) {
  const refs = references.flatMap(key => record[key] || []);
  for (const key of ['currentImplementation','sourceImplementation','targetImplementation']) if (record[key]) refs.push(record[key]);
  for (const verification of record.verification || []) {
    if (typeof verification === 'string') refs.push(verification);
    else refs.push(...verification.evidence || []);
  }
  for (const claim of record.claims || []) refs.push(claim.requirement, ...claim.evidence || []);
  for (const ref of refs) if (!entities.has(ref)) errors.push({ path: record.id, missingReference: ref });
}
const cliValidation = JSON.parse(commands.validate.stdout);
const cliAudit = JSON.parse(commands.audit.stdout);
const summary = { upstreamRepository: pin.repository, upstreamCommit: pin.commit, upstreamIntegrity: 'pass', commands, schemaValidation: { valid: errors.length === 0, records: entities.size, errors }, graphSupplement: 'Includes replacement requirements, scopes, claim requirement IDs and verification evidence.', audit: cliAudit, limitations: ['Audit issues are inspected, not erased by inventing future implementations.', 'Schema/graph validity does not prove product behavior or ratify proposed architecture.'] };
writeFileSync(resolve(evidence, 'forever-validation.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify({ upstream: pin.commit, cliValid: cliValidation.valid, schemaValid: errors.length === 0, records: entities.size, auditIssues: cliAudit.issueCount, errors }, null, 2));
if (!cliValidation.valid || errors.length) process.exitCode = 1;
