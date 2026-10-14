# Any-Shape — language-neutral conformance specification

Scope: retained **browser specialization** AS-001…AS-016, not the whole universal mission. The independent domain/human-agent fixture and broader acceptance lanes are defined in `CONFORMANCE_AND_ACCEPTANCE.md` and `conformance/universal-v01.json`. Native desktop, dataset and 3D behaviors require their own declared evidence.

The test runner is replaceable. Observe outputs without prescribing implementation algorithms. Report every result as PASS, FAIL or UNKNOWN, including evidence and environment. No missing claim becomes a PASS.

## Neutral fixture and outcome definitions
Build a semantic page containing a heading, navigation, three cards, a long unbroken text stress case, a labeled text control and selector, submission, disclosure, and the SAME card in simultaneous narrow and wide host panels. Assign stable semantic target identifiers independent of DOM/CSS class spelling. Make three separate intentionally broken fixtures: intrinsic overflow, a clipped action, and a missing/wrong query container.

Accessible: keyboard reachable with visible focus, sensible reading order and usable controls. Unintended document-level horizontal overflow: primary content forces document beyond viewport, excluding deliberate labeled scroll regions. Aesthetic identity: recognizable hierarchy, typography, spacing and grouping; subject to manual review. Runtime: optional scripts or inspectors must never be essential to primary semantic use.

## Contract stimuli and expected observations
- AS-001: Fixed 1366px viewport, one component in 280px container and same component in 720px container; compositions meaningfully adapt to LOCAL width. Resize only first container and observe its independent reflow.
- AS-002: 320×640 healthy page; no unintended horizontal document overflow, no lost essential controls.
- AS-003: 1366×768 and 1920×1080 preserve recognizable hierarchy, coherent visual rhythm, readable grouping. Require human visual approval.
- AS-004: Reflow under equivalent 200%/400% zoom squeeze and enlarged root text; actions reachable.
- AS-005: Long words/translations and 200% text: no clipped essential copy and no action loss.
- AS-006: Tab order, visible focus, native Enter activation, labels and focus order remain usable.
- AS-007: With optional JavaScript disabled, reading, navigation, entry, native submission/disclosure continue.
- AS-008: Reduced-motion preference does not obscure meaning or require animation.
- AS-009: RTL case retains logical layout and understandable reading/control order.
- AS-010: 667×375 and 280×280: content and controls remain reachable by reasonable flow/scroll.
- AS-011: Without advanced container adaptation rules, a usable simple flow still exists.
- AS-012: Each broken fixture produces measurable coded findings and uncertain cause hypotheses; false certainty prohibited.
- AS-013: Container resize exposes current geometry and declared mode (if available), distinguishes measurement from CSS explanation.
- AS-014: Place unique privacy canaries in form values, text and URLs; diagnostics output/log/network show no canaries and no outbound requests by default.
- AS-015: Physically remove optional diagnostic module; primary layout, form and navigation still operate.
- AS-016: Replace/remove a development dependency or test harness; equivalent independent probes remain runnable and honest about gaps.

## Metamorphic assertions
Increasing width does not alter semantic meaning or keyboard order. Removing decoration does not remove labels. Resize a container without resizing viewport to test genuine local adaptation. At continuous intermediate widths no primary action becomes unreachable. Diagnostic inspection does not mutate page state and can teardown cleanly.

## Cross-language reconstruction
Authoring code can use any language; where the target is web, generated HTML/CSS/JS may still be browser artifacts. Use an independent runner rather than porting the old assertion code. Do not rely solely on screenshot similarity. Test semantic equivalence and drop-in API compatibility as SEPARATE lanes. The latter is defined in `docs/API/CURRENT_API_V0_1.md` and requires migration evidence when changed.

## Report contract (proposed, not a passing result)
```json
{"project":"any-shape","implementation":"new-implementation-id","sourceConsulted":false,"tests":[{"id":"AS-001","status":"UNKNOWN","environment":"browser and container sizes","observed":{},"evidenceRefs":[],"limitations":["not yet executed"]}]}
```
