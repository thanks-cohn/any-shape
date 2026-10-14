# Any-Shape — Long-Horizon Vision, Principles and Owner Intent

**Status:** Owner-directed intent, captured 2026-10-14. This document describes the mission and desired trajectory, **not a claim that all described technology exists or has been verified**.
**Read with:** [Engineering Blueprint](../ROADMAP/ANY_SHAPE_AGENT_TRANSFERENCE_BLUEPRINT.md), [Project Essence](PROJECT_ESSENCE.md), [Forever Works manifest](../../forever/manifest.json), [RFC-009](../PROPOSALS/THREE_FORM_TRANSFERENCE_LADDER_RFC_009.md), [RFC-010](../PROPOSALS/EVENT_EFFECT_CONTINUITY_RFC_010.md), and [RFC-011](../PROPOSALS/GENERALIZED_AGENT_TRANSFERENCE_API_RFC_011.md).

## The ambition in one paragraph

Any-Shape is intended to become a **minimal, elegant, agent-first interface-continuity layer for enduring software**, informed by and extending the philosophy of Forever Works. A user should eventually be able to provide an unfamiliar browser, Electron, JavaScript, TypeScript or other application as a repository or ZIP, supply Any-Shape's compact conventions/examples/API, and ask an agent to reconstruct an excellent, functional equivalent—initially in native Avalonia for Linux/Windows or Python/Qt—**without having to explain every control, interaction, endpoint, webhook, document output, state transition, visual relationship or platform quirk**. The software should remain understandable and maintainable after its authors, frameworks and reference machines disappear. In the long run it should detect drift and errors, attempt bounded repairs, rerun evidence, and sustain its own portability infrastructure as far as automation can responsibly take it.

> **The form may change. The identity must remain.**
>
> **A press here must cause the same authorized effect there.**
>
> **Preserve the obligation, not the incidental event-handler syntax.**
>
> **Teach the principle through a few complete examples; let the standard describe what the examples never anticipated.**

## What this is, and what it is not

This is **not** primarily a transpiler, CSS toolkit, screenshot copier, or huge catalog of conversion recipes. It is an attempt to preserve software's **purpose, semantics, causal behavior, visual orientation, effective operations, external consequences, dependencies, trust boundaries and verifiable continuity** independently of any one renderer or language. The existing browser-responsive library is a practical starting specialization, not the boundary of the project. Forms are inclusive, easy-to-understand demonstration applications; they do not define the project's ultimate scope.

This is also **not** a promise of mathematically lossless arbitrary-program conversion. Existing behavior may be hidden or unobservable; platform capabilities may not correspond; aesthetics need judgment; authorized effects can be unsafe to replay. Every transformation must declare PASS / FAIL / UNKNOWN / UNSUPPORTED and its evidence, rather than fabricate fidelity.

## Why Forever Works matters

Forever Works seeks software that an unfamiliar agent can inherit cold, comprehend, repair, modernize, evaluate, replace and hand onward. Any-Shape is conceived as its **graphical, interface-oriented, browser-ready and cross-renderer continuity specialization**—a possible contribution toward a broader standard for reconstructing user-facing software.

First use Forever Works-style abstractions to describe the original application independent of its source language. Capture the *reason the application exists*, domain identities and relationships, accepted workflows, effects and expected user experience. Then attach executable reference examples, language-specific adapters, diagnostics and independent evaluations. Do **not** invent a competing canonical Forever Works ontology; use the pinned spec and versioned namespaced extensions, with explicit provenance and review status. Any-Shape must remain independently understandable and must not become inseparable from a single historical release of Forever Works.

## Seven forms of continuity

