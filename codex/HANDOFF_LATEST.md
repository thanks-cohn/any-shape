# Session 02 — source-neutral specifications and multi-product planning

Started **2026-10-15 05:17:57 CDT (10:17:57 UTC)**. Handoff authored around **05:42 CDT (10:42 UTC), approximately 24 minutes elapsed**, with feature work complete and verification finished. Branch `main`. Implementation HEAD at authoring: `fe070902440c2e20a201898d35506f73ac3b86a7`. Working tree was clean before adding this handoff, archived Session 01 handoff and result receipt. The successor commit containing this file is identified by `git log -1 --format=fuller -- codex/HANDOFF_LATEST.md`; final push/remote verification is reported in the session response.

## Read in order and preserve the mission

1. `forever-works/PROPOSALS/ANY_SHAPE_UNIVERSAL_SOFTWARE_RECONSTITUTION.md` — permanent source-neutral, purpose-directed mission, not a claim of universal implemented conversion.
2. This handoff.
3. `codex/NEXT_RUN_SOURCE_NEUTRAL_FOUNDATION.md` — this bounded session's priorities.
4. `reconstruction/specifications/README.md` — current executable operator/API contract and limitations.

The repository began this session at the prior pushed `ed137da`. A clean fast-forward fetched owner documents through `dfb2ab3`. Existing code/work and owner documents were preserved. No worktree, destructive rename, reset or force push was used. The previous handoff is archived at `codex/handoffs/2026-10-15-session-01.md` and in Git history.

## Saved implementation commits

- `5747889` — source-neutral job schemas, bounded loader, adapter interfaces/catalog, Chrome/EIR compatibility wrappers, derivation planner, three concrete job fixtures and initial tests.
- `fe070902440c2e20a201898d35506f73ac3b86a7` — modular/security hardening, typed adapter descriptor schema, selective target context, deterministic product order, incompatibility handling, remaining tests, operator docs and CI.

A normal push of these commits was initiated before this handoff; the handoff is committed and pushed immediately afterward, and the final response verifies the actual remote HEAD. Recover through `origin/main`; ignored local caches/artifacts are not required to recover code. A Git bundle/checksum is refreshed after the final handoff commit as an additional local recovery artifact. Fresh-machine snapshot restoration was not tested.

## Completed working behavior

This session prioritized source-neutral foundations over new native widgets or a source-specific converter. The actual runnable increment is:

- **Versioned root/module schemas**: `specificationVersion: "0.1"`; distinct source/job/product/target/run identities; safe source paths and immutable hashes; provenance/access/unknowns; independent requested products and targets; preserve/transform/exclude/add; accepted/requested/inferred/observed requirements; invariants, target UX/security/authority/data; explicit interactions/API access/scope, acceptance cases, product dependencies, declared incompatibilities, owner review and namespaced extensions.
- **Bounded modular loader**: local root-relative JSON references; module identities/pins, stable traversal, shared-DAG deduplication; cycle, traversal, symlink/hardlink, duplicate identity, conflicting reference/pin and override rejection. Defaults are configurable: 64 files, reference depth 12, 4 MiB/file, 16 MiB total, 200000 JSON nodes, JSON depth 64. Accepting a modular job requires all module pins. Exact byte receipts and canonical resolved specification hashes are separate.
- **Actual CLI**: `npm run reconstitute -- adapters|validate|plan|context|from-extension ...`. Plan attempts can be retained immutably with `--run <id>`; identity collisions cannot overwrite an older extension run. Structured errors preserve codes rather than claiming unsupported inputs succeeded.
- **Source/target catalogs**: JSON-schema-validated immutable metadata plus typed JS role interfaces; input/output IDs are open strings rather than enums tied to one platform. Builtin composition is separate from neutral validators/planner. A synthetic new target was registered and planned without modifying the core/schema.
- **Genuine first source adapter**: wraps the existing bounded Chrome inspector/analyzer, preserving original source hashes and EIR v1. It never executes imported code or copies browser permissions into product grants. Specification-only input carries declared owner requirements, not fake observed app behavior. Android source/binary and desktop source/binary adapters are metadata-only **UNSUPPORTED**.
- **First target adapter**: wraps existing Avalonia machinery only for reviewed legacy EIR **incomplete hosts**; it refuses to coerce a generic specification into accepted EIR. Native generic semantics, real companion behavior and browser-extension generation remain unimplemented. Browser output is advertised as planned/unsupported.
- **Relationship-aware plans**: separately identified new/adapted/reconstructed/assistant/companion/integrated/extended products, deterministic dependency order, target-specific context, acceptance coverage, source-parity-vs-specified-outcome obligations and explicit blockers. Each runtime/build/effect/permission/release gate in generic plans is NOT_RUN. Unknown namespace interpreters, integrations, sources, adapters and pins remain visible; no namespace can silently grant authority or change safety.
- **Traceability graph**: source observations → requested/accepted requirements → products → target plans → declared acceptance cases; integration contracts are separate nodes. Syntax evidence is labeled as such, never behavioral parity. `context --product ... --target ...` excludes other targets' assumptions even when products share invariants.
- **Backward-compatible bridge**: `from-extension` emits reviewable defaults while retaining source identity/hash and old target defaults in an adapter. It starts unreviewed and requires scoped source access; old review strings are not generic owner approval. Nonportable legacy capability IDs get stable encoded IDs with an explicit mapping. EIR is never rewritten.
- **Shared utilities**: moved safety/canonical JSON/file helpers into `reconstruction/core/` with old import-path exports intact. Canonical algorithms and error codes remain; portable filesystem-root splitting was corrected. Legacy engine fingerprints now include shared helper sources. Historical run readers/manifests/hashes remain available; old generation outputs are not overwritten.
- **Permanent docs/CI**: provider-independent operator/API guide, root entrypoint, compatibility guide and additive P001 history; new foundation suite added to the existing CI job. No canonical `forever/` or vendored Forever Works standard was changed. Remote CI outcomes were not observed.

## Exact changed paths

Neutral core/adapters: `reconstruction/core/{safety.mjs,files.mjs}`, `reconstruction/adapters/{contracts.mjs,registry.mjs,builtins.mjs,adapter-v0.1.schema.json}`.

Specification/planning: `reconstruction/specifications/{validate.mjs,load.mjs,cli.mjs,README.md}`, `schemas/{specifications-v0.1.schema.json,module-v0.1.schema.json}`, `tests/{foundation.test.mjs,modules.test.mjs,cli.test.mjs}`; `reconstruction/derivations/{plan.mjs,context.mjs}`.

Adapter implementations: `reconstruction/sources/{chrome-extension.mjs,specification.mjs,planned.mjs,legacy-specification.mjs}`, `reconstruction/targets/{avalonia.mjs,planned.mjs}`.

Fixtures: `specifications/companion-ecosystem/{specifications.json,modules/domain.json}`, `specifications/android-adaptation/specifications.json`, `specifications/extension-compatibility/specifications.json`.

Compatibility/docs: `reconstruction/extension-pipeline/src/{safety.mjs,workspace.mjs}`, its `README.md`, root `package.json` and `README.md`, `.github/workflows/verify.yml`, `forever-works/{README.md,SOURCE_NEUTRAL_DERIVATION_FOUNDATION.md,periods/P001_EARLY_EXPERIMENTAL.md}`. No dependencies/lockfile changes were needed. Operational-only handoff/results are under `codex/` and are not generator inputs or permanent format concepts.

## Tests and commands actually executed

