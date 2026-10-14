# Any-Shape

### Preserve what software *means* when everything around it changes.

**An open research and engineering project for reconstructing software across languages, interfaces, platforms, and generations of tools—without losing its purpose, behavior, or human experience.**

> **The form may change. The identity must remain.**  
> **A press here should have the same authorized consequence there.**

Imagine giving an AI agent a browser application and saying: **“Rebuild this as a real native Python application. Keep it beautiful. Keep the inputs and validation. Make its buttons, state changes, generated data, API requests, and external integrations work the same way.”**

Today, doing that reliably requires more than translating JavaScript into Python. An agent must understand what the application *is*, why its controls exist, how effects propagate, what counts as the same behavior, what may legitimately differ on a new platform, and how to prove the result works.

**Any-Shape exists to make those obligations discoverable, transferable, testable, and eventually reusable across many kinds of software.**

This repository is a **working browser laboratory plus an evolving research specification**, not a claim that a general-purpose automatic software converter is already finished.

## Why this matters

Software regularly becomes difficult to preserve when a framework, device, dependency, language, platform, or original development team disappears. Interfaces may be copied while their essential interactions fail; generated applications may appear convincing but call the wrong endpoint, discard validation, change data shapes, or silently lose state.

Any-Shape proposes an alternative: **preserve the application's identity and observable obligations as first-class, inspectable knowledge**, then reconstruct the implementation with independent evidence.

For a **student**, it is a place to experiment with JavaScript, TypeScript, Python-oriented reconstruction contracts, native-interface design, schemas, responsive behavior, and reproducible testing.

For a **professor or researcher**, it offers an evolving set of controlled case studies about software evolution, cross-language equivalence, UI adaptation, program comprehension, AI-assisted migration, and the limits of automated reconstruction. The intended method distinguishes implementation, observation, inference, and verified equivalence.

For a **developer or agent builder**, it is a practical starting point for an application model in which control-to-effect wiring, validation, data shape, accessibility, appearance, error handling, and integrations can be discovered instead of reverse-engineered from disconnected screenshots.

For a **maintainer**, it is an experiment in software that can be inherited cold, repaired, modernized, and independently evaluated even when the original authors are unavailable.

## Try the three browser applications

All three are source-implemented and served by the repository's local development server. They are **progressively harder examples of the same preservation problem**, not limits on what Any-Shape may eventually support.

| Example | Source | What it teaches | Run it |
| --- | --- | --- | --- |
| **OpenForm Studio** | Plain JavaScript | A configurable **20-question** form: stable field identities, accessible controls, validation, editing, JSON/CSV exports, and submission effects | [Example](examples/openform/) |
| **OpenForm Flow** | Plain JavaScript | A more capable no-code form builder: matrices, ranking, ratings, conditional questions, repeatable groups, navigation, and publish state | [Example](examples/openform-flow/) |
| **OpenForm Schema** | TypeScript → browser JavaScript | Typed source, structured applications, repeatable estimate items, calculated totals, drafts, review, and configurable delivery destinations | [Example](examples/openform-schema/) |

### Run locally

**Requirements:** Node.js 22 or newer. No hosted font, account, or external frontend framework is required to use these browser demonstrations.

```sh
git clone https://github.com/thanks-cohn/any-shape.git
cd any-shape
npm ci
npm run build:openform-schema
npm run dev
```

The server listens at **http://127.0.0.1:4173**. Open:

- **Studio:** http://127.0.0.1:4173/examples/openform/?edit=1
- **Flow:** http://127.0.0.1:4173/examples/openform-flow/?edit=1
- **Schema:** http://127.0.0.1:4173/examples/openform-schema/?edit=1

The **`?edit=1`** URL is the authoring view, where you can configure and publish. After **Publish locally**, the ordinary URL without `?edit=1` is intended to show only the professional respondent interface: title, description, sections, questions, navigation, validation, and submission feedback. No editing toolbar or sidebar.

This is a **local development workflow**, not authenticated publishing or a hosted public form service. The author route is a convenience, not an access-control mechanism.

### Connect responses to destinations

The browser examples use a small shared [destination adapter](examples/shared/destinations.js) with an author-only **Connections** window. The first adapter set supports:

- Local browser response storage and export.
- Named HTTPS JSON POST destinations, including webhook receivers that accept direct browser requests.
- More than one enabled destination, optional/required delivery flags, and visible per-destination success or failure.
- An explicit synthetic test request to an endpoint you control.

**Caution:** Client-side JSON is visible to people receiving the form. Never place secret webhook tokens or private API keys in it. Cross-origin receivers must support CORS. HTTP acceptance does not prove downstream processing, and partial delivery may require deduplication before retry. Private integrations, reliable queues, signed webhooks, multi-user collection, and public hosting require additional server-side adapters.