1. **Semantic:** names, meaning, relationships, domain rules, user goals, stable identities.
2. **Causal:** control and non-control triggers, operation IDs, typed inputs, guards, authorization, transitions, errors, output.
3. **Effect:** actual persistence, files, document generation, rendering, URLs/endpoints, webhooks, queues, external services, notifications and unknown future effects, with delivery receipts and failure meaning.
4. **Interface and orientation:** visual hierarchy, typography, grouping, aesthetics, resizing, zoom, focus, keyboard/touch access, accessibility, task location and responsive behavior.
5. **Operational:** installation, dependencies, package versions, resource constraints, deployment, recoverability and platform adaptation.
6. **Trust:** secrets, permission boundaries, user consent, privacy, legitimate effects and avoiding agent privilege escalation.
7. **Evidence:** independently observed source baseline, neutral contracts, target checks, divergence diagnosis, repairs and honest status.

The list describes dimensions of an open model, not a closed catalog of possible applications. A new platform or effect must be describable through a versioned extension/adapter without bloating or breaking the core.

## Why professional appearance and resizing are foundational

A reconstructed UI that works only at the original screenshot dimensions is an unsuccessful reconstruction. Past attempts often fail at different window sizes, text scaling, DPI, long text, focus, scroll, changing panel geometry, and native toolkit differences. A form or desktop app should look deliberate, attractive, usable, and recognizably itself across reasonable windows—not distorted, cropped, microscopic or merely pixel-matched at one size.

Treat presentation as semantic obligations (landmarks, hierarchy, layout relations, design tokens and accessible interactions) plus *tested platform realization*. Browser CSS, Avalonia XAML and Qt layouts need not share code. They must sustain the same orientation and functionality. Human judgment may be required for visual quality; encode precisely where and why with a structured marker such as `needsHumanVerification: true`, a reason, a required review, and supporting diagnostics.

## A minimal, high-information teaching corpus

The owner prefers **a few exceptionally informative applications and repair cases** to thousands of shallow samples or a bloated dependency stack. The initial corpus is:

- **OpenForm Studio** — plain JavaScript, conventional approximately twenty-question form: editing, controls, response schemas, validation, publish and local/external effects.
- **OpenForm Flow** — plain JavaScript advanced no-code builder: matrices, rankings, branching, repeated sections, state transitions, multi-step navigation, destinations.
- **OpenForm Schema** — TypeScript-authored, compiled browser JavaScript: typed/structured data, repeatable estimates, calculations, drafts, review, multi-target effects.
- **Three independent native Python/Qt counterparts (intended)** — show cross-language reconstruction fidelity, not browser embedding.
- **A deeply worked browser/Electron → Avalonia native desktop case (intended)** — demonstrate one portable implementation across Windows and Linux, including live UI, window resizing, real wiring and platform checks.
- **An unfamiliar fourth-project challenge (intended)** — measure whether an agent generalizes the method rather than memorizes the forms.
- **Selected failure-and-repair cases (intended)** — high-value counterexamples that expose missing invariants, defective adapters and drift.

Additional JavaScript, TypeScript, Avalonia, C#, Python, C or C++ examples may be introduced **only when they teach a distinct general principle**. Index by capability, invariants, source/target stack, platform, evidence quality, and failure class so an agent can choose a relevant subset instead of consuming everything.

## Why Avalonia and Python

**Avalonia/C#/XAML** is a strategic desktop target: a shared application model and UI implementation can be validated on Linux and Windows, reducing duplication. Cross-platform does *not* mean zero runtime dependencies or automatic platform-perfect equivalence. .NET/Avalonia, fonts, windowing/display server, packaging, native integrations and platform effects still need pinned builds and independent checks.

**Python/Qt** is a separate target to prove the continuity contract genuinely survives a language/toolkit change. A WebView rendering the original site is not evidence of native reconstruction.

Neither Avalonia nor Python is the definition of Any-Shape. They are concrete, familiar, broadly accessible test environments and future reference precedents. Future agents should be able to target different platforms and languages through the same underlying model.

## Canonical familiarity principle

**Choose initial reference technologies and environments that are widely documented, broadly understood by humans and plausibly familiar to coding models, and make them fully reproducible.** Familiarity gives an agent an educational anchor, reducing ambiguity, without limiting where the software may later run.

