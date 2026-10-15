#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
CACHE="${AVALONIA_CACHE_DIR:-$PWD/.cache/avalonia}"
ARCHIVE="${1:?Provide verified cache archive path}"
test -f "$ARCHIVE.sha256" || { echo "Missing checksum $ARCHIVE.sha256" >&2; exit 2; }
(cd "$(dirname "$ARCHIVE")" && sha256sum -c "$(basename "$ARCHIVE").sha256")
mkdir -p "$CACHE"
if tar -tf "$ARCHIVE" | grep -Eq '(^/|(^|/)\.\.(/|$))'; then echo "Unsafe archive entries" >&2; exit 3; fi
tar -C "$CACHE" -xzf "$ARCHIVE"
echo "Imported cache; set NUGET_PACKAGES=$CACHE/nuget"
