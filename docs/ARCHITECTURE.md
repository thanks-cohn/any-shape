# Architecture: replaceable means, durable ends

Status: **target design; not evidence of implementation**.

Implementation note: the 0.1 source follows these seams in `src/any-shape.css`, `src/diagnostics.js`, declarations and JSON Schema; static consumers live in `examples/`. No bundler or framework adapter is required. Exact evidence and remaining limits are in `docs/CODEX/IMPLEMENTATION_REPORT_001.md`; the target design below is retained as foundational intent.

## Layering
1. **Contracts** (markdown fixtures / tests): what should happen and why.
2. **Tokens** (portable CSS custom properties): semantic color, type, spacing, radius, motion, density.
3. **Primitives** (portable CSS classes / layers): stack, cluster, grid, sidebar, center, switcher, frame; intrinsic sizing; logical properties.
4. **Components and compositions**: header, card, form, dialog, navigation, multi-column views; semantic markup examples.
5. **Optional diagnostics** (plain JS, with TS typings): local read-only inspector, overflow detector, layout mode explanations, privacy-respecting event capture.
6. **Lab and tests**: static examples, resize/stress controls, deliberate failures, Playwright + accessibility + screenshots.
7. **Optional adapters**: future React/Vue/Svelte wrappers must merely expose standards core, never own it.

## Stable seams
- CSS contract via documented class names and custom properties.
- JavaScript API exposed only for optional inspector with explicit types.
- Machine-readable JSON diagnostic schema with schema version, timestamp, viewport, container hierarchy, findings and rule provenance if measurable; no user content.
- Component example markup is versioned with corresponding contract tests.
- No import-time browser side effects; no mandatory global JS.
- All internal algorithms are replaceable if outputs satisfy tests.

## Technical choices for first implementation
Prefer vanilla HTML, CSS and TypeScript/JavaScript with minimal build tooling. CSS features: `@container`, `@supports`, `@layer`, CSS Grid/Flex, `minmax()`, `clamp()`, `aspect-ratio`, logical properties, `prefers-reduced-motion`. Use `ResizeObserver` only for optional instrumentation, with feedback-loop guards. Use Playwright for browser matrix and axe-core for automated accessibility checks; neither is required at runtime. Pin versions. Use a small package manager workflow with reproducible scripts.

## Failure modes
- Container query absent: baseline single-column flow through `@supports` fallbacks.
- JS absent/disabled: native layout still functional.
- Fonts missing: system font metrics and overflow resilience.
- ResizeObserver unavailable: on-demand geometry snapshots or diagnosis unavailable, but layout operates.
- Snapshot runner broken: manual structural checks remain documented, replacing runner must restore proof.
- Framework changes: core CSS, semantic markup and standalone JS can migrate independently.

## CSS pitfalls to prevent
Use `min-width:0` in shrinkable flex/grid children, account for intrinsic min-content sizing, use `overflow-wrap:anywhere` selectively, avoid `100vw` accidental scrollbar overflow, avoid hard pixel heights for content, avoid orientation-only assumptions, do not equate screen breakpoint with component width. Ensure containment only where query requirements warrant it.

## Package direction
Start with `@any-shape/core` in-repository package or `any-shape` if npm name available (do not claim registration). Exports: stylesheet, diagnostic module and typings. Document import-free CDN/static HTML usage if feasible. No claims of publication until done.

## Performance
No layout polling by default; diagnostics explicitly opt-in and throttled/batched; avoid persistent observers in production consumers unless enabled. Benchmarks should measure with actual fixture sizes on modest machines, without inventing thresholds that lack empirical evidence.

## Version policy
Version public CSS tokens/classes and diagnostic JSON schema. Breaking behavioral changes require migration notes and transition tests. Maintain a DECISIONS log documenting why choices changed.
