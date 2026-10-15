# Next 30-minute implementation request — source-neutral Any-Shape foundation

**Operational assignment for this Codex session only.** Not a Forever Works standard, not an agent-specific constraint on the permanent system. All lasting code, APIs, contracts and documentation must remain agent-agnostic.

## Objective

Evolve Any-Shape from **Chrome extension → three Avalonia applications** into a **source-neutral, specification-driven reconstruction and software derivation engine**. Any authorized existing application/source, or a specification-only request, should be representable as input; a user may request zero, one or multiple target products and define whether to faithfully reconstruct, adapt, extend, integrate, or create a companion/assistant.

**Do not pretend all source formats can already be reverse-engineered.** The goal of this bounded session is to implement genuinely extensible foundations, runnable validation and an initial vertical slice. Keep existing extension→Windows/Linux/Android workflow functional as the first source adapter; retain its isolated native-output roadmap.

## Read first

- `codex/HANDOFF_LATEST.md` and `codex/BUILD_GENERIC_THREE_TARGET_PIPELINE.md`.
- `forever-works/SOURCE_NEUTRAL_DERIVATION_FOUNDATION.md`, `EXTENSION_WORKSPACE_CONVENTION.md`, `EXTENSION_RECONSTRUCTION_STANDARD_V0_1.md`, `AVALONIA_THREE_TARGET_ISOLATION.md`, `PERIODS.md`, `periods/P001_EARLY_EXPERIMENTAL.md`.
- Root `AGENTS.md`, current `forever/` and vendored standard, plus extension pipeline implementation/tests and Avalonia pack.

## Build these in priority order — meaningful executable progress first

### 1. A versioned specifications.json contract

Create a **general-purpose, JSON-Schema-validated** job specification independent of Chrome/Avalonia. Include:
- `specificationVersion`, stable job/product/source IDs, schema migration/versioning policy, strong input path validation and immutable source hashes;
- `sources[]`: declared source type, locator/path, original name/version, provenance, access/authorization and known unknowns;
- `requestedProducts[]`: independent product identity, target(s), derivation relationship (`reconstruct`, `port`, `adapt`, `companion`, `assistant`, `integrate`, `extend`), purpose, accepted capabilities/invariants and target-specific UX, security, authority and data requirements;
- explicit `preserve`, `transform`, `exclude`, `add` declarations and permitted interactions between source/target products;
- dependencies, integration boundaries, permission grant/review requirements, incompatibilities, acceptance cases, provenance and unresolved decisions;
- structured support for **large modular specifications** via uniquely identified files / `$ref`-like local references with bounded traversal, cycle prevention, stable ordering, clear conflicts and secure paths; do not impose an arbitrary small prose-only format or process the entire document in one context dump;
- forward-compatible namespace extensions without silently ignoring safety-critical unknown fields.

An illustrative specification may request a Windows desktop recreation of an Android app, plus a companion browser extension and a mobile assistant; these are **desired outputs**, not automatically proven capabilities. Separate source observation from owner instruction and inferred capability. Preserve origin identity distinct from derived-product identity.

### 2. Source and target adapter catalogs

Introduce language/platform-neutral `SourceAdapter` and `TargetAdapter` interface contracts, with discoverable capabilities, accepted input types, confidence/provenance, supported output types, limits and structured unsupported responses. Wrap the existing extension inspector/analyzer as the first real `SourceAdapter` **without rewriting or weakening it**. Register planned Android source, desktop source and specification-only adapters as metadata/unsupported where not implemented; don't emit fake successful parsing. Reuse existing Avalonia output machinery as the first target adapter and advertise actual implementation limitations.

### 3. Bridge old and new workflows

Keep `extensions/<id>/source/`, existing `npm run pipeline -- ...` commands, EIR v1, run IDs, source hashes, evidence, and release-refusal safeguards functional. Add generic `specifications/<job-id>/specifications.json` and a source-neutral job/plan validation command; only create new `sources/` and `productions/` conventions after clear compatibility resolution. Do **not** rename directories wholesale or invalidate previous saved runs.

The portable semantic representation should remain independent of source adapters and output technologies. Add a compatibility translator or wrapper, not a destructive migration. A first class `specifications.json` may be generated from legacy extension→3 Avalonia defaults, but must remain reviewable.

### 4. Traceable meaning and product relationships

Create a graph linking source observations, accepted requirements, requested products, target-specific capability plans and evidence. Crucial distinction: **faithful reconstruction** requires parity and documented deviations; **companion/assistant/extension** creates a different product with its own identity, obligations and permitted integration. A new assistant cannot inherit the original app's privileges or access inaccessible internal data. Record missing API access, source-only binaries and unsupported integrations explicitly.

Preserve WHY / WHAT / HOW TO REPLACE / PROOF and P001 dated addenda documenting *old Chrome-only assumptions*, *why they existed*, *what changed*, *what remains the same*, *migration compatibility*, and *new hypotheses*. Keep the core Forever Works standard unmodified; use namespaced project-local additions with provenance.

### 5. Executable tests and a concrete neutral demo

Use multiple unrelated fixtures: existing Chrome extension, a **specification-only companion request**, and a simulated desktop or Android source descriptor. The latter is **metadata-only** until a real parser exists. Test invalid relationships, duplicate IDs, path traversal, cyclic modular specification files, target leakage, unknown adapters, source/target mixups, and attempts to smuggle authority through external sources. Demonstrate a new validated job describing several outputs with differing relationships and produce an honest capability/target plan; no hollow 'success' label for unsupported source adapters.

## Work discipline: complete useful increments within 30 minutes

Start from the latest handoff. Prioritize this bounded source-neutral foundation **over** adding new Avalonia visual widgets or narrowly improving the old converter. Existing pending real behavior reconstruction stays explicitly on the backlog; avoid breaking it.

At ~20 minutes assess completed code/tests and outline handoff. At ~25 minutes focus on regression verification, clean commits and durable notes. By ~28 minutes commit and push `codex/HANDOFF_LATEST.md` with actual tests, status, known shortcomings and next ordered tasks; complete user-facing summary around minute 30. Keep incremental commits. If time is constrained, deliver a real versioned validated specification + basic adapter catalog + regression tests first, then detail incomplete items. Never assert unexecuted tests passed.

## Acceptance for THIS session

- A genuinely runnable generic job/specification validator and schema, not just prose.
- Existing extension pipeline regression tests still run, or exact environmental blockers recorded.
- At least one synthetic multi-output specification passes validation; invalid/unsafe cases fail.
- Implemented versus advertised/source-planned adapters distinguished in machine-readable discovery.
- No source type, target, application name, UI framework or agent provider embedded into neutral meaning.
- Existing fail-closed per-target verification and promotion remain unchanged.
- Additive historical docs explaining why the original extension-focused architecture was the first experiment.
- A durable committed, actionable ~30-minute handoff for the next run.

## Continuation horizon (future runs, not false claims for this session)

Implement stronger modular JSON references, multiple genuine source adapters (Android source, desktop source, binary metadata with honest limits), agent-efficient targeted context retrieval, more target frameworks including browser-extension generation, executable domain semantics/effects, target-host tests, trusted promotion and artifact packaging. Benchmark breadth across unseen inputs and evaluate Forever Works' measurable contribution. The architecture should permit arbitrary future media without promising full conversion today.
