# Agent operating protocol — Any-Shape

Read in order: README.md → docs/IDENTITY/PROJECT_ESSENCE.md → docs/IDENTITY/ONTOLOGY_AND_SEMANTICS.md → docs/IDENTITY/HUMAN_AND_AGENT_FACES.md → docs/IDENTITY/TRANSFORMATION_AND_DEGRADATION.md → docs/RECONSTRUCTION/CONFORMANCE_AND_ACCEPTANCE.md → docs/RECONSTRUCTION/NEXT_AGENT_HANDOFF.md → forever/manifest.json and provenance → docs/FOUNDATION/PURPOSE.md and CONTRACTS.md → docs/API/CURRENT_API_V0_1.md → docs/ARCHITECTURE.md → docs/RECOVERY.md → applicable Codex handoff.

## Universal identity and evidence

Any-Shape preserves human and agent comprehension, authorized operation and trust across changing forms, media and resources. Browser resizing is an illustrative, implemented specialization, not the universal purpose. Handoff 002 explicitly establishes that mission. Keep the existing 0.1 web behavior protected while broader domain/transport/renderer capabilities remain proposed or scoped proofs.

Use the actual pinned Forever Works standard, schemas and CLI in `vendor/forever-works/`; verify `UPSTREAM.json` hashes. Run `npm run check:forever` and inspect both JSON validity and audit findings; CLI exit zero does not imply no issues. `pending` is not a canonical review status: agent proposals use `agent-proposed` and `unreviewed`. Do not promote inferred technical detail because it was serialized or tests passed. Exact record references, scoped claims and closed-world unknowns are required.

For blind reconstruction, follow `COLD_START_RECONSTRUCTION.md` and its allowlisted bundle; withhold mechanisms, source, original tests/screenshots/reports and history. Separate reconstructor and evaluator contexts. Shared-host instruction-only withholding is procedural, not technically guaranteed isolation; report the strict-isolation lane UNKNOWN. Agents may be delegated these explicitly required reconstruction/evaluation roles. Semantic understanding, functional proof, aesthetics and drop-in compatibility remain separate judgments.

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

## Owner's long-range intent and next-agent recovery

Before undertaking broad architecture, Avalonia/Python conversion, or new examples, read [docs/IDENTITY/ANY_SHAPE_LONG_HORIZON_VISION.md](docs/IDENTITY/ANY_SHAPE_LONG_HORIZON_VISION.md) and [docs/ROADMAP/ANY_SHAPE_AGENT_TRANSFERENCE_BLUEPRINT.md](docs/ROADMAP/ANY_SHAPE_AGENT_TRANSFERENCE_BLUEPRINT.md). These documents preserve the owner's agent-first, low-bloat, responsive-UI, behavior-and-effect continuity mission and stage gates if chat history is unavailable. Never treat stated future goals as completed work. Test original browser sources and real webhook effects independently before asserting native transference.


## Flagship anti-hardcoding invariant

**Do not hand-build a flagship Chrome extension's Android, iOS or Avalonia counterparts and present them as Any-Shape-generated.** The flagship is an honest cold-agent reconstruction trial: frozen independently developed source app + general portable Any-Shape package + target constraints -> agent-developed ordinary projects -> independent functional/effect/visual/platform evidence. Do not pre-install per-app conversion recipes, leak evaluator answers, or substitute screenshots/WebViews for native functionality. Read the flagship addendum in the long-horizon vision and its acceptance gate in the transference blueprint. Keep the existing forms as the *learning corpus*, not the flagship outcome. Mark this entire challenge as proposed until actually run and independently verified.

## If a session or original developer context is lost

Recover intent first from `docs/IDENTITY/ANY_SHAPE_LONG_HORIZON_VISION.md` and `docs/ROADMAP/ANY_SHAPE_AGENT_TRANSFERENCE_BLUEPRINT.md`; inspect `docs/ROADMAP/MILESTONES.md` for M0–M11 and `docs/TESTING/WEBHOOK_LAB_HANDS_ON.md` for the immediate human-verifiable test. The governing experiment is **a general Any-Shape package + independently developed unfamiliar Chrome extension → one cold agent → ordinary independently verified Android and Avalonia Windows/Linux projects**; no hand-coded target answers. Later iOS is another legitimate target. Record exact test and human-review evidence, preserve platform pins, and transform verified failures and repairs into **reviewable candidate improvements** to Forever Works, never silent canon changes. **Immediate work** is to verify/fix CI, three browser form workflows, responsiveness and HTTP/webhook effects before native ports. Maintain honest implemented/tested/proposed statuses.

## Reference corpus expansion after the forms

Consult **Reference Corpus 0.2 — Beyond Forms** in `docs/ROADMAP/ANY_SHAPE_AGENT_TRANSFERENCE_BLUEPRINT.md` before adding examples. First verify the existing forms and effect fixtures, then implement a minimal general agent-readable continuity API; use a compact portable file explorer to challenge hierarchical data, permissions, selection and effects. Add a workflow board for gesture/state/undo and optionally a media player for asynchronous lifecycle **only when these reveal distinct unmet general capabilities**. Keep the corpus indexed, deep, verifiable, low-bloat and independent of the future unfamiliar flagship Chrome extension. Never hardcode the flagship's destination solutions.

## Cloudflare Pages deployment inheritance (proposed reference)

Read [the Cloudflare Pages Golden Export Reference proposal](docs/PROPOSALS/CLOUDFLARE_PAGES_GOLDEN_EXPORT_REFERENCE.md) before changing any public website export. Owner intent: **GitHub repository → Cloudflare Pages through `npx wrangler` → real configured HTTPS webhooks**. Produce respondent-only published apps, without editor/branding, plus a minimal same-origin Pages Function when needed. Preserve owner-configured permitted webhook destinations; no default D1/R2/database/account/queue system. **One deeply verified working reference** teaches agents more than many half-working examples. An exported static frontend alone is not a proven working server-side Pages export. Verify a clean deploy and actual POST receipts; never assert functionality based on file generation alone.


### Optional storage examples and reusable record URLs

The Cloudflare Pages reference includes two **optional, separately testable** storage examples: write a unique JSON object to R2 and insert a verified SQL row into D1. These are **not mandatory backend dependencies** for ordinary webhook-forwarding exports. The owner's priority is that a stored JSON submission can have a stable, independently retrievable **record URL** and a portable versioned response, so completely unrelated future applications can consume it. Default to private authenticated retrieval; never equate a hard-to-guess URL with adequate access control. See the golden reference proposal before implementing either adapter.
