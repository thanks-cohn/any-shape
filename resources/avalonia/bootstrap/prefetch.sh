#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$PWD"
CACHE="${AVALONIA_CACHE_DIR:-$ROOT/.cache/avalonia}"
mkdir -p "$CACHE/nuget" "$CACHE/seed"
export NUGET_PACKAGES="$CACHE/nuget"
if ! command -v dotnet >/dev/null; then echo "dotnet SDK required" >&2; exit 2; fi
if ! dotnet new list avalonia.xplat | grep -q avalonia.xplat; then
 dotnet new install Avalonia.Templates::12.1.4 --nuget-source https://api.nuget.org/v3/index.json
fi
if [ ! -e "$CACHE/seed/Seed.sln" ] && [ ! -e "$CACHE/seed/Seed.slnx" ]; then
 rm -rf "$CACHE/seed"
 mkdir -p "$CACHE/seed"
 dotnet new avalonia.xplat -n Seed -o "$CACHE/seed" --avalonia-version 12.1.4 --no-restore
fi
find "$CACHE/seed" -name '*.csproj' -print0 | while IFS= read -r -d '' proj; do
 echo "Restoring $proj"
 dotnet restore "$proj" --packages "$CACHE/nuget"
done
echo "Dependencies warmed at $CACHE/nuget; Android workload and build remain host-specific."
