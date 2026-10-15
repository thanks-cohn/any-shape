# One Avalonia Run, Three Isolated Target Proofs

**Status:** OWNER-REQUESTED RESEARCH DESIGN / PROPOSED, not implemented or conformance-verified. **Period:** P001, early experimental. **Applies to:** generic extension reconstruction via a C#/Avalonia realization, targeting Windows desktop, Linux desktop and Android in one coordinated run. It does not prescribe Avalonia as a permanent standard dependency.

## Thesis

**One agent run may generate one Avalonia solution for three operating systems while avoiding semantic and implementation contamination by construction.** The agent may share a framework, domain contracts and verified implementation components, but **must not infer that desktop behavior, windowing, permissions or navigation is valid on Android** merely because it compiles or has a nearby implementation.

The hypothesis is that explicit scoping plus machine-checkable architectural boundaries and independent target acceptance will outperform ordinary prompt-only instruction. This remains a hypothesis requiring a controlled trial.

## Three dimensions that must not be conflated

1. **Shared meaning** (authoritative): domain objects, user goals, field identities, validation, authorized actions, state transitions, persistence semantics, error meaning, accessibility intent and required outcomes.
2. **Shared implementation** (conditional): platform-independent C# code and selected Avalonia view models/components. Reuse is earned through a declared support matrix, portability tests and target checks—not inferred because the types compile.
3. **Target realization** (platform-scoped): Windows, Linux and Android each have independently described user input, lifecycle, UI navigation, filesystem, sharing, permissions, background execution, packaging, deployment and recovery.

A capability may be *semantically shared* yet require three different implementations. A control may be *visually shared* yet need distinct mobile navigation, touch sizes and screen-reader behavior.

## Machine-readable target ownership

For every capability, dependency, UI pattern and implementation claim, the neutral EIR / Forever Works-compatible extension SHOULD encode:

- **Requirement ID** and evidence provenance, plus exactly which domain behavior is shared.
- **Applicable targets** (`windows`, `linux`, `android`) and explicit `not-applicable` versus `unsupported` versus `unknown`.
- **Implementation scope** (`shared-domain`, `shared-ui`, `desktop-only`, `android-only`, or target-specific) and permitted callers/dependencies.
- **Assumptions and host privileges** attached to a target, not silently inherited by all targets.
- **Platform affordance mapping**: what the user does here and its target-native equivalent.
- **Evidence per target**, including build, on-platform execution, real effects, human usability and observed exceptions.
- **Reuse justification**: why shared code is safe, and what would invalidate this reasoning.

These are **candidate extension vocabulary**; do not invent canonical Forever Works record kinds or alter `forever/` schemas without standard-level review. Store optional data under namespaced extensions with provenance and validate a project-local schema.

### Illustrative claim — not a current implementation

```json
{
  "requirementId": "capability.save-record",
  "meaning": "Persist a user-confirmed record durably",
  "targets": {
    "windows": {"support": "proposed", "implementationScope": "desktop-only"},
    "linux": {"support": "proposed", "implementationScope": "desktop-only"},
    "android": {"support": "unknown", "implementationScope": "android-only"}
  },
  "sharedDomain": true,
  "evidence": [],
  "provenance": "agent-proposed"
}
```

**WARNING:** `proposed` here is a project-local planning status, not a canonical evaluation PASS.

## Dependency and code ownership boundaries

Proposed project structure, illustrative only:

```text
GeneratedApp/
  Contract/               # portable semantics, fixture references, versioning
  Domain/                 # validated domain operations; no UI/OS SDK calls
  Application/            # ports and orchestrated use cases; no OS assumptions
  Presentation.Shared/    # explicitly audited shared Avalonia view-model patterns
  Platforms.Desktop/      # desktop-specific UI/host bridge, if truly identical
  Platforms.Windows/      # Windows-specific integration
  Platforms.Linux/        # Linux-specific integration
  Platforms.Android/      # Android-specific integration, mobile UI/lifecycle
  Tests.Contract/         # platform-neutral oracle
  Tests.Windows/          # Windows build/runtime/effect proof
  Tests.Linux/            # Linux build/runtime/effect proof
  Tests.Android/          # emulator/device build/runtime/effect proof
  evidence/               # acceptance ledger per target
```

Enforce dependency direction: platform adapters may depend on Domain/Application contracts, never the reverse. Shared projects **MUST NOT import platform-specific namespaces, filesystem paths, window assumptions, permission shortcuts, or lifecycle semantics**. Desktop and Android UI composition can diverge around the same semantic actions. Use compile-time project references, source/static checks and architecture tests to detect violations, not merely comments.

