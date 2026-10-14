# Codex handoff: reconstruct Any-Shape from meaning

Read `AGENTS.md`, `forever/manifest.json`, the three `docs/RECONSTRUCTION/` documents, `docs/FOUNDATION/PURPOSE.md`, `docs/FOUNDATION/CONTRACTS.md`, and Forever Works' `docs/STANDARD.md`.

1. Validate `forever/` using canonical Forever Works v0.1 CLI and audit. Resolve schema and graph issues rather than weakening the standard. All extracted statements are agent-proposed, pending approval; respect provenance.
2. Audit meaning completeness: can a new agent deduce actors, conditions, examples, outcomes, exceptions, constraints and conflicts without seeing code? Record gaps and changes.
3. Run a STRICTLY ISOLATED reconstruction process with only the neutral model, bootstrap and conformance spec. Explicitly block access to original source, original tests, screenshots and implementation reports.
4. Choose a distinctly different authoring language or architecture. Browser-output HTML/CSS is acceptable. Deliver a working replacement, not a paraphrased design document.
5. Have an independent evaluator run AS-001 through AS-016 on old and new outputs. Distinguish semantic parity from drop-in API parity and aesthetic approval; store PASS/FAIL/UNKNOWN with evidence.
6. Prove an optional dependency/tool can fail or be replaced without losing project purpose.
7. Commit results, reproduction instructions, raw sanitized evidence, knowledge gaps, updated agent handoff, and API docs if changed. Do not assert universal language portability or claim tests you didn't run.

The victory condition is measurable reconstruction from purpose alone, NOT model creation or copying existing source.
