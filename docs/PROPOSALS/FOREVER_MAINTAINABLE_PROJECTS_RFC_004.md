# RFC-004 — Forever-Maintainable Projects: purpose-preserving upkeep and migration

**Status:** Proposed, not yet implemented or guaranteed.
**Date:** 2026-10-13
**Repo:** thanks-cohn/any-shape
**Related:** docs/PROPOSALS/DUAL_API_UNIVERSAL_AGENT_RFC_003.md; docs/CODEX/CODEX_HANDOFF_002_UNIVERSAL_IDENTITY.md; docs/RECONSTRUCTION/; canonical Forever Works v0.1 standard.

## Governing vision
Any-Shape shall eventually produce not only adaptable, human-readable and agent-operable interfaces but **inheritable software projects**. Any compatible project should carry its own explicit purpose, semantic model, module-level intent, user-visible and agent-facing behavior, invariants, contracts, dependencies, replaceability rules, version/migration history, and test evidence in the actual canonical Forever Works format.

The project should survive original developers, frameworks, language choices, dependencies, UI renderers, and repeated agent handoffs. In the limit, a user should be able to request: "Update this project", "Rebuild this in C++", "Use a new renderer", or "Repair its interface for new devices", and a previously unfamiliar authorized agent should be able to discover the project, identify its obligations, plan the migration, execute it and prove what was preserved. No single agent/vendor/historical conversation may be necessary.

**Infinite upkeep** is the long-horizon design objective, not a literal guarantee of uninterrupted operation, guaranteed future agents or costless migration. Dependability requires ongoing conformance evidence, security reviews, owner control and honest UNKNOWN results. This is not a claim that every algorithm or platform can be translated directly to every language; native libraries or platform adapters may have to change.

## Two-level Forever Works obligation
### Level A: Any-Shape itself
Any-Shape's purpose, contracts, module semantics and release evolution must remain recoverable independent of source and toolchain.

### Level B: every Any-Shape-generated/adopted project
Provide an exportable, auditable **Project Continuity Pack** (canonical Forever Works model + human-readable reconstruction documents + neutral behavior fixtures + API/agent discovery manifest + verification references). Generating this pack is a core future SDK/Agent-API workflow, not an optional afterthought or proprietary storage format.

The export must describe a project's *actual* purposes and obligations—not presume the host project's intent. Agent-inferred descriptions remain proposed until explicitly accepted. A preexisting project can be onboarded through structured extraction with provenance and owner review; never silently change the project's mission.

## Granularity: independently inheritable modules
Each module/component/system needs:
- Stable ID; name; purpose; owners/stakeholders and meaningful outcomes.
- Inputs, outputs, events, state, transitions, side effects, and failures.
- Consumer-visible and agent-facing behaviors, including safe actions and permissions.
- Domain invariants, accessibility and visual/design-intent invariants where applicable.
- Dependencies categorized according to actual Forever Works classes, reasons selected, replacement requirements, portability constraints.
- Interfaces, serialized schemas, versioning/compatibility obligations, migration routes.
- Executable conformance fixtures, evidence refs, benchmarks where essential, limitations and unverified assumptions.
- Cross-module relationships and assumptions, including failure isolation and graceful degradation.
- Mechanism vs meaning distinction: what may be deleted/replaced without losing project identity.
- Reverse traceability: every important capability maps to the purpose it serves and evidence that it continues to function.

## Developer SDK responsibilities
Add future versioned operations for create/inspect/update the Project Continuity Pack, register modules, declare invariant checks, map dependencies, export neutral fixtures, prepare migration and verify new implementations. Authoring language bindings shall be thin consumers of the canonical schema; no binding becomes normative by itself. Scaffolded models are drafts, not accepted truth. Provide a way to choose automatic minimal/full evidence generation without fabricating outcomes.

## Universal Agent API responsibilities
Cold agents must be able to discover, with no project-specific training:
1. Which project and version they are examining; where the canonical purpose, module graph and trusted evidence live.
2. Which operation families are supported and exactly how to call them, with typed schemas, side effects, permission requirements, errors and examples.
3. What is fixed, changeable, risky, currently broken and unknown.
4. How to plan a safe adaptation/migration and predict impacts through dependency/capability graph tracing.
5. How to obtain authorized, least-privilege inspection and mutation access, with review and rollback checkpoints.
6. How to generate/apply changes, rerun independent verification and publish an inheritance report.
7. How to abandon/restore a partial task and resume with a different agent without depending on chat memory.

Discovery adapters (e.g. CLI JSON/stdio, in-process language bindings, MCP/HTTP where useful) must expose the same underlying semantics. A tool-less or unauthorized agent cannot act; no claim of magically universal compatibility.

