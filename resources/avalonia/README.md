# Avalonia reusable resource pack

Agent-agnostic and extension-agnostic. Provides practical setup and architecture rules plus a nested **generic** Forever Works inheritance dossier. Does not vendor toolchain binaries and does not yet contain tested build outputs.

Start [AGENT.md](AGENT.md), then [forever-works/README.md](forever-works/README.md). Practical documents: [TOOLCHAIN.md](TOOLCHAIN.md), [ARCHITECTURE.md](ARCHITECTURE.md), [PLATFORM_MATRIX.md](PLATFORM_MATRIX.md), [ACCEPTANCE.md](ACCEPTANCE.md), [SOURCES.md](SOURCES.md), [resources.json](resources.json).

Inputs: extensions/<extension-id>/source/. Candidate runs: runs/<extension-id>/<run-id>/candidates/<target>/. Promoted independently tested outputs: productions/<extension-id>/windows/, linux/, android/.

Never put extension-specific facts here; those belong with the extension’s own evidence and accepted contract.

## Reusable dependency preparation

Consult [CACHE_STRATEGY.md](CACHE_STRATEGY.md), [toolchains.json](toolchains.json), and `bootstrap/` before a build. Run `node bootstrap/preflight.mjs` first; warm the cache once with `bootstrap/prefetch.sh`, export it with `bootstrap/cache-export.sh`, and store the verified artifact outside the git tree. This is an executable preparation layer, **not yet an uploaded offline binary cache or verified three-target toolchain**.

## Tested local setup (2026-10-15)

Linux x64 SDK 10.0.402 was downloaded from Microsoft's release metadata and its SHA-512 verified. Generated Avalonia 12.1.4 hosts compiled for linux-x64 and win-x64 on Linux with zero warnings/errors; no Windows/Linux UI/runtime or extension parity is implied. Android compilation reached NETSDK1147 (missing Android workload); device/install/signing tests remain NOT_RUN.

```sh
# Explicit writable directories, no HOME changes or implicit system installation.
export AVALONIA_CACHE_DIR=/workspace/.toolchains
export DOTNET_INSTALL_DIR="$AVALONIA_CACHE_DIR/dotnet"
python3 resources/avalonia/bootstrap/install-dotnet.py --install-dir "$DOTNET_INSTALL_DIR"
source resources/avalonia/bootstrap/activate.sh
node resources/avalonia/bootstrap/preflight.mjs
bash resources/avalonia/bootstrap/prefetch.sh desktop
npm run test:pipeline:native
```

The activation script initializes supported writable CLI/NuGet/runtime paths; `XDG_RUNTIME_DIR` is necessary on this read-only-home cloud host for .NET named mutexes. `prefetch.sh` now restores only the selected desktop project (or `android` explicitly). Inspection of the actual 12.1.4 template confirmed `--avalonia-version`; it does **not** support `--no-restore`, and its CLI template has no restore post-action, so that invalid flag was removed. The synthetic seed is preserved on retries. Exact dependency versions/content hashes are retained in generated `packages.lock.json` files under the external cache and candidate runs. No cache archive has been published or independently verified on a new machine.
