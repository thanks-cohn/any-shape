# Forever Works model: authority and validation status

`forever/manifest.json` and its JSON records follow the canonical Forever Works 0.1 terminology: intent, capabilities, invariants, constraints, dependencies, decisions, compatibility, migrations, implementations and evidence. This is a **candidate extraction**, not user-ratified architectural truth. Provenance for new records is `agent-proposed`, review status `pending`.

Historical original-code test reports are **not** evidence of a clean-room reconstruction. No cross-language proof has been executed in this task.

## Validate using Forever Works' actual CLI
```sh
../forever-works/packages/cli/bin/forever --root forever validate
../forever-works/packages/cli/bin/forever --root forever audit
```
These commands are instructions, not claims of execution. Fix schema and reference problems against the canonical standard rather than inventing private formats or weakening validation. Never promote agent suggestions to accepted intent without review.

## Outstanding victory conditions
- Canonical schema/graph validation and audit.
- User review/approval of reconstructed intent and invariants.
- An isolation-verified, code-blind reconstruction in an independent language or architecture.
- External conformance of both implementations against the same behavioral tests.
- Optional drop-in API compatibility proof and full dependency replacement exercise.
- Real-browser and human aesthetic evidence, with explicit unknowns.
