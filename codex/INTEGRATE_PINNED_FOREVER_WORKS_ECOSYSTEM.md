# Codex session: pin Forever Works and implement Any-Shape ecosystem interoperability

**Repository:** `thanks-cohn/any-shape`, branch `main`. **Session:** approximately 30 minutes. **Status:** operational implementation instruction, not a permanent standard. Keep all lasting implementation, schemas, docs and tests agent-neutral.

## Read first

1. `AGENTS.md` and `codex/HANDOFF_LATEST.md`.
2. `forever-works/PROPOSALS/ANY_SHAPE_UNIVERSAL_SOFTWARE_RECONSTITUTION.md`.
3. `forever-works/DECISION_RECORD_SOURCE_NEUTRAL_ECOSYSTEM_ROADMAP.md`.
4. `reconstruction/specifications/README.md` and its current schemas, planner, adapter catalog and tests.
5. Existing `vendor/forever-works/`, `forever/`, any lock/pin manifests and `scripts/` workflows: inspect before modifying.
6. Upstream reference `https://github.com/thanks-cohn/forever-works`, especially `spec/profiles/ecosystem-composition/v0.1/composition.schema.json`, `packages/ecosystem-composition/`, `conformance/ecosystem-composition/v0.1/`, normative `docs/STANDARD.md` and the adopter guide. Use the exact recorded upstream commit; never assume a floating `main` is immutable.

## Objective

Make Any-Shape **self-sufficient for ordinary Codex sessions working in this one repository**, using a minimal, verifiable, immutable pin of the Forever Works standard and optional ecosystem-composition profile. Then implement an actual **version-aware, tested interoperability bridge** from modular Any-Shape `specifications.json` into valid Forever Works records plus the optional composition profile.

This is an incremental milestone toward source-neutral reconstitution of **arbitrary cooperating software suites**, including different product forms, target platforms, language/toolkit choices, many-to-many participants, and non-identical companions/assistants. It is not a claim that those source/target adapters can currently generate functional products.

## A. Pinned, trustworthy Forever Works dependency

- Prefer a **small vendored source snapshot** under `vendor/forever-works/` with the schema, exact validator/runtime dependencies needed by the bridge, profile examples/fixtures and minimal license/attribution. Inspect existing vendoring conventions first. No wholesale duplication of unrelated upstream source or hundreds of example files.
- Record exact upstream `repository`, immutable commit SHA, profile identity/version, included paths and SHA-256 digests, licensing, update instructions and a lock/manifest. Use a deterministic script to update, verify, compare and reject modified/missing files. Preserve file bytes; no silent patching of upstream schemas or test goldens.
- If outbound GitHub access is unavailable inside Codex, **use already vendored trusted resources if present and verifiably pinned**. Otherwise implement source-neutral bridge interfaces/tests against the documented profile and clearly report `UPSTREAM_SNAPSHOT_UNAVAILABLE`, with an exact manifest of required assets. Do not invent upstream hashes or claim pinning succeeded. A separately prepared verified snapshot can be brought into the repository later; no user-uploaded ZIP is assumed.
- Never make a new Codex run fetch upstream simply to execute ordinary Any-Shape validation after a successful snapshot is installed. Do not require Git submodule initialization if the target agent checkout may lack cross-repository access.
- Preserve `forever/` local records, existing vendor content, EIR v1 and all history. Favor an additive, backward-compatible layout.

## B. Versioned mapping from specifications.json

- Expose a deterministic, testable mapping of **reviewed** Any-Shape job semantics to existing canonical Forever Works record types (`intent`, `capability`, `invariant`, `constraint`, `dependency`, `decision`, `compatibility`, `migration`, `implementation`, `evidence`) and a separate **optional ecosystem-composition v0.1** document. Do not invent new canonical kinds or modify upstream normative schemas to fit one adopter.
- Maintain distinct **source ID, job ID, requested product ID, participant ID, configuration ID, target ID and run ID**. Preserve bidirectional traceability with source JSON pointers/document hash receipts, module provenance and stable external mappings. No assertion of owner acceptance from ordinary text: if genuine immutable review is not yet available, block promotion or mark mapped obligations proposed/unreviewed.
- Carry through purpose, preserve/transform/exclude/add choices, explicit invariants, cross-product capabilities, many-party interactions and ports, trust/authority boundaries, source of truth, state ownership, compatibility requirements, requested topologies, unknowns, and **fixed / constrained / fluid implementation** classifications where the source actually declares them. Do not fabricate specificity the input lacks.
- `specifications.json` is a **job request**, not automatically the accepted or canonical inheritance. Record discrepancies and missing mandatory profile data as clear diagnostics; do not force semantics into a shape that changes their meaning.
- Source adapters and targets remain open catalogs; extension, Android, Linux, Python, Rust, C++, Avalonia, React Native and browser output are **examples, not neutral enum limits**.
- Support selective target context, but validate the **whole** submitted suite and never borrow a target's successful results for another.
- Implement a CLI or documented API path to export/validate linked canonical records and composition, including exact version/profile declaration, stable error codes and reproducible hashes.

## C. Tests and independent cross-checks

- Use a synthetic **four-or-more-participant** suite with fan-in/fan-out, shared service and at least two configurations. It should include heterogeneous requested product forms and an interaction chain spanning several participants, not just pairs.
- Include tests for missing/ambiguous participant or port references, denied/unknown API authority, contradictory state ownership, duplicate IDs, dropped preserve/transform/exclude/add obligations, version mismatches, absent profile assets, stale module/source pin, and false `PASS` claims.
- Run the actual vendored reference profile validator/conformance fixtures where available. Confirm generated canonical records against the normative Forever Works validator or a trustworthy independently tested binding, not only ad hoc shape comparison.
- Every runtime/effect/evidence/release status remains `UNKNOWN` or `NOT_RUN` until independently executed; schema validity does not establish functioning integration.
- Re-run `npm run test:foundation`, `npm run test:pipeline` and applicable existing tests. Do not alter previous test expectations to disguise regressions.

## D. History and documentation

Add an agent-neutral integration guide documenting why a pinned snapshot was chosen over per-run cloning/ZIP uploads, what stays canonical upstream, how versions/updates are verified, how Any-Shape job semantics map into stable records, which fields cannot yet map cleanly, and how this design serves cold agents decades later. Preserve current Period history additively. Discovered upstream profile deficiencies become **explicit proposals/issues**, not ad hoc edits to vendored code.

The first Chrome-extension→three-Avalonia attempt remains the original bounded example, not a permanent restriction. Product form, runtime, OS, language and toolkit preferences must not be conflated. Future target adapters can create CLI tools, background helpers, native GUIs, mobile apps, browser extensions and other cooperating outputs.

## Time budget and deliverables

Around minute 20 assess scope and prioritize successful code/tests; around minute 25 transition to verification, saving commits and handoff; by about minute 28 commit/push `codex/HANDOFF_LATEST.md` containing exact upstream pin or retrieval blocker, working code paths, actual test results, artifacts, failure statuses and the next bounded run. Report by minute 30.

If scope exceeds one session, **prioritize (1) valid pinned snapshot/lock/verification, (2) a small working deterministic translation of a multi-participant synthetic specification, (3) independent profile validation and negative tests**. Document partial mappings and do not assert completion of features that are not built.

## What follows this run

The next proof should produce two small, genuinely cooperating products with independently checked data flow/effects from one accepted suite contract; only then develop broader source/target adapters and the compact cold-agent reference corpus. Keep Forever Works independent and portable throughout.
