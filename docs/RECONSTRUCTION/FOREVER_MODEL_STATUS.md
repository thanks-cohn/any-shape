# Forever Works model: authority, validation and scope

The model uses the actual Forever Works v0.1 standard and published schemas, pinned at upstream commit `55c81544a5ae3cfa08959c95d805a677db07d43f`. Unmodified normative documents, schemas, Python CLI/binding, complete example and MIT license are retained in `vendor/forever-works/`. `UPSTREAM.json` records origin and SHA-256 hashes; `check:forever` verifies them before use.

## Authority

The universal mission in `intent.any-shape` is an explicit owner statement from handoff 002 and the present request. Technical graph mappings, ontology, protocols, constraints, policies, candidate implementations and migrations remain **agent-proposed / unreviewed** unless explicitly attributed otherwise. The intent record's graph-mapping extension preserves that distinction. Successful serialization/tests do not ratify proposals.

Earlier report evidence is `historical`; fresh evidence is `imported` with content hashes and narrowly described scope. Neither demonstrates all future capabilities. Canonical review statuses are `unreviewed`, `accepted`, `rejected`; preliminary `pending` values were corrected without inventing owner acceptance.

## Executed validation

```sh
npm run check:forever
vendor/forever-works/packages/cli/bin/forever --root forever validate
vendor/forever-works/packages/cli/bin/forever --root forever audit
```

Final model: **68 records**, actual CLI `valid: true`, published draft-2020-12 schema validation valid, supplemental references valid. Audit reports **13 `capability-no-implementation` findings**, corresponding to proposed broad capabilities without complete production realizations. Scoped proof/evaluator mechanisms are real and linked in the graph, but were not mislabeled as full universal implementations to erase findings.

The upstream Python CLI does not enforce every published-schema enum/field/type and omits some reference fields. This is an adapter limitation, not permission to weaken the standard. The additional Ajv2020 gate checks actual canonical schemas and explicit scopes/replacement/claim references. Negative regressions prove `pending` provenance and orphan replacement requirements fail even when CLI alone can miss them. CLI exit zero does not guarantee valid or issue-free JSON; inspect results.

Raw outputs are `docs/CODEX/evidence/002/forever-validate.stdout.json`, `forever-audit.stdout.json` and stderr files; summary/commands/pin are in `forever-validation.json`. Initial load failures are preserved separately. No upstream file was changed to make Any-Shape pass.

## Replacement and migration verdicts

The actual CLI evaluates `dependency.proof-selfcheck` → `implementation.independent-evaluator` as **pass** within the declared 12-request coverage after physical harness deletion. `migration.proof-harness-to-independent` also **passes** scoped preservation/evidence requirements. Python domain/runtime and the browser driver remain; full driver replacement is unknown.

`migration.browser-to-python-proof` is **partial**, not adopted. It has bounded independent context/no-JS/privacy observations, but general capabilities, full identity/accessibility, guaranteed source isolation and legacy CSS/ESM/schema drop-in compatibility are not established. Missing claims/evidence remain unknown under the actual closed-world rule. The original browser package remains intact.

## Remaining victory conditions

Semantic understanding was externally reviewed against the explicit mission; scoped functional reconstruction was independently executed. Strict enforced isolation, aesthetic approval, native zoom/screen readers/hardware, arbitrary dataset/editor/native targets, production authority/storage and broad resource equivalence remain unknown or proposed. See `IMPLEMENTATION_REPORT_002.md` and `NEXT_AGENT_HANDOFF.md`; format validity is not universal conformance.
