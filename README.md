# Any-Shape

**A framework-independent, purpose-preserving adaptive interface system.**

> The form may change. The identity must remain.

## Mission
Any-Shape makes web interfaces remain sensible, coherent, accessible, and aesthetically recognizable across different viewport sizes, aspect ratios, containers, browser zoom settings, content lengths, languages, input modes, and device capabilities.

It is **not** a collection of device-specific CSS breakpoints or a replacement for the browser layout engine. It is a standards-first system of design contracts, fluid primitives, composition patterns, diagnostics, and verifiable acceptance tests. The same underlying component must be free to reorganize while preserving its meaning and visual identity.

**First intended adopter:** Pop-Quiz.ai. **Ownership:** standalone general-purpose library, never coupled to Pop-Quiz.ai. Other prospective adopters may use plain HTML/CSS/JS, TypeScript, or framework wrappers.

## Start here — reading order for humans and agents
1. [PURPOSE](docs/FOUNDATION/PURPOSE.md): why the project must exist, permanent promises, boundaries.
2. [CONTRACTS](docs/FOUNDATION/CONTRACTS.md): observable behavior and acceptance criteria.
3. [ARCHITECTURE](docs/ARCHITECTURE.md): replaceable technical choices, modules, stable seams.
4. [RECOVERY](docs/RECOVERY.md): rebuilding from purpose if dependencies or code disappear.
5. [PUBLIC API](docs/API/README.md): intended minimal adopter surface (proposal until implemented).
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
**Specification and implementation handoff established.** Working source, published package and passing validation are NOT asserted here. See the CodeX handoff for actual implementation milestones and evidence requirements. Do not report hypothetical tests as completed.

## Agent entrypoint
Read `AGENTS.md` before editing. Implement against behavior contracts; keep docs synchronized with observed reality.
