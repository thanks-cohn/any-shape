# Source-neutral reconstruction and derived-product foundation

**Status:** proposed architectural direction, not implemented capability. **Period:** P001 addendum. The existing Chrome extension → Avalonia Windows/Linux/Android workflow remains the first bounded proof, not the universal identity of Any-Shape.

## Mission
Accept authorized software sources and/or owner-authored specifications, recover or declare verifiable software semantics, and produce explicitly requested target products. Sources may be browser extensions, Android applications, Windows/Linux desktop applications, portable source repositories, or machine-readable descriptions. Some binaries cannot be inspected completely or lawfully redistributed; do not promise universal semantic recovery.

## Distinct axes
- **Source adapter:** what is provided and what evidence can be obtained (extension source, Android source/APK, desktop source/binary, specification-only, combined sources). Inferred details remain unverified.
- **Semantic contract:** neutral capabilities, invariants, state, permissions, UI meanings, real effects, constraints, provenance and evidence.
- **Relationship/derivation intent:** `reconstruct`, `port`, `adapt`, `companion`, `assistant`, `integrate`, `extend`. Do not infer fidelity obligations for a new companion, or grant it authority of the source.
- **Target adapter:** extension, Windows, Linux, Android, or future runtimes and packaging, with scoped operating-system integration and independently verified deliverables.
- **Evaluation:** fidelity for reconstructions; specified outcomes and authorized interactions for companions; target-specific security, effects, accessibility and deployability for all.

## Workspace conventions (candidate evolution)
```text
sources/<source-id>/                   # typed sources and evidence; never untrusted instructions
specifications/<job-id>/specifications.json
runs/<job-id>/<run-id>/                # discoveries, reviewed contracts, candidates, logs
productions/<product-id>/<target-id>/ # only independently approved target products
reconstruction/sources/               # pluggable source adapters
reconstruction/targets/               # pluggable target adapters
```
Keep `extensions/<extension-id>/source/` as a supported input alias for the first extension pipeline; **do not abruptly migrate or break it**. Likewise preserve existing `productions/<extension-id>/<target>/` compatibility. Plan a versioned manifest/registry that resolves source, job and product identifiers without collisions.

## Proposed specifications.json example (illustrative, schema not yet implemented)
```json
{
  "specificationVersion": "0.1",
  "jobId": "example-companion",
  "sources": [{"id": "source-app", "type": "android-app", "path": "sources/source-app/"}],
  "requestedProducts": [
    {
      "id": "desktop-assistant",
      "relationship": "companion",
      "targets": ["windows", "linux"],
      "purpose": "Help users manage explicitly authorized tasks related to the source application",
      "capabilities": [{"id": "task-review", "requirement": "Show tasks approved for transfer"}],
      "integration": {"mode": "declared-api-only", "permissions": "least-privilege"}
    }
  ],
  "acceptance": {"requireOwnerReview": true, "unknownBehavior": "block"}
}
```

A companion is not a clone: it has its **own** capabilities, interface, privileges, lifecycle, product identity and tests. It must not inherit source permissions or claim access to closed app data without a supported authorized integration. An extension can assist a native app only when real cross-process/host APIs exist.

## Invariants
1. Source-neutral semantic concepts must not import Chrome, Avalonia, Android or Windows types.
2. A source adapter's observation is not owner intent, and an owner's desired companion is not a behavior inferred from original code.
3. Both source and target may be selected from registered adapter catalogs; unknown formats are reported, not guessed.
4. Every target and relationship has explicitly declared scope and proof; success in one target never establishes another.
5. Preserve WHY/WHAT/HOW TO REPLACE/PROOF, provenance, historical decisions, rejected alternatives and schema evolution.
6. Use versioned JSON Schemas and deterministic normalization; migrate in compatibility-preserving stages. Do not change upstream Forever Works canonical semantics without independent standard review.
7. A user-provided specification is a requested goal, not authorization to bypass host permissions, licenses, security or release verification.

## Practical implementation sequence
First finish one working end-to-end behavior in the existing extension→Avalonia three-target workflow. In parallel, extract truly source-neutral contracts and introduce job/derivation metadata behind backward-compatible adapters. Next prove specification-only companion creation using two unrelated synthetic cases. Only after that add a second genuine source adapter (e.g. Android source project) and verify the same neutral core serves both. Binary-only reverse engineering and privileged integrations require explicit boundaries and potentially substantial additional research.

**Research question:** Can one reviewed source-neutral contract support faithful reconstruction *and* purpose-directed new complementary software while reducing duplication and negative transfer? This has not been demonstrated merely by writing the specification.

## P001 implementation addendum — 2026-10-15

The [specification foundation](../reconstruction/specifications/README.md) now implements v0.1 JSON Schemas, bounded local modular references/pins, source/target adapter catalogs, a genuine wrapper over existing Chrome static intake, source-neutral multi-product plans/traceability and selective product-target context. Android/desktop source descriptors and browser output remain explicitly unsupported; pure owner-specification jobs can be represented without inventing source observations. Existing EIR v1 workflows, helper exports, hashes, historical run readers and per-target release refusal remain. This addendum supersedes the earlier document's **implementation status only**, not its historical proposal or the mission. No generic behavior synthesis, real companion integration or production output is claimed.