For example, use **Ubuntu 24.04 LTS** and a precisely pinned **Windows 11** release as initial candidate environments; consider Windows 10 as a legacy compatibility case if justified. These are candidate baselines, **not an assertion that a specific AI model was trained on a specific OS**, nor a permanent technological mandate. Pin architecture, OS/build image, .NET, Avalonia, toolkit, fonts, display backend, scaling, tests and dependency checksums—not merely “Linux” or “Windows 11.”

Preserve *historical pins* so old evidence can be reproduced, and maintain *rolling verification* on newer platforms so the project survives obsolescence. An agent can select the appropriate baseline by capabilities and evidence. Old baselines remain documented; new ones do not silently rewrite history.

## The desired user and agent experience

The user gives an agent an application repository or ZIP, plus a reference to Any-Shape (or an accessible local copy). The agent:

1. Opens an obvious entrypoint; recognizes that Any-Shape teaches **how to interpret and reconstruct software**, not to copy screenshots.
2. Identifies source runtime, entrypoints, dependencies, GUI structure, domain operations, state and effects; runs safe diagnostics and source tests.
3. Models the application with Forever Works-derived, technology-neutral capabilities, invariants, stable IDs, contracts and provenance.
4. Retrieves only relevant canonical examples and platform adapters.
5. Selects and pins a target environment and plans the reconstruction, including **unknown** behavior and information loss.
6. Builds a working native application whose controls cause contract-equivalent effects.
7. Compares source and target via fixture traces, real permitted endpoints, persistence, platform/window-size checks, accessibility and visual review.
8. Identifies drift; attempts bounded repairs; reruns evidence; requests human verification when necessary.
9. Leaves durable contracts, reproducible tests, receipts, status and handoff guidance so the next agent can operate without conversation history.

The user should not have to dictate individual widget transformations or repeat every original endpoint requirement. Yet agent autonomy must never be mistaken for authority to execute unsafe live actions or invent hidden behavior.

## The self-sustaining horizon

The long-term aspiration is **continuous, increasingly automated software care**: detect behavioral, graphical, dependency, environment and API drift; localize a likely cause; design a bounded repair; test in isolation; compare against preserved acceptance criteria; promote only when evidence and permissions allow; document what changed; and repeat as toolchains evolve.

This is a *direction*, not present capability. A future unattended agent must be constrained by explicit permissions, rollback, provenance, independent evaluation and human verification for uncertainty or consequential operations. Self-repair without accountable verification can simply automate regressions.

## This development stage's priorities

1. **Agent-first, easy access:** clear API and repo entrypoints, human/agent-readable documentation, inspectable examples, simple local setup. Do not make authentication infrastructure the immediate focus.
2. **Beauty and professionalism:** clean, responsive form and desktop experiences across varied window sizes; published respondent forms contain **no editor/settings controls**.
3. **Real working wiring:** press/input/submit must produce expected state and real effects; local and remote routes, document generation and other consequences are verified, not hand-waved.
4. **Lean foundations:** minimal mandatory dependencies, standards and replaceable adapters; resist example sprawl and unrelated architecture.
5. **Proof before claims:** independently test the three original browser examples, especially webhooks, before undertaking equivalent Python/Avalonia reconstructions.
6. **Long-range extensibility:** designs should explain possible future worlds, but not claim to support them today.

Security, permissions and privacy remain safety requirements; deferring large authentication systems is not permission to ignore trust boundaries. **Do not mistake local `?edit=1` author routing for public authorization.**

## What is true at this handoff

The repository has three browser-form **source implementations** and a shared local/HTTPS destination adapter, plus extensive RFCs and canonical Forever Works records. Independent full browser/visual/effect conformance is still to be established. Three native Python/Qt equivalents and the flagship Avalonia/Electron transformation are **not yet delivered**; the general self-sustaining agent API is **not a finished universal product**. New readers should confirm current code and CI rather than accept any outdated status prose.

This document retains the owner's deep principles so they can be recovered if the original conversation is lost. It must be updated when owner intent changes, without rewriting proposed features into past accomplishments.

**North star: an unfamiliar agent can inherit software, understand what must endure, make it work in a new form, discover its errors, repair them, verify what it actually preserved, and hand it on.**

