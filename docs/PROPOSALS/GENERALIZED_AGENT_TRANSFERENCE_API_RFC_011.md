# RFC-011 — Open-Ended Application Continuity and Universal Agent Transference

**Status:** Foundational architectural proposal, not a shipped general-purpose converter or universal API.  
**Date:** 2026-10-13  
**Related:** RFC-005 through RFC-010; Forever Works canonical 0.1 records; OpenForm Studio and OpenForm Flow.

## Vision and deliberately unlimited horizon

**Any-Shape must preserve an application's intelligible purpose, essential behavior, presentation identity and authorized effects while its implementation changes—across languages, UI toolkits, operating systems, execution environments, versions and future modalities.**

**The first three forms are teaching examples, not a catalog of everything the system will ever support.** Endpoints, webhooks, document generation, browser-to-native GUIs, and form submissions are convenient early exemplars. The architecture must not enumerate these as the universe of possible capabilities, nor make forms the privileged object type.

The durable result is a public, technology-neutral contract and evidence system that can teach an unfamiliar human or agent how to preserve **meaning, behavior, effects, causality, orientation, trust and recoverability**, and how to extend the system when a capability that nobody anticipated is encountered.

> **The form may change. The identity must remain. The action must still mean what it meant; its permitted consequences must still occur.**

This is a target for careful engineering and falsifiable tests, not a claim of automatic lossless conversion of arbitrary programs.

## The three opening lessons

| Teaching application | Language | Deep principle |
|---|---|---|
| **OpenForm Studio** | Browser JavaScript | Stable input identity, validation, editing, publishing, data semantics, adaptive presentation and local effects |
| **OpenForm Flow** | Browser JavaScript | Stateful authoring, conditional behavior, repeated data, interaction and navigation graphs |
| **OpenForm Schema** (planned) | Browser TypeScript compiled to JS | Typed contracts, structured transformations, cross-field dependencies, artifact creation and independently observable external effects |

Their three **native Python** equivalents (planned) must demonstrate that the contract is not the DOM, CSS, JavaScript event listeners or Python/Qt signals. Each tier should show discoverable action-to-effect mapping, independent conformance and human aesthetic review. Later examples in Avalonia C#, C, C++, other languages or new media should be added when they stress **a genuinely new universal principle**, not merely to inflate example count.

## No hard-coded catalog of future effects

The system must accommodate present and future capabilities, including but not restricted to:

- Form input, navigation, accessibility, component state, gestures, menus, drag/drop and rich graphic interfaces.
- HTTP/GraphQL/RPC/gRPC services, URLs and deep links, server-sent events, WebSockets, queues, streams, polling, push events, incoming and outgoing webhooks.
- Filesystem operations, local database updates, indexed storage, documents, images, media, archives, rendering, printing, export and generated artifacts.
- Notifications, authorized messaging/email, scheduling, collaboration, transactions, third-party APIs, sensors and device capabilities where permitted.
- Background operations, offline synchronization, conflict resolution, multi-user state, distributed workflows, long-running processes, failures, retries and recovery.
- Browser extensions and native messaging hosts, desktop, mobile, server, CLI, embedded systems, assistive technologies and yet-unknown interfaces.
- Security decisions, permission prompts, authentication, authorization, capability grants, privacy/retention policies and human approval.
- Future agents, tool integrations and interaction models that cannot presently be predicted.

**These are examples of extensibility pressure, not promised built-in adapters.** Do not turn the core into a giant dependency-heavy framework. A future implementer must be able to describe an unfamiliar effect through an extension without rewriting all old apps.

## Seven fundamental continuities

1. **Intent and meaning:** Why the application exists; domain entities, capabilities, relationships, data semantics and stable identities.
2. **Causality and function:** What interactions/actions mean, their inputs, guards, validations, state transitions, ordering, errors and invariants.
3. **Authorized effects:** What must happen in the world: local or remote state, generated content, requests, communication, device operations or other side effects; distinguish intended, attempted, acknowledged and actually completed.
4. **User experience and orientation:** Understandable content hierarchy, task location, legible adaptive design, aesthetics, focus, accessibility, feedback and native context.
5. **Security and trust:** Identity, credentials, permissions, consent, recipient/endpoint identity, safety constraints and least privilege; agents never bypass the business rules.
6. **Delivery and operability:** The user can install, launch, maintain and recover the target; declared package, dependency, runtime and platform boundaries survive as practical obligations.
7. **Evidence and repairability:** Independent test fixtures, observable traces, clear PASS/FAIL/UNKNOWN, versioned decisions, provenance and cold-agent inheritance.

None of these can be reduced to copying code, similar screenshots, or matching successful API responses alone.

## A small, open, versioned metamodel

Describe applications as an extensible graph of first-class, stable IDs rather than a fixed GUI-specific format:

