# Period P001 — Avalonia resource-pack bootstrap

**Historical status:** preliminary architecture/documentation; no verified Avalonia multi-platform implementation. **Purpose:** establish a durable, agent-neutral knowledge base before a specific extension enters the workspace.

Decisions: all extension-specific information remains under its extension contract/evidence; Avalonia is replaceable; shared semantics do not authorize reuse of platform implementation; each released OS product requires its own empirical proof. The nested Forever Works profile remains generic and supplements the canonical root standard.

Next implementation work (agent-neutral): implement platform applicability schema, static dependency boundary checks, isolated candidate/release workspace setup, minimal generic Avalonia scaffold and independent Windows/Linux/Android build/runtime/effect checks. Update this period additively as evidence arrives.

## Addendum: reproducible dependency provisioning

Pinned candidate Avalonia 12.1.4 and committed cross-platform bootstrap, preflight, seed prefetch and SHA-256 archive scripts in the parent resources directory. Code present, NOT EXECUTED; binary cache not uploaded and target builds not yet run. Resources remain replaceable and independent of any specific extension.
