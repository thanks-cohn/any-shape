# Any-Shape: Invariant Experience and Accumulated Purpose
## A foundational research charter for AI-era software continuity

**Status:** Owner-directed vision captured 2026-10-15; architectural mechanisms and conformance rules below are *proposals*, not verified capabilities.  
**Scope:** Every shape of interface and later cross-platform reconstruction; responsive browser behavior remains the earliest proving ground.  
**Companion documents:** [Project Essence](PROJECT_ESSENCE.md), [Transformation and Degradation](TRANSFORMATION_AND_DEGRADATION.md), [Long-Horizon Vision](ANY_SHAPE_LONG_HORIZON_VISION.md), [Reconstruction Acceptance](../RECONSTRUCTION/CONFORMANCE_AND_ACCEPTANCE.md), and the repository's pinned Forever Works specification.

> **The form may change. The identity must remain.**  
> **Software should inherit its ancestors' accomplishments, not merely imitate their appearance.**  
> **Preserve the human outcome; account for every lost capability; independently verify what survives.**

## 1. The historical opportunity

Software has traditionally been stored chiefly as executable implementations and their supporting documentation: event handlers, component trees, platform APIs, CSS rules, build scripts, tests, and implicit developer conventions. These artifacts say much about *how* a feature is built and often too little about *why a person values it*. When a framework becomes obsolete, a browser window narrows, or a mature extension moves to a touch-based operating system, implementation-specific knowledge can dominate reconstruction. A feature-rich application may then be reduced to a superficially similar but impoverished generic application.

The emerging opportunity of increasingly capable AI agents is not merely faster code translation. It is **intent-informed reconstruction**: an agent can inspect behavior, identify user goals and design obligations, propose alternative realizations under new constraints, and test whether the intended outcome survived. This opportunity is conditional on evidence and governance. AI inference can be wrong; confidence does not turn a guess into author intent. Any-Shape seeks to preserve the information that makes later, better interpretations possible.

This charter adds two complementary emphases to the existing Any-Shape mission:

1. **Invariant experience across space and shape:** an interface must remain aesthetically coherent, structurally navigable, comprehensible, readable, operable and capable of its authorized input/output effects as its viewport, geometry, modalities and resources change.
2. **Accumulated purpose across time and implementations:** complex software contains valuable decisions and hard-won functionality. Reconstructors should inherit that sophistication by modeling *purposes*, not just copying widgets or reducing the product to a category stereotype.

These ambitions extend the existing ontology and acceptance model; they do **not** replace it, redefine Forever Works' canon, or imply that Any-Shape currently performs autonomous general conversion.

## 2. The first proving ground: the changing browser window

The foundational Any-Shape problem is not Android conversion. It is the integrity of an application as the *same browser window* shrinks, grows, changes aspect ratio, loses vertical space, increases font size, switches input modality, or reveals much longer content.

A high-grade interface must retain:
- **Aesthetic integrity:** deliberate visual hierarchy, rhythm, grouping, legibility and product identity rather than a mechanically compressed or generic-looking layout.
- **Structural navigability:** a coherent mental map of location, available actions, parent/child relationships, return paths and visible state.
- **Comprehension and readability:** reflowed readable content; understandable labels, errors, status, instruction and relationships; compatibility with user text enlargement.
- **Operability and effect continuity:** input can be entered and corrected, actions can be found and activated, validation remains intelligible, and intended state changes and authorized outputs actually occur.
- **Comfort and economy of effort:** transformations do not impose unnecessary precision, menu depth, cognitive load, repeated gestures or disorienting context switches.
- **Access and trust:** keyboard, touch, assistive access, permissions, privacy, reliable errors and honest limitations remain meaningful.

These are **experience invariants**, not pixel invariants. A sidebar may become a drawer; a multi-pane editor may become an ordered workflow; controls may move into a tool palette. A compact interface is *not* successful merely because nothing overflows. Nor is a clean screenshot proof that hidden operations still work.

Test a *continuum* rather than only named device breakpoints: wide, medium, narrow and very narrow layouts; short windows; extreme aspect ratios; intermediate widths; content expansion; browser zoom and OS text scaling; touch and keyboard; focus retention and error recovery. Never shrink essential text merely to conceal a compositional defect. When the medium genuinely cannot accommodate a feature, account for its loss.