- **Intent:** capability purpose, participants, invariants and user goals.
- **Entity:** typed domain object and its stable identity and relationships.
- **Interaction / trigger:** events, commands, incoming messages, state or temporal triggers, and initiator.
- **Action / operation:** stable ID, typed argument/result contracts, authorization, preconditions and failure taxonomy.
- **State / transition:** authoritative and derived state, revisions, event ordering, consistency expectations, lifetime and persistence.
- **Effect obligation:** semantics, inputs/outputs, permitted target/resource, completion criteria, compensation/rollback, idempotency, ordering, telemetry/privacy constraints, partial failure and recovery.
- **Presentation obligation:** logical UI structure, meaning, hierarchy, design tokens/intent, interaction availability, accessibility, responsive/orientational behavior, fallback.
- **Environment / adapter:** actual runtime/platform language binding, implementation-specific capabilities and privileged boundaries.
- **Evidence:** fixtures, trace provenance, execution environment, observation and independent evaluator verdict.
- **Migration / projection:** explicit mapping across versions, implementations, information loss and unsupported capabilities.
- **Extensions:** typed capability descriptors by namespaced, versioned identifiers and their own schemas, never a closed list of predefined effect types.

Store stable relationships between these concepts. Reuse the **actual Forever Works canonical 0.1 kinds and validated extensions** rather than inventing incompatible canonical record kinds. A dedicated transference schema, if introduced, is an *application contract linked from canonical records*, not a replacement for Forever Works.

### The open extension rule

**A new effect or interface medium must be describable without rewriting the core or abandoning old contracts.** Use versioned, namespaced capability IDs, discoverable schemas, declared dependencies and semantic adapters. Unknown extensions must remain intelligible metadata and produce an explicit **UNSUPPORTED/UNKNOWN** conformance result, not silent deletion or fabricated fidelity.

The standard should not mandate any single runtime, language, transport, GUI framework, agent provider, network backend, packaging technology or filesystem. Local-first and offline use remain first-class. Dependencies must be minimal in the core, with optional independently replaceable integrations.

## The transferable causal chain

```text
human / external / scheduled intent or trigger
    → origin-environment event binding
    → stable logical operation + typed arguments + provenance
    → permission / precondition / validation / revision guards
    → domain transition and declared effect obligations
    → actual effect adapters (built-in or namespaced extensions)
    → observed local/remote outcomes, failures, compensation/recovery
    → user feedback, navigation, resulting state and accessibility
    → independent equivalence tests and recorded evidence
```

A JS `click` and a Python Qt `clicked` signal are not the same primitive; if they normalize to the same intended `form.submit` operation, the accepted outcome must still match the contract. A button that looks equivalent but sends to the wrong URL, omits an attachment, writes a different record, ignores authorization, or drops a required event **fails**.

Actions should also support *non-button triggers*: incoming webhooks, filesystem changes, server events, timing/schedules, background queues and external agents. No form or GUI assumption belongs in the core.

## Illustrative external-effect contract

This is a **conceptual example, not an implemented interface or the limit of possible effect categories**:

```json
{
  "contractVersion": "0.1-proposed",
  "operationId": "application.finalize",
  "inputSchemaRef": "schemas/application-response.schema.json",
  "requiredGuards": ["authorization.submit", "validation.final"],
  "effects": [
    {
      "id": "artifact",
      "capability": "org.example.document.generate@1",
      "contractRef": "schemas/generated-document.schema.json"
    },
    {
      "id": "deliver",
      "capability": "org.example.network.delivery@1",
      "endpointRef": "service.application.receive",
      "dependsOn": ["artifact"]
    },
    {
      "id": "notify",
      "capability": "org.example.events.publish@1",
      "eventRef": "application.finalized",
      "dependsOn": ["deliver"]
    }
  ],
  "successCondition": "All required effects acknowledged according to their contracts"
}
```

The example says a user operation can generate a document, send the required content to an approved endpoint and announce its result. The *actual* endpoint, HTTP method/headers/body, webhook direction, schema, document format, security, idempotency, failure semantics and verification must come from the particular app's owner-approved contract and evidence. Do not infer hidden backend behavior from a screenshot or invent credentials.

## Developer SDK and Universal Agent API: two faces, one truth

### Developer face (illustrative)

A minimal portable interface should support discovery and explicit dispatch, such as:
- `describeApplication`, `listCapabilities`, `listOperations`, `describeOperation`
- `readContract`, `getStateDescriptor`, `inspectBindings`, `listAdapters`
- `dispatchAuthorized`, `inspectResult`, `collectSanitizedTrace`
- `runConformance`, `explainDifference`

These are **proposals**. Final names, data contracts, versioning and SDK design must be settled through an implementable proof, not invented as already shipped APIs.

### Agent face (illustrative)

A previously unfamiliar agent must have an obvious, provider-neutral entrypoint that enables:

