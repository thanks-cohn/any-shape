# RFC-007 — Bidirectional Language Transference and Native-Language Expansion

**Status:** Proposed strategic sequence, not a shipped conversion engine  
**Date:** 2026-10-13  
**Authority:** User-established direction: demonstrate JavaScript → Python **and Python → JavaScript**, then prepare for **C and C++**. Implementation details and gates are proposed.
**Related:** [RFC-005](INTERFACE_PORTABILITY_RFC_005.md), [RFC-006](ADAPTIVE_TRANSFERENCE_RFC_006.md), [Continuity of Orientation](../FOUNDATION/CONTINUITY_OF_ORIENTATION.md), [Milestone roadmap](../ROADMAP/MILESTONES.md).

## Strategic statement

**Show the principles through an understandable, independently verified bidirectional JavaScript ↔ Python demonstration; build language-neutral foundations strong enough to support C and C++ next.**

Do not conflate a one-way rewrite with true independence from implementation language. A durable semantic and adaptation contract must be sufficient to create a new realization starting from **either** supported implementation direction. The canonical meaning is the center, not JavaScript or Python.

The first audience should be able to open the showcase, interact with both versions, resize both interfaces and see the same fields, Submit action, validation, API methods/paths, error behavior and logical state. The second audience—developers and cold agents—must be able to inspect the exact neutral contract and independent evidence.

## Flagship demonstrations

### Demonstration A — JavaScript → Python

An authorized owner submits or supplies a documented browser application. An agent inspects the visible interaction, approved source/API contracts and behavior, then builds a native Python desktop realization (PySide6/Qt is an initial reference). Both must expose equivalent programmatic operations. Layout techniques differ, yet heading hierarchy, grouping, legibility, progressive disclosure, focus and user orientation survive resizing.

A Python application that only embeds the original web page is an optional compatibility adapter, **not** proof of native transference.

### Demonstration B — Python → JavaScript

Begin independently from the **native Python application's accepted semantics and APIs**, not merely from a hidden copy of the JavaScript source. An unfamiliar authorized agent creates a standards-native HTML/CSS/JavaScript realization. Its forms must submit to equivalent operations with the same field values, validation, state transitions, error semantics and permissions. It must preserve analogous adaptive layout and orientation rules using native web standards.

The reverse demo must not be reduced to copying the original browser source back into place. Use provenance-controlled neutral inputs, evidence and independent tests. If testing both directions with exactly the same exemplar, acknowledge the danger of circular validation and also perform a fresh Python-first example or change-driven round trip.

### Stage C — C and C++ preparation

Design the semantic model, schemas, operation contracts, conformance fixtures and renderer/adaptor boundaries without JavaScript- or Python-specific assumptions. Then demonstrate **C++/Qt** as a practical compiled native desktop target, using native widgets and native adaptation rules. Include **C** as a separate target for bounded portable core/domain/API behavior; a GUI in C may need platform-specific libraries and is not automatically equivalent to C++/Qt.

C and C++ are separate language targets with distinct ownership, memory, error, build, runtime and interface constraints. Do not claim a single abstraction makes pointer lifetimes, ABI compatibility, platform UI facilities or memory safety disappear. For C, test stable C ABI surface and explicit ownership/error semantics when adopted. For C++, preserve domain parity while using native UI/layout infrastructure where justified.

## One enduring set of meanings

The canonical approved record graph and contracts describe:
- Logical fields, labels, required values, value types, normalization, validation, defaults, and errors.
- Buttons and actions, including the exact mapping from interaction → argument collection → permission/validation → domain transition → result.
- Public API method/path, schema, statuses, error semantics, identity/authorization, revision/concurrency and compatible client behavior.
- Logical state and persistence semantics, including explicit differences between draft/submitted/stored values.
- Presentation hierarchy, stable landmarks, adaptive disclosure, keyboard/focus/accessibility, and Continuity of Orientation.
- Unsupported features, external dependencies, portability constraints and proof obligations.

Adapters are language-specific; obligations are not. Require a developer API and self-describing read-only agent discovery surface to map to the same logical IDs and operations.

## Two-way verification, not superficial copying