Standards supply concrete baselines, not an exhaustive aesthetics oracle: WCAG 2.2 SC 1.4.10 addresses reflow at a 320 CSS-pixel-equivalent width for vertically scrolling content subject to its exceptions; SC 1.4.4 addresses 200% text resizing without losing content or functionality. Apply the actual success criterion and exceptions rather than using a single viewport screenshot as a compliance claim.

## 3. From feature parity to purpose parity

Conventional porting questions often begin, “How do we reproduce this widget?” Any-Shape's more useful question is, **“What valued human outcome did this capability exist to achieve, and how can this environment best deliver it?”**

Consider a sophisticated zoom feature in SUBSTRATE. Its *mechanism* might be a wheel gesture, hover preview, slider or magnification control. Its deeper *purpose* might be:

> Enable people who cannot comfortably read small type to inspect and edit information in a distinctive, aesthetically pleasing and low-effort way without losing context.

On Android, a hover gesture may not exist. A reasonable *candidate* is a touch-and-hold magnification bubble, adaptive text presentation, pinch zoom, or a focused reading mode. The source never had to contain a magnification bubble for it to be a legitimate proposal: it expresses a shared outcome through a different modality.

Yet the agent may not silently infer that a magnifier alone satisfies precise editing. It should test whether fine selection, task context, error avoidance, accessibility and comfort are actually improved. One platform may require several alternatives for different users. Novelty is not itself equivalence.

**Purpose parity** means preserving the accepted *benefit, capability and authorized consequence* at a justified level of fidelity. **Mechanism parity** means reproducing a particular interaction. Either can matter: some gestures are incidental; other details embody users' muscle memory, workflow expectations or product identity. An agent must distinguish them and disclose uncertainty.

## 4. The axiom of invariant experience

> **An application may assume any supported shape, dimension, arrangement or environment. Its presentation may transform, its structures reorganize, and its interaction techniques change, but its essential purpose, aesthetic integrity, comprehensibility, navigability, accessibility, operational utility and authorized effects shall survive within declared constraints.**
>
> **A transformation is not validated by rendering alone. It must demonstrate that the intended work can still be performed, at an appropriate level of comfort and clarity, without silent loss of meaning or authority boundaries.**

“Invariant” is an evaluative obligation, not a promise of identical appearance or universal support. Some hosts cannot deliver an operation; a text-only medium cannot recreate every spatial aesthetic; a private API may be prohibited. In those cases, honest limitation reporting is part of integrity.

## 5. The axiom of accumulated purpose

> **No labor embodied in a software system shall be discarded merely because its original implementation is incompatible with a new environment.**
>
> **Every meaningful capability should be understood through its purpose, intended outcome, causal behavior, constraints, design role and evidence. When direct reproduction is impractical, seek an environment-appropriate expression. When equivalence is impossible, preserve the purpose, record the limitation and leave an intelligible path for future realization.**
>
> **Increasing agent capability should widen the space of defensible solutions, not diminish the value of accumulated work.**

Imagine a polished extension with 200 distinguishable functions. A naïve generated mobile “clone” might reproduce ten generic editor controls. A more capable agent could reconstruct 125 effective capabilities, with some source behaviors consolidated into common mobile interactions. But **200 versus 125 is not itself the success metric**: five original mechanisms may have served one outcome, or one ostensibly minor feature may be mission-critical. Assess coverage at the level of user tasks, semantic obligations and effects, weighted by criticality; report counts only as secondary descriptors.

The source is not infallible. Some historical features are accidental or obsolete. Preservation of purpose is not unquestioning fossilization of implementation. Respect user-directed design choices, do not mistake agent taste for improvement, and require explicit approval for materially changed product semantics.

## 6. Outcome-oriented adaptation and increasing agent capability

An evolving agent might progress from **mechanical copying** (add a zoom button), through **modality translation** (use pinch zoom), to **purpose interpretation** (reduce effort reading small type), **candidate invention** (magnifier, reading mode and typographic reflow), and **independent optimization** (compare task completion, reading comfort, visual orientation and accessibility).

