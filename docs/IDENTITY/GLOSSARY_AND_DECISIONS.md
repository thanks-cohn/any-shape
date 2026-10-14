# Glossary, authority and decisions

## Stable vocabulary

- **Identity:** enduring reference and meaning of an object, field, relationship or operation. Visual brand is one manifestation, not the whole definition.
- **Realization:** executable mapping of logical meaning into a declared medium/context.
- **Human face / agent face:** coordinated presentation and programmatic interfaces over the same domain rules and state.
- **Adaptation:** change of representation in response to context without undeclared semantic/functional loss.
- **Fallback:** a simpler supported realization after capability/resource loss. A read-only fallback does not prove write parity.
- **Unsupported:** an explicitly declared inability; distinct from invalid data, permission denial, empty content and temporary unavailability.
- **Authority:** host-established right to observe or mutate. Discovery alone confers none.
- **Conformance:** evidence-backed satisfaction of named obligations in a declared scope. Format validity is not runtime conformance.
- **Drop-in compatibility:** preservation of a documented external boundary; separate from semantic equivalence.
- **Blind reconstruction:** construction without original machinery/history/outputs. Procedural withholding is not guaranteed isolation.
- **Proposed / observed / implemented / verified:** design candidate / factual observation / existing machinery / executed scoped proof. These labels are not interchangeable.

## Authority and provenance ledger

| Source | Treatment |
|---|---|
| User's present request and handoff 002 section 1 | Explicit universal mission: humans and agents, changing media/resources, preserved meaning/operations/trust. |
| Handoff 002 P1–P12 | Owner-stated guiding principles; detailed technical extraction/mapping remains agent-proposed unless directly quoted and attributed. |
| Earlier foundation and AS contracts | Established browser obligations, retained as a protected specialization. Scope clarification is explicit here, not a silent rewrite. |
| Upstream Forever Works standard at pinned commit | Imported normative record/graph/provenance/evaluation rules; not Any-Shape policy invention. |
| Preferences IDs, transport adapter, revision/error ordering and retry keys | Agent-proposed technical fixtures, `unreviewed`; successful tests do not ratify them. |
| Original implementation evidence | Historical scoped browser observations, not proof of universal agent or 3D behavior. |
| New validation/evaluation output | Imported factual evidence with environment and hash references; scope remains limited. |

Forever Works allows `sourceType`: explicit, inferred, imported, historical, agent-proposed. Canonical schema review statuses are **unreviewed, accepted, rejected**; `pending` is not a valid schema value. In this model, pending proposals use `agent-proposed` plus `unreviewed`. Confidence expresses confidence in extraction/observation, not permission to adopt architecture. Namespaced extensions preserve additional scope and proposal metadata without inventing record kinds.

## Decisions and unresolved questions

1. Explicit scope correction: browser adaptation is an illustration and protected implementation, not the universal mission. Native-first remains a web decision, not a rule forbidding other media.
2. Proposed preservation ledger: evaluate semantic, functional, accessible and aesthetic continuity independently; keep historical API compatibility separate.
3. Proposed proof action contract: fixture-controlled principals, explicit consent, strict parameters, revision and idempotency are evaluated examples. Production authentication, storage, cross-process consistency, consent durability and host policy are not decided here.
4. Reconstruction input is a semantic-only canonical model projection. Mechanism/evidence records and their paths stay in the evaluator lane. Projection retains authoritative provenance and requirement identity; its audit can legitimately lack implementations.
5. Shared execution infrastructure cannot technically prevent another agent reading original files. Context withholding, allowlisted inputs and inventories support a procedural trial; strict isolation remains unknown until a separate sandbox/host enforces it.

Questions requiring owner/host decisions before production extensions: which domain actions are essential for a specific adopter; what makes consent durable; whether operation existence is itself private; how to merge concurrent changes; which resource limits are acceptance thresholds; which accessibility standard applies to a new medium; which external API compatibility must survive. Continue independent fixture/evidence work while recording these questions. Do not invent answers and mark them accepted.

The requirement keywords MUST/SHOULD/MAY express obligations at the document's declared authority level. A MUST in an unreviewed fixture is a proposed candidate test requirement, not an automatic owner decision. An implemented mechanism is evidence of possibility, not authority to redefine purpose.
