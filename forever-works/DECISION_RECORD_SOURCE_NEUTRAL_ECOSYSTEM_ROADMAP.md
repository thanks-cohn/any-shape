# Decision Record — Source-Neutral Ecosystems and Standards-to-Implementation Roadmap

**Date:** 2026-10-15 | **Status:** owner-informed architectural direction; proposed research, not proof of universal implementation. **Historical period:** P001. **Audience:** any agent, maintainer or future implementer.

## Decision

**Develop the standard and implementation in short, evidence-driven cycles.** Forever Works owns durable software meaning, compositional relationships, contracts, provenance, verification semantics and interoperability guarantees. Any-Shape owns source inspection, specification-driven derivation, target realization, orchestration, actual evaluation and production. New Any-Shape requirements become proposed standard extensions **only after demonstrating general necessity and conformance**; Forever Works must never depend on Any-Shape. Avoid both extremes: building a complete standard without implementation evidence, or coding uncontrolled one-off converters and extracting a specification much later.

## How the vision evolved

1. Economic problem: allow independent creators to reach more platforms from existing software at less duplicated cost.
2. First controlled example: an arbitrary authorized Chrome extension imported under `extensions/<id>/source/`, with separately verified Windows/Linux/Android Avalonia products under `productions/<id>/<target>/`. This was an intentionally informative **first input and implementation family**, not a scope limit.
3. Avalonia cross-platform economy: one graphical toolkit can reduce duplication, but Windows/Linux/Android require isolated adapters and independent runtime proofs. A separate React Native Android run offers contrast; it is never mandatory to the neutral standard.
4. Research risk: negative transfer, cross-target assumption leakage, context interference, specification drift, architectural erosion, platform variability leakage, and evidence laundering. Mitigate with typed scope, verified reuse, target-aware context and independent checks rather than cautionary prompts.
5. Long-horizon inheritance: Forever Works records purpose, identity, accepted capabilities, invariants, source of authority, data/state, UI semantics, decisions, alternatives, dependencies, historical Periods and WHY/WHAT/HOW TO REPLACE/PROOF.
6. Broader input/output: any authorized software source type—or specification-only—may yield requested application forms, languages, CLI tools, services, browser extensions, assistants and new applications. Unsupported intakes/targets must be reported rather than faked.
7. `specifications.json`: owner-directed, versioned request. May be large and modular; selects source(s), independent outputs, preserve/transform/exclude/add obligations, interaction contracts, runtime/framework preferences and acceptance criteria. It is a job instruction **not identical to the long-lived Forever Works inheritance model**. Accepted semantic requirements can be mapped into Forever Works records with provenance.
8. Multi-participant ecosystems: not merely application pairs. Support arbitrary many-to-many relationships, intermediaries, coordination patterns, shared services and data, nested suites, deployment alternatives, permission boundaries, state ownership and end-to-end ecosystem outcomes. Ecosystem arrangement may change over time as long as reviewed obligations survive.
9. True proof: code generation/builds are not functional parity; production requires independently exercised effects, platform UX, security, interoperability, installation/upgrades and release controls. The benefit of the inheritance format itself requires controlled comparisons with and without it.
10. Fifty-year ambition: permit cold agents to reconstruct intent and acceptable behavior without dependency on the original programming language, framework, runtime, provider or specific agent. No claim of guaranteed perfect indefinite survival.

## Normative home versus implementation home

| Concern | Authoritative home | Relationship |
| --- | --- | --- |
| Abstract record semantics, provenance, conservative claims, compatibility, schema/API versioning | `thanks-cohn/forever-works` | Existing Standard 0.1 is normative |
| Ecosystem membership, ports, multi-party interactions, topology, authority, state ownership, suite evidence | `forever-works/docs/PROPOSALS/COMPOSABLE_SOFTWARE_ECOSYSTEM_CONTRACT.md` first | Candidate versioned profile; not yet Standard/API v0.1 |
| Desired products, source selection, derivation, preserve/transform/add, modular user input | Any-Shape `specifications.json` schema | A request format with optional mapping into accepted Forever Works meaning; not a replacement for the standard |
| Source and target adapters, implementation language/toolkit, platform builds | Any-Shape `reconstruction/` | Replaceable concrete mechanisms |
| Historical explanation and system-specific decisions | Each project's Period Documents / continuity package | Proposals and observations clearly distinguished |
| Time-bounded build-agent instructions | Any-Shape `codex/` only | Operational; not permanent neutral API |