## Addendum — Presentational Continuity Is the First Visible Proof

**Owner clarification, 2026-10-14.** Any-Shape's original emphasis on overflow, responsive layout and professional presentation is not incidental styling work. It is the **smallest immediately observable demonstration of the entire enterprise**.

When someone resizes a browser window, the application's available geometry changes. Columns may stack, menus may move, controls may reflow, text may wrap, and spatial relationships may be expressed differently. Yet its **purpose, meaning, usable controls, orientation, visual hierarchy and aesthetic coherence should remain recognizable**. This is the foundational example of transformation without needless loss of identity.

> **The Principle of Presentational Continuity**
>
> An application shall retain its intelligibility, utility, orientation, and aesthetic coherence as the conditions of its presentation change.
>
> Its geometry may be rearranged, its components adapted, and its rendering mechanisms replaced, but these transformations must not needlessly diminish the user's ability to understand, trust, and operate it.
>
> **Presentational adaptation is the first visible proof of software continuity.**

An application that clips actions, overlaps labels, hides essential information, or looks chaotic at common window sizes forfeits user confidence. People cannot be expected to trust deeper functionality when the interface appears broken. A responsive implementation is thus both a usability obligation and a teaching instrument: it demonstrates that **relationships, roles and interactions matter more than arbitrary coordinates**. Good transference does not preserve pixel positions when those positions no longer make sense.

The first Any-Shape experience for students, professors, developers and unfamiliar agents should ideally be a **live, verifiable demonstration of one application at multiple window widths and scaling conditions**. The observer sees a polished, working interface in each form, then learns that the same reasoning generalizes:

**Responsive layout → Adaptive interface → Cross-renderer continuity → Cross-language reconstruction → Long-term software preservation.**

This progression is explanatory, not a claim that responsive CSS by itself solves language migration. The proof grows stronger at each stage only when behavior, state, output, effect wiring, accessibility and visual orientation are independently verified. For Avalonia and Python reconstruction, agents must carry forward the *obligation to adapt professionally*, not simply reproduce one source screenshot.

**Testing obligation:** evaluate narrow, intermediate, wide and maximized windows; font scaling/zoom, long labels, focus, keyboard operation, navigation, responsive hierarchy and absence of page-level overflow that makes ordinary tasks inaccessible. Record automated evidence, observed limitations and targeted human aesthetic-review requirements. The result must remain sensible and presentable even as its geometry changes.

This addendum establishes why overflow and window-size behavior are the starting point of Any-Shape's philosophy—not its ultimate limit.

## Addendum — Cold-Agent Reconstruction, Conventional Projects, and Mobile Reach

**Owner clarification, 2026-10-14.** The elegance of Any-Shape lies in the possibility that **one compact repository or installable continuity package can teach an unfamiliar AI agent how to understand, reconstruct, and verify an entirely unfamiliar application**. Give an agent an arbitrary repository and Any-Shape's meaning contracts, corpus index, API and working precedents; it should have a concrete, economical procedure for creating a professional, functioning application in another language or toolkit—without the user having to describe each window, button, integration and desired consequence.

The ambition is deliberately bigger than today's demonstrations. It is not yet a verified claim of automatic conversion of any app in record time. Any-Shape should measure the labor, elapsed time, token consumption, dependency costs, exceptions, human review and correctness of each conversion instead of inventing those outcomes. It should also remain an **ordinary package that a person can inspect and reuse**, not machinery locked into one agent, one SaaS, one training corpus or one proprietary format. The eventual distribution mechanism—npm, Python package, CLI, self-contained ZIP, language-neutral SDK or a combination—remains open until experiments show what adopters actually need. A package is a distribution vehicle; the portable contracts and observed evidence are the product's identity.

### Conventional native outputs, not captive artifacts

**Avalonia/C# desktop reconstructions must yield normal .NET projects**: a discoverable `.sln` or `.slnx` and `.csproj`, clear C# source, Avalonia `.axaml` views, documented dependencies, restore/build/run/test instructions, version pins and independent functional/visual evidence. Their outputs should be openable and maintainable in Microsoft Visual Studio or appropriate .NET IDEs, and buildable using the standard .NET CLI on supported target environments. VS tooling enhances XAML editing and preview but must not be required for the application to function.

