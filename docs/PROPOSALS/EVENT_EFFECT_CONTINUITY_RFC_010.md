# RFC-010 — Event–Effect Continuity: an interaction contract across languages

**Status:** Proposed open standard and reference protocol, NOT a shipped Universal Agent API.
**Date:** 2026-10-13
**Priority:** Fundamental to the three-form JavaScript/TypeScript → native Python demonstration.
**Related:** RFC-005 through RFC-009, Forever Works 0.1, `docs/EXAMPLES/OPENFORM_CONTINUITY.md`, `docs/EXAMPLES/OPENFORM_FLOW_CONTINUITY.md`.

## First principle

**Transference must preserve causal wiring, not just visible controls and output format.**

When someone clicks, types, selects, checks, submits, navigates or invokes a public programmatic action in JavaScript/TypeScript, the corresponding native Python input must invoke the **same logical operation** and, for equivalent preconditions and input, cause the **same allowed sequence of state changes, validations, API requests, persistent effects and user-visible outcomes**. Renderer-specific event names are adapters: DOM `click`, `input`, `change`, `submit` and Qt `clicked`, `textChanged`, `currentIndexChanged` are not the canonical operations.

> **A press here must mean the same thing there.** Preserve the causal chain from intention and user input to permission, domain transition, side effects and observable results. Platform mechanics can differ; accepted consequences cannot silently drift.

## Minimal model — six separable concepts

1. **Source gesture**: browser/native events and device semantics, including keyboard, pointer and accessibility activation.
2. **Normalized action**: stable `actionId` such as `form.submit`, `question.update`, `form.publishLocal`, `section.next`, `responses.export`; typed canonical arguments with stable IDs.
3. **Preconditions and authorization**: current form mode, validation, permission, enabled state and version/revision.
4. **State transition**: well-defined state before/after; draft/published, active section, answer record, errors, and durable storage.
5. **Effects**: explicit operations such as a local store write, HTTP request, file export, focus change or navigation—distinguish requests to perform effects from verified completion.
6. **Outcomes and evidence**: user-facing feedback, canonical result/error codes and independently captured effect traces.

Use a neutral **JSON-compatible action/effect schema** (and JSON Schema for validation) rather than copying DOM APIs or requiring Python to interpret JavaScript. Stable operation IDs, inputs, outputs and tests are the portable interface.

## Reference normalized action envelope (illustrative, not yet a released schema)

```json
{
  "contractVersion": "0.1-proposed",
  "actionId": "form.submit",
  "targetId": "openform-reference",
  "arguments": {
    "answers": {
      "title": "A new idea",
      "reason": "Project"
    }
  },
  "context": {
    "mode": "published",
    "expectedRevision": 4
  }
}
```

The illustrative result is **not** a claim that either existing browser example already emits this envelope:

```json
{
  "result": {
    "status": "accepted",
    "resultCode": "FORM_RESPONSE_SAVED"
  },
  "transition": {
    "from": "published",
    "to": "published"
  },
  "effects": [
    {
      "kind": "storage.write",
      "target": "localResponses",
      "status": "completed"
    },
    {
      "kind": "ui.announce",
      "messageCode": "FORM_RESPONSE_SAVED"
    }
  ]
}
```

Dynamic timestamps, random record IDs, OS control identifiers and platform-specific storage paths are evaluated by type/property or normalization rules, not naive byte-for-byte equality.

## Same effect, not only same event label

