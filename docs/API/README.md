# Public API intent (draft; not implemented yet)

Historical proposal. The implemented, versioned surface is now documented in [CURRENT_API_V0_1.md](CURRENT_API_V0_1.md); use that document for adoption and migration decisions. The proposal below is preserved to make the original intent recoverable.

## Lowest common denominator
Use a stylesheet and semantic HTML. Provisional names below MUST be finalized with tests and versioning before promising stability.

CSS tokens: `--as-space-*`, `--as-type-*`, `--as-measure`, `--as-radius-*`, `--as-content-min`. Components should have semantic variants and explicit documented customization points.

CSS primitives: `.as-stack`, `.as-cluster`, `.as-center`, `.as-grid`, `.as-switcher`, `.as-frame`. Target intrinsic layout behavior; predictable nesting and composition; no required runtime.

Example shape (proposal):
```html
<link rel="stylesheet" href="./any-shape.css">
<section class="as-stack">
  <h1>Accessible, adaptive content</h1>
  <div class="as-grid">
    <article>First item</article><article>Second item</article>
  </div>
</section>
```

Optional diagnostic API proposal:
```ts
type DiagnosticReport = {
  schemaVersion: "0.1";
  viewport: { width: number; height: number };
  findings: Array<{ code: string; severity: "info"|"warning"|"error"; selector: string; evidence: Record<string, unknown> }>;
};
function inspectLayout(root?: Element, options?: { includeContent?: false }): DiagnosticReport;
```
Final typings, redaction and generated outputs must be documented after implementation; this is NOT a frozen API.

## Accessibility responsibility
Native HTML semantics are required in examples; library makes no blanket claim that every adopter automatically meets WCAG. Explain keyboard/ARIA behavior for every interactive pattern. Do not create custom role semantics without need.

## Agent observability
Reports should include DOM path or stable anonymous identifiers, viewport/container dimensions, computed layout values, clipping/overflow geometry, expected vs observed mode and actionable root-cause hypotheses with confidence. Never expose forms, passwords or full text by default. Use schema validation and reproducible example snapshots.

## Compatibility
Plain JS/CSS should be first-class. TS types must aid consumers, not force compilation.
