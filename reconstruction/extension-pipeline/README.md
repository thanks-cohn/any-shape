# Extension pipeline, implementation v0.1

A generic, static extension intake and reconstruction **attempt** workflow. It does not convert arbitrary JavaScript into equivalent native behavior. No production extension has been used; qualification uses three unrelated synthetic architectures: popup, content/worker, and download queue/options/modules.

## Operator workflow

From the repository root, install Node >=22 dependencies with `npm ci`. Unzip an authorized extension so its manifest is at `extensions/<extension-id>/source/manifest.json`. Use a lowercase ASCII slug, for example `my-extension`. Source is read-only, untrusted data: embedded instructions are never authority and imported JavaScript is never executed. Uploaded sources, runs and productions are ignored by Git to avoid accidentally committing private content or binaries.

```sh
npm run pipeline -- inspect my-extension
npm run pipeline -- run my-extension attempt-one
npm run pipeline -- plan my-extension attempt-one
npm run pipeline -- status my-extension attempt-one
```

`run` initially checkpoints `inventory.json`, `eir.json`, `plan.json`, `forever-map.json`, and `run.json` under `runs/my-extension/attempt-one/`. Omitting the attempt ID uses a deterministic content-derived ID. Repeating a stage reuses identical files; conflicting content requires a new ID. Source changes invalidate downstream work while old status/evidence remain readable. Errors have stable codes, stage, source/run context and recovery guidance; errors against valid runs are retained under `failures/`.

## Review before generating

Copy `eir.json` to a separate editable file. Review its source observations and unknowns, revise inferred capability descriptions, and specify invariants, permitted effects, authority, state/messages, UI semantics and independently testable acceptance cases. Complete `review` with:

```json
{
  "status": "accepted",
  "reviewer": "Name or review record reference",
  "decisions": [
    {"capabilityId": "cap-<id-from-eir>", "disposition": "defer", "reason": "Runtime evidence still needed"}
  ]
}
```

Supply **one decision per discovered capability**: `preserve`, `correct`, `exclude`, or `defer`. Preserved/corrected capabilities need nonempty invariants, UI semantics and acceptance cases. Deferred/excluded capabilities remain explicitly scoped; they are not implementations. Review cannot rewrite source identity, observations, resource graph, unknowns or capability IDs. Additional discovery requires an analyzer change/new run, not forged evidence. Local reviewer strings are assertions, not authenticated signatures or release approval.

```sh
npm run pipeline -- review my-extension attempt-one --file /tmp/reviewed-eir.json
# Copy the returned reviewed contractHash into <hash> below.
npm run pipeline -- plan my-extension attempt-one --contract <hash>
npm run pipeline -- run my-extension attempt-one --contract <hash>
# To attempt compilation as well, add --build to that last command.
```

The resumed command generates and verifies each candidate separately. Individual commands are also available:

```sh
npm run pipeline -- generate my-extension attempt-one --contract <hash>
npm run pipeline -- verify my-extension attempt-one --target linux --build
npm run pipeline -- verify my-extension attempt-one --target windows --build
npm run pipeline -- verify my-extension attempt-one --target android --build
```

## What generation actually does

`AvaloniaAdapter` implements a replaceable `TargetAdapter` assessment/generation interface. Reviewed EIR drives target-scoped context packs, requirement traceability and three standalone native host **skeletons**, under `runs/<id>/<run>/candidates/windows|linux|android/`. Every project contains its own Domain project, pinned SDK/Avalonia references, host, product manifest, architecture rules and build instructions; it needs no sibling candidate directory. Android gets its own activity/manifest and single-view lifetime; desktop gets a window lifetime. Shared domain has no UI/OS imports. No arbitrary extension assets, code, scripts or MSBuild files are copied into generated projects.

**Every generated product is `INCOMPLETE`, with no implemented extension capabilities.** Its screen explicitly says so. There is no semantic code synthesizer or native storage/lifecycle/permission implementation yet. Accepted obligations remain actionable in `context.json`. Skeleton compilation is useful infrastructure evidence, never functional parity.