1. **Discover** purpose, capabilities, state, effect graph, origin bindings, platforms and extension schemas.
2. **Inspect** consented source behavior/code, actual tests and logs, endpoint contracts, secrets policies and unknowns.
3. **Model** editable, versioned semantic and causal mappings without losing provenance.
4. **Plan** target-specific binding choices, constraints, degradation, packaging and independent checks.
5. **Dry-run** with synthetic fixtures and non-live effect adapters; show proposed consequences and risk.
6. **Apply** only with scoped owner authorization, through identical domain/permission checks as human actions.
7. **Observe and verify** actual effects with safe sanitized traces and independent conformance suites.
8. **Diagnose, repair and migrate** while preserving old contracts or documenting changes.
9. **Handoff** all contracts, replacements, evidence and exact next steps to a cold agent.

Keep transport-neutral; CLI+JSON, HTTP, stdio or standardized agent protocols may expose the same underlying operation contract. Do not grant agent operations more privileges than the original application.

### Privacy and security defaults

Do not transmit live user content, execute unsafe downloaded code, follow arbitrary unknown outgoing destinations or invoke payments/messages during reconstruction by default. Use mock/local receivers and synthetic data, sanitize logs and secret-bearing headers, preserve consent and credential handling. Unknown effects are inspectable but not silently executed.

## The teaching examples are evidence, not prompt magic

Agents may infer the general approach from three exemplary applications **if the repository exposes the underlying ontology, operation registry, state/effect graph, adapter boundary and independent tests clearly enough**. Three examples alone cannot guarantee generalization to arbitrary software. The standard must explicitly teach how to discover, model and verify *novel* capabilities not present in the examples.

For every meaningful operation, leave a machine- and human-navigable chain:

```text
intent → source trigger → stable action ID → typed inputs → guards
       → state transition → effect obligations → actual observations
       → target-language binding → parity fixtures → PASS/FAIL/UNKNOWN
```

Include a documented **unseen fourth-project challenge** so evaluation tests real generalization instead of memorization of three form examples. The evaluator should freeze neutral requirements and tests before the agent implements the new target, and report how strict the information isolation was.

## Strategic execution order

1. Make OpenForm Studio and Flow truly working and independently audited in their browser form.
2. Extract a small, real logical action and effect registry from a vertical slice of Studio, with versioned schemas and fixtures; **implement** one portable operation in JS and Python.
3. Expand through Flow's complex state transitions, conditions, repeats and multi-page behavior.
4. Build TypeScript OpenForm Schema as a useful application with type discipline and independently observed **opt-in simulated** document/API/webhook effects, to pressure-test extensibility beyond UI data entry.
5. Independently reconstruct three native Python apps with real controls and compatible observed effects, readable resize behavior, and manual aesthetic review.
6. Run an unseen fourth app (different domain) and identify where the standard lacked enough meaning; iterate the foundational model rather than adding hardcoded special cases.
7. Add native Avalonia C#, C/C++, browser-extension/native-companion and eventually other platform adapters incrementally as evidence supports, with dependency costs isolated from the minimal core.

## Release/acceptance gates

- **UAT-001**: A cold agent can discover all accepted app intent, action/effect schemas, binding locations and unknowns from a documented entrypoint.
- **UAT-002**: JS/TS and Python invoke contract-equivalent operations, preserving typed inputs, guards, transitions, errors and authorized effects.
- **UAT-003**: Network routes/endpoints/webhooks and document-generation requirements match **real observed** contracts where included; failures, retries, ordering and security are exercised.
- **UAT-004**: A new effect can be added with namespaced schema + adapter + fixtures, without changing pre-existing core types or breaking prior examples.
- **UAT-005**: A novel application, unlike the three forms, can be modeled and partially reconstructed by an unfamiliar agent with traceable, independently evaluated evidence.
- **UAT-006**: All platforms preserve readable, accessible, recognizable orientation and working control-to-effect wiring, including error paths.
- **UAT-007**: Agent action execution uses the same real authorization boundary as developer and human operations.
- **UAT-008**: Missing capabilities and unknown private behavior appear as explicit unsupported/unknown, never a fake pass.
- **UAT-009**: No heavy optional GUI/toolchain/service dependency becomes mandatory for the standards-native browser core.
- **UAT-010**: A future agent can independently repair/replace one adapter while preserving the approved semantics and verifying no regressions.
- **UAT-011**: Installation/deployment claims, performance and cross-platform compatibility are independently tested rather than implied.
- **UAT-012**: Documentation includes plain-language examples, schemas, extensibility instructions, executable fixtures and precise fidelity reports.

## The maxim

**Teach the principle once through a small set of deep examples; keep the standard capable of describing what those examples never anticipated.**

Any-Shape should not be locked into *forms, Python, APIs, webhooks, documents, desktops—or any current device.* Its foundation is the continuity of a program's accepted meaning and consequences across changing implementations, with human-intelligible results and reproducible evidence.