| Human intention | JS / TS binding | Native Python binding | Canonical accepted behavior |
|---|---|---|---|
| Edit a question | Edit button or right-click → JS callback | Qt edit button/context action → slot | `question.update`: same stable question ID, allowed updates, validation, resulting field label and retained value policy |
| Add a question | `click` → insert configured field | native button signal → insert field | `question.create`: generated unique ID, section order, type and defaults preserved |
| Choose an answer | `change` → update draft | Qt selection/text signal → draft | `answer.set`: same canonical data type/value, dependent visibility updated |
| Navigate | Continue / Back | native Next / Previous | `section.next/previous`: same validation gate, active section and error placement semantics |
| Publish | Publish button | native Publish action | `form.publishLocal`: editor disabled, respondent mode enabled, same fields and submission policy |
| Submit locally | DOM `submit` | Qt submit activation | `form.submit`: validation, canonical record, storage effect, success/error outcome |
| Submit to server | `fetch(POST)` | Python HTTP client POST | Identical authorized method/path, equivalent headers/auth, schema, retries/response semantics |
| Export | Blob/download | native save dialog/file writer | `responses.export`: same normalized payload, explicit file effect and success/failure |
| Conditional visibility | dependent values change | domain rule evaluation | `visibility.evaluate`: same policy; hidden fields excluded or retained per declared contract |

Right-click is an optional author convenience, **not the only way to edit**. Keyboard/screen reader accessible activation must reach the same `question.update` operation.

## Deterministic contracts and effect tracing

Define canonical:
- **Action registry**: `id`, intent, argument schema, allowed state, permissions, transitions, effect intents, failure codes, event bindings for each renderer.
- **State machine**: typed snapshots and invariants for editable draft, local published, preview, answered/submitted and relevant revisions. Prohibit unauthorized/skipped transitions.
- **Effect schema**: `storage.read/write/delete`, `http.request`, `file.export`, `navigation.go`, `ui.focus`, `ui.announce`, `media.open`; each carries minimal safe inputs, idempotency/attempt identity where needed, and status `requested | completed | failed | canceled`.
- **Transport adapter**: native HTTP libraries and JS Fetch map to a common request/response contract. Distinguish request *intent* from server-observed wire trace, and completed effect from an optimistic UI state.
- **Data types**: null/empty/absent; numbers and money precision; dates/timezones; ordered ranks; radio/multi arrays; nested/repeated groups; file references vs actual uploaded bytes; validation/error codes; encoding and canonicalization.
- **Side-effect constraints**: secrets and credentials must not be logged or embedded in public JSON; network operations require permitted endpoint and authentication. Agent API actions must respect normal user/domain permissions.
- **Agent-readable evidence**: redact personal answers by default; log ID/type/status/timing and hashed or synthetic payloads in tests; reveal test data only in explicitly approved fixtures. Protect live private submission data.

### A concrete test vector

Given a published form with required `title`, optional `reason`, local-only submission, and draft `{title:"A new idea",reason:"Project"}`:

```json
{
  "fixtureId": "form.submit.local.accepted",
  "initialState": {"mode":"published","answers":{"title":"A new idea","reason":"Project"}},
  "action": {"actionId":"form.submit","arguments":{}},
  "expected": {
    "resultCode":"FORM_RESPONSE_SAVED",
    "effects":[{"kind":"storage.write","status":"completed"},{"kind":"ui.announce","messageCode":"FORM_RESPONSE_SAVED"}],
    "recordAnswers":{"title":"A new idea","reason":"Project"}
  }
}
```

Given missing required `title`, the accepted result instead is `FORM_VALIDATION_FAILED`: no storage or network write, stable error mapping and focus/announcement directed to the first invalid field. Include equivalent keyboard activation as a second input route to this action.

For a configured HTTP submission, independently observe a receiver and assert method/path, status, response/error mapping and authorized resulting state, including a rejected request and transport failure. **OpenForm Flow currently supports local mode only**; do not make up endpoint parity before adding and testing an HTTP source behavior.

## Architecture: one contract, multiple adapters

```text
Browser DOM gestures                         Python/Qt native gestures
        |                                             |
   Browser binder                                 Qt signal binder
        |                                             |
        +------ canonical action ID + typed args -----+
                              |
                   Domain transition engine
                              |
           validated result + declared effect intents
                              |
     +-------------------+---------------------------+
     |                   |                           |
 Local storage       HTTP adapter                UI/navigation
     |                   |                           |
     +-------------------+---------------------------+
                              |
                    Observable effect trace
                              |
               Independent contract evaluator
```

