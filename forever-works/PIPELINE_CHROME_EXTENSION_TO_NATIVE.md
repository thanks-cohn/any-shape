# Pipeline 001 — Chrome Extension → Native Applications

**Status:** PROPOSED pipeline foundation; implementation and production certification NOT YET COMPLETE. **Period:** P001 (Early Experimental). **Execution phases:** discovery → extraction → native reconstruction → effect verification → production hardening. **First intended subject:** Keepsake (source repository not yet identified). **Goal:** apply to any authorized Chrome extension with explicit feature/support boundaries; do not specialize the standard for Keepsake.

## Mission

Reconstruct the *useful operations and experience* of an existing Chrome extension as independently distributable Android, Windows and Linux software. The Chrome extension is an evidence source and reference implementation, **not** an architecture every platform must emulate. Preserve domain semantics, state, authorized effects and user comprehensibility; choose target-native affordances and report transformations/degradations honestly. This is reconstruction, not source translation, a WebView wrapper, or a claim that browser-only privileged APIs exist natively.

## Vocabulary / chronology

- **Period:** historically attributable record of actual software, decisions, limitations and evidence; archived additively.
- **Phase:** a bounded body of work *within* a period, with entry/exit conditions. Phases may recur.
- **Epoch:** an optional owner-declared major generational transition, not an automatic version number.
- **Adapter:** concrete implementation of a capability on a target platform.
- **Capability:** user-meaningful operation with inputs, effects, failures and authorization.
- **Continuity dossier:** source-grounded inventory, neutral contract, golden tests, native mapping and evidence ledger for one extension.

## Universal process

### Phase 1 — Source intake and capability discovery

**Inputs:** owner-authorized repository or packaged extension; version/commit; target OS/device profiles; expected user workflows. Read manifest (MV2/MV3), permissions, host permissions, background service workers, content scripts, injected scripts, message passing, popup/options UI, storage, alarms, downloads, clipboard, identity, notifications, tabs/windows, network and remote integrations. Capture assets/licenses, localization, state transitions, accessible interactions, error handling and external effects.

**Required outputs:** capability ledger; permission/authority map; source-file dependency atlas; trust boundary diagram; live traces or marked UNKNOWN; explicit PRESERVE/CORRECT/EXCLUDE choices. Never infer behavior solely from filenames or APIs. A suspicious or inaccessible extension is not authorized for recreation.

### Phase 2 — Semantic contract and golden evidence

For each selected capability record: stable ID, purpose, initiating actor/intent, input schema, preconditions, authorization, state before/after, observable output and side effects, cancellation/retry/undo, failure modes, evidence source, severity and allowable native variation. Golden probes compare *real effects*, not screenshots or button names. Include no-network, reduced resources, corrupt state, denied permissions, and data migration. Store test inputs without real user secrets.

### Phase 3 — Platform mapping / gap decisions

| Origin surface | Android mapping — candidate | Windows/Linux mapping — candidate |
| --- | --- | --- |
| Extension popup/options | Native screens, adaptive navigation and accessibility | Avalonia windows/dialogs/settings |
| chrome.storage / IndexedDB | Explicit repository (e.g. SQLite/preferences/files), migrations | Shared C# persistence abstractions; SQLite/files if justified |
| Background worker / alarms | WorkManager, notifications, lifecycle-aware services where allowed | Background service/task with startup/shutdown and permission controls |
| Tabs/content scripts/DOM access | No equivalent universal access to other apps' webpages; evaluate browser integration, explicit share intent, accessibility APIs only when justified and consented | Browser extension companion/IPC, URL handler, clipboard or platform integration; not unscoped process injection |
| Downloads/file capture | Android Storage Access Framework + scoped storage | Avalonia file dialogs and OS file APIs |
| Browser messaging | Typed internal ports/events and explicit failure semantics | Typed C# messages/services |
| Browser permissions | Android manifest/runtime permission and platform policy review | OS permission/security boundary and user consent |
| Browser UI identity | Semantic and aesthetic guidance, native interaction | Same semantic intent rendered by Avalonia |

