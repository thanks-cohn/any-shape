# Dependency register and recovery

Consumer runtime: **zero external dependencies**. Standard HTML, CSS and browser DOM APIs execute the behavior. Local assets permit offline use. System fonts avoid remote font failure. Node >=22 supplies the development server, test runner, assertions and filesystem tools; Node 24 is selected in CI. `package-lock.json` pins the entire development graph. Run `npm ci`, not an unconstrained upgrade.

| Dependency / version / license | Role and direct surface | Replacement and failure recovery |
|---|---|---|
| `@playwright/test` 1.64.0 / Apache-2.0 | Development-only matrix runner: `test`, `expect`, `defineConfig`; geometry, keyboard, emulation and screenshots. Native DOM cannot automate three browser engines alone. | Keep the HTML fixtures and contract assertions. Use Node `assert` + a browser driver or WebDriver; `scripts/recovery.js` replaces the runner while retaining Playwright's lower-level driver. This exercise does not replace the driver itself. |
| `playwright`, `playwright-core` 1.64.0 / Apache-2.0 (transitive) | Browser installation and automation; recovery directly uses `chromium`. Bundled browser revisions are pinned by Playwright. | If downloads fail, a compatible local Chromium may be selected with `AS_CHROMIUM_PATH`; report its exact version. Full replacement requires another browser driver and rerunning the same geometry/privacy contracts. Do not weaken assertions. |
| `axe-core` 4.14.0 / MPL-2.0 | Development-only local `axe.min.js`, `axe.run` for WCAG rule tags. Complements keyboard/geometry assertions; automated checks cannot certify accessibility. | Use another local accessibility engine and manual semantic, contrast and keyboard audits. Record coverage differences; never call missing accessibility checks passing. |
| `typescript` 5.9.3 / Apache-2.0 | Development-only `tsc --noEmit`; validates public declarations through an adopter sample. No consumer compilation is required. | Replace with a compatible type checker or validate declarations against downstream TS versions. JS/CSS remain usable when checker is unavailable. |
| `ajv` 8.20.0 / MIT | Development-only draft-07 schema compilation and report validation. Browser tests validate real report data outside the page. | Use another draft-07 validator; keep the closed schema and positive/negative report fixtures. Runtime inspector does not depend on validation. |
| `fast-deep-equal` 3.1.3, `json-schema-traverse` 1.0.0, `require-from-string` 2.0.2 / MIT (transitive) | Ajv internal prerequisites; no direct application imports. | Replace together with Ajv; never expose their private APIs as Any-Shape contracts. |
| `fast-uri` 3.1.8 / BSD-3-Clause (transitive) | Ajv URI handling; no direct application imports. | Replace together with Ajv and keep schema tests. |

Review lockfile and installed package license/version metadata after dependency changes. The npm tarball contains only consumer files, examples and API documentation; no development dependency is required to serve the static assets. CI Actions are infrastructure dependencies (`checkout@v4`, `setup-node@v4`, `upload-artifact@v4`, MIT); they can be replaced by a shell checkout, Node installation and artifact copy using the same commands. Tags are not immutable SHAs; no hosted CI execution is asserted by local results.

## Reproduce and recover

```sh
npm ci
npx playwright install chromium firefox webkit
npm run check
npm run test:recovery
npm pack --dry-run
npm run dev
```

For Linux hosts missing shared libraries, use Playwright's documented `install --with-deps` in an authorized environment. Preserve TLS/package integrity checks. For a preinstalled system Chromium, run `AS_CHROMIUM_PATH=/usr/bin/chromium npm run test:browser -- --project chromium` and the same override for recovery; this does not establish Firefox/WebKit support. `PLAYWRIGHT_BROWSERS_PATH` may relocate the cache to a writable directory but must be used consistently for install and run.

The current Debian amd64 cloud host cannot install packages as root. `npm run prepare:cloud` is a tested alternative: it keeps browsers and extracted system libraries in ignored `.browser-tools/`, uses signed configured APT sources and checksum-verified downloads, and proves startup/rendering in all three engines. It needs Python 3, APT/dpkg, working configured repositories and a checkout path without spaces. It does not modify system libraries. Run it outside the filesystem sandbox if Firefox reports a profile-directory failure; the same exception is needed for Firefox tests on this host. Other distributions/architectures should use the standard supported Playwright installer.

```sh
npm run prepare:cloud
PLAYWRIGHT_BROWSERS_PATH="$PWD/.browser-tools/browsers" PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1 npm run check
PLAYWRIGHT_BROWSERS_PATH="$PWD/.browser-tools/browsers" npm run test:recovery
PLAYWRIGHT_BROWSERS_PATH="$PWD/.browser-tools/browsers" npm run test:package
```

