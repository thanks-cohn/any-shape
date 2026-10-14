# OpenForm Flow — enduring meaning and reconstruction contract

**Status:** Browser reference source exists; independent browser, aesthetics and Python outcomes are not yet certified.
**Purpose:** A professional, broadly reusable **advanced form authoring experience** where the author can change any question or heading, add/remove/reorder fields, create conditional and repeatable sections, switch presentation themes, preview and publish into a usable local respondent form without learning programming.

## Human meaning

OpenForm Studio remains the general 20-question starter. OpenForm Flow is a **second, distinct demonstration** of ambitious usability: powerful features often sold within commercial form suites, exposed through comprehensible native controls and a restrained black/white design. A form can be altered until it serves the user's situation. The user decides what the questions say and how respondents answer. Publishing hides the editor, exposes the valid respondent workflow and stores submissions locally; it does not pretend to create a public hosting account or remote database.

The authored content—not the original HTML/CSS positioning—is the thing a future Python, Avalonia or C++ implementation should preserve.

## State machine and user interactions

- **Edit:** author can create sections, questions, repeatable sections; change field type/label/help/options/required flag; move questions via arrows; remove elements; use native text controls; export/import configuration.
- **Preview:** respondent-facing navigation and answer interaction without storing a response.
- **Published locally:** respondent-facing multi-step form; required and basic type validation; Submit stores an actual JSON response on the local device and confirms it. Return to Edit resumes authoring. The state is retained locally.
- **Appearance:** explicit light/dark appearance from the JSON document; system fonts, black-on-white/white-on-black, readable spacing, no paid font/runtime/theme system.
- **Advanced fields:** text, textarea, email, telephone, URL, numeric, currency, date, time, datetime, select, radio, multi-checkbox, rating, opinion scale, ranking, matrix, confirmation, file reference metadata, typed acknowledgment and informational content. Some kinds are native input elements; ranked/matrix patterns use explicit accessible compositions.
- **Conditionals:** a field can depend on another answer matching a configured value. Hidden fields must not be submitted; if a hidden required field exists its validation is skipped.
- **Repeatable group:** a section can be repeated, and answers retain identity by stable field IDs plus a repeat index.
- **Local responses:** locally stored records and export/delete; no server or default external analytics. No uploaded file bytes and no claim of a legally verified e-signature.
- **Accessible navigation:** persistent sections, native keyboard-able controls, visible move/edit actions and readable form error feedback.

## Canonical domain and adaptation boundaries

The independent application model records form ID/title/description, ordered sections, stable question IDs, type, options, rows, required status, visibility condition and theme. It is a **form-specific source document**, not an alternative Forever Works record schema. The cross-platform contracts should describe: `form.edit`, `question.create/update/delete/move`, `section.create/update/delete/repeat`, `form.preview`, `form.publishLocal`, `form.submit`, `responses.export/delete`, and `appearance.setTheme`. Names here are proposed operation IDs rather than a currently shipped Universal Agent API.

For a native Python implementation, use real Qt widgets, native geometry/resize behavior, and matching domain actions. Preserve actual field values, section order, conditional behavior, validations, user feedback, import/export and local persistence semantics. Do not simply render the original browser inside a WebView.

A future source/target that uses an HTTP endpoint must carry method/path, authentication, schema, error, revision and security obligations explicitly; current local mode calls **no endpoint**. Platform-specific file handling, persistence and installer permissions require separately documented adapters.

## Aesthetic and orientational invariants

1. The form must remain recognizably the same application when its viewport/window shape changes, including headings, section ordering, active step and reachable primary action.
2. Readability must not be traded for squeezing content; reflow and stacking are preferable to microscopic body text or disappearing controls.
3. Question wording may change without silently changing the logical field ID. Questions may be added/removed without requiring the user to write source code.
4. Light and dark are legible and visually deliberate; palette names are portable intent, not forced matching of browser colors to native toolkit pixels.
5. Native and programmatic interfaces must not disagree about field definitions, required values, permitted choices, visibility or submitted state.
6. Optional media/file capabilities must be reported as supported, adapted, or unavailable; loss of content must not be hidden by attractive presentation.
7. Editing controls disappear on local Publish while respondent questions and domain action remain accessible. A user can return to the editor.
8. Error messaging, keyboard traversal, matrix/ranking controls and focus retention need independent accessibility and human observation evidence.

## Test and reconstruction expectations

- Load the editor, count representative field types, switch themes, narrow the viewport, edit wording, add/remove/reorder, create a conditional question and repeatable section, then publish.
- Complete real answers including matrix and ranking, navigate back/forward, submit, verify the output JSON, export and delete data; test required/invalid inputs.
- Compare independently reconstructed Python actions against an agreed neutral fixture set with PASS/FAIL/UNKNOWN for domain semantics, input parity, native layout adaptation, visual intent, performance, security and deployment.
- Inspect edge cases: conditional input changes, repeatable section bounds, imported malformed JSON, local storage quota, large numbers of sections, invalid file types, and multiple input methods.
- A separate cold agent must be able to explain the app and implement a bounded native candidate from approved neutral documentation and fixtures; full strict blind isolation requires an enforced boundary.

## Actual status

The browser source is located at `examples/openform-flow/` with an editable JSON config, JavaScript logic, and CSS. No claim of full accessibility certification, external web publication, production file upload, verified signing, backend submission, independently reproduced native Python app or passed cross-browser tests is made.

Canonical Forever Works 0.1 records for this example are indexed in `forever/manifest.json` and retain unreviewed provenance. Owner-confirmed product intention and engineering guesses are not silently conflated.
