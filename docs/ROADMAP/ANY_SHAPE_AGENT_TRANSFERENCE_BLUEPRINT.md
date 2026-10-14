# Any-Shape — Agent Transference Blueprint and Session-Recovery Handoff

**Status:** Proposed technical program, written 2026-10-14 from the owner's stated long-term intent. Do not confuse this blueprint with implemented or independently validated functionality.
**First read:** [Long-Horizon Vision](../IDENTITY/ANY_SHAPE_LONG_HORIZON_VISION.md). Also read repository `AGENTS.md`, `README.md`, [Forever Works manifest](../../forever/manifest.json), RFC-009 through RFC-013, and the actual source/tests before making changes.

## Mission for the next unfamiliar agent

Any-Shape is intended to become a **small, universal, agent-accessible continuity infrastructure** that allows unfamiliar software to be understood, abstracted, reconstructed, verified, and maintained across languages and graphical environments. Treat the three browser forms as a compact explanatory corpus, not as the definition of supported program types. The first profound cross-platform proof should be a faithful native **Avalonia/C# application working on pinned Ubuntu and Windows reference environments**, supported by independent **Python/Qt** experiments.

User priorities: **fast agent comprehension and easy local adoption**, highly professional responsive aesthetics, working controls and effect wiring, reproducible tests, minimal mandatory dependencies, and a future automated drift/repair loop. Avoid unrelated enterprise account infrastructure at this stage, without weakening trust boundaries or misrepresenting public deployment.

## Architecture in one page

```text
Unknown repo or ZIP
    |
    v
Source reconnaissance and safe execution
    | runtime, code, UI, dependencies, capabilities, effects
    v
Forever Works semantic abstraction (+ versioned Any-Shape interface extensions)
    | intent, stable IDs, domain types, state machine, operation/effect graph
    | external contracts, presentation/orientation, permissions, unknowns
    v
Portable evidence and representative fixtures
    | actual DOM/native actions, observations, API/file/local results
    v
Capability-based example retrieval and target-environment selection
    | JS basics, JS complex UI, TS typed effects, Avalonia, Python,
    | selected observed failure cases
    v
Native reconstruction with replaceable language/UI/effect adapters
    | Qt/Python, Avalonia/C#/XAML, future platforms
    v
Independent conformance and adaptive UI diagnostics
    | semantic behavior; actual effects; accessibility; varying windows;
    | scaling, themes, errors, dependencies, packaging
    v
Drift detection -> bounded repair -> rerun -> evidence -> human gate if needed
    |
    v
Cold-agent handoff (contracts, state, provenance, test traces, unknowns)
```

## Small shared standard, not a monolithic engine

The **core** should define application identity/capability contracts; stable action IDs; typed inputs and outputs; lifecycle and state transitions; effect intents and observed receipts; authority and secrets constraints; presentation obligations; adapter descriptors; version migrations; diagnostic/evidence records; and discovery endpoints for agents. Prefer JSON Schema or other explicit, portable standard formats where suitable; validate the precise supported version/draft.

The **optional adapters** supply execution: browser DOM binding, Qt signals, Avalonia commands and XAML, HTTP/network, local storage, file/document generation, databases, queue/webhook/event buses, graphics/media, platform-specific capabilities and future unknown effect types. No adapter should redefine business semantics or silently suppress unsupported effects. Expose namespaced, versioned extension descriptors with capability matching and a minimal dependency budget.

The **agent-facing entrypoint** should eventually allow discover -> inspect -> plan -> dry-run -> authorized apply -> observe -> verify -> diagnose -> repair -> handoff; it must be possible to run entirely locally and with synthetic fixtures. This sequence and API are proposed design targets, not existing general-purpose public SDK calls. Human and agent operations go through the same guards and permissions.

### Canonical operation-to-effect chain

```text
meaningful trigger (click/keyboard/timer/webhook/agent)
  -> source-specific binding
  -> logical operation ID + typed arguments + initiator
  -> preconditions/authorization/validation/revisions
  -> deterministic state transition
  -> ordered/dependent effect obligations
  -> target-specific effect adapters
  -> observed receipts, responses, failures, partial outcomes
  -> user-visible feedback and resulting state
  -> independent replayable parity evidence
```

Preserve *what the action causes*, not syntactic similarity of handlers. For network effects, verify actual method/path, destination identity, payload schema, relevant headers, errors, receipts, retry/idempotency policy and authorization. Include document creation, filesystem operations and other effect types as needed; never let current webhook/form examples become the closed universe of supported operations.