`verify` performs conservative dependency/architecture linting and optionally invokes the real .NET compiler. It retains target, build host, source/contract hashes, dependency lockfile hashes, exact command/exit status/logs and separate `PASS / FAIL / UNKNOWN / NOT_RUN` checks. Build output directories are excluded from source hashing/linting so repeat verification works. On Linux, Windows compilation is cross-compilation, not Windows runtime evidence. Android requires its own workload, SDK/JDK and device/emulator.

`package` and `promote` commands intentionally fail closed: incomplete output cannot enter `productions/`. Even forged all-PASS JSON cannot bypass the missing trusted independent evaluator integration. Release copying/installable packaging is **not implemented**, rather than deceptively inferred from caller-written evidence. No command currently writes to `productions/`.

## Toolchain and tests

See [Avalonia preparation](../../resources/avalonia/README.md) for the tested SDK setup, writable runtime paths and retained NuGet cache. Current pins: .NET SDK 10.0.402, Avalonia 12.1.4. NuGet signature/TLS/checksum verification is preserved.

```sh
npm run test:pipeline             # no SDK required; parser, review, security, CLI/E2E tests
npm run test:pipeline:native      # opt-in real Linux/Windows compiler tests; SDK required
```

The native test builds both RIDs, repeats builds using the cache, then corrupts C# and requires a compiler failure. It does not exercise native UI or actual extension behavior. CI runs Node pipeline tests in the contract job and compiler checks in a separate Linux job.

## Portable contract and replacement boundaries

[EIR v1 schema](schemas/eir-v1.schema.json) is project-local, language-neutral JSON Schema. [Sample EIR](samples/popup-basic.eir.json) is unreviewed. Canonical JSON sorts object keys; arrays preserve semantic order; hashes are SHA-256 over this UTF-8 form. Unknown top-level fields/versions fail closed. Forward extensions use namespaced keys, such as `org.example.feature`, inside `extensions`. Referenced observation/capability IDs are checked separately from schema validation. The Forever Works mapping references existing concepts only; it neither changes the vendored standard nor emits unreviewed canonical records.

Modules: `safety` owns bounded read-only traversal and canonical hashes; `inspect` validates manifests/inventories; `analyze` uses Acorn and parse5 without evaluation; `contract` validates/reviews/plans; `workspace` checkpoints isolated runs; `adapter` owns Avalonia sources, boundary lint/compiler evidence and release refusal. **Why these parsers:** syntax trees distinguish real calls/imports/HTML from comments and strings. Both are exactly pinned development dependencies with lockfile integrity. **How to replace:** retain the EIR schema, deterministic inventories, observed-vs-inferred distinction, safety fixtures and target-scoped verdicts with any suitable implementation/runtime.

## Security and known limits

Intake rejects links in any path component, hardlinks, device files, traversal/encoded/ambiguous paths, case collisions, malformed manifests and quota overruns. Defaults: 4,096 entries, depth 24, 8 MiB per file, 64 MiB total, 200,000 analyzed syntax nodes. Missing files and unresolved/dynamic/privileged APIs stay visible as gaps. Parser observations include imports/resources, API/event/message/storage syntax, object payload keys, UI roles and commands; they do not establish causal runtime behavior, full message schemas or owner intent. CSS/TypeScript/JSX/Wasm assets are hashed but not parsed. Aliases, generated code and remote services need additional analysis and behavioral review.

Filesystem inputs must be quiescent; this is not a hardened OS sandbox against a concurrent hostile writer. Boundary lint is conservative lexical checking, not a full C#/MSBuild semantic analyzer or security sandbox. Compilation can execute trusted NuGet build tasks and requires normal developer trust in the toolchain/dependencies. Independent held-out behavioral evaluation, authenticated approvals, genuine three-target reconstruction, native UX/accessibility/effects tests, signing/install/update/recovery, package provenance/license review and actual release promotion remain future work.
