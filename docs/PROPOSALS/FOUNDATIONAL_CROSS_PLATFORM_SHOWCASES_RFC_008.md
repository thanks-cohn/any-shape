# RFC-008 — Foundational Cross-Platform Showcases, Avalonia and Native Expansion

**Status:** Proposed roadmap, reference applications and acceptance requirements; not an implemented generator.
**Date:** 2026-10-13
**Authority:** Explicit founder direction: lightweight, enduring agent-first application transference, beginning JavaScript ↔ Python, then Windows/Linux Avalonia and C/C++ foundation examples. The detailed mappings and proposed acceptance tests are engineering proposals, not owner-approved production policies.
**Related:** [RFC-005 Interface Portability](INTERFACE_PORTABILITY_RFC_005.md), [RFC-006 Adaptive Transference](ADAPTIVE_TRANSFERENCE_RFC_006.md), [RFC-007 Bidirectional Language Portability](LANGUAGE_PORTABILITY_STRATEGY_RFC_007.md), [Continuity of Orientation](../FOUNDATION/CONTINUITY_OF_ORIENTATION.md), [Software Built to Endure](../VISION/SOFTWARE_BUILT_TO_ENDURE.md).

## 1. The intended product

Any-Shape is not merely a responsive styling system. Its longer-term mission is to enable an authorized developer or agent to take an existing application, understand its purpose and its observable contracts, and produce a usable counterpart in a supported language, framework, operating system or presentation medium—without repeating the entire discovery and implementation process for each target.

The user-facing output should be an immediately comprehensible and polished application, not only an SDK demonstration. The agent-facing output should be a portable, self-describing project continuity pack with stable contracts and independently repeatable conformance checks.

**Compact core, rich examples:** do not burden every adopter with Python, Avalonia/.NET, Qt or C++ toolchains. Keep the browser library and language-neutral contract tooling small, with independently installable target adapters, examples and tests. Avoid duplicating host frameworks or the browser.

## 2. An escalating reference-example ladder

### Example 1 — JavaScript ↔ native Python, bidirectionally

A user supplies an authorized browser app with real forms, distinctive styling, nontrivial interactions, responsive layouts and public API endpoints. An agent inspects the source, behavior, permissions and API contract; distinguishes observed from inferred semantics; and creates a native Python desktop equivalent using appropriate native widgets.

Show actual inputs and Submit controls invoking the same logical operations. Same values, defaults, validation, errors, permission checks, HTTP method/path, schemas, state transitions and effects. Show both applications adapting to window/container resizing with readable text, recognizable headings, familiar groupings and recoverable details.

Demonstrate **Python → JavaScript** independently from a Python-first or contract-first origin, not by simply restoring the original web code. Run neutral behavioral/API and presentation-oriented conformance checks in both directions, with failures and unknowns visible.

A browser embedded inside a Python WebView may be a useful adapter, but **does not** establish native GUI transference.

### Example 2 — Browser + extension integration → Avalonia Windows/Linux

