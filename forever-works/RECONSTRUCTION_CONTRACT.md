# Cold-agent reconstruction contract — Any-Shape and Case 001

**Scope:** reconstruct a selected Any-Shape capability, not every prototype in the repo. **Default task:** a respondent-only form runtime with real persistent submissions and file uploads, using any appropriate language/platform. **Authority:** requirements below are a candidate inheritable contract, not an automatically ratified canonical standard.

## A. Required understanding before writing code

Without relying on the incumbent source as an architectural blueprint, the inheritor must explain: who benefits; how an editor-authored semantic form becomes independently operable; distinction between draft, accepted submission, persisted effects and later record retrieval; what humans and agents must be able to do; which actions require authority; and why portable identity is independent of HTML, JS, Cloudflare, D1 and R2.

Give a short decision record for **chosen target language/runtime** based on the requested medium (e.g. browser, native desktop, mobile, CLI), deployment constraints, necessary libraries, accessibility, ongoing maintenance and security. No universal best language is prescribed. If an execution environment cannot support file selection, provide a usable equivalent import mechanism and explicitly state deviations.

## B. Domain model (conceptual, technology-neutral)

- `FormDefinition`: stable form ID, schema version, human-facing title, ordered sections and fields, field types, constraints, conditions and consent requirements.
- `AnswerSet`: field-ID-keyed, typed values. Distinguish unanswered, intentionally empty, hidden, unsupported, and invalid; do not make a filename masquerade as file contents.
- `Attachment`: field reference, name, declared and inspected MIME, size, integrity hash (target), durable storage reference, write outcome. Never treat `uploaded:false` metadata as authoritative after a confirmed upload.
- `Submission`: unique ID, form ID, creation time, immutable submitted answer snapshot, attachments, version, lifecycle state and actor/consent context appropriate to policy.
- `EffectReceipt`: per-destination status, item identifiers, error class, retry guidance; overall success only if the explicitly required effects succeeded.
- `RecordAccess`: protected retrieval of the submitted snapshot by stable ID under owner-defined identity, privacy and retention rules.
- `PortabilityPackage`: all application assets, neutral semantics, adapters/configuration, deployment instructions and verification fixtures needed to run independently, with privileged secrets intentionally external.
- `EvidenceRecord`: stimulus, expected/observed results, artifact version, environment, evaluator independence, deviations and confidence.

Example *behavioral* message (illustrative, not the current wire format):

```json
{
  "submissionId": "<generated ID>",
  "formId": "example-form",
  "answers": {"example-field": "example-value"},
  "files": [{"fieldId": "attachment", "size": 10, "sha256": "<verified digest>", "storageRef": "<opaque ref>"}],
  "effects": {"recordStore": "accepted", "attachmentStore": "accepted"},
  "status": "accepted"
}
```

## C. State and causality

```text
EDITING → VALIDATING → SUBMITTING → (ACCEPTED | REJECTED | PARTIAL_FAILURE | UNKNOWN_OUTCOME)
ACCEPTED → AUTHORIZED_RETRIEVAL
UNKNOWN_OUTCOME → RECONCILE_BEFORE_RETRY
```

A click is not storage; HTTP 2xx is not proof of independent persistence; a DB entry is not attachment-byte integrity. Required failures must remain visible and actionable. A reattempt of a possibly completed operation must not silently create duplicate financial/administrative consequences; define explicit idempotency or reconciliation before production claims.

## D. Invariants — acceptance obligations, not implementation prescriptions

| ID | Invariant |
| --- | --- |
| AS-C01 | Author-defined field identity, meaning, grouping, labels, constraints and selection semantics survive export/transformation. |
| AS-C02 | Every supported input can be submitted; unsupported ones are conspicuously declared and cannot report fictitious success. |
| AS-C03 | Human-usable navigation, input alternatives, focus and feedback remain accessible at target scale and input modality. |
| AS-C04 | A valid submission produces a durable, retrievable immutable record with authoritative IDs and a defined ownership policy. |
| AS-C05 | Attachments contain **actual bytes** and metadata matching the stored object; integrity verified by readback/hash in conformance tests. |
| AS-C06 | Multi-destination receipts distinguish accepted, failed, partial and unknown outcomes; no blanket success from an intermediate step. |
| AS-C07 | Security boundaries: no credentials in generated public artifacts; protected writes/reads, payload limits, explicit authorization, abuse defenses and retention policy. |
| AS-C08 | Independent exported app works without access to its authoring environment; credentials are injected by host/deployer, not visitors. |
| AS-C09 | Machine operation and human operation respect the same domain validation/authority even where presentation differs. |
| AS-C10 | Independent evaluator can exercise core effects and failure cases without relying on candidate implementation's own claims. |
| AS-C11 | Changing provider, language, renderer or host does not force revision of unrelated form semantics; migration documents any intended break. |
| AS-C12 | Provenance of each requirement is distinguished from observed behavior and agent proposals; unknown is never promoted by narrative alone. |

