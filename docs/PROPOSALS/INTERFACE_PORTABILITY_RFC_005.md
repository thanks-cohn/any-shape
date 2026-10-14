# RFC-005 — Demonstrable Interface Portability: JavaScript to Python

**Status:** Proposed flagship example and implementation request; not a shipped translator.
**Purpose:** Make Any-Shape's durability, presentation and cross-language continuity intelligible through a working side-by-side demonstration.

## The user story

Given an authorized JavaScript interface/application with forms, state, validation, routes and a documented API, an authorized agent uses Any-Shape and canonical Forever Works models to specify those behaviors, constructs an independent Python implementation and verifies that both realizations preserve the same external contracts and human interaction meaning.

**Browser presentation remains browser-native**: HTML/CSS/JS may remain the output renderer for the Python implementation. This is source-language portability, not a claim that browsers execute Python directly.

## Demo application — Preferences Studio

Two implementations, independently authored:
- JavaScript server/application.
- Python standard-library server/application.

Shared, versioned, language-neutral contract describing:
- A page titled Preferences Studio with recognizable section headings, description, a display-name field, reading-density choice, save action and saved-state feedback.
- API: `GET /api/preferences` returns current public preferences with a revision; `PATCH /api/preferences` accepts an explicitly specified JSON patch and revision. Specify exact status codes, content types, error schema, consent/authorization for mutations, idempotency/retry and concurrency handling. No implicit 200 on invalid input.
- Same public route names and request/response shape in both implementations.
- Same default initial state, permitted values, validation semantics, state transitions and error codes.
- Same accessible labels and keyboard/form behavior; visual design identity and orientational anchors adapt in response to changes in container size and user preferences.
- An agent-readable discovery document describing all operations, allowed inputs, errors, authority and limitations.
- No compulsory network services beyond localhost demo. Do not persist sensitive display-name values without explicit intended semantics and security review.

## Presentation requirements

Create a comprehensible showcase page with side-by-side JavaScript and Python previews (or a switch), a contract panel, example API calls, and synchronized conformance results. Label explicitly which implementation is active. Show practical transformations: wide/compact panels, keyboard access, long text and small screens. The SAME full logical content remains reachable on both implementations, without exclusive hover-dependent details. Include a plain-language "What stayed the same?" section explaining data, behavior, permissions, endpoints and aesthetic hierarchy. Differences in internal code are expected.

## Acceptance and verification

P-001 Both runtimes serve the same documented method + path contract with matching JSON schema and HTTP statuses.
P-002 Exact shared fixtures produce equivalent state changes, revisions, validation failures and error codes.
P-003 Unauthorized operations are denied in both implementations; authorization is not merely a decorative checkbox.
P-004 Equivalent human workflow: view, edit, reject invalid, confirm success and return to preserved state.
P-005 Semantic IDs, accessible names and orientational anchors persist when viewport/container changes; decoration may vary.
P-006 Cold agent discovers each application's operations from a structured entrypoint without inspecting source.
P-007 Browser checks include Chromium, Firefox, WebKit where available; report unrun instead of claiming success.
P-008 Independent conformance runner black-box tests both servers using identical requests/expected outcomes.
P-009 Python implementation can start from a separately approved language-neutral reconstruction bundle with no original JS source, old tests or internal implementation details. Enforced isolation documented or reported unknown.
P-010 Resource and maintenance costs measured: install steps, direct runtime dependencies, startup, memory and cold agent reconstruction effort.
P-011 Original JavaScript source may be withheld in a controlled experiment; the Python realization and conformance suite remain recoverable from the accepted Forever Works continuity pack.
P-012 A human can understand the result through the demo without reading implementation code.

## Model-driven transformation, not syntax translation

Do not implement a fragile line-by-line JavaScript-to-Python transpiler and claim it fulfills the vision. Instead:
1. Inspect original JS behavior and APIs, infer candidate intent, mark provenance.
2. Separate owner-accepted intended behavior from implementation accidents.
3. Capture language-neutral operations, state machines, schema, visual-intent and compatibility obligations in the genuine Forever Works format.
4. Generate or independently author the Python realization based on approved contracts.
5. Run a separate independent conformance suite and report PASS/FAIL/UNKNOWN for every obligation.
6. Export a new continuity pack so another human or agent can reconstruct the Python or JavaScript version later.

