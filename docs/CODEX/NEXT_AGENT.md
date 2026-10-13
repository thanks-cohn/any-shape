# Cold inheritance: Any-Shape 0.1

Begin with `AGENTS.md` and the README reading order. Purpose and contracts outrank implementation choices. The initial docs-only state is preserved in Git history; `CURRENT_API_V0_1.md` now defines the implemented public surface. No foundational invariant was relaxed.

## Actual working state

- `src/any-shape.css`: versioned tokens, stack/cluster/center/grid/switcher/sidebar/frame, native control/focus defaults, card/navigation/form classes, stacked baseline and named-container enhancement. No runtime JS required.
- `src/diagnostics.js`: synchronous read-only geometry snapshot, privacy-safe structural paths, bounded clues, measured/authored/heuristic findings, reversible click-through overlay. `.d.ts` and closed JSON Schema accompany it.
- `examples/`: healthy static laboratory, local stress/RTL/density controls, three deliberately broken fixtures. Diagnostic module loss does not break the healthy form or layout.
- `scripts/serve.js`: standard-library loopback server, limited to consumer assets; no Git metadata/dependency exposure. `package-smoke.js` tests a packed external adopter; `recovery.js` physically removes diagnostics in scratch and replaces the test-runner harness.
- `tests/`: Node unit/server checks, typed package consumer, 29 browser checks per engine. CI runs checks, recovery and package consumption and retains artifacts; hosted execution has not been observed.

## Reproduce

Use the existing isolated checkout on `main`; do not create a worktree unless the user asks. `npm ci`, then install Playwright engines/system dependencies as documented in `DEPENDENCIES.md`. On this non-root Debian amd64 host:

```sh
npm run prepare:cloud
PLAYWRIGHT_BROWSERS_PATH="$PWD/.browser-tools/browsers" PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1 npm run check
PLAYWRIGHT_BROWSERS_PATH="$PWD/.browser-tools/browsers" npm run test:recovery
PLAYWRIGHT_BROWSERS_PATH="$PWD/.browser-tools/browsers" npm run test:package
npm run dev
```

Launch Firefox and its tests outside this host's filesystem sandbox when the profile-directory error occurs. Never disable package signatures, TLS or checksums; the rootless helper's presence-check override is explained and dynamically verified in the dependency register. Live server processes must be restarted in a new task. Development dependencies, browser binaries and outputs are ignored; re-create them rather than treating them as source.

## Evidence and next work

Read `IMPLEMENTATION_REPORT_001.md` and its committed evidence before claiming readiness. Automated layout, keyboard, privacy, accessibility, package and dependency-loss checks are distinct from visual approval or full WCAG certification. Native 200%/400% browser UI zoom, screen readers, forced colors, mobile hardware and obsolete browsers remain unverified. Screenshot candidates require a human reviewer before becoming goldens. No npm package publication or remote CI execution is asserted.

Known limits: diagnostics inspect light DOM, not shadow roots/iframes; clipping is heuristic and does not measure focus-ring occlusion; mode markers explain authored intent rather than the full cascade; synchronous scans may be costly on large DOMs. Container-mismatch currently detects an absent query-container ancestor, not every wrong named container. CSS base rules are global and require adoption review. Core fallback was tested by removing container rules, not by running an obsolete browser. Recovery replaces the runner harness but retains the Playwright browser driver; full driver replacement and total reconstruction remain future exercises.

For changes: describe the behavioral failure, add a failing regression, keep native semantics and no-JS behavior, rerun relevant checks, update the contract map/API/dependency record/evidence, and commit a coherent slice. Do not auto-accept screenshot changes or suppress failures.
