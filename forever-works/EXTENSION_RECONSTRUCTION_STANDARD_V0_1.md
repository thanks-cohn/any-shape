# Extension Reconstruction Profile v0.1 — Source-Blind Foundation

**Home:** Any-Shape / `forever-works/`. **Period:** P001 — Early Experimental. **Status:** DESIGN PROPOSAL, **not implemented** or certified. **Scope:** general capability extraction and reconstruction from arbitrary *authorized* Chrome/Chromium extensions, with initially targeted **Android/React Native** and **Windows + Linux/C# Avalonia** outputs. Other languages, renderers, runtimes and destinations remain legitimate future adapters.

> **We must design the system before supplying a real extension.** No Keepsake source or other production extension is permitted as design input for this initial foundation. A system that works only on one familiar extension is not a general reconstruction pipeline.

## 1. Enduring identity

Given an extension, reconstruct an independently operable target application which preserves **owner-selected user purposes, information semantics, state transitions, authorized effects and usable experience** while openly identifying functions with no legitimate target-platform equivalent. The pipeline is an explanation, decision, implementation and proof system—not a magical transpiler, UI screenshot copier or universal privilege escalator.

**A single input extension may yield several realizations, each legitimately different.** A browser-injection extension may require a browser companion to retain its original capabilities; a standalone native app cannot automatically read/modify every website or silently gain browser permissions. Where the capability requires unavailable host privileges, report a gap, request authorization, propose a permitted companion, or exclude it by owner decision. Never fabricate parity.

## 2. Anti-overfitting protocol

1. **Freeze the input/output/API contracts before examining any real extension.** This phase may use neutral examples, Chromium public specifications and invented fixtures, but not Keepsake internals.
2. **Separate core from per-subject dossier.** A conversion may populate records for a discovered extension but may not modify shared core behavior merely to pass its fixture. Any necessary core revision must be an explicit generalizable RFC with counterexamples.
3. **Separate reconstructor and evaluator.** Evaluator chooses holdout extension fixtures and adversarial cases not used to design the generator. Candidate self-tests do not certify parity.
4. **Do not presuppose identical UX.** Each platform has its own navigation, lifecycle, storage, accessibility and permission systems; preserve semantic/user intent and measure accepted changes.
5. **Measure manual interventions.** Unexpected custom patches, source-specific templates, unsupported operations and post-generation rewrites must be disclosed and counted.
6. **No source-leakage shortcuts.** No matching on extension names, expected outputs, hidden test filenames, or repository-specific directory layouts. Intake discovers entrypoints and dependencies by structural evidence.
7. **Freeze versions** of candidate, baseline, fixtures and evaluator. Report contamination or non-isolated trials as limited evidence, not fully blind certification.

## 3. Language-neutral intermediate representation (EIR)

The **Extension Intent Representation** is an explicit *proposed* serializable contract. Prefer typed JSON with schema version and reference resolution; do not treat this outline as a schema already implemented. Entries include stable IDs, provenance, confidence and `observed|inferred|owner-approved|unknown` claim state.

| Domain | Required content |
| --- | --- |
| `source` | provenance, manifest version, original extension version/commit/hash, license, asset inventory, packaging restrictions |
| `surfaces` | popup, options, content UI, background behaviors, browser commands, context menu, notifications; relationships and entry conditions |
| `capabilities` | actor intent; inputs/outputs; domain entities; state transition; external effects; error, cancellation and retries; needed permissions |
| `state` | ownership, lifetime, persistence, migrations, concurrency, import/export and deletion semantics |
| `messages` | producer, consumer, event/command name, payload schema, reply/error, ordering, scope and trust boundary |
| `dependencies` | browser APIs, third-party services, local files, network endpoints, build/compile dependencies, licensing and alternatives |
| `authority` | manifest/host permissions and target authority; access checks, consent, credentials, disclosure and policy limitations |
| `uiSemantics` | tasks, field roles, text meanings, grouping, focus, keyboard/touch navigation, important feedback and user-facing state |
| `evidence` | where every claim came from: source span, trace, human observation, specification, test or unknown |
| `targetGaps` | target-specific capability classification and owner dispositions: preserve/correct/exclude/defer |
| `tests` | external stimulus, oracle, required observables, tolerance and independent evaluation scope |

**No invented precision.** Static source analysis may discover that a privileged browser API is called; it does not prove the application succeeds in every runtime condition. Never serialize guesses as verified semantics.

## 4. Proposed modular API (illustrative, implementation neutral)

Each interface has explicit version, errors and provenance. Signatures below express responsibilities—not a frozen TypeScript, Python or C# binding.

