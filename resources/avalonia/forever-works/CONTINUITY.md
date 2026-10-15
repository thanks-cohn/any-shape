# Temporal portability and technology independence

## Goal
Software's functional purpose and important user experience should remain reconstructible across future languages, runtime environments, operating systems and graphical toolkits, including decades beyond the original implementation.

**Never promise bit-for-bit or perfect functionality fifty years hence.** Technology, law, APIs, device forms and requirements can change in unknowable ways. The defensible guarantee is a durable, independently interpretable specification and verification pathway, with explicit gaps.

## Durable inheritance requirements
1. Authoritative intent, capabilities, invariants, constraints, authority, data/state meaning and observable effects in plain, versioned UTF-8 neutral forms.
2. Structural UI semantics and experience obligations (navigation, focus, accessibility, responsive behavior, actions and layout relationships) separate from XAML widget mechanics.
3. Original evidence, fixtures, independently reproducible behavioral oracles and target-specific acceptance criteria; failure/unknown cases retained.
4. Platform variability and permission model, documented for each target; portable implementation ≠ portable purpose.
5. WHY selected, WHAT fulfilled, HOW TO REPLACE without it, PROOF against accepted obligations for every major runtime dependency or adapter.
6. Additive Period documents describing when assumptions held, what was superseded and where migration/deprecation occurred; retained original formats and normalization rules.
7. An agent-neutral entrypoint and small retrieval-oriented documents with stable references; no proprietary format or unavailable conversation needed to reconstruct the system.
8. Schema-version evolution with preserved old fixtures and independently validated migration, never silent reinterpretation of old assertions.

## Replacement thought experiment
Assume .NET, Avalonia, the current Android UI model and the original developers have disappeared. A new implementer should be able to derive a replacement framework, map old user intents onto novel surfaces, replay test oracles, explain allowed adaptations, and report unverified obligations. If source code is the only way to understand the intended product, this profile has failed its mission.

**Realism:** continuity is a maintained practice and testable aspiration, not magic guaranteed indefinitely by static documents. Schedule periodic cold-agent reconstruction audits and portability drills.
