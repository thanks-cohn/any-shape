# Cross-medium examples

These are **proposed worked designs**, not claims of shipped desktop, dataset or 3D products. Each pairs a human face and an agent face over the same logical objects. The preferences reconstruction is a scoped proof of a subset; broader realizations remain unknown.

## 1. Preferences form

Logical identity: `surface.preferences`, transient `field.display-name`, persistent `field.density`, and authorized `action.apply`. One validator requires a nonempty name and an allowed density. A state revision supports conflict detection; names are not stored or included in diagnostics.

Human face: wide presentation groups controls beside one another; narrow presentation stacks them; constrained text interaction can ask each field and then show a review/consent step. Required labels, errors and submit remain reachable. Agent face: discover the action schema and current revision, then request application within delegated authority and explicit consent. The same validator and transition execute, and both faces reread the same density/revision.

Transformation failure: the tiny form submits after only collecting density while the agent must supply all required fields. Expected correction: collect the full logical payload, or explicitly declare the tiny realization cannot support the operation. Denied, invalid, stale and unsupported outcomes are not success. Fixtures U-01…U-12 provide positive/negative machine examples; human parity requires separately executed interaction checks.

## 2. Structured records and data

Logical identity: collection `collection.inventory`, records keyed by persistent record IDs, fields for name/status/quantity, parent-category relationships, a declared order, and permitted read/filter/update operations. Preserve units and distinguish zero, null, absent and redacted values.

Human face: a dense table on a large surface; labeled cards on a narrow surface; a paged text report under low rendering/memory capacity. Agent face: schema discovery, bounded query batches, continuation identity, current revisions and authorized record updates. Detail navigation retrieves every authorized critical field; pagination declares count/completeness rather than implying the current page is the dataset.

Failure: a low-memory adapter returns the first 100 records with `complete=true` despite more authorized data. Expected outcome: `complete=false` plus stable continuation, or an explicit resource-limited error. A read-only fallback cannot claim update parity. Test filter/order/continuation, selection across pages, invalid quantity, denied write, stale revision, and complete retrieval; none are proven by the current card demo.

## 3. Browser and desktop windows

Logical identity: document/operation groups, current selection, navigation and state are independent of screen coordinates. A docked panel and detached desktop window can expose the same logical surface with distinct composition.

Human face: expanded panel uses parallel groups; short window stages subordinate detail or labels an intentional scroll region; keyboard traversal preserves meaningful order. Agent face: discover available operations and state via an adapter registry, not pixels or native widget handles. An agent activates a domain operation by identity, not by assuming a button remains at a coordinate.

Failure: resizing makes the only primary action unreachable while the programmatic endpoint still runs it. Expected correction: reflow/stage the action with clear navigation. Browser overflow testing is **one illustrative case** in this family, not the purpose of Any-Shape. The 0.1 web suite protects that implemented example; native desktop behavior is unimplemented and must be independently tested on its actual toolkit.

## 4. 3D editor surfaces

Logical identity: object `object.lamp-42`, its parent/layer, selected state, transform values with explicit units, editable attributes and permission/lock status. One operation `action.set-transform` validates coordinate constraints and host authority.

Human face: select a scene object, select the corresponding hierarchy row, or use a labeled inspector. A low-power or nonvisual alternative presents an ordered object registry and numeric controls. Agent face: discover object metadata, selection identity, writable properties, preconditions and typed operations. Both reach the same object ID and authoritative transform; neither bypasses a locked attribute.

Failure: the scene renderer disappears and the adapter discards the selected object or reports success for an edit it cannot apply. Expected outcome: retain authorized registry/inspector interaction, or explicitly report unsupported manipulation while preserving readable object state. Test units, bounds, locks, denied writes, shared selection, renderer-loss fallback and stale state. Occlusion/beauty/3D spatial accessibility require dedicated evaluation; current browser geometry cannot certify them.

## Compare the dimensions

| Example | Enduring identity | Replaceable representation | Critical independent negative test |
|---|---|---|---|
| Form | Fields, operation, validator, authority and revision | Columns, stages, text prompts, request transport | Either face accepts a forbidden or invalid mutation |
| Records | Record IDs, field meanings, relationships and completeness | Tables, cards, pages, query batches | Silent data loss under pagination/resource limits |
| Windows | Surface/selection/action identity | Browser panel, native window, structured registry | Primary action disappears or pixel action hits another object |
| Editor | Object/selection/transform/permission identity | Scene, hierarchy, inspector, object protocol | Locked edit or renderer loss corrupts authoritative state |

No shared visual appearance is required across all four. Comprehension, authorized operation and trust are required within a declared supported scope. A claim of universal equivalence without executed target evidence MUST be reported unknown.
