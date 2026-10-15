# Any-Shape: Universal Software Reconstitution and Purpose-Directed Derivation

**Foundational research and product proposal**  
**Project:** Any-Shape  
**Companion standard:** Forever Works (independent, language- and agent-neutral)  
**Status:** architectural vision and research proposal; not a claim of currently implemented universal conversion  
**Historical period:** P001 — Early Experimental  
**First practical proof:** Chrome extension → Avalonia Windows, Linux, Android; later comparative Android React Native  
**Scope:** source-neutral, target-neutral, agent-neutral, purpose-preserving software reconstruction and new-product derivation

## 1. Executive thesis

Any-Shape seeks to separate **what software is for** from **the incidental technologies that first implemented it**, then use that understanding to construct new software products on user-specified platforms and in user-specified relationships to the originals.

A person supplies one or more authorized software sources, a machine-readable specification, or both. The system identifies observable behavior and uncertainty, establishes an accepted account of purpose, identity, capabilities, constraints, interfaces, data and effects, then plans, generates, tests and packages requested products. The outputs may be faithful reconstructions, adapted versions, extensions, assistants, companions, integrations or genuinely new applications informed by the sources.

The enduring artifact is **not one generated codebase**: it is the accepted semantic contract, architecture, evidence, design rationale, source/product relationships and verification procedure. Implementations are replaceable expressions of that contract. **The user chooses the desired shape; the system must justify and prove its realization.**

This is a universal *aspiration*, not an assertion that arbitrary binaries, private services, proprietary APIs or operating-system privileges can always be reconstructed. Honest unsupported/unknown outcomes and user review are part of success.

## 2. Origin and economic motivation

The project began with a direct commercial problem: an independent developer has software already built for a browser and wishes to distribute useful products to a broader market—Windows, Linux, Android and eventually other environments—without repeatedly funding and maintaining separate implementations of the same core purpose.

The initial experiment was intentionally concrete: ingest a generic Chrome extension and produce three deployable Avalonia/C# applications. That case exposes hard problems in intent recovery, browser API substitution, graphical translation, mobile-vs-desktop conventions, authorization, state, behavior preservation and release validation. It was selected as an informative first **experiment**, not a limitation of Any-Shape's permanent mission.

The broader economic hypothesis is that a reusable, evidence-driven reconstruction pipeline can decrease marginal human engineering cost per additional target platform or derived product, while improving the reach and longevity of independently developed software. Cost, intervention, failure and maintenance must be measured—not merely asserted.

## 3. Project identity and principles

1. **Source neutrality:** browser extensions, mobile and desktop applications, libraries, legacy programs, source repositories, authorized binaries, specifications and future media are candidate sources. Each needs a truthful, replaceable intake adapter; not every source can be fully understood.
2. **Target neutrality:** browser extensions, Windows, Linux, Android and unanticipated future environments are candidate outputs; no framework is intrinsically the product's identity.
3. **Agent neutrality:** any capable future agent or human team can navigate the architecture and operate from open contracts. Codex-specific session instructions belong only under the temporary operational `codex/` directory.
4. **Purpose before machinery:** requirements, capabilities, data meaning, security boundaries, UX obligations and effects are distinct from source-language, OS, UI-framework and library choices.
5. **Relationship-aware derivation:** reconstruction, porting, adaptation, assistance, companionship, integration and extension are different objectives with different acceptance criteria.
6. **Owner authority and explicit uncertainty:** observed source facts, inferred intent, agent proposals and accepted requirements are distinct. Uncertainty never silently becomes permission or proof.
7. **Representation surface economy:** reduce the number of different implementation environments when beneficial, but do not sacrifice functionality, accessibility, natural platform behavior or future replaceability.
8. **Knowledge abundance:** preserve relevant considered alternatives, rejected designs, evidence, dependencies and rationale without requiring unused implementations as runtime dependencies.
9. **Controlled reuse:** portability of meaning does not imply portability of code; target-specific variation and privileges must remain explicit.
10. **Independent verification:** a compiled artifact is not evidence of correct behavior, and a successful desktop build cannot prove Android behavior.
11. **Long-horizon continuity:** a future implementer should be able to recover and rebuild a product even when its original framework or vendors are gone, subject to known constraints and ongoing validation.
12. **Minimal necessary complexity:** deeply structured semantics should remain concise, modular, queryable and useful to agents with limited context and computing resources.