| Check | Actual result this session |
| --- | --- |
| `npm run test:foundation` | **65 passed, 0 failed/skipped**. Schema/reference/identity/security tests, three input architectures, modular pins/DAG/cycles/quotas, scoped contexts, unknown adapters, false target proof/authority, true CLI/checkpoint collisions, legacy mapping and deterministic planning. |
| `npm run test:pipeline` | **65 passed, 0 failed/skipped**, before and after extraction. Existing release refusal and architecture/source tests unchanged. |
| Activated `npm run test:pipeline:native` | **1 real compiler integration test passed, 0 failed/skipped**, final run 15.2 s. Linux and Windows RID hosts compile, repeat using cache, then deliberately invalid C# produces real compiler failures. Windows is cross-compilation on Linux; no native runtime proof. |
| `npm run test:unit` | **4 passed**. |
| `npm run typecheck` | **PASS**. |
| `npm run test:destinations` | **5 passed**, including controlled actual HTTP receiver effects. |
| `npm run test:website-export` | **3 passed**. |
| `npm run test:forever` | **4 passed**. |
| `npm run pipeline -- status synthetic-download-smoke session-two` | **PASS**: prior saved run still readable after utility extraction; source hash/history preserved. |
| `node scripts/validate-forever.mjs forever artifacts/onboarding/forever-session02` | **FAIL, same pre-existing record defects**: 2 invalid verification.type values, 14 audit findings. Upstream hash integrity PASS; CLI valid true; schema valid false. No records modified. |
| `git diff --check` | **PASS** before implementation commits. |

CLI demonstrations actually executed:

```sh
npm run reconstitute -- adapters
npm run reconstitute -- validate specifications/companion-ecosystem/specifications.json
npm run reconstitute -- plan specifications/companion-ecosystem/specifications.json --run session-02
npm run reconstitute -- context specifications/companion-ecosystem/specifications.json --product mobile-companion --target android
npm run reconstitute -- plan specifications/android-adaptation/specifications.json
npm run reconstitute -- plan specifications/extension-compatibility/specifications.json
npm run reconstitute -- from-extension runs/synthetic-download-smoke/session-two/eir.json --job legacy-review-job --product legacy-native-product
```

The retained companion demo has **3 products / 4 target plans, 21 graph nodes, 44 edges**:

| Product | Relationship | Target plan result |
| --- | --- | --- |
| record-console | new | Windows/Linux REVIEW_REQUIRED (fixture is unreviewed) |
| browser-assistant | assistant | Browser-extension UNSUPPORTED (no output generator) |
| mobile-companion | companion | Android REVIEW_REQUIRED (missing/unauthorized integration) |

Every generic runtime/effect/release check is NOT_RUN. Android descriptor source status is UNSUPPORTED without pretending to parse absent files. Existing Chrome fixture status is OBSERVED, hash `c29d65f251f57a954e24cfbbe75235cb913d4827513688bd8960cb81f8859fa1`, static syntax only. No production output was created.

## Environment and retained evidence

Use the current isolated checkout on `main`, not a new worktree. Dependencies are already installed. Native test activation:

```sh
cd /workspace/any-shape
export AVALONIA_CACHE_DIR=/workspace/.toolchains
export DOTNET_INSTALL_DIR="$AVALONIA_CACHE_DIR/dotnet"
source resources/avalonia/bootstrap/activate.sh
npm run test:foundation
npm run test:pipeline
npm run test:pipeline:native
```

The prior verified SDK 10.0.402 / Avalonia 12.1.4 cache was reused. Do not change HOME; activation supplies writable runtime/CLI/NuGet paths. No new secrets, network domains, SDK downloads or environment configuration edits were needed in this session.

Ignored evidence is under `artifacts/source-neutral-session-02/` (CLI receipts/plans/context/catalog, summaries, old-run read, foundation/legacy/native test logs, record-validator failure). Generic immutable attempt: `runs/companion-ecosystem/session-02/`. Session 01's extension runs/cache remain. Ignored artifacts are useful local evidence, not necessary code inputs; committed synthetic tests reconstruct the demonstrations if they are absent in a new task. Dated result receipt: `codex/handoffs/2026-10-15-session-02-results.json`.