## Cold migration protocol (e.g., "Make it C++")
1. **Ingest:** Load canonical Forever Works manifest and all records; validate schema, references, evidence provenance and recorded version.
2. **Explain:** Independently summarize goals, modules, invariants, dependencies and essential behavior; identify source-bound assumptions and unresolved requirements.
3. **Plan:** Compare existing and target environment capabilities; classify preserved, replaced, infeasible and unknown behaviors; make a migration graph and request approval for materially changed meaning or permissions.
4. **Isolate:** Build a clean-room target-language implementation from approved purpose/contracts and independent conformance fixtures where feasible; never imply translating syntax guarantees equivalence.
5. **Verify:** Run language-neutral semantic and functional conformance, then adapter/API-compatibility tests, then resource/security/accessibility/visual checks as relevant. Preserve UNKNOWN when evidence is lacking.
6. **Deliver:** Return complete new source, build/runtime requirements, portability limitations, exact test outcomes, delta map and migration/rollback instructions.
7. **Inherit:** Update the Continuity Pack with new implementation links, preserved/degraded capabilities, dependency replacements, decisions, evidence and next-agent notes.

## Non-language transformations
The same protocol must support new display mediums, accessibility requirements, different interaction modalities, resource-limited environments, new browser families, offline deployment, new database/transport providers, and major design revisions. These are example transformation axes, not a closed enumeration.

## Independent conformance acceptance
- FM-001: A new agent with only the exported continuity pack can explain the project's identity and module responsibilities without consulting source code.
- FM-002: Every declared essential capability and invariant traces to at least one independent test or an explicit UNVERIFIED state.
- FM-003: Altering/replacing one internal module preserves unrelated modules' external contracts or reports explicit migration impact.
- FM-004: Two independent language bindings can parse the same canonical model and produce consistent capability/dependency explanations.
- FM-005: A cold agent recreates an intentionally small project in a distinct language/architecture without original-source access; an independent harness checks the same contract behavior.
- FM-006: A deliberate dependency disappearance triggers discovery of replacement requirements, rollback/repair plan and measured verification, not silent success.
- FM-007: Both programmer SDK and Agent API present the same module state, permissions and supported operations; unauthorized actions are refused.
- FM-008: An interrupted migration can be resumed from persisted structured evidence and a bounded handoff with no reliance on original conversation context.
- FM-009: The model differentiates explicit owner-approved intent from inferred/agent-proposed interpretations; no automatic authority promotion.
- FM-010: Project continuity works without any one commercial hosted service or agent vendor; offline model, fixture and export paths exist.
- FM-011: User requests like "make it C++" generate explicit feasibility analysis, executable result where feasible, and honest residual incompatibilities.
- FM-012: Consumer-facing human presentation, agent operations, privacy and accessibility obligations survive upgrades or are explicitly versioned and migrated.

For each: status PASS/FAIL/UNKNOWN, conditions, reproducible commands, source-independent evidence and limitations. No fabricated success claims. Runtime cost and maintenance efficiency must be measured, not presumed.

## Proposed Project Continuity Pack contents
- Canonical `forever/manifest.json` and records, preserving Forever Works naming/schema.
- `docs/IDENTITY/`: human-readable purpose, vocabulary, non-goals and design semantics.
- `docs/MODULES/`: per-module responsibility, contracts, interfaces, dependencies and failure modes.
- `docs/API/`: programmer bindings and universal agent-facing public contract with versioning.
- `conformance/`: neutral fixtures/expected observable outcomes + separate language adapters.
- `docs/RECONSTRUCTION/`: cold agent handoff, rebuild and migration runbooks.
- `evidence/`: sanitized, content-addressed checks, environment details and provenance.
- `docs/DECISIONS/`: owner decisions, constraints, replacements and reasons.
- A small machine-readable discovery entrypoint mapping all the above without requiring code execution.

These are portable conceptual paths; do not duplicate or replace the canonical Forever Works schema with a project-specific lookalike.

## Architecture guardrails
- Prefer reversible, explicit, incremental migrations to opaque wholesale rewrites.
- Keep domain state and contracts independent of any presentation technology.
- Require least-privilege authorization, reviewable plans and secret-free diagnostics.
- Conformance checks test actual outcomes, not just presence of code/files.
- Do not make source unavailable by design; code-blind rebuilding is a controlled *test* of documentation quality, not a requirement to hide source during normal maintenance.
- Allow intentional versioned evolution of purpose only by owner-approved decisions, not rigid fossilization.

## Implementation roadmap
A. Audit current Any-Shape Forever Works graph and v0.1 API.
B. Add a canonical `Project Continuity Pack` specification and neutral module descriptors/fixture examples compatible with Forever Works 0.1.
C. Deliver developer SDK serialization/export/import and model validate/audit workflow.
D. Deliver Agent API cold discover/explain/trace/plan operations (read-only first), then authorized mutate and verify with audit trail.
E. Create an example Any-Shape-generated app with at least three modules and independently testable invariants.
F. Run blind cross-language rebuild in a second language plus dependency-loss and interrupted-handoff exercises.
G. Publish precise evidence and NEXT_AGENT inheritance notes. Keep future work explicitly proposed until tested.

## Definition of victory
An unfamiliar authorized agent can recover the purpose of a project and its constituent modules, replace its implementation language or dependencies where feasible, and demonstrate preservation of approved essential behavior without dependence on original authors, tools or agent memory. It may surface infeasibility; truthful refusal to claim parity is better than fictitious completion.

**A project is not its source code; its source code is one replaceable realization of its purpose.**