1. **Independent origin:** Preserve the first app as an observed implementation, but use owner-reviewed neutral contracts as reconstruction input.
2. **Forward proof:** Build JS → Python and evaluate HTTP, state and actual input/control behavior independently.
3. **Reverse proof:** Build Python → JS from a separately controlled Python-first or contract-first origin, without retrieving hidden old source; evaluate the same dimensions.
4. **Round-trip consistency:** Compare accepted semantic identifiers, operations, state machines, adaptive obligations, and observable behavior between realizations. Differences in code, layout technology and native visual idioms are expected.
5. **Negative cases:** Invalid/missing input, keyboard submission, permissions, stale revisions, concurrent calls, network failure/retry and constrained-window behavior where included in the accepted contract.
6. **Scope reporting:** Separate semantic fidelity, HTTP/API drop-in compatibility, native GUI behavior, accessibility, human aesthetic review, cost and technical isolation. Missing evidence is UNKNOWN, not PASS.
7. **Handoff:** Export maintainable canonical Forever Works records, exact schema/fixtures and human-readable reconstruction recipes for every produced realization.

**Bidirectionality means equivalent functions can be re-realized in either direction; it does not mean every arbitrary program can be losslessly transpiled.** A browser-only feature, Windows native integration or complex C ABI may require alternative mechanisms or have declared unsupported scope.

## Suggested gates

| ID | Testable gate |
|---|---|
| LP-001 | JS browser and native Python app use one approved logical field/action/state/API contract. |
| LP-002 | Actual controls in both applications drive contract-equivalent API requests and domain effects, including negative cases. |
| LP-003 | Both layouts preserve accessible, recognizable orientation across changing window and container sizes, using appropriate native mechanisms. |
| LP-004 | A separate Python-first or contract-first example is reconstructed into JavaScript using only allowed neutral inputs. |
| LP-005 | Reverse implementation passes independently frozen functional/API and presentation-oriented tests, with explicit unsupported cases. |
| LP-006 | Round-trip comparison detects semantic divergence instead of relying on superficial matching or implementation copies. |
| LP-007 | No core language-neutral contract requires JavaScript runtime-specific objects or Python-specific types without a portable mapping. |
| LP-008 | C++/Qt target feasibility and C target ABI, memory ownership and error semantics are described and tested incrementally before full support is asserted. |
| LP-009 | Browser-only v0.1 functionality and adopters remain unbroken. |
| LP-010 | Cold agent can navigate the intent, adapters, examples and evidence without private conversation knowledge. |
| LP-011 | Real cost, language/toolchain dependencies and maintenance burden are measured and disclosed. |
| LP-012 | Each pass/fail/unknown verdict refers to independent evidence, not the creator's self-tests alone. |

## Recommended order

**1. Prove JavaScript → Python.** Preserve the browser's meaning, form operations, public API, accessible interaction and adaptive presentation in genuinely native Python widgets.

**2. Prove Python → JavaScript.** Make the reverse path equally visible; use a Python-first origin to demonstrate the browser is not the architecture's privileged source of truth.

**3. Run round-trip and changing-requirement trials.** Change an accepted field/action rule, regenerate/reconstruct independently in both languages and show shared conformance detects drift.

**4. Establish C++/Qt adapter and C core/ABI experiments.** Reuse neutral semantics and tests. Keep the heavy compiled toolchains optional to the lightweight JS/browser package.

**5. Grow from exemplar to general workflow.** Let an authorized agent intake an actual external project, create an owner-reviewed continuity pack, build a supported target and present an evidence-backed parity report. Scope complexity and unsupported cases honestly.

## Demo narrative for visitors

> **One application. Multiple languages. The same essential experience.**
>
> Watch a JavaScript browser form become a native Python window; watch a Python-origin application become a browser app. Resize them, fill the same fields and press Submit. The layout can change, but the information, accessible operations and public API commitments survive. C and C++ are the next targets.

Keep the showcase operable and visually compelling, with source/runtime indicators, side-by-side response traces, a simple fidelity matrix and honest unverified limits. Any-Shape demonstrates continuity through independent execution rather than marketing assertions.
