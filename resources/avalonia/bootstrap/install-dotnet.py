#!/usr/bin/env python3
"""Install the pinned official Linux SDK with a checked SHA-512, never into HOME.
WHY: reproducible local tools. REPLACE: another trusted SDK acquisition route,
retaining version, artifact digest and target-specific compilation evidence.
"""
import argparse
import hashlib
import json
import os
import pathlib
import platform
import subprocess
import tarfile
import tempfile
import urllib.request

parser = argparse.ArgumentParser()
parser.add_argument('--install-dir', required=True, type=pathlib.Path)
args = parser.parse_args()
if platform.system() != 'Linux' or platform.machine() not in ('x86_64', 'amd64'):
    parser.error('This pinned artifact supports Linux x64 only; use the official SDK for your host.')
config = json.loads((pathlib.Path(__file__).resolve().parents[1] / 'toolchains.json').read_text())
artifact = config['dotnetSdkLinuxX64']
install_dir = args.install_dir.resolve()
if install_dir.exists() and any(install_dir.iterdir()):
    executable = install_dir / 'dotnet'
    result = subprocess.run([str(executable), '--version'], capture_output=True, text=True, check=True)
    if result.stdout.strip() != artifact['version']:
        raise SystemExit('Existing SDK differs from the pin; choose a new empty installation directory.')
    print(f'Reusing {artifact["version"]} at {install_dir}; no download performed.')
    raise SystemExit(0)
install_dir.parent.mkdir(parents=True, exist_ok=True)
with tempfile.TemporaryDirectory(prefix='dotnet-download-', dir=install_dir.parent) as staging:
    archive = pathlib.Path(staging) / 'sdk.tar.gz'
    digest = hashlib.sha512()
    with urllib.request.urlopen(artifact['url'], timeout=60) as response, archive.open('wb') as output:
        while chunk := response.read(1024 * 1024):
            output.write(chunk)
            digest.update(chunk)
    if digest.hexdigest().lower() != artifact['sha512'].lower():
        raise SystemExit('SDK SHA-512 mismatch; artifact rejected.')
    install_dir.mkdir(parents=True, exist_ok=True)
    # Official artifact authenticated by HTTPS and pinned published digest.
    # Python's data filter rejects archive traversal and unsafe link destinations.
    with tarfile.open(archive) as tar:
        tar.extractall(install_dir, filter='data')
    (install_dir / 'any-shape-sdk-receipt.json').write_text(json.dumps(artifact, indent=2) + '\n')
print(f'Installed and SHA-512 verified .NET {artifact["version"]} at {install_dir}')
