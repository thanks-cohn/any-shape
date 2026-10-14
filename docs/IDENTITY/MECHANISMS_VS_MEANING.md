# Mechanisms versus meaning

This document is evaluator/maintainer material. **Exclude it from blind reconstruction input.** It explains the current machinery without making it universal identity.

| Current mechanism | Obligation it happens to serve | What survives replacement | Proof required |
|---|---|---|---|
| HTML heading/nav/form/disclosure elements | Human semantics and native input | Reading relationships, names, validation and reachable actions | Semantic/accessibility/interaction probes in the new medium |
| Grid/flex, intrinsic sizing, logical properties | Content-sensitive composition | Local context influences presentation without semantic loss | Simultaneous unequal containers, intermediate widths, locale/text stress |
| Named container query at 32rem | Stacked/split card composition | Independent local adaptation for this example | Actual composition measurements at fixed viewport; threshold itself is not universal |
| CSS tokens and named layers | Browser identity and override boundary | Recognizable hierarchy and current public override commitments | Human visual review and separate drop-in CSS compatibility |
| Optional ESM diagnostic module | Inspectability | Redacted measurements, uncertain explanations and local-only operation | Canary, mutation, network, schema and broken-fixture probes |
| Structural DOM child-position paths | Local diagnostic targeting | A stable-enough privacy-safe target reference per snapshot | Paths usable within declared lifetime; no arbitrary identifier leakage |
| Shadow-host geometry overlay | Local visual debugging | Explicit opt-in and reversible click-through inspection | Input unaffected, host removed, no observer/resource leakage |
| Node static server | Development delivery | Reproducible local asset serving and functional readiness | Real requests, MIME correctness and restricted asset exposure |
| Playwright/axe/TypeScript/Ajv | Development evidence | Named behavioral, accessibility, type and format checks | Replacement harness with equivalent declared coverage |
| Forever Works CLI and schemas | Durable semantic record interrogation | Language-neutral standard, truthful graph and provenance | Canonical validation/audit plus independent schema validation |

## What is protected today

Browser source in `src/`, public classes/tokens, ESM exports/types and diagnostic schema in `docs/API/CURRENT_API_V0_1.md` remain implemented 0.1 behavior. AS-001…AS-016 are the browser obligations; not all are automatic, and visual approval remains separate. Universal mission expansion does not erase that baseline. This handoff chiefly changes documentation, records and evaluable proofs, not consumer layout or diagnostic code.

The existing form's local density preference is not a production domain service. It does not supply trusted agent identity, authorization policy, shared server state, durable persistence or an agent action schema. Those are conceptual extensions. The Python reconstruction proof demonstrates a scoped proposed domain contract; it is not silently promoted into the existing package's public API.

## Freedom and compatibility

Source authoring language and output medium are separate. Python producing browser markup is a different source architecture even though its output is still web content. A native editor or terminal can satisfy semantic obligations while lacking CSS/ESM drop-in compatibility. A replacement may choose different layout algorithms, transport, renderer and internal identifiers provided logical IDs and declared external compatibility survive.

Keep three verdicts: semantic understanding, tested functional reconstruction and drop-in compatibility. An unavailable `.as-card` stylesheet does not necessarily refute semantic reconstruction; it does refute an unsupported claim of drop-in browser compatibility. Conversely, copying class names without shared validation/authority does not prove the universal mission.

## Migration discipline

Before replacing a mechanism, list its protected requirements and API consumers. Evaluate the candidate with canonical closed-world claims; absent evidence becomes unknown. Record behavioral changes, adapter needs, source/data/transport versioning, rollback boundary and exact validation. Do not adopt the proof as the production library merely because its scoped fixture passes. Require owner review and separate implementation work for new production policy.