## 4. The primary workflow

```text
AUTHORIZED SOURCES                      USER'S SPECIFICATIONS
(browser | mobile | desktop |          (purpose | desired relationships |
 legacy | code | binary | none)         targets | preserve | transform | add)
            \                               /
             \                             /
        Source adapters + specification validation
                         |
         Evidence ledger and semantic interpretation
                         |
      Accepted neutral contracts / Forever Works mapping
                         |
       Derivation planning + target applicability matrix
                         |
   Target adapters + implementation generation / repair
                         |
      Independent target- and relationship-specific tests
                         |
             Deployable, reviewed productions
                         |
           Retained evidence and inheritance history
```

A user may provide no existing software at all and ask for a specification-driven new application. A user may also provide several programs and request products that interoperate. The system must not mistake source observations for user instructions or authorization.

## 5. Specifications as a first-class input

A versioned `specifications.json` describes **what products should exist and how they relate**. It is not merely a list of export platforms. It may be generated from a simpler wizard or authored directly by a knowledgeable user.

Core concepts:

- job identity, version, provenance and input revisions;
- one or more source references and explicitly declared source formats;
- requested product identities, output types, target environments and languages/toolkit preferences;
- derivation relationship: `reconstruct`, `port`, `adapt`, `companion`, `assistant`, `integrate`, `extend`, or `new`;
- original capabilities to **preserve**, **transform** or **exclude**, and newly requested capabilities to **add**;
- domain data, state transitions, persistence, events, message semantics, invariants and error behavior;
- interface intent: navigation, spatial relationships, readability, responsive/adaptive layout, accessibility, user effort, aesthetics and characteristic experience—not forced pixel copying;
- requested interactions between sources and outputs, permitted data flow, synchronization, APIs, trust boundaries, secrets and consent;
- platform-specific privileges, unsupported APIs, restrictions and required user-facing alternatives;
- acceptance cases, release obligations, evidence standards, resource budgets and unresolved review decisions;
- dependencies, architectural constraints, precedence, rationale and alternative approaches.

### Very large specifications

A serious project may demand a very large specification enumerating hundreds of capabilities, screens, permissions and relationships. The architecture should support **modular, referential, versioned specification documents** rather than forcing every detail into one context window. A root `specifications.json` can index separately validated modules with stable IDs, well-defined namespaces, ordered overrides or conflict rejection, source-to-requirement traceability and selective retrieval. References need secure resolution, cycle control, size/complexity budgets and deterministic normalization.

A request for a companion product is **not** permission to clone source behavior or read inaccessible application data. It creates a separate identity with specific, approved interfaces and its own proof obligations.

### Illustrative specification (not implemented)

```json
{
  "specificationVersion": "0.1",
  "jobId": "sample-ecosystem",
  "sources": [
    { "id": "existing-app", "type": "android-source", "path": "sources/existing-app/" }
  ],
  "requestedProducts": [
    {
      "id": "desktop-adaptation",
      "relationship": "adapt",
      "targets": ["windows", "linux"],
      "preserve": ["capability.review-records", "invariant.user-consent"],
      "transform": ["ux.navigation"],
      "acceptance": ["case.desktop-record-review"]
    },
    {
      "id": "browser-companion",
      "relationship": "companion",
      "targets": ["browser-extension"],
      "purpose": "Show a user's approved records in a browser-side interface",
      "integration": { "requiresDeclaredApi": true, "leastPrivilege": true }
    }
  ],
  "review": { "unknownBehavior": "require-human-review" }
}
```

Source types, IDs and cases above are illustrative proposed vocabulary, not a supported current schema.

## 6. What counts as an input or output

