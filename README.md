# Any-Shape

**Preserve human and agent comprehension and operation across changing forms, media and resources.**

> The form may change. The identity must remain.

## Mission
Any-Shape enables information and operations to remain comprehensible, accessible, attractive where practical, and functionally available to humans and programmatic agents as medium, geometry, constraints, input methods and computational resources change. The form may change; meaning, essential functions and trustworthiness must remain.

Browser resizing/overflow is an implemented example, not the mission or permanent technological boundary. Logical fields, records, objects and authorized operations may have browser, desktop, text, agent or editor realizations; each must preserve meaning and declare unsupported scope. Human and programmatic actions must obey the same validation, authority and state transitions. The current browser library remains protected; broader capabilities are proposals or scoped reconstruction proofs, not production support claims.

**First intended adopter:** Pop-Quiz.ai. **Ownership:** standalone general-purpose library, never coupled to Pop-Quiz.ai. Other prospective adopters may use plain HTML/CSS/JS, TypeScript, or framework wrappers.

## Start here — reading order for humans and agents

Begin with [project essence](docs/IDENTITY/PROJECT_ESSENCE.md), [ontology](docs/IDENTITY/ONTOLOGY_AND_SEMANTICS.md), [human and agent faces](docs/IDENTITY/HUMAN_AND_AGENT_FACES.md), [transformation](docs/IDENTITY/TRANSFORMATION_AND_DEGRADATION.md), and [acceptance](docs/RECONSTRUCTION/CONFORMANCE_AND_ACCEPTANCE.md). The [next-agent handoff](docs/RECONSTRUCTION/NEXT_AGENT_HANDOFF.md) gives exact status and commands. Then inspect the [canonical model](forever/manifest.json), [capability map](docs/IDENTITY/CAPABILITY_AND_INVARIANT_MAP.md), [mechanisms](docs/IDENTITY/MECHANISMS_VS_MEANING.md) and [cold reconstruction handbook](docs/RECONSTRUCTION/COLD_START_RECONSTRUCTION.md).

For the protected browser specialization, retain this reading path:
1. [PURPOSE](docs/FOUNDATION/PURPOSE.md): why the project must exist, permanent promises, boundaries.
2. [CONTRACTS](docs/FOUNDATION/CONTRACTS.md): observable behavior and acceptance criteria.
3. [ARCHITECTURE](docs/ARCHITECTURE.md): replaceable technical choices, modules, stable seams.
4. [RECOVERY](docs/RECOVERY.md): rebuilding from purpose if dependencies or code disappear.
5. [PUBLIC API](docs/API/CURRENT_API_V0_1.md): implemented 0.1 classes, tokens, diagnostics and limitations.
6. [CODEX HANDOFF](docs/CODEX/CODEX_HANDOFF_001.md): implementation request, priorities, proof requirements.

## Foundational axioms
1. Identity survives transformation.
2. Content determines composition.
3. Relationships outrank coordinates.
4. Legibility and operability are non-negotiable.
5. Adaptation must be verifiable.
6. The browser's native layout is the primary engine; JavaScript is optional progressive enhancement.
7. Fail gracefully, never conceal essential content to fit an aesthetic.
8. Purpose and observable behavior outrank frameworks, dependencies, and specific source code.

## Scope
- Design tokens, fluid geometry and type, container-aware primitives, compositional components.
- Semantic HTML, keyboard and touch access, responsive images, localization robustness.
- Debug and agent-observable layout diagnostics with redaction-safe outputs.
- Automated matrix testing including screenshots, structural assertions, zoom/text stress, and accessibility.
- A live laboratory for demonstrating good and broken layouts.
- Recoverable documentation: invariants, usage, decision logs, replaceability and dependency inventory.

## Non-goals
- Claiming mathematical perfection at every width or arbitrary content size.
- Automatically judging beauty with a single score.
- Rebuilding React, CSS, DOM, or the browser's rendering pipeline.
- Requiring a hosted service, runtime analytics, accounts, or proprietary APIs.
- Omitting necessary controls or hiding real information just to avoid scrolling.

## Status

**Universal identity and preservation model:** owner-stated mission, canonical Forever Works records and extensive cold reconstruction documentation. [Handoff 002 evidence](docs/CODEX/IMPLEMENTATION_REPORT_002.md) records actual upstream validation/audit, a separate Python proof and independent evaluation. The proof is not a production universal engine; technical proposals remain unreviewed and strict blind isolation/manual aesthetics remain unknown.
**Core 0.1 implemented:** portable CSS primitives, container-aware cards, semantic navigation and form examples, and opt-in privacy-safe diagnostics. No runtime dependencies or build step. Package publication is not asserted. See [implementation evidence](docs/CODEX/IMPLEMENTATION_REPORT_001.md) for exact tests, engines, failed attempts and remaining manual checks.

## Develop and adopt

Model validation: `npm run check:forever`. Independent proof evaluation: `node scripts/evaluate-reconstruction.mjs`. The unmodified upstream standard/schemas/CLI are pinned and licensed in `vendor/forever-works/`; [dependency atlas](docs/RECONSTRUCTION/DEPENDENCY_AND_FAILURE_ATLAS.md) explains replacement proof. The full preservation corpus is in the source repository; the npm package remains the browser slice, not an assertion of universal agent support.

