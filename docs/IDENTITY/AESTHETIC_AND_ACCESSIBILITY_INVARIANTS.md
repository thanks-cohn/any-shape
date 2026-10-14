# Aesthetic and accessibility invariants

Status: enduring access/meaning obligations derived from the owner mission; detailed review criteria are proposed. No blanket certification or computable beauty score.

## Continuity without pixel identity

Recognizable visual identity MAY be expressed through typography, palette, hierarchy, grouping, rhythm and proportions. These are relationships, not permanent coordinates. A compact renderer can omit ornamental art while retaining a product's clear hierarchy and action prominence. A terminal realization may preserve logical identity and function while visual-brand continuity is not applicable or only partial. Mark that distinction instead of claiming identical aesthetics.

The current web classes/tokens remain a separate compatibility obligation. A new medium is not required to reproduce a browser's DOM or stylesheet; a drop-in browser replacement is required to honor the documented consumer contract or give a tested migration. Rebuilding in another language does not release a web adopter from accessibility.

| Obligation | Automatic evidence where possible | Human evidence still needed |
|---|---|---|
| Logical hierarchy | Stable headings/field groups, meaningful traversal order | Whether the hierarchy communicates importance clearly |
| Grouping and relationships | Labels associated with values/controls; object/parent IDs preserved | Whether proximity/group labels are understandable |
| Readability | No essential clipping, enlarged text reflows, contrast audit for the declared medium | Typography, line length, language comprehension and actual assistive use |
| Reachable operations | Keyboard/touch/native activation, flow/scroll access, named actions | Discoverability for people unfamiliar with the interface |
| Focus and state feedback | Visible focus outline, status/error semantics, no trapped modal path | Focus-ring occlusion, announcements with real screen readers |
| Rhythm and proportion | Stable tokens/declared relationships, geometry observations | Balance, coherence and aesthetic appropriateness |
| Modality alternatives | Named non-hover affordances, structured agent schemas, text alternatives | Whether alternatives preserve practical use, not merely existence |
| Reduced motion | Preference respected; status available without animation | User comfort and contextual suitability |

## Failure examples

- A field label wraps but its required marker disappears: meaning continuity fails, even without document overflow. The expected outcome keeps requirement semantics available to both faces.
- A graph color distinguishes authorized and denied operations with no other label: readability/access fails for users unable to distinguish the palette. Add a semantic status and test the alternate presentation.
- A pointer-visible action has no keyboard path: operability fails. Replace it with a named reachable action, not an inaccessible decorative control.
- An agent receives `density=compact` while the human select displays comfortable after the same accepted transition: state and semantic parity fail; a visually tidy layout does not compensate.
- A narrow view hides error feedback to reduce height: trust fails. Errors must remain discoverable, tied to the failing field/operation, and distinguish denial from invalid input.

## Review protocol

An evaluator MUST assess at least four axes independently: semantic continuity, functional continuity, accessible presentation and aesthetic continuity. Screenshots can support structural/visual review but cannot establish authorization, complete record retrieval, keyboard operation or screen-reader correctness. Geometry must consider actual flow, scroll, transforms and intentional cropping; a bounding rectangle alone is not a complete visibility judgment.

Human review SHOULD compare wide/narrow/staged/text versions, long localized labels, resource fallbacks and error states. Record reviewer, environment, reviewed samples, observed concerns and approval scope. Do not use automatically generated screenshots as approved goldens. Aesthetic UNKNOWN is a legitimate result after otherwise successful automatic checks.

The browser target is WCAG 2.2 AA for authored examples, assessed by automated checks plus necessary manual work. Other media need a named accessibility model; a terminal or 3D implementation cannot inherit a browser certificate. Forced colors, print, screen readers, native zoom and physical input hardware stay unknown until actually tested.
