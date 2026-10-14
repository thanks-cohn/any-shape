# RFC-003 — Two public APIs, one semantic core: Developer SDK and Universal Agent API

Status: PROPOSAL; not implemented or approved as a stable API.
Date: 2026-10-13
Authority: user-stated product direction, pending final detailed contract approval.
Prior reading: docs/CODEX/CODEX_HANDOFF_002_UNIVERSAL_IDENTITY.md; docs/RECONSTRUCTION/*; forever/manifest.json; docs/API/CURRENT_API_V0_1.md.

## Enduring proposition
Any-Shape must expose TWO equally first-class public faces over ONE consistent semantic model:
(A) a developer-facing imperative/declarative SDK and
(B) an agent-facing, self-describing, maximally discoverable API that an unfamiliar cold-start or context-rich hot-start agent can adopt without training on this specific repository.

A user should be able to ask an arbitrary capable coding agent to use Any-Shape, optionally emulate the visual identity of an authorized reference project, produce an interface, test it across supported form factors/mediums/browsers, and receive a working implementation plus honest evidence. A reference repository is a source of design *inspiration and extractable constraints*, not automatically proof of a licensed/portable asset or a guarantee of aesthetic match.

Browser resizing and overflow are examples of transformation—not the end goal. The invariant is continuity of comprehensible, attractive where practical, accessible human presentation AND discoverable, operable, authorized programmatic functionality as medium, geometry, input, resources, and renderer vary.

## API 1: Developer SDK (imperative first-class)
- Create logical surfaces, semantic elements and structured forms with stable identifiers.
- Define typography, rhythm, palette, semantic grouping, behavior and design constraints as machine-readable design contracts.
- Set adaptation policy; choose render targets and fallback behaviors; measure/report capabilities.
- Imperative methods for create, attach, modify, render, inspect, validate, diagnose, dispose; declarative representation and deterministic serialization also available.
- Typed errors, cancelable/transactional application as appropriate, idempotency where applicable, capability discovery and lifecycle.
- Language neutral normative IDL/schema with bindings in JS and TS initially, plus explicit path for Python/C/C++/Rust/Go without sacrificing semantics.
- No obligatory frontend framework, backend service or proprietary dependency. Current CSS/HTML implementation continues unchanged until a compatible migration.
- Docs: getting started, conceptual guide, reference, cookbook, migration, test-fixture contracts, language binding conformance.

## API 2: Universal Agent API (cold-and-hot discoverability)
- A single canonical discovery entrypoint: supported operations, version, semantic concepts, schema URIs, adapters, environment capabilities, permission requirements, limits, conformance evidence and doc-navigation map.
- Self-describing operation contracts: operation ID, purpose, typed arguments, output schema, prerequisites, side effects, safety and consent gates, idempotency, examples, errors, rollback/repair options and uncertainty.
- Machine-accessible project intent and design invariants; semantic surface registry; stable logical IDs independent of on-screen position; read-only introspection of layout, state and transformations.
- Explicit planning and dry-run mode to preview intended changes, followed by authorized apply and verification. Separate reading/inspection from mutation.
- Design-reference ingestion: derive a **proposed** aesthetic profile from authorized repo artifacts/design tokens/screenshots where available; identify missing assets/licenses, confidence, subjective judgments and human-approval gates. No claim to perfect aesthetic cloning.
- Cross-environment verification plans, local diagnostics, regression evidence and suggested repairs. Report proven vs unrun environments.
- Supports transports such as CLI JSON over stdio, in-process library calls, HTTP or MCP adapters; semantic API must NOT depend on any one transport or agent vendor.
- Cold discovery requires no prior memory: machine-readable manifest, examples, short bootstrap path and errors explaining required next steps.
- Hot continuity supports a session's stored design intent, schema versions, decisions, evidence and resumable operations without relying on unbounded conversation history.
- Least privilege, origin authorization, no covert scanning of other repositories or user content; redact form values and secrets; operations changing files require explicit authorized scope.
- Agent API action execution is not permission bypass: both API faces share domain validation, authorization and state transitions.

## Architecture boundaries
Canonical semantic model → dual API facades → renderer/adapters and conformance evaluator. Agent tooling may call Developer SDK internally, but must not require a particular language binding. Core meaning includes surfaces, operations, state, identity, relationships, rules, design intent, presentation policies, constraints and authorized capabilities. Adapters interpret that model for web, desktop or future mediums and report unsupported semantics rather than silently dropping them.

## Proposed stable operation families (illustrative names; not v0.1 commitments)
discover(), describeIntent(), listCapabilities(), inspectSurfaces(), inspectDesignIntent(), analyzeReference(), proposeDesignContract(), planAdaptation(), previewChanges(), applyAuthorizedChanges(), validate(), runConformance(), diagnose(), explainFinding(), exportEvidence(), dispose().
Every operation requires machine-readable schemas and examples; transport bindings must implement consistent semantics.

## Acceptance demonstrations
D1 Cold agent: in an environment without prior Any-Shape knowledge, reads only the discovery entrypoint; builds a simple adaptive accessible form without manually reading implementation source.
D2 Human+agent parity: same field/action IDs, validation errors, permissions and state changes for GUI use and authorized agent invocation.
D3 Referenced aesthetic: agent derives a labeled design-intent profile from a permitted sample repository, applies it to dashboard/cards/forms, and tests coherence under transformations; records human aesthetic review separately.
D4 Portability: JS and at least one independently authored non-JS SDK adapter pass common capability fixtures; do not infer universal language coverage.
D5 Cross-environment: geometry/reflow, keyboard, zoom, content expansion, mobile/desktop windows and varying resource availability report pass/fail/unknown. Unrun real hardware never silently passes.
D6 Recovery: remove one adapter/dependency, discover missing capability, select alternate backend and preserve semantic/operation contracts or report precise degradation.
D7 Cold/hot: a cold agent and an agent returning after session loss can enumerate operations and rehydrate a versioned plan, with permissions rechecked.

## Forever Works commitments
Add canonical intent/capability/invariant/constraint/dependency/implementation/compatibility/evidence records using actual Forever Works v0.1 schema, correct provenance and reference graph. Document what is explicitly requested versus agent-proposed. Keep v0.1 public API separate from proposed v0.2+ operations. Implementation can be regenerated in a different language while shared conformance and human experience remain identifiable.

## Explicit non-promises
An unknown agent with no repository/network/filesystem access cannot spontaneously discover this API. A model without necessary tools or permissions cannot run it. No SDK ensures professional design without design input and verification. No test matrix proves every imaginable browser or hardware. No automatic aesthetic extractor can guarantee a subjective match. These limitations must be explained clearly, not hidden by marketing language.

## Implementation handoff
Phase 0: audit repo and canonical Forever Works compliance; enumerate contradictions.
Phase 1: durable semantic IDL/contract and documented capabilities with no change to current v0.1 users.
Phase 2: minimal executable developer SDK reference plus contract tests.
Phase 3: independent agent discovery transport (CLI JSON/stdio first) with read-only introspection, schemas and examples; test with a fresh agent that has no prior context.
Phase 4: controlled propose/preview/apply/verify actions with permissions and privacy proof.
Phase 5: design-reference adapter, explicit provenance/asset permissions, multiple renderer and language adapter conformance.
Phase 6: blind reconstruction and migration proof across language boundaries, with evidence.
Throughout, follow docs/CODEX/CODEX_HANDOFF_002_UNIVERSAL_IDENTITY.md; do not call documentation-only capabilities implemented.

Definition of done is staged, evidence-based, and distinct for developer SDK, universal agent discovery, fidelity of authorized actions, visual review, and independent reconstruction.
