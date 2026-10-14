# Any-Shape milestone map — endurance-first roadmap

**Status:** Proposed roadmap, not a claim that milestones have passed.
**Date:** 2026-10-13
**Authority:** Product goals are drawn from the project founder's stated vision; specific dates, thresholds, implementation tactics and prioritization below are proposed until reviewed.
**References:** `docs/FOUNDATION/`, `forever/`, `docs/PROPOSALS/DUAL_API_UNIVERSAL_AGENT_RFC_003.md`, `docs/PROPOSALS/FOREVER_MAINTAINABLE_PROJECTS_RFC_004.md`, `docs/CODEX/CODEX_HANDOFF_002_UNIVERSAL_IDENTITY.md`, actual Forever Works standard in `thanks-cohn/forever-works`.

## North star

**An Any-Shape project must be understandable, usable and maintainable by humans and unfamiliar authorized agents after its original language, libraries, author, deployment environment, or agent has become unavailable.**

Any-Shape must also offer competitive human interfaces: responsive/adaptive aesthetic presentation, accessibility, forms and rich components, multi-medium renderers, and programmable interaction. Yet feature parity is a means, not the victory condition. **Longevity, honest reproducibility and low total cost of upkeep** are the product's defining advantages.

Browser overflow, window resize and layouts are first test specimens, **not the scope ceiling**. Meaning, functionality, authorized actions, presentation quality and verification should survive variation in space, medium, available resources and implementation machinery.

### Two public faces / one semantic foundation
- **Developer SDK:** imperative and declarative authoring, portable types/schemas, compositional primitives, state, validation, renderers, diagnostics.
- **Universal Agent API:** no project-specific pretraining assumed; concise discovery entrypoint; inspect/plan/preview/authorized apply/verify; structured purpose, surfaces, state, actions, permissions, uncertainty and handoff.
- **Shared source of truth:** stable semantic IDs, state machine, validation, permissions, interface meaning and design intent. No divergent domain semantics between human UI, SDK and agent action.
- **Forever Works continuity:** every Any-Shape project can eventually export/import a canonical, provenance-rich continuity pack for module-level repair, replacement and reconstruction.

## Non-negotiable engineering governance

1. Forever Works **canonical** records and schema are normative for project continuity; avoid a competing Any-Shape-only format. Preserve explicit vs inferred vs agent-proposed intent, unverified evidence and requirements vs implementations.
2. Every milestone maps purpose → capabilities → invariants → constraints → implementation → independent tests → evidence; separate behavioral equivalence, drop-in API compatibility and subjective visual approval.
3. The original implementation is not the oracle for blind rebuild experiments; the approved semantic contracts and separately authored test fixtures are.
4. No claim that an agent or human can maintain all possible projects forever, or that every language can express every platform facility. Be honest about feasibility, unsupported cases, and economic cost.
5. Developer and agent APIs need equal security controls and domain validation; mutations must be explicitly authorized and auditable. No secret leakage or default telemetry.
6. Every change updates the continuity model or records a bounded, explained exception; drift is a detectable build/CI failure for mandated traceability.
7. Prefer low-dependency, offline-capable, standards-native, low-resource designs and simple tooling. Complexity must justify itself against upkeep burden.
8. Maintain stable older-reader documentation: plain UTF-8 Markdown/JSON, exportable samples and human-readable indexes; machine access is additive.

## Milestone sequence and release gates

| Milestone | Theme | Core artifact | Proof gate |
|---|---|---|---|
| M0 | Baseline inventory | Honest implemented/proposed matrix | Existing v0.1 verified; no aspirational features marked shipped |
| M1 | Canonical meaning | Accepted Forever Works project/module graph | Schema validate + audit; every essential capability linked |
| M2 | Human-recoverable design | Compact bootstrap + exhaustive human-readable handbook | Human with no prior project history explains/rebuilds minimal example |
| M3 | Cold-agent discovery | Transport-neutral Agent API manifest and read-only queries | Untrained authorized agent completes discovery and explanation without source browsing |
| M4 | Unified semantic engine | Stable model of surfaces, state, actions and permissions | SDK and Agent API yield identical meaning/validation and test results |
| M5 | Competitive adaptive UI | Accessible component system, reference-style design contracts, browser lab | Cross-browser, geometry, a11y, visual review and no-script/fallback gates |
| M6 | Safe agent implementation | Plan, dry-run, consent, apply, verify, rollback | Cold agent makes authorized changes, reports effects; unauthorized calls blocked |
| M7 | Project Continuity Pack | Generator/export/import for downstream projects | Third-party example model passes Forever Works validation and traceability |
| M8 | Language independence | 2+ separately authored language bindings and cold rebuild | Blind reimplementation passes shared semantics; API compatibility measured separately |
| M9 | Medium and resource migration | Alternative renderer/target and limited-resource fallbacks | Same logical app retains meaning/actions; limits explicitly surfaced |
| M10 | Long-horizon repair trials | Rotating-agent, dependency-loss and human-only exercises | Success at restore, repair and migration under controlled breakage |
| M11 | Sustainable ecosystem | Versioned APIs, migration toolkit, reproducible releases, ecosystem adapters | Independent adopters can operate/maintain without original team |

