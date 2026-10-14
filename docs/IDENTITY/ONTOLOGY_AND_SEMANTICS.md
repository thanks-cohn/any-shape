# Ontology and semantics

Status: proposed neutral vocabulary and fixture design, derived from the explicit mission. No new production API is asserted.

| Concept | Meaning independent of renderer | Observable obligation |
|---|---|---|
| Domain object | Information with enduring identity and relationships | An object's ID does not change because it moves between representations. |
| Surface | A coherent view over objects and available operations | Declares scope, version, state revision and supported affordances. |
| Field | Identified value with meaning, type, units and constraints | Labels and schemas agree about required values and allowable ranges. |
| Action | A domain operation with parameters, authority, preconditions and outcomes | Human activation and machine dispatch obey the same rules. |
| Relationship | Meaningful association, order, grouping or ownership | A transformation retains association or provides an explicit traversal. |
| State | Authoritative values plus transition/revision information | Views cannot silently substitute stale local values for accepted state. |
| Context | Space, capabilities, input modes, locale, resources and policy | Affects realization strategy, not identity or permission. |
| Presentation | A mapping from logical meaning into a medium | Can change density, stages, decoration and navigation without hidden loss. |
| Authority | Trusted identity and rights supplied by the host | Discovery and caller-supplied role strings cannot grant production permission. |
| Evidence | A recorded observation with environment and provenance | Its scope and uncertainty are explicit; old evidence is not new proof. |

## Logical preferences example

Proposed surface `surface.preferences` has field identities `field.display-name` and `field.density`. A display name is required, nonempty after trimming, maximum 80 characters; density is one of `comfortable` or `compact`. The example's `action.apply` validates those parameters and changes density. Display names are transient input: they MUST NOT be persisted or captured by diagnostics. This is a neutral example, not a retrofit of the existing browser form into a production agent service.

Authoritative state starts at revision 0, density comfortable. A successful density update advances revision once. An invalid value, missing consent, denied permission or stale expected revision does not change state. Repeated identical requests under the same actor and retry key return the prior outcome without a second transition; key reuse with different parameters rejects. These particular retry/revision rules are technical proposals, not inferred owner decisions.

A wide presentation might show two labeled controls beside each other. A tiny presentation might present them in two steps with a review stage. An agent receives a schema, available actions and revision rather than guessing button coordinates. All three MUST validate the same logical payload before mutation. Draft editing is not submission; disclosure is not permission; a label is not a field ID.

## Records and editor objects

A record collection maintains record IDs, field meanings, stable selection, ordering rules and access to omitted detail. A table becoming cards may move columns into labeled detail sections; it cannot discard a critical status or imply unavailable data equals an empty value. Null, absent, redacted and unsupported are distinct states.

An editor object retains object ID, parent relationship, selection, editable attributes and permissions whether presented in a scene, hierarchy, inspector or structured registry. Selecting a visual glyph and selecting its registry entry refer to the same object. A hidden locked object remains discoverable as locked if the actor is entitled to know it exists; permission may also require concealing its existence. The host, not the renderer, decides that boundary.

## Schema and transition discipline

Define field/action versions separately from renderer versions. Units, enums, defaults, nullable values and error categories SHOULD be explicit. Consumers MUST reject unsupported mutations rather than silently coercing unknown parameters. The fixtures use strict parameter objects for deterministic negative tests. Other hosts may choose extensibility, but must version and test its semantics.

The canonical Forever Works model describes requirements and mechanisms; the example request fixtures are a separate proposed conformance surface. They do not introduce a parallel Forever Works record kind. See [glossary and provenance](GLOSSARY_AND_DECISIONS.md) for how owner statements and agent detail differ.
