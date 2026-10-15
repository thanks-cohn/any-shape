#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
CACHE="${AVALONIA_CACHE_DIR:-$PWD/.cache/avalonia}"
OUT="${1:-$PWD/avalonia-nuget-cache.tar.gz}"
test -d "$CACHE/nuget" || { echo "No seeded NuGet cache; run bootstrap/prefetch.sh" >&2; exit 2; }
tar -C "$CACHE" -czf "$OUT" nuget
sha256sum "$OUT" > "$OUT.sha256"
echo "Archive $OUT and digest $OUT.sha256. Upload to a persistent release/artifact store; do not claim cached offline access until archive exists there."
