#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$PWD"
CACHE="${AVALONIA_CACHE_DIR:-$ROOT/.cache/avalonia}"
mkdir -p "$CACHE/nuget" "$CACHE/templates" "$CACHE/logs"
if ! command -v dotnet >/dev/null 2>&1; then
 echo "Missing dotnet SDK. Install compatible SDK once; no implicit system changes." >&2
 exit 2
fi
export NUGET_PACKAGES="$CACHE/nuget"
dotnet --info > "$CACHE/logs/dotnet-info.txt"
echo "Reusing NuGet packages at $NUGET_PACKAGES"
if ! dotnet new list avalonia.xplat | grep -q avalonia.xplat; then
 dotnet new install Avalonia.Templates::12.1.4 --nuget-source https://api.nuget.org/v3/index.json
fi
dotnet new list avalonia.xplat > "$CACHE/logs/templates.txt"
if ! grep -q avalonia.xplat "$CACHE/logs/templates.txt"; then
 echo "Avalonia template unavailable" >&2; exit 3
fi
if [[ "${1:-}" == "--with-android" ]]; then
  dotnet workload install android
fi
echo "Prepared reusable Avalonia tooling. Generate with: dotnet new avalonia.xplat -n Trial --avalonia-version 12.1.4"
echo "No Windows/Linux/Android application has been built by this script."
