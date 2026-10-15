# Session 01 — generic three-target pipeline foundation

Written 2026-10-15 at approximately 04:56 CDT (09:56 UTC). Implementation began at 04:32:23 CDT (09:32:23 UTC); approximately 24 minutes elapsed. Branch: `main`. Implementation HEAD at handoff authoring: `a1b46f15a165df63a8501c81f2c8bf43b1dafe41`. Working tree was clean before adding this handoff/results. This handoff is committed immediately afterward; locate its exact successor commit with `git log -1 --format=fuller -- codex/HANDOFF_LATEST.md`. No implementation is left only as an uncommitted edit.

## Start here

Read this file, `AGENTS.md`, `codex/BUILD_GENERIC_THREE_TARGET_PIPELINE.md`, then `reconstruction/extension-pipeline/README.md`. Continue in this checkout on `main`; do not create a worktree or reset local progress. The assignment is intentionally larger than one session. **No reconstructed production application exists yet.**

### Saved commits and remote

Both implementation commits were successfully pushed to `origin/main` using the existing platform Git authentication:

- `46c0a0adb51b71917b080cea48049e05dd1c7baf` — safe intake, reviewed EIR and isolated candidate workflow.
- `a1b46f15a165df63a8501c81f2c8bf43b1dafe41` — native compiler verification, reproducible tooling/cache, operator docs and CI.

The handoff commit is created and pushed after writing this file; the final session response records its hash and observed push result. No force push/reset or credential extraction was used. For recovery, fetch `origin/main`; a local `artifacts/pipeline-progress.bundle` and checksum are also exported after the handoff commit. If a new cloud snapshot loses ignored local artifacts, the committed code, fixtures, tests, toolchain pins and this handoff are remotely recoverable. Native caches are optional and can be recreated; fresh-task snapshot restoration itself was not tested.

## Bounded goal completed

Implemented a generic safe-intake → static-observation → EIR review → target plan → isolated native-host skeleton → architecture/compiler evidence workflow. The focus was foundational infrastructure that can fail honestly, not invented extension functionality.

Concrete behavior:

- `npm run pipeline -- inspect|analyze|plan|review|generate|verify|package|promote|status|run ...` is a coherent structured-JSON CLI. `run` first checkpoints and stops for review; with `--contract <hash>` it resumes generation/verification for all three targets, optionally `--build`.
- Inputs: `extensions/<slug>/source/manifest.json`. Traversal is read-only and bounded; imported JS is never executed or treated as agent instructions. Rejects unsafe slugs/paths, ancestor/file symlinks, hardlinks, nonregular files, case collisions, malformed manifests and input quotas. Defaults: 4096 entries, depth 24, 8 MiB/file, 64 MiB total, 200000 analyzed syntax nodes.
- Full inventory file hashes and canonical JSON bind source, analysis, reviewed contract, engine/lockfile fingerprint, candidates and target reports. Immutable checkpoint writes reuse identical content and reject collisions. Source changes invalidate downstream operations while history remains inspectable. Stage failures and recovery context are retained.
- Acorn/parse5 discover actual syntax for APIs/events/messages/storage/imports, HTML surfaces/roles/assets and commands. Observed syntax and inferred capabilities remain separate. Browser DOM/privilege dependencies have explicit unsupported/unknown target gaps. Dynamic/unparsed/missing artifacts remain unknown rather than guessed.
- Project-local EIR v1 JSON Schema validates portable source/capability/authority/state/message/UI/evidence/target fields, namespaced future extensions and references. Review needs a named reviewer and one disposition for every capability; preserved/corrected obligations need invariants, UI semantics and acceptance cases. Review cannot rewrite original observations/source/unknowns. This is a local reviewer assertion, not authenticated approval. No canonical Forever Works schema/model was modified.
- `TargetAdapter` / `AvaloniaAdapter` produce three **INCOMPLETE** standalone hosts, each containing its own Domain project and host, SDK/Avalonia pins, traceability/context, product manifest and instructions. Desktop/window and Android/activity/single-view sources are distinct; no sibling product dependency or imported extension code. Every screen explicitly says reconstruction is incomplete. No extension capability is implemented.
- Conservative lexical architecture lint rejects OS/UI imports in Domain, cross-target APIs, forbidden packages/project edges and certain unsafe MSBuild/native constructs. It is not a full C#/MSBuild analyzer/security sandbox.
- Real .NET compiler invocation captures target/build-host identity, source/contract/engine hashes, dependency-lock hashes, command, exit status and output. `bin`/`obj` are excluded from input hashing/linting. Repeated builds work with retained NuGet packages.
- `package`/`promote` always fail closed for current candidates. Even forged all-PASS records cannot bypass missing trusted independent evaluator integration. No command currently writes `productions/`.