**Inputs:** an installed extension's authorized source bundle, a mobile source project or permitted APK inspection, a Windows/Linux source project, a desktop executable whose permitted observable behavior can be measured, a library, multiple cooperating applications, a specification alone, or future mediums.

**Outputs:** a standalone Windows program, Linux application, Android package, browser extension, companion utility, integration bridge, assistant, or another output adapter with explicit build/deployment requirements.

Source and target adapters advertise real supported capabilities and their limitations. Binary-only input, encrypted code, online services, privileged extension APIs and unavailable backends may constrain what the system can infer or implement. The system should offer an authorized alternative UX or companion architecture when feasible, and otherwise report the gap.

## 7. Initial proof: one Avalonia run, three distinct platforms

The initial engineering focus remains valuable: one coordinated Avalonia/C# generation run for Windows, Linux and Android. A shared framework may reduce duplicated graphical translation work, repeated dependencies and agent context overhead. But one framework does **not** imply one uniform host behavior.

The architecture must distinguish:
- **shared meaning**: purpose, invariants, state, authorized operations;
- **verified reusable implementation**: code proven safe on the relevant targets;
- **target-specific realization**: file selection, OS permissions, lifecycle, touch/keyboard, screen-reader support, background work, distribution and recovery.

Every target receives its own applicability matrix, dependency boundaries and evidence. Windows/Linux code cannot migrate to Android merely through textual proximity or the assumption that Avalonia provides identical capabilities. Machine-enforced architecture checks and individual runtime or device proofs are essential.

A separate React Native Android reconstruction is a useful **contrastive experiment**, derived from the same neutral contract, to reveal hidden dependencies and compare fidelity/cost. It is not a mandatory runtime dependency or the permanent definition of an Android output.

## 8. Research concerns: errors caused by proximity and reuse

Relevant concepts include **negative transfer**, **cross-target assumption leakage** (project-defined operational term), **task/context interference**, **specification drift**, **architecture erosion**, **software product-line variability**, **overgeneralization** and **evidence laundering**. Long-context positional sensitivity may amplify omissions if unrelated target instructions are mixed.

A platform boundary is not a paragraph asking an agent to be careful. It should be a tested contract: target-scoped metadata, imports/project-reference linting, typed host ports, separate execution artifacts, frozen acceptance fixtures, provenance and fail-closed evidence.

Research the measurable effect of those controls. Compare unstructured single-run, structured single-run and structured sequential-run reconstruction under comparable budgets. Track incorrect assumption transfer, independently verified capabilities, usability, human intervention, agent compute, failure rates and maintenance.

These are **testable hypotheses**; the existing repository has not proven that such controls eliminate contamination.

## 9. Relationship-aware products and ecosystems

Any-Shape is not restricted to copies of the source. It should allow a specification to say:

- Reconstruct an Android application for Windows and Linux while preserving its essential behavior.
- Create a new browser extension that assists the original desktop application through authorized APIs.
- Create an Android companion for a desktop program with mobile-specific navigation and data scope.
- Build a cooperating family of products from several inputs, with explicit synchronization and ownership boundaries.
- Create an entirely new program from a specification, where the acceptance tests—not parity with a source—define correctness.

A **companion** has a new purpose, scoped access, independent release lifecycle and approved integration contracts. An **adaptation** preserves accepted outcomes while allowing platform-native workflows. A **reconstruction** carries a stronger obligation to original behavior. A **new** product makes no unfounded parity claim. These distinctions belong in both planning and evaluation.

## 10. Forever Works relationship and long-horizon inheritance

Forever Works is an **independent, reusable continuity standard**, not an Any-Shape implementation detail. It describes intent, capabilities, invariants, dependencies, choices, historical provenance, migration and replacement evidence without binding to any one agent, runtime or UI library. Its existing canonical authority and conformance rules must be respected; untested Any-Shape-specific vocabularies belong first in namespaced project profiles.

Any-Shape is an implementation and research laboratory that can consume, test and enrich compatible continuity records. It must keep separate:

