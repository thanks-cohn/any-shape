# Portable Website Export — respondent-only ZIP (v1)

**Status:** Initial implementation, subject to automated and real-host acceptance testing. Built to give form authors an independently deployable website, not an editable studio.

## Who uses what?

In the local Studio, Flow or Schema editor, choose **Export ready-to-upload website ZIP**. The package is for the form owner to deploy; public visitors see only the respondent-facing form. **No editor, admin panel, settings, local response database, product branding or Any-Shape runtime is included.**

The downloaded `website-form.zip` contains:

| File | Purpose |
| --- | --- |
| `index.html` | Clean form page, no authoring controls |
| `style.css` | Independent responsive light/dark presentation |
| `app.js` | Standalone input capture, basic validation, calculated line items where configured, and HTTP submission |
| `form.json` | Owner-editable portable definition: fields, sections, appearance and configured webhook endpoints |
| `README.md` | Hosting and CORS requirements |

Extract and upload all files into one public folder. GitHub Pages, Cloudflare Pages, Netlify, and ordinary static hosting can serve the frontend. Users **do not need npm, Python or the original Any-Shape repository** to open the hosted form.

**Maintenance after export:** To rename questions, adjust field choices or change destination URLs, update `form.json` and redeploy it. The standalone files are ordinary HTML/CSS/JS and can also be customized directly by a developer. No exported studio is necessary.

There are also two intentionally different editor controls: **Export editable JSON** (an editor backup, not for public hosting) and **Export website JSON** (the safe portable `form.json` definition). Only the **ready-to-upload website ZIP** includes all required website assets.

## Portable delivery contract

Only configured **HTTP JSON POST webhooks** are exported. Browser-local storage destinations do not belong in the published product and are omitted. All exported destination URLs, labels and enabled/required flags remain visible in `form.json`. No API tokens or secret headers are exported.

Example:
```json
{
  "delivery": {
    "protocol": "http-json",
    "webhooks": [
      {
        "id": "support",
        "name": "Support inbox",
        "method": "POST",
        "url": "https://your-domain.example/api/forms",
        "contentType": "application/json",
        "enabled": true,
        "required": true
      }
    ]
  }
}
```

This is **Any-Shape's documented vendor-neutral portable-form v1 format**, not a claim of conformity to an external universal form schema. The transport uses ordinary HTTP/JSON conventions. The deployed page sends `Content-Type: application/json` and `Accept: application/json`, an object with `schemaVersion`, `formId`, `id`, `submittedAt` and `answers`; a successful HTTP 2xx is treated as receipt of the HTTP request only. The receiver must validate all untrusted submissions independently.

For browser cross-origin requests, receiving services generally must respond to `OPTIONS` preflight with appropriate `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods: POST, OPTIONS`, `Access-Control-Allow-Headers: Content-Type, Accept`, and relevant `Vary: Origin`. The production origin will be the actual hosted domain. The existing localhost webhook lab only allows the local development origin and **will not accept requests from GitHub Pages without its origin policy being updated**.

## Deployment and security limitations

A ZIP export cannot create a backend, securely hide webhook credentials, or guarantee successful external storage. GitHub Pages hosts static files; therefore any **public** form requires an appropriate HTTPS form receiver or relay with CORS, privacy controls, validation, anti-spam and idempotency where necessary. The local dev endpoint `http://127.0.0.1:4174` is **not a production destination**: when visitors open a public form it refers to *their* computers, and HTTPS sites may reject mixed-content requests.

Advanced editor types may require future parity work. The current exported runtime does **not** guarantee identical behavior for drag-and-drop ranking, fully general conditional/repeat logic, upload bytes, signatures or arbitrary calculation graphs. In particular, **a file input exports metadata, not actual uploaded content**. These limits must be tested and surfaced before a production release. The existence of the files is not proof that all three advanced editors have feature-equivalent standalone exports.

## Acceptance tests

```sh
npm run test:website-export
```

Then in an actual browser: export ZIP from each of the three editors, extract files, host them under HTTPS or the local development server with a real synthetic receiver, inspect responsive behavior, submit data to a CORS-enabled endpoint, verify rejected delivery is reported accurately, and confirm no authoring controls, product identifiers or secret data are shipped. Store actual results and limitations in evidence records.

**Guiding principle:** Forms should be useful independent products; the portable contracts and verified effects should remain equally interpretable to future Python, Avalonia or mobile reconstruction agents.

## Intended default: GitHub → Cloudflare Pages (research target)

The owner expects **Cloudflare Pages + `npx wrangler`**, with source files commit-ready for GitHub. See [the proposed single golden Pages deployment reference](../PROPOSALS/CLOUDFLARE_PAGES_GOLDEN_EXPORT_REFERENCE.md). The target adds the smallest necessary `functions/api/submit.js` server-side JSON forwarding route to the exported respondent-only frontend, so the browser submits to same-origin `/api/submit` while that Function forwards to owner-selected permitted HTTPS webhooks. **Do not add D1, R2, databases or a broader cloud framework merely for this.** The static-only ZIP described earlier in this document is the *current implementation*, not proof that Pages Functions exporting, Wrangler deployment, or end-to-end forwarding already work. Those require implementation and independent testing before changing its readiness status.
