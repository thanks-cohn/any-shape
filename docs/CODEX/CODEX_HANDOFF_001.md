# Codex handoff 001 — implement Any-Shape from purpose to verifiable library

**Repository:** thanks-cohn/any-shape
**Branch:** main unless branch protection or explicit user instructions require another branch.
**Directive:** Produce real working software, not merely scaffolding. Implement, test, document and commit, leaving a cold-inheritable artifact. Do not silently merge PRs or discard preexisting work.

## Context and intent
Read ALL of: `AGENTS.md`, `README.md`, `docs/FOUNDATION/PURPOSE.md`, `docs/FOUNDATION/CONTRACTS.md`, `docs/ARCHITECTURE.md`, `docs/RECOVERY.md`, and `docs/API/README.md`. These are specifications, NOT claims of implementation. Any-Shape enables sites to remain meaningful, aesthetic, coherent and usable across *any practical shape*, preserving identity while rearranging geometry. Follow Forever Works principles: purpose → invariants → implementation → independent proof → replaceability → repeatable recovery.

## Deliverables — build in useful vertical slices
### A. Core
- Create a real reproducible package and development workflow using appropriate minimal tooling; commit lockfile.
- Implement CSS tokens and portable primitives: stack, cluster, center, grid, switcher, frame, and layout compositions with content-driven transitions.
- Implement at least 3 useful accessible components (e.g. card, navigation and form) in semantic HTML/CSS with responsive containers.
- Provide clear container-query fallback and no-JS functionality. No mandatory UI framework.
- Create a browser-runnable demo/laboratory demonstrating compositions, tokens, narrow/wide embedded components and deliberately broken controls.

### B. Observability
- Build optional read-only diagnostic API usable from plain JS with TS definitions.
- Include overflow/clipping, container dimensions, computed layout and root-cause clue collection; return schema-versioned JSON.
- Implement redaction-safe diagnostics with no network calls and no content/user-input capture by default.
- Include visual debug overlay optionally and safely, with enable/disable/teardown.
- Create at least 3 broken fixtures: intrinsic text overflow, clipped focus/action, and a container mismatch. The inspector must surface actionable evidence for each.
- Distinguish measurements from heuristic hypotheses and document confidence/failure cases.

### C. Verification
- Add automated unit tests, Playwright matrix structural assertions and screenshot baselines where practical; accessibility audit via axe-core or equivalent.
- Include viewport, container, 200%/400% zoom/reflow, long content, RTL, reduced motion, touch or pointer, keyboard, no-JS and constrained-height tests. Ensure no accidental document overflow.
- Include CI scripts and instructions for local repro. Do not force-accept golden screenshots.
- Document which AS-001 through AS-016 contracts are passing, failing, manual-only or unrun; distinguish browsers actually tested.
- Run a dependency-failure/replacement exercise, at least remove optional diagnostic code and demonstrate CSS resilience.
- Capture the output of tests and screenshots as artifacts if feasible.

### D. Adoption and long-term maintenance
- Provide import examples for static HTML and plain JS, with TS support. A Pop-Quiz.ai-themed example is welcome but no project coupling.
- Finalize versioned public API and JSON diagnostic schema; write `docs/API/CURRENT_API_V0_1.md` after implementation.
- Write `docs/DEPENDENCIES.md` with reasons, alternatives, breakage recovery, known browser support gaps and licensing.
- Write `docs/CODEX/IMPLEMENTATION_REPORT_001.md` with exact change summary, commands run, results and failed/unrun tests, performance observations, compatibility, unresolved issues.
- Provide one-page cold-inheritance `docs/CODEX/NEXT_AGENT.md`: where to begin, real current state, reproducible problems, next steps.
- Update ADRs for consequential deviations. Maintain scope boundaries.

## Hard constraints
- No claims of "perfect at every resolution." Graceful accessible reflow is the contract.
- Avoid CSS/JS patterns that trap focus, hide essential content, or cause horizontal overflow.
- Framework-neutral, offline usable, low runtime overhead. No forced network, telemetry or opaque hosted service.
- Build running software; do not finish after writing documentation.
- Use stable modules, predictable exports and clear error reporting.
- Never fabricate test results; if browsers/build tools unavailable, report the exact limitation and leave runnable reproduction instructions.
- Avoid unnecessary dependency weight and ensure all dev dependencies can be replaced.
- Do not destroy existing files; reconcile divergence with purpose and contracts.

## Acceptance demonstration
Open the demo in a browser: see the same card nested simultaneously in narrow and wide containers responding independently; resize from 320 to 1920 and see purposeful reflow; keyboard navigate forms and nav; simulate long text and RTL; deliberately break a component and inspect a privacy-safe structured explanation; disable JS and see essential UI remain; run the matrix in CI. Supply links/paths and exact results, not aspirational prose.

## Definition of done
The repository contains executable code, examples, tests and maintenance/recovery documentation. A completely new agent can checkout, install, run, diagnose a regression, and rebuild from purpose if a dependency disappears. Any unsupported scenario is called out plainly instead of concealed.
