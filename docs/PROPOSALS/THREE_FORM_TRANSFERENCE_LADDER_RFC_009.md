# RFC-009 — Three-Form Transference Ladder (JavaScript, JavaScript, TypeScript → Native Python)

**Status:** Proposed implementation and experimental protocol. Existing browser sources are not independently verified here. **No native Python equivalents or third TypeScript source are claimed to exist yet.**
**Date:** 2026-10-13
**Relation:** OpenForm Studio, OpenForm Flow, RFC-005 through RFC-008, Continuity of Orientation, Forever Works canonical model.

## Purpose

Demonstrate to a previously unfamiliar human or agent *how to recognize an application's meaning, functionality, design commitments and programmatic contracts, and then re-realize them using a new language and GUI toolkit.* Deliver three intentionally escalating, genuinely useful source applications and **three separate native Python equivalents**, with independent evidence.

**A progression of proofs, not three showcases that happen to look alike.**

| Tier | Browser origin | Python candidate | Core claim tested |
|---|---|---|---|
| 1 | **OpenForm Studio**, vanilla JavaScript, 20-question generic intake | Native Python/Qt OpenForm Studio | Stable questions, validation, theme, sections, local records and optionally the same configured API semantics |
| 2 | **OpenForm Flow**, vanilla JavaScript, advanced no-code builder | Native Python/Qt OpenForm Flow | Stateful editing, conditionals, repeatable groups, ranking, matrices, preview/publish, UI orientation |
| 3 | **OpenForm Schema**, TypeScript plus minimal documented dependencies | Native Python/Qt OpenForm Schema | Typed, standardized schema-driven complex application behavior: calculated fields, cross-field rules, dynamic repeating data, deeply structured records, robust API contracts and sophisticated presentation |

Each source must be useful **on its own** for people who need forms. A reference demonstration may not be merely a pile of contrived benchmark fields.

## Third example: OpenForm Schema (TypeScript)

Create a polished **schema-driven assessment / application / quote/request form** suitable for grant and scholarship applications, service quotes, multi-party onboarding or research intake. It should be readily relabeled and reused by many kinds of organizations, without requiring users to write TypeScript. Provide a clear form-builder or editable configuration similar in spirit to the earlier examples, while keeping the programmatic types and schemas explicit and portable.

**Differentiation from Flow:** this one demonstrates the *structured logic layer* with deterministic calculated output, cross-field constraints, dynamic repeating data and verifiable request schemas. It should not just restyle the same form again.

### Standards and footprint

- Use TypeScript for authoring and type-checking, compiled to **ordinary distributable browser JavaScript**. Browsers and Chrome extensions do not directly execute TypeScript; the published bundle must run without a TS runtime.
- Prefer native semantic HTML controls, built-in form APIs, CSS Grid and container/media queries, Fetch, JSON, and URL APIs. Use standard **JSON Schema (choose an explicitly supported draft)** for portable validation and structured model contracts; annotate unsupported keywords instead of claiming arbitrary draft coverage.
- Use a minimal, pinned, license-reviewed dependency set. A TypeScript dev/build dependency is acceptable; heavyweight runtime UI frameworks should require evidence that benefits outweigh costs. Consider using an established JSON Schema validator (e.g. AJV) rather than implementing a new general schema engine, but measure and justify its bundle weight, maintainability, version and Python parity. Do not add packages reflexively.
- Produce human-editable JSON configuration and a versioned typed model. Make the definitions, actions and validators discoverable to independent agents.
- Never implement a custom expression evaluator with `eval`, `Function` or untrusted dynamic code. Calculations should use an explicit bounded, portable, typed operator vocabulary with reference implementations/test vectors in both TypeScript and Python.
- No remote hosted fonts, mandatory analytics, account, external UI CDN or paid service. Respect local-only and network mode boundaries.

### Valuable high-level field/interaction features

A contained, concrete set is better than dozens of broken widgets:
1. Schema-driven short/long text, formatted email/URL/phone, bounded number, money + currency, date/time, radio/select/multi-select and accessible consent.
2. **Nested repeatable groups** with stable logical object identifiers and typed array outputs.
3. **Calculated fields** (e.g. item subtotal, tax if explicitly configured, grand total) with immutable test fixtures, precision rules and visible breakdowns; avoid implicit tax rates.
4. **Cross-field rules** (e.g. start date before end date, total allocations cannot exceed capacity, conditional required-on-choice) with clear user error messages.
5. **Save draft / resume** locally, versioned migration and clear retention boundaries; downloadable JSON.
6. **Review-before-submit** page showing human-readable normalized answers.
7. **Explicit endpoint contract** for JSON POST with an optional small, local test receiver and mock fixtures; no fake public publishing or secret credentials in browser config.
8. **Polished adaptive layout** preserving landmarks and key actions in both black-on-white and white-on-black modes, without loss of draft or focus when resized.
9. Accessible file attachment *reference* or optional backend-enabled upload with honest handling; never pretend metadata is a file transfer.
10. Configurable author-facing question text and section order, with schema-valid safe import/export and clear extensions.

**Public acceptance:** A user changes title, questions, group constraints, theme and calculations through configuration; fills a complex request; sees derived values; resumes after reload; reviews; submits (local mode or configured test backend); and exports the exact data.

## Python transference acceptance for all three

An agent must construct genuinely native Python GUI programs (PySide6/Qt initially), not Chrome wrapped in WebView. Each is a distinct project/module with its own launch instructions, data model, native views and tests, while sharing narrow, documented contract/adaptor utilities only where justified.

