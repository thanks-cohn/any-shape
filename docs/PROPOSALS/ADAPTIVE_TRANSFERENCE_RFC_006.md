# RFC-006 — Adaptive Transference and Agent-Driven Application Reconstruction

**Status:** Proposed product capability and flagship implementation brief; not shipped.
**Date:** 2026-10-13
**Owners/authority:** User's product vision is explicit. The technical mapping, architecture, examples, and acceptance strategy are proposals pending owner review.
**Related:** [RFC-005 Interface Portability](INTERFACE_PORTABILITY_RFC_005.md), [Continuity of Orientation](../FOUNDATION/CONTINUITY_OF_ORIENTATION.md), [Software Built to Endure](../VISION/SOFTWARE_BUILT_TO_ENDURE.md), [Milestones](../ROADMAP/MILESTONES.md), [Canonical Forever Works model](../../forever/manifest.json).

## 1. The product promise

> Give an authorized agent an existing browser application. Have it use Any-Shape to produce a native Python desktop realization of the same application—preserving its purpose, input-to-action semantics, public endpoints, permissions, accessible presentation, and responsive behavior—and independently test the equivalence.

This is **Any-Shape Transference**, not a claim to transpile arbitrary JavaScript to Python, nor a promise that a screenshot or bare URL reveals private server behavior.

The public demonstration must be understandable without understanding language runtimes, JSON schemas or UI frameworks. Show the source browser application, the native Python result, resize both, use the same controls in both, and display concrete equivalent requests, responses and state transitions.

## 2. The idea's defining distinction

**Transfer the obligation, not the machinery.**

In a web application, CSS Grid, Flexbox, container queries, semantic HTML and optional JavaScript can reorganize a form when its container narrows. In a Python desktop program, PySide6/Qt may instead use layout managers, sizing policies, resize logic, native form controls, disclosure widgets and accessibility APIs. These mechanisms are different; the intended observable outcomes are equivalent.

The design must preserve three independent but interacting continuities:

1. **Semantic:** The same logical objects, fields, values, validation, relationships and domain meaning.
2. **Functional:** The same operations and effects, including submit, edits, state transitions, errors and authorization.
3. **Orientational:** The person recognizes where they are, the headings and hierarchy, the primary action, and the route to condensed information as available space changes.

Visual identity should also remain recognizably coherent, while acknowledging that native widget metrics and platform conventions may differ. Pixel equality is neither necessary nor sufficient.

## 3. Realistic conversion workflow

1. **Intake:** Owner submits a source repository/project, local authorized build, or inspectable browser application. Collect approved scope, target platform, test accounts where appropriate, API definitions, source availability and consent to inspect. Do not assume a URL exposes hidden server implementation.
2. **Observe:** Agent uses ordinary browser inspection and, with access, repository/API inspection to inventory pages, controls, form fields, events, routes, validation, authorization, state transitions, responsive behavior, visual design intent and accessibility.
3. **Distinguish known versus inferred:** Record observed behavior, explicit owner intent, unknown internal logic, and proposed assumptions separately. Request owner acceptance for consequential ambiguities; do not invent functionality or security policy.
4. **Specify:** Produce language-neutral semantic operations, stable field/action IDs, versioned API and state contracts, presentation/orientation adaptation rules, and canonical Forever Works continuity records.
5. **Plan:** Map each requirement to a Python domain implementation and native Qt widget/layout mechanism. Record unsupported browser-specific features, external service dependencies and security constraints.
6. **Implement:** Generate or author a native PySide6/Qt application, Python domain layer, and same public API interface (or an explicitly equivalent local/remote adapter where the contract permits). Native widgets—not a WebView that just embeds the original site—are required for the principal proof.
7. **Verify:** A separate black-box evaluator exercises both implementations against shared independent fixtures: browser actions, native widget actions, outgoing HTTP requests, state changes, errors, permissions, accessibility, resize/reflow/orientation and recoverable content.
8. **Deliver:** Present two running interfaces, a plain-language equivalence report, executable test evidence, declared gaps, and a portable Forever Works continuity pack. The new Python realization must itself be maintainable and re-reconstructible.

The result must not be advertised as automatically equivalent if a required lane is FAIL or UNKNOWN.

## 4. Exact input, button and API parity

A **Submit** button is an action, not merely a visual rectangle. Its semantics include collecting the correct named fields, normalizing and validating their values, checking permission/consent, invoking the correct operation, and presenting the observed result.

