# Python reconstruction proof

Standard-library Python 3 only. No installs, external assets or remote services.

From this directory:

```sh
python main.py --protocol
python main.py --serve 8765
python main.py --text
python selfcheck.py
```

`--protocol` consumes one JSON request per line and emits one JSON outcome per line, retaining state until process exit. `--text` prints the initial state then consumes the same JSON requests but renders outcomes as terminal prose. Example request:

```json
{"operation":"apply","actor":"owner","params":{"displayName":"Ada","density":"compact"},"consent":true,"requestId":"example-1","expectedRevision":0}
```

The server binds loopback. GET `/` is the native form; POST `/apply` submits that form through the shared dispatcher; POST `/agent` accepts protocol JSON; GET `/text` is plain text of current state. Human and HTTP-agent paths share one in-process Domain. No JavaScript is necessary for mutation, labels, navigation or disclosure. State resets when restarted. Fixture roles are explicitly not authentication; do not deploy this as a production authorization boundary.

Browser probes: `/?dir=rtl`, `/?long=1`; scale font/zoom, change viewport, disable JavaScript, and independently change width of `.card` containers. Stable IDs are `surface.preferences`, `card.preferences`, `card.state`, `field.display-name`, `field.density`, `action.apply`, `state-density`, `state-revision`. Use attribute selectors for IDs containing periods. `#preferences-form` contains named `displayName`, `density`, `actor`, `consent`, hidden `expectedRevision` and `requestId`. Both cards are local container hosts; fields reflow according to their own host, not viewport alone.

Optional diagnostics: expand “Local optional geometry diagnostics”, activate `#measure`, read `#measurements`. Nothing is gathered until activation. Records contain authored target IDs and numeric dimensions only, no field values, page text, URLs or network reports. Measurements, authored strategy and unknown hypothesis are separate. Geometry can still be sensitive and stays in the page.

Dependency disappearance: stop the process, move `decoration.py` to a temporary location, restart. Missing import removes optional styles but preserves native HTML, forms, all domain behavior, `/text` and `--text`. Restore after testing. `selfcheck.py` instead creates an isolated temporary copy of main.py without decoration, avoiding mutation of the working directory; it replays all 12 neutral fixture cases and exercises text fallback. It uses the bundled `universal-v01.json`, copied byte-for-byte from the supplied neutral fixture with its proposed/unreviewed authority intact. No ephemeral input directory is required; the fixture is not modified.

DisplayName is validated only during request processing, never included in authoritative state, rendering, logs or diagnostics. Accepted-retry records retain a process-keyed HMAC fingerprint of the request and its name-free result; this is necessary to detect different key reuse without retaining recoverable input text. All state, fingerprints and secret die with the process. There is no durable persistence.

## Scope and migration report

Implemented candidate: Python domain dispatch, native web form, newline JSON agent transport, terminal text renderer, optional decoration disappearance, privacy-safe opt-in numeric browser diagnostics. Local sanity verification: 12/12 fixture sequence cases with decoration present and 12/12 absent; terminal fallback checked. Independent browser/accessibility/aesthetic and human-agent cross-channel tests remain the evaluator's responsibility; local fixture success does not certify those dimensions.

Drop-in historical CSS/ESM/diagnostic API compatibility: UNKNOWN, migration needed. No original implementation or API was inspected. This proof defines its own candidate interface; it does not replace the existing package. Migration would require a separately authorized adapter mapping historical exports/selectors/schema to this dispatcher, then independent consumer-contract checks. Functional parity for the neutral fixture is separate from historical compatibility.

Native desktop, 3D/editor interaction, arbitrary domain records, production principal binding, localization beyond direction/long-label stress, and universal aesthetic quality remain proposed or unknown. Screen-reader behavior, extreme geometry below usable control widths, other browsers and resources have not been certified. Plain native HTML/text are available fallback presentations, not claims of identical aesthetics.

The isolation boundary was procedural within a shared filesystem. Only neutral inputs and files in this output directory were read/written for this reconstruction. No original source/history/tests/screenshots or independent evaluator code was read; no Git changes were committed.

## Neutral conformance supplement, added after initial proof

The initial scope/evidence above records the first proof. A later authorized neutral-only stimulus, `/tmp/any-shape-blind-input/CONFORMANCE_SPEC.md`, adds candidate browser fixtures; no original implementation or independent evaluator source was read.

GET `/fixtures` adds the SAME delivery record (`data-object-id="record.delivery"`) to simultaneous `#host-narrow` (280px) and `#host-wide` (720px) local hosts. The corresponding semantic targets are `demo.narrow` and `demo.wide`. Resize a host's `inline-size` independently; the child's computed `--composition` declares `stack` or `side-by-side`. The declaration is presentation metadata, not measured success. The third target `demo.stress` contains full unbroken text and native disclosure. Native preferences form remains on the page. `/fixtures?dir=rtl` supplies RTL. Local cards use native details/summary so optional JavaScript never supplies their primary operation.

GET `/broken` is a separately labeled intentional fault page: `broken.intrinsic` (unbroken nowrap overflow), `broken.clipped-action` with `broken.action` (action beyond clipping ancestor), and `broken.missing-container` (intended local host with container adaptation absent). These deliberate faults are not assertions about healthy behavior.

Diagnostics now live in optional `inspection.js` served at `/inspection.js`, separate from domain and decoration. Activate `#measure` and read `#measurements`, or call `window.anyShapeInspect.inspect()`. Findings use candidate codes `intrinsic-overflow`, `clipped-action`, `missing-intended-container`, numeric evidence and expressly uncertain hypotheses. Measurements and computed authored declarations are separate properties. Authored target IDs are allowlisted; diagnostics do not inspect text, values or URLs, report remotely, change preferences or infer success from an empty finding list. `window.anyShapeInspect.teardown()` removes the trigger element and listener, clears its local output, and removes the global API. This is a new independent diagnostic interface, not compatibility with an unseen historical schema.

Physically move `inspection.js` away to exercise diagnostic disappearance; the HTTP route becomes 404 immediately. Layout, native forms, disclosure and navigation do not depend on it. `selfcheck.py` actually deletes that file in a temporary runnable copy, starts HTTP, verifies native fixture targets remain, confirms inspection HTTP 404, applies through the agent and reads shared text state. It also runs the earlier decorator-absent domain fixture sequence. These are local functional checks, not browser proof of AS-015 or complete replacement of independent browser verification.

Current AS-001 through AS-016 status: **UNKNOWN pending independent browser probes**, with local fixture existence and dependency-disappearance evidence as described. AS-003 additionally requires human aesthetic judgment. Numerical geometry diagnostics are observations, not an accessibility or beauty certification. All earlier compatibility and scope limitations remain.