Avoid duplicating near-identical modules without necessity. Separation exists to expose host differences, not to maximize layer count.

## One run, deliberately gated stages

**Stage 0 — Freeze:** accepted, language-neutral semantics; target-specific acceptance matrix and known unknowns. Define before generating UI.

**Stage 1 — Shared core:** implement domain behavior, contracts and deterministic neutral tests. Must pass with no reliance on any target UI project.

**Stage 2 — Windows:** generate/verify Avalonia Windows host, input/focus/navigation, storage/file behavior and real effects. Failure remains target-scoped.

**Stage 3 — Linux:** run *independent* Linux build, launch and behavior checks; don't promote a Windows green result to Linux PASS.

**Stage 4 — Android:** implement Android-specific host/mobile composition; touch/accessibility, scoped storage, lifecycle, permissions, background task limits and packaged app tests. Shared Avalonia components are accepted only after Android verification.

**Stage 5 — cross-target audit:** run invariant fixtures against all three, compare semantic effects and platform-specific UX acceptance; produce a three-column PASS/FAIL/UNKNOWN evidence matrix and record allowed deviations. Evaluate CI artifact differences, clean install, reinstall, upgrade/data migration, constrained resources and graceful failure.

These are **stages inside one bounded run**, not three agent runs. If context limits, runtime failures or operational risk threaten isolation, agents SHOULD checkpoint a handoff and continue in a fresh run, preserving only accepted contract/evidence and relevant implementation findings.

## Anti-contamination checks

| Failure | Preventive boundary | Independent proof |
| --- | --- | --- |
| Windows file path used on Android | File-system port, per-target implementation | Android sandbox/scoped-storage read/write fixture |
| Desktop dialog on Android | Host-specific interaction port and navigation map | Android touch/back stack, permissions and accessibility tests |
| Same build treated as all-target pass | Target-scoped evidence ledger | On-platform launch and effect checks on each OS |
| Windows/Linux shared code assumed portable | Explicit support matrix | Real Linux runtime and permission checks |
| Android unsupported browser API silently emulated | Capability gap record and disposition | Unavailable action or permitted companion check |
| Cross-target UI duplication becomes a semantic requirement | Separate domain/UX obligations | Contract fixtures independent of Avalonia views |
| Android failure patched into shared domain incorrectly | Change-impact and scope review | Regression suite for all affected targets |

**Fail closed on evidence:** compiler success proves compilation for its target, not user task completion. A single target FAIL/UNKNOWN cannot be overwritten by another target PASS; aggregate is PARTIAL unless the declared required targets and obligations are independently satisfied.

## Comparative research plan

Compare a **single coordinated Avalonia three-target run** to a **sequential bounded-run baseline**, using the *same synthetic extension fixture*, pinned toolchain and evaluator. Measure completion time/compute, human intervention, defects, accidental cross-target assumptions, effect parity, accessibility, portability, and independent verification coverage. Randomize or counterbalance ordering where feasible. Do not infer superiority from one anecdotal run.

React Native Android remains a **separate contrastive reconstruction** from the neutral contract, not part of the coordinated Avalonia implementation; its purpose is to test whether a different surface reveals assumptions the Avalonia-only implementation concealed.

## Future-agent replacement rule

**WHY Avalonia?** Reduce the number of graphical frameworks and duplicated UI reasoning needed for Windows/Linux/Android while allowing cross-platform C# reuse.

**WHAT does it do?** Present and operate a native-target application through a shared framework, with explicit target-specific hosts and bridges.

**HOW could it be replaced?** Select an alternative UI/toolchain, preserve domain and user-affordance contracts, map each host integration and privilege, rebuild every target and satisfy the same independent per-target fixtures; do not mechanically preserve XAML or .NET dependency.

**PROOF:** target-scoped binaries, runtime traces, durable effects, UX/accessibility checks, dependency boundary tests, denied-permission cases, documented deviations and evaluator verdict. None of this is currently a proven generator capability.

## Handoff milestone

Before a real extension, implement a project-local typed target-support matrix schema, a boundary linter, fixture-specific cross-target conformance reports, and a simple synthetic Avalonia sample that genuinely runs on each OS. Freeze evidence and only then measure one-run versus sequential-run outcomes. Add observations to P001 as dated addenda; open a new Period only for a substantial historical change.
