# Extension Pipeline — portable foundation 0.1

**Status: initial implementation, not a converter.** No real extension source has been used. This module is intentionally independent of the Any-Shape browser CSS library, cloud systems, React Native and Avalonia.

## Contract boundary

Input: directory containing an unpacked, owner-authorized Chromium extension with `manifest.json`. Output: immutable, structured inventory of manifest-declared surfaces, permissions, script paths, assets and evidence-backed uncertainty. The output is a candidate input for later semantic analysis, not a verified functionality description.

```sh
node reconstruction/extension-pipeline/bin/inspect.mjs reconstruction/extension-pipeline/fixtures/popup-basic
node --test reconstruction/extension-pipeline/tests/*.test.mjs
```

Core API: `inspectExtension(root)` returns `{format,formatVersion,source,surfaces,permissions,dependencies,findings}`; library returns serializable data; CLI prints JSON and exits nonzero on invalid package. No external npm dependencies, no network calls, no evaluation of extension source. File contents outside the manifest are not executed. Symlinked paths are excluded to avoid traversing outside the package.

## Contract stability

- `source.id` and `source.version` come from the manifest; not user-assigned authority.
- Every finding has `level`, `code`, `detail` and an observed file or manifest source when possible.
- The inspector does **not** claim behavioral completeness: permissions and declared entrypoints are evidence of potential operations only.
- Missing, invalid or non-string manifest fields are explicit findings or rejected inputs, not silently repaired.
- File paths in the package must be relative, normalized, and contained within the package. Unresolved resources produce findings.
- The inspector cannot transform the extension into a native app. Generator and evaluator adapters are future modules consuming neutral contracts.

## Replacement notes

**WHY Node?** Any-Shape already has Node 22 for reproducible repository scripts and a built-in filesystem/JSON API; no new package dependency is needed. **WHAT?** Read-only manifest ingestion and deterministic inventory. **HOW TO REPLACE?** Reimplement the same JSON contract and fixture oracles in Python, C#, Rust, or a future runtime; do not imitate Node file handling. Compare findings and path-security behavior on supported fixtures. Language/runtime is contingent, contract and safety outcomes are not.

Next: analyze source references/message flows without executing unknown code; introduce a versioned EIR JSON Schema and evidence ledger; then independent target adapters, initially Avalonia and React Native. Follow [the source-blind profile](../../forever-works/EXTENSION_RECONSTRUCTION_STANDARD_V0_1.md). Architecture and decisions must remain additively documented by Period.
