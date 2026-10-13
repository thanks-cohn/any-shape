# Any-Shape core 0.1

Implemented API, independently reusable from the laboratory. Package name is local; no npm registration or publication is asserted. MIT licensed. No runtime dependencies, bundling, code generation, or import-time side effects.

## CSS adoption

Copy `src/any-shape.css` beside a static page:

```html
<link rel="stylesheet" href="./any-shape.css">
<div class="as-panel">
  <article class="as-card" data-as-requires-container>
    <div class="as-card__art as-frame"><img src="local.jpg" alt="A description of the meaningful image"></div>
    <div class="as-card__body as-stack">
      <h2>A useful card</h2><p>Content wraps without hiding essential information.</p>
      <a class="as-button" href="./next.html">Continue</a>
    </div>
  </article>
</div>
```

Package-aware consumers can import `@any-shape/core/css`; static servers can serve the copied file directly without package resolution. No CDN or remote font is needed. The stylesheet includes document-level box sizing, typography, control and focus defaults in named layers. It is not scoped: review these defaults when adopting into an existing application. Override named layers/tokens intentionally; do not clip content to make it fit.

| Primitive | Behavior | Customization |
|---|---|---|
| `.as-stack` | Vertical flow with gap | `--as-gap` |
| `.as-cluster` | Wrapping inline group | `--as-gap` |
| `.as-center` | Centered max-width content with gutters | `--as-max`, `--as-gutter` |
| `.as-grid` | Intrinsic equal columns, narrow-safe minimum | `--as-content-min`, `--as-gap` |
| `.as-switcher` | Equal flex columns become a stack below a content threshold | `--as-switch-at`, `--as-gap` |
| `.as-sidebar` | Wrapping 1:3 composition | `--as-gap` |
| `.as-frame` | Aspect-ratio media region, object-fit cover | `--as-ratio`; never put essential text here |

Tokens: `--as-space-1..4`, `--as-type-body`, `--as-type-title`, `--as-measure`, `--as-radius-1..2`, `--as-content-min`, and `--as-color-ink/muted/surface/canvas/accent/focus/border`. Lengths use rem, fluid viewport units and intrinsic sizing. Public classes and tokens are versioned together.

Components: `.as-nav` on semantic `nav`, with native links in an unordered list; `.as-form` and `.as-field` on a native labeled form; `.as-card` inside `.as-panel`. Cards start as a stack and split at a **32rem named container** threshold. `--as-layout-mode` is authored intent (`stack` or `split`), not arbitrary CSS-rule introspection. `.as-panel` supplies inline-size containment; give it actual available width. No query support retains the stacked baseline. `.as-button` styles native links; use `button` for actions. `.as-skip` is a keyboard-revealed skip link, targeting a main region with `tabindex="-1"`.

The lab uses native validation and a local density preference. Display names are unnamed controls and are never submitted, stored, or inspected. Without JavaScript the GET form submits only density. Disclosure uses native `details/summary`; no custom ARIA widget or modal traps focus. All animations are optional (none in the core), and reduced motion disables consumer animations within the stylesheet's document scope.

## JavaScript and TypeScript

```js
import { inspectLayout, createOverlay } from '@any-shape/core';
const report = inspectLayout(document.querySelector('main'), { includeContent: false });
const overlay = createOverlay(document.querySelector('main'));
overlay.enable();
overlay.refresh(); // Explicitly refresh after resize, scrolling or mutation.
overlay.disable();
overlay.destroy(); // Terminal; enable after destroy throws.
```

For plain HTML, use a module script and import `./diagnostics.js` from a copied local file. `src/diagnostics.d.ts` supplies types; `tests/consumer.ts` proves package self-resolution. `classifyGeometry` is a pure exported measurement helper used in unit tests. `inspectLayout` defaults to the document element; invalid/disconnected roots and unsupported options throw. `includeContent: true` is deliberately unsupported. Importing in Node is safe; DOM operations need a browser.

The inspector returns a synchronous snapshot. It does not change the target DOM, install observers, log, send requests, or capture text, values, IDs, classes, arbitrary attributes or URLs. Structural selectors use only tag names and child positions; custom-element names and geometry can still identify structure, so callers control report retention. Only bounded CSS enums and parsed numeric lengths are included. No timestamp is included: callers may attach timing externally without changing the schema.

## JSON diagnostic schema 0.1

`src/diagnostic.schema.json` (also exported as `@any-shape/core/schema`) is a closed JSON Schema draft-07 contract. Reports contain `schemaVersion`, `viewport`, and `findings`. Every finding contains a structural `selector`, `code`, `severity`, `confidence`, and `evidence`. Evidence includes box coordinates, scroll extents, bounded CSS clues, at most eight ancestors, and an enumerated reason. Mode evidence additionally includes the nearest query-container box or null.

| Code | Observation and limitation |
|---|---|
| `overflow-x`, `overflow-y` | Scroll extent exceeds border box by more than 1px; ignores intentional auto/scroll regions. Not proof of invisible content. |
| `clipping` | Overflow coincides with hidden/clip. Content may intentionally be cropped. |
| `clipped-control` | Native interactive element exceeds a hidden/clip ancestor; heuristic, because transforms, complex clips and scrolling affect visibility. |
| `layout-mode` | Bounded CSS marker read; confidence `authored`, with nearest query container geometry. Not a claim to recover the full cascade. |
| `container-mismatch` | An element explicitly marked `data-as-requires-container` has no query-container ancestor; heuristic intended-container mismatch. |

Measured findings are not aesthetic verdicts. A root snapshot traverses its light DOM only; it does not pierce shadow roots or iframes. The detector is not an occlusion, contrast, or focus-ring evaluator and does not prove WCAG compliance. Text nodes and inline fragmentation can exceed available space in ways scroll extents miss. Very large DOM trees may make synchronous scans expensive; there is no production polling. The overlay uses a click-through, aria-hidden shadow host; manually refresh it after layout changes, and destroy it when finished. It requires a document body.

Breaking tokens, class behavior or schema changes require a new version and migration notes. The foundational API proposal is retained as historical intent; this document defines the implemented 0.1 surface.
