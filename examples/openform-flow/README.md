# OpenForm Flow — the second Any-Shape reference form

**Status:** Standards-native browser source implemented; browser execution, aesthetic/keyboard manual inspection, and Python transference not yet independently verified.

OpenForm Flow complements—not replaces—[OpenForm Studio](../openform/README.md). Studio is the conventional 20-question intake form. **Flow** is the advanced, dependency-free, *no-code authoring* example: edit the form until it fits, rearrange questions, create branched and repeatable sections, preview it, then **Publish locally** to get a respondent-ready form.

## Start, copy and publish

From the repository root, `npm run dev`, then visit `http://127.0.0.1:4173/examples/openform-flow/`. Copy the entire `examples/openform-flow/` folder to reuse it with any ordinary static HTTP server. There are no external JavaScript packages, fonts, mandatory API services or app account.

1. In **Edit** mode, click a section heading, question label or the visible Edit control to change its label, description/help, answer type, choices and required status. The editor has explicit move-up/down controls, plus delete.
2. Choose an answer type in the sidebar; select **+ Add question**, **+ Add section** or **+ Add repeatable group**. Sections create a multi-page form. Repeatable groups let respondents create multiple copies of a group.
3. Optionally add *conditional visibility*: choose an earlier or different question and an exact value that must match to display the question. Hidden answers must not be submitted. Avoid creating circular conditions.
4. Use **Preview** to inspect the respondent experience without capturing data.
5. Choose **Publish locally** to disable editing and present an actual multi-step respondent form with required-field checks, Back/Continue navigation, and final Submit. Responses are saved only to this device. **Publish is not public internet hosting**; to distribute, export JSON and deploy a configured site. There is no remote response collector by default.
6. Export/import editable form JSON, export local responses as JSON, and delete stored data. This demonstration does not implement secure multiuser storage, authenticated file uploads or public deployment.

## Field library — 20 major types

Short text, long text, email, phone, URL, number, currency amount, date, time, date-and-time, dropdown, radio-button single choice, checkbox multiple choice, 1–5 star rating, 1–10 scale, reorderable ranking, matrix grid (multiple rows and single choices), confirmation checkbox, file attachment reference, typed signature, and informational/explanatory text. (There are **21** options when informational sections are counted separately.)

These are native HTML controls or accessible native compositions, not a paid form service. Distinguish their actual limitations:
- **File references:** file input records filename/size/type metadata in memory for the session. It does **not** upload, transmit or retain file content. A production backend and explicit data-handling policies are required for true attachments.
- **Typed signature:** an acknowledgment entered as text; **not** a verified legally binding e-signature service.
- **Ranking:** accessible move-up/down buttons change the ordered array, rather than requiring drag-and-drop.
- **Matrix:** a scrollable labeled grid. Independent keyboard and screen reader evaluations are needed.
- **Conditional rules:** simple exact equality against existing answers, not an arbitrary rule engine.
- **Repeatable groups:** multiple instances use stable field IDs plus instance index, represented in the result by suffixed keys. A future transference model could improve this through an explicitly versioned structured-array schema.

## Design intent, resize and accessibility

Light mode has near-black system text on white, dark mode near-white on black; no hosted fonts. Sections have recognizable headings, fields retain their order, controls remain legible, and a two-column layout collapses to one at narrow widths. Reorder controls and standard form widgets can be accessed by keyboard; no essential interaction is hover-only. Mobile-width and desktop-width views should retain the same question meaning and Submit behavior.

This is **Continuity of Orientation**, not screenshot copying. The form should remain professional at intermediate sizes, zoom and long labels; human inspection, multiple browsers and assistive-technology testing are still outstanding.

## Shared configuration

`form.config.json` is the portable source model; the editor stores local customizations under `anyshape.flow.draft.v1` in localStorage. Import/export uses the same shape and keeps stable IDs when relabeling. A respondent record has `schemaVersion`, `formId`, `id`, `submittedAt` and `answers` keyed by stable question ID or repeat-instance suffix.

Theme and UI concerns do not change domain answer semantics. Data is stored in browser localStorage under `anyshape.flow.responses.v1`; it can be cleared by the user or browser, and is not suitable for sensitive personal information.

## Native Python transference and Forever Works

This example should be a **second, harder reconstruction benchmark**, using accepted domain and presentation obligations instead of copying the DOM. An unfamiliar agent should recreate:
- The edit/preview/published state machine, sections and question-type library in native Python/Qt.
- Config import/export; conditional rules, ranking, matrix, repeating sections and typed acknowledgment.
- Same field/action identities and answers, including hidden-value omission and required validation.
- Same layout and orientation commitments with native layout mechanisms.
- Clearly scoped submission and storage (local-only unless a real server API is provided and verified).

The browser already implements a useful authoring experience; **the native Python implementation is future work**. See [human/agent continuity specification](../../docs/EXAMPLES/OPENFORM_FLOW_CONTINUITY.md), RFC-006/RFC-007 and the root Forever Works manifest for intended portability. Do not call demo-only file metadata a complete upload or local Publish an internet publishing service.

## Destination settings (implemented browser slice)

Click **Destinations** in the top toolbar. Select **Save on this device**, **Send to URL (POST)**, or **Save locally and send to URL**, then save. You can optionally send a **real synthetic test request** to an endpoint you control. Endpoint URLs must be HTTPS (or localhost HTTP for development), allow browser CORS, and accept a JSON POST with the standard response envelope. If endpoint delivery fails, a visible error is displayed; partial delivery can occur in dual mode. Do not put secret tokens in the exported form JSON or send sensitive personal information to a public test webhook. For secured webhooks, use a backend relay. Local Publish still does not host the form publicly. See [RFC-012 portable destinations](../../docs/PROPOSALS/PORTABLE_DESTINATIONS_CONTRACT_RFC_012.md).

The **View saved responses** sidebar control opens a local JSON viewer for submitted records. It shows this browser's local records only, not responses sent exclusively to an endpoint or records stored on another device.
