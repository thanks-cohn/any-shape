# P001 — Early Experimental Stage and First Verified Cloud Effect

**Period ID:** P001  
**State:** OPEN; **observed:** 2026-10-15 UTC; **start:** historical origins not precisely established.  
**Scope:** Any-Shape's current experimental browser core, form authoring/export demonstrations, and the related independently deployed Flow test.  
**Temporal warning:** This records the project **at this period**, not the eternal architecture or the state of future HEAD revisions. Exact revisions must be captured by subsequent evidence artifacts.  
**Profile:** [Period format and index](../PERIODS.md).

## What stage are we in?

Any-Shape is in its **beginning / formative experimental period**. The ambition is an independently reconstructible semantic software system across languages, interfaces and platforms; the reality consists of a working browser-oriented responsive library, optional diagnostics, authoring prototypes, a static website exporter, research specifications and controlled reconstruction exercises. One specialized Cloudflare Flow experiment has independently demonstrated a real persisted JSON record and an actual file object. No universal cross-language production converter or cloud-enabled shared exporter exists yet.

The project should not be described as a finished platform, nor should its scope be reduced to this first form experiment. At this stage demonstrations are selected to reveal reusable obligations: meaning, usability, permitted effects, portability, evidence and fidelity.

## Current technical period — source-grounded

- **Language/tooling:** HTML/CSS, JavaScript, TypeScript authoring in some examples; Node.js tests/scripts; Playwright and accessibility tools for browser investigation; Forever Works-compatible machine records in `forever/`.
- **Browser core:** `src/any-shape.css` and optional `src/diagnostics.js`, types and diagnostic schema. Browser responsiveness is one specialization.
- **Three example authoring environments:** `examples/openform/`, `examples/openform-flow/`, `examples/openform-schema/`, which share `examples/shared/portable-form.js` and `website-export.js`.
- **Portable static export:** five-file ZIP with respondent-only application and `portable-form` JSON model. Its original field/file behavior does **not** send file bytes.
- **Cloudflare experiment in the original repo:** `examples/cloudflare-pages-reference/` with Pages Functions, R2/D1 integration, attachment routing and mock tests. It was **not automatically part of those ZIPs**.
- **Live external experiment:** `thanks-cohn/any-shape-form-tests`, made from an actual Flow ZIP and augmented with backend, same-origin multipart submit, deployment workflow and database schema. Deployed to `any-shape-form-tests.pages.dev`; D1 JSON row and a 13,304-byte `image/webp` object independently observed on 2026-10-15. See [Case 001](../CASE_001_FLOW_LIVE_EVIDENCE.md).
- **Canonical materials:** `AGENTS.md`, `docs/IDENTITY/`, `docs/RECONSTRUCTION/`, `forever/`, `vendor/forever-works/`. These remain in force. This narrative period package adds context rather than changing upstream machine schemas.

## Period chronology — what changed, why

| Sequence | What happened | Why it matters |
| --- | --- | --- |
| Existing browser/core and form laboratory | Multiple UI/semantic approaches with shared portable-form export | A reusable semantic model, separate from visual editor implementation |
| Initial export | Static five-file browser package and browser webhooks | Baseline independence but no server-side durable effects/real upload bytes |
| Cloudflare reference | Separately implemented Pages Functions + R2/D1 store | Demonstrated a bounded adapter model but was not wired into shared export |
| Owner exported Flow | Uploaded resulting ordinary files to `any-shape-form-tests` | Tested real user workflow, not only internal sample code |
| Repository-specific integration | Added same-origin upload, backend functions, migration and deployment | Connected presentation to durable effects without browser-embedded credentials |
| Connected-account setup/deploy | Existing D1/R2 selected, Pages project created, GitHub Actions deployment succeeded | Operational proof in an actual cloud account |
| First submitted test | Backend receipt reported R2 and D1 accepted; D1 SQL and R2 listing independently confirmed storage | **One bounded effect-verified success**; cannot generalize to all forms/failures |
| Documentation period created | Current records preserved with cold-agent contract | Converts a temporary success into inspectable inheritance evidence |

## Current acceptance ledger

**LIVE-OBSERVED:** deploy succeeds; Pages functions active; D1 database has table; D1 persisted a form submission with typed answers; R2 holds a real image object matching record metadata.

**SOURCE-INSPECTED:** static ZIP initially lacks cloud backend; test-repo `app.js` posts multipart to `/api/submit`; backend attempts JSON writes and has GET handler; security/validation features are incomplete.