For each:
- Preserve stable field, section, action and type IDs; transformations must not silently rename keys or normalize differently.
- Perform the same validations, workflow transitions, conditionals, typed values, calculations and persistence/revision handling.
- Where an HTTP backend exists, call the **same methods and paths**, send contract-equivalent request JSON and handle equivalent statuses, authorization boundaries and errors. **Local-only source applications have no external endpoint**; do not invent parity by making up one.
- Preserve aesthetics as *design intent*: professional system fonts, monochrome light/dark themes, hierarchy, dense but breathable form groups, accessible controls, error presentation and keyboard focus. Do not claim pixel equivalence with different native UI frameworks.
- Preserve continuity of orientation across actual Qt resizing, not just browser viewport reflow.
- Reproduce fallbacks/unsupported features explicitly. Native Qt cannot automatically support all browser embed/media or extension privileges.
- Produce a useful distributable native build where feasible with honest packaging, runtime dependencies and platform security caveats.

## Experimental protocol: what agents must be able to learn

**Before reconstruction:** preserve source app as a runnable useful project. Record owner-reviewed purpose, logical IDs, source-visible behavior, design tokens and interaction state machine, endpoint/API contracts, constraints and explicit unknowns in human-readable docs **and canonical Forever Works 0.1 records**. Pin/configure an independent observable fixture suite.

**Cold-agent handoff:** provide allowed neutral contracts and fixtures, not the original implementation source, screenshots, original tests or reconstruction instructions that merely encode the solution, for at least one genuine blind trial per stage. Record if isolation is only procedural. No arbitrary claim of general automatic source conversion.

**During reconstruction:** agent discovers, maps, plans, implements native controls, tests functional and HTTP behavior, visually compares, reports adaptation and deviations, repairs and documents tradeoffs.

**Independent evaluator:** compare the accepted input/output and HTTP traces, error handling, hidden/conditional values, persistence, accessibility/keyboard and responsive/orientational behavior. For each dimension show PASS / FAIL / UNKNOWN, including test coverage and environment. Source-generated self-tests alone are insufficient.

**Learning loop:** after each stage, record what the agent inferred correctly, where contract descriptions or APIs were insufficient, where tests missed defects, what changed in the generalizable spec, and where hand-coded specialization remains necessary. Feed improvements into the portable neutral contracts **without fitting a single example so tightly that future languages cannot use them**.

## Required artifacts

- The existing two browser source applications remain intact; treat their independent verification as first gate.
- A third `examples/openform-schema/` browser app written in TypeScript with checked-in source/config/compiled browser deliverables or repeatable build process. Any new compiler dependency must be optional for consumers of the existing core.
- `reconstruction/python-openform-studio/`, `python-openform-flow/`, `python-openform-schema/` (or equivalently explicit paths) with runnable native modules, README, build/install steps, stable schemas and implementation notes.
- Three **separate** test/result reports, a comparative capability/parity matrix, side-by-side light/dark screenshots and actual endpoint trace evidence where configured.
- Human-readable continuity docs and canonical Forever Works records referring to each source and each candidate implementation with traceable evidence and no invented PASS.
- One cohesive demo landing page that lets a newcomer immediately understand the progression, start each app, compare implementations and inspect precisely what is preserved versus approximated.
- Cost/performance/dependency measurements to ensure the general reusable foundation remains small.

## Release gates

T3-001: Existing JavaScript OpenForm Studio and Flow execute in Chromium/Firefox/WebKit (or explicitly scoped browsers), including keyboard and responsive checks.

T3-002: The TypeScript app builds cleanly, its compiled browser app runs without external runtime network dependencies, and its schema/validation/calculation rules have independent fixtures.

T3-003: All three origins independently useful, editable and locally publishable; only explicitly configured backend makes them remote-submission apps.

T3-004: Each native Python Qt counterpart really launches and uses native controls, with cross-language matching form IDs and answer types.

T3-005: Each native program passes supported neutral semantic, state, validation and API conformance fixtures, or reports exact scope failures.

T3-006: Both UI technologies retain readable responsive layout, recognizable grouping, reachable controls, light/dark theme intent and keyboard focus.

T3-007: Three reproducible reports separate observed visual judgments, verified domain/API tests, native packaging tests and unknowns.

T3-008: At least one unfamiliar agent can reconstruct an allowed slice without implementation access, and any imperfect isolation is documented.

T3-009: No breaking modifications to Any-Shape browser v0.1 or the two existing examples.

T3-010: The manifest and documentation permit a subsequent agent to inspect, understand, debug, replace and extend the architecture without relying on conversation history.

## Governing principle

> **The three examples should teach the spirit through progressively harder evidence: neither a browser toolkit nor Python is the application. Its purpose, human experience, verified operations and external contracts are what survive the transfer.**

## Required wiring equivalence

The fundamental standard for all three forms is [RFC-010 — Event–Effect Continuity](EVENT_EFFECT_CONTINUITY_RFC_010.md). **The same press must produce the same authorized consequences**, not only resemble the same screen: the source DOM event and Python/Qt signal bind to one stable action ID, typed arguments, guarded state transitions, declared side-effect intents, observed storage/HTTP/file outcomes and matching user-visible errors. Include a navigable mapping and independent action/effect fixtures for each migrated control. This is a proposed contract and test target, not an already implemented native event-transfer API.
