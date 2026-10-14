# Any-Shape deployment lab: one real Cloudflare Pages reference

**Status:** Executable reference source and automated simulated-binding tests, **not yet a verified live Cloudflare deployment**. This is not yet incorporated into exported ZIPs. All values entered in the test UI must be synthetic.

## Why this exists

A future cold agent should have one documented, conventional example of a published respondent page, a Pages Function, R2 persistence, D1 persistence, and an individually retrievable JSON response. No large backend framework is needed. The pattern should generalize to Any-Shape's Studio / Flow / Schema website exports; those integrations require further work and browser acceptance tests.

## Quick local start

1. Install Node.js and use `npx wrangler` from this directory (do not rely on globally installed tools).
2. Create local `wrangler.toml` by copying `wrangler.example.toml`. For fully local testing, Wrangler may require a valid-looking D1 database ID. To test only a subset, remove the other binding block.
3. From repository root run: `node --test tests/cloudflare-pages-reference.test.mjs` for an immediate offline simulated-binding regression check.
4. From this example directory run: `npx wrangler pages dev public`. Open the printed localhost address, submit synthetic data, inspect status, and check R2/D1 local emulation. Wrangler configuration and emulation behavior are version-sensitive; record the Wrangler version and any deviations.
5. Create real R2 bucket and D1 database in your Cloudflare account. Apply `migrations/0001_submissions.sql` to D1 using `npx wrangler d1 execute <database-name> --remote --file=migrations/0001_submissions.sql` from this directory, with the actual configured database ID. For local D1, use the same command with `--local`.
6. Configure your actual bucket name and D1 ID; deploy to a properly created Cloudflare Pages project. Use `npx wrangler pages deploy public --project-name=<your-pages-project>`. For Git-triggered production deployments, configure the same bindings in the Pages project settings and validate the Functions deployment.

The public page sends a submission to `POST /api/submit`. A successful R2 binding writes a key like `submissions/lab-studio/submission-<uuid>-<UTC-timestamp>.json`. D1 writes full JSON to the SQL table. A successful D1-backed GET at `/api/submissions/<submissionId>` retrieves the JSON. Both records contain the same body. Any configured `WEBHOOK_URL` receives that same JSON via an HTTPS POST.

## Expected receipt and failure semantics

The response shows `submissionId`, `recordUrl`, and separate `effects.r2`, `effects.d1` and `effects.webhook` statuses. `200` means all configured effects succeeded; `207` means one or more failed, and **the write may be partial**. `503` means no effects configured. The example currently generates a new UUID on every POST, so retries make new records rather than providing exactly-once delivery.

The R2-only route writes a small second lookup object at `lookup/<submissionId>.json` and can resolve `/api/submissions/<submissionId>` without D1. This doubles R2 write operations per submission, a deliberately simple reference design rather than an optimized billion-submission architecture. The record URL works in simulated-binding tests; live Wrangler/Cloudflare integration has not yet been verified. The GET example is not yet a private authenticated product API.

## Acceptance matrix — required before claiming end-to-end success

| Step | Studio | Flow | Schema |
| --- | --- | --- | --- |
| Export standalone published form | Pending live acceptance | Pending live acceptance | Pending live acceptance |
| Run via local Wrangler Pages | Pending | Pending | Pending |
| Submit valid synthetic answers | Pending | Pending | Pending |
| Real webhook receives JSON | Pending | Pending | Pending |
| Real/local R2 stores JSON | Pending | Pending | Pending |
| Real/local D1 stores same JSON | Pending | Pending | Pending |
| GET record URL matches original | Pending | Pending | Pending |
| GitHub -> Cloudflare Pages deployment | Pending | Pending | Pending |

A human or agent should capture real HTTP status, stable submission ID, GET result, R2 key, D1 row, webhook record, exported project version and Wrangler version. Do not tick a box based on a unit mock. Independently test negative cases and platform limits.

## Scope and caution

This is a deliberately small **experimental harness**. Production use requires authentication and authorization for raw records, webhook target restrictions, idempotency and retention policy. Do not expose real responses through the unauthenticated GET reference.
