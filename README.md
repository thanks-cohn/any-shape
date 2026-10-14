# Any-Shape

**Preserve human and agent comprehension and operation across changing forms, media and resources.**

> The form may change. The identity must remain.

## Mission
Any-Shape enables information and operations to remain comprehensible, accessible, attractive where practical, and functionally available to humans and programmatic agents as medium, geometry, constraints, input methods and computational resources change. The form may change; meaning, essential functions and trustworthiness must remain.

Browser resizing/overflow is an implemented example, not the mission or permanent technological boundary. Logical fields, records, objects and authorized operations may have browser, desktop, text, agent or editor realizations; each must preserve meaning and declare unsupported scope. Human and programmatic actions must obey the same validation, authority and state transitions. The current browser library remains protected; broader capabilities are proposals or scoped reconstruction proofs, not production support claims.

**First intended adopter:** Pop-Quiz.ai. **Ownership:** standalone general-purpose library, never coupled to Pop-Quiz.ai. Other prospective adopters may use plain HTML/CSS/JS, TypeScript, or framework wrappers.

## Start here — reading order for humans and agents

Begin with [project essence](docs/IDENTITY/PROJECT_ESSENCE.md), [ontology](docs/IDENTITY/ONTOLOGY_AND_SEMANTICS.md), [human and agent faces](docs/IDENTITY/HUMAN_AND_AGENT_FACES.md), [transformation](docs/IDENTITY/TRANSFORMATION_AND_DEGRADATION.md), and [acceptance](docs/RECONSTRUCTION/CONFORMANCE_AND_ACCEPTANCE.md). The [next-agent handoff](docs/RECONSTRUCTION/NEXT_AGENT_HANDOFF.md) gives exact status and commands. Then inspect the [canonical model](forever/manifest.json), [capability map](docs/IDENTITY/CAPABILITY_AND_INVARIANT_MAP.md), [mechanisms](docs/IDENTITY/MECHANISMS_VS_MEANING.md) and [cold reconstruction handbook](docs/RECONSTRUCTION/COLD_START_RECONSTRUCTION.md).

For the protected browser specialization, retain this reading path:
1. [PURPOSE](docs/FOUNDATION/PURPOSE.md): why the project must exist, permanent promises, boundaries.
2. [CONTRACTS](docs/FOUNDATION/CONTRACTS.md): observable behavior and acceptance criteria.
3. [ARCHITECTURE](docs/ARCHITECTURE.md): replaceable technical choices, modules, stable seams.
4. [RECOVERY](docs/RECOVERY.md): rebuilding from purpose if dependencies or code disappear.
5. [PUBLIC API](docs/API/CURRENT_API_V0_1.md): implemented 0.1 classes, tokens, diagnostics and limitations.
6. [CODEX HANDOFF](docs/CODEX/CODEX_HANDOFF_001.md): implementation request, priorities, proof requirements.

## Foundational axioms
1. Identity survives transformation.
2. Content determines composition.
3. Relationships outrank coordinates.
4. Legibility and operability are non-negotiable.
5. Adaptation must be verifiable.
6. The browser's native layout is the primary engine; JavaScript is optional progressive enhancement.
7. Fail gracefully, never conceal essential content to fit an aesthetic.
8. Purpose and observable behavior outrank frameworks, dependencies, and specific source code.

## Scope
- Design tokens, fluid geometry and type, container-aware primitives, compositional components.
- Semantic HTML, keyboard and touch access, responsive images, localization robustness.
- Debug and agent-observable layout diagnostics with redaction-safe outputs.
- Automated matrix testing including screenshots, structural assertions, zoom/text stress, and accessibility.
- A live laboratory for demonstrating good and broken layouts.
- Recoverable documentation: invariants, usage, decision logs, replaceability and dependency inventory.

## Non-goals
- Claiming mathematical perfection at every width or arbitrary content size.
- Automatically judging beauty with a single score.
- Rebuilding React, CSS, DOM, or the browser's rendering pipeline.
- Requiring a hosted service, runtime analytics, accounts, or proprietary APIs.
- Omitting necessary controls or hiding real information just to avoid scrolling.

## Status

**Universal identity and preservation model:** owner-stated mission, canonical Forever Works records and extensive cold reconstruction documentation. [Handoff 002 evidence](docs/CODEX/IMPLEMENTATION_REPORT_002.md) records actual upstream validation/audit, a separate Python proof and independent evaluation. The proof is not a production universal engine; technical proposals remain unreviewed and strict blind isolation/manual aesthetics remain unknown.
**Core 0.1 implemented:** portable CSS primitives, container-aware cards, semantic navigation and form examples, and opt-in privacy-safe diagnostics. No runtime dependencies or build step. Package publication is not asserted. See [implementation evidence](docs/CODEX/IMPLEMENTATION_REPORT_001.md) for exact tests, engines, failed attempts and remaining manual checks.

## Develop and adopt

Model validation: `npm run check:forever`. Independent proof evaluation: `node scripts/evaluate-reconstruction.mjs`. The unmodified upstream standard/schemas/CLI are pinned and licensed in `vendor/forever-works/`; [dependency atlas](docs/RECONSTRUCTION/DEPENDENCY_AND_FAILURE_ATLAS.md) explains replacement proof. The full preservation corpus is in the source repository; the npm package remains the browser slice, not an assertion of universal agent support.

Requires Node >=22 (CI uses 24):

```sh
npm ci
npx playwright install --with-deps chromium firefox webkit
npm run check
npm run test:recovery
npm run test:package
npm run dev
```

The static laboratory is served on port 4173 at `/examples/`; `/examples/broken.html` contains intentional failures. The server binds to loopback and serves only consumer assets. Without any Node tooling, serve `examples/` and `src/` together with any static server. No account, remote assets or diagnostic module is required by the CSS layout.

On the Debian amd64 cloud host without root, use `npm run prepare:cloud` instead of `install --with-deps`, then use the browser-cache variables documented in [DEPENDENCIES](docs/DEPENDENCIES.md). Firefox needs an execution sandbox exception on this host; this is a host restriction, not an application failure.

Copy `src/any-shape.css` into an HTML project or import `@any-shape/core/css` from a locally installed tarball. Optional ESM diagnostics are exported from `@any-shape/core`; type declarations and a closed JSON Schema ship with the package. `npm run test:package` builds a tarball and tests it in an external consumer, without publishing it.

Tests produce JSON, screenshots and failure traces under ignored `artifacts/` and `test-results/`. Screenshots are review candidates; do not blindly approve them as goldens. Read the [dependency and recovery register](docs/DEPENDENCIES.md) for browser caches, system-library requirements and runner replacement. New agents should begin with [NEXT_AGENT](docs/CODEX/NEXT_AGENT.md), then the foundational reading order above.

## Agent entrypoint
Read `AGENTS.md` before editing. Implement against behavior contracts; keep docs synchronized with observed reality.
