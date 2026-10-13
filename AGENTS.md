# Agent operating protocol — Any-Shape

Read in order: README.md → docs/FOUNDATION/PURPOSE.md → docs/FOUNDATION/CONTRACTS.md → docs/ARCHITECTURE.md → docs/RECOVERY.md → docs/CODEX/CODEX_HANDOFF_001.md.

## Operating mandate
A capable agent inheriting this repository cold must be able to: understand why it exists; enumerate invariants; reproduce present behavior; repair faults; replace broken dependencies; demonstrate behavioral equivalence or documented improvement; record evidence and decisions; leave the repository understandable to the next agent.

## Truthfulness
Distinguish **specified**, **implemented**, **tested**, and **manually verified**. Never claim visual perfection, cross-browser compatibility, or passed checks without evidence. Preserve failed-test output and known limitations in reports.

## Workflow
1. Inspect repository and tooling. Reconcile source vs docs; never assume docs are current.
2. State the intended observable behavior and failure condition.
3. Add or update a regression test first where feasible.
4. Make the smallest coherent change with stable public contracts.
5. Run unit, integration, browser, accessibility and visual checks as available; mark unrun checks.
6. Record changes, test evidence, dependency risks and what next agent needs in docs/CODEX/ and docs/DECISIONS/.
7. Do not silently modify the purpose, foundational invariants or public contracts. Proposed changes require explicit rationale and migration strategy.

## Dependency resilience
- Prefer standards-based HTML/CSS; avoid runtime JS if native CSS solves it.
- Pin dev dependencies, commit lockfile, and document each dependency's reason, replacement and failure modes.
- Keep actual design semantics in portable CSS/HTML rather than a framework-specific component tree.
- Every externally supplied module must have a replacement path. Don't let a tool become the specification.

## Testing principles
Check geometry and semantics, not only pixels. Test intermediate sizes, narrow height, extreme width, long words, text zoom, localized strings, reduced motion, no JS, keyboard, focus and touch. Screenshot diffs require review because antialiasing is not a defect and visual beauty is contextual.

## Security and privacy
No collection of page content, user text or screenshots by default. Debug snapshots must redact text and sensitive attributes unless a local user explicitly enables them. No arbitrary remote telemetry.

## Implementation conduct
Default branch is main. Follow repository settings and user direction; avoid unsolicited PR merging. No decorative scaffolding posing as functionality. Commit verifiable vertical slices.
