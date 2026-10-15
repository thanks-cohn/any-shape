# Avalonia reusable resource pack

Agent-agnostic and extension-agnostic. Provides practical setup and architecture rules plus a nested **generic** Forever Works inheritance dossier. Does not vendor toolchain binaries and does not yet contain tested build outputs.

Start [AGENT.md](AGENT.md), then [forever-works/README.md](forever-works/README.md). Practical documents: [TOOLCHAIN.md](TOOLCHAIN.md), [ARCHITECTURE.md](ARCHITECTURE.md), [PLATFORM_MATRIX.md](PLATFORM_MATRIX.md), [ACCEPTANCE.md](ACCEPTANCE.md), [SOURCES.md](SOURCES.md), [resources.json](resources.json).

Inputs: extensions/<extension-id>/source/. Candidate runs: runs/<extension-id>/<run-id>/candidates/<target>/. Promoted independently tested outputs: productions/<extension-id>/windows/, linux/, android/.

Never put extension-specific facts here; those belong with the extension’s own evidence and accepted contract.
