# Conformance and acceptance

Status: proposed independent evaluation protocol, preserving established browser obligations. The owner mission is explicit; fixture transports/retry details are agent-proposed and unreviewed.

## Independent lanes

| Lane | Question | Pass evidence | Non-pass boundary |
|---|---|---|---|
| Semantic understanding | Does the inheritor explain universal meaning, actors, trust and limits? | External review against explicit mission and neutral vocabulary | A prose statement is reviewed understanding, not runtime proof |
| Semantic/function reconstruction | Do selected operations/information survive actual transformations and failures? | Executed positive/negative/state/interaction checks in declared target | Unimplemented 3D/native/distributed behavior remains unknown |
| Human accessibility | Are labels, traversal, feedback and input alternatives usable? | Native keyboard/form and automated rule results plus necessary manual work | Missing screen-reader/native-zoom evidence is unknown |
| Aesthetic continuity | Is the presentation coherent/recognizable for its medium? | Scoped human review with samples and rationale | Screenshot existence/diff alone cannot pass |
| Drop-in compatibility | Does a historical consumer work without changes? | Actual classes/ESM/schema/type/export consumer proof | Semantic equivalence does not substitute for missing public exports |
| Isolation | Was source and solution knowledge technically withheld? | Enforced separate host/filesystem/context and input access record | Shared-host instruction-only restriction is unknown for strict isolation |

Use PASS/FAIL/UNKNOWN for individual observations. Overall universal conformance is not PASS from one limited proof. A required automated fixture failure returns a nonzero evaluator exit; expected unsupported/manual lanes remain explicitly unknown/fail and are not hidden by a successful harness exit.

## Neutral preferences fixtures

`conformance/universal-v01.json` is UTF-8, transport-independent logical example data with a proof adapter mapping. It declares field semantics, initial state, fixture actors, operations and 12 ordered requests. Proposed request names and HTTP/stdin mappings are not canonical Forever Works operations and do not redefine the upstream standard.

| ID | Stimulus | Expected result |
|---|---|---|
| U-01 | Discover as fixture owner | Surface/field/action metadata and initial state |
| U-02 | Read-only actor attempts apply | permission-denied, state unchanged |
| U-03 | Invalid density | validation-error, state unchanged |
| U-04 | Required display name empty | validation-error, state unchanged |
| U-05 | Consent false | consent-required, state unchanged |
| U-06 | Valid authorized consented application | Density compact, revision advances once |
| U-07 | Observer reads after write | Same authoritative state |
| U-08 | Identical accepted retry | Original success, no second revision increment |
| U-09 | Retry key reused with different payload | idempotency-conflict, state unchanged |
| U-10 | Stale expected revision | revision-conflict, state unchanged |
| U-11 | Unknown action parameter | validation-error, state unchanged |
| U-12 | Unsupported operation | unsupported-operation, state unchanged |

The evaluator SHOULD additionally check missing/overlong names, malformed input types, forged principals, concurrent revisions and denial visibility when the host defines them. The 12 fixtures alone do not certify every security/property edge. Production principal binding and consent persistence require a separate specification and threat model.

## Human-agent parity and metamorphic checks

Run the same logical values through human and programmatic adapters. Required/invalid fields reject before transition; permission and consent remain common; successful human application must be visible in the agent's read. Use a fresh in-process domain instance for a new ordered fixture sequence; do not reinterpret retained state as the declared initial state.

Changing width, text length, language/direction or presentation medium MUST NOT change object/field meaning, permission or validation. Local geometry must affect local composition independently of viewport. Decoration removal must not remove labels. Optional diagnostic removal must not make core actions disappear. Inspectors must not mutate domain/page state or capture synthetic privacy canaries. Unsupported medium/resource dimensions must report limits instead of fabricating a result.

## Browser specialization

`CONFORMANCE_SPEC.md` retains AS-001…AS-016 stimuli independently from existing assertion code. The original web implementation remains protected and is tested with its current suite; a separate evaluator applies neutral observations to old/new outputs where their public surfaces permit it. A candidate lacking a detector or same-card fixture has missing evidence; do not translate that into a pass. Native browser UI zoom and aesthetic approval remain separate from viewport/text stress approximations.

## Evidence contract

Every recorded test needs ID, target/version, environment, actual command/probe, observed result, PASS/FAIL/UNKNOWN, limitations and reference to captured output. Record process/HTTP failures as failures or blockers, not missing samples. Report the test counts actually executed. File hashes identify the artifact observed; a timestamp does not make an unrelated later build equivalent. Do not leak real user data into diagnostic reports; fixtures use synthetic canaries.

Forever Works implementation/migration claims use its lower-case `pass`, `fail`, `unknown` and exact requirement IDs. Do not claim `satisfiesCapabilities` alone is proof; attach claims/evidence with narrowly matching scope. `evaluate-replacement` and `verify-migration` use conservative closed-world aggregation. A migration that includes failed drop-in compatibility remains failed even if semantic proof succeeds; omission is not success.

## Acceptance without silent promotion

Owner review is required for new production policy/transport, required target scope and API changes. Passing tests does not convert agent-proposed records to accepted. The prototype remains a reconstruction artifact, not a shipped universal engine. Stage later production work using the phased handoff rather than changing current consumers under this documentation task.
