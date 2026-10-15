# Case 001 — Real Flow deployment, R2/D1 submission and file attachment

**Scope:** one deployed test of exported Any-Shape Flow after test-repository-specific modifications. **Observed:** 2026-10-15 UTC. **Sources:** `thanks-cohn/any-shape-form-tests` repository; GitHub Actions run [38701066607](https://github.com/thanks-cohn/any-shape-form-tests/actions/runs/38701066607); contemporaneous read-only Cloudflare API inspection through connected account. **Do not put access tokens or personal user-provided answers in a public fixture.**

## Sequence and evidence

1. **Original exported product — SOURCE-INSPECTED.** Flow's ZIP contained the five static files `index.html`, `style.css`, `app.js`, `form.json`, `README.md`. It included a file field but sent its filename, size and MIME only, marking `uploaded:false`. Exported delivery pointed to deliberately rejecting local test receiver `http://127.0.0.1:4174/receive/reject`, unusable on public Pages.
2. **Integration in independent GitHub test repo — SOURCE-INSPECTED.** Added Pages Functions for multipart submission, attachment routing, per-submission GET; D1 migration; GitHub Actions workflow; adapted `app.js` to send actual file bytes; changed delivery to same-origin `/api/submit`. This is not yet part of the original shared ZIP.
3. **Cloudflare setup — LIVE-OBSERVED.** Existing D1 database `any-shape-test-submissions`; existing R2 bucket `anyshape-form-uploads`; created Pages project `any-shape-form-tests` with binding names `SUBMISSIONS_DB` and `SUBMISSIONS_R2`. Do not copy account IDs as universal requirements.
4. **Deployment — LIVE-OBSERVED.** GitHub Actions run **38701066607** showed a green deploy job; Cloudflare Pages project API reported a successful latest deployment and `uses_functions:true`. D1 database was observed to have one table afterward. Project: `https://any-shape-form-tests.pages.dev`. Green deploy != submitted data verified.
5. **Browser submission — LIVE-OBSERVED.** User saw `Submission accepted. r2: accepted; d1: accepted` and a record identifier. Screenshot showed required consent checked during submission testing; other form fields had been filled on the preceding screen.
6. **Independent D1 query — LIVE-OBSERVED.** Read-only SQL `SELECT id, form_id, created_at, payload_json FROM submissions ORDER BY created_at DESC LIMIT 3` found one row with **submissionId** `04d5df56-3dcf-49d5-b549-031093cc3304`, `formId` `openform-flow-reference`, time `2026-10-15T07:49:25.493Z`, and serialized `answers` and `files`. For privacy, this package omits actual name/answer content and uploaded filename from public copy.
7. **Independent R2 object listing — LIVE-OBSERVED.** The bucket contained the file under `Submitted-Files/Images/openform-flow-reference/04d5df56-3dcf-49d5-b549-031093cc3304/...`, MIME `image/webp`, size **13,304 bytes**. Matching R2 object metadata plus D1 record proves an object was stored and associated, **not** a cryptographic byte-for-byte readback.
8. **Not yet observed.** An actual authenticated GET of the stable JSON URL; direct R2 retrieval of JSON body; cross-source consistency for many submissions; invalid input, partial failure, retries, duplicate suppression, access control, several file types, or editor parity.

## Verified outcomes / remaining differences

| Claim | Status | Basis |
| --- | --- | --- |
| Flow test site deployed with Pages Functions | **LIVE-OBSERVED PASS** | GitHub green run + Cloudflare deployment API |
| D1 table exists | **LIVE-OBSERVED PASS** | Cloudflare D1 metadata |
| D1 saved selected answers in JSON | **LIVE-OBSERVED PASS** | D1 SQL row |
| R2 stored at least one real attachment object | **LIVE-OBSERVED PASS** | Bucket object listing/size/MIME |
| R2 JSON body & index retrievable | **UNKNOWN** | Server source writes both; retrieval not exercised |
| Public record GET returns expected content | **UNKNOWN** | URL shown, not independently fetched |
| Attachment answer says `uploaded:true` | **KNOWN DEFECT** | Stored answer still says `uploaded:false` while R2 file exists |
| Frontend text says actual upload works | **KNOWN DEFECT** | Stale static-export text says metadata only |
| Shared ZIP exports deployable cloud backend | **NOT IMPLEMENTED** | Only five static files in original exporter |
| One failed R2/D1 write cannot leave inconsistent data | **NOT PROVEN / DESIGN GAP** | Multi-effect writes not transactional across providers |
| Arbitrary viewer cannot read submissions without permission | **KNOWN SECURITY GAP** | Current GET uses unguarded ID lookup |
| Safe repeated submit / retry after partial failure | **NOT PROVEN** | New UUID each backend call; no dedupe key |
| Three editors have equivalent cloud export | **NOT PROVEN** | Only Flow test repo adapted and deployed |

## Test protocol for a second run

1. Inspect HEAD, workflow, bindings, migrations, and resource names. Use a **dedicated synthetic-data environment**.
2. Run source/unit/schema checks. Record commit SHA, tool versions and outputs (a document claiming tests passed without logs is insufficient).
3. Deploy from GitHub Actions. Record run ID, Pages deployment ID and URL; observe Functions and D1/R2 bindings independently.
4. Submit a deterministic fixture containing text, select/multi choice, consent and a small generated binary asset. Record request ID/response; never print API tokens or real people's data.
5. Query D1 by returned ID and read R2 JSON object and file object; compute attachment SHA-256 over original and readback; compare all records. Run GET by record ID with appropriate authorization.
6. Inject missing D1, missing R2, malformed multipart, oversize, duplicate retry, network interruption, and simultaneous requests. Verify truthful partial failure reporting and no untracked orphan artifacts.
7. Evaluate keyboard navigation, status announcements, required inputs, layout at constrained sizes, and privacy posture.
8. Preserve fixtures, logs, hashes, environment versions, failures and **an independent evaluator verdict**. Do not turn a manual happy path into blanket certification.

## Limits and concrete repairs (subject to owner review)

**CORRECT candidate:** remove obsolete "session only/metadata only" messaging and ensure uploaded status derives from server receipts rather than pre-submit form metadata; retain an explicit reference to `files[]` by field identity. Add request ID and idempotency semantics, harden JSON/byte limits, choose partial-commit/recovery policy, add rate limits/bot controls, authentication/authorization for record access, retention/deletion and access logging. Prefer not to expose submitted JSON to anyone possessing a guessable/link-leaked ID. Design alternatives require owner acceptance; don't quietly impose one.
