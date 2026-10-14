# OpenForm Studio — Human and Agent Continuity Guide

**Status:** Browser implementation source exists at `examples/openform/`; automated multi-browser/native Python parity remains unverified. This guide preserves intended meaning and design for cold developers and agents without making untested claims.
**Authority:** User explicitly requested a ready-to-use, broadly generic, professionally aesthetic 20-question browser application; editing by right-click plus accessible alternate controls; plus signs to extend; draft → publish; black-on-white / white-on-black configuration; adaptable liquid embed sections; future native Python module equivalence. The implementation mechanisms and exact contracts below are agent-proposed until approved.

## Plain-language description

OpenForm Studio is a neat, readable form builder that almost anyone can reuse for a questionnaire, request intake, class project, small business, event, research or feedback. It opens as a draft of **20 useful questions** grouped into clearly named sections. Authors can right-click a heading/question to change its words or type, or use a visible Edit button. They can add questions, sections and media; select light or dark appearance; and publish locally. Visitors fill the resulting form and receive a completion message. Submissions are stored on the device unless a separately configured HTTP endpoint is used.

The design is deliberately quiet: black writing on white surfaces by default, white on black as a first-class theme, system fonts, restrained neutral lines, clear headers and large, reachable controls. No remote fonts, design framework, login, paid runtime or JavaScript compilation.

**Portable purpose:** The meaning of the form and its field/action contracts should remain available to native Python and eventually Avalonia, C++ and C implementations. A future agent should not have to reproduce CSS classes or DOM geometry to preserve it.

## Information model

- `schemaVersion: 1` identifies this example config version; it is **not** the Forever Works schema version.
- Form ID identifies the form as a logical source; title and description are editable display text.
- Appearance specifies `light | dark | system`, `font: system`, `density: comfortable`. Theme does not change answer data.
- Ordered sections have immutable-for-editing `id`, `title`, `description`, `questions`; sections optionally have `kind: embed` and a vetted media URL.
- Each question has stable `id`, `label`, `type`, `help`, `required`, and choice options for relevant types. Labels are intentionally editable **without** changing IDs.
- Supported types: `text`, `textarea`, `email`, `url`, `number`, `date`, `select`, `radio`, `checkboxes`, `checkbox`, `range`.
- Answer record: `schemaVersion`, `formId`, `recordId`, ISO timestamp and `answers` keyed by stable question IDs.
- Submission modes: `local` (browser-only storage and export) or `http` (JSON POST to an explicitly configured HTTPS endpoint); a production backend is not included.

## User-facing flows

**Edit:** Start in draft; use right-click on editable content or an Edit button; edit field label/type/options/help or section description; add via + controls; import or export form JSON. The author should understand that changing a question's type or deleting a question can change the response model. Exported response records retain their own original answer IDs and aren't rewritten.

**Publish:** Switch from editor to locally published form, hide editing controls, keep submission and form content visible. This does not create a public website or distribute responses. Undo publishing by returning to draft. Configured content persists locally in the browser until cleared.

**Respond:** Fill fields using native keyboard/pointer/touch controls; validate required and typed values; focus on invalid input; submit and get confirmation. Local responses can be exported as JSON/CSV or deleted. Remote HTTP mode is an optional example transport and must be separately configured and secured.

**Embed:** A flexible, content-first media section embeds only allowed HTTPS provider player URLs inside a sandboxed iframe at an adaptive 16:9 ratio. A future native renderer may render a suitable media adapter or provide accessible linked fallback with explicit unsupported evidence. A liquid section is **not** permission to execute arbitrary embedded HTML/JS.

## Orientation, structure and aesthetic obligations