**KNOWN-DEFECT:** frontend says file uploads are metadata-only and answer JSON contains `uploaded:false` even though R2 received bytes. This misrepresents the actual effect. Unprotected record GET is unsuitable as a general private-data access policy.

**UNKNOWN/UNVERIFIED:** R2 stored JSON body independently read back; successful record URL GET; cryptographic file-byte integrity; retries, idempotency and orphan cleanup; negative cases; security/abuse acceptance; Studio/Schema parity; fully packaged shared cloud ZIP; blind reconstruction in a new language; production reliability.

## Decisions and portability

**Enduring:** meaningful field identities/typed answers, input validation, user-perceivable delivery outcome, real attachment bytes, truthful persistence status, protected records, independent export, separation of domain logic from provider adapters, and independently checkable evidence.

**Contingent to this period:** Cloudflare Pages, R2/D1 dual persistence, GitHub Actions, Wrangler, JavaScript, file naming convention and explicit multipart transport. A future agent may replace any contingent mechanism *after* checking the same contract and security expectations in its target.

**Not yet settled:** cross-store consistency and recovery, idempotency strategy, access control/retention, anti-abuse, binary limits, automated live conformance, future editor rollout. These need owner decisions and evidence, not reinterpretation as finished requirements.

## Work for the next period

1. Preserve the known-good Flow experimental deployment while repairing mismatched upload indicators and authorizing protected retrieval.
2. Add independent test fixtures for real R2/D1 JSON reads and attachment hash, failed/partial effect handling, retries, access denial, and narrow/keyboard usability.
3. Integrate proven effects into the **shared exporter** only after requirements are frozen, keeping Studio/Flow/Schema semantic parity measurable.
4. Conduct an independent cold-agent reconstruction trial in a language and medium chosen for the task. Capture source isolation, candidate provenance, independent oracle and findings.
5. When significant implementation or acceptance changes, **open P002**, link this file, record a delta (PRESERVE/CORRECT/EXCLUDE), and never silently overwrite this historical account.

## Reading dependencies

[Project identity](../IDENTITY_AND_DECISIONS.md) → [System atlas](../SYSTEM_ATLAS.md) → [Verified evidence](../CASE_001_FLOW_LIVE_EVIDENCE.md) → [Reconstruction contract](../RECONSTRUCTION_CONTRACT.md) → current HEAD/source/tests. A cold agent should report any divergence between this period and current HEAD before making changes.

## Added during this period — native reconstruction pipeline proposal

[Pipeline 001](../PIPELINE_CHROME_EXTENSION_TO_NATIVE.md) specifies owner-intended migration of Chrome extensions to Android and C# Avalonia Windows/Linux native applications. **Status: proposed**; generic source intake/analysis and all actual implementation, independent platform tests and production gates remain pending. This is a **phase of work inside P001**, not a new historical period simply because work began.

## P001 addendum — portable extension pipeline bootstrap (2026-10-15)

**SOURCE-INSPECTED / IMPLEMENTED IN REPO, NOT YET TEST-EXECUTED:** `reconstruction/extension-pipeline/` introduces a dependency-free Node.js read-only extension manifest intake library, CLI, and two synthetic fixtures (popup-only; content-script/background-worker). It inventories declared surfaces, listed resources, permissions and browser-coupling warnings. It does **not** analyze arbitrary JavaScript runtime behavior, generate Android/Avalonia applications, or prove conversion correctness. See its [README](../../reconstruction/extension-pipeline/README.md). Node was selected because the existing repository already requires it; a future agent may replace it if the versioned inventory contract and file-safety outcomes hold. No third-party runtime package added. This is one additive development event within P001, not a new Period.

## P001 addendum — multi-target isolation hypothesis (2026-10-15)

The [Avalonia three-target isolation contract](../AVALONIA_THREE_TARGET_ISOLATION.md) records an owner-requested **single-run** Windows/Linux/Android architecture with explicit shared-semantics versus target-implementation boundaries, anti-contamination checks and independently evaluated targets. **PROPOSED, NOT YET TESTED**. React Native Android remains a separate comparison. This modifies the proposed run strategy, not the historical live Flow evidence.

## P001 addendum — research-framed interference controls (2026-10-15)

[Drift, Negative Transfer and Target Isolation](../RESEARCH_DRIFT_TRANSFER_AND_TARGET_ISOLATION.md) adds established research terminology and a proposed controlled comparison: unstructured one-run vs scoped/checked one-run vs scoped sequential runs. It does not claim the documented format has yet prevented agent cross-target errors in a live experiment.
