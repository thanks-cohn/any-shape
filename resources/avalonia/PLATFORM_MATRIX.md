# Generic applicability and anti-contamination matrix

This is a research template, not an assertion that any particular extension has these features.

| Concern | Windows | Linux | Android |
| --- | --- | --- | --- |
| File access | Host app storage / file picker | Host app storage / file picker | Android scoped storage/content URIs and lifecycle |
| User interaction | Keyboard/mouse/window | Keyboard/mouse/window | Touch/back/rotation/mobile accessibility |
| Background work | Desktop process and OS policies | Linux host policies | Android background scheduling limits |
| Permissions | Windows-specific constraints | Linux host permissions/sandbox | Android runtime permissions where applicable |
| Distribution | Installer/packaging | Linux packages/desktop integration | Signed APK/AAB and installation/update |
| Browser extension APIs | Analyze availability; often require alternative integration | Same | Mobile APIs differ; no automatic parity |

Record per-capability target applicability (applicable, not-applicable, unsupported, unknown), implementation scope (shared meaning vs proven shared code vs target host), privilege requirements, evidence and explicitly acceptable deviations. A desktop solution copied into Android without target proof is **negative transfer / cross-target assumption leakage**. Never permit Windows PASS to satisfy Linux/Android tests.

Research detail in forever-works/RESEARCH.md.
