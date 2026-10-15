import {lstat, readdir, readFile, realpath} from 'node:fs/promises';
import {resolve, join, relative, sep, isAbsolute} from 'node:path';
import {createHash} from 'node:crypto';

export class PipelineError extends Error {
  constructor(code, detail, context = {}) { super(detail); this.name = 'PipelineError'; this.code = code; this.context = context; }
  toJSON() { return {code: this.code, detail: this.message, ...this.context}; }
}
export const fail = (code, detail, context) => { throw new PipelineError(code, detail, context); };
export const sha256 = value => createHash('sha256').update(value).digest('hex');
export function normalize(value) {
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(k => [k, normalize(value[k])]));
  return value;
}
export const json = value => JSON.stringify(normalize(value), null, 2) + '\n';
export const digest = value => sha256(json(value));
export function slug(value) {
  if (typeof value !== 'string' || value.length > 64 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) || /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/.test(value)) fail('INVALID_ID', 'Use a lowercase filesystem-safe slug, at most 64 characters.');
  return value;
}
export function resourcePath(value) {
  if (typeof value !== 'string' || value.length > 1024 || !value || isAbsolute(value) || /[\\:%?#\x00-\x1f\x7f]/.test(value) || value.split('/').some(x => !x || x === '.' || x === '..' || /[. ]$/.test(x))) fail('UNSAFE_RESOURCE', 'Resource must be an ordinary package-relative path.', {path: String(value).slice(0, 200)});
  return value;
}
// Reject links at EVERY component, including ancestor directories. This is not a
// sandbox against concurrent hostile filesystem mutation; inputs must be quiescent.
export async function safePath(root, parts = [], {missing = false} = {}) {
  const base = resolve(root), full = resolve(base, ...parts);
  const rel = relative(base, full);
  if (rel === '..' || rel.startsWith('..' + sep) || isAbsolute(rel)) fail('PATH_ESCAPE', 'Path escaped workspace.');
  const components = full.split(sep).filter(Boolean);
  let current = sep;
  for (const component of components) {
    current = join(current, component);
    try { const st = await lstat(current); if (st.isSymbolicLink()) fail('SYMLINK_REJECTED', 'Symlinked input/output paths are forbidden.', {path: current}); }
    catch (e) { if (e.code === 'ENOENT' && missing) return full; throw e; }
  }
  if (await realpath(full) !== full) fail('PATH_ESCAPE', 'Noncanonical filesystem root.');
  return full;
}
export const DEFAULT_LIMITS = Object.freeze({files: 4096, bytes: 64 * 1024 * 1024, fileBytes: 8 * 1024 * 1024, depth: 24});
export async function readTree(root, limits = {}) {
  limits = {...DEFAULT_LIMITS, ...limits};
  const dir = await safePath(root);
  if (!(await lstat(dir)).isDirectory()) fail('INVALID_SOURCE', 'Source must be a directory.');
  const files = [], names = new Set(); let total = 0, entries = 0;
  async function visit(path, depth) {
    if (depth > limits.depth) fail('INPUT_LIMIT', 'Input nesting limit exceeded.');
    const children = await readdir(join(dir, path), {withFileTypes: true});
    for (const child of children.sort((a,b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)) {
      if (++entries > limits.files) fail('INPUT_LIMIT', 'Input entry limit exceeded.');
      const name = path ? path + '/' + child.name : child.name;
      resourcePath(name);
      const folded = name.toLowerCase();
      if (names.has(folded)) fail('PATH_COLLISION', 'Case-insensitive path collision.', {path: name});
      names.add(folded);
      const full = await safePath(dir, [name]), st = await lstat(full);
      if (st.isDirectory()) { await visit(name, depth + 1); continue; }
      if (!st.isFile()) fail('NON_REGULAR_FILE', 'Only regular files and directories are accepted.', {path: name});
      if (st.nlink > 1) fail('HARDLINK_REJECTED', 'Hard-linked source files are forbidden.', {path: name});
      if (st.size > limits.fileBytes || total + st.size > limits.bytes) fail('INPUT_LIMIT', 'Input byte limit exceeded.', {path: name});
      const content = await readFile(full);
      if (content.length !== st.size) fail('SOURCE_CHANGED', 'Source changed during inspection.', {path: name});
      total += content.length;
      files.push({path: name, bytes: content.length, sha256: sha256(content), content});
    }
  }
  await visit('', 0);
  files.sort((a,b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  return files;
}