For each logical field in both implementations, preserve:
- Stable semantic ID, label, accessible description, type, permitted values, empty/null/default semantics, normalization, validation and current state.
- Mapping from visual editing to the same domain draft state, then from submission to the same versioned operation schema.
- The same HTTP methods and endpoint paths when declared part of the public compatibility contract, including request and response structures, content type, authorization, status codes and error schema.
- Same revision, conflict, idempotency and retry semantics where specified.
- Same meaningful feedback, field-level error associations, focus behavior and state retention.

Clicking the browser's Submit and clicking the native Python/Qt Submit must invoke the equivalent domain operation. Keyboard submission and an authorized agent/API action must share the same rules and permissions. Neither visual path nor agent path may bypass validation.

**Important distinction:** HTML native form encoding and JSON requests are different transports. Declare a canonical operation model and explicit serialization mappings; do not claim network payloads are byte-for-byte identical unless they actually are. An external client should be able to switch equivalent JavaScript/Python API server base URLs without changing contract semantics or endpoints.

## 5. Presentation transfer: resize without disorientation

When the web view shrinks, the browser may stack previously parallel fields, retain recognizable headings, reduce decoration, and turn verbose secondary descriptions into readable previews with explicit expansion. The native Python window should adapt by equivalent principles using Qt's native mechanisms.

The rule is **not** “copy CSS breakpoints into Qt pixels.” Rather:

- Discover presentation constraints at the **component/container** level, not just outer-window dimensions.
- Keep readable font sizes and essential actions usable. Do not shrink body type indefinitely.
- Preserve section titles, grouped fields, navigation landmarks, active selection, entered-but-unsubmitted values and current task.
- Use recognized progressive-disclosure patterns for secondary detail, ensuring full text is accessible by click/touch/keyboard and available to authorized programmatic inspection. Hover is an optional convenience, never the sole access path.
- Keep layouts predictably oriented: use the least disruptive accessible transformation possible rather than rearranging content arbitrarily.
- Mark truly unsupported presentation features explicitly rather than silently erasing them.

A narrow Qt widget may use vertical layout and expandable detail buttons while the browser uses CSS container queries and native `<details>`. Different technique; equivalent understanding and user access.

## 6. One explainable flagship application

**Preferences Studio** provides:
- A stable page title, grouped sections (Account, Preferences, Security), explanatory content, display-name input, reading-density selector and Save action.
- Example public operations `GET /api/preferences` and `PATCH /api/preferences` with a formally fixed JSON schema, authorization rules and revision conflict behavior.
- A programmatic discovery surface so an agent can read the same logical field/action semantics regardless of implementation.
- A width control / resizable host for the web preview and a genuinely resizable Python desktop window.
- A **What stayed the same?** display comparing field values, operation IDs, transport requests, success and failure responses, and user-visible confirmations.
- Separate controls for testing long text, narrow views, keyboard paths, invalid input and denial of unauthorized changes.

The names and example endpoints here are illustrative until accepted and fixed in a shared contract. The independent evaluator must target the one actual adopted schema, not two superficially similar interfaces.

## 7. Demonstrations that count (and those that do not)

**Counts as evidence:** a native Python window containing actual Qt input controls; it resizes adaptively; a real Save action generates a contract-conformant request; an independent checker compares its normalized semantics and resulting state with the original web application.

**Does not count by itself:** rendering the original page in a Python WebView; screenshot replication; a mock Save control that changes a local label without invoking the API; matching endpoint strings without matching authorization/state/errors; a generated proof evaluated only by its own tests; claiming “all languages” from one Python sample.

An optional embedded-WebView adapter may be offered as a separate lower-cost compatibility path, but must not be confused with native transference.

## 8. Proposed acceptance gates

