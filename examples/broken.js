import { inspectLayout, createOverlay } from '../src/diagnostics.js';
const root = document.querySelector('main');
const overlay = createOverlay(root);
document.querySelector('#inspect').addEventListener('click', () => {
  const output = document.querySelector('#report');
  output.hidden = false;
  output.textContent = JSON.stringify(inspectLayout(root), null, 2);
});
document.querySelector('#overlay').addEventListener('click', event => {
  const enabled = event.currentTarget.getAttribute('aria-pressed') !== 'true';
  event.currentTarget.setAttribute('aria-pressed', String(enabled));
  if (enabled) overlay.enable(); else overlay.disable();
});
window.addEventListener('pagehide', () => overlay.destroy(), { once: true });