**Platform decision record required:** Evaluate **Kotlin native vs React Native/Expo** for Android against actual extension needs, lifecycle, storage, capture/share integrations, maintainer skills and build reproducibility; avoid prejudging the choice. **Avalonia/C#** is the requested common Windows/Linux desktop route. A shared semantic contract is mandatory; **shared source code across JS/Android/C# is optional**, never an excuse to ship browser wrappers.

### Phase 4 — Reconstruction and build

Prefer a small **domain core** (objects, operations, constraints), **platform adapters** (storage, lifecycle, integrations), **native presentation**, and **observable diagnostics**. Only add abstractions backed by multiple concrete implementations or a proved replacement need. No credentials in repository, apps or public tests. Native projects must have repeatable local/CI build instructions, application IDs, versioning, install/uninstall behavior and data export/recovery plans. Source extension continues operating as reference; separate releases and staged migration avoid data loss.

### Phase 5 — Independent conformance

Independently exercise source and target with matched fixtures; compare typed outputs and durable effects, including negative cases. Use Android emulator/device and actual Windows and Linux runtime tests where possible. An Avalonia build succeeding on one OS is **not** proof it runs on the other; Android emulator success is not certification of Play Store compliance or real-device background behavior.

Evaluate distinct axes: semantic understanding; function/effect parity; platform-native UX/accessibility; authorization/privacy; compatibility/data migration; package reproducibility; resilience/diagnostics; production readiness. Evidence verdict for each: PASS/FAIL/UNKNOWN, never implicit PASS. Cold-agent reconstruction tests should withhold incumbent mechanisms/evaluator until candidate freeze; document limitations if strict isolation unavailable.

### Phase 6 — Production and handoff

Android: signed release artifacts, permission audit, Play policy and device support, crash reporting privacy, data safety, upgrade testing. Windows/Linux: distributable installers/packages, code-signing strategy as applicable, runtime dependencies, updates, clean uninstall, launch/file associations and platform integration. For all: secrets and privacy, backups/migrations, rollback, telemetry consent, reproducible builds, accessibility, critical user acceptance, supportability. Capture accepted deviations and period transition; do not declare production merely because CI is green.

## Minimal per-extension dossier

```text
reconstruction/extensions/<extension-id>/
  README.md               # source origin and selected targets
  capability-ledger.md    # owner-accepted behaviors, limitations
  source-atlas.md         # source paths, dependencies, runtime messages
  platform-matrix.md      # per-OS mapping and unsupported/alternative paths
  golden-fixtures/        # synthetic inputs and expected externally observed effects
  evidence-ledger.md      # provenance, checks, PASS/FAIL/UNKNOWN
  decisions.md            # native language, PRESERVE/CORRECT/EXCLUDE, migration
```

Documents may be added **additively**. The profile can later be formalized into existing validated `forever/` schemas without mutating their format speculatively.

## Concrete milestone gates

- **G0 / discover:** correct Keepsake repo/version established, manifest and capability inventory mapped.
- **G1 / contract:** representative source behavior demonstrated, owner approves selected features and known deviations.
- **G2 / Android:** Android-native installable build, selected functions independently checked on device/emulator.
- **G3 / Avalonia:** Windows and Linux native builds with platform-specific runtime/installer verification.
- **G4 / continuity:** repeat pipeline for a *second unrelated extension* without editing the pipeline for Keepsake-specific assumptions.
- **G5 / production:** release, permissions/security, migration/rollback and ongoing operations accepted per platform.

**A pipeline is only extension-generic after G4.** Keepsake passing proves one subject, not universal compatibility.

## Immediate next step

Identify Keepsake's exact source repository/branch and its manifest. Run an inventory, not a conversion. Mark all unsupported privileged browser capabilities UNKNOWN until their native alternatives and security implications are explicitly tested. Then produce its first capability ledger and the three-platform mapping before selecting the Android language.