**Important:** Not every field of `specifications.json` belongs in the Forever Works canonical schema. One describes **what the user requests now**; the other describes **what enduring meaning and evidence must survive**. Mapping must be explicit and never promote inferred or unreviewed requirements.

## Immediate next steps, in order

### Milestone S1 — small Forever Works ecosystem profile, *not* speculative wholesale rewrite
Create a versioned, optional **ecosystem-composition profile** in Forever Works with JSON Schema and several conformance fixtures: multi-participant fan-in/fan-out, distributed state, nested suites, multiple deployment configurations, disabled or inaccessible participants, trust boundaries and intentional invalid examples. Describe typed participant and interaction IDs, target-independent ports, authority/ownership and verification scopes. Use Standard 0.1 namespaced extension mechanisms first. Add minimal agent-neutral queries only after contracts pass cross-language conformance; avoid premature normative API proliferation.

**Exit:** valid/invalid schema fixtures and one working reference validator, old fixtures remain passing.

### Milestone A1 — bind Any-Shape jobs to accepted continuity meaning
Continue the existing, tested source-neutral `specifications.json` loader, planner, source/target catalogs and extension intake. Implement a reviewed contract checkpoint mapping job/product/relationship requirements into compatible Forever Works model IDs and proposed ecosystem profile, without mixing observed source facts with approval. Keep both models intact and expose stable translation failures.

**Exit:** one synthetic multi-product, multi-interaction suite can round-trip/specify/validate relationships without authority leakage; the original extension pipeline remains unchanged.

### Milestone A2 — executable software and interoperability
Implement one genuinely working **generic behavior vertical slice**, including executable state transitions, typed inputs/outputs and observable effects, in *two different product forms* where feasible (e.g. small CLI helper and UI/extension counterpart), with an independently checked interaction. Do not create ten empty platform adapters. Distinguish platform and output form from implementation language; allow Python/C++ helpers as future real target adapters without declaring unsupported adapters working.

**Exit:** independent tests prove observable behavior and an actual permitted cross-product exchange.

### Milestone S2 — refine standard against experiments
Feed discovered semantic gaps, negative transfer and verification difficulties into Forever Works proposal with conformance tests, explicit version migration and documented decisions. Promote only stable general-purpose concepts; leave platform-specific procedures in adapters.

### Milestone A3 — widen real source/target breadth
Add independently exercised Android/desktop source adapters and browser-extension/CLI/service target adapters as capacity permits. Large modular specifications and arbitrary topology remain first-class. Record what is not observable or authorized. Benchmark cost, runtime fidelity, maintenance and format benefits across held-out cases.

## What is currently real

At 2026-10-15, the latest recorded Any-Shape handoff reports source-neutral schema, modular loader, adapter catalogs, Chrome static source analysis, relationship-aware plans, three Avalonia incomplete host generators, and tests; **not** arbitrary source reverse-engineering, native behavior synthesis, browser output production, multi-app runtime integration, or production-ready three-target releases. Forever Works currently has canonical Standard 0.1 and API v0.1 with proven graph/provenance/replacement semantics, but **no first-class implemented ecosystem profile or suite evaluator**. Do not claim the above milestones already passed.

## Governing constraints

- No proprietary agent dependence in permanent architecture.
- Avoid invasive breaking revisions: retain v0.1 files, API discovery and existing conformance fixtures.
- Keep documentation modular and indexable; large contexts should be selectively retrieved, never assumed to fit one agent request.
- No unreviewed owner permissions or unverified observations become authoritative by serialization.
- Document failure modes and limitations as diligently as successful trials.
- Keep user-visible economic value central: fewer duplicated developer hours, broader markets, maintainable products and credible quality.

## Primary references

- `forever-works/PROPOSALS/ANY_SHAPE_UNIVERSAL_SOFTWARE_RECONSTITUTION.md`
- `forever-works/SOURCE_NEUTRAL_DERIVATION_FOUNDATION.md`
- `forever-works/EXTENSION_WORKSPACE_CONVENTION.md`
- `forever-works/RESEARCH_DRIFT_TRANSFER_AND_TARGET_ISOLATION.md`
- `reconstruction/specifications/README.md`
- `thanks-cohn/forever-works/docs/PROPOSALS/COMPOSABLE_SOFTWARE_ECOSYSTEM_CONTRACT.md` (different repository)