## Reference-environment strategy: familiarity as a teaching instrument

**Initial candidate baselines:** Ubuntu **24.04 LTS** and a specifically pinned Windows **11** edition/build, targeting Avalonia C#/XAML; Windows 10 is an optional legacy case if evidence and support requirements justify it. These are proposed choices, not verified builds and not fixed requirements for all adopters.

Rationale: intentionally pick widely used, extensively documented environments familiar to many developers and plausibly to coding agents; do **not** claim precise training coverage for an unknown model. They provide agents with an understandable *reference*, a known toolchain, and a reproducible demonstration.

For every baseline, record machine/VM/container image and checksums where possible, OS version/build, CPU architecture, .NET SDK/runtime, Avalonia packages, Linux display backend (X11/Wayland), font availability, display scaling/DPI, packaging method, locale and input methods, window-manager factors, expected network/service fixtures, and exact commands to reproduce the test.

**Two simultaneous timelines:** pin a *historical reference* to reproduce old evidence; maintain a *rolling verification target* for current systems. New platform evidence can be promoted without erasing prior records. A pinned environment is an educational anchor, not the definition of the semantic standard.

## Corpus policy: minimal breadth, maximal depth

Start with these **three actual browser source examples**:
1. `examples/openform/` — plain JavaScript **Studio**: ordinary form, field identities, validation, submit, appearance, local/external delivery.
2. `examples/openform-flow/` — plain JavaScript **Flow**: no-code authoring, advanced field types, conditional questions, repeatable groups, navigation and connections.
3. `examples/openform-schema/` — TypeScript-authored **Schema**: typed source, compiled JS, structured estimates, calculations, review, drafts and destinations.

Then create **three separate, truly native Python/Qt reconstructions**, using approved source-neutral fixtures. Do not count a WebView as a native GUI result. Build a single especially thorough **browser/Electron -> Avalonia** reconstruction, and later an **unfamiliar fourth project** in a different domain to test generalization. Add carefully selected failures/repairs and examples from further languages only when they teach new principles.

Each corpus item needs discoverable metadata: capabilities, source/target, tested platform, semantic invariants, action/effect graph, source fixtures, verified output, known limitations, provenance and confidence, requirements/dependency costs, evidence timestamp, and specific failure/repair patterns. Retrieval should pick a small relevant subset for a new target task.

## Mandatory staged gates and order of execution

### Gate A — Verify original browser implementations

Run the three forms in actual browsers and inspect narrow, medium, wide, maximized and resized views; light/dark, zoom, text length, keyboard, focus and any accessible navigation. Confirm **published respondent page contains only title, description, questions/sections, navigation and submit feedback**, not Connections, editor panels, edit toggles or management controls. Confirm the author page still works and is not misrepresented as authenticated.

Run existing Playwright and unit checks, repair defects, and preserve failures/traces. **Do not claim a passing build from code parsing.**

### Gate B — Test real local/HTTP effects before conversion

Build an independent local HTTP/webhook receiver with controlled responses: accepted, 400/401/403 validation/auth rejection, 429 rate limiting, 500/503 failures, timeouts, network unavailable and malformed reply where relevant. Capture actual request method/path/headers/body and delivery order. Test all intended connection modes, multiple destinations, partial successes, local persistence/export, and safe synthetic test messages. Protect test data and do not invoke real third-party services without authorization.

Identify defects that cannot be reliably repaired with simple retries. For example, a successful local write followed by remote failure may duplicate the saved record on resubmit. **Production-quality delivery requires idempotency and durable receipts/outbox where applicable**, not just reassuring UI text. Clearly distinguish request sent, response accepted, and downstream effect completed.

Freeze only **verified** source behavior into neutral fixtures, document intended behavior that differs, and report UNKNOWN for unobservable integrations.

### Gate C — Implement the minimal neutral action/effect model

Build an actual, bounded, versioned action/effect registry and schema tied to the pinned Forever Works model—not a duplicate sprawling ontology. Expose a simple discoverable CLI or JSON inspection path for agents. Complete one vertical slice end-to-end from source action to verified effect receipt. Record human-friendly meaning, machine-readable contract, adapter binding, observation and test fixture; keep the schema extensible and the browser dependency footprint minimal.

### Gate D — Reconstruct in native Python

For each form, build working Qt controls, portable domain logic, responsive layouts, theme presentation, validation, state, and destination effects. Replay the same neutral fixtures independently on source and target. Record each accepted difference, PASS/FAIL/UNKNOWN and environment. Do not simply rewrite DOM events into Python syntax; produce the same authorized logical consequences.

