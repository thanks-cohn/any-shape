# Generic architecture decisions

**D001: Prefer one UI toolkit across three targets for initial study.**
WHY: reduce UI framework diversity and duplicated translation. WHAT: Avalonia presentation with Windows, Linux and Android hosts. COST: runtime/SDK dependency and Android-specific integration work. HOW TO REPLACE: neutral requirements + platform ports + independent acceptance. PROOF: target-scoped runtime and effect tests, not a common compile result. STATUS: owner-directed research design, not verified outcome.

**D002: Share meaning before sharing code.**
WHY: guard against negative transfer and architectural erosion. WHAT: target-applicability metadata and typed host boundaries. HOW TO REPLACE: any architecture proving identical separation and cross-target invariants. PROOF: boundary linter + clean isolated build + per-OS tests. STATUS: specified, not enforced.

**D003: Keep candidate outputs outside productions.**
WHY: do not claim production readiness without evidence. WHAT: immutable run records and per-target promotion gates. HOW TO REPLACE: alternative equivalent audit-backed release workflow. PROOF: unverified candidates cannot be promoted. STATUS: documented.

**D004: Preserve alternative technologies as knowledge, not mandatory dependencies.**
WHY: future resilience; current choices are historically contingent. WHAT: separate research and comparative implementations. HOW TO REPLACE: new adapter with neutral contract and comparable proof. PROOF: a future independent implementation satisfying the original fixtures. STATUS: continuing principle.