Requires Node >=22 (CI uses 24):

```sh
npm ci
npx playwright install --with-deps chromium firefox webkit
npm run check
npm run test:recovery
npm run test:package
npm run dev
```

The static laboratory is served on port 4173 at `/examples/`; `/examples/broken.html` contains intentional failures. The server binds to loopback and serves only consumer assets. Without any Node tooling, serve `examples/` and `src/` together with any static server. No account, remote assets or diagnostic module is required by the CSS layout.

On the Debian amd64 cloud host without root, use `npm run prepare:cloud` instead of `install --with-deps`, then use the browser-cache variables documented in [DEPENDENCIES](docs/DEPENDENCIES.md). Firefox needs an execution sandbox exception on this host; this is a host restriction, not an application failure.

Copy `src/any-shape.css` into an HTML project or import `@any-shape/core/css` from a locally installed tarball. Optional ESM diagnostics are exported from `@any-shape/core`; type declarations and a closed JSON Schema ship with the package. `npm run test:package` builds a tarball and tests it in an external consumer, without publishing it.

Tests produce JSON, screenshots and failure traces under ignored `artifacts/` and `test-results/`. Screenshots are review candidates; do not blindly approve them as goldens. Read the [dependency and recovery register](docs/DEPENDENCIES.md) for browser caches, system-library requirements and runner replacement. New agents should begin with [NEXT_AGENT](docs/CODEX/NEXT_AGENT.md), then the foundational reading order above.

## Agent entrypoint
Read `AGENTS.md` before editing. Implement against behavior contracts; keep docs synchronized with observed reality.

## Long-term architectural vision

Read [Software Built to Endure](docs/VISION/SOFTWARE_BUILT_TO_ENDURE.md) for Any-Shape's guiding approach to language-neutral continuity, dual human/agent interfaces, low-cost upkeep, and independently verifiable reconstruction. This is a **future-oriented architectural vision**, distinct from currently implemented v0.1 capabilities. The staged acceptance criteria live in the [milestone roadmap](docs/ROADMAP/MILESTONES.md).

## Flagship example under development — Any-Shape Transference

Our intended public showcase: submit an authorized browser application to an agent, reconstruct its essential behavior as a **native Python desktop interface**, and compare real inputs, Submit actions, HTTP endpoints, validation, state changes and accessible responsive adaptation across both versions. The guiding rule is **transfer the adaptation obligation, not the original CSS/JavaScript machinery**. See [RFC-005](docs/PROPOSALS/INTERFACE_PORTABILITY_RFC_005.md) for API/control parity and [RFC-006](docs/PROPOSALS/ADAPTIVE_TRANSFERENCE_RFC_006.md) for native presentation and agent-driven conversion. This is planned, not implemented.

## Bidirectional portability proof

The flagship language-independence goal is **JavaScript ↔ native Python, in both directions**: demonstrate real fields, Submit operations, API/endpoint compatibility, accessible adaptive layouts and preserved user orientation in both implementations. This should be an understandable visual showcase backed by independent functional tests, not a source-code transpilation trick. The neutral contracts also prepare for **C and C++** (including native C++/Qt UI), as separate future targets. Read [RFC-007](docs/PROPOSALS/LANGUAGE_PORTABILITY_STRATEGY_RFC_007.md). These directions are planned; a general automatic converter is not shipped.

## Cross-platform reference ladder

The proposed production-oriented examples progress from **JavaScript ↔ native Python** (bidirectional interface, adaptive presentation, Submit/input/API equivalence), to **Avalonia C# desktop apps for Windows and Linux**, a standards-compliant **Chrome extension/native companion** integration, and independently verified **C++/Qt plus bounded C/ABI** implementations. The intent is a small portable semantic core with independently installable renderers and adapters, so future agents can recover and extend the underlying principles rather than depend on one framework. See [RFC-008](docs/PROPOSALS/FOUNDATIONAL_CROSS_PLATFORM_SHOWCASES_RFC_008.md). Platform packaging, store approval and native security requirements are distinct and not claimed to be bypassed.

## First copyable reference app — OpenForm Studio (browser implemented)

A standalone, attractive, **15-question configurable HTML/CSS/JavaScript form** (comfortably supporting 10–20 questions), with working local answers/JSON/CSV export and optional API POST. Default appearance: **black text on white**; set `appearance.theme` in the simple JSON config to `dark` for **white text on black**, with a standard system font. Its independent native Python form will prove actual UI/input/API/adaptation parity. Full Codex implementation brief: [Handoff 004](docs/CODEX/CODEX_HANDOFF_004_OPENFORM_REFERENCE_AND_PYTHON_TRANSFERENCE.md). Browser source now implemented in `examples/openform/`; native Python and independent end-to-end parity remain future work.

## Working browser example — OpenForm Studio

[Launch through the local static server](examples/openform/) · [User and copy guide](examples/openform/README.md) · [Human/agent design and continuity guide](docs/EXAMPLES/OPENFORM_CONTINUITY.md)

