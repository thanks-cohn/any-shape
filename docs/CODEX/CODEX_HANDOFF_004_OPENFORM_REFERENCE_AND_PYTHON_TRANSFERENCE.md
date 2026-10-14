# Codex Handoff 004 — OpenForm: reusable 10–20 question form and native Python proof

**Status:** Owner-requested implementation brief; implementation not yet claimed.
**Date:** 2026-10-13
**Repo:** thanks-cohn/any-shape, main
**Read:** AGENTS.md; docs/FOUNDATION/CONTINUITY_OF_ORIENTATION.md; docs/IDENTITY/; docs/PROPOSALS/INTERFACE_PORTABILITY_RFC_005.md; ADAPTIVE_TRANSFERENCE_RFC_006.md; LANGUAGE_PORTABILITY_STRATEGY_RFC_007.md; FOUNDATIONAL_CROSS_PLATFORM_SHOWCASES_RFC_008.md; docs/ROADMAP/MILESTONES.md. Preserve browser v0.1.

## Product request

Build a useful, standalone, copyable, professional HTML/CSS/JavaScript reference application: a generic **Project / Request / Feedback Intake** form with 15 default questions, easily customized to 10–20 questions or beyond by editing **one simple JSON configuration**. It must be a genuine working form: validation, clear submission results, useful local response management/export, and optional HTTP backend integration. Then use Any-Shape and its neutral continuity contracts to produce a **native Python** GUI counterpart, independently demonstrating the same fields, API calls, validations, state and adaptive presentation principles.

The reference is for students, teachers, research projects, small organizations, community groups, events and businesses. Do not require personal accounts, cloud services, paid dependencies or build tooling to run the browser version. Avoid collecting sensitive IDs, health or payment information by default.

## Essential visual identity: aesthetic, minimal and generic

The owner's explicit aesthetic preference is **well-structured black text on white background, with an equally polished white-text-on-black mode**, selectable programmatically in the form's JSON. Aim for quiet visual confidence: generous, consistent whitespace; crisp typography; logical groups; thin neutral rules; restrained border radii; clear affordances; sharp readable contrast. Do not introduce whimsical decoration, bright gradients, heavy drop shadows, intrusive imagery, remote fonts or organization-specific branding into the default.

Use a standard, dependable **system UI font stack** (e.g. system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif), with sensible sizes, readable line height, clear heading scale, predictable field spacing and strong native keyboard focus. No paid, externally hosted or redistributed custom fonts. Define CSS custom properties/design tokens for background, foreground, muted text, border, input, focus, selected, error, success, spacing and typography. Color contrast must be tested in both themes.

### Required JSON-theme control

The user should change a single value without touching CSS or JS:

```json
{
  "appearance": {
    "theme": "light",
    "font": "system",
    "density": "comfortable"
  }
}
```

- `theme: "light"` = black/dark text on white/light surfaces (default).
- `theme: "dark"` = white/light text on black/dark surfaces.
- Optionally `theme: "system"` follows OS preference, while respecting explicit light/dark selection.
- `font: "system"` is a stable default. If configurable type scales/presets are added, specify them in JSON and ensure readability and independence from proprietary fonts.
- `density` may be comfortable/compact, **without making text illegibly small**.
- Support theme transitions without losing draft values, focus, validation status or section orientation.
- **Same JSON intent must guide Python native styling** via palette/style mapping; the Python version must not silently impose unrelated colors, fonts or hierarchy.
- Validate invalid theme values and fall back predictably with readable diagnostics; do not permit unsanitized CSS injection from JSON.
- Theme choice is visual appearance, not domain behavior; submissions to the same API must not change when dark mode is selected.

If using W3C Design Tokens Community Group-compatible portable representations, keep the user-facing configuration small and separately document any translation from editable form JSON to canonical tokens. The canonical Forever Works record model is distinct from presentation config.

## 15 ready-to-use default questions

Group meaningfully with persistent section headings, and let the author edit labels, requirements, help text and choice values in JSON:
1. Name (short text; optional unless essential to chosen workflow)
2. Email (email; optional unless follow-up requested)
3. Group or organization (short text; optional)
4. Reason for submission (single choice: Project, Feedback, Question, Event, Other)
5. Subject/title (short text; required)
6. Your message or request (multiline; required)
7. Category or topic (editable single choice)
8. Intended audience (short text or single choice)
9. Priority (Low, Normal, High; avoid implied emergency handling)
10. Desired timeline (Flexible, This month, Later)
11. Preferred follow-up (Email, No follow-up)
12. Related URL (optional URL)
13. Scope (Small, Medium, Large, Unsure)
14. Additional details (optional multiline)
15. May we contact you? (explicit yes/no, default no)

Support at least 10, 15 and 20-question fixture configurations and common types: text, email, URL, textarea, radio/single select, checkbox/multi-select, number/date where justified. Stable IDs remain unchanged when labels change. Avoid bloated form-wizard behavior; users should be able to navigate a single understandable form with groups, optional progress and review-before-submit.

