# Continuity of Orientation

**Status:** Foundational design principle, proposed for formal Forever Works owner acceptance.
**Scope:** Any-Shape's human-facing presentations and their transformations across mediums, screen shapes, interaction modes, and resource constraints.
**Related:** [Purpose](PURPOSE.md), [Contracts](CONTRACTS.md), [Software Built to Endure](../VISION/SOFTWARE_BUILT_TO_ENDURE.md).

## Principle

> An interface should preserve, insofar as practical, a person's understanding of its organization, hierarchy, and relationships as its presentation changes. Adaptation should minimize unnecessary disruption to familiar structures while maintaining readability, accessibility, and essential functionality.
>
> The means of adaptation may change. The person's ability to understand where they are, what they see, and how to proceed should endure.

## Three kinds of continuity

1. **Semantic continuity:** Information, relationships, labels, and states retain their meaning.
2. **Functional continuity:** Essential tasks remain possible, discoverable, and operable.
3. **Orientational continuity:** Users can recognize landmarks, hierarchy, groupings, and navigation despite transformations.

Preserving all text or actions is insufficient if the rearranged interface becomes unfamiliar, confusing, or disorienting.

## Practical interpretation

When the available presentation area becomes constrained, an implementation should generally preserve recognizable headings, navigation landmarks, and meaningful groupings. Secondary descriptive text can become a readable preview with progressive disclosure, while full content remains retrievable. Decorative elements may yield before essential structures. Familiar, standards-based interactions should be preferred over bespoke gestures or unusual controls.

The example of a browser window narrowing, a description becoming condensed, and a full-text disclosure becoming available is illustrative—not a mandated implementation and not the project's ultimate purpose.

Do **not** solve constrained space by shrinking body text below legible limits, retaining fixed coordinates at the expense of usability, or exposing content *only* through hover. Depending on context, conventional disclosure, details, dialog, or secondary views may be preferable, provided they support pointer, keyboard, touch, assistive technology, and programmatic access.

## Adaptation decision order

1. Identify stable semantic anchors: headings, groupings, selected context, location, active tasks, and primary controls.
2. Distinguish essential content from secondary detail and nonessential decoration.
3. Select the least disruptive accessible transformation that fits the medium and resource constraints.
4. Preserve stable naming, action semantics, and understandable navigation paths. Maintain focus and context across changes.
5. Make condensed or displaced information recoverable via familiar controls and accessible semantics.
6. Ensure authorized agents can inspect complete logical information even when only a visual summary is displayed.
7. Verify comprehension and orientation with actual users where possible, not merely viewport geometry and screenshots.

## Negative examples

- A narrow viewport hides section headings or primary navigation without an understandable replacement.
- An interface reorders unrelated groups merely to occupy free space, severing familiar associations.
- Long content is clipped without an accessible way to retrieve it.
- A layout keeps all words present but scatters them so users cannot find their current section.
- A tooltip requires hover as the only mechanism to read critical text.
- A machine-facing surface exposes only truncated visual text rather than the canonical full value.

## Language- and medium-neutral obligations

This principle applies equally to browsers, desktop interfaces, constrained embedded panels, mobile views, text-mode interfaces, and future renderers. Exact coordinates, CSS classes, breakpoints, and disclosure mechanisms are implementation choices. The durable outcome is intelligible orientation and continuity of user context.

## Proposed conformance probes

**CO-001 Landmark stability:** Under multiple transforms, users can identify their current location, primary section, and key controls; assess via structured landmark mapping and human review.

**CO-002 Recoverable detail:** Condensed secondary content is fully retrievable through accessible interaction and available untruncated to authorized programmatic consumers.

**CO-003 Context persistence:** Resizing or changing presentation modes does not unexpectedly discard selection, focus, entered-but-unsubmitted data, or task progress; exceptions are explicit.

**CO-004 Familiar interaction:** Progressive disclosure and secondary views support appropriate keyboard, pointer, touch and assistive-technology pathways, without exclusive hover dependence.

**CO-005 Minimal disruption:** Compare at least two viable transformations on landmark retention, relationship preservation and usability; document tradeoffs rather than claiming a universal aesthetic metric.

**CO-006 Resource fallback:** Under limited display or rendering capability, retain legible headings, accessible actions and a discoverable recovery path for displaced details.

A formal Forever Works invariant record and binding conformance should reference these probes after schema validation and appropriate owner acceptance. Until implemented and tested, the probes remain proposed, not passing claims.

## Relationship to the wider architecture

Any-Shape does not invent every rendering or interface technique. It coordinates established, accessible mechanisms to uphold enduring semantic, functional, and orientational commitments. Forever Works records these commitments so a new implementation or cold inheriting agent can reproduce the intended outcomes without requiring the original UI framework.
