# OpenForm Schema — the third Any-Shape reference application

This is the **TypeScript-authored**, compiled-to-standard-JavaScript form application. It demonstrates typed schemas, reusable steps, repeatable quote line items, calculated totals, review-before-submit, draft persistence, and the same independently replaceable destination adapters used by OpenForm Studio and OpenForm Flow.

## Run and build

From repository root:
```sh
npm ci
npm run build:openform-schema
npm run dev
```
Open `http://127.0.0.1:4173/examples/openform-schema/?edit=1` to configure and publish. After publishing, open `http://127.0.0.1:4173/examples/openform-schema/` for the finished respondent form with **only title, description, sections, fields, navigation and feedback**; no configuration or builder sidebar.

The TypeScript source is `app.ts`, types `types.ts`, editable `form.config.json`, generated distributable browser JavaScript `app.js`. No external browser UI library, hosted font or login. TypeScript is a **development-time dependency** only, already used in the repository. The generated JS should be refreshed with `npm run build:openform-schema` after changing the TS.

## Connections and delivery

Use **Connections** only in author mode to add named destinations. Up to 12 entries: `local` response save or an independent JSON POST over HTTPS (localhost HTTP permitted during development). Disable/remove individual destinations or mark one optional. The settings are in the portable form JSON. Every successful submission records accepted/failed statuses; a required failure must not be disguised as success.

A publicly distributed form cannot safely contain secret webhook credentials in JSON, and a cross-origin endpoint must allow CORS. Real service integrations requiring secrets, server-side delivery guarantees, access control or signed webhooks need a backend adapter/relay; this reference does not provide one.

## Calculations and limitations

Line items use quantity and unit amount, with subtotal/tax/total calculated in cents, configured currency and an explicit default tax rate of zero. The record stores canonical field answers, line items and computed result. This is a demonstration of predictable calculated effects, **not** a finance/tax-compliance calculator; rounding and precision need additional test cases for use in production. The built-in draft and submitted records use browser localStorage, not centralized storage. TypeScript typing supports developer checking but is not a substitute for runtime schema validation of unknown input.

## Continuity and Python obligations

An unfamiliar agent should use the portable configuration, RFC-009 through RFC-012 and the source tests to reproduce a **native Python/Qt implementation**, including actual controls, input validation, calculated totals, section navigation, local drafts, theme identity and same destination HTTP payload and error behavior. A WebView wrapper is not sufficient proof.

The Python counterpart is **not yet built**, and cross-browser/manual visual tests of this newly built third example remain to be executed. Keep design intent, actions, and observed effects distinct from unsupported functionality.

## Respondent view has zero editing controls

Published mode at `/examples/openform-schema/` hides the author header and sidebar completely. Only the application title, description, sections and respondent navigation remain. Open `/examples/openform-schema/?edit=1` explicitly to access configuration and connections; this is a convenience route, not an authenticated permissions boundary. Deployment to other users requires separating author permissions from respondent access on the server.
