# Research profile — Drift, Negative Transfer, and Target Isolation

**Project:** Any-Shape; `forever-works/` continuity package. **Period:** P001, 2026-10-15. **Status:** research-grounded proposed mitigation and evaluation design, **not yet experimentally validated** for Any-Shape. **Owner hypothesis:** Forever Works' explicit intent/implementation separation and per-target evidence, combined with hard architectural boundaries, can reduce cross-target contamination enough for an agent to generate Windows, Linux and Android Avalonia products in one coordinated run or fewer runs.

## Problem and terminology

"Contamination" alone is imprecise; distinguish **observable software errors**, **agent-context mechanisms**, and **claims about learning**. Terms below are operational definitions for this project, with research parallels rather than assertion that a particular agent internal state has been diagnosed.

| Term | Meaning relevant to our experiment | Observable failure / test |
| --- | --- | --- |
| **Negative transfer** (established transfer-learning term; application here is analogy/hypothesis) | Applying knowledge effective in a source domain worsens performance in a different target domain | Reusing desktop file dialog patterns on Android causes failed or unusable file selection |
| **Cross-target assumption leakage** (project operational term) | Desktop assumptions enter Android implementation without target-specific authorization or evidence | Windows path conventions or keyboard shortcuts in Android adapter |
| **Context interference / task interference** (descriptive, not a direct diagnosis of model internals) | Mixed target instructions/examples reduce reliability or cause incompatible implementation choices | Regressions or wrong imports when the agent sees both desktop and Android advice |
| **Specification drift / requirements drift** (engineering usage) | Implemented intent gradually diverges from accepted functional requirements as iterations accumulate | Source-specific convenience becomes treated as mandatory domain semantics |
| **Architecture erosion / architectural drift** (engineering usage) | Implemented dependency structure diverges from declared layers and constraints | Shared Domain imports Android or Windows OS APIs |
| **Platform variability leakage** (project term; software product line parallel) | A choice meant for one configured product appears in another product variant | Desktop window model assumed to be Android's navigation model |
| **Overgeneralization / false equivalence** (project terms) | Similar-looking components are assumed behaviorally interchangeable | Avalonia Windows compile is reported as Android runtime proof |
| **Evidence laundering** (project term) | Proposed/inferred/generated claim becomes presented as verified by repetition or serialization | An unexecuted Android test marked PASS |
| **Long-context positional sensitivity / lost-in-the-middle** (empirically studied) | Relevant constraints may receive weaker use when embedded among extensive context | Critical Android constraint ignored when placed midway through a lengthy agent dossier |
| **Catastrophic forgetting** (established training/continual-learning term, NOT presumed here) | A learned model loses prior-task performance after subsequent training | Not an appropriate label merely because a single untrained coding session forgot an instruction; describe such cases as context loss or regression |

**Research grounding:** the negative-transfer survey defines performance degradation under poorly suited transfer; software product-line research formalizes commonality and variability; requirements traceability links requirements to artifacts; *Lost in the Middle* empirically demonstrates position-sensitive performance on long-context tasks. None directly proves that the particular Forever Works schema prevents wrong-target code generation. That is the question being tested.

## How the continuity format can reduce risk

1. **Stable neutral intent** (`intent`, `capability`, `invariant`, `constraint`): domain requirements declare **what** must remain true, not a desktop widget or Avalonia mechanism. Source code does not outrank accepted semantics.
2. **Implementation and dependency records:** platform mechanisms are explicitly classified as replaceable. Explain **why selected, what performed, how replaceable, and what must be retested**.
3. **Per-target applicability and variability:** every obligation and implementation has target applicability (`windows`, `linux`, `android`) and one of applicable/unsupported/not-applicable/unknown; distinguish shared semantics from shared code. Place proposed fields within a namespaced project extension, never unreviewed new canonical record kinds.
4. **Typed module boundary contracts:** Domain/Application may depend only on neutral contracts; target adapters depend inward. Machine-enforced reference rules make accidental import of desktop APIs into Android or common domain fail checks.
5. **Claim-evidence links:** each target receives *its own* build/runtime/effect/accessibility verdict; Windows PASS is never transitive proof for Android. Closed-world evaluation makes missing proof UNKNOWN/PARTIAL.
6. **Minimal, scoped agent briefs:** agent sees the enduring invariants and **only the relevant host constraints** for the current stage, retrieved by target. Long prose is indexed and traceable, not dumped indiscriminately.
7. **Immutable accepted baseline:** periodically record specification hashes, fixture versions and agent decisions; proposed optimizations that change semantics require review. Drift is measured as divergence from that baseline.
8. **Period Documents:** historical choices stay attributable to time/target. An old desktop workaround does not silently become contemporary Android policy.
9. **Independent oracle:** cross-target conformance is evaluated by probes separate from the generation agent, including negative permissions, resource constraints and actual external effects.