```text
Intake.inspect(input: ExtensionPackage, policy: ReadPolicy)
  -> Inventory + Findings

Analyzer.derive(inventory, sourceAccess, observationEvidence?)
  -> EIR + ClaimLedger + Unknowns

ContractReview.decide(EIR, ownerChoices)
  -> AcceptedContract + Dispositions + ApprovalProvenance

TargetAdapter.assess(acceptedContract, targetCapabilities)
  -> SupportMatrix + Gaps + RequiredPrivileges + ProposedAlternatives

Planner.plan(acceptedContract, assessments, constraints)
  -> TargetPlan + DependencyDecisions + AcceptanceMap

Generator.emit(targetPlan)
  -> SourceProject + BuildInstructions + TraceabilityMap
  // generating files does NOT confer equivalence

Runner.buildAndExercise(sourceProject, sandbox, syntheticFixtures)
  -> BuildResults + RuntimeTraces + EffectProbes

IndependentEvaluator.judge(contract, holdoutFixtures, traces, actualEffects)
  -> PASS|FAIL|UNKNOWN per invariant + EvidenceBundle

Continuity.record(periodId, contractVersion, decisions, results)
  -> AdditivePeriodAddendum
```

**Separation of concern:** adapters own OS/host integrations and concrete UI, not the domain contract. Analysis and generation must be callable independently. All decisions and generated behaviors link back to source evidence or an explicit owner-approved change. Treat third-party extension code and documents as **untrusted input**, never executable instructions to the agent.

## 5. Output expectations

- **Android v0 target:** React Native/Expo *when fit*, with justified native modules/prebuild or alternative Kotlin implementation when browser-like assumptions fail. Produce an Android app, not a disguised extension.
- **Windows/Linux v0 target:** a common C# Avalonia solution with platform-specific packaging, OS integrations, permission boundaries and independent runtime verification on *both* platforms.
- **Portable target family:** avoid encoding React/Avalonia into EIR. A third adapter (web, CLI, Swift, Flutter, etc.) must be possible without revising capability meaning.
- **Always accompany generated source with:** contracts, uncovered behavior, build/test commands, asset/license ledger, environment and secret needs, migration plan, security/privacy findings and acceptance evidence.

## 6. Blind synthetic qualification matrix

Before any real-world subject, create at least four **independently designed** toy extensions:

| Fixture class | Distinct failure risk | Expected honest outcome |
| --- | --- | --- |
| Popup-only form/settings | state persistence, validation, focus, accessible UI | functional native reconstruction |
| Event/background worker | startup/shutdown, alarms, scheduling and offline state | lifecycle-appropriate target mapping with truthfully noted limits |
| Content-script / DOM integration | inaccessible browser tab DOM in native app | companion integration or explicit unsupported gap; never fake |
| Downloads/file organizer | scoped filesystems, permissions, byte integrity, collision/retry | native file APIs and tested bytes or reported unsupported |

Add out-of-distribution holdouts chosen **after** contracts freeze: multi-frame injection, browser identity, context menus, conflicting storage states, permissions denial, malicious content, network retries and inaccessible third-party APIs. Do not tune shared templates to hidden holdouts. Passing four synthetic fixtures qualifies a research prototype, **not** “any extension” production compatibility.

## 7. Validation gates — current status: unfulfilled

- **F0 DESIGN FREEZE:** neutral ontology and adapter contract reviewed, machine-readable schemas and conformance fixtures published, no real extension consulted.
- **F1 INTAKE:** arbitrary authorized fixture package parsed into complete source inventory, parser failures recover gracefully.
- **F2 EXPLANATION:** evidence-linked graph of capabilities, permissions, data/state, side effects and limits; human can inspect and challenge.
- **F3 GENERATION:** selected capability yields buildable Android and Avalonia projects without extension-specific generator changes.
- **F4 OBSERVED PARITY:** independent evaluator confirms behavior and real effects including denials/error conditions on Android device/emulator, Windows and Linux.
- **F5 DIVERSITY:** different fixture architectures plus withheld subjects work, with measured unsupported surface and manual intervention rates.
- **F6 RELEASE:** security/permissions/identity, native UX, accessibility, install/update/uninstall, migration/recovery, licensing, observability and distribution verified by target OS.
- **F7 FIELD VALIDATION:** only after above, offer selected real extension as an external trial; Keepsake may be one later candidate.

Per-gate evidence is `PASS / FAIL / UNKNOWN / NOT RUN`; each result records artifacts, source revision, platform, tool versions and evaluator independence. A build is not behavioral parity and behavioral parity is not production approval.

## 8. Why this is a reconstruction paradigm, not another converter

The pipeline retains a **semantic causal model and evidentiary history** as the durable artifact; code is a replaceable realization. Its principal differentiators are cross-medium purpose preservation, explicit privilege/permission gaps, agent-and-human discoverability, independent effect verification, evidence-backed decision traceability, and additive historical Period Documents. This is a research direction, not a claim of unique invention, universally solved program synthesis, or demonstrated superiority.

## 9. Implementation next — with NO real extension supplied

1. Formalize EIR v0.1 as JSON Schema with explicit source references and unknown states.
2. Implement a read-only manifest/permission/entrypoint/asset intake CLI with fixture-only tests.
3. Add a capability-ledger generator showing proven facts versus inferred behaviors.
4. Implement `TargetAdapter.assess` independently for Android and desktop before generating applications.
5. Build generic minimal output projects, exercise on targets, and develop withheld-fixture evaluator.
6. Record each phase's evidence in P001 addenda. No real extension ingestion until F0–F2 are reviewed.
