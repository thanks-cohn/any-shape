import { resolve } from 'node:path';
import config from '../playwright.config.js';
// Preserve a pre-existing development server; run unchanged contracts on a separate port.
const port = Number(process.env.AS_TEST_PORT || 43975);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Invalid AS_TEST_PORT');
const url = `http://127.0.0.1:${port}`;
export default {
  ...config,
  testDir: resolve('tests/browser'),
  use: { ...config.use, baseURL: url },
  webServer: { ...config.webServer, cwd: process.cwd(), command: `npm run dev -- --port ${port}`, url: `${url}/examples/` }
};