The browser-side first reference is now source-implemented: a standalone, **20-question** configurable general intake form with radio circles, multiple-choice checkboxes, dropdowns, short/long text, date, URL, numeric and range inputs; right-click and visible accessible Edit controls; `+ Add question` and `+ Add section / embed`; JSON import/export; black-on-white and white-on-black themes driven by configuration; local-only Publish and response JSON/CSV export. Layout reflows from two columns to one at constrained widths, preserving readable section headings and controls. External embed sections use a strict HTTPS player allowlist and sandbox. `npm run dev`, then open `/examples/openform/`.

**Evidence boundary:** Source and configuration passed static parsing checks (20 questions). New browser tests are committed at `tests/browser/openform.spec.js`, but have not yet been executed in this work session; full cross-browser usability and manual aesthetic approval remain pending. No native Python OpenForm implementation or verified API-endpoint transference has yet been delivered. The canonical Forever Works records `capability.openform-reference`, `invariant.openform-orientation` and `implementation.openform-browser` preserve purpose, design identity and scoped implementation status.

## Second working browser reference — OpenForm Flow

[OpenForm Flow](examples/openform-flow/) is a separate, advanced, no-code form studio alongside [OpenForm Studio](examples/openform/). Its source implements diverse question types (including rating, ranking, matrix, scales, date/time, file-reference metadata and typed acknowledgment), conditional question visibility, repeatable sections, multi-step respondent navigation, plus-sign creation, edit/remove/reorder controls, theme configuration and **Publish locally** to activate local answer submission/export. No external frontend packages or hosted fonts are required. To run: `npm run dev` and open `/examples/openform-flow/`. See [user guide](examples/openform-flow/README.md) and [human/agent continuity guide](docs/EXAMPLES/OPENFORM_FLOW_CONTINUITY.md); `forever/manifest.json` indexes the source-implemented capability, invariant and implementation records. **Browser tests are committed but were not executed by this editing session; manual aesthetics and native Python equivalence are not yet proven.** Publishing is local-only, not public web hosting; file inputs do not upload bytes and typed signatures are not identity-verified.

## Next proof: three-form JavaScript/TypeScript → native Python ladder

[RFC-009](docs/PROPOSALS/THREE_FORM_TRANSFERENCE_LADDER_RFC_009.md) defines three escalating source applications and three separate **native Python/Qt** counterparts: (1) vanilla JS OpenForm Studio (standard intake), (2) vanilla JS OpenForm Flow (no-code authoring, branches, matrices and repeaters), (3) proposed TypeScript OpenForm Schema (typed schema-driven calculations, nested structured data, validation and endpoint contracts). The third form and all three native equivalents are **future implementation work**, not shipped. Its purpose is to teach cold agents transferable semantics, native UX reconstruction and independently testable API/data/state continuity while preserving the lightweight v0.1 library.

## The wiring must survive

[RFC-010 — Event–Effect Continuity](docs/PROPOSALS/EVENT_EFFECT_CONTINUITY_RFC_010.md) makes **a press here means the same thing there** a formal reconstruction requirement. The intended standard maps browser DOM gestures and native Python GUI signals to stable logical actions, typed arguments, guards, state transitions, declared and **observed** storage/HTTP/file effects and user-visible outcomes. An unfamiliar agent should be able to trace each control → action → effect → test fixture → Python counterpart without the original author's explanation. The API and three native implementations are **proposed future work**, not claimed shipped functionality.

## Plug-and-play response destinations (initial browser implementation)

The advanced [OpenForm Flow](examples/openform-flow/) now includes a **Destinations** settings dialog for local response saving, direct JSON POST to a configurable permitted HTTPS endpoint, or both, with an explicit test request and visible delivery status. Destination configuration travels in exported form JSON. These are public-browser-capable adapters, **not** private credential storage, guaranteed webhook delivery or public hosting. The architectural standard is [RFC-012](docs/PROPOSALS/PORTABLE_DESTINATIONS_CONTRACT_RFC_012.md), specifying future transport-neutral effects, security, receipts, idempotency, and language-specific adapters. Native Python and TypeScript reference counterparts remain to be built.

## Three forms: author settings versus published respondent experience

All three browser references now have source-implemented **author-only connections/settings** with a shared lightweight destination adapter and themed dialog. Authors can add up to 12 named local-storage or HTTPS JSON POST destinations, enable/disable/remove them, mark deliveries required or optional, and deliberately test an endpoint they control. Configurations export with the form JSON. **Publishing locally deliberately removes the header, toolbar, editing/connection controls, and sidebar**; the respondent sees only the title, description, question sections, navigation and feedback. For a draft or to change settings, explicitly open the author route with `?edit=1`; the plain URL is the clean form surface after publication. No credential manager, public hosting, guaranteed delivery or external webhook signing is claimed. Browser source paths: `/examples/openform/`, `/examples/openform-flow/`, and the new `/examples/openform-schema/` (TypeScript source with browser JavaScript output; run `npm run build:openform-schema` to regenerate). Existing browser CI and manual visual review must be run before a production quality claim.
