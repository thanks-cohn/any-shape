# Source-neutral specifications and derivation planning, v0.1

Any-Shape accepts authorized evidence and owner requests, then plans independently identified products. Chrome extension intake remains the first implemented software-source adapter. The format and planner do not assume a source platform, target OS, framework, application name or agent provider. **This increment validates and plans; it does not synthesize new product behavior or grant access.**

## Run the foundation

From the repository root after `npm ci`:

```sh
npm run reconstitute -- adapters
npm run reconstitute -- validate specifications/companion-ecosystem/specifications.json
npm run reconstitute -- plan specifications/companion-ecosystem/specifications.json
npm run reconstitute -- context specifications/companion-ecosystem/specifications.json \
  --product mobile-companion --target android
npm run reconstitute -- plan specifications/companion-ecosystem/specifications.json --run demo-one
npm run test:foundation
```

`validate` resolves/validates documents and reports document hashes, resolved semantic hash, limits and uninterpreted extensions. `plan` invokes available static source adapters, assesses targets, produces relationship-specific obligations and a traceability graph. `context` selects one product/target, its requirements, relevant evidence/integrations and source status; it does not copy another target's UX assumptions or the entire source dossier into that context.

Optional `--workspace <root>` sets the root for source paths and retained attempts (default: repository root). All specification source paths are workspace-relative; module paths are root-specification-directory-relative. `plan --run <slug>` retains immutable `run.json`, resolved specification, document receipts and derivation plan under `runs/<job-id>/<run-id>/`. Repeating identical work reuses those files; collisions fail before replacing prior data. Generic run manifests have a distinct format and cannot overwrite a historical extension run at the same path. Candidate paths are planned as `candidates/products/<product-id>/<target-id>/`; no generic generator or production writer is invoked.

## Concrete demonstrations

- `specifications/companion-ecosystem/`: specification-only, modular/pinned requirements; a new Windows/Linux record console, a browser assistant, and an Android companion. Integrations are explicitly missing/review-required. Browser generation is unsupported, not a fake successful shell.
- `specifications/android-adaptation/`: a simulated Android source descriptor and Windows/Linux adaptation request. Android intake is **metadata-only/UNSUPPORTED**; the planner never fabricates a filesystem parse or inferred app behavior.
- `specifications/extension-compatibility/`: the existing synthetic popup source inspected by the real Chrome adapter, preserving the original EIR v1/source hash. Native target assessment advertises the existing incomplete-host machinery and its limits.

Every sample is unreviewed. Fixture author declarations authorize only synthetic static inspection. No real application or private data is included. A valid specification is not owner approval, a verified behavior contract, an OS/API permission grant, or a production release.

## Portable contract

The schemas are [root job](schemas/specifications-v0.1.schema.json), [module](schemas/module-v0.1.schema.json), and [adapter descriptor](../adapters/adapter-v0.1.schema.json). Validation uses the already pinned Ajv dependency; no new runtime dependency was introduced.

The root has `specificationVersion: "0.1"`, `jobId`, purpose, sources, requested products, requirements, acceptance cases, interactions, dependencies, review and provenance. Optional `modules`, `incompatibilities` and namespaced `extensions` add structure. Source IDs, job IDs, product IDs, target IDs and run IDs are distinct namespaces, even when their spelling matches. Filesystem identities are stable lowercase slugs; semantic requirement/case IDs may use dotted names. IDs do not convey authority.

Each source declares type, safe local path, original name/version, immutable content hash (or explicit unknown `null`), provenance, access declaration/scope/reference and unknowns. A supported source is inspected only when scoped owner access is declared. Hash mismatches fail closed; missing pins block accepted downstream work. Planned/unknown adapters report unsupported and do not invent hashes or observations. A `specification-only` source adapter can represent declarations without asserting an existing application's behavior; a pure new-product job can have no sources at all.

Products have their own identity/purpose, source/related-product references, targets, independent acceptance and dispositions: **preserve / transform / exclude / add**. Relationships are `reconstruct`, `port`, `adapt`, `companion`, `assistant`, `integrate`, `extend`, `new`. Reconstruction/port/adaptation/extension require source-parity and declared deviations; companions/assistants/new products use their requested outcomes and authorized interactions. Integrations need multiple peers. Dependency/derivation cycles, conflicting dispositions, wrong-namespace references and excluded requirements reused as obligations are rejected. The planner emits deterministic prerequisite order, not an implicit promise that sibling products are already implemented.

Requirements state meaning and claim/provenance separately: `requested`, `inferred`, `observed`, `accepted`. Accepted requirements require owner review/provenance. They can describe capabilities, invariants, data, UX, security and authority. Targets reference only their own UX/security/authority/data requirements and constraints. Invariants/capabilities need product-specific acceptance coverage. Data/state/message/effect semantics remain descriptive requirements in this version; an executable typed behavior language is **not implemented**.

Interactions explicitly name typed source/product endpoints, data requirements, API availability and scoped owner-review claims. Source permissions never become product grants. Even an owner-approved request records runtime permission checks as **NOT_RUN**. Missing APIs, denied source access and unreviewed integrations stay visible. Secret values are not accepted by any dedicated credential field; runtime secret bindings and actual access must be configured separately. Do not put private values in specification prose or source metadata.

Declared incompatibilities bind product and optional target IDs to requirements/reasons and block only the affected plans. No undocumented override order resolves conflicts. Dependency, interaction and target-plan evidence remain distinct.

## Large modular documents