The domain engine can have **separate implementations** in TS/JS and Python, not a shared language runtime. The stable contract and conformance suite must be shared; implementations remain replaceable. Native widget/renderer details stay out of domain identity.

## Progressive implementation plan

**A. Studio (first JS source):** extract a small action registry around existing edit, add, publish, validate, submit, export, setTheme operations without breaking its current behavior. Record action/effect fixtures and perform independent JS traces. Implement corresponding Python domain and native bindings; run identical fixtures.

**B. Flow (second JS source):** add section navigation, question reorder/delete, conditional reevaluation, repeatable group append/remove, matrix/rank semantics, and precise hidden/required value policy. Verify state machine from edit to preview to publish to respondent submission in JS and then Python.

**C. Schema (third TS source):** design its actions as typed contracts first; add JSON Schema-backed nested groups, calculation dependencies, cross-field validation, review and explicitly configured HTTP submission. Ship compiled browser JS and portable contract fixtures. Implement Python against the same contracts.

At each tier preserve the lightweight Any-Shape core; do not make JS DOM, Qt, Node, React, Avalonia or any agent-specific tool a dependency of the **standard**. The standards can be used with future Avalonia C#, C and C++ adapters.

## Conformance gates

- **EE-001 — Gestures**: pointer, keyboard and assistive-compatible activation reach the expected stable action ID.
- **EE-002 — Inputs**: arguments are typed/canonicalized identically and question IDs remain stable when text changes.
- **EE-003 — Guards**: state, required validations and permissions reject the same invalid operations.
- **EE-004 — Transitions**: same accepted prior state + action yields equivalent next state and error mappings.
- **EE-005 — Effects**: actual local persistence/HTTP/file/navigation results are observed; no claim of success from a mere callback or dispatched request.
- **EE-006 — Remote endpoints**: independently captured HTTP requests and server responses have contract-equivalent behavior including failures.
- **EE-007 — UI feedback**: focus, error, announcement and primary actions remain usable under light/dark and native resize.
- **EE-008 — Adapters**: JS/TS and Python have separate native event bindings but pass the *same* domain/effect fixtures.
- **EE-009 — Trace privacy**: debug instrumentation excludes real personal field contents by default, preserves usable error provenance and is opt-in.
- **EE-010 — Cold agent**: without conversation history, an agent can find each action's trigger, arguments, effects, failure modes, source adapter, Python adapter, fixtures and evaluated status.
- **EE-011 — Change survival**: alter an authorized form rule, update the canonical contract, reconstruct and detect source/target drift independently.
- **EE-012 — Lightweight**: no mandatory heavyweight dependency added to basic browser users to support tracing/transference.

## API shape: developer face and universal agent face

The **Developer SDK** should expose `listActions()`, `describeAction(id)`, `dispatch(action)`, `describeState()` and `getCapabilities()` with language-appropriate adapters. These are *illustrative names*, not available functions. Agent API should expose read-only discovery/inspection, then explicit permissioned **plan → dry run → apply → verify** with structured results, relevant effect traces, error taxonomy, and replayable synthetic fixtures. The SDK and agent interface must resolve to one domain guard/permission implementation; **no privileged agent bypass**.

This makes wiring *discoverable*, not mystical. An agent sees exactly what a button should do, the state it affects, the endpoint it contacts, and the evidence demonstrating that the next implementation behaves correctly.

## Documentation standard for each migrated control

For each meaningful source interaction, require one navigable control-to-effect mapping:

```text
sourceControl → gestureBinding → actionId → arguments → preconditions
             → stateTransition → effects → outcomes/errors → evidenceFixture
             → nativePythonControl → nativeSignalBinding → evaluatedStatus
```

Every field/action must have a stable ID and traceable owner. The contract, human-friendly explanatory prose and Forever Works canonical links belong together. Never list an expected result as *tested* until it has an independent observed trace.

## Lasting principle

**Do not transfer the event handler's syntax. Transfer the obligation of what it does.**

The first three forms must make that principle undeniable, with a functioning native UI and executable independent evidence—not just diagrams.