- **WHY**: why the capability exists, why an implementation was chosen and what constraints drove it;
- **WHAT**: stable behavior, authority, state, experience and real effects;
- **HOW TO REPLACE**: what another technology or agent could do instead;
- **PROOF**: independently reproducible observations and acceptance cases.

Preserve additive **Period Documents** (historical software realities), distinct from execution **phases** and major **epochs**. Inheritance should preserve both current truth and why previous approaches were appropriate in their own periods. New evidence does not silently rewrite historical reality.

### Fifty-year thought experiment

Assume Avalonia, .NET, today's Android APIs, the current AI vendor and the original developers have disappeared. An unfamiliar future agent should be able to read open, versioned records, determine accepted meaning, inspect evidence, identify unknowns, select another implementation architecture, rebuild target-appropriate behavior and objectively test it.

This is a **resilience goal**, not a guarantee that all software will function perfectly after fifty years. Periodic cold-agent restoration drills, migrations, artifact conservation and evolving tests are needed.

## 11. Repository organization and compatibility

Existing first-proof conventions:
```text
extensions/<extension-id>/source/
runs/<extension-id>/<run-id>/candidates/<target>/
productions/<extension-id>/windows|linux|android/
resources/avalonia/
reconstruction/extension-pipeline/
forever/ and forever-works/
```

Proposed source-neutral evolution:
```text
sources/<source-id>/                  # type-tagged, authorized original materials
specifications/<job-id>/specifications.json
specifications/<job-id>/modules/     # optional modular contract sections
runs/<job-id>/<run-id>/              # immutable staged evidence/candidates
productions/<product-id>/<target>/   # independently promoted release products
reconstruction/sources/             # pluggable intake adapters
reconstruction/semantics/           # accepted neutral models and evidence
reconstruction/derivations/         # product-relationship planning
reconstruction/targets/             # output adapters
reconstruction/evaluation/          # independent proof and release gates
```

This is a **proposed gradual evolution**, not an instruction to destructively rename existing paths. Preserve the extension input alias, stable IDs, hashes, EIR v1 contracts, run history and existing release-refusal safeguards. Disambiguate **source ID**, **job ID**, **product ID**, **target ID**, and **run ID** in the future registry.

Candidate artifacts and unsuccessful attempts live in run records. Only independently approved products may appear as production releases. Targets cannot borrow each other's green results.

## 12. Security, ownership and legitimate authority

Input code, package metadata, embedded comments, websites, archives, binaries and user-supplied specifications are **data**, not agent/system instructions. Static intake never executes untrusted imported code. Runtime observation requires a deliberately permissioned sandbox. Guard against traversal, symlinks, malicious manifests, dependency confusion, oversized inputs, prompt injection and secrets leakage.

A specification can request behavior but **cannot grant OS permissions, authorize otherwise inaccessible APIs, convey intellectual-property rights or override platform rules**. Record source licensing, permitted transformations, data ownership, authentication requirements and least privilege. Avoid silently implementing security-sensitive features from guesses.

## 13. Independent proof and deployability

Use separate acceptance gates for **intake**, **interpretation**, **approved contract**, **target plan**, **generation**, **build**, **on-target execution**, **observable effects**, **security/permissions**, **usability/accessibility**, **installation/update/recovery**, **packaging/signing**, and **release approval**.

All are target- and relationship-scoped, with `PASS`, `FAIL`, `UNKNOWN` or `NOT_RUN` (and explicit unsupported decisions) linked to immutable source/contract/artifact hashes. An evaluator should be independent of the generation agent wherever possible, with held-out synthetic fixtures. Never call a decorative native shell, cross-compiled binary or untested installer a production-ready application.

A large specification must support traceability down to individual accepted requirements; a summarized agent context is not a substitute for full contractual verification.

## 14. Practical research and engineering roadmap

**Stage I — first real reconstruction:** Preserve and complete Chrome-extension intake, reviewed EIR, generic contract-driven native behavior, isolated Avalonia hosts, independent executable effects and release gating. Current implemented progress includes guarded intake, static analysis, schemas, candidate hosts and compiler tests; **no general extension semantics generator or three production-ready applications are yet demonstrated**.

