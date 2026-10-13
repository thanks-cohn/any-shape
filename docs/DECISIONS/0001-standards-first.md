# ADR-0001: Native web layout as source of execution

Status: Accepted foundational proposal (2026-10-13).

Decision: Browser-native CSS/semantic HTML is the primary layout implementation; optional JavaScript measures and explains, rather than continuously positioning everything.

Rationale: More portable, robust, accessible and recoverable than a custom runtime layout solver. Container queries and fluid sizing better track component context than a short hard-coded device breakpoint table.

Consequences: Some feature support needs fallbacks; design intent is not automatically optimized by CSS, so fixtures and human reviews are required. Future explicit evidence may justify exceptions, which must be documented.