| ID | Verifiable criterion |
|---|---|
| AT-001 | Original browser app and independently authored native Python app execute the same approved semantic form/action contracts. |
| AT-002 | Actual browser input events and native Qt input events produce equivalent named values and operation arguments. |
| AT-003 | Submit activation, Enter/keyboard activation and authorized programmatic invocation converge on equivalent validated state transitions. |
| AT-004 | Public endpoint method/path, accepted schema, normalized response/error and authorization rules remain compatible. |
| AT-005 | Required invalid input, missing input, repeated submit, unauthorized action and revision-conflict cases match. |
| AT-006 | Each renderer preserves legible headings, recognizably grouped controls, reachable detail and primary actions at wide and constrained widths. |
| AT-007 | Resize preserves draft data, task context, selection and keyboard focus where practical; exceptions are reported. |
| AT-008 | Screen-reader and keyboard accessibility are reviewed against each platform's semantics; automated checks alone do not constitute full certification. |
| AT-009 | No required information is accessible exclusively by hover or silently hidden to make a layout fit. |
| AT-010 | An external black-box evaluator tests both implementations against one independent conformance contract and reports PASS/FAIL/UNKNOWN separately by lane. |
| AT-011 | A cold agent discovers the same fields/actions from documented, stable machine-readable discovery interfaces; access requires appropriate permissions. |
| AT-012 | Native Python implementation uses real native widgets, not merely a browser wrapper; a WebView path is labeled separately. |
| AT-013 | If a blind reconstruction is claimed, source/history/internals are technically inaccessible to the reconstruction agent, not just prohibited by prompt. |
| AT-014 | Missing source/API knowledge and unsupported semantics are prominently surfaced, not guessed and presented as equivalent. |
| AT-015 | Measured dependencies, startup/resource cost, portability limitations and reconstruction effort accompany success claims. |
| AT-016 | Both implementations have a maintainable, validated Forever Works continuity export with owner-reviewed intent and honest evidence provenance. |
| AT-017 | A human unfamiliar with the repository can operate both demos and understand what was preserved without reading code. |

## 9. Canonical contract example — illustrative, not an adopted schema

```json
{
  "id": "preferences.studio",
  "semanticAnchors": ["page-title", "section-headings", "field-order", "primary-action"],
  "fields": [
    {"id": "preferences.readingDensity", "type": "enum", "values": ["comfortable", "compact"]}
  ],
  "actions": [
    {"id": "preferences.save", "method": "PATCH", "path": "/api/preferences"}
  ],
  "presentationObligations": [
    "legible-at-supported-sizes",
    "recoverable-secondary-details",
    "preserve-orientation-and-draft-state"
  ]
}
```

This intentionally is **not** a competing Forever Works canonical record kind or a currently implemented Any-Shape protocol. Translate accepted contracts into actual canonical records and separate versioned interface schemas.

## 10. Architecture choices and permanence

- **Permanent:** purpose, approved domain behavior, field/action identities, external compatibility contracts, permissions, accessibility outcomes, orientational continuity, and independent conformance evidence.
- **Replaceable:** React or plain JS, server language, CSS breakpoints, Qt widget classes, framework adapters, browser/desktop renderer, test runner and agent provider.
- **Reference technologies:** Standards-native HTML/CSS/ECMAScript web output; PySide6/Qt as a practical native Python example. Native toolkit choice may later change without changing intended obligations.
- **Two APIs, one foundation:** developer SDK and cold-agent discoverability use one domain truth. The conversion agent itself is a consumer of these capabilities, not privileged to bypass them.

## 11. Phased implementation

**Phase A — Demonstrate equivalent manual realizations:** Build a fixed agreed contract and working JavaScript + native Python applications with independent API/form tests and responsive behavior.

**Phase B — Record the transference rules:** Produce portable semantic/presentation contracts, adaptation rules and Forever Works continuity records that describe why each renderer transforms as it does.

**Phase C — Agent-driven reconstruction:** Give an unfamiliar authorized agent the source application and approved tools, have it inspect and propose contracts, then generate the Python version, with human approval for uncertain behavior.

**Phase D — Enforced isolated and repeatable proof:** Separate reconstructing agents from old implementation/internal tests, run independently frozen functional, API and orientation probes, and compare costs, correctness and failure rates.

Phase A does not establish Phase C. A successful Phase C does not establish universal arbitrary-website conversion. The work remains a proposed capability until verified.

## 12. Codex handoff criteria

Build a visually compelling, understandable demo while retaining the existing v0.1 browser library. Do not merely scaffold. Use existing RFC-005 as the HTTP/form parity baseline, and this RFC for adaptive native transference. Provide installation/run instructions, stable API contracts, a native Qt implementation, reproducible evidence and explicit limits. If PySide6 cannot be installed in the environment, do not falsely claim native tests succeeded; retain verifiable source and report the blocker. Avoid adding Qt as a required dependency of the browser-only npm package. Prefer canonical Forever Works records in the existing format; do not silently promote proposed technical decisions to owner-approved intent.