`modules` references use `{ "id": "domain", "path": "modules/domain.json", "sha256": "<64 lowercase hex characters>" }`. During drafting the hash may be `null`; accepting a modular job requires all pins. A module has `moduleVersion: "0.1"`, matching `moduleId`, optional child references and section arrays. References resolve **relative to the root specification directory**, including child references. They are not remote URLs, arbitrary JSON Schema execution, JSON Pointers, imports or scripts.

The loader rejects traversal, encoded/ambiguous paths, symlinked ancestors/files, hardlinks, cycles, identity/path collisions, conflicting repeated pins and duplicated entity IDs. Shared DAG references load once. Modules add sections; they cannot override root review/provenance or another extension namespace. Duplicate requirements/products are conflicts, never last-writer-wins. Root declaration order is retained; child traversal sorts module IDs for stable merging. Document SHA-256 hashes bind exact bytes; resolved specification hashes use canonical JSON (sorted keys, retained array order). Reordering references may retain the same resolved meaning while changing the exact document bundle receipt.

Default configurable loader budgets: **64 documents, reference depth 12, 4 MiB/document, 16 MiB total, 200000 JSON nodes, JSON nesting 64**. Product dependency depth is bounded at 128. These are resource guards, not a small prose-only specification limit. Use programmatic `loadSpecification(path, {limits})` for reviewed larger budgets. Full validation still runs before selective context retrieval; a small context view is not a substitute for the complete contract.

Unknown top-level/safety fields and schema versions fail validation. Namespaced extension data is retained, but each uninterpreted namespace is reported and blocks affected target planning rather than silently changing safety or behavior. No automatic schema migration is implied: pin v0.1 documents and use explicit, reviewed translators for later versions, preserving original bytes and evidence.

## Adapters and neutral APIs

- `loadSpecification(path)` → resolved specification, schema/reference result, exact document receipts and bundle hash.
- `validateSpecification(resolved)` → semantic hash, extension notices and deterministic product order.
- `AdapterCatalog.register('source'|'target', adapter)` / `discover()` → JSON-schema-checked, immutable descriptors with implementation status, input/output type IDs, capabilities, limits and evidence scope.
- `SourceAdapter.inspect({source, root, specification})` → static observations or structured unsupported/declaration/access status. It cannot grant authority or assert unobserved runtime success.
- `TargetAdapter.assess({specification, product, target, sourceReports})` → implementation/review-required or unsupported plan. Assessment cannot supply build/runtime PASS.
- `TargetAdapter.generate(...)` → optional implementation attempt, currently only a reviewed legacy EIR bridge for incomplete native hosts.
- `planDerivation(loaded, {workspace, catalog})` → target- and relationship-scoped plans, source reports, graph, dependency order and explicit unrun proof gates.
- `targetContext(plan, {productId,targetId})` → a bounded relevant view with no cross-target requirement leakage.

The neutral validator/planner/context and shared `core/` do not import source or framework implementations. `adapters/builtins.mjs` is the composition root. Adding a trusted adapter requires a descriptor and implementation registration, not an enum edit in the specification or a branch in the planner. Installed adapter code is trusted developer code; this is not a sandbox/plugin loader for uploaded scripts.

Builtins: Chrome source inspection and specification declarations are implemented; Android source/binary and desktop source/binary adapters are planned/unsupported. Avalonia advertises **reviewed EIR v1 incomplete-host generation, architecture lint and compiler invocation**; it does not claim generic semantic generation or verified native behavior. Browser-extension output is planned/unsupported. Compiler success is separate from on-target execution, effect verification and independent release approval.

## Preserve the first implementation

All existing `npm run pipeline -- ...` commands, `extensions/<id>/source/`, EIR v1, source hashes, isolated target builds and fail-closed release commands remain. The original helper APIs are re-exported from the same module paths. Shared filesystem/JSON utilities now live in `reconstruction/core/`; legacy engine fingerprints include shared helper sources so future helper changes are attributed. Historical run hashes/manifests are never rewritten.

A reviewable translation is available:

```sh
npm run reconstitute -- from-extension runs/<extension>/<run>/eir.json
# Optional --job <new-job-id> and --product <independent-product-id>
```

This emits v0.1 JSON to stdout; it does not modify the EIR or old run. It preserves source identity/hash and three historical target defaults in the **compatibility adapter**, while starting a fresh unreviewed owner request and requiring scoped source access. Legacy acceptance is never upgraded into generic owner acceptance. Unknown translated namespace metadata remains explicit. The native target wrapper can delegate an already-reviewed EIR to the existing generator; it refuses to coerce arbitrary specifications into accepted EIR.

## Why, replacement and proof

**WHY:** distinguish enduring purpose and requested relationships from the first source/framework experiment; avoid destructive migration and source permission inheritance. **WHAT:** open validated JSON jobs, secure modular loading, truthful adapter discovery, traceable multi-product plans and scoped context. **HOW TO REPLACE:** implement the same schemas, identity/reference/security rules, canonical hashes and fixture outcomes in another language/runtime; keep old EIR workflows behind explicit adapters. **PROOF:** `npm run test:foundation`, the unchanged 65-test extension suite and opt-in real native compiler integration. Native CI/runtime release evidence is separate.

Not implemented: Android/desktop code or binary parsing, generic executable semantic generation, authenticated owner approval, actual cross-product APIs/data synchronization, trusted independent evaluator integration, generic packaging/promotion or native behavioral/installation proof. Existing per-target release refusal remains unchanged. Filesystem safety assumes quiescent inputs; no concurrent-writer sandbox or universal reverse engineering is claimed.
