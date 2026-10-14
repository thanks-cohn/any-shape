# Manual form webhook baseline — 2026-10-14

**Evidence source:** User-operated Chrome sessions on Windows, with two local servers (`npm run dev` at 127.0.0.1:4173 and `npm run dev:webhook-lab` at 127.0.0.1:4174), shared as browser screenshots, exact receiver JSON and form status text in the development conversation. This is a **manually observed** baseline, not a claimed automated or cross-platform certification. Dates and times below are receiver-reported.

## Confirmed observations

| Browser source | HTTP 202 (real POST) | HTTP 400 (real POST) | Receiver data | Source feedback |
| --- | --- | --- | --- | --- |
| OpenForm Studio (`openform-reference`) | Confirmed; 20 answer keys | Confirmed; 11 answer keys | `test:false`, JSON body, unique record ID | Delivery incomplete; local accepted, endpoint failed HTTP 400; duplicate warning |
| OpenForm Flow (`openform-flow-reference`) | Confirmed; 17 answer keys | Confirmed; 18 answer keys | `test:false`; selections, rankings, matrix objects, typed acknowledgement and a file **metadata** object (`uploaded:false`) | Delivery incomplete; HTTP 400 reported; human-facing text misleadingly said **local failed** for remote delivery |
| OpenForm Schema (`openform-schema-reference`) | Confirmed; 7 answer keys | Confirmed; 7 answer keys | `test:false`; nested line items and calculated estimate `subtotalCents/totalCents` | Local accepted and remote HTTP 400 failed, with duplicate warning |

Connectivity button tests were also observed for all three applications (`formId:connection-test`, `test:true`, empty answers). Duplicate clicks of **Send test POST** generated two different synthetic requests; this does not establish exactly-once semantics. The receiver uses controlled /receive/success (202) and /receive/reject (400) endpoints and stores in-memory JSON until restarted. HTTP responses do not prove any third-party downstream business process completed.

**Observed concrete estimate examples:** quantity 1 × unitPrice 500 → totalCents 50000, and quantity 1 × unitPrice 500000 → totalCents 50000000; taxCents 0. Manual data were fictional.

## Defects and improvements prompted by observation

1. **Misleading destination identity:** Flow displayed “local failed: HTTP 400” for a remote webhook configured from a former local-only example. The transport returned the correct error but the UI used a legacy/misleading destination label. The shared adapter now carries both destination **label and actual kind**, and all three forms format statuses as, e.g., `Test Webhook [HTTP webhook]: failed (HTTP 400)`, or `Save on this device [local storage]: accepted`. Retain stable internal IDs only in machine-readable receipts. A destination literally named “local” still displays that user-chosen name, but **[HTTP webhook]** clarifies the actual channel.
2. **Professional review:** The Schema review previously exposed raw JSON to respondents. Now present sectioned labeled answers, a readable line-item estimate and prominent total; keep JSON in exports and diagnostics only. Do not change the submitted structured payload.
3. **Duplicate risk:** The form already warns that retries may duplicate accepted effects. **Idempotent outbox/retry receipts are not implemented** and need future design and tests.
4. **Numeric and attachment limitations:** Very large amounts were accepted in Studio/Flow; Flow file input sent `uploaded:false` metadata, not the bytes. Treat constraints and true file delivery as future separately scoped capabilities.
5. **Data shape:** Studio submits `recordId` while Flow/Schema submit `id`; adapter and receiver tolerate both. A neutral contract should explicitly document compatibility rather than silently assuming identical serialization.

## Automated regression added

`npm run test:destinations` executes Node tests covering the shared destination adapter's 202/400/500 behavior, local persistence with remote rejection, body/method, human-readable destination type/label, and independent loopback webhook receiver behavior.

`tests/browser/openform-schema.spec.js` now checks that the final review uses semantic labeled summaries and has no JSON `pre` dump, with 375/768/1280px overflow probes. The full Playwright checks and source compilation must still be **executed and observed** on a suitable runner; committing these tests is not itself a passing result.

## Remaining acceptance before native transfer

Verify automated CI, source TS build, tests in real browsers, stable published/respondent-only UI across sizes, actual local response retrieval, HTTP 500, delayed response, offline failures, CORS errors, persistence and retry/duplicate behavior. Then freeze sanitized source-neutral operation/effect fixtures for independent Python/Qt and Avalonia reconstruction.

**Research implication:** These tests distinguish control intent from observable authorized effects. The respondent sees clear feedback while future agents can independently compare the underlying request/receipt graph across languages and platforms.
