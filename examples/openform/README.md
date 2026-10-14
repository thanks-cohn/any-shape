# OpenForm Studio — an Any-Shape browser reference

OpenForm is a **working, generic 20-question form editor** built with standard HTML, CSS and plain JavaScript. It is independently useful as an intake, survey, student project, research questionnaire or feedback form. It is also the first concrete source application for later **native Python interface transference**.

## Start and copy

At the repository root: `npm run dev`. Open `http://127.0.0.1:4173/examples/openform/` (or the local URL announced by the server). For reuse, copy the entire `examples/openform/` directory and serve it through any simple static web server. No web framework, external font, account, network service or Node runtime is needed in the **browser**. A web server is needed to fetch the default JSON config; simply double-clicking `index.html` with `file://` is not the supported launch route.

**Right-click** a question or section to edit the displayed text, type, choice list and required flag. Use the visible **Edit** buttons for keyboard/touch accessibility. Use **+ Add question** or **+ Add section / embed** to extend the form. Use **Edit form** for the title and introductory copy.

**Publish locally** freezes the editing affordances and makes the form ready for answers in this browser. **It does not upload, publicly host, or distribute the form.** Use **Export form JSON** to preserve the edited structure, or adapt `form.config.json` directly for a portable, reproducible published deployment. Locally edited drafts and locally saved responses belong to that browser profile, not to the source file.

## Twenty useful default questions

The reference provides five+ answer types and twenty editable questions across three meaningful groups:
1. Your name — short text
2. Email address — email
3. Organization or school — short text
4. Reason for contacting us — radio (single choice)
5. Project or request title — short text, required
6. Tell us about your idea or request — textarea, required
7. Topic or category — dropdown
8. Who is this for? — short text
9. Priority — radio buttons
10. Preferred timeline — dropdown
11. How should we respond? — dropdown
12. Related website — URL
13. Estimated scope — radio buttons
14. Estimated budget — number
15. Preferred start date — date
16. Areas of interest — checkboxes (multiple choice)
17. How ready is your idea? — range slider
18. Link to relevant material — URL
19. Additional details — textarea
20. May we contact you? — checkbox

Every question has a stable `id`, type, label, help text, required flag and choices where applicable. The editor can change the visible wording without changing that programmatic ID. JSON import accepts up to 500 questions distributed among up to 50 sections (100 per section) with size bounds. For the usability goal, **10–20 questions** is a sensible default rather than a technical maximum.

## Aesthetic and portable theme contract

```json
{
  "appearance": {
    "theme": "light",
    "font": "system",
    "density": "comfortable"
  }
}
```

- `light` is near-black text on white, with neutral borders and uncluttered headings.
- `dark` is near-white text on black/dark surfaces. `system` may follow OS preference.
- Native system font stack, no font fetch, white-space and readable body size.
- CSS Grid converts the main two-column document/sidebar arrangement into a single column at constrained widths. Fields remain intrinsically sized, headings and section groupings persist, and controls wrap without clipping.
- Theme is a *presentation* property, not submitted answer data or authorization.
- The desired native Python counterpart must translate the same theme/typography/hierarchy obligations into actual Qt palette and layout primitives, **not embed this page in a WebView**.
- Design review is still needed for actual platforms, 200%/400% zoom, assistive tech and narrow-height cases; do not infer certification from CSS.

## Liquid embed sections

**+ Add section / embed** can create a semantic section with responsive 16:9 external media. Embeds require explicitly allowed HTTPS provider URLs, currently `https://www.youtube-nocookie.com/embed/...` or `https://player.vimeo.com/video/...`, with a constrained iframe sandbox. A blank/unsupported URL shows an editable placeholder; no arbitrary HTML, JavaScript or unknown iframe source is injected from JSON. Embeds can contact their providers when viewed, unlike the local-only form itself. If fully offline operation or a local-native target cannot render an embed, preserve its section title, explanation and URL as an accessible alternative rather than silently dropping its meaning. Native GUI transference requires a platform-appropriate safe embedded-media adapter or explicit unsupported-state treatment.

## Data and transport

Default `submission.mode: "local"`: a successful answer is assembled as:

```json
{
  "schemaVersion": 1,
  "formId": "openform-reference",
  "recordId": "<generated unique ID>",
  "submittedAt": "<ISO timestamp>",
  "answers": {
    "title": "Example",
    "interests": ["Learning", "Research"],
    "contact": false
  }
}
```

The record is saved in browser `localStorage`. **There is no remote collection or multi-user backend.** Users can export response JSON/CSV and delete all local responses. Local storage is not suitable for confidential or regulated data; browsers may clear it, and storage availability depends on permissions/quota. Export regularly.

Optional `submission.mode: "http"` with an HTTPS endpoint sends the identical record as a JSON `POST`. This is a basic demonstration only: **there is no authentication, retry, schema negotiation, verified remote receiver, or shared server storage included**. Do not use it for sensitive submissions or claim full API parity. A production deployment needs an appropriate authorized backend, server-side validation, CSRF/CORS/security review, privacy/retention policy, error handling and versioned API contract.

## Native Python transference contract

Future agent reconstruction should read the neutral config and the canonical Forever Works reference records, then reproduce:
- Stable question/section IDs, types, defaults, options, validation and canonical response structure.
- Native inputs and actual Submit action, not only screenshot similarities.
- API method/path/schema and response handling for the *specific deployed backend*, after its contract is supplied and verified.
- White-on-black / black-on-white readable layouts, section hierarchy, responsive reflow and retained user orientation when the native window is resized.
- Safe handling of external embeds and unsupported features.
- Local response capture/export with equivalent meaning; browser-specific localStorage may map to explicitly documented native local storage instead.
- Platform-specific permissions and packaging, independently tested.

**This repo does not currently include a Python counterpart to OpenForm.** Do not declare transference complete until actual native widgets, HTTP/state fixtures and independent evaluation exist.

## Known boundaries

This is a standards-native, standalone browser implementation; cross-browser and screen-reader execution of this new reference has not yet been recorded. Form draft, theme and local response persistence are client-side. Imported JSON should be reviewed before use; the embed allowlist prevents arbitrary origins, not every risk of a third-party provider. There is no silent publishing to a website, permission bypass, or arbitrary remote form ingestion.

See [human-and-agent design intent](../../docs/EXAMPLES/OPENFORM_CONTINUITY.md), [Codex handoff 004](../../docs/CODEX/CODEX_HANDOFF_004_OPENFORM_REFERENCE_AND_PYTHON_TRANSFERENCE.md), and the canonical `forever/` implementation/capability/invariant records referenced in the main manifest.
