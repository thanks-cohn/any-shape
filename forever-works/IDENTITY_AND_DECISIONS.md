# Identity, intent and design decisions

## Purpose — OWNER-INTENT

Any-Shape is research and engineering infrastructure for **software whose identity endures changes in language, device, interface, input method, runtime, scale and resource constraints**. Human understanding, effective agency, accessible and aesthetically coherent presentation, and machine-understandable authorized actions should survive changing forms. Its maxim: *The form may change. The identity must remain.*

It is **not** merely a responsive CSS toolkit or a form builder; these are deliberately small laboratories in which continuity can be measured. A form that looks identical but loses its submit effect is a failed reconstruction. A text/native interface may look different yet preserve the selected experience and effect. Beauty and comfort matter but cannot be reduced to pixel equality; their evaluation must be scoped and candid.

## Users / beneficiaries

- **Human operator:** can discover purpose, input, validation, navigation, status and recovery; uses keyboard or device-appropriate modalities.
- **Author/deployer:** designs fields, exports independent software, configures destinations, controls publication and credentials.
- **Programmatic agent:** discovers semantics and available operations without inferring authority from UI affordances; can diagnose cause/effect.
- **Cold maintainer/reconstructor:** inherits exact responsibilities, known unknowns, evidence and replacement permissions.
- **Independent evaluator:** checks the new system without using its self-reported success as sole proof.

## Architectural discriminators

1. **Meaning before mechanism:** record semantic object/operation/constraint first; choose language and toolkit to satisfy it.
2. **Effect parity, not cosmetic mimicry:** persistent external effects and receipts are part of application identity.
3. **Source as evidence, not a commandment:** legacy modules explain current behavior but need not survive unchanged.
4. **Thin core, replaceable boundaries:** presentation, schema interpretation, validation, submission, persistence, transport, host identity and diagnostics have distinguishable responsibilities. Do not manufacture plugin frameworks absent a demonstrated need.
5. **Human and agent affordance parity:** equivalent access to *authorized* actions, appropriate to each medium, without identical screens.
6. **Minimal user ceremony:** a self-contained export and documented deployment; secrets remain outside public packages.
7. **Historical truthfulness:** record owner intent, source implementation, test observations and speculation separately.
8. **Reversible modernization:** experiments in separate repos/branches; do not overwrite proven originals on an agent guess.
9. **Future proof through tests:** avoid claims of permanent frameworks; use stable contracts and replaceable adapters.
10. **Selective rescue:** each behavior is PRESERVE, owner-approved CORRECT, or EXCLUDE; unexplained omission is not simplification.

## Significant choices and why

| Choice | Reason | Current status |
| --- | --- | --- |
| Standard HTML/CSS/JS exported site | Independent of editor, conventional browser host, easily readable by agents | SOURCE-INSPECTED in shared website export |
| Three authoring variants share a website exporter | Reduce semantic divergence across Studio, Flow, Schema | SOURCE-INSPECTED usage; feature parity NOT certified |
| `form.json` model separated from `app.js` | Portable, editable data contract rather than baked-in UI | SOURCE-INSPECTED |
| No browser-local submission database in standalone export | Host should own durable, auditable results, not visitor's browser | SOURCE-INSPECTED |
| Same-origin `/api/submit` in Pages experiment | Avoid exposing backend tokens and cross-origin webhook/CORS complexity | LIVE-OBSERVED for Flow experiment only |
| D1 JSON + R2 JSON + R2 attachment objects | Relational lookup plus object durability and actual file bytes | LIVE-OBSERVED for one submission; consistency strategy incomplete |
| GitHub repository + deploy workflow | Inspectable source history and replicable operational steps | LIVE-OBSERVED workflow succeeded once |
| `forever/` machine records and external vendor pin | Existing validated project-specific conformance/provenance | SOURCE-INSPECTED; do not fork schema casually |

## Evolutionary lesson

Original v1 static ZIP exported five files and direct browser JSON webhook delivery; its file field explicitly sent **metadata only**. A cloud reference then demonstrated a real storage backend separately. A human exported Flow into `any-shape-form-tests`; backend code and same-origin multipart delivery were added *to that deployed test copy*, not to the shared exporter. GitHub Actions deployed it and live Cloudflare interrogation verified a persisted submission and uploaded object. Therefore the path to productizing is **capture the proven behavior at a stable shared adapter boundary**, not copy a one-off deployment's implementation into three editors. Simple ownership is the feature; schema versioning and independently checked effects make it maintainable.

## Non-goals / open governance

Do not promise arbitrary code translation, security certification, perfect design parity or universal provider support today. Preserve users' ability to select hosting, storage, and language when real adapters are built. Pending authorization/privacy/idempotency choices remain explicitly open rather than defaulting to permissive production endpoints.
