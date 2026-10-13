import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { resolve, relative, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultRoot = fileURLToPath(new URL('../', import.meta.url));
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml' };

export function createStaticServer(root = defaultRoot) {
  return createServer(async (request, response) => {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end(); return;
    }
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      const parts = pathname.split('/');
      // Development server exposes only consumer assets, not Git metadata or dependencies.
      if (!['examples', 'src'].includes(parts[1]) || parts.some(part => part.startsWith('.')) || pathname.includes('\\')) throw new Error('Forbidden');
      let target = resolve(root, '.' + pathname);
      if ((await stat(target)).isDirectory()) target = resolve(target, 'index.html');
      const actualRoot = await realpath(root);
      const actual = await realpath(target);
      const rel = relative(actualRoot, actual);
      if (rel === '..' || rel.startsWith('..' + sep) || !['examples','src'].includes(rel.split(sep)[0])) throw new Error('Forbidden');
      const content = await readFile(actual);
      response.writeHead(200, { 'Content-Type': mime[extname(actual)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
      response.end(request.method === 'HEAD' ? undefined : content);
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const flag = process.argv.indexOf('--port');
  const port = Number(flag === -1 ? 4173 : process.argv[flag + 1]);
  if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('Invalid port');
  const server = createStaticServer();
  server.listen(port, '127.0.0.1', () => console.log(`Any-Shape static laboratory listening on port ${server.address().port}`));
  for (const signal of ['SIGINT','SIGTERM']) process.on(signal, () => server.close());
}