From an authorized browser-origin project, create a **cross-platform Avalonia UI (C#/.NET) desktop realization** sharing the same semantic model and externally visible API/endpoint contracts. Build, package and execute separate Windows and Linux artifacts as appropriate; exercise the same form, state, error and responsive/orientational behaviors under platform-native window sizing and accessibility.

The Chrome Manifest V3 extension is an **independent browser distribution surface**, not a .NET program that Chrome executes. If an extension needs privileged native OS capabilities, use a separately installed and registered native-messaging host with explicit access controls and its own verified lifecycle. The Avalonia application may also connect to the same permitted localhost/server API or own a documented service adapter. Keep extension runtime, desktop GUI, shared domain model and native host separate.

Demonstrate which pieces are directly shared (versioned schemas, endpoint contract, compatible domain algorithms, persistent state semantics) and which need platform adaptations (UI, filesystem, permissions, packaging, lifecycle). Test real Windows and Linux release artifacts; don't claim cross-platform portability from compiling on only one OS.

**Deployment must be honest:** publishing an extension on the Chrome Web Store does not install, approve, or bypass Windows security checks for a native executable. Companion installers, native-host registration, code signing, browser policies, SmartScreen/application reputation, Chrome Web Store review, and Linux packaging are separate concerns. Any-Shape may automate compliant packaging, validation and instructions but must not claim automatic store approval or a Windows security bypass.

Avalonia can use self-contained deployment or Native AOT in supported versions and configurations; measure resulting package size, startup, memory, graphics/accessibility dependencies and installation experience. No requirement that users install a shared .NET runtime when a supported self-contained build can bundle the needed runtime. Exact licenses and redistribution conditions must be reviewed for each dependency and packaging tool.

### Example 3 — Native C++ and C continuity targets

Provide C++/Qt (or another justified native UI toolkit) as a compiled desktop counterpart with native, accessible controls and responsive orientation behavior. Treat **C** as a distinct constrained-language foundation example with a stable ABI/domain/API layer, explicit memory ownership and error semantics, plus appropriate platform-specific GUI adapters where warranted.

Maintain compatibility fixtures and intent independent of C++/C, JavaScript, Python or C#. Do not force Avalonia into the C++ or C target: Avalonia is a C#/.NET renderer option, not the universal core.

The aim is for important future programs to rely on Any-Shape's *open documented contracts and independently replaceable implementations*, not to become trapped in a single library or company.

## 3. What an agent must be able to do

A previously unfamiliar, suitably tooled and authorized agent should be able to:

1. Discover the canonical project purpose, source/target adapters, versioned schemas, endpoint catalogue, data types, adaptation rules, permissions, supported environments, and actual test evidence from a single documented entrypoint.
2. Inspect an authorized source application, its UI interactions and traffic, implementation where provided, declared platform privileges and aesthetic intent.
3. Distinguish observable facts from inferred requirements and surface material unknowns for owner approval.
4. Produce a transparent transference plan: target runtimes, dependencies, scope gaps, environment-specific mappings, packaging and API compatibility.
5. Generate or author a working target app and required platform adapters without bypassing authentication, authorization or security boundaries.
6. Run independent tests against source and target, including actual control-to-network and control-to-state traces, error cases, and resize/orientation scenarios.
7. Deliver launchable artifacts with installation steps, portable contracts, evidence, and next-agent repair/migration instructions.
8. Identify and honestly report missing source/API knowledge, failed conformance, subjective aesthetics, untested OS targets, and unverified store/deployment acceptance.

The agent API must expose read-only discovery separately from actions; write, build, packaging, install and publish operations need appropriately scoped authorization. Developer SDK and Agent API share one semantic and permission boundary. Operation protocols may have CLI/JSON, stdio, MCP or HTTP adapters but **must not require** any particular model provider or transport.

## 4. Canonical cross-target continuity requirements

For each realization preserve as applicable:

- **Meaning:** object, record, component, field and action IDs, relationships, hierarchy and intent.
- **Inputs:** label/role, value types, defaults, canonicalization, empty/null, required/optional constraints and error mapping.
- **Operations:** clicking Save or pressing Enter reaches the same authorized command; agent/developer SDK calls reach the same domain logic.
- **Endpoints:** method/path, authentication, request/response schema, HTTP status and error conventions, versioning, retries/concurrency and state transitions—where endpoint compatibility is part of the accepted target contract.
- **Presentation:** recognizable aesthetic, typography scale, hierarchy, core landmarks and minimum legibility; adapt using native layout systems, not arbitrary pixel copying.
- **Orientation and access:** retained task context, draft values, focus and reachable full content; no critical text exclusively behind hover.
- **Platform boundaries:** file access, browser privileges, native messaging, service persistence, installer/uninstaller behavior, user consent and privacy must obey each target's actual security model.
- **Evidence:** black-box tests and provenance, positive/negative cases, screenshots for review, accessibility/keyboard testing and explicit PASS/FAIL/UNKNOWN separately for semantics, drop-in APIs, native widgets, cross-OS packaging and store approval.

An approved language-neutral model does not guarantee an arbitrary hidden application can be reimplemented without source, test access or owner decisions.

## 5. Examples as an executable standard

Provide a small reference suite rather than a monolithic demo:
- **Preferences Studio:** browser ↔ native Python ↔ browser, real shared HTTP and form contracts.
- **Native Desktop Studio:** same contract with an Avalonia C# frontend built separately on Windows/Linux; compare native input paths, resize behavior, endpoint traces and packaging.
- **Extension Companion:** Manifest V3 extension with mock-safe or authorized real localhost/native messaging interactions, an installed companion for approved native operations and documented store review/security boundaries.
- **Compiled Native Studio:** C++ native UI and minimal C core/ABI adapter exercising a subset of the same neutral fixtures.
- **Failure and change scenarios:** missing host, denied permission, invalid input, no network, disabled optional enhancement, changed API version, constrained window, high text scale and dependency replacement.

For each demo include: screenshots or interactive previews, one-command development start where feasible, exact platform prerequisites, minimal readable source, machine-readable contracts, a parity table, a neutral evaluator and a durable continuity pack. Keep test fixtures portable and meaningful, not hardcoded to arbitrary screenshots.

## 6. Proposed release gates

| Gate | Measurable outcome |
|---|---|
| XP-001 | JS ↔ Python conversion works in both directions for a bounded example with independent non-circular evidence. |
| XP-002 | Browser/desktop inputs, Submit behavior, endpoints, validation, permissions, errors and state semantics match accepted fixtures. |
| XP-003 | Native Python and browser layouts preserve user orientation/readability through real resizing and keyboard interaction. |
| XP-004 | Avalonia Windows and Linux artifacts are actually built, installed or launched, and independently exercised; untested platforms remain UNKNOWN. |
| XP-005 | The Avalonia client and web/extension client use equivalent approved API endpoints and authorized actions, despite different GUI toolkits. |
| XP-006 | The Chrome extension runs according to MV3 policy and packaging rules; any native host is separately installed, registered and securely authorized. No inferred Web Store approval. |
| XP-007 | C++ native UI and C portable domain/ABI subsets pass their mapped neutral fixtures with documented limits. |
| XP-008 | Agent discovery, plan, permissioned action and final evidence are independently reproducible without vendor/model-specific memory. |
| XP-009 | Replacing one renderer, toolkit or agent does not alter approved domain meaning or invalidate untouched platform implementations without a documented migration. |
| XP-010 | Source and target installers, package size, cold startup, memory, dependencies and maintenance effort are measured; no no-bloat claim without data. |
| XP-011 | Compatible old v0.1 browser adopters keep working and no new heavyweight mandatory core dependencies appear. |
| XP-012 | A human who has never read the repository can operate each demo and recognize why the outputs are meaningfully equivalent. |

## 7. Implementation and ownership order

1. Finish and independently validate JS ↔ Python functionality **and** adaptive presentation. This is the first public proof, not to be delayed by all-platform packaging.
2. Promote repeated verified semantics into portable, versioned contract/renderer-adapter interfaces; require documented source and target capabilities.
3. Add **Avalonia C# Windows + Linux** as the next cross-platform production-oriented renderer with genuinely tested builds.
4. Add Chrome extension + secure native companion as a separate distribution/integration example, based on verified Chrome API and host installation rules.
5. Add C++ native desktop, then bounded C domain/ABI conformance, reusing exact semantics and tests.
6. Expand to externally supplied authorized projects and independent cold-agent generation; measure success rate, repairability and total costs across languages.

This sequence is a **strategic direction**, not proof that every feature already exists. The source of truth is approved behavioral contracts and the actual Forever Works model, not a particular framework.

## 8. External technical references

- Chrome Native Messaging: https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging
- Google Chrome native messaging example: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/nativeMessaging
- Avalonia documentation: https://docs.avaloniaui.net/
- Avalonia Native AOT: https://docs.avaloniaui.net/docs/deployment/native-aot
- Avalonia Linux deployment: https://avaloniaui.net/avalonia/linux
- Forever Works canonical standard: https://github.com/thanks-cohn/forever-works

**Guiding proposition:** preserve the application and its operations across environments while reusing native platform strengths; don't reimplement the platforms.