### Gate E — Demonstrate Avalonia desktop portability

Choose a bounded but authentic browser/Electron source interface (not a contrived static mock). Produce Avalonia/C#/XAML controls with shared application/domain logic, native windows, keyboard interaction, panels and actual adapters. Test on pinned Ubuntu 24.04 LTS and Windows 11 environments, including real resizing and scaled fonts/displays. Compare both against the verified source. Report any toolkit/platform differences. Keep .NET/Avalonia dependencies in the optional target adapter; the semantic standard itself should not require them.

### Gate F — Detect and repair drift

Define drift classes: behavior, state/data schema, endpoint/effect, UI hierarchy/orientation, accessibility, performance/resource, toolchain/dependency, operating-system/platform, trust/permissions and packaging. Capture changes to known inputs/contracts/environments. Identify failing invariants, likely source/target locations, severity, repair boundaries and rollback path. Attempt low-risk local repair, rerun independent evidence, and only promote verified fixes.

### Gate G — Test genuine generalization

Give a cold agent a previously unseen fourth project and the **neutral standard, API, corpus index and relevant example fixtures**, not the solution's source mapping. Measure whether it can discover the novel application's obligations and produce an acceptable reconstruction. Record isolation limitations. Repair the *standard* when possible rather than accumulating a one-off special-case rule for every project.

## Human verification as a first-class, scoped result

Introduce a proposed evidence marker:
```json
{
  "needsHumanVerification": true,
  "reasonCodes": ["AESTHETIC_REVIEW", "UNOBSERVED_NATIVE_BEHAVIOR"],
  "reviewInstructions": "Compare hierarchy, typography, focus and task orientation at the prescribed window sizes.",
  "automatedEvidenceRefs": ["test-run-or-trace-id"],
  "verificationStatus": "UNKNOWN",
  "targetEnvironmentRef": "reference-ubuntu-24.04"
}
```

This is **illustrative schema, not an implemented record**. A human check is a targeted evaluation task, not a generic obstacle or rubber stamp. Even if automation becomes very strong, unknown or impactful effects must not be silently certified.

## Diagnostics and self-maintenance

Instrumentation should give an agent enough context to answer *what broke and why*, rather than a binary "test failed." Capture operation ID, component/source binding, expected transition/effect, actual sanitized trace, environment fingerprint, request/response or storage receipt, UI tree/accessibility snapshot, geometry and visual-difference references, exception provenance, repro steps and dependency version. Redact secrets and live private submission answers by default.

Verification should be **automatable, composable, fast enough to rerun, and repeatable**; historical fixture results should be append-only or otherwise auditable. Detection/repair should use bounded privileges and self-checks. Do not create hidden background autonomy or conflate a code change with tested recovery.

## Bloat budget and dependency design

- Protect existing standalone browser CSS/diagnostics v0.1 and the three examples from needless rewrites.
- Use standard HTML/CSS/JS and TypeScript compilation as a development tool, not a browser runtime requirement.
- Treat Qt and Avalonia as optional demonstration/target adapters; do not force them on browser consumers.
- Make the semantic core compact and versioned; modularize effects and platform bindings.
- Prefer **three deep, maintained examples + an indexed set of failure cases** to a large shallow catalog.
- A new library/dependency needs a documented reason, scope, license, pin, failure/replacement path, and measurable benefit.
- Keep human documentation concise at the entrypoint; link to deep spec/evidence instead of dumping it into every prompt.

## Evidence reporting

For each operation or reconstruction, record:
- **Origin:** application, version/commit, fixture and observed source behavior.
- **Target:** language/UI stack, operating-system reference and dependency pin.
- **Continuity dimensions:** semantics, transitions, output, effect, visual hierarchy, keyboard, resize and platform delivery.
- **Truth:** implementation status separately from test status; independently observed PASS/FAIL/UNKNOWN/UNSUPPORTED.
- **Reproduction:** exact commands and synthetic data; sanitized logs, screenshots and traces.
- **Deviation:** known information loss, failures, human-review flags, repair attempts, accept/reject decision.

Do not claim the standard is established by merely writing RFCs. The proof is that an unfamiliar agent can execute it and succeed independently.

## Immediate next Codex run — precise brief

