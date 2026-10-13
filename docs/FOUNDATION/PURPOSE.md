# Purpose, scope, identity and permanent invariants

## Problem statement
Traditional viewport breakpoints can create brittle interfaces: cards overflow when embedded, typography scales poorly, actions become unreachable, important information disappears on mobile, and the product's visual identity fragments. A user may resize a window, rotate a device, enlarge type, translate copy, or put a component inside a narrow panel. None of these should turn a coherent application into nonsense.

## The enduring result
Any-Shape enables interface authors to declare design intent once and reuse a consistent set of standards-native layout decisions that react to **available space and content**, not merely device names.

The system preserves:
- **Meaning:** reading order, content hierarchy and semantic relationships.
- **Identity:** brand tokens, typographic voice, rhythm, proportions within safe bounds.
- **Utility:** controls remain discoverable and operable; critical content stays accessible.
- **Continuity:** transitions between shapes are unsurprising; there are no unexplained jumps.
- **Accessibility:** changing shape never mandates illegibility or hidden essential content.
- **Inspectability:** an author or agent can explain why a layout chose a given mode.
- **Portability:** designs work without a specific front-end framework, bundler or hosting platform.

## Governing statement
**The form may change. The identity must remain.**

A layout is allowed to recompose its geometry. Exact geometric invariance is NOT the goal: preserving useful relationships is.

## Axioms and tests of meaning
A1 Identity survives transformation: tokens and component semantics persist even if rows stack.
A2 Content determines composition: components react to their containing space and intrinsic content needs.
A3 Relationships outrank coordinates: proximity, grouping, hierarchy and sequence are intentional.
A4 Legibility and operability are non-negotiable: honor contrast, reasonable line length, focus and touch targets.
A5 Adaptation must be verifiable: deterministic probes expose structure, overflow and failures.
A6 Native-first: cascade, grid, flex, subgrid, container queries, logical properties, clamp/min/max and intrinsic sizing before JS.
A7 Graceful degradation: scrolling, wrapping, disclosure and reflow before clipping, shrinking to unreadable sizes, or removing essentials.
A8 Purpose before implementation: behavior contracts outlive libraries, dependencies, file structure and present-day browser specifics.
A9 No fixed device taxonomy: breakpoint samples are testing aids, not the definition of success.
A10 Honest evidence: automated checks prove defined properties; aesthetics need informed human review.

## Constraints
- Standards-only consumer baseline: meaningful usable output without framework JS.
- No compulsory network calls, trackers, accounts or paid dependencies.
- Default no-JS usage where possible; optional tools may enhance monitoring.
- Prefer small bundle, low CPU and low memory, including modest integrated-GPU laptops.
- Support recent evergreen browser releases; fallback for unavailable capabilities is explicit.
- Internationalization, right-to-left, high zoom and reduced-motion are acceptance dimensions.
- Accessibility target: WCAG 2.2 AA for authored controls and examples, not a blanket certification of adopter sites.

## Non-goals and tradeoffs
Impossible geometries may scroll in one axis. Complex data tables may need an explicit scrolling region with labels and keyboard access. A mobile layout may contain fewer simultaneously visible secondary decorations, but never silently drop primary actions or essential information. Pixel-perfect matching across browsers is not promised. Avoid overengineering a runtime solver when CSS suffices.

## Why this document survives
If source disappears, a replacement succeeds only when it restores the above outcomes. Do not use a vanished package's old API as the sole definition of correctness. Reconstruct its *observable behavioral contract* first.