Browser matrix and deployment-lab checks were **not rerun**: no browser application code changed. Session 01 reported 41 browser passes/5 failures during overlapping build/restore, so it was not a clean fixed-source baseline; deployment-lab had a syntax error. Keep those unresolved reports distinct from this session's passing foundation/legacy/native tests. Android workload/device and Windows/Linux GUI runtime checks were not provisioned or executed; last session's Android build attempt reported NETSDK1147. No new native application behavior is claimed.

## Remaining limitations / next small ordered tasks

1. **Neutral owner review/contract checkpoint**: schema review fields are local assertions, not authenticated authorization or a durable accepted-contract transition API. Add an explicit immutable review step bound to exact specification/module/source hashes, with per-requirement/unknown/interaction dispositions. Test stale changes, false source approval, missing pins and incompatible dispositions; do not copy source privileges.
2. **One executable semantic vertical slice**: data/state/messages/effects are descriptive requirements, not an executable typed domain model. Define one small, generic portable transition/effect contract and held-out stimulus/oracle fixtures for two unrelated jobs (specification-only plus Chrome). Implement real domain/effect behavior before claiming reconstruction or building more decorative hosts. Never add a flagship-specific recipe.
3. **Second genuine source adapter**: Android/desktop source/binary entries currently advertise only planned metadata. A bounded parser for a controlled source project can inventory/provenance-link actual facts without executing it. Binary analysis and privileged APIs stay unsupported until deliberately implemented and independently tested.
4. **Generic target realization**: new jobs currently plan only. The Avalonia bridge requires reviewed EIR v1; generic specs are not auto-coerced into EIR. Browser output is unsupported. Add target-specific implementations only after accepted neutral semantics; keep per-target Android lifecycle/storage/touch/runtime obligations distinct.
5. **Independent proof/release**: generic plans and owner assertions are not proof. Existing compiler/architecture checks and fail-closed promotion remain; trusted evaluator attestation, current-artifact binding, actual APIs/permissions, install/update/recovery, packaging/signing and native runtime/accessibility remain unimplemented/unrun.
6. **Further foundation hardening**: JSON modules support whole local documents, not arbitrary JSON Pointer/remote references or override precedence. Unknown namespaces block affected plans until an interpreter exists. Descriptor evidence/version metadata is not cryptographic adapter attestation; trusted adapter code is installed developer code, not a sandbox for source uploads. Filesystem operations assume quiescent inputs. Schema root/module definitions currently repeat shared sections; maintain matching versions or refactor with tests before expanding substantially.
7. **Verification discipline**: inspect remote CI after push; do not treat local tests as observed CI. Existing record/browser/deployment defects are separate. On a new 30-minute run, start clock, run focused baselines once, pick one bounded task above, stop features around minute 25, commit/push handoff by minute 28, report before minute 30.

## Copy-ready continuation prompt

> Work in thanks-cohn/any-shape on main. Read forever-works/PROPOSALS/ANY_SHAPE_UNIVERSAL_SOFTWARE_RECONSTITUTION.md, codex/HANDOFF_LATEST.md and codex/NEXT_RUN_SOURCE_NEUTRAL_FOUNDATION.md in order. Preserve the source-neutral specification/adapters/planner and the unchanged Chrome/EIR v1 workflow; do not rebuild completed foundations or introduce provider-specific permanent formats. Run the 65 foundation tests, 65 legacy pipeline tests and activated real compiler integration once. Choose one bounded next step, preferably an immutable generic review/accepted-contract checkpoint bound to document/module/source hashes, or a small typed domain/effect vertical slice with independent negative fixtures. Current generic products are plans only, planned source parsers/browser output are unsupported, native hosts are incomplete, and release promotion remains blocked. Use a 30-minute budget: verify/save at minute 25, commit and push an updated handoff by minute 28, then report before minute 30.