The host-validation override addresses Playwright's `ldconfig -p` presence heuristic, which cannot see rootless GLES libraries. The helper first loads the libraries with `ctypes`, then actually starts and renders each engine. It does not bypass TLS, signature or artifact-checksum validation. WebKit's shipped launcher overwrites `LD_LIBRARY_PATH`, so the helper adds symlinks to verified dependencies in its local `sys/lib` directory while preserving shipped browser artifacts. Rootless system packages track the host's signed repository snapshot and may need adjustment if the base image changes; they are infrastructure dependencies, not consumer runtime dependencies.

Rootless packages actually observed from the host's Debian snapshot (development/browser infrastructure only; no source imports and none shipped in the Any-Shape npm archive):

| Package / Debian version | Role / principal upstream license |
|---|---|
| `libgtk-4-1` 4.18.6+ds-2 | WebKit GTK host toolkit / LGPL-2.1+ with additional component licenses |
| `libgraphene-1.0-0` 1.10.8-5 | GTK geometry / Expat (MIT) |
| `libharfbuzz-icu0` 10.2.0-1+deb13u1 | WebKit font shaping/ICU bridge / permissive MIT-style, additional component licenses |
| `libmanette-0.2-0` 0.2.12-1 | WebKit input support / LGPL-2.1+ |
| `libhyphen0` 2.8.8-7+b2 | Text hyphenation / GPL-2+ or LGPL-2.1+ or MPL-1.1+ |
| `libgles2`, `libglvnd0` 1.7.0-1+b2 | GLES dispatch / MIT, additional component licenses |
| `libcairo-script-interpreter2` 1.18.4-1+b1 | GTK graphics prerequisite / Cairo LGPL/MPL and permissive component terms |
| `libhidapi-hidraw0` 0.14.0-1+b2 | Manette input prerequisite / GPL-3.0 or BSD-3-Clause or HIDAPI |
| `liblzo2-2` 2.10-3+b1 | Cairo compression prerequisite / GPL-2+ |

Exact copyright notices and component terms are retained in `.browser-tools/libs/usr/share/doc/<package>/copyright`; the table is not a replacement for those files. Standard supported system installation can replace local extraction. A compatible system engine or alternate driver can replace WebKit tooling, but its missing browser coverage must stay unrun until equivalent contracts execute. Browser distributions retain their upstream licenses (Chromium BSD-style and third-party terms, Firefox MPL-2.0 and third-party terms, WebKit LGPL/BSD and third-party terms); they are not consumer dependencies. Package versions above are observed infrastructure versions, not a claim that every future base image supplies the same snapshot.

Recovery copies core and lab into a temporary directory, removes the actual diagnostic artifact, serves it, and checks container layout, 320px reflow, form operation, accessibility, and graceful diagnostic failure using a replacement Node assertion harness. Original files remain intact; scratch cleanup occurs in `finally`. Tests separately disable all JS and strip the container enhancement layer. These exercises demonstrate the core seam survives optional module loss. They do not prove a total rebuild from nothing; follow `RECOVERY.md` for that larger exercise.

## Browser capabilities and gaps

Preservation work retains the actual Forever Works v0.1 standard/schemas/CLI/binding/example from MIT-licensed upstream commit `55c81544a5ae3cfa08959c95d805a677db07d43f`, with immutable source pin and byte hashes in `vendor/forever-works/UPSTREAM.json`. The CLI uses standard-library Python; independent schema validation uses the already pinned Ajv 8.20.0 draft-2020-12 module. No new npm dependency was added. Upstream is unmodified; see `docs/RECONSTRUCTION/DEPENDENCY_AND_FAILURE_ATLAS.md` for its role and tooling limitations.

The Python proof uses only Python 3 standard-library domain/server/text modules and optional local decoration/inspection artifacts; its test realm is not production authentication. Its independent Node evaluator uses the existing Playwright installation and retains that driver. These are source-repository reconstruction tools, not browser consumer runtime dependencies or new public exports.

Core uses grid, flex, logical properties, clamp, aspect-ratio, layers and fluid `vi` units. Target recent evergreen engines. Named container queries enhance a usable stacked baseline. Engines lacking cascade layers or modern intrinsic sizing are outside the verified baseline; removing query rules tests fallback behavior, not an actual obsolete browser. No-JS, RTL, reduced-motion, pointer/touch and CSS viewport squeeze are distinct tested dimensions. Native browser UI zoom, assistive technologies, mobile hardware, forced colors, print and human aesthetic review require additional evidence. See the implementation report for actual engines and results.
