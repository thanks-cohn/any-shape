# Do not spend each run redownloading Avalonia

**Implementation status:** bootstrap/preflight/cache scripts committed; NOT run on three target hosts and NO SDK/NuGet binary archive uploaded yet.

Preferred workflow:
1. Agent runs `node bootstrap/preflight.mjs` to inspect local SDK, templates, Android workload and reusable cache without altering the host.
2. If a trusted prebuilt archive exists in internal artifacts/release storage, download it once, verify SHA-256 locally using `bootstrap/cache-import.sh`, and set `NUGET_PACKAGES` to the imported cache. No opaque binaries from extension source.
3. Otherwise host maintainer runs `bootstrap/prepare.sh` (or `prepare.ps1`) and `bootstrap/prefetch.sh` **once** to install the template and restore an Avalonia cross-platform seed into a reusable cache. Use `cache-export.sh` to prepare the artifact for persistent upload.
4. On later runs, do not reinstall if preflight and lockfile checks pass. Use local cache; `dotnet restore --ignore-failed-sources` should only be accepted when all locked packages are present and package hashes match.
5. Record restore lockfiles, dotnet SDK output, target workload manifests, OS/RID, package hashes, origin and archive version. If any mismatch, fail visibly.

**Why not commit the entire SDK?** It is huge, changes per architecture/OS, may carry redistribution restrictions, and makes the source repository difficult to maintain. Store portable metadata/source in Git; store trusted binary caches in versioned releases or artifact storage. A cache is only reproducible when its inputs, hashes and provenance are retained.

**Security:** never run code contained in uploaded extension source during intake; never execute unreviewed NuGet build targets blindly; audit package licenses and provenance. Check extracted archives for traversal and symlink hazards. Existing scripts are bootstrap helpers, not a hardened untrusted-archive sandbox.

Version selection is intentionally captured in `toolchains.json`: candidate Avalonia 12.1.4 as of 2026-10-15, not verified with a particular installed .NET SDK and Android workload. Review compatibility before production use.

## Implementation evidence addendum (2026-10-15)

SDK 10.0.402 and pinned template 12.1.4 installed locally; SDK archive matched Microsoft's published SHA-512. Desktop seed restore and generated linux-x64/win-x64 builds succeeded using `/workspace/.toolchains/nuget`. Repeated compiler tests reused that cache and correctly failed invalid C#. `bootstrap/activate.sh` provides writable runtime/CLI paths without HOME changes; `install-dotnet.py` reuses a matching installed SDK. `prefetch.sh desktop` avoids unrelated mobile restores and no longer passes the invalid `--no-restore` template option. Android workload and all native-runtime/release checks remain unavailable/unrun. Historical untested status above describes the earlier bootstrap; no uploaded binary cache or fresh-machine restoration is claimed.