## Functional usefulness and honest collection

- Editable `form.config.json`: title, description, optional branding text, sections, ordered questions, options, validation, appearance, response mode, and optional API endpoint. README says **copy folder, edit JSON, serve**.
- Native semantic HTML with accessible labels/legends, meaningful keyboard/Enter behavior, focus, validation messages, completion confirmation, optional consent, and predictable state under resize.
- Default **local-only** mode: users can submit into local device/browser storage, review and export records as JSON/CSV, delete local records and receive clear privacy/retention messaging. Explicitly say local responses do not arrive at another person's computer: collecting from remote participants requires a configured backend/service.
- Optional `POST` API submission with versioned request/response schema, well-defined status/error/permission/retry behavior; sample localhost receiver for independent equivalence checks. No secret tokens in public JSON or browser code.
- Define stable question IDs and output keys, value types, normalizations and error mapping. Separate draft, validated response, submitted record and persisted storage.
- Safe output escaping, input bounds, no injected HTML, no silent external networking, no default analytics, reasonable file-size and data-retention safeguards.

## Continuity of Orientation and adaptation

The form should be professional as a wide page, narrow browser window, local panel or enlarged-text presentation. Preserve primary heading, section identities and order, focus, working draft, important action visibility and recoverable secondary descriptions. Use established semantic disclosure patterns when space requires; never make essential content hover-only or shrink body text below readable levels. Human-reviewed appearance is needed alongside browser geometry and WCAG automated tests.

## Native Python transference proof

**Only after the browser reference is working**, independently author or agent-reconstruct a native PySide6/Qt form using the accepted neutral contracts and configuration. Do not simply embed web content.

- Read the same portable question IDs, labels, types, section order, constraints, appearance theme, expected output envelope and endpoint specification; pass the 10/15/20 field fixtures.
- Native field widgets, native validation feedback, submit/keyboard activation, state, JSON/CSV export, local mode and compatible API POST where supported.
- Python native layout adapts with actual Qt geometry/layout facilities, not CSS imitation. Preserve text readability, orientation, active section, draft and focus during resize.
- Light uses dark text on white/light surfaces; dark uses white text on black/dark surfaces using the same JSON setting. Show side-by-side browser/Python screenshots in both themes, with actual native execution evidence.
- The two visual implementations need equivalent design intent, not impossible pixel equality; platform-specific visual differences are disclosed.
- Keep Qt and Python dependency costs **outside the mandatory browser runtime**. Describe packaging as a self-contained desktop application where feasible, with honest platform installation/security requirements.

## Independent verification and demonstration

Create a single versioned neutral contract and independent fixture suite:
- Web form with 10, 15 and 20 fields; edits only to JSON alter labels/options/theme without modifying JS.
- Both light and dark themes, keyboard focus, contrast, readable type, desktop and constrained widths.
- Actual browser form input → Submit → canonical operation → optional HTTP POST → response → user feedback. Independently compare with native Python input → Submit → same endpoint schema/response semantics, including invalid values, duplicates/conflicts, denied operations if supported, and transport errors.
- JSON/CSV round-trip escaping, deterministic field IDs and lossless expected values; no loss of working draft under resize/theme switch.
- Browser engines Chromium/Firefox/WebKit where available, plus genuine native Qt GUI interaction checks on an available desktop. Where environment lacks display/toolkit, mark native verification **UNKNOWN**, not PASS.
- A clear visual showcase: launch web app, launch Python app, switch black-on-white / white-on-black via JSON, resize, submit matching data, display compared request/response traces, and show a simple PASS/FAIL/UNKNOWN conformance report explaining what Any-Shape preserved.
- Preserve provenance and test evidence under docs/CODEX/evidence/004/ or similarly named versioned evidence directory. Do not fabricate test execution or owner-approved model semantics.

## Deliverables and work order

1. A working, elegant, standalone browser reference in `examples/openform/` (or other clear path), with documented easy copy/configuration, 15-question default, 10/20 example configs and two complete visual themes.
2. Actual local responses and export + optional example endpoint integration.
3. Neutral form/domain/API/presentation contract with independent test fixtures and traceability to Forever Works (validate real canonical schemas; do not invent a competing record kind).
4. Native Python counterpart that reads the same contracts, with tested API and visual-functional adaptation if environment supports it.
5. A polished side-by-side demonstration, exact run/build steps, independent results and honest gaps.
6. A completed Codex implementation report and next-agent inheritance instructions committed to `main`.

Do not merely scaffold. Protect existing v0.1 API and browser tests. Favor built-in browser standards and proven native toolkit capabilities rather than recreating whole UI frameworks. If scope is large, deliver a robust functioning vertical slice before optional enhancements; do not claim unfinished stages are ready.