See [RFC-012](docs/PROPOSALS/PORTABLE_DESTINATIONS_CONTRACT_RFC_012.md) and [RFC-013](docs/PROPOSALS/MULTI_DESTINATION_ADAPTER_REFERENCE_RFC_013.md).

## The experiment: can an agent transfer the *application*, not just the code?

The planned next step is to reconstruct **each of the three browser applications as a genuinely native Python/Qt application**—not a WebView displaying the original webpage.

The target must preserve accepted consequences:

| Continuity to demonstrate | What must survive |
| --- | --- |
| **Meaning** | Domain objects, intent, question identities, user goals |
| **Behavior** | Working buttons, editing, validation, navigation, conditional logic |
| **State** | Current step, inputs, drafts, persistence, transitions |
| **Effects** | File exports, saved records, generated results, actual HTTP calls, errors |
| **Presentation** | Readable, professional light/dark UI, accessibility, responsive orientation |
| **Trust** | Declared permissions, safe boundaries, honest unsupported states |
| **Evidence** | Independent tests, real effect traces, PASS / FAIL / UNKNOWN results |

For example, a browser's `submit` listener and a Qt button signal are different mechanisms. They can nevertheless represent the same logical action. **The source gesture, normalized operation, preconditions, state change, external effect, and observed outcome should be traceable end to end.**

The long-term goal is a **language- and renderer-neutral agent API** enabling an agent to discover an application, inspect its capabilities, model its operation/effect graph, plan a reconstruction, implement adapters, verify outcomes, and report deviations. This API is a **research and development target**, not a production-shipped universal converter.

The three forms are a **teaching ladder**, not a closed ontology. If the model generalizes, a future unknown fourth application—a different domain, platform, or interaction medium—should be describable and evaluated without hardcoding its peculiarities into the core.

## What is implemented, proposed, and still unverified?

| Area | Status |
| --- | --- |
| Browser CSS primitives, opt-in diagnostics, original responsive laboratory | **Implemented**; historical tests and reports documented |
| OpenForm Studio, Flow, and Schema browser source | **Implemented in source**; independent end-to-end verification still required |
| Shared browser destination settings and local/HTTPS adapter | **Implemented in source**; receiver and failure-mode coverage must be independently exercised |
| Three native Python/Qt equivalents | **Planned; not shipped** |
| General action/effect registry and agent-facing transference API | **Specified; not shipped as a universal API** |
| Arbitrary-project migration, high-fidelity automated conversion, cross-platform installers | **Long-term research goals** |

**Do not equate code existing with passing tests.** The browser examples have committed tests, but new scenarios, actual endpoint delivery, cross-browser layout, keyboard/a11y, and native parity require observed evidence. Some features (such as file attachment metadata and typed acknowledgments) deliberately do **not** constitute true file upload or verified digital signatures.

## Reproduce and challenge the results

```sh
# Verify the protected browser library, type definitions, and browser tests.
npm run check

# Validate the actual pinned Forever Works records and conventions.
npm run check:forever

# Check the reconstruction and continuity experiments.
node scripts/evaluate-reconstruction.mjs
npm run test:forever

# Run focused browser checks after installing Playwright browsers.
npx playwright install
npx playwright test tests/browser/openform.spec.js tests/browser/openform-flow.spec.js tests/browser/openform-schema.spec.js
npx playwright test tests/browser/published-form-surface.spec.js
```

If a test fails, retain its trace and fix or document the defect; never turn an unobserved behavior into a passing claim. See [the milestone roadmap](docs/ROADMAP/MILESTONES.md), [test/acceptance model](docs/RECONSTRUCTION/CONFORMANCE_AND_ACCEPTANCE.md), and the [existing evidence reports](docs/CODEX/).

A particularly important next experiment is an **independent local HTTP/webhook receiver** with controlled success, error, timeout, and partial-failure cases. The resulting verified contracts should be established **before** asking Codex to reproduce those effects in Python.

## Start here if you are an AI agent

**Read [AGENTS.md](AGENTS.md) first.** This repository intentionally records why the software exists, not merely how one implementation happens to work.

Suggested cold-start path:

1. [Project essence](docs/IDENTITY/PROJECT_ESSENCE.md) — why continuity matters.
2. [Ontology and semantics](docs/IDENTITY/ONTOLOGY_AND_SEMANTICS.md) — what is preserved.
3. [Human and agent faces](docs/IDENTITY/HUMAN_AND_AGENT_FACES.md) — who must be able to operate the system.
4. [Canonical Forever Works manifest](forever/manifest.json) — versioned entities, invariants, capabilities, implementations, provenance, and evidence.
5. [RFC-009: three-form transference ladder](docs/PROPOSALS/THREE_FORM_TRANSFERENCE_LADDER_RFC_009.md) — controlled examples and acceptance gates.
6. [RFC-010: event–effect continuity](docs/PROPOSALS/EVENT_EFFECT_CONTINUITY_RFC_010.md) — why a press here must mean the same thing there.
7. [RFC-011: generalized agent transference](docs/PROPOSALS/GENERALIZED_AGENT_TRANSFERENCE_API_RFC_011.md) — an open-ended model beyond forms.
8. [RFC-012 and RFC-013](docs/PROPOSALS/PORTABLE_DESTINATIONS_CONTRACT_RFC_012.md) — configurable side effects and delivery adapters.
9. [Reconstruction handbook](docs/RECONSTRUCTION/COLD_START_RECONSTRUCTION.md) — bounded blind-reconstruction methodology and evidence separation.

**Agent operating rule:** Inspect the actual current source and tests; identify accepted behavior separately from proposals; do not invent endpoints or credentials; preserve the protected 0.1 library; implement real vertical slices; independently verify; leave machine-readable and human-readable handoff evidence. Follow Forever Works provenance and status conventions.

## Research questions

- How can the intent and observable semantics of an application be represented independently of its original implementation?
- Which behaviors genuinely survive language and GUI-toolkit changes, and which require carefully documented adaptation?
- Can event/action/effect descriptions preserve causal wiring across JavaScript, TypeScript, Python, C#, C++, and future runtimes?
- How should an agent reason about unknown, partially observable, or privileged behavior without hallucinating equivalence?
- Can a small set of carefully instrumented examples teach an agent principles that generalize to an **unseen application**?
- How can interface quality and user orientation be evaluated alongside functional correctness?
- Can an application remain maintainable when its original developers, frameworks, and tooling no longer exist?

These are **testable research directions**, not claimed solved problems. Contributions that improve fixtures, independent evaluation, native reconstruction, accessibility, clarity of contracts, or extensibility are valuable.

## Architecture: small core, expandable horizons

Any-Shape's existing distributable core is a lightweight standards-first browser specialization: [`src/any-shape.css`](src/any-shape.css) and optional diagnostics. It is not coupled to the OpenForm examples.

The proposed broader architecture uses **small semantic contracts, explicit adapters, versioned schemas, portable evidence, and independently replaceable implementations**. It should be possible to add a new destination, language, device, runtime, or effect category without turning earlier examples into special cases—or forcing every adopter to install unnecessary dependencies.

The repository carries the [Forever Works](vendor/forever-works/) standard, schemas, and audit tooling as a pinned dependency with provenance. Follow the exact canonical record kinds and do not confuse proposed extensions with an already standardized production API.

**Possible future horizons:** native desktop and mobile interfaces, browser extensions and companions, CLI and server applications, document pipelines, distributed systems, embedded interfaces, AI-accessible tools, and environments we cannot yet predict.

## Project principles

1. **Purpose before syntax.** Preserve why software exists, not its incidental implementation.
2. **Consequences before screenshots.** A control is defined by what it legitimately accomplishes.
3. **People and agents both matter.** Accessibility, beauty, orientation, inspectability, and authorized operation are complementary.
4. **Minimal dependency, maximum replaceability.** External libraries are choices, not the identity.
5. **Unknown is not success.** Unsupported and unverified behavior must remain visible.
6. **Reconstruction requires evidence.** Build, exercise, compare, repair, and record.
7. **The standard must outgrow its examples.** Forms and Python are the beginning, not the boundary.

## License and participation

[MIT License](LICENSE). The best contribution is one that makes Any-Shape easier to **understand, test, extend, independently reconstruct, or challenge**. Begin with a runnable example, a documented invariant, a verified behavior, or an honest failure.

---

**Any-Shape — Preserve the meaning. Transfer the behavior. Rebuild the form.**

## Recover the full vision after a lost session

**Start with [Long-Horizon Vision](docs/IDENTITY/ANY_SHAPE_LONG_HORIZON_VISION.md) and [Agent Transference Blueprint](docs/ROADMAP/ANY_SHAPE_AGENT_TRANSFERENCE_BLUEPRINT.md).** These two durable handoff documents preserve the owner's intent and deep architectural decisions: Any-Shape as the agent-first graphical/interface continuity specialization of Forever Works; a compact, high-explanatory-power corpus; native Avalonia (Ubuntu 24.04/Windows 11 reference baselines) and Python proofs; operation/effect equivalence; professional responsive UI; historical pins and rolling verification; automated drift detection, bounded repair, human-verification markers, and the exact test-before-convert sequence. Both explicitly distinguish aspirations from current implementation.