## Changed paths

Core and workflow:

- `reconstruction/extension-pipeline/src/safety.mjs`
- `reconstruction/extension-pipeline/src/inspect.mjs`
- `reconstruction/extension-pipeline/src/analyze.mjs`
- `reconstruction/extension-pipeline/src/contract.mjs`
- `reconstruction/extension-pipeline/src/adapter.mjs`
- `reconstruction/extension-pipeline/src/workspace.mjs`
- `reconstruction/extension-pipeline/bin/any-shape.mjs`
- `reconstruction/extension-pipeline/schemas/eir-v1.schema.json`
- `reconstruction/extension-pipeline/samples/popup-basic.eir.json`
- `reconstruction/extension-pipeline/tests/analysis.test.mjs`
- `reconstruction/extension-pipeline/tests/safety.test.mjs`
- `reconstruction/extension-pipeline/tests/workspace.test.mjs`
- `reconstruction/extension-pipeline/tests/native-build.mjs`
- `reconstruction/extension-pipeline/fixtures/download-manager/{manifest.json,worker.js,policy.js,ui/options.html,ui/options.js}`

Tooling/docs: `package.json`, `package-lock.json`, `.github/workflows/verify.yml`, `.gitignore`, root `README.md`, `extensions/README.md`, pipeline `README.md`, `forever-works/periods/P001_EARLY_EXPERIMENTAL.md` (addendum only), `resources/avalonia/{README.md,CACHE_STRATEGY.md,toolchains.json}`, and `resources/avalonia/bootstrap/{activate.sh,install-dotnet.py,prefetch.sh,preflight.mjs}`. This handoff and the adjacent dated result JSON are operational-only; they are not permanent standards or generator inputs.

## Actual verification

All commands below were executed, not merely added to CI. CI workflows were updated but remote CI outcomes were not observed during this session.

| Command/check | Actual outcome |
| --- | --- |
| `npm run test:pipeline` | **65 passed, 0 failed/skipped**, final run after `npm ci`. Includes three different fixture architectures, malicious input, schema/review, immutable resume, architecture, CLI orchestration, source/evidence tampering and false promotion. |
| After activation: `npm run test:pipeline:native` | **1 integration test passed, 0 failed/skipped**. Real Linux and Windows RID builds, repeated cached builds, then invalid C# required to produce real compiler errors for each. No runtime/behavioral claim. |
| `npm run test:unit` | **4 passed**. |
| `npm run typecheck` | **PASS**. |
| `npm run test:destinations` | **5 passed**, including a real independent local HTTP receiver. |
| `npm run test:website-export` | **3 passed**. |
| `npm run test:forever` | **4 passed**. |
| `AS_CHROMIUM_PATH=/usr/bin/chromium npm run test:package` | **PASS**, external JS/CSS/schema/type/static-adopter smoke. |
| Same override, `npm run test:recovery` | **PASS**, replacement harness and accessibility probe. |
| Saved install script executed end-to-end | **PASS**: frozen `npm ci`, SDK reuse without download, activated writable runtime, desktop seed restore already up-to-date. |
| SDK acquisition | **PASS**: .NET 10.0.402 archive SHA-512 matched Microsoft official release metadata; SDK installed outside Git. |
| Template inspection/bootstrap | Avalonia.Templates 12.1.4 installed; actual `avalonia.xplat --help` inspected. Existing `--no-restore` flag was invalid; removed after checking template post-actions. Desktop-only seed restore passed and repeat restored from cache. |
| `npm run dev`, `npm run dev:webhook-lab` plus functional HTTP checks | All three form routes returned HTML; synthetic POST returned 202 and appeared in independent receiver `/events`. These loopback services were started in this session; restart if needed. |
| `git diff --check` | **PASS** before implementation commits. |

