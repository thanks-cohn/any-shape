# CODEX HANDOFF 002 — Any-Shape: preserving interface meaning across form, medium, and resources

**Status:** Comprehensive documentation and Forever Works model expansion requested. Do not confuse this request with a completed implementation.
**Repo:** thanks-cohn/any-shape
**Working branch:** main (unless repository policy prevents it).
**Read first:** AGENTS.md; README.md; docs/FOUNDATION/*; docs/API/*; docs/RECONSTRUCTION/*; docs/CODEX/IMPLEMENTATION_REPORT_001.md; forever/manifest.json; and the normative docs/STANDARD.md, schemas and examples in thanks-cohn/forever-works.

## 1. The enduring idea

**Any-Shape enables information and operations to remain comprehensible, accessible, attractive where practical, and functionally available to humans AND programmatic agents even as the medium, geometry, constraints, input methods, and computational resources change.**

The form may change; meaning, essential functions and trustworthiness must remain.

An interface is not identical to its pixels. It is a human-readable and machine-understandable representation of data, relationships, states, possibilities and operations. The user may encounter it as a wide or narrow browser surface, a desktop window, a panel, a mobile view, a 3D overlay, a text interface, or an agent-facing protocol. Different renderers are allowed to express the same logical interface differently; they must not silently remove essential meaning or domain operations.

**Critical correction:** Browser window resizing, overflow, clipping and responsive cards are **illustrations of the principle**, easy first test cases, and examples of currently implemented browser functionality. They are NOT the end goal, sole scope, definition, or permanent technological boundary of Any-Shape. The deeper principle is preservation of intelligible and operable information through transformation of its presentation environment.

The human experience should be readable, coherent, purposeful and, where applicable, aesthetically pleasing. The machine experience should be discoverable, typed or schema-expressible, observable, authorized, deterministic where possible, and amenable to safe agent interaction. The human and agent faces must not diverge in domain meaning, validation or authorization.

### The core example: one logical form, multiple realizations
A logical user-preferences form has stable field identities, meanings, required values, validation, permissible operations, state transitions, feedback and authorization. It may show two columns on a wide monitor, stacked fields in a small window, step-by-step interaction on tiny displays, or a structured semantic schema with authorized action calls to an agent. All represent the *same logical form*. Agents should not have to infer actions from pixels when a structured interface is available.

Another example: a dataset may appear as a rich visual table, a filtered card collection, a paged text report, or a queryable structured record collection. Its identity, relationships, critical data and supported operations endure; density, ornament and navigation can change.

A game-editor object may appear in a 3D viewport, a layer hierarchy, an inspector panel or an agent-readable object registry. The same object ID, selection semantics, editable attributes and permissions are preserved even if the presentation is entirely different.

**Boundaries and honesty:** Not every medium or resource budget can achieve every form of rendering or interaction; represent unsupported features explicitly, offer fallback/deferred interaction when feasible, and never assert equivalent aesthetics or accessibility without evidence. Browser-native HTML/CSS is a current execution mechanism, not a timeless requirement for every medium. For web-delivered output, accessible HTML/CSS remains a sensible baseline.

## 2. Universal design principles to capture

P1. **Semantic identity before appearance.** An object, field or operation has enduring identity independent of its layout or renderer.
P2. **One logical model, plural presentations.** Human-visible variants and machine-usable schemas represent the same underlying meaning and state.
P3. **Functional preservation.** Essential authorized operations stay reachable; if genuinely impossible, limitations are explicit and explainable.
P4. **Accessible human presentation.** Respect reading order, labels, keyboard/assistive use, contrast, feedback, text scaling and input modality.
P5. **Agent affordances as first-class.** Agents can discover supported surfaces, state, allowed actions, preconditions, parameter schemas, outcomes and errors without blindly guessing from geometry.
P6. **Shared rules and trust.** Human and programmatic actions obey the same domain validation, permission/consent boundaries and state transitions.
P7. **Adaptive quality.** Choose sensible density, hierarchy, grouping, rhythm and presentation for the context; a visually pleasing result is a design goal with human review, not a universally computable score.
P8. **Graceful degradation under limits.** Geometry, capability, memory, rendering power, network loss or absent enhancements should trigger honest fallback, not silent data or function loss.
P9. **Portable design meaning.** Frameworks, languages, rendering tools, input libraries and agent transports are replaceable as long as observable obligations and compatibility conditions are satisfied.
P10. **Inspectability and testability.** Both faces expose sufficient local evidence for agents/people to explain failures without leaking sensitive values.
P11. **Measured facts vs inferred diagnosis.** Never claim visibility, correctness, occlusion or aesthetics solely because an element exists or a screenshot rendered.
P12. **Time survival.** A cold-start agent must reconstruct a conformant realization from purpose and contracts when original code and dependencies are absent.

## 3. Precise instructions: canonical Forever Works, not just prose

Inspect the actual normative Forever Works v0.1 standard, schema files and examples from thanks-cohn/forever-works. Current Any-Shape has a preliminary forever/ model and docs/RECONSTRUCTION/ charter; audit them rather than assuming they're complete or valid.

Expand/create schema-valid canonical JSON records and stable relationships for:
- Intent: enduring why, actors, outcomes, priorities, non-goals, domains, and explicitly allowed representations.
- Capabilities: semantic model, content representation, multi-medium adaptation, human interaction, agent introspection, agent action, state synchronization, permission checking, structured forms, composition and navigation, graceful fallback, diagnostics, and interoperability.
- Invariants: stable identity and meaning, information preservation, consistent validation, human accessibility, safe agent operation, honest unsupported states, local privacy, resource resilience, recoverability, no vendor lock-in, preservation of established web behavior.
- Constraints: limited space, aspect ratio, font/locale, input modality, rendering capabilities, compute/memory/network, privacy/security, API compatibility.
- Dependencies: distinguish truly foundational platform semantics from replaceable implementation libraries and development tools. Explain selection, purpose, protected capabilities, classification, replacements, and migration proof.
- Implementations, decisions, compatibility, evidence and migrations, separating what exists today from what remains a proposal.
- Requirements/fixtures that allow entirely different implementation languages or engines to demonstrate behavioral equivalence.

Connect intent → capabilities → invariants/constraints → realizations → conformance tests → evidence. Track provenance correctly: technical ideas introduced by an agent remain agent-proposed/pending until accepted; user-provided mission is explicit but do not extrapolate that to inferred details. Preserve earlier test evidence as historical, not proof of future capabilities.

Run Forever Works CLI **validate** and **audit** on forever/ and capture exact outputs. Fix genuine failures against the existing schemas; never invent a parallel substitute model or call unexecuted checks passed.

## 4. Required extensive documentation for cold-start agents

Create or revise an organized `docs/IDENTITY/` and `docs/RECONSTRUCTION/` collection, cross-linked from README.md and AGENTS.md. At minimum:

1. **PROJECT_ESSENCE.md** — concise, technology-independent definition of what Any-Shape *is*, why it exists, whom it serves, what it refuses to become, what winning means.
2. **ONTOLOGY_AND_SEMANTICS.md** — model of logical surfaces, fields, actions, relationships, state, constraints, presentation modes, input/output, permissions; give concrete examples without assuming DOM.
3. **HUMAN_AND_AGENT_FACES.md** — two coordinated interfaces over one domain operation, authority and state; discovery, accessible presentation, explicit action schemas, error feedback, consent/security, and parity.
4. **TRANSFORMATION_AND_DEGRADATION.md** — changes in medium, size, aspect, browser or desktop windows, input, hardware resources, locale, zoom, offline conditions; decision principles, fallbacks, unacceptable information loss.
5. **AESTHETIC_AND_ACCESSIBILITY_INVARIANTS.md** — grouping, hierarchy, rhythm, proportionality, discoverability, readability, reachable controls, accessible names and modality alternatives; distinguish machine-checkable tests from visual review.
6. **CAPABILITY_AND_INVARIANT_MAP.md** — complete structured trace from mission through capability/invariant to implementation, test and evidence; list unsupported capabilities and confidence.
7. **MECHANISMS_VS_MEANING.md** — exactly which current CSS/JS/HTML methods and diagnostic APIs are *replaceable mechanisms* and which observable commitments survive them. Current browser implementation remains protected, not mistaken for universal identity.
8. **DEPENDENCY_AND_FAILURE_ATLAS.md** — dependency purposes, alternatives, simulated disappearance of build tools, renderers, runtime diagnostics and agents; recovery protocols.
9. **CROSS_MEDIUM_EXAMPLES.md** — at least four paired human-and-agent worked examples: forms, structured records/data, browser/desktop windows, 3D editor surfaces; browser overflow explicitly labeled one example, not the whole project.
10. **CONFORMANCE_AND_ACCEPTANCE.md** — language-neutral fixtures; positive and negative tests; cross-medium and resource limitations; authorized agent action semantics; evaluation of functional, semantic, accessible and aesthetic continuity independently.
11. **COLD_START_RECONSTRUCTION.md** — executable agent handbook for reconstructing without current source, frameworks or history: inputs, interpretation, architecture freedom, isolated build, validation, evidence, migration and undecidable questions.
12. **GLOSSARY_AND_DECISIONS.md** — stable vocabulary and owner decisions, with disputed assumptions and technical proposals clearly identified.
13. **NEXT_AGENT_HANDOFF.md** — exact current implementation status, unimplemented conceptual extensions, actual validation results, gaps and next actions.

Documents should be detailed enough to support a cold inheritor, but avoid duplicated descriptions and ambiguous normative language. Include examples of actual failure/expected outcome, not just adjectives. Mark MUST/SHOULD/MAY and observed/proposed/unknown states.

## 5. Verification: the actual victory condition

Build a **blind reconstruction protocol**. In the reconstruction lane, a different agent is given only neutral meaning documents, canonical Forever Works model and independent conformance fixtures. No existing src/, tests, screenshots, implementation details, git history or original implementation reports. A separate evaluator retains the old application for post-build comparison. State when isolation cannot be guaranteed.

Have that agent reconstruct a proof-of-concept in a different authoring language or architecture: e.g. Python, Go, Rust, C or C++ generating browser assets, or a distinct UI target with comparable semantic facilities. Do NOT treat generated HTML/CSS as disqualification of a different source language; distinguish language from browser output format.

Require three independent results:
- **Semantic understanding:** describe correctly the project's purpose, boundaries and obligations without reference to current code.
- **Semantic/functional reconstruction:** the new implementation demonstrably preserves essential information, human access, authorized machine operations, states and adaptability across test transformations.
- **Drop-in compatibility (separate):** preserve today's documented CSS class/ESM/schema entry points where required, or give an honest migration report.

Create strict pass/fail/unknown reports with environment, evidence and exact failure reproduction. No agent-written prose is evidence of running a test; no screenshot diff alone determines visual quality. Current Any-Shape v0.1 browser behavior and AS-001…AS-016 must continue to work and remain tested. Future cross-medium and dual-face capabilities must be labeled **proposed**, never falsely asserted as implemented.

Run a broken-dependency exercise and demonstrate recovery using the canonical model. Do not assert portability in literally every language; prove actual target languages and preserve the capability-neutral reconstruction recipe for others.

## 6. Implementation boundaries and output

This handoff chiefly requests foundational, extensive and accurate agent documentation plus Forever Works records and an evaluable reconstruction protocol. You MAY add independent conformance fixtures, schema validators or small proof code to make documentation executable, but do not silently rebuild the entire product or break v0.1 consumers. If full cross-medium/agent-action implementation is beyond this task, create explicit future phased Codex handoffs.

Update `AGENTS.md` and README's reading order to point to the canonical purpose and new documentation. Maintain Forever Works provenance, API/version governance and old evidence. Use coherent commits on main where permitted; do not self-merge PRs. End with a written completion report: files, schema validation/audit outputs, what is confirmed vs proposed, scope changes, tests actually run, all remaining unknowns, and a new agent's recommended first reading path.

**Final criterion:** A random new agent should be able to explain *what Any-Shape is*, *why it exists*, *which experiences and operations it must preserve*, *how its current mechanisms happen to work*, *what can be discarded and rebuilt*, and *how to prove a new implementation in another language or medium is truly Any-Shape* — without personal knowledge of its original authors.

Browser resize/overflow tests are illustrative. **Preservation of human and agent comprehension and operation across changing forms is the enduring mission.**