| Stable obligation | Current web approach | Native Python target approach |
|---|---|---|
| Find the form | Prominent `h1` with concise subtitle | Native window heading and accessible name |
| Know your location | Persistent sections/`h2` landmarks and field order | Native grouped headings, tab order, semantics |
| Read comfortably | At least 16px body, generous spacing, system fonts | Native readable font metrics/scaling |
| Adapt gracefully | CSS Grid two-column form + sidebar becomes a single stack; fields intrinsic and full width | Native Qt layout managers/size policies with vertical reflow |
| Keep primary actions | Submit/reset controls wrap without horizontal clipping | Native reachable actions with consistent semantics |
| Preserve design identity | Neutral palette, thin borders, limited ornament, simple font hierarchy | Equivalent palette/typography/spacing intent, respecting native conventions |
| Choose theme | JSON `appearance.theme` with light/dark/system | Same JSON intent mapped to Qt palette; no CSS dependency |
| Recover rich media | Responsive bounded embed with title or labeled fallback | Native content adapter or explicit accessible link and unsupported state |
| Continue task | Editing/publishing separate from answers, no unexpected focus loss from window resize | Draft/selection/focus continuity under Qt resize |
| Use any input mode | Semantic labels, radio/checkbox/select, keyboard activation, visible Edit buttons | Native labeled inputs and keyboard/focus behavior |

No fixed pixel coordinates are canonical. The point is *continuity of orientation*, not screenshot parity. Test wide, intermediate, narrow, increased text, long strings, keyboard and assistive technologies; preserving headings does not excuse clipped inaccessible actions.

## Technical boundaries and dependencies

The first implementation is plain HTML/CSS/ECMAScript; no imported runtime library, external font or app-specific server is required. The repo's restricted static dev server serves `examples/openform/` and local JSON, but a copied folder may use any static server. Browser storage is local and not for confidential/regulated data.

The Python candidate is **not implemented**. For reliable adaptation it should use real PySide6/Qt widgets, read a compatible contract, preserve logical operations/field data and support native layouts; merely wrapping this webpage in a WebView is a different compatibility mode. It is important to distinguish same endpoint **contract** from the present default local-only mode (which calls no endpoint). Endpoint-equivalence can only be tested when both implementations use a genuinely configured and secured backend with independent fixtures.

## Agent reconstruction recipe

1. Read the user-facing flow above, `examples/openform/form.config.json`, and the canonical `forever/` records for OpenForm. Use source as observational evidence for this phase.
2. Freeze the approved question IDs, types, answer schema, validation, API transport scope, light/dark design intent and orientational constraints. Mark inferred details unreviewed.
3. Write an implementation-neutral fixture set for 10, 15 and 20 fields; invalid/valid inputs; choice cardinality; dark/light; narrow/wide; media fallback; and local/HTTP modes.
4. Implement independently with real native Python inputs and layout managers. Map visible action/keyboard activation to the same canonical operation.
5. Evaluate both versions with neutral HTTP/state/input fixtures and separate native accessibility, resize, design review, distribution and resource tests. Do not claim PASS on targets without execution.
6. Export stable config, evidence, source/dependency map and human recovery instructions. Report PASS, FAIL, UNKNOWN separately for semantics, layout, aesthetics, drop-in API, security and packaging.

## Canonical model crosswalk

- `capability.openform-reference`: configuration-driven accessible form builder, submission and export.
- `invariant.openform-orientation`: coherent hierarchy, readable black/white themes, preserved form behavior under geometry changes.
- `implementation.openform-browser`: concrete HTML/CSS/JavaScript module, no Python equivalence asserted.

These are genuine Forever Works 0.1 record kinds, linked from `forever/manifest.json`; they are not additional schema kinds. Review status stays `unreviewed` with agent-proposed technical mapping. No independent test/evidence record is claimed until tests are executed.

## Known unfinished work

Native Python parity, canonical endpoint-backed server/evaluator, browser matrix/visual audit, published public hosting, durable multi-user backend, portable CLI, compiled C/C++ equivalents and native app packaging are **future** work. The editor's current interactions and local persistence are source-implemented; do not describe them as externally tested across platforms without evidence.