1. Inspect and preserve the current repository; consult `AGENTS.md`, README, this blueprint and the long-horizon vision.
2. Run all three browser apps, repair real workflow and responsive/aesthetic defects, and test author-only Connections versus completely clean published respondent views.
3. Establish a safe local webhook/HTTP receiver and exercise success, rejection, partial failure, retries and delivery evidence; repair misleading or broken behavior.
4. Verify TypeScript build from source rather than relying on manually checked-in runtime output. Inspect automated tests for outdated selectors and fix failures.
5. Produce a credible, versioned original-app action/effect baseline with neutral fixtures for all three references, indexed for future agents.
6. Link new source facts to human docs and valid Forever Works records with review/provenance/evidence. Document what remains UNKNOWN.
7. **Only after this baseline**, start one real native Python/Qt vertical slice. Do not undertake a sweeping unverified rewrite or prematurely declare full portability.
8. Leave a cold-agent summary with commands, exact observed results, remaining blockers, and the next small independently testable milestone.

**Project identity to preserve:** Any-Shape is a foundation for enduring graphical software, not a form-only project, an Avalonia-only project, or a screenshot converter. The owner's lifetime horizon is self-sustaining software whose identity and legitimate behavior can survive its own tools and authors.

**Handoff rule:** If this conversation is lost, this blueprint and its companion vision should suffice to recover the intended destination, the order of operations, the priority tradeoffs, the limitations of today's implementation, and how to verify real progress.

## New cross-platform handoff gate — Conventional IDE outputs and mobile reference candidates (2026-10-14)

**Why this belongs in the core roadmap:** Any-Shape should enable a cold agent to turn an unfamiliar project into a *normal, editable and testable application* for the chosen target. The reference corpus needs **enough breadth to explain the transfer principle**, not a hardcoded implementation for every target/framework.

**Avalonia deliverable contract (proposed):** generate a standard .NET solution and project (`.sln` or `.slnx`, `.csproj`), compilable C#/XAML (`.axaml`), ordinary IDE layout, pinned NuGet/.NET versions, human-readable README, `dotnet restore/build/test/run` commands, Linux and Windows packaging instructions, and test fixtures plus actual conformance traces. Explicitly verify that a human can open, edit and debug the output in Visual Studio or a supported .NET IDE. Do not rely upon paid IDE tooling, a closed generator or an embedded webpage. The official Visual Studio Avalonia editor/previewer is optional convenience, not a core dependency. Reference: https://docs.avaloniaui.net/tools/visual-studio-extension .

**Mobile capability requirement:** the general agent continuity model must accommodate real phone application targets, native/mobile navigation, touch, small and variable viewport, safe areas, soft keyboard, state suspension/resume, file/storage sandboxes, permission prompts, offline effects, notifications where relevant, app packaging and target OS diagnostics. **React Native/Expo/TypeScript** and **Flutter/Dart** are the two primary initial evaluation candidates; **Avalonia Android/iOS** can be a further .NET-aligned candidate if proven appropriate. Sources for technology capability, not Any-Shape success claims: https://docs.expo.dev/get-started/create-a-project/ , https://reactnative.dev/docs/environment-setup , https://docs.flutter.dev/reference/supported-platforms .

**Target-selection experiment rather than premature stack choice:**
1. Establish verified browser baselines and shared operation/effect fixtures first.
2. Pick **one bounded form** for the first mobile comparison; do not port all three into both frameworks up front.
3. Build an ordinary editable React Native + Expo TypeScript prototype and an ordinary editable Flutter/Dart prototype, each using the same neutral fixtures, if resources permit. Assess which yields clearer agent generation, maintainability, visual adaptation, fewer unsupported semantics and lower real tool/dependency cost.
4. Pin an explicit Android SDK/API level, emulator size/profile, framework/SDK version, architecture and toolchain. Verify actual touch, navigation, persistence, permission differences and network effects on an emulator/device.
5. To certify iOS output, specify a macOS/Xcode/iOS Simulator/device runner and provisioning/signing limits. Do not mark iOS PASS based only on Android tests or shared-source claims.
6. Choose the first canonical mobile reference from observed outcomes. Retain the other case as a comparative experiment or future adapter; don't permanently burden the minimal core with both dependencies.

**Cross-platform truth model:** separate `sourceObserved`, `contractAccepted`, `targetImplemented`, `targetExecuted`, `platformVerified`, `visualReviewed` and `needsHumanVerification`. A reproducible generated source tree counts as deliverable evidence, not as proof it behaves correctly on untested operating systems.

