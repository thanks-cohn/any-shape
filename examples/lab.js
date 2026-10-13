const params = new URLSearchParams(location.search);
const controls = document.querySelector('.lab-controls');
controls.hidden = false;
const titles = [...document.querySelectorAll('.as-card h3')];
const original = titles.map(el => el.textContent);
function stress(enabled) {
  titles.forEach((el, index) => el.textContent = enabled ? 'Wissensentdeckungsreise: außergewöhnlich lange zusammenhängende Gedanken für neugierige Menschen' : original[index]);
  document.querySelector('#stress').setAttribute('aria-pressed', String(enabled));
}
function rtl(enabled) {
  document.documentElement.dir = enabled ? 'rtl' : 'ltr';
  document.querySelector('#rtl').setAttribute('aria-pressed', String(enabled));
}
stress(params.get('stress') === '1');
rtl(params.get('rtl') === '1');
const density = params.get('density');
if (['compact','comfortable'].includes(density)) {
  document.documentElement.dataset.density = density;
  document.querySelector('#density').value = density;
}
document.querySelector('#stress').addEventListener('click', event => stress(event.currentTarget.getAttribute('aria-pressed') !== 'true'));
document.querySelector('#rtl').addEventListener('click', event => rtl(event.currentTarget.getAttribute('aria-pressed') !== 'true'));
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  document.documentElement.dataset.density = document.querySelector('#density').value;
  document.querySelector('[role="status"]').textContent = 'Preferences applied locally.';
});
document.querySelector('#inspect').addEventListener('click', async () => {
  const output = document.querySelector('#report');
  output.hidden = false;
  try {
    const { inspectLayout } = await import('../src/diagnostics.js');
    output.textContent = JSON.stringify(inspectLayout(document.querySelector('.comparison')), null, 2);
  } catch {
    output.textContent = 'Optional diagnostics unavailable. The layout remains usable.';
  }
});