These are reasoning ambitions, not certified maturity levels or assertions about any particular model. Each improvement must still be subjected to bounded experiments, real input/output checks and human review where experience quality is subjective.

The freedom to invent should be coupled to a stronger burden of proof. The further a candidate deviates from the source mechanism, the more clearly its preserved obligation, changed semantics, risks, verification and user consent should be described.

## 7. Proposed durable representation: the Purpose Manifest

Treat a **Purpose Manifest** as a *proposed, versioned, optional extension* of the existing Forever Works-derived ontology and Any-Shape evidence model, not a new competing canonical standard. It might encode, for each capability:

| Dimension | Required question |
| --- | --- |
| Stable identity | Which source capability, object and workflows are being discussed? |
| Human purpose | What user need or benefit motivated it? |
| Provenance | Was this explicitly stated, observed, inferred or newly proposed? By whom and when? |
| Causal contract | What inputs, guards, permissions, state transitions, failures and outputs matter? |
| Presentation role | What hierarchy, aesthetics, discoverability, reading and navigation duties does it serve? |
| Environment | Which geometry, modality, APIs, runtime capabilities, resource budgets and policies apply? |
| Candidate realizations | Which different mechanisms might fulfill the purpose? |
| Acceptance | Which concrete success/failure probes would establish continuity? |
| Evidence | Which source traces, target tests, reviews and receipts support the claims? |
| Disposition | What survived, changed, consolidated, improved, deferred or cannot be supported? |

Preserve links from purpose -> capability -> UI affordance -> operation -> actual effect -> acceptance evidence. A declaration alone is insufficient. Keep human-stated intent distinct from agent hypotheses, with an explicit UNKNOWN outcome when the record cannot determine what the author intended.

### Illustrative record (noncanonical pseudodata)

```json
{
  "schema": "proposal:anyshape/purpose-manifest/v0",
  "capabilityId": "editor.precision-reading",
  "source": {"product": "SUBSTRATE", "mechanisms": ["zoom-control"]},
  "purpose": {
    "statement": "Read and precisely edit small information with minimal effort and retained context",
    "provenance": "agent-inferred",
    "review": "unreviewed"
  },
  "target": {"environment": "android-touch", "constraints": ["no persistent hover"]},
  "candidates": ["hold-to-magnify", "adaptive-type", "focus-reading-mode"],
  "requiredChecks": [
    "fine-text selection remains possible",
    "reading order and focus survive",
    "user can activate without hover",
    "edit operation produces the correct effect"
  ],
  "result": {"status": "UNKNOWN", "evidence": []}
}
```

Do not treat this example as a working parser format, a verified Android design, or a change to the pinned Forever Works schema.

## 8. Capability accounting: no silent disappearance

Every significant source capability should receive one explicit transformation disposition:

1. **Preserved** — the accepted behavior and experience remain materially equivalent.
2. **Adapted** — a different host-appropriate mechanism satisfies tested purpose and effects.
3. **Consolidated** — multiple source affordances map to fewer target affordances without silently losing their distinct duties.
4. **Enhanced** — an independently justified alternative improves one or more measured outcomes while respecting essential identity.
5. **Deferred** — a valuable capability is not delivered; its reason, dependency, owner and future path remain visible.
6. **Unsupported** — real host or policy constraints prevent delivery; feasible alternatives and scope are disclosed.

Track the disposition separately from **PASS / FAIL / UNKNOWN / UNSUPPORTED evidence judgments**. “Adapted” describes a strategy; it is not proof of success. A claimed enhancement requires baseline comparison, not a prettier screenshot. A deferred or unsupported critical workflow prevents an unconditional parity claim.

A **preservation ledger** should contain coverage, task criticality, risk, alternate routes, remaining information loss, and explicit human acceptance. Do not hide omitted actions in a collapsed menu without testing findability. Do not claim write parity from a read-only fallback. Do not claim successful remote effects from a locally animated success badge.

## 9. A practical reconstruction protocol

The long-term agent workflow should be:

1. **Inherit cold.** Read the project purpose, existing Forever Works contracts, source, boundaries and current evidence. Avoid importing the original developer's chat assumptions as unexplained facts.
2. **Establish a baseline.** Run the source safely; inspect visual and agent-facing state; enumerate actual workflows, inputs, validations, side effects, failures and environment constraints.
3. **Extract purposes.** Build evidence-linked capability and purpose records. Separate stated intents, demonstrated behaviors, plausible inferences and unknowns.
4. **Model the target.** Document viewport geometry, display density, available modalities, accessibility, runtime security, network, memory, compute, power and lifecycle constraints.
5. **Design alternatives.** Reuse mechanisms where appropriate; propose modality-native adaptations and purpose-equivalent inventions where better; preserve intentional product identity.
6. **Reconstruct actual operations.** Keep state, persistence, export, authorization, delivery, retry and failure semantics honest; use ordinary maintainable target code, not a decorative screenshot or an unacknowledged WebView substitute.
7. **Independently evaluate.** Compare source and target on fixtures and task scenarios; test viewport transforms, magnification, long labels, focus, accessibility, real permitted effects and resource budgets. Blind evaluators should not inherit answer keys.
8. **Account for change.** Publish capability dispositions, uncertainties, breaking semantic differences, ergonomic tradeoffs, evidence and human-review requests.
9. **Leave inheritable knowledge.** Commit contracts, test fixtures, repair traces, replacement rationale, migration decisions and a reproducible handoff.

Use Forever Works' actual pinned vocabulary and extension/review mechanics when implementing this pipeline; the prose here establishes research direction, not an alternative authority.

## 10. Differentiation from existing approaches

Any-Shape should acknowledge predecessors rather than falsely claiming responsive design, outcome thinking or AI migration were invented here.

| Established approach | What it already addresses | Distinctive Any-Shape research ambition (not yet proven) |
| --- | --- | --- |
| Responsive web design / CSS layout systems | Reflow, breakpoints, container-dependent arrangement | Independently prove semantic, causal, navigational, aesthetic and operational preservation across transformations—not layout alone. |
| Adaptive UI systems such as Flutter | Platform-sensitive layouts and input modes from a shared application architecture | Reconstruct *unfamiliar existing* software from explicit and inferred intent, rather than requiring that software to have been originally authored for one adaptive framework. |
| Accessibility standards such as WCAG | Testable minimum requirements for accessible web content | Integrate accessibility obligations with product identity, purpose, comfort, authorized effects and cross-medium reconstruction; never treat aesthetics as a substitute for compliance. |
| Cross-platform frameworks / transpilers | Code and UI portability through common toolchains or translation | Permit substantially different implementations whose independently evaluated human outcomes and causal obligations survive. |
| Legacy modernization / Strangler Fig pattern | Gradual replacement, outcome-led planning and continuity during migration | Extend outcome preservation into agent-readable purpose provenance, interface adaptations and independently tested cross-renderer reconstruction. |
| Screenshot- or prompt-driven AI UI generation | Fast production of plausible interfaces | Require cold-source comprehension, capability accounting, actual input-to-effect wiring, honest UNKNOWN states and verifiable evidence before asserting equivalence. |

These columns describe **differences in stated research emphasis**, not verified superiority or an exhaustive competitive survey. Existing tools can and do cover portions of the same territory; success must be benchmarked against representative baselines. Indeed, Flutter's own documentation distinguishes *fitting the UI into space* from *making the UI usable in that space*, and modernization literature explicitly urges identifying outcomes before replacing systems. The opportunity lies in combining these insights into a compact, reusable and independently evaluable **continuity protocol for capable agents**.

### Research-grounding references (accessed 2026-10-15)
- W3C WAI, WCAG 2.2, *Understanding SC 1.4.10 Reflow*: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
- W3C WAI, WCAG 2.2, *Understanding SC 1.4.4 Resize Text*: https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html
- Flutter official docs, *Adaptive and responsive design*: https://docs.flutter.dev/ui/adaptive-responsive
- Flutter official docs, *General approach to adaptive apps*: https://docs.flutter.dev/ui/adaptive-responsive/general
- Martin Fowler, *Strangler Fig* (2024): https://martinfowler.com/bliki/StranglerFigApplication.html
- Thoughtworks / Martin Fowler site, *Using the Strangler Fig with Mobile Apps* (2024): https://martinfowler.com/articles/strangler-fig-mobile-apps.html

