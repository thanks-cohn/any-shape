# Software Built to Endure
## Architectural vision and long-term design doctrine for Any-Shape

**Status:** Foundational vision and strategic direction; not a claim of completed capabilities  
**Date:** 2026-10-13  
**Applies to:** Any-Shape, its public APIs, project-continuity exports, and future adopters  
**Related standards:** [Forever Works](https://github.com/thanks-cohn/forever-works), in its actual canonical format and conformance model

> **Software should not die because the language that gave it form has died, nor because the hands that built it have gone. Its purpose should remain intelligible, its functions recoverable, and its future open to whoever—or whatever—comes next.**

## 1. Executive statement

Any-Shape aspires to become durable infrastructure for software interfaces and software projects—not by replacing existing languages, rendering engines, development environments, or agents, but by making those technologies replaceable means of fulfilling enduring requirements.

Its governing proposition is that **a project is more than its current source code**. Its enduring identity consists of purpose, meaning, essential capabilities, behavioral and design invariants, authorized operations, data relationships, compatibility obligations, and the evidence by which those obligations can be verified.

The project's current implementation is one realization of that identity, not its sole definition.

Forever Works provides the canonical, language-neutral continuity model: provenance-bearing intent, capabilities, invariants, constraints, dependencies, implementations, compatibility, decisions, migrations, and evidence. Any-Shape applies these principles to adaptive, human-presentable and agent-operable interfaces, while ultimately allowing applications created through Any-Shape to inherit the same continuity properties.

The result sought is software that can be understood, repaired, adapted, reimplemented, and verified by competent future humans and authorized agents, including those with no previous exposure to the original project.

## 2. Why this matters

Conventional maintenance frequently depends on a surviving combination of source code, dependencies, institutional knowledge, original developers, historical documents, and working toolchains. When any of these disappear, a future maintainer may struggle to determine what the program was *supposed* to do.

A conventional development sequence is often:

**Idea → implementation → application**

Any-Shape's proposed continuity-oriented sequence is:

**Accepted purpose → machine-readable obligations → implementation(s) → independent verification → updated continuity records**

The implementation is deliberately replaceable; the approved obligations remain discoverable.

This is not a promise that all software can be automatically or perfectly migrated, nor an assertion that code ceases to matter. Existing code is valuable evidence. The objective is to prevent any single implementation from becoming the only surviving specification.

## 3. Architectural responsibilities

### 3.1 Forever Works — preservation of meaning

The normative continuity layer describes:
- Why the project and its constituent modules exist.
- What essential capabilities and invariants must survive change.
- The inputs, outputs, state transitions, failure behavior, constraints, and compatibility obligations that define those capabilities.
- Why present dependencies and implementation choices were selected, and what alternatives can replace them.
- Which claims are explicit and owner-accepted versus inferred or agent-proposed.
- How repairs, replacements, or migrations are evaluated using independent evidence, including UNKNOWN outcomes.

The canonical standard remains independent of Any-Shape, any programming language, and any individual agent.

### 3.2 Any-Shape — preservation of useful presentation and operation

Any-Shape's target scope extends beyond browser responsive layout. It concerns the continued accessibility, comprehensibility, visual coherence, and functionality of information and operations as the presentation environment changes.

A semantic interface may be represented by a desktop window, web page, constrained panel, mobile view, accessible text interface, or other renderer. Reflow, browser overflow, clipping, and scaling are illustrative test cases—not the endpoint of the architecture.

The system should preserve, where feasible:
- Stable semantic identity for information, controls, relationships, and operations.
- Human-readable hierarchy, accessibility, usable interactions, and a deliberate aesthetic identity.
- Programmatic discoverability and authorized action through an agent-facing interface.
- Shared validation, permissions, and domain state between human and agent interaction.
- Graceful, explicitly reported degradation when a medium or resource constraint makes a capability unavailable.
- Inspectable and reproducible evidence of failures and transformations.

### 3.3 Two public APIs, one semantic foundation

**Developer SDK:** an imperative and declarative interface through which programmers author, inspect, validate, adapt, and render systems in supported languages and environments.

**Universal Agent API:** a self-describing interface through which a previously unfamiliar, suitably equipped and authorized agent can discover project intent, capabilities, surfaces, states, schemas, permissible actions, failure conditions, and verification methods. It must not rely on undocumented prompts, private memories, or vendor-specific knowledge.

Both APIs must express the same underlying semantic model, rules, permissions, and state. Distinct bindings or transports must not define contradictory domain behavior.

### 3.4 Project inheritance

A future Any-Shape project should be able to export a portable **Project Continuity Pack**: a canonical Forever Works model, understandable human documentation, module responsibilities, independently executable behavioral fixtures, compatibility obligations, verified evidence, dependency replacement guidance, and an agent-discoverable entrypoint.

The pack must preserve the difference between accepted intent, proposed interpretations, actual implementation, and tested outcomes.

## 4. Principles for long-term endurance

**P1 — Purpose outranks machinery.** Implementation languages, frameworks, rendering systems, agents, and developer tools may be replaced without changing the project's accepted identity.

**P2 — Meaning is explicit.** Purpose and module contracts must be inspectable without reverse-engineering the original codebase.

**P3 — Human and agent comprehension are equally important.** Machine-readable models must remain understandable to human maintainers; polished human experiences must remain safely operable through structured programmatic interfaces when authorized.

**P4 — Evidence outranks assertion.** Validation of a model is not verification of a program. A rebuilt application must demonstrate relevant semantic, functional, security, accessibility, and compatibility properties.

**P5 — Maintenance is a product capability.** Modules carry enough responsibility, dependency, migration, and test information to enable future repair and replacement.

**P6 — Complexity must justify its upkeep cost.** Favor open, standardized, readable, low-dependency and resource-conscious mechanisms. Report actual maintenance effort and runtime costs rather than assuming they are low.

**P7 — Continuity must survive tools and agents.** A handoff is incomplete if it depends on the original model provider, proprietary hosted service, chat history, or undocumented commands.

**P8 — Evolution is controlled, not forbidden.** Requirements may evolve through explicitly approved, versioned decisions. Endurance does not mean fossilizing obsolete product intent.

**P9 — Unknown is not success.** Missing evidence, unsupported platforms, infeasible migrations, and unresolved aesthetic judgment must be recorded honestly.

**P10 — Interoperability is more important than replacement.** Any-Shape should be able to complement existing UI frameworks, agent protocols, and development ecosystems; its continuity principles must not require domination of their implementation layers.

## 5. The long-horizon maintenance cycle

1. **Understand:** validate the canonical model, identify module purposes and current obligations.
2. **Plan:** assess requested changes, required permissions, dependency impacts, compatibility, and feasible target implementations.
3. **Implement:** repair, enhance, adapt, or independently reconstruct a conforming realization.
4. **Verify:** run neutral functional and semantic conformance, security and access tests, accessibility checks, and appropriate visual review.
5. **Reconcile:** update models, accepted decisions, dependencies, migrations, and evidence to describe actual observed behavior.
6. **Inherit:** provide readable, self-describing records allowing the next human or agent to repeat the cycle without personal handoff.

A meaningful implementation change should either preserve existing approved obligations or document the intentional, authorized revision. Documentation drift should be detectable rather than quietly tolerated.

## 6. The central demonstration

To test the vision rigorously:

1. Build an application with meaningful human presentation, agent operations, and several independently described modules.
2. Export its complete approved Project Continuity Pack.
3. In a controlled experiment, withhold original implementation code, private history, and the original development agent from a new maintainer.
4. Ask an unfamiliar agent—and separately a technically competent human—to explain the application's purpose, identify responsibilities, and recreate the essential behavior.
5. Where feasible, require an independently authored implementation in another language or environment.
6. Evaluate the reconstruction against implementation-neutral tests, with separately reported API compatibility, resource consumption, accessibility, security, and human-reviewed design fidelity.
7. Record failures, costs, unproven capabilities, and missing documentation; refine the standard and repeat.

Success is not that the agent writes plausible code. It is that the new implementation demonstrably preserves approved behavior without access to the original implementation. Results are specific to the test environments and supported languages; they must not be generalized into universal promises.

## 7. Strategy and competitive position

Existing adaptive UI systems, model-based tools, and agent UI protocols already solve important parts of this problem. Any-Shape's proposed differentiation is **integrating presentation adaptation and dual human/agent operation with purpose-driven project continuity and reconstruction evidence**.

It should seek practical interoperability with established systems rather than duplicating every mature renderer or toolkit. Competitive advantage must be proven by lower observed maintenance cost, independent cold-start understanding, repeatable reconstruction, and comparable quality of user-facing applications—not asserted from architectural ambition alone.

The defining commercial and public-interest proposition is reduced dependence on original authors and obsolete technology, provided that continuity artifacts remain accurate and inexpensive to maintain.

## 8. What the vision does not guarantee

- Perpetual operation or maintenance without human oversight.
- Correct migration into every programming language or operating environment.
- Automatic equivalence of screenshots, aesthetics, accessibility or performance.
- Infallible cold-agent reasoning, discovery without tool access, or actions without permission.
- Perfectly complete documentation for all future requirements.
- Zero upkeep cost.

**Infinite upkeep is an aspiration expressed through repeatable repair and migration tests, not a literal warranty.**

## 9. Current project status and implementation authority

At the time of this document, Any-Shape has a reported browser-focused v0.1 implementation with CSS primitives and optional diagnostics, alongside proposals for a universal semantic core, dual APIs, cross-medium behavior, continuity-pack generation, and cold cross-language rebuilding. The wider capabilities are not claimed as shipped.

Consult:
- [Milestone roadmap](../ROADMAP/MILESTONES.md).
- [Universal identity implementation handoff](../CODEX/CODEX_HANDOFF_002_UNIVERSAL_IDENTITY.md).
- [Dual API proposal](../PROPOSALS/DUAL_API_UNIVERSAL_AGENT_RFC_003.md).
- [Forever-maintainable projects proposal](../PROPOSALS/FOREVER_MAINTAINABLE_PROJECTS_RFC_004.md).
- [Reconstruction charter](../RECONSTRUCTION/AGENT_BOOTSTRAP.md).
- [Current API](../API/CURRENT_API_V0_1.md).
- [Original implementation evidence](../CODEX/IMPLEMENTATION_REPORT_001.md).

This strategic text does not replace or change the canonical Forever Works schema and must not, by itself, upgrade agent-proposed intent to accepted provenance. Conformance and owner-review processes remain authoritative.

## 10. Definition of success

Any-Shape approaches foundational infrastructure when unrelated developers and authorized agents can adopt it, use familiar implementation technologies, and produce applications whose purpose, user experience and essential operations remain understandable and verifiable across significant technical change.

**We do not merely build software to run. We build software whose meaning can endure—and whose implementation can be renewed.**