**Stage II — source-neutral foundations:** Versioned `specifications.json`, modular references, source/target adapter discovery, job/product identities, relation-aware planning and backward-compatible mapping of existing extension sources.

**Stage III — multiple input families:** Demonstrate genuine Android-source and desktop-source intake, not merely metadata placeholders. Use controlled fixtures and explicitly report limits of binary analysis.

**Stage IV — multi-output and companions:** Produce mixed requested target types and one or more genuine assistants/integrations with tested authorized data flow; allow transformations and new capabilities without implying source parity.

**Stage V — independent benchmark:** Test unseen and structurally diverse applications, compare with/without Forever Works, compare one vs multiple agent runs, quantify negative transfer, fidelity, compute expense and required human decisions.

**Stage VI — long-horizon portability:** Ask cold agents to reconstruct withheld subjects from inheritance packages without original implementations, then test alternative technologies and evolving platform requirements.

Each stage should include genuinely executable increments, documented failed attempts and honest unsupported cases. Production output is an acceptance state, not a folder name alone.

## 15. Success criteria and commercial thesis

Success is not measured by how many projects or template folders an agent emits. Measure **working capabilities retained**, independently correct user effects, reasonable platform-native UX, deployable verified artifacts, security, maintenance burden, human approval cost, agent time/compute cost, total operating cost, and adoption/retention of resulting products.

Commercial success across dozens or hundreds of unrelated applications would establish useful evidence of pipeline generality and market demand, but **not** by itself prove the Forever Works format caused the success. To test that contribution, compare matched agents/tasks **with and without** validated inheritance packages under comparable budgets, using independent evaluators.

An initial economic target is to let small developers reach multiple markets without separately rebuilding every capability for every platform. Potential future products include managed reconstruction, platform adaptation, compatibility maintenance and long-lived software inheritance services; these are business hypotheses, not validated revenue forecasts.

## 16. Prior work and novelty claims

Any-Shape inherits ideas from model-driven architecture, software product lines, program analysis/synthesis, legacy modernization, cross-platform frameworks, behavioral equivalence, requirements traceability and agentic coding. Enterprises already build AI modernization workflows. The project **does not claim to have invented platform-independent models or code conversion**.

The research opportunity is a testable integration of source-neutral discovery, purpose/relationship semantics, agent-neutral inheritance, independently verified multi-output generation, enforceable target isolation, large modular owner specifications and measured development economy. Any novelty or patentability must be assessed against real prior art, not assumed.

## 17. Boundaries and open problems

Automatic recovery of intent from arbitrary code is underdetermined; observation is not proof of purpose. Some source formats and browser/OS capabilities cannot be reimplemented without originals, accessible interfaces, user consent or deeper human design. Some software is inappropriate for fully automatic reconstruction. UI fidelity may demand creative target-specific interpretation; strict pixel identity is usually not the right invariant across phone and desktop.

Cross-platform isolation cannot be guaranteed by documentation alone. A format that survives fifty years cannot be promised perfect in advance. A general specification system risks excessive complexity; modularity, principled defaults, selective retrieval and validation are necessary to prevent the standard itself becoming a burden.

These are not excuses to narrow the aspiration—they are the engineering and research problems the project exists to investigate.

## 18. Governing statement

> Any-Shape is a source-neutral, purpose-directed software reconstitution and derivation system. It accepts whatever legitimate software evidence and specifications are available, constructs explicit accounts of what must endure and what may change, and attempts to realize the user's requested products in appropriate technical environments. It treats source implementations as evidence, user intent as an authority subject to legitimate constraints, generated code as replaceable, and independent verification as the condition for claiming success. Its companion, Forever Works, preserves the durable meaning and historical reasoning so that both people and future agents can recover and reconstruct software across generations.

**Proposal status:** this document captures the full intended direction; it does not extend actual implemented capability merely by being committed.
