# Extension-agnostic workspace and production output contract

**Period:** P001. **Status:** owner-directed naming/architecture convention, proposed for implementation. **Applies:** every authorized extension processed by Any-Shape; no special paths or templates for Keepsake.

## Stable top-level structure

```text
any-shape/
  extensions/
    <extension-id>/
      source/                    # original input, read-only during runs
      intake.json                # source identity/hash/version/license, generated
      contract/                  # reviewed portable meaning and requirements
      evidence/                  # original observations and source traceability
  resources/
    avalonia/                    # reusable, version-pinned implementation guidance/tools
    react-native/                # optional independent adapter research
  reconstruction/
    extension-pipeline/          # generic discovery; existing module
    contracts/                   # schemas, capability models, portability contracts
    adapters/                    # target-specific implementations, not subject-specific
    orchestration/               # scoped plans/checkpoints
    evaluation/                  # independent target verdicts
  productions/
    <extension-id>/
      windows/
      linux/
      android/
  runs/
    <extension-id>/
      <run-id>/                   # immutable attempt-specific artifacts, reports, logs
  forever/                       # existing canonical machine records
  forever-works/                 # additive periods, intent, rationale, history
  vendor/forever-works/          # existing pinned standard
```

## Naming and provenance

- `extension-id` is a stable, filesystem-safe slug: lowercase ASCII letters/digits and internal hyphens, e.g. `sample-capture`. Do **not** infer identity from arbitrary extension-supplied display names alone. Detect collisions and assign a stable identifier through a reviewed registry/manifest. Preserve source manifest ID, version, origin, checksum and original name as metadata. Never allow user-controlled paths, `..`, symlinks or reserved names to escape the workspace.
- Exactly three platform output roots in the first Avalonia run: `productions/<extension-id>/windows/`, `linux/`, `android/`. Each is an **independently buildable and testable project/package** with its own manifest, target-specific files and release status.
- Cross-target source may be deduplicated under a versioned shared *source* workspace, but no produced app may depend on a sibling product directory at build or runtime. A self-contained production folder must capture/resolve all shared requirements via declared pinned dependencies; test each from an isolated clean copy. This reduces accidental Windows/Linux/Android source contamination.
- The default `android/` output refers to **Avalonia Android in the coordinated Avalonia run**. An independent React Native Android comparison MUST use an explicit variant boundary (for example `productions/<extension-id>/android-react-native/`), never silently overwrite `android/` or mix framework sources.
- `runs/` records every generation attempt, approvals, compiler/evaluator evidence and failure without deleting history. `productions/` represents promoted, verified outputs rather than ephemeral agent drafts. Candidate builds reside under `runs/<extension-id>/<run-id>/candidates/<target>/` until accepted.
- Every promoted product contains `README.md`, `product.json` (origin ID, contract version/hash, target OS, framework, build/runtime dependencies, artifact locations, verification status and provenance), platform-specific source/build/packaging, and evidence references to immutable run records. No secret keys or private extension/user data.
- If an extension cannot meaningfully become a standalone native application for a target, emit a reasoned `unsupported` report in its run records; do not generate a fake package or label an empty shell production-ready.

## Gates (closed world)

`DISCOVERED -> CONTRACT_REVIEWED -> GENERATED -> BUILT -> TARGET_TESTED -> RELEASE_REVIEWED -> PROMOTED`.

Every target advances separately. Source analysis passing does not mean build success; a compiled application does not establish behavioral fidelity; a desktop PASS cannot establish Android PASS; no artifact in `productions/` is labeled production-ready without explicit target-specific security, operations, native behavior, installation, migration and accessibility acceptance. Unmet requirements remain FAIL, UNKNOWN or NOT RUN.

## One-run / three products hypothesis

An agent may reconstruct all three Avalonia targets in one coordinated run **if** it freezes shared semantics before implementations, attaches target applicability to each operation and dependency, forbids platform-specific imports in shared code, executes per-OS conformance, and makes independent promotion decisions. Evaluate against separately executed runs and report negative transfer / cross-target assumption leakage, specification drift and architectural erosion. See [research](RESEARCH_DRIFT_TRANSFER_AND_TARGET_ISOLATION.md) and [Avalonia isolation](AVALONIA_THREE_TARGET_ISOLATION.md).

## WHY / WHAT / HOW TO REPLACE / PROOF

**WHY** directory separation: prevent a convenient desktop implementation from becoming an Android requirement by proximity, while preserving one neutral intent. **WHAT**: immutable inputs, reviewed contracts, isolated outputs, target-specific evidence and retained run history. **HOW TO REPLACE**: a future language/toolkit generator obeys the same extension identity, semantic and evidence contracts but may introduce new `target` or `variant` IDs without copying Avalonia. **PROOF**: validate slugs and workspace boundaries, build every promoted directory standalone on a clean target, independently exercise effects and permissions, and ensure no target's evidence is silently reused for another.

**Implementation status:** this directory contract is documented; the orchestrator, platform generators and promotion gate enforcement are not yet implemented.
