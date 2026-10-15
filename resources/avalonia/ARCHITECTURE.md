# Three-platform architecture

Accepted neutral semantics -> Domain (no UI/OS APIs) -> Application (interface ports) -> Shared Avalonia presentation (only tested portable logic) -> Windows host / Linux host / Android host.

A single coordinated generator run is allowed; three target obligations remain independent.

Use current official Avalonia templates as inspected scaffolds, never as canonical meaning. Desktop platforms may share code or a project, yet still need separate packaging, OS integration and tests. Android requires independent mobile lifecycle, permissions, storage, touch/back navigation, display density, screen reader and background behavior.

All platform-specific services implement declared contracts. Prohibit target OS imports in shared Domain and Application via architecture linting / dependency graph tests. Never infer a component is usable on Android because Windows compilation succeeded.

Product folders productions/<extension-id>/<target>/ must each build from clean checkout without sibling product folders. Shared sources should be pinned and copied/materialized into each product or provided as independently resolvable versioned packages. Record source and contract hashes plus evidence IDs in each product manifest.

See forever-works/CONTINUITY.md for what survives if Avalonia or .NET disappears.