### M0 — Make the current state undeniable
**Deliver:** versioned inventory of source, exported contracts, documented promises, test coverage, dependency tree, packaging, security properties, and unimplemented RFC concepts.
**Pass:** repeat existing unit, browser and package checks where runners exist; save environment-specific evidence and failures; label unrun checks. This repository has a reported CSS/JS v0.1, not yet an implemented universal Agent API or continuity-pack generator.
**Exit risk:** confusing documentation with shipped capabilities.

### M1 — Preserve meaning as canonical machine-readable obligations
**Deliver:** Forever Works 0.1-compliant, owner-reviewed manifest and records for Any-Shape and major modules, traceability graph, language-neutral semantics, explicitly recorded non-goals, requirement-to-test coverage report.
**Pass:** actual Forever Works CLI `validate` and `audit`, all references resolvable, owner-approved vs pending statements labeled. All critical invariants represented and linked; model no longer describes only responsive CSS.
**Exit risk:** autogenerated prose or false approval becomes architectural truth.

### M2 — Humans must be able to inherit it too
**Deliver:** two-layer documentation: one-page concept and five-minute recovery route; deeper readable handbook with module semantics, behavior, examples, decision rationales, portability constraints, failure atlas and repair recipes; printable/offline UTF-8 bundle.
**Pass:** independent technically capable human given *only* the continuity materials (not source) explains purpose, core modules, constraints, failure behavior, and builds a small conformant example. Record misunderstood terms and revise materials.
**Exit risk:** "agent-readable" becomes incomprehensible to human maintainers.

### M3 — Unfamiliar-agent discovery, read-only first
**Deliver:** transport-neutral operation catalog and JSON schemas, CLI JSON/stdio adapter, stable IDs for all semantic surfaces, read-only explain/trace/list/inspect, diagnostic uncertainty and permissions metadata.
**Pass:** cold agent (no repo-specific memory or hints beyond location/entrypoint) discovers APIs, explains project design, inspects a demo and creates a valid plan without browsing current implementation source. Measure calls, tokens and errors.
**Exit risk:** discovery requires prior private knowledge or vendor-specific prompts.

### M4 — Unified semantic foundation and Developer SDK
**Deliver:** versioned model/IDL for content, fields, actions, validation, state, relationships, permissions and presentation intent; imperative SDK in first language, standalone declarative document and types; consumer conformance tests.
**Pass:** same logical form accessed by GUI, SDK and read-only Agent API produces consistent IDs, rules, state and errors. Subsequent language adapters share fixtures, not hand-translated examples.
**Exit risk:** separate semantic truths for agents and humans.

### M5 — Match mature UI competitors in useful capabilities
**Deliver:** polished, reusable, composable accessible components: navigation, forms, feedback, content cards, data table/grid, selection, overlays, rich visualization adapters where warranted; theming/style tokens; design-reference **proposed** aesthetic extraction; browser and responsive lab.
**Pass:** tests across browsers/containers/zoom/RTL/keyboard/no-JS where applicable, visual review and accessibility tests; aesthetic matching requires approved reference, documented licensing and human review. Do not target one screenshot or pretend pixel parity across engines.
**Exit risk:** feature proliferation erodes portability and longevity. Prefer integration/adapters with mature renderers when feasible.

### M6 — Agent actions with safety and verification
**Deliver:** discover, propose, plan, dry-run, inspect impact, request consent, apply authorized change, verify, undo/migrate; typed errors; privilege model; local evidence trail.
**Pass:** an uninstructed agent modifies an example form/design while preserving domain validation and semantic identities, rejects unauthorized changes, detects regression and recovers. Action permissions never bypass developer SDK semantics.
**Exit risk:** "any agent can operate" becomes unrestricted access.

### M7 — Every adopter inherits Forever Works
**Deliver:** automatic **Project Continuity Pack** (canonical `forever/` model, modules, constraints, dependencies, decisions, semantic+API fixtures, conformance evidence, human recovery docs, short agent discovery index). Generate as draft; owner approval required for authoritative intent.
**Pass:** example app with >=3 interdependent modules exported and validated; unrelated new agent accurately traces one change across modules, then repairs a deliberately broken capability using accepted obligations.
**Exit risk:** continuity pack is stale or incomprehensible. Add drift detection in CI and observable docs/model checks.

