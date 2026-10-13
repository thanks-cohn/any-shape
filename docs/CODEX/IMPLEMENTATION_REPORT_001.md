# Implementation report 001 — Any-Shape core 0.1

Observed 2026-10-13. Starting commit: `a61b12b64acf5c4bcc99bd39733e935a92ece419` (documentation only). Work performed on `main` in the existing isolated checkout; initial working tree was clean. No push, PR merge, npm publication or hosted CI result is asserted.

## Delivered behavior

The library now contains reusable source-distributed CSS tokens and all requested primitives (plus sidebar), semantic cards, navigation, forms and native disclosure, a full-page laboratory, and three deliberately broken fixtures. Named inline-size containers change the same card from stacked to split while its viewport remains fixed. Intrinsic layouts accommodate narrow widths, enlarged text and translated strings without hiding essential information. Native GET form/disclosure behavior remains available without JS; optional enhancement applies density locally and provides stress/RTL tools. Display-name values are neither submitted nor persisted.

The optional ESM diagnostic API measures scroll extents, clipping ancestors and container geometry, returns schema-versioned redacted findings, and reports authored mode markers with explicit uncertainty. A click-through, aria-hidden shadow overlay has enable/refresh/disable/terminal destroy operations. The module performs no import-time DOM action, observation, network request, logging or text/value capture. Tests prove a snapshot does not mutate markup and privacy canaries do not appear in reports. Declarations, a closed JSON Schema and external adopter tests define the portable public surface.

The standard-library development server serves only `src/` and `examples/`, rejecting writes and access to Git metadata and dependencies. The package has pinned development dependencies and lockfile, no runtime dependencies and no generated build prerequisite. CI is configured for all three engines, axe checks, package consumption, recovery and evidence retention. API, licensing, dependency replacement paths, rootless cloud preparation and inheritance instructions are committed with the source.

## Actual verification

| Command / operation | Observed outcome |
|---|---|
| `npm ci --ignore-scripts` | Frozen lockfile install succeeded, 10 packages installed. Project-local npm cache avoids unwritable default cache. |
| `npm run test:unit` | 4 passed, 0 failed/skipped: geometry, closed schema/redaction, safe import/root errors, functional static server with metadata/write rejection. |
| `npm run typecheck` | Passed strict TypeScript 5.9.3 consumer self-resolution, declarations, and rejection of `includeContent: true`. |
| `npm run check` with installed browser cache and host-presence override | 87 browser checks passed (29 per engine), 0 failed/skipped/flaky, 37.1 seconds; also runs unit/type gates. |
| `npm run test:recovery` with browser cache | Passed after physically removing the diagnostic artifact in scratch: independently driven layout, reflow, form, accessibility and graceful diagnostic failure. Original source untouched. |
| `npm run test:package` with browser cache | Packed tarball installed into a separate temporary consumer. JS/CSS/schema exports, external TS resolution, zero runtime dependencies and 320px static adopter + local diagnostics all passed. No publication. |
| `npm run prepare:cloud` | Rootless Debian preparation succeeded, signed APT sources and checksum-verified packages retained locally. Libraries dynamically loaded; Chromium, Firefox and WebKit each started and rendered a DOM request. |

The browser matrix executes 320×640, 360×780, 667×375, 768×1024, 1024×768, 1366×768, 1920×1080, 3440×1440, 280×280, 375×320, 480×400, 600×360, 900×400, 1200×400 and 713×333. Assertions check actual document/element geometry and reachability; a listening port or screenshot alone is not a pass. Additional cases exercise live container shrink at fixed viewport, 200%/400% equivalent viewport squeeze with 200% root text, German long-content stress, keyboard skip/focus/order/form activation, RTL, reduced motion, touch taps, no JS, stripped container enhancement, missing diagnostics, broken fixture reports, privacy/schema, overlay lifecycle, standalone primitives and measurement cost.

