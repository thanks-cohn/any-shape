# Period Documents — additive project history

**Status:** Any-Shape continuity convention v0.1 (owner-directed); this convention is local to Any-Shape, not a modification of the separate Forever Works standard.

## Why periods exist

Software evolves in distinct circumstances: exploratory beginnings, initial proof, adoption, stabilization, new platform, architectural migration, and later preservation. A cold agent must know **which project actually existed when a document was written**. Otherwise it may mistake a proposed capability for a current one, overwrite an older verified behavior with a newer intention, or infer that past implementation limitations define the permanent purpose.

**Period Documents are additive, independently attributable snapshots of the state and reasoning of a project at a particular time.** They do not replace evergreen identity/invariants, machine-readable canonical records, or the actual source of the time. A later period may correct or supersede earlier conclusions, but should *link to the prior statement and give its reason and evidence*, not rewrite history.

## Period identity and document header

Every period has a stable identifier and one overview file, for example `periods/P001_EARLY_EXPERIMENTAL.md`. Include:

- **Period ID and descriptive name**, time bounds (or `open`), observation timestamp, source revision/commit if available, status (open/closed), scope and owner.
- **Historical situation:** actual product and architectural phase; what prompted the work.
- **Purpose continuity:** which enduring commitments apply, and which aspirations are merely planned in this period.
- **Current implementation:** precise components, languages, adapters, hosting, data, workflows and file paths that actually exist.
- **Verified evidence:** links/IDs, commands and environmental scope; separate implemented, tested, deployed and independently observed.
- **Known defects, risk and unknowns:** explicit unsupported behavior and unverified assumptions.
- **Decisions and alternatives:** why current choices were made; which choices are incidental and replaceable.
- **Delta from earlier period:** added, retained, corrected, deprecated, excluded, and migration obligations, with source links.
- **Future handoff:** what the next inheritor may change, must test, and must not silently assume.

A period may contain **any number of supplementary documents**, organized around its needs (design note, incident report, benchmark, user research, security review, experiment trace, aesthetic study, migration contract). Keep each independently linkable and keyed to a period; do not require a single giant monolith. A new document may have no predecessor. Documents spanning several periods should declare their applicability, not assume “latest” applies to everything.

## Relationship and conflict rules

1. **Evergreen mission** is separately maintained in `IDENTITY_AND_DECISIONS.md` and the canonical `../docs/IDENTITY/` source. New periods add evidence and interpretation; they do not silently redefine explicit owner intent.
2. **Canonical machine-readable records** remain in `../forever/` with their validated schemas and provenance. These period files are narrative supplements until formal schema support exists.
3. **Period index** identifies latest active period(s). Multiple concurrent areas may have different active periods; do not impose a fictional one-dimensional product clock.
4. **Historical claims** remain true only for their recorded timeframe and commit. Current HEAD can differ; verify before acting.
5. **Contradictions** require an explicit decision record with status, scope, evidence, and supersession links. Newer alone is not more authoritative than independently verified or owner-approved evidence.
6. **Period closure** means a snapshot and its open questions were reviewed; it does not mean all capabilities passed.
7. **Frozen history** is preferred: add addenda/errata linking original rather than silently editing past observations. Redact secrets or personal information if necessary, with a recorded privacy rationale.
8. **Cold agents** first read the enduring identity and period index, then the relevant current period and lineage. A replacement must cover the selected historical compatibility boundary and current accepted contract, not every abandoned experiment.

## Active index

| Period | Status | Description | Evidence / continuity |
| --- | --- | --- | --- |
| [P001 — Early experimental / first live effect](periods/P001_EARLY_EXPERIMENTAL.md) | **OPEN** (as of 2026-10-15) | Existing Any-Shape browser core; three form editor variants; basic static exporter; separately developed Cloudflare reference; experimental Flow test repo deployed with real R2/D1 submission and file bytes | [Live evidence](CASE_001_FLOW_LIVE_EVIDENCE.md), [system atlas](SYSTEM_ATLAS.md), [reconstruction contract](RECONSTRUCTION_CONTRACT.md) |

**Next period:** not created or pre-authorized. Open a new period only after a meaningful change in implementation/acceptance/architecture. Link it here, state how it relates to P001, and leave P001 intelligible in its own context.
