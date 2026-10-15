# Current system atlas — path-specific ownership

**Evidence:** inspected source paths in Any-Shape and its experiment repository as of 2026-10-15. Paths are navigational hints, not normative requirements for future languages. Reinspect HEAD before editing.

| Source / location | Responsibility / boundary | Important facts |
| --- | --- | --- |
| `README.md`; `AGENTS.md` | Research mission, operator entry, agent procedure | Read before modifying source; claims have different evidence status |
| `src/any-shape.css` | CSS responsive primitives / visual foundations | Standalone browser-core implementation, separate from form hosting |
| `src/diagnostics.js`, `.d.ts`, `diagnostic.schema.json` | Optional privacy-conscious layout instrumentation and typed/schema API | No compulsory remote data service |
| `examples/openform/` | Studio editor UI and authoring model | Exports via shared website exporter |
| `examples/openform-flow/` | Flow editor with multi-section questionnaire/file question | The tested website originated here |
| `examples/openform-schema/` | Schema editor source; build script produces browser JS | Different authoring surface, shared export behavior |
| `examples/shared/portable-form.js` | Maps source editor models into `portable-form` format v1 | Interpret model by schema/version, not UI labels |
| `examples/shared/website-export.js` | Client-side ZIP assembly, static respondent runtime/guide | SOURCE-INSPECTED: outputs only `index.html`, `style.css`, `app.js`, `form.json`, `README.md`; **no Pages Functions or real file-byte upload in original ZIP** |
| `examples/cloudflare-pages-reference/public/` | Separate experimental hosted respondent frontend | Not automatically packaged by shared exporter |
| `examples/cloudflare-pages-reference/functions/api/submit.js` | Separate Cloudflare JSON/multipart ingest and R2/D1 side effects | Experiment source copied/adapted into test repo |
| `examples/cloudflare-pages-reference/functions/api/file-routing.js` | R2 object naming by MIME/category and namespace | Data ownership separated from UI |
| `examples/cloudflare-pages-reference/functions/api/submissions/[[id]].js` | Submission-ID lookup from D1 or R2 index | Current public retrieval lacks authentication (security gap) |
| `examples/cloudflare-pages-reference/migrations/0001_submissions.sql` | D1 submission table and index | Schema must be applied before live use |
| `tests/website-export.test.mjs` | Shared portable ZIP assertions | Existing static-export expectations are not cloud backend proof |
| `tests/cloudflare-pages-reference.test.mjs` | Cloud reference mock request/storage tests | Not a substitute for deployed evidence |
| `scripts/validate-forever.mjs`; `forever/`; `vendor/forever-works/` | Canonical records, pinned standard, validation/audit | This prose package does not modify their schema |
| `reconstruction/`, `conformance/`, `docs/RECONSTRUCTION/` | Independent reconstruction and evaluation research | Strict isolation claims require actual environment separation |

### Experiment repository `thanks-cohn/any-shape-form-tests`

- `index.html`, `style.css`, `form.json`: exported Flow respondent frontend and adjusted same-origin delivery descriptor.
- `app.js`: adapted to POST `FormData` with a `submission` JSON part and zero or more `files` byte parts to `/api/submit`; still renders obsolete metadata-only upload warning.
- `functions/api/submit.js`: validates form ID and answers, writes file bytes to R2, stores JSON in R2 and D1, reports separate effect outcomes.
- `functions/api/submissions/[[id]].js`: looks up a record by ID, D1 first then R2 index.
- `functions/api/file-routing.js`: category-prefixed R2 keys.
- `migrations/0001_submissions.sql`: D1 table.
- `.github/workflows/cloudflare-pages-test.yml`: manual workflow for Wrangler deployment, D1 migration, and Cloudflare resource bindings. Deployment success is not an end-to-end test.

### Causal walkthrough (current experiment, not mandated design)

```text
Authoring editor -> shared portable form model -> static website ZIP
      [original export ends here]
Downloaded ZIP -> GitHub test repo + Pages Functions + workflow -> Cloudflare Pages
Human answers -> browser captures semantic values, selects File bytes
              -> multipart POST /api/submit
Server validates -> uploads file bytes to R2 -> creates submission record
                 -> R2 JSON + index, D1 JSON row -> effect-status receipt
Consumer GET /api/submissions/{id} -> D1 JSON, or R2 lookup fallback
```

### Replaceable versus essential

**Replaceable:** CSS implementation, editing UI, JS ZIP algorithm, Pages Functions, Wrangler, Cloudflare services, schema migration tooling, R2 key spelling, hosting domain, database engine, underlying language.

**Must be argued and tested before changing:** field IDs/types, meaningful question ordering, validation, hidden/conditional fields, accessible labels/feedback, atomic or explicitly partial external effects, attachment byte integrity, stable identifiers, owner/actor authorization, data privacy, errors/retry behavior, supported exported package independence.

### Practical source checks

```sh
npm ci --ignore-scripts
npm run test:website-export
npm run test:deployment-lab
npm run check:forever
npm run test:unit
npm run typecheck
```

These are **instructions**, not claims that those checks were executed or passed while writing this document. Browser/accessibility and full reconstruction lanes are in `AGENTS.md`.