Axe 4.14.0 checks WCAG 2 A/AA, 2.1 AA and 2.2 AA tags on the healthy showcase at 320px and 1366px in each engine: **zero reported violations**. Recovery also runs axe through an independent harness. This is not a WCAG certification; deliberately broken fixtures are not represented as accessible examples.

Engines actually executed on this Linux host: **Chrome for Testing 156.0.8078.4** (Playwright revision 1248), **Firefox 157.0** (revision 1555), **WebKit 27.2** (revision 2370). System Chromium 154.0.8037.57 was also used in preliminary checks; final results use pinned Playwright downloads. Node 24.19.0 / npm 11.9.0 / Python 3.12.14. Four browser workers. Remote CI execution remains unrun.

## Contract map

| Contract | Implemented and observed | Remaining scope |
|---|---|---|
| AS-001 | Passed: narrow/wide card modes and **actual child geometry**, then wide container shrunk without viewport change. | No arbitrary third-party component guarantee. |
| AS-002 | Passed: document/essential control geometry at 320px and all matrix sizes. | Arbitrary adopter content still needs testing. |
| AS-003 | Screenshots captured at 320, 1366 and 1920 in each engine; structural checks passed. Agent visually inspected 320/1366 candidates: consistent colors/type, readable stacked cards, wide split card, reachable form. | Human approval/golden baselines and beauty review remain manual; no automatic pixel-perfect claim. |
| AS-004 | Passed equivalent 200%/400% viewport reflow and enlarged root text. | Native browser chrome zoom and assistive technology unrun. |
| AS-005 | Passed long German titles, 200% text and narrow geometry. | Broader locale/script coverage unrun. |
| AS-006 | Passed native Tab/Enter navigation, skip link, visible focus outline, field order, select and form activation; Escape does not trap focus. | Screen reader behavior and comprehensive focus-ring occlusion manual. No custom modal is implemented. |
| AS-007 | Passed no-JS geometry, native GET form and disclosure. | Optional stress/diagnostic buttons intentionally absent without JS. |
| AS-008 | Passed reduced-motion emulation; core requires no motion. | Hardware vestibular/user review unrun. |
| AS-009 | Passed RTL direction, long-content geometry and controls. | Linguistic translation correctness manual. |
| AS-010 | Passed short/narrow landscape matrix and scroll-to-form reachability. | Mobile OS/browser chrome and physical hardware unrun. |
| AS-011 | Passed with the container enhancement layer removed; stacked baseline remains usable. | Actual obsolete browser engine lacking queries not executed. |
| AS-012 | Passed overflow/clipped action/container mismatch fixtures; selector, dimensions, ancestors and CSS clues validated. | Clipping/root cause is heuristic, not an occlusion solver. |
| AS-013 | Passed authored mode/container snapshots after resize. | Marker explains intent, not every applicable cascade rule or wrong named container. |
| AS-014 | Passed closed schema, content/value/URL/attribute canaries, zero scan requests/logs, markup unchanged, unsupported content option rejected. | Structural tag paths and geometry still reveal structure; retention belongs to caller. |
| AS-015 | Passed both blocked-module route and physical module removal; form and CSS still work. | Broken-fixture tooling itself requires JS, as documented. |
| AS-016 | Passed optional-module loss and replacement Node assertion harness; core consumer behavior preserved. | Full browser-driver replacement and total from-purpose rebuild are not claimed. |

## Failed attempts, diagnosis and corrections

Failure output was retained in local `artifacts/initial-chromium/` and `artifacts/initial-firefox/` before reruns. Representative exact excerpts are committed here because ignored artifacts are not source:

1. Default npm cache: `ENOENT: no such file or directory, mkdir '/home/agent/.npm/_cacache'`. Corrected with project-local `.npmrc` cache; packages remained pinned and integrity-checked.
2. First system-Chromium run: **24 passed, 3 failed**. Container test expected `['stack','stack']` but received `['stack','split']` because flex sizing overrode a width on the outer wrapper. Corrected the stimulus to resize the actual `.as-panel`, and added independent child-geometry assertions. No layout assertion was removed.
3. Same run no-JS check reported three `BUTTON unreachable` entries: deliberately hidden optional lab tools were included. The geometry probe now excludes only `.lab-controls[hidden]`; essential links, form controls and headings remain required. Native no-JS interaction checks then passed.
4. Same run privacy test: `Expected: 6 / Received: 5` requests. The module was already statically loaded by the broken lab. The test now explicitly loads it before taking the baseline and requires **zero** additional scan requests/logs. Canaries/schema assertions passed throughout.
5. First Firefox attempt: all 27 launches failed before test execution with `Could not find profile folder.` A direct launch outside the filesystem sandbox succeeded (157.0); the suite then passed 27/27 there. This was a host restriction, not a library failure. Final checks use that exception.
6. WebKit host requirements: missing GTK/graphene/harfbuzz-icu/manette/hyphen/GLES and transitive shared libraries. Official installer could not elevate: `su: Authentication failure`. Rootless downloads used the machine's signed Debian snapshot repository; package extraction left system files unchanged. WebKit's wrapper replaces `LD_LIBRARY_PATH`, so verified dependencies were added to its local `sys/lib` directory. `ctypes` confirmed dynamic loading; actual engine rendering and all 29 checks passed.
7. Playwright's GLES presence heuristic consults `ldconfig -p`, which misses rootless libraries. `PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1` bypasses this **presence heuristic only**, after explicit dynamic loading and actual runtime checks. No TLS, signature, package integrity or expected browser checksum was disabled or changed.
8. Initial packed-consumer smoke sampled an asynchronous diagnostic import too early: expected `"schemaVersion": "0.1"`, received `''`. Added a readiness wait for report content in package and recovery harnesses; both then passed. No product code workaround was needed.

No unresolved application failure remains in the executed checks. These results do not convert unrun/manual checks into passing checks.

## Evidence and performance

Committed [results-001.json](evidence/results-001.json) records each of the 87 browser outcomes, exact engine versions, timings and SHA-256 hashes of tested source/examples/tests. Raw current-run JSON is `artifacts/browser-results.json`; final stdout is `artifacts/final-check.log`. CI uploads these plus screenshot/failure-trace outputs.

Committed screenshot candidates: [320px](evidence/screenshots/chromium-320.png), [1366px](evidence/screenshots/chromium-1366.png), [1920px](evidence/screenshots/chromium-1920.png). Other engine candidates are in `test-results/`. They are **not human-approved goldens**; no screenshot diff was force-accepted.

On the actual 85-element main region, 20 warmed synchronous scans per engine observed median/max times: Chromium **3.4/5.7ms**, Firefox **12/36ms**, WebKit **4/13ms**. Hardware is the cloud host, not a modest physical laptop; these are observations under test load, not performance thresholds or production guarantees. No polling/observer loop or consumer runtime dependency exists. Large DOM/shadow/iframe cases are outside this measurement.

## Recovery, adoption and remaining limits

`CURRENT_API_V0_1.md`, `DEPENDENCIES.md`, ADR-0002 and `NEXT_AGENT.md` describe source distribution, global CSS adoption effects, stable seams, supported fallbacks, replacement recipes, privacy boundaries and exact local commands. Rootless browser preparation is captured in a reusable script; ignored browser/dependency caches can be rebuilt, and live server processes must restart in new tasks. The original foundational documents remain recoverable and their purpose/contracts were not rewritten to match implementation shortcomings.

Human aesthetic approval and goldens, native browser UI zoom, screen readers, forced colors/print, physical mobile testing, broader localization, obsolete browsers, full driver replacement and total reconstruction remain distinct work. Diagnostics are light-DOM snapshots, skip shadow/iframe content, and do not solve arbitrary clipping/occlusion, cascade provenance or beauty. No hosted service/account/remote asset is required by the consumer. Package name is local; no registration, CDN availability or npm publication is claimed.

Clean-clone replay and final commit state are recorded in the follow-up verification note after the implementation commit; no clean-clone result is assumed from current-checkout success.