**Distributable "cold agent" bundle (candidate, not yet produced):**
- one concise launch/readme/agent entrypoint;
- versioned Forever Works-compatible semantic contracts and open Any-Shape UI/effect extensions;
- indexed small corpus of capability-rich examples, acceptance fixtures and failures;
- an inspect/plan/trace/verify CLI or equivalent transport-neutral interface;
- optional independent target adapters and generator templates;
- recorded environment pins, licenses and test commands.

Packaging choices (npm, Python, portable CLI archive, ZIP, multi-language adapters) are **deliberately undecided**. Select by measured cold-agent adoption experience rather than personal language preference. The package must be operable offline for meaningful local examples and should not demand cloud inference, proprietary services or full mobile/desktop toolchains merely to *inspect* a project.

**Next precedence rule:** The new desktop/mobile output contracts are not permission to leap over the existing verification gates. Source browser applications and webhook effects must be observed and frozen as acceptance fixtures before claiming cross-target equivalence. Add mobile as a tracked M9 cross-medium branch and Avalonia/IDE interoperability as an acceptance condition on the desktop transference gate. Add an unseen-source mobile or desktop project to the later generalization evaluation.


## Flagship acceptance gate — Unprepared source, general-purpose package, cold agent

**This gate is normative for the proposed showcase, not an already passed milestone.** The forms remain initial teaching/fixture references, while the eventual flagship is the **agent's independent conversion of a real, not specially prepared Chrome extension** into functioning target-platform applications.

### Anti-hardcoding protocol

1. Develop a real, ordinary standalone Chrome extension with useful functionality and natural platform-specific capabilities. Its development must not embed predetermined target-language implementations or application-specific conversion annotations merely to help this showcase.
2. Establish an independent source baseline: capture real workflows, domain identities, validation, state, permissions, network/file effects, responsive behavior, errors, and evidence. Freeze the extension's commit/release and fixture version.
3. Release an **application-agnostic** Any-Shape bundle with a Forever Works-compatible neutral specification, small indexed canonical corpus, discovery/diagnostic tooling, conformance contracts, versioned adapters, environment pins and offline readable documentation. Prefer npm first if pragmatic; keep all semantic records portable for later Python and other bindings.
4. Give **one cold agent** only the frozen original project/repository/ZIP, Any-Shape package, a selected target and authorized build/test environment. No hand-authored target solutions, private mapping hints or evaluator answers. Report the strength of actual isolation rather than claiming a blind trial without enforced boundaries.
5. First request an editable, buildable Android project with real device/emulator verification and separately evaluated Google Play submission readiness; then request a standard Avalonia/C# solution for pinned Windows and Ubuntu Linux. iOS is a future target requiring genuine supported Apple toolchain/device or simulator evidence. Do not equate store readiness, store submission or approval.
6. The agent must **discover -> abstract -> select precedents -> reconstruct -> execute -> compare effects -> diagnose drift -> repair within authority -> generate handoff**. It must preserve underlying obligations while adapting platform-specific capabilities (e.g., browser capture versus Android share intents) and documenting losses.
7. Independent reviewers/evaluators check actual domain semantics, state, validation, file/data/network effect receipts, visual coherence across sizes, keyboard/touch/a11y, packaging and dependency versions. Report PASS, FAIL, UNKNOWN, UNSUPPORTED, and `needsHumanVerification` with exact scope and evidence.
8. Log wall-clock duration, compute/token/tools budget, number of human interventions, repair iterations, compilation/runtime results and reproducibility. Faster is better **only if correctness and quality hold**.
9. Run a second cold trial on a different, previously unseen application domain. Rework general contracts when necessary, not one-off per-app conversion rules.

### Failure conditions

A hand-ported Android/desktop copy presented as an agent conversion; source-tailored scaffolding installed in the package; a hidden prewritten conversion map; test harnesses that never observe real external effects; screenshots substituted for working controls; conflating running on one OS with verified operation on every OS; a claim of store approval without platform review; an agent that can only succeed with elaborate application-specific prompting; or a growing pile of bespoke adapters masquerading as a small general-purpose core.

**Progression:** verified forms and webhook/side-effect evidence -> minimal semantic discovery/continuity package -> cold Chrome extension trial -> Android proof -> Avalonia Windows/Linux proof -> independent generalization and drift/repair evaluation. The original milestone map's M0–M11 gates still apply; do not leapfrog baseline verification.

**Interpretation rule:** The showcase product may change or even be replaced. The transferable, independently verifiable method is what Any-Shape exists to demonstrate.