## 11. How to prove any claimed advantage

Before asserting that Any-Shape outperforms a conventional reimplementation, define matched experiments:

- **Cold-source benchmark:** use an independently developed, previously unseen extension or application; do not insert prewritten target-project rules or expose evaluator answers.
- **Reference comparison:** compare generic AI recreation, framework-led port and purpose-led reconstruction under similar source access, time and tool budgets.
- **Continuity measures:** critical workflow success, action/effect correctness, input validation and error fidelity, saved-state integrity, navigation recovery, task discovery, accessibility findings, visual coherence, user-reported comfort and effort, and accountable source-capability coverage.
- **Resource measures:** deployment complexity, maintainability, dependency load, build reproducibility, memory, responsiveness and device limitations.
- **Ablation tests:** remove the Purpose Manifest or preservation ledger and see whether measured reconstruction outcomes change; this guards against a documentation layer that produces no benefit.
- **Evidence discipline:** publish denominator, task weight, platform, test fixtures, independent source/target traces, human ratings where needed, uncertainty and failures. Do not compress multi-objective performance into a flattering unsourced percentage.

For a flagship SUBSTRATE Android trial, first stabilize the source application and capture its true behavior. Freeze the independent baseline, apply a general portable Any-Shape package, and let a cold agent produce a maintainable target without hand-authored per-feature conversion answers. Test on real Android constraints, including touch, permission boundaries and performance. This is a **proposed trial**, not current proof.

## 12. Research questions to leave open

- How can an agent reliably infer a human purpose when developers never documented it, without converting assumptions into facts?
- How should the system distinguish essential product identity from historical accident or avoidable inconvenience?
- Can task-based evidence justify collapsing several source features into one without losing discoverability?
- What mix of machine checks and human evaluation can assess visual polish, comfort and fatigue fairly across very different media?
- When do platform security limitations require genuine loss rather than a creative but unsafe workaround?
- How do we retain expressive architecture while making the required standard small enough that future agents actually read and apply it?
- Does a purpose-linked ledger materially improve cold reconstruction relative to source code, conventional tests and accessibility tooling alone?
- Can verified repairs and discoveries improve future agents' decisions without turning one target application into a hardcoded conversion recipe?

## 13. Architectural guardrails and near-term work

This document does **not** authorize immediate expansion into a large framework, a competing ontology, an unreviewed schema migration, or premature Android feature cloning. Favor a small, high-information corpus, namespaced extensions and concrete tests.

Near-term:
1. Incorporate purpose/comfort questions into existing browser-window resize acceptance scenarios and check real effect continuity.
2. Prototype a *tiny* purpose ledger for a handful of existing OpenForm features, explicitly distinguishing observed, stated and inferred intentions.
3. Compare resized source and reconstructed interfaces across intermediate widths, large text and touch/keyboard interaction; record actual omissions.
4. Once these probes demonstrate value, propose a versioned Purpose Manifest extension that aligns with the pinned Forever Works format.
5. Retain the independent unfamiliar-app flagship as the gate for broad transference claims.

## 14. Closing formulation

**Any-Shape seeks continuity across space:** the application's form can contract, expand or change medium while its intelligibility, beauty, navigability, usable operations and trust persist.

**Forever Works seeks continuity across time:** an inheriting agent can understand, repair, modernize, verify and transmit hard-won knowledge even when frameworks, maintainers and original implementations disappear.

**Accumulated purpose joins the two:** experience is not reduced to a screenshot; software history is not reduced to a catalog of obsolete controls; increasingly capable agents may devise new mechanisms, but must explain and prove what they preserved.

The era of AI-assisted software reconstruction should reward accumulated work with *greater expressive possibilities*, not erase it through generic imitation.

---

*Document type: enduring owner-directed research charter; implementation proposals remain unreviewed until separately approved and tested. Authored for repository continuity on 2026-10-15.*
