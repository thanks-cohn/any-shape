# Source this file; it initializes supported writable cache/runtime paths.
# Does not change HOME or install anything. Set AVALONIA_CACHE_DIR and
# DOTNET_INSTALL_DIR first when reusing an existing external cache/SDK.
avalonia_resources_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export AVALONIA_CACHE_DIR="${AVALONIA_CACHE_DIR:-$avalonia_resources_root/.cache/avalonia}"
export DOTNET_INSTALL_DIR="${DOTNET_INSTALL_DIR:-$AVALONIA_CACHE_DIR/dotnet}"
export DOTNET_CLI_HOME="$AVALONIA_CACHE_DIR/home"
export NUGET_PACKAGES="$AVALONIA_CACHE_DIR/nuget"
# .NET 10 named mutexes need a writable runtime directory on read-only-home hosts.
export XDG_RUNTIME_DIR="$AVALONIA_CACHE_DIR/runtime"
export TMPDIR="$AVALONIA_CACHE_DIR/tmp"
mkdir -p "$DOTNET_CLI_HOME" "$NUGET_PACKAGES" "$XDG_RUNTIME_DIR" "$TMPDIR"
chmod 700 "$XDG_RUNTIME_DIR"
export PATH="$DOTNET_INSTALL_DIR:$PATH"
unset avalonia_resources_root