### M8 — Cold, cross-language reconstruction
**Deliver:** isolated blind reconstruction protocol, source-free spec bundle, independent evaluator, ≥2 authoring-language bindings (one plain JavaScript and one non-JS preferred), drop-in compatibility lane, conformance/evidence schemas.
**Pass:** isolated agent creates a working example in a distinct language/architecture without current source/test access; semantic contracts and expected behavior pass via an independent harness. Record time, cost, edits, shortcomings. Browser outputs may still be HTML/CSS; code generation language differs.
**Exit risk:** porting old code and calling it independent reconstruction; treating a validated manifest as a rebuild.

### M9 — Cross-medium and limited-resource survival
**Deliver:** second genuine presentation target (e.g. desktop window or accessible text mode), resource-capability profile, fallback/adaptation policy and a consistent machine operations adapter.
**Pass:** same semantic form/data/actions in both presentations; under measured CPU/memory/display constraints, essential operations remain or correctly report unavailable features. No inventing full feature equivalence.
**Exit risk:** hardcode the browser as universal identity.

### M10 — Endurance as a test, not a slogan
**Deliver:** recurring destructive recovery challenge library: deleted build system, obsolete dependency, renamed module, lost original agent, absent graphics backend, source withheld, corrupt docs, divergent model, version mismatch, restricted resources.
**Pass:** rotating cold agents and at least one human reproduce repairs or migrations from approved continuity artifacts; compare behavior/security/UX, record failure, elapsed labor, token use, runtime cost and migration impact. A failed recovery becomes an actionable spec deficiency.
**Exit risk:** one successful demo becomes an unfounded promise of infinite upkeep.

### M11 — Ship as a durable public ecosystem
**Deliver:** backwards-aware semver and deprecation policy; signed/verifiable release artifacts where practical; offline exports; stable public Developer and Agent API reference; adapters; independent developer quickstart; sustainability and license documentation.
**Pass:** an external adopter installs, authors, tests, upgrades and exports continuity without maintainer intervention. Releases and old schemas reproduce documented results in controlled environments; migrations have rollback notes.
**Exit risk:** dependency lock-in and release complexity undermine low upkeep cost.

## Cost and endurance scorecard

Every release records these measurements, separately for fresh human, cold agent and experienced hot agent as relevant. Do not fabricate targets as measured results.

| Metric | Definition | Initial target proposal |
|---|---|---|
| Cold comprehension | Time to accurately explain project purpose, modules, invariants and safety limits from pack only | ≤30 minutes (agent or skilled human, measured separately) |
| Cold bootstrap | Time to install/read/demo supported basic usage, with clean environment | ≤15 minutes excluding external download delays |
| Cold repair success | Share of seeded defects repaired without original author/source hints | ≥80% in controlled trials, with confidence interval |
| Independent reconstruction | Fraction of essential conformance cases passed after code-blind rebuild | ≥95%; zero failures on critical safety/authorization cases |
| Model trace completeness | Critical capabilities with explicit invariant, independent test or UNKNOWN rationale | 100% |
| Agent discovery efficiency | Number of calls/tokens before discover → inspect → plan succeeds | Establish measured baseline in M3; improve each release |
| Maintenance cost | Human hours + agent compute/tool spend to handle standard seeded repairs/migrations | Publish median and p90; reduce over versions |
| Runtime footprint | Startup, memory, CPU, bundle size for standard representative fixture | Baseline in M0; prevent regressions without accepted rationale |
| Migration effort | Time/cost to move a reference project to a new implementation language/renderer | Establish at M8; require comparative evidence |
| Capability preservation | Essential operations and validation still correct after migration | 100% critical, any others explicitly FAIL/UNKNOWN |

Targets are proposals, not universal guarantees. Cost comparisons against Flutter/Adaptive Cards/A2UI/MCP require fair task-matched experiments and explicit time, features and platform constraints; do not claim a competitive win without measurements.

## Three flagship demonstrations

**D1 — "Use this aesthetic; make it work everywhere supported."** Authorized reference repo → extracted draft design contract → professionally reviewed interface → tests across relevant browsers/shapes and user input modes → evidence bundle explaining compromises.

**D2 — "Give this to a stranger agent."** Fresh agent finds one discovery entrypoint, understands app and modules, safely changes a field and component, tests effects, hands off to a second agent without relying on chat context.