## Model for a single coordinated Avalonia run

```text
Accepted neutral behavior contract (frozen)
  ├─ Shared domain model + verified invariant fixtures
  ├─ Windows host plan: explicit UI/OS lifecycle, privileges, runtime tests
  ├─ Linux host plan: explicit UI/OS lifecycle, privileges, runtime tests
  └─ Android host plan: explicit touch/navigation, scoped storage, privileges, runtime tests

Each host emits artifacts + independent evidence, all traced to the neutral contract.
Target failure cannot overwrite another target's result; core changes rerun all affected tests.
```

The format should enable a run controller to ask: **Is this shared because meaning is invariant? Because implementation is portable and tested? Or merely because it resembles an earlier solution?** Only the first two support reuse. Shared framework identity is not proof of shared OS behavior.

## Minimum formal metadata (proposed project-local shape)

```json
{
  "contractId": "capability.open-attachment",
  "semanticScope": "shared",
  "targets": {
    "windows": {"applicability": "applicable", "adapter": "windows-files", "verification": "unknown"},
    "linux": {"applicability": "applicable", "adapter": "linux-files", "verification": "unknown"},
    "android": {"applicability": "applicable", "adapter": "android-scoped-storage", "verification": "unknown"}
  },
  "reuseJustification": "shared intent, platform-scoped file operations",
  "provenance": "agent-proposed",
  "evidenceIds": []
}
```

This is **illustrative, not an implemented validator or existing Forever Works standard schema**. A future project-local JSON Schema should reject undeclared targets, unknown adapter IDs, incompatible dependency scopes, or evidence falsely referenced across targets.

## Experiment: does the format actually reduce interference?

**Hypothesis H1:** with frozen neutral contracts, scoped architecture and automated boundary validation, one coordinated Avalonia run yields **fewer cross-target implementation defects** than a prompt-only unstructured run at comparable effort.

**Hypothesis H2:** target-indexed selective context reduces omitted target requirements compared with indiscriminate all-target context.

**Hypothesis H3:** a single coordinated run with enforceable boundaries can achieve comparable target conformance at lower total agent turns/compute/time than three separately started runs, without hiding failures.

**Design:** identical synthetic extension requirements; randomized/counterbalanced fixture order and target order where feasible. Compare: (A) unstructured one-run baseline, (B) structured Forever Works one-run with boundary checker, (C) sequential structured runs. For contrast, a separate React Native Android run tests framework dependence but does not itself isolate cause of single-run effects. Hold evaluation fixtures out of reconstruction context; pin model/toolchain/dependencies; repeat several trials rather than extrapolate from one.

**Metrics:** cross-target leak count (OS-specific imports, wrong permissions, wrong navigation); source-to-contract trace coverage; correct/incorrect reuse decisions; independent platform PASS/FAIL/UNKNOWN; number and severity of runtime defects; human interventions; agent tokens/turns/elapsed time; duplicated code; accessibility and functional effects. Include confidence intervals/variance if repetitions permit. Categorize observed error modes, not imagined cognition.

**Acceptance:** the experiment may show improvement, neutral effect or degradation. A successful one-run proof needs three independently exercised targets, verified negative and real-effect cases, no unresolved prohibited cross-target coupling, and an evidence ledger disclosing every unsupported requirement. Compiler-only proof is insufficient.

## Documentation / standards policy

- Preserve research references and operational definitions adjacent to mitigation rules; never imply research directly established this implementation's effectiveness.
- Keep Forever Works standard independent and language-neutral; Any-Shape's target-scope fields are a **candidate profile** until schema/conformance changes are reviewed in the separate upstream project.
- Make WHY / WHAT / HOW TO REPLACE / PROOF mandatory *documentation sections* for new adapters and bridges in the Any-Shape inheritance package.
- Avoid prompt-only prevention claims: actual architecture linting, versioned schemas, run orchestration and evaluators remain **NOT IMPLEMENTED** at the time of this document.

## Research references

1. Wen Zhang et al., *A Survey on Negative Transfer*, IEEE/CAA Journal of Automatica Sinica (2022), https://www.ieee-jas.com/en/article/doi/10.1109/JAS.2022.106004
2. Felix Bachmann and Paul Clements, *Variability in Software Product Lines*, Carnegie Mellon SEI (2005), https://www.sei.cmu.edu/library/variability-in-software-product-lines/
3. Ivan Machado et al. and related SPLE literature on commonality/variability and product variant evaluation; https://www.sciencedirect.com/science/article/pii/S0950584910000625
4. Nelson F. Liu et al., *Lost in the Middle: How Language Models Use Long Contexts*, TACL 12 (2024), https://aclanthology.org/2024.tacl-1.9/
5. Requirements traceability systematic review, Journal of Systems and Software (2018), https://www.sciencedirect.com/science/article/pii/S0164121218301754
