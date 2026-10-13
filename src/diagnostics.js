/** Optional, synchronous, read-only diagnostics. No observers or network side effects. */
const tolerance = 1;
const clipped = value => value === 'hidden' || value === 'clip';

/** Pure geometry classifier; scrollable regions are intentional, not errors. */
export function classifyGeometry({ box, scrollWidth, scrollHeight, overflowX, overflowY }) {
  const x = scrollWidth > box.width + tolerance;
  const y = scrollHeight > box.height + tolerance;
  const codes = [];
  if (x && !['auto', 'scroll'].includes(overflowX)) codes.push('overflow-x');
  if (y && !['auto', 'scroll'].includes(overflowY)) codes.push('overflow-y');
  if ((x && clipped(overflowX)) || (y && clipped(overflowY))) codes.push('clipping');
  return codes;
}

function assertRoot(root) {
  if (!root || root.nodeType !== 1 || !root.ownerDocument?.defaultView) throw new TypeError('Expected a connected DOM Element with a window.');
  if (!root.isConnected) throw new TypeError('Expected a connected DOM Element with a window.');
  return root.ownerDocument.defaultView;
}

// Tag/position paths deliberately omit IDs, classes, attributes, content and URLs.
function path(element) {
  const parts = [];
  for (let current = element; current; current = current.parentElement) {
    const index = current.parentElement ? Array.prototype.indexOf.call(current.parentElement.children, current) + 1 : 1;
    parts.unshift(`${current.localName}:nth-child(${index})`);
  }
  return parts.join(' > ');
}

function box(element) {
  const rect = element.getBoundingClientRect();
  return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
}

function css(style) {
  // Only bounded enums or parsed numeric values, never arbitrary CSS strings.
  const safe = (value, allowed) => allowed.includes(value) ? value : 'other';
  return {
    display: safe(style.display, ['block','inline','inline-block','flex','inline-flex','grid','inline-grid','none','contents']),
    overflowX: safe(style.overflowX, ['visible','hidden','clip','auto','scroll']),
    overflowY: safe(style.overflowY, ['visible','hidden','clip','auto','scroll']),
    whiteSpace: safe(style.whiteSpace, ['normal','nowrap','pre','pre-wrap','pre-line','break-spaces']),
    minInlineSize: parseFloat(style.minInlineSize) || 0
  };
}

function ancestors(element, view) {
  const chain = [];
  for (let parent = element.parentElement; parent && chain.length < 8; parent = parent.parentElement) {
    chain.push({ selector: path(parent), box: box(parent), css: css(view.getComputedStyle(parent)) });
  }
  return chain;
}

function containerOf(element, view) {
  for (let parent = element.parentElement; parent; parent = parent.parentElement) {
    const type = view.getComputedStyle(parent).containerType;
    if (type === 'inline-size' || type === 'size') return parent;
  }
  return null;
}

export function inspectLayout(root = globalThis.document?.documentElement, options = {}) {
  const view = assertRoot(root);
  if (!options || Object.keys(options).some(key => key !== 'includeContent') || (options.includeContent !== undefined && options.includeContent !== false)) {
    throw new TypeError('Content collection and unknown options are unsupported.');
  }
  const findings = [];
  for (const element of [root, ...root.querySelectorAll('*')]) {
    if (element.closest('[data-as-overlay]')) continue;
    const style = view.getComputedStyle(element);
    const rect = box(element);
    if (style.display === 'none' || rect.width === 0 || rect.height === 0) continue;
    const evidence = { box: rect, scrollWidth: element.scrollWidth, scrollHeight: element.scrollHeight, css: css(style), ancestors: ancestors(element, view) };
    const add = (code, severity, confidence, extra = {}) => findings.push({ code, severity, confidence, selector: path(element), evidence: { ...evidence, ...extra } });
    for (const code of classifyGeometry({ ...evidence, overflowX: style.overflowX, overflowY: style.overflowY })) {
      add(code, 'warning', 'measured', { reason: code === 'clipping' ? 'hidden-overflow' : 'scroll-extent-exceeds-box' });
    }
    if (element.matches('button,input,select,textarea,a[href],summary')) {
      for (let parent = element.parentElement; parent; parent = parent.parentElement) {
        const parentStyle = view.getComputedStyle(parent);
        const bounds = box(parent);
        const outsideX = rect.x < bounds.x - tolerance || rect.x + rect.width > bounds.x + bounds.width + tolerance;
        const outsideY = rect.y < bounds.y - tolerance || rect.y + rect.height > bounds.y + bounds.height + tolerance;
        if ((clipped(parentStyle.overflowX) && outsideX) || (clipped(parentStyle.overflowY) && outsideY)) {
          add('clipped-control', 'error', 'heuristic', { reason: 'control-outside-clipping-ancestor', ancestor: path(parent) });
          break;
        }
      }
    }
    const rawMode = style.getPropertyValue('--as-layout-mode').trim();
    const inheritedMode = element.parentElement ? view.getComputedStyle(element.parentElement).getPropertyValue('--as-layout-mode').trim() : '';
    if (rawMode && (rawMode !== inheritedMode || element.hasAttribute('data-as-requires-container'))) {
      const mode = ['stack','split'].includes(rawMode) ? rawMode : 'unknown';
      const container = containerOf(element, view);
      add('layout-mode', 'info', 'authored', { mode, reason: 'authored-css-marker', container: container ? box(container) : null });
      // This is an authored expectation, not inference of arbitrary CSS intent.
      if (element.hasAttribute('data-as-requires-container') && !container) {
        add('container-mismatch', 'warning', 'heuristic', { mode, reason: 'missing-query-container', container: null });
      }
    }
  }
  return { schemaVersion: '0.1', viewport: { width: view.innerWidth, height: view.innerHeight }, findings };
}

/** Explicit overlay, manually refreshed; never intercepts input or records content. */
export function createOverlay(root = globalThis.document?.documentElement) {
  const view = assertRoot(root);
  const doc = root.ownerDocument;
  if (!doc.body) throw new TypeError('Overlay requires a document body.');
  let host = null;
  let destroyed = false;
  function refresh() {
    if (!host || destroyed) return;
    const report = inspectLayout(root);
    host.shadowRoot.replaceChildren();
    for (const finding of report.findings.filter(f => f.severity !== 'info')) {
      const mark = doc.createElement('div');
      const rect = finding.evidence.box;
      Object.assign(mark.style, { position: 'absolute', left: `${rect.x + view.scrollX}px`, top: `${rect.y + view.scrollY}px`, width: `${rect.width}px`, height: `${rect.height}px`, outline: '2px dashed #b42318', pointerEvents: 'none', boxSizing: 'border-box' });
      host.shadowRoot.append(mark);
    }
  }
  function disable() { host?.remove(); host = null; }
  return {
    enable() {
      if (destroyed) throw new Error('Overlay has been destroyed.');
      if (!host) {
        host = doc.createElement('div');
        host.setAttribute('data-as-overlay', '');
        host.setAttribute('aria-hidden', 'true');
        Object.assign(host.style, { position: 'absolute', left: '0', top: '0', width: '0', height: '0', zIndex: '2147483647', pointerEvents: 'none' });
        host.attachShadow({ mode: 'open' });
        doc.body.append(host);
      }
      refresh();
    },
    refresh,
    disable,
    destroy() { disable(); destroyed = true; }
  };
}