This demonstrator MAY reuse existing `reconstruction/python-proof/` ideas as background during project planning, but a true *blind* reconstruction lane must separately prevent original-source access. Do not call the existing limited Python proof a full preserved-HTTP-API replacement unless actually verified.

## Future demos
- Node/TypeScript → Python backend with stable REST contract.
- JavaScript → C++ native desktop application with domain equivalence, appropriate UI adaptations and explicit unsupported capabilities.
- Complex web app → accessible text-mode interface + agent interface using the same semantic data and operations.
- Existing framework-dependent app → standards-native web output with a verified design-intent contract.

## Forever Works evidence package

Canonical records: intent, capabilities, invariants, constraints, implementations, dependencies, compatibility, migration and independent evidence. Public API docs and schema examples must be coupled to test fixtures. Provenance of agent interpretations is not owner approval. Claims remain tentative until independent execution.

## Codex task

Implement a self-contained, attractive, understandable flagship demo without breaking the existing v0.1 library. Prefer a `examples/portability/` or `demos/portability/` directory with clear run scripts. Validate canonical models, run independent HTTP/state tests, test browser workflows, generate accessible human-readable comparison artifacts, measure feasibility and record exact evidence/limits in a new handoff report. Preserve current API contracts. If the full scope is too large, deliver an honestly bounded vertical slice rather than documentation-only scaffolding.

## Exact control-to-operation parity (mandatory flagship requirement)

A submit button is not merely a visual element. It is a semantic action wired to an input collection, validation procedure, permitted state transition, transport call and observable result. The JavaScript and Python implementations MUST implement the same external operation contract.

- Every input has a stable semantic field ID, label, value type, normalization rules, empty-value behavior, required/optional status, validation constraints and accessibility semantics.
- Editing a field changes the same logical draft-state field in either implementation. Submitting sends the same named fields and equivalent typed values to the same HTTP method/path and request schema. Field order or browser-specific serialization must not silently change domain meaning.
- Clicking **Submit**, pressing Enter in the appropriate form context, and invoking the authorized programmatic action MUST reach the same domain operation, after the same validation and permission checks. Visual paths and agent paths cannot bypass one another's rules.
- Both implementations return equivalent successful states, error codes, field-level error mapping, revision handling and confirmation feedback. If exact response byte equality is not meaningful (e.g. timestamps or header ordering), define normalized semantic equality explicitly.
- Form draft values, submitted values, persisted state and server responses are distinct; tests must cover each. Avoid inventing persistence if the approved contract only specifies transient state.
- A programmatic client can use the identical documented endpoint, JSON schema, authentication/authorization conditions and operation IDs regardless of whether the server implementation is JavaScript or Python.
- Accessibility includes properly associated labels, keyboard activation, focus management, error announcements and predictable form behavior. Never require hover to recover essential fields or feedback.
- The tests MUST exercise actual browser control events and network requests, not just independently constructed API test payloads. Intercept/observe the outgoing request, compare it to expected normalized contract and verify the receiving server's state.
- Include negative cases: missing and invalid values, multiple rapid submissions, stale revision, unauthorized invocation, Enter activation, browser reload/navigation and retry behavior as applicable to the declared contract.

### Required end-to-end sample

For example, if the interface exposes field `readingDensity` and action `preferences.save`, then choosing `compact` and clicking **Save** in either interface should produce an equivalent request (e.g. `PATCH /api/preferences` with `{"readingDensity":"compact","expectedRevision":0}`, once formally adopted). The same operation called through the Agent API must use the same validation and authority boundary and produce the same logical resulting state. This JSON is illustrative; adopt a single versioned schema and test it, rather than hardcoding two different payload shapes.

### Additional acceptance tests

P-013: Browser-generated requests from actual form interactions in both apps are schema-equal after only explicitly permitted canonicalization.
P-014: Input typing, selection, reset, submit, validation failure and confirmation map to the same stable field/action IDs and state transitions across both apps.
P-015: Authorized Agent API invocation of the same operation yields equivalent state changes and error semantics; unauthorized calls fail consistently.
P-016: An independent test client can switch JavaScript/Python base URLs without changing method, path, schema or interpretation of responses.
P-017: Native no-JS form fallback is either contract-conformant or explicitly documented as an alternative transport with identical domain semantics; tests do not falsely claim that HTML form encoding is JSON.
