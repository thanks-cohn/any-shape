# Human and agent faces

Status: proposed coordinated domain interface. The existing browser library is not a production authorization or agent-action engine.

## One transition path

Human input → presentation adapter → domain validation/authority → state transition → outcome → both views.

Agent request → protocol adapter → **the same domain validation/authority** → state transition → outcome → both views.

Adapters translate representation, not policy. An agent MUST NOT bypass a human-required consent boundary, value constraint or permission check. A human MUST NOT be forced to perform pixel gestures when a meaningful accessible operation is possible. Both faces expose success, denial, conflict, validation failure and unsupported outcomes with an understandable next step.

## Discovery versus authority

Discovery SHOULD expose stable surface/action IDs, schema versions, parameter meanings, required values, available actions for the current principal, preconditions, current revision, supported presentations and error categories. It MUST NOT expose secrets or infer permission from visibility. A host may withhold object existence when its policy requires it. Machine metadata and visible labels MUST refer to the same field/action identities.

A production transport needs trusted authentication, principal binding, permission enforcement, replay policy and consent capture appropriate to its domain. No such transport is specified as already implemented. The reconstruction fixture uses named test principals `owner` and `observer`; selecting them is controlled test infrastructure, **not a deployable authentication mechanism**. An untrusted caller cannot be allowed to become owner by sending an arbitrary role string in production.

## Proposed preferences dispatch

The neutral test adapter uses request operation `describe`, `read` or `apply`. `apply` takes parameters `{displayName,density}`, `expectedRevision`, `requestId`, and explicit consent. The host resolves the fixture actor. The dispatch sequence is: identify operation/principal; check permission; check parameter validity; check consent; resolve an identical previously accepted retry; reject conflicting reuse; check revision; apply once; expose the authoritative snapshot. The exact ordering is proposed to make negative cases reproducible, not a universal error-precedence standard.

Errors MUST be typed and leave state unchanged. Human forms SHOULD associate field errors with accessible labels and announce transition outcomes; agents get a structured code and recoverable state information. Conflict SHOULD enable reread/review rather than silently overwriting another actor's update. A retry MUST NOT replay an irreversible mutation twice under a declared idempotency contract.

## Parity checks

1. Submit the same valid payload through each face; compare domain values and revision change.
2. Submit the same invalid enum or required-field omission; both reject and preserve state.
3. Use a read-only principal; a discoverable action cannot mutate through either face.
4. Change through one face, reread through the other; both observe the authoritative state.
5. Repeat an accepted request and submit a stale conflicting write; verify declared retry/conflict behavior.
6. Remove optional rendering/diagnostic machinery; the remaining face reports available operations honestly.

A structured result alone does not prove human accessibility. A readable screen alone does not prove authority or agent discoverability. Those evaluations remain independent, as do aesthetics and drop-in compatibility.
