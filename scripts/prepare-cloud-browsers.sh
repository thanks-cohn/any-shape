#!/usr/bin/env bash
# Rootless Debian cloud preparation. Uses signed configured APT sources and npm integrity.
# Run from the checkout; never run with shell tracing or disable trust checks.
set -euo pipefail
cd "$(dirname "$0")/.."
tools_dir="$PWD/.browser-tools"
case "$tools_dir" in *[!a-zA-Z0-9_./-]*) echo 'This helper requires a checkout path without spaces or special characters.' >&2; exit 1;; esac
if ! command -v apt-get >/dev/null || ! command -v dpkg-deb >/dev/null; then
  echo 'Debian APT and dpkg are required. On other systems use Playwright install --with-deps.' >&2
  exit 1
fi
if [ "$(dpkg --print-architecture)" != amd64 ]; then
  echo 'This rootless helper currently supports Debian amd64 only.' >&2
  exit 1
fi
mkdir -p "$tools_dir/apt/lists/partial" "$tools_dir/apt/cache/archives/partial" "$tools_dir/apt/conf" "$tools_dir/debs" "$tools_dir/libs"
export PLAYWRIGHT_BROWSERS_PATH="$tools_dir/browsers"
npx --no-install playwright install chromium firefox webkit
cat > "$tools_dir/apt/apt.conf" <<EOF
Dir::Etc::parts "$tools_dir/apt/conf";
Dir::State::lists "$tools_dir/apt/lists";
Dir::Cache "$tools_dir/apt/cache";
Debug::NoLocking "true";
APT::Sandbox::User "$(id -un)";
EOF
export APT_CONFIG="$tools_dir/apt/apt.conf"
apt-get update
(
  cd "$tools_dir/debs"
  apt-get download libgtk-4-1 libgraphene-1.0-0 libharfbuzz-icu0 libmanette-0.2-0 libhyphen0 libgles2 libcairo-script-interpreter2 libhidapi-hidraw0 liblzo2-2 libglvnd0
)
for package in "$tools_dir/debs/"*.deb; do dpkg-deb -x "$package" "$tools_dir/libs"; done
# WebKit's shipped launcher replaces LD_LIBRARY_PATH; extend its local dependency directory.
# Browser executables and shipped libraries are left intact.
for bundle in "$tools_dir/browsers/"webkit-*/minibrowser-gtk "$tools_dir/browsers/"webkit-*/minibrowser-wpe; do
  [ -d "$bundle/sys/lib" ] || continue
  for library in "$tools_dir/libs/usr/lib/x86_64-linux-gnu/"*.so*; do
    target="$bundle/sys/lib/$(basename "$library")"
    if [ ! -e "$target" ]; then ln -s "$library" "$target"; fi
  done
done
# Playwright checks GLES via ldconfig, which cannot see rootless packages. Verify dynamic
# loading directly before skipping that presence heuristic (not signatures/TLS/checksums).
LD_LIBRARY_PATH="$tools_dir/libs/usr/lib/x86_64-linux-gnu" python3 - <<'PY'
import ctypes
for library in ['libgtk-4.so.1', 'libgraphene-1.0.so.0', 'libharfbuzz-icu.so.0', 'libmanette-0.2.so.0', 'libhyphen.so.0', 'libGLESv2.so.2', 'libhidapi-hidraw.so.0', 'liblzo2.so.2']:
    ctypes.CDLL(library)
print('Local WebKit dependencies dynamically loaded successfully.')
PY
export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1
node --input-type=module - <<'JS'
import { chromium, firefox, webkit } from 'playwright';
for (const [name, engine] of Object.entries({ chromium, firefox, webkit })) {
  const browser = await engine.launch();
  try {
    const page = await browser.newPage();
    await page.setContent('<h1>Runtime check</h1>');
    if (await page.locator('h1').textContent() !== 'Runtime check') throw new Error(`${name} failed to render`);
    console.log(`${name} ${browser.version()}: startup and DOM request passed`);
  } finally { await browser.close(); }
}
JS
echo "Use PLAYWRIGHT_BROWSERS_PATH=$tools_dir/browsers PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1 for npm run check."