## Verify actual endpoint/webhook wiring yourself

**[Hands-on webhook laboratory](docs/TESTING/WEBHOOK_LAB_HANDS_ON.md):** run `npm run dev` and, in another terminal, `npm run dev:webhook-lab`. Open **http://127.0.0.1:4174/** for a live request log. In the editor for **any of the three forms**, add a Connections destination pointing to `http://127.0.0.1:4174/receive/success`, publish, fill synthetic answers and submit. Confirm the independent receiver actually logged the POST and JSON response; then test `/receive/reject` and `/receive/error`. Run `npm run test:webhook-lab` for isolated receiver checks. This is the first concrete, manually observable source-effect baseline; browser/source-target parity is not implied by the existence of the lab.


## Flagship research challenge: one cold agent, an unfamiliar app

**The flagship is the reconstruction process, not a prebuilt cross-platform demo.** After verifying the existing forms and their actual effects, the project aims to give a cold agent (1) an independently developed, working Chrome extension it has never encountered and (2) a portable, application-neutral Any-Shape continuity package. Without project-specific target code or conversion recipes, the agent should discover the original program's obligations and produce normal, editable **Android** and **Avalonia Windows/Linux** projects, then independently test and diagnose their functionality and presentation. iOS follows with appropriate Apple build/test evidence. Store-submission readiness and actual store approval are distinct.

Success will be judged by real observed action/effect parity, responsive experience, reproducible build/test results, cost, human intervention, failure diagnostics and a second unseen-project challenge—not attractive screenshots or claims of universal conversion. **No target implementations are currently claimed.** The governing principle and anti-hardcoding protocol are preserved in [the long-horizon vision](docs/IDENTITY/ANY_SHAPE_LONG_HORIZON_VISION.md) and [cold-agent showcase acceptance gate](docs/ROADMAP/ANY_SHAPE_AGENT_TRANSFERENCE_BLUEPRINT.md).


## Export an independent website form

The three browser form editors now include **Export ready-to-upload website ZIP** and **Export website JSON**. The ZIP is a standard, vendor-neutral **respondent-only** static website with `index.html`, `style.css`, `app.js`, `form.json` and a deployment/CORS `README.md`. Extract and upload the files together to GitHub Pages or another ordinary static host; the exported frontend has **no editor, settings UI, Any-Shape branding or runtime dependency**. After export, the owner can modify fields and webhook URLs directly in **`form.json`** without using the studio again. The original editor's separate editable-JSON export remains available for restoring an editing session.

Only configured **HTTP JSON POST webhook** destinations are included in the public form definition, not local browser storage. The receiving server must accept requests and CORS from the live hosted origin. Hosting the static files alone **does not create a receiver**, guarantee delivery, secure private API tokens or prove support for every advanced field type; test before distributing publicly. Read [the website export and CORS guide](docs/TESTING/PORTABLE_WEBSITE_EXPORT.md). Run `npm run test:website-export` for portable output checks.


### Planned Cloudflare Pages golden deployment example

The intended **default deployment target** for a complete exported application is a normal GitHub project deployed to **Cloudflare Pages with `npx wrangler`**. The owner wants a respondent-only form and a **small Pages Function forwarding JSON submissions to permitted owner-selected webhooks**, with no mandatory D1/R2/database. **This server-side export is still proposed, not implemented or verified by the current static-only ZIP.** Read [the golden reference proposal](docs/PROPOSALS/CLOUDFLARE_PAGES_GOLDEN_EXPORT_REFERENCE.md) before adding hosting infrastructure; it calls for one reproducible, empirically verified example rather than many templates.


**Optional research examples:** The Cloudflare Pages golden reference also proposes two separately verified storage integrations—R2 JSON objects and D1 SQL rows—with a **stable individually retrievable JSON URL per submission**. The goal is to let independent future applications consume the same form data through a portable contract. Storage is optional; private/authenticated access is the default. These are documented goals, **not current export functionality**; see the [golden reference proposal](docs/PROPOSALS/CLOUDFLARE_PAGES_GOLDEN_EXPORT_REFERENCE.md).

## Future flagship: Keepsake verified transference research

The [Keepsake Cross-Platform Agent Economics research charter](docs/RESEARCH/KEEPSAKE_CROSS_PLATFORM_AGENT_ECONOMICS.md) preserves the intended next phase after verified form deployment: reconstruct the original Chrome extension into an Android application and a **shared C# / Avalonia desktop application** for Windows and Linux, with real independent per-platform acceptance tests. Its research measures agent runs, duplicated work, behavioral parity, human verification burden, and agent-led long-term release maintenance. This is a **future research target, not a completed multiplatform port**.