This is an explicit *human inheritance* requirement: a developer must be able to open, comprehend, edit, compile, debug and maintain the application, including its integration adapters, without Any-Shape or the originating AI being present. Do not generate mysterious binaries, proprietary project wrappers or one-off agent-owned formats as the only deliverable. Portability includes **ordinary developer workflow continuity**, not merely runtime equivalence.

A common Avalonia source base can reduce duplicated effort between Windows and Linux, but independently test each pinned environment, native service adapter, fonts, scaling and package output. The project must never equate `dotnet build` succeeding with end-to-end behavioral parity or polished presentation.

### Phones are first-class future destinations

Any-Shape must **also support reconstruction into real Android and iOS phone applications**, with touch-first, small-screen, portrait/landscape, keyboard/IME, safe-area, accessibility, lifecycle, offline and operating-system permission behavior. These dimensions make phones an especially valuable continuation of the Principle of Presentational Continuity, not an unrelated product line.

**Candidate mobile reference stacks, not yet selected or implemented:**
- **React Native + Expo + TypeScript** — strong overlap with browser/JavaScript inputs; a common Android/iOS ecosystem and approachable project structure. Evaluate whether its conventions encourage clear native interaction/effect mappings rather than fragile web assumptions.
- **Flutter + Dart** — cohesive declarative UI and broad Android/iOS/desktop/web reach; useful as an independent target that tests whether the contracts survive a much different language/rendering model.
- **Avalonia mobile** — an additional .NET-aligned candidate worth evaluating where its supported platform capabilities and tooling meet the task; do not assume desktop parity automatically extends to phones.

Start with **one carefully verified, ordinary Android project** and one selected cross-platform mobile case (Android and iOS) rather than implementing every framework simultaneously. Keep the choice evidence-driven: agent familiarity and publicly documented examples, reproducibility, output editability, actual native functionality, dependency footprint, build availability and platform test coverage. Do not pin a framework permanently until a tested reference case establishes its usefulness.

Mobile reference environments must pin **Android SDK/API, emulator/device profile, build tools, Gradle/Java where relevant, app framework and architecture**. An iOS baseline additionally requires a supported Apple/Xcode/macOS build/signing environment for genuine iOS build and device/simulator evidence; a Linux-only CI runner cannot establish full iOS compatibility. Preserve historical pins, then retest against newer supported platforms.

### Unified source-to-destination promise

The same neutral project understanding should enable the agent to **choose an appropriate output target** among web, desktop and mobile, retrieving only the relevant verified examples and adapters:

```text
Unknown repository or ZIP
      + Any-Shape contracts / indexed compact examples
      -> discover intent, UI, operations, state, effects, constraints
      -> record Forever Works continuity and unknowns
      -> choose ordinary target project type + pinned environment
      -> reconstruct, run, inspect, exercise, compare, repair
      -> hand over editable sources, real builds and evidence
```

**The core abstraction is shared; platform-specific obligations are not erased.** A desktop hover state may become a mobile long-press or explicit affordance; local filesystem paths may become document providers or sandbox storage; responsive layout becomes safe-area and touch adaptation. Such changes must be intentional, documented and verified. A perfect visual screenshot that does not preserve legitimate outcomes is insufficient; so is a functioning app whose interface is inaccessible at an ordinary phone size.

**Acceptance ambition:** a cold agent is given a previously unfamiliar project plus a small Any-Shape release bundle. Without special undocumented prompts or prior project knowledge, it can identify the essential obligations, explain its decisions, construct a familiar IDE-editable application for a pinned desktop or mobile environment, demonstrate meaningful end-to-end operations, diagnose divergences, mark the uncertain parts for human verification, and leave a reproducible handoff.

The principle is modest in mechanism but large in consequence: **one enduring foundation should make many kinds of software easier to rebuild and preserve—without requiring every future user to teach an agent the same engineering lessons again.**
