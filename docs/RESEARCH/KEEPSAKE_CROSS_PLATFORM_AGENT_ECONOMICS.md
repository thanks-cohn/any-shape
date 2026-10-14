# Research Charter — Keepsake, Cross-Platform Inheritance, and Agent-Efficient Software Maintenance

**Status:** Long-term owner research vision; **not** a claim that Keepsake's Android, Windows, or Linux implementations are complete or verified.  
**Priority:** Preserve now; execute after the current form-export, webhook, R2/D1, and Cloudflare Pages verification gates.  
**Related:** [Any-Shape long-horizon vision](../IDENTITY/ANY_SHAPE_LONG_HORIZON_VISION.md) · [Agent transference blueprint](../ROADMAP/ANY_SHAPE_AGENT_TRANSFERENCE_BLUEPRINT.md) · [Cloudflare Pages reference](../PROPOSALS/CLOUDFLARE_PAGES_GOLDEN_EXPORT_REFERENCE.md) · [Forever Works](https://github.com/thanks-cohn/forever-works)

## 1. Why this research matters

The owner's ambition is not a single Chrome extension or a one-time platform port. It is a **commercial, multiplatform software ecosystem**—browser extensions, web apps, Android mobile apps, Windows desktop applications, Linux applications, and future platforms—whose products can be inherited, reconstructed, repaired, modernized, tested, released, and documented predominantly through agents. Humans should supervise and approve consequential decisions, rather than repeatedly rediscover architecture or performing every routine verification by hand.

Forever Works is intended as a neutral, durable standard for preserving an application's *identity, purpose, capabilities, effects, constraints, provenance, and acceptance evidence* across implementations and time. Any-Shape is its first major **cross-medium reconstruction demonstration**. Neither project is permitted to become a collection of bespoke Keepsake-only conversion scripts.

The goal is **low recurring human effort with high confidence**, not cutting corners on evidence. Minimize manual work that machines can reproducibly perform; increase the coverage, clarity, and reuse of automated tests. A growing application portfolio should ideally require *less routine human maintenance per product*, not more. No design can promise freedom from all bugs or emergencies; it should provide observability, containment, repair paths, and rollback.

## 2. Flagship experiment: one Keepsake, four verified targets

**Keepsake**, originally a Google Chrome extension, is the proposed first flagship source product. The research target is an independently tested family:

1. **Chrome extension:** verified original source behavior and permissions/effects.
2. **Android:** initial destination **React Native / Expo**, with actual Android build and device/emulator verification.
3. **Windows:** desktop application from a **shared C# / Avalonia** codebase.
4. **Linux:** independently built and verified desktop application from the *same* Avalonia codebase.

These are **four verified distribution targets from three principal implementations** (Chrome source, mobile, shared desktop). “Shared code” is a development economy hypothesis, not proof of platform parity: Windows and Linux differ in packaging, filesystem access, permissions, rendering, windowing, clipboard, native integration, and other lifecycle behavior. Each requires its own release acceptance.

The source must be **observed and characterized before any port**. Create an accepted Forever Works inheritance package including mission, boundaries, workflows, fields/data models, state, persistence, errors, accessibility, permissions, external effects, environment assumptions, tests, and unresolved unknowns. A cold agent should use those contracts and live evidence, *not private coaching* or a target-specific handwritten recipe.

**Identity rule:** Preserve what the product *does* and the real-world consequences of user actions. UI layout and operating-system integration may legitimately adapt to each medium, but those differences must be explicit, accepted, and testable.

## 3. Research hypothesis: Avalonia reduces agent runs

Start desktop reconstruction with **Avalonia UI / C# / .NET** because one coherent codebase can target both Windows and Linux, reducing duplicate implementations and potentially reducing agent tool calls/runs, code volume, debugging cycles, and maintenance burden.

Research questions:

- Against separate native Windows and Linux implementations, does Avalonia meaningfully reduce agent runs, elapsed time, duplicated code, defect counts, and human intervention?
- What source capabilities become simpler or harder to express with a shared desktop UI?
- Can agents independently verify OS-specific behavior without recreating the entire test suite twice?
- How does the resulting application fare when framework versions and desktop platforms evolve?
- Can another agent later replace Avalonia using only neutral Forever Works contracts and preserved evidence?

The standard **must not require Avalonia, C#, React Native, Expo, or any specific agent**. Platform adapters are replaceable research implementations. Prefer real baselines and counterfactual comparisons; do not assert reduced cost before measuring it.

## 4. Standardized verification: agents do the work; humans can check it

The owner wants the familiarity of mature framework ecosystems: predictable project layouts, named commands, machine-readable and human-readable verification results, and repeatable release criteria that future maintainers learn once and reuse across apps.

A future application should expose language-neutral **verification manifests and report schemas**, while implementation-specific runners may use Node, Python, .NET, mobile tooling, or new future runtimes.

Define and test:

- **Capabilities:** supported workflows, inputs, outputs, invariants, edge cases.
- **State and migration:** persistence, import/export, data retention, recovery, compatibility.
- **Effects:** real file/network/storage/webhook operations, errors and retries.
- **Presentation and accessibility:** platform-appropriate usability with preserved interaction semantics.
- **Compatibility and performance:** browser and OS versions, memory/cold start, resource cleanup, responsiveness.
- **Security and commerce:** release-relevant permissions, customer-data boundaries, entitlement/licensing and update behavior.
- **Operations:** build, package, deploy, rollback, documentation, provenance and auditability.

Reports must distinguish **PASS / FAIL / NOT TESTED / NEEDS HUMAN REVIEW**; passing unit tests must not imply a deployed product was tested. Evidence includes timestamps, environment/runtime versions, tested artifacts, fixtures, trace IDs, before/after behavior, known unsupported features, and repeat instructions. Critical failures are preserved as regression cases.

**Human acceptance remains meaningful:** a small team can run documented tests and inspect key workflows before approving an actual store release. Independent tools or separate agents should be capable of reproducing the result. No agent's own assertion is sole proof of correctness.

## 5. The repeatable commercial release cycle

For an eventual portfolio of ~50 or more apps sold through extension marketplaces, mobile stores, desktop channels, and direct web distribution:

1. A scheduled review, user report, browser/OS change, dependency update, or incident triggers an investigation.
2. A capable agent inherits the repository cold, reads its contracts/evidence, inspects the **current technical landscape**, and reproduces the defect or compatibility gap.
3. The agent makes bounded repair/reconstruction changes, documents dependencies and rationale, and produces independent verification evidence.
4. Automated CI runs the applicable regression, migration, platform, effects, packaging and release-readiness checks.
5. An owner or small authorized human team examines a concise **Release Readiness Report**, performs a small number of high-value manual acceptance checks, and approves or rejects.
6. Controlled publication rolls out to the relevant extension/mobile/desktop channels with rollback and a maintained record of what changed and what remains unknown.
7. The inheritance package and regression corpus are updated so the next agent begins **better informed** than the last one.

Aim to replace emergency rediscovery with reproducible diagnosis and scheduled remediation where practical. Production incidents still need defined escalation and incident response; no standard eliminates all emergency risk.

### Cumulative verification

Every bug, failed transfer, customer-visible issue, performance regression and platform change should leave behind useful evidence. Each accepted repair ideally adds an invariant, fixture, compatibility note, failure trace, and verified fix, making previously encountered defects easier to detect in the future.

The documentation is not a static memorial; it is a **living, versioned and inspectable technical inheritance**.

## 6. What counts as genuinely impressive research

Do not measure success by screenshots of four visually similar apps. Record measurable results:

| Measurement | Required evidence |
| --- | --- |
| **Agent effort** | Number of independent tool/runs, retries, elapsed reconstruction time, compute/API expenditure when observable |
| **Human effort** | Number and duration of interventions, review and manual test time, reasons for intervention |
| **Fidelity** | Capabilities fully/partially/not transferred; data and side-effect parity; accepted platform differences |
| **Reliability** | Reproducible pass/fail rate, regression counts, incident and recovery evidence, robustness under failure injection |
| **Cross-platform economy** | Shared vs platform-specific code, OS-only defect counts, builds and packaging costs |
| **Maintainability** | Cold-agent success on subsequent upgrades, traceability of changes, clarity of unknowns |
| **Repeatability** | Independent second agent can reconstruct from the same neutral contracts and get comparable results |

Use baselines: compare shared Avalonia against reasonable platform-specific alternatives, and compare Forever Works-guided reconstruction with ordinary informal porting or documentation-only workflows when feasible. Avoid biased tests designed around Keepsake's implementation. A truly unfamiliar **second and later more complex application** must challenge the generalization claim.

## 7. Next phases and non-detour rule

**Now:** Finish the existing three-form (Studio / Flow / Schema) exported-app deployment proof: standalone public form, GitHub → Cloudflare Pages, webhook effects, optional R2 and D1 persistence, individual JSON retrieval, and clear automated evidence. Keep this small; do not allow account systems, endless hosting integrations, or premature overengineering to delay transference research.

**Next:** Freeze Keepsake's original Chrome acceptance corpus and identity contracts; conduct a cold-agent Android reconstruction and a shared Avalonia Windows/Linux reconstruction. Generate platform-specific builds and independent tests, label incomplete parity explicitly.

**Afterward:** Expand to increasingly different projects—file explorers, media workflows, document applications, SUBSTRATE Mini-like canvases and selected legacy capability extraction—until the standard can demonstrate generality far beyond forms and Keepsake.

**Later:** Study agent-efficient multi-product maintenance and release operations across an expanding portfolio, with repeatable release reports, store-specific publication checks, rollback, human governance, and durable records of repairs and migrations.

The research topic is intentionally preserved now but **must not supersede current acceptance work**. Documentation of a target is not evidence the target has been achieved.

## 8. Founding research question

> **Can one sufficiently capable agent inherit an unfamiliar commercial application, preserve its identity, reconstruct it into Android and a shared Windows/Linux desktop implementation, and leave behind enough independently verifiable evidence that a small human team can confidently authorize release—with substantially less duplicated engineering effort than conventional separate ports?**

A strong result would be a verifiable method and reusable standards that work on **unfamiliar future products**, not only a bespoke Keepsake port.

**One enduring software identity. Many deployable implementations. Minimal duplicated effort. Maximum independently inspectable evidence.**