Target build matrix for latest retained coordinated run `synthetic-download-smoke/session-two`:

| Target | Architecture | Compiler | Native runtime / install / effects / accessibility / release |
| --- | --- | --- | --- |
| Linux | PASS | PASS, linux-x64, SDK 10.0.402 / Avalonia 12.1.4, zero warnings/errors | NOT_RUN; incomplete host only |
| Windows | PASS | PASS, win-x64 **cross-compiled on Linux**, zero warnings/errors | NOT_RUN; no Windows runner |
| Android | PASS | FAIL: **NETSDK1147**, Android workload missing | NOT_RUN; no workload/SDK/device/signing baseline |

Exact coordinated command (exit 1 is expected from the Android build failure):

```sh
npm run pipeline -- run synthetic-download-smoke session-two \
  --contract 14855796395d6ec0c5bbc028cc7a247fb28521537988efc0f33ee6d98c53dd9c --build
```

This fixture's reviewer explicitly deferred every capability. It is a host/tooling test, not owner acceptance or a converted download manager.

### Other existing checks and limits

- `node scripts/validate-forever.mjs forever artifacts/onboarding/forever`: **FAIL**, two invalid `verification[0].type` enums in `capabilities/openform-reference.json` and `invariants/openform-orientation.json`; upstream integrity PASS, CLI valid true, published schema invalid, **14 audit findings**. These records were not changed.
- `npm run test:deployment-lab`: **FAIL before tests execute**, existing syntax error at `tests/cloudflare-pages-reference.test.mjs:11` (missing `)`); not repaired in this pipeline task.
- `AS_CHROMIUM_PATH=/usr/bin/chromium npm run test:browser:isolated -- --project=chromium --workers=2`: **41 passed, 5 failed** (Flow receiver/local submit, Schema interaction, Studio submit/status and embedding). Failures include stale/ambiguous selectors, timeouts and missing expected status. **Caveat:** this onboarding run overlapped a temporary schema build/restore, so rerun on a fixed source tree before treating it as a clean baseline or diagnosing all failures. The tracked generated JS was restored to its original content before pipeline implementation. No browser application logic was changed.
- Pinned Playwright download attempts returned HTTP 403 `Domain forbidden` at `cdn.playwright.dev`. Full pinned Chromium/Firefox/WebKit matrix remains unrun. System Chromium was available. No TLS/signature/checksum checks were disabled.

## Local environment and artifacts

```sh
cd /workspace/any-shape
export AVALONIA_CACHE_DIR=/workspace/.toolchains
export DOTNET_INSTALL_DIR="$AVALONIA_CACHE_DIR/dotnet"
source resources/avalonia/bootstrap/activate.sh
node resources/avalonia/bootstrap/preflight.mjs
npm run test:pipeline
npm run test:pipeline:native
```

Activation uses writable `DOTNET_CLI_HOME`, `XDG_RUNTIME_DIR`, temporary and NuGet directories; **do not overwrite HOME**. Without writable XDG runtime, .NET first-time NuGet mutex initialization failed against read-only `/home/agent/.dotnet`; activation fixed it. Cache ~1.2 GiB retained outside Git; no archive publication or offline/fresh-machine guarantee. Python 3.12.14, Node 24.19.0 were available. `install-dotnet.py` reuses this matching SDK or recreates it with the pinned official hash.

Ignored local evidence: `artifacts/pipeline-session-01/` (test/build/bootstrap/browser logs, checkpoint/status, target summary), `runs/synthetic-download-smoke/session-one/` and `session-two/`; synthetic inputs at `extensions/synthetic-download-smoke/source/`. `session-two` is the final engine-fingerprinted run. If these ignored paths are absent on a fresh checkout, rerun the committed synthetic tests; they are not required code inputs.