Security obligations are **target requirements**, not assertions that current Cloudflare experiment meets them.

## E. Cold reconstruction procedure

1. **Scope:** owner selects capability and destination platform, supported field/attachment types, privacy requirements and required backwards compatibility. Classify each inherited behavior as PRESERVE, CORRECT or EXCLUDE.
2. **Evidence inventory:** read this package and canonical `forever/` records, then map observations to user outcomes; identify explicit unknowns. For a rigorous blind trial, keep the reconstruction agent from seeing source and golden evaluator until candidate is frozen.
3. **Neutral design:** write a form-schema interpreter, validation rules, state transitions, attachment handling and storage/read adapters with no implicit cloud-provider lock-in.
4. **Implementation:** choose target-native input/output primitives; keep domain semantics separate from serialization, rendering and persistence; avoid layers with no demonstrated function.
5. **Self-tests:** exercise fixtures and static checks; preserve command/output/commit/version. Self-tests are development feedback, not independent certification.
6. **Independent evaluation:** in a separate context with the withheld golden fixtures, test successful and failed effects, actual persisted records, artifact hashes, security/privacy, accessibility, and realistic lifecycle.
7. **Disposition:** report PASS/FAIL/UNKNOWN for every obligation; publish migration map and evidence. No silent fallback or fabricated equivalence.
8. **Handoff:** record new architecture, limitations, proven substitutions, test artifacts, exact toolchain, and what next agent should do; keep original code until approved replacement.

## F. Compact fixture catalog for future evaluators

| Fixture | Oracle / measurement |
| --- | --- |
| FORM-01 | Interpret form definition and preserve stable field IDs/order/conditions/required fields. |
| FORM-02 | Valid text/select/multiple-choice/checkbox submission yields correct typed JSON. |
| FORM-03 | Missing required consent, malformed choices or missing required values cause no accepted write. |
| FILE-01 | Attach generated 13 KiB-class image; compare bytes and SHA-256 from storage readback. |
| FILE-02 | Unsupported/oversized file fails explicitly; no accepted receipt or untracked storage orphan. |
| STORE-01 | Both required record stores contain same schema-versioned authoritative submission. |
| STORE-02 | With one destination failing, report partial outcome, reconcile, and avoid spurious global accepted. |
| STORE-03 | Same retry identity does not create duplicate durable submissions; new intentional submission does. |
| READ-01 | Authorized owner retrieves stable ID; unauthorized actor cannot retrieve submission. |
| EXPORT-01 | Extract package on clean host, inject secrets out-of-band, deploy, and test with no editor dependency. |
| REPLACE-01 | Rebuild in different language/host; compare semantic behavior and effects using independent probes. |
| UX-01 | Keyboard-only, narrow view, screen-reader announcements, and failure recovery remain usable. |

Test fixture catalog is **PROPOSED**, not assertions that tests currently exist.

## G. Open questions requiring explicit owner decisions

Retention/deletion and public-link policy; identity provider and author/visitor authority; whether D1 and R2 are both mandatory for each submission; acceptable consistency model and compensation; byte/file-size limits; spam controls; duplicate semantics; encryption, residency, export compatibility, accessibility targets and mobile/native parity. Until settled, declare unsupported or provide an explicitly limited test configuration. Do not expand proof scope to match optimism.

## H. Completion definition

A cold implementation is **reconstructed** only when its independent evaluator signs off selected invariants with traceable evidence. **Implemented** means code exists; **unit tested** means local probes ran; **deployed** means hosted; **effect-verified** means external persisted result independently observed; **production-ready** additionally requires security/recovery/operations criteria. These labels are not interchangeable.
