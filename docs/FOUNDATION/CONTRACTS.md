# Behavioral contracts and executable acceptance intent

Each contract includes stimulus → required observation → verification. Codex must translate these to runnable tests and record what actually passes.

| ID | Stimulus | Required behavior | Proof |
|---|---|---|---|
| AS-001 | Container width changes with viewport fixed | Container-aware card reorganizes when its **container** crosses content threshold | Embed same card in narrow/wide panels simultaneously; inspect computed layout |
| AS-002 | 320px wide viewport | Core showcase has no unintended document-level horizontal overflow; reading and controls accessible | Playwright DOM geometry and screenshots |
| AS-003 | 1366×768 and 1920×1080 | Hierarchy, rhythm and recognizable component styling preserved | Snapshot + reviewed visual comparison |
| AS-004 | 200% browser zoom or equivalent CSS viewport squeeze | Information reflows; essential controls remain accessible | Browser automated zoom/reflow check |
| AS-005 | Text scaled/long translated phrases | Labels wrap or accommodate; primary content is not clipped | Stress-fixture and geometry assertions |
| AS-006 | Keyboard only | All interactive sample components operable with visible focus; DOM order sensible | Tab/Enter/Escape test |
| AS-007 | No JavaScript | CSS-only example remains usable and readable | Disable JS and validate |
| AS-008 | Reduced motion | No required motion for meaning; animations respect user preference | emulateMedia test |
| AS-009 | Right-to-left locale | Logical padding, margins and layout do not invert incorrectly | RTL fixture |
| AS-010 | Narrow or short landscape viewport | Controls reachable via flow/scroll, no overlays trapping interaction | 667×375 fixture |
| AS-011 | Missing container-query support | Baseline layout remains usable | Feature/fallback test |
| AS-012 | Element unexpectedly exceeds its container | Diagnostics identify selector/role, dimensions, responsible ancestor chain, CSS clues without exposing text | Fixture assertion |
| AS-013 | Layout mode changes | Debug inspector reports container geometry, applicable rules/mode and reason, with uncertainty stated | Diagnostic contract test |
| AS-014 | Debugging default mode | No page text, form values, tokens or URLs transmitted or logged | Privacy test |
| AS-015 | Remove optional JS diagnostics | Main CSS layout still renders and behaves | Integration test |
| AS-016 | Project recovered without a previous dependency | New implementation fulfills contracts and records differences | Replacement exercise + report |

## Initial matrix
Sample at minimum: 320×640, 360×780, 667×375, 768×1024, 1024×768, 1366×768, 1920×1080, 3440×1440. Also probe 280, 375, 480, 600, 900, 1200 widths, intermediary widths and short 280–400px heights. Test 200% and 400% reflow where applicable, content expansion, RTL, reduced motion, no-JS and keyboard. Samples never define supported shapes exhaustively.

## Measuring overflow
Flag document-level horizontal scroll caused by library examples unless intentionally documented. Test each interactive region's visibility/reachability and overflow independently. Intentional scrollable code blocks and data grids are acceptable if signposted and navigable. Bounding boxes alone may falsely flag transforms and shadows: use visibility/scrollWidth/geometry context.

## Visual quality
No universal numeric beauty grade. Maintain manually approved golden examples and structural design reviews: typography hierarchy, consistency, whitespace balance, alignment, reasonable line length, group proximity and action prominence. Record baseline changes with rationale. Snapshot diffs do not alone prove regressions.

## Completion gates
- Standards-first usable demo shipped and documented.
- At least one real container-query responsive component and one full-page composition.
- CSS/HTML primitives reusable independently of demo.
- Diagnostics demonstrably reproduce and explain at least 3 deliberately broken fixtures.
- Tests running in CI with green or clearly identified failures; do not suppress failing checks.
- npm/package exports and consumer examples validated, if using package distribution.
- Recovery exercise proves replacing at least one optional tool without changing consumer behavior.
- API, dependency register, and evidence report updated.