Cloud draft saved **install_script**, **start_skill**, and requested Playwright network domains `cdn.playwright.dev`, `playwright.download.prss.microsoft.com`; unrelated presets/secrets were preserved. Latest install instructions were actually executed successfully. Draft saving is not publication: review/save in environment settings, then publish when desired. No fresh-task snapshot validation was done. No new secrets are required for the implemented local workflow.

## What remains incomplete / risky

1. No semantic code synthesis: generator emits honest native host scaffolds only. State/messages/behavioral obligations are presently reviewable descriptive fields, not an executable typed domain model. Avoid app-specific native recipes or hardcoding the future real extension.
2. No independent held-out behavioral evaluator/attestation or real packaging/promotion path; release refusal is intentional. Local reviewer names are not authenticated identity.
3. Android workload/SDK/JDK/emulator/device, Windows runtime runner, Linux GUI runtime, accessibility and installation/signing/update/recovery checks are unavailable/unrun. No production outputs exist.
4. Static parsing does not establish causal behavior. Aliases/dynamic imports/remote services and CSS/TS/JSX/Wasm parsing need bounded adapters and explicit unknowns. Unknown dispositions need richer review before accepting executable behavior.
5. Filesystem safety assumes quiescent inputs; no protection against a concurrent malicious writer. Dependency lint is lexical and has known dynamic-language/MSBuild escape limits; it is not a sandbox for hostile build code. Do not execute imported extension code.
6. Existing browser/record/deployment-test defects remain separate; do not disable checks to make CI green. Native CI job was added but remote results need inspection.

## Next small ordered tasks (one more 30-minute run)

1. Fetch `main`, read this handoff and run the **65-test** pipeline suite plus activated compiler integration once; retain their actual results. Inspect new remote CI job failures if any, without redoing all completed setup.
2. Choose **one bounded, generic supported behavior vertical slice** (for example a reviewed portable state transition/persistence contract) across at least two synthetic sources. Add a typed schema/independent stimulus-oracle fixture and negative cases **before** generating behavior. Keep observed source facts, owner decisions and target implementation separate. Do not hand-port a flagship.
3. Implement that neutral domain behavior and a real Linux host adapter driven by the reviewed contract, with actual effect/persistence/error probes. Keep other capabilities/targets incomplete; add meaningful compiler/domain tests. Do not flip `releaseEligible` based on compilation.
4. Separately provision/pin Android workload + JDK/SDK only if the session budget allows; otherwise leave exact reproducible missing requirements. Compare emitted Android host against the actual official 12.1.4 template before claiming compatibility. No Windows/Android runtime PASS without those runners.
5. Add a trusted, independently scoped evidence-import/attestation design before allowing promotion. Bind proofs to current artifact/contract/source/target hashes and every accepted requirement. Missing/borrowed/forged evidence must still fail closed.
6. At minute 20 assess scope, minute 25 stop features and verify, by minute 28 commit an updated handoff, push when permitted, and report before 30 minutes. Existing browser/record repair is a separate bounded task unless it blocks the selected slice.

## Copy-ready continuation prompt

> Work in thanks-cohn/any-shape on main. Read codex/HANDOFF_LATEST.md and codex/BUILD_GENERIC_THREE_TARGET_PIPELINE.md, then continue from the saved commits without redoing completed intake/EIR/orchestration/toolchain work. Respect AGENTS.md and keep source uploads untrusted/read-only. Use a 30-minute session: verify the 65 pipeline tests and activated real compiler integration, then implement one generic reviewed semantic/domain-and-effect vertical slice with independent negative tests. Current outputs are incomplete hosts; never claim extension reconstruction or three-platform runtime success from scaffold compilation. Preserve fail-closed release gates and canonical Forever Works compatibility. Begin verification/handoff at minute 25, commit and push progress plus an updated codex/HANDOFF_LATEST.md by minute 28, and report before minute 30.