**D3 — "The original project is gone; bring it back in C++."** Source withheld in controlled sandbox; continuity pack and approved fixtures given to a cold agent → independently authored C++ app or generator (depending on actual target) → conformance tests and documented target-platform limitations → new continuity pack generated. Human-only variant required for M10.

## Parallel track strategy

- **Experience parity track:** match the genuinely useful parts of mature UI frameworks through standards-first components and compatible adapters, not vanity feature counts.
- **Agent accessibility track:** prioritize robust self-discovery, least-privilege actions and inspectable semantics; agent usability is a public product feature.
- **Forever Works endurance track:** enforce continuity pack and independent proof from day one; never defer documentation until after the code hardens.
- **Economics track:** keep recurring CPU/tool/token/dependency costs visible; track total cost of ownership, not just install size.

## Release naming suggestion
- **0.1:** Verified browser-focused seed (existing code; verify fresh).
- **0.2:** Canonical model and human cold-recovery handbook (M0–M2).
- **0.3:** Read-only Agent API and unified SDK semantic foundation (M3–M4).
- **0.4:** Competitive UI + safe agent operations (M5–M6).
- **0.5:** Continuity-pack generation and alternate-language proof (M7–M8).
- **0.6:** Second-medium resilience and destructive recovery trials (M9–M10).
- **1.0:** External-adopter, independently maintainable ecosystem (M11 plus all prior gates).

These labels are illustrative milestones and not current release promises.

## Codex instructions for each milestone
Read `AGENTS.md`, `docs/CODEX/CODEX_HANDOFF_002_UNIVERSAL_IDENTITY.md`, RFC-003, RFC-004, this roadmap, current API docs and canonical Forever Works standard. Work in coherent slices. For each milestone deliver (a) updated canonical Forever Works records and owner-review status, (b) real implementation or explicit documentation-only state, (c) independent conformance tests and exact evidence, (d) dependency and economic impact, (e) updated human/agent bootstrap and next-agent handoff, and (f) candid pass/fail/unknown gate report. Maintain main unless user/repo policy requires a branch; do not self-merge PRs. Do not mark a milestone complete without observed acceptance evidence.

**Victory:** A user asks for a design, repair or migration; a new human or authorized agent with no prior project context can understand its purpose, perform the work economically and verify that essential meaning and functionality survived.

## Flagship proof: adaptive transference (proposed)

See [RFC-005 — Interface Portability](../PROPOSALS/INTERFACE_PORTABILITY_RFC_005.md) and [RFC-006 — Adaptive Transference](../PROPOSALS/ADAPTIVE_TRANSFERENCE_RFC_006.md). A human-facing demonstration should let someone submit an authorized browser application to an agent and obtain an independently verified **native Python desktop** implementation with equivalent input/action semantics, public APIs and endpoints, accessibility obligations and orientational continuity under resizing. Deliver in escalating stages: fixed two-runtime native parity → reusable semantic/adaptation contracts → agent-driven reconstruction → enforced blind isolation and cost measurements. A Python WebView rendering original HTML does not count as native transference. These are aspirational acceptance gates; neither conversion nor full GUI equivalence is presently shipped.

## Bidirectional language proof and C/C++ next targets

[RFC-007 — Bidirectional Language Transference](../PROPOSALS/LANGUAGE_PORTABILITY_STRATEGY_RFC_007.md) sets the demonstration strategy: first an approachable, independently verified **JavaScript ↔ native Python** showcase, including real inputs, Submit actions, same endpoint and state semantics, and adaptation/orientation across window sizes; then the stage for **C++/Qt desktop** and a separate **C core/ABI** proof. Preserve language-neutral requirements, adapters and shared fixtures so neither JavaScript nor Python becomes the permanent source of meaning. These are proposed future gates and do not mark M8 as complete.

## Production-oriented platform examples (proposed)

[RFC-008 — Foundational Cross-Platform Showcases](../PROPOSALS/FOUNDATIONAL_CROSS_PLATFORM_SHOWCASES_RFC_008.md) specifies a lean reference ladder: (1) independently verified JavaScript ↔ native Python application transference, including aesthetics, window adaptation, real field/Submit/API parity; (2) C#/Avalonia Windows and Linux realizations using the same domain and endpoint contracts; (3) compliant Chrome extension plus separately installed native host; (4) C++ native GUI and bounded C/ABI foundations. All target adapters remain optional to the lightweight core. Chrome Web Store review does not approve a native installer, and all packaging/security outcomes require separate evidence. Cold-agent discovery, owner-reviewed neutral contracts and independent cross-platform conformance—not mere screenshots or successful builds—are required for support claims.
