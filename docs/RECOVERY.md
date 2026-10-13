# Forever Works-style cold-inheritance and total rebuild protocol

## Intended end state
A future agent, without access to the original authors or original dependencies, can recreate a viable Any-Shape compatible implementation by reading its mission and checking observable behavior.

## Sources of truth, in order
1. PURPOSE.md (why and inviolate outcomes)
2. CONTRACTS.md (observable requirements)
3. Explicit user-approved design decisions in docs/DECISIONS/
4. Public API behavior / examples and golden fixtures
5. Actual tests and verified evidence reports
6. Implementation code and dependency specifics (replaceable)

If a source contradicts another, do not silently pick a convenient answer: document the conflict; favor intent and user-approved contracts; request a decision only when genuinely necessary.

## Rebuild procedure
1. Inventory available artifacts (README, documents, examples, CSS, JS, lockfile, tests, screenshots). Record what's missing.
2. Translate AS-001 … AS-016 into independent, technology-neutral checks and fixtures.
3. Reimplement the minimal standards-native HTML/CSS that meets the first seven contracts.
4. Restore components, type, tokens, fallback and localization expectations.
5. Restore optional diagnostics to the versioned output schema. Verify default redaction.
6. Restore browser matrix and accessibility checks using a replacement runner if necessary.
7. Compare side by side with golden examples; human review required to approve aesthetic deviations.
8. Create a replacement report with behavioral coverage, regressions, uncertainty, unresolved gaps and migrations.
9. Update dependency register and ADRs; leave concise inheritance notes for the next agent.

## Replacement criteria
Replacement is successful when users can use the components with equivalent or improved accessibility, meaning and layout resilience, while documented API changes are migratable. Exact source code, framework, screenshot rasterization or dependency identity are NOT requirements. A rebuilt system may improve composition with a documented visual review.

## Dependency register (initialize on implementation)
For every dependency capture:
- Name / version / license / role / runtime vs dev-only.
- Which requirement it satisfies and why browser-native alternatives were insufficient.
- Direct imports and APIs relied upon.
- Fallback, viable replacements, migration recipe and lockfile location.
- Test or fixture proving independence.
Never store secrets.

## Failure simulations
- Disable JavaScript and verify semantic examples.
- Remove diagnostic module and rerun core examples.
- Simulate absent container-query feature with fallback verification.
- Replace a dev test runner or mock a missing package in a scratch branch; verify equivalent contract assertion.
- Restore fresh checkout and repeat documented commands.

## Maintenance ritual
Every meaningful change updates its invariant map, contract/tests, dependency record (if relevant), API notes and completed-vs-unverified status. A predecessor's confidence is not evidence; a successor must run checks.
