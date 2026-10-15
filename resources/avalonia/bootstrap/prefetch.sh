#!/usr/bin/env bash
# Warm only the requested host, avoiding unrequested iOS/browser/mobile workloads.
set -euo pipefail
cd "$(dirname "$0")/.."
CACHE="${AVALONIA_CACHE_DIR:-$PWD/.cache/avalonia}"
mkdir -p "$CACHE/nuget" "$CACHE/seed" "$CACHE/logs"
export NUGET_PACKAGES="$CACHE/nuget"
command -v dotnet >/dev/null || { echo 'Activate a compatible .NET SDK first.' >&2; exit 2; }
version="$(node -p 'JSON.parse(require("fs").readFileSync("toolchains.json","utf8")).avaloniaVersion')"
if ! dotnet new list avalonia.xplat | grep -q avalonia.xplat; then
 dotnet new install "Avalonia.Templates::$version" --nuget-source https://api.nuget.org/v3/index.json
fi
# Never delete or overwrite an existing seed to recover a failed bootstrap.
if [ ! -f "$CACHE/seed/Seed.Desktop/Seed.Desktop.csproj" ]; then
 if [ -n "$(ls -A "$CACHE/seed")" ]; then echo 'Nonempty seed lacks expected desktop project; inspect before continuing.' >&2; exit 3; fi
 dotnet new avalonia.xplat -n Seed -o "$CACHE/seed" --avalonia-version "$version" --no-update-check
fi
project="$CACHE/seed/Seed.Desktop/Seed.Desktop.csproj"
case "${1:-desktop}" in
 desktop) ;;
 android) project="$CACHE/seed/Seed.Android/Seed.Android.csproj" ;;
 *) echo 'Usage: prefetch.sh [desktop|android]' >&2; exit 2 ;;
esac
dotnet restore "$project" --packages "$NUGET_PACKAGES" --use-lock-file
printf 'Dependencies warmed at %s; retain lockfile package hashes. No runtime acceptance implied.\n' "$NUGET_PACKAGES"
