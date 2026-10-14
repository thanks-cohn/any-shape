# Proposal: A Minimal, Working Cloudflare Pages Export Reference

**Status:** Owner intent and acceptance proposal — not a claim of implementation or successful deployment.  
**Scope:** Any-Shape published web exports and agent inheritance documentation.  
**Default deployment assumption:** GitHub-hosted source code deployed to **Cloudflare Pages using npx Wrangler**.

## The owner's reasoning — why this exists

The immediate goal is not to build another cloud platform or introduce a new storage layer. The owner wants to create a form in Any-Shape, export it as an **independently useful published product**, put the resulting ordinary project files in a GitHub repository, and deploy them on **Cloudflare Pages**. The form must then send real responses to **whatever permitted webhook URLs the owner configured**, whether those endpoints are associated with Cloudflare or not.

GitHub is the familiar place to version the project; GitHub Pages alone cannot execute a public server-side POST receiver. Cloudflare Pages provides a conventional place for the small required server-side component. Wrangler (`npx wrangler`) provides a repeatable local test and deployment workflow.

**The deeper Any-Shape/Forever Works research motivation:** Any unfamiliar future agent inheriting this repository should *see one actual working and well-documented instance* of a deployable exported product. The agent should learn the essential conventions and independently apply them to future apps and mediums, not memorize a large catalog of hand-built conversion recipes.

> **One deep, real, verified reference is more valuable than a dozen shallow, partly working examples.**
>
> The export is not complete when it merely emits code. It is complete only when a published, respondent-only application can be run independently, deployed conventionally, and shown to perform its configured external effects.

## Minimal reference shape

```text
cloudflare-pages-reference/
├── public/
│   ├── index.html          # respondent-only published UI
│   ├── style.css           # independent responsive presentation
│   ├── app.js              # public runtime; submits to same-origin endpoint
│   └── form.json           # portable field specification and webhook destinations
├── functions/
│   └── api/
│       └── submit.js       # Pages Function: validate and forward JSON POST
├── wrangler.jsonc          # minimal, accurate Pages project configuration if required
└── README.md               # complete local testing and deployment reproduction
```

This is a **suggested reference**, not a mandate to add empty infrastructure files. Only include configuration files that are genuinely required or useful for the verified Wrangler workflow.

The public form contains **no editor, admin settings, original studio controls, or Any-Shape branding**. After export, an owner can edit `form.json` directly and redeploy. Owner-defined webhook destinations are preserved in a portable documented structure. Browser-local response storage is not a required production component.

The Pages Function is a **small, ordinary JSON receiver and forwarding adapter**. The base reference remains minimal. **R2 and D1 are two deliberately scoped, separately testable storage adapters** (see below), not requirements for every exported app; this does not authorize an account service, dashboard, queue framework, or proprietary runtime. A successful HTTP receipt must not be misrepresented as downstream persistence or processing.

## Reference execution and proof

The README should state working directory, prerequisites and commands, for example:

```sh
npx wrangler pages dev public
npx wrangler pages deploy public --project-name=<existing-pages-project>
```

Verify the exact Cloudflare Pages Functions discovery/packaging behavior against the current Wrangler version. Include first-time setup or project creation when necessary; do not imply a GitHub commit alone starts a deployed backend. The reference should be reproducible both from a local checkout and when pushed to GitHub and deployed through Cloudflare Pages.

Acceptance evidence should establish, in a real runtime:

1. Pages serves the exported `public/` assets, with no editor or branding.
2. Submitting the form invokes the same-origin `POST /api/submit` Pages Function.
3. The Function validates payload shape, bounds size, and forwards the intended JSON to configured **permitted HTTPS** webhook destinations, regardless of provider.
4. An independent receiver records the real POST, including values and record ID.
5. Distinguishable HTTP 2xx acknowledgment, HTTP 400/500 rejection, network failure and partial delivery are reported truthfully; no false claims about durable storage.
6. Multiple requests and retries have documented semantics; do not promise exactly-once delivery without implementing and verifying it.
7. A negative security test proves the server will not become an arbitrary public URL-fetching proxy (reject private/internal targets and unsafe protocols; consider DNS resolution, redirects, URL allowlisting and other SSRF risks).
8. Clean checkout, normal `npx wrangler` setup and a verified deployment work without secret undocumented steps.
9. The resulting package contains no real credentials, hidden API keys, unexpected external dependencies, or unused hosting/database features.

Because the browser posts **to its own Pages Function**, third-party cross-origin browser CORS is normally unnecessary for this path. The function performs server-side forwarding. If the receiver requires secret credentials or trust verification, the exported public JSON cannot safely contain those secrets; document the necessary external arrangement rather than pretend otherwise.

## Strict scope discipline

**Keep a minimal Pages + webhook-forwarding baseline**, and add exactly two *opt-in storage exemplars*: R2 object persistence and D1 row persistence. Test each independently. Neither is required for ordinary forwarding-only exports; avoid queues, account systems, analytics, generalized storage frameworks or competing deployment backends.

**Do not handcraft flagship conversions.** Build one small, valid Pages reference whose behavior and deployment have been independently checked; teach the agent the general export and deployment invariants. Additional examples must justify themselves by revealing genuinely different capabilities, not by duplicating boilerplate.

**Do not call a static-only ZIP a fully working Pages export.** The current Any-Shape export has included a static form/client and webhook destination configuration; a production Pages Function must be implemented, packaged and tested separately before claiming real out-of-box server-side forwarding.

## What this teaches a future agent

A reconstructed web application must be *operationally whole*: independent public UI, conventional deployable project layout, executable server-side effects when required, documented configuration and an empirical run/deploy/verification path. The form example is a small teaching instrument for that general rule, **not the definition of Any-Shape**.

This is the same deeper Forever Works principle: preserve the capability's identity and real authorized effects, not merely a resemblance of source files or a screenshot.

## Future questions (not blockers to the reference)

Hosting services, deployment procedures, and APIs may evolve. Agents should discover the currently supported Cloudflare Pages/Wrangler conventions rather than blindly replay obsolete commands. The two specified R2 and D1 adapters below are the bounded storage examples. Further storage services or advanced delivery layers require their own scoped justification and evidence.

**Success statement:** A cold agent can inspect one reference, export a respondent-only application with the required Pages Function, commit conventional files to GitHub, deploy through Wrangler, and demonstrate end-to-end webhook delivery without guessing or introducing unnecessary infrastructure.

## Owner addendum — two Cloudflare persistence exemplars (2026-10-14)

The owner wants the reference to teach agents **how an actual Pages Function can persist a form submission in either R2 or D1**. This expands the evidence corpus without changing the standard's minimal architecture. Do not make storage mandatory for every exported product. Preserve independent owner-configured external HTTPS webhooks.

The same `POST /api/submit` contract should work with three clearly declared deployment modes:

| Mode | Actual effect | Verification |
| --- | --- | --- |
| **Webhook-only baseline** | Forward authorized validated JSON to a configured permitted HTTPS endpoint | Receiver captures actual request/response |
| **R2 example** | Persist the JSON body as an object via a Pages R2 binding, e.g. `submissions/<form-id>/submission-<random-uuid>-<UTC-timestamp>.json` | Independently fetch the object and byte/semantic-compare |
| **D1 example** | Insert normalized receipt metadata and the submission JSON (or explicitly documented payload subset) via a Pages D1 binding and parameterized SQL | Independently query the row by submission ID and verify payload |

The R2 object key should use a cryptographically generated identifier (e.g. UUID) **plus a collision-resistant UTC timestamp**, not a timestamp alone. Sanitize the form ID before using it in paths. Preserve a separate stable submission ID to support de-duplication checks; a random object key alone does **not** provide idempotency. Set appropriate content type, validate payload sizes, avoid accidentally exposing a public bucket, and document how data is retained or deleted.

For D1, ship a **small, explicit SQL schema/migration**, binding declaration and setup instructions. State whether a record's stable ID is a unique key and what a duplicate submission returns. No pretense that tables exist without provisioning and applying the migration. All SQL values must be parameterized. Credentials and binding resources belong to the deployer's environment/configuration rather than public `form.json`.

**Testing:** Locally exercise each mode using Wrangler and reproducible synthetic submissions; verify HTTP acknowledgments **only after the intended persistence/forwarding effect is confirmed**. Test duplicate IDs, invalid JSON, schema failure, storage unavailability and HTTP failures. Then, once appropriate Cloudflare resources are configured by an authorized owner, repeat real remote checks. If testing a combination (R2 + D1, or storage + outbound webhook), record partial results accurately: these operations are **not one atomic transaction**, so document retry and reconciliation behavior. Never claim D1 and R2 have identical operational semantics.

**Minimal configuration doctrine:** Two small working adapter examples in one indexed reference corpus are better than building a general-purpose database abstraction or introducing mandatory storage into every exported app. An agent should understand when and why to select R2, D1, both, or neither, and apply the documented Pages/Wrangler pattern in an unfamiliar app.

**Implementation status:** Proposed and documented here only. Neither the R2 nor D1 persistence example has been implemented and independently exercised as part of the current website export ZIP.


### First-class, reusable JSON record URLs

**Owner's additional objective:** Every accepted form submission should be addressable as a stable individual JSON resource, so *any later program* can consume the raw response data independently of the original form UI. R2 is the first reference mechanism for this capability; D1 can demonstrate an equivalent logical retrieval contract backed by SQL. Avoid tying the portable record identity to an ephemeral object filename or a particular hosting provider.

Example: after persistence, `POST /api/submit` may return a structured receipt containing `submissionId`, `status`, and a canonical `recordUrl` such as `https://forms.example.com/api/submissions/<opaque-id>`. A minimal `GET /api/submissions/:id` Pages Function would read the corresponding R2 object (or D1 row, according to configured storage mode), and return `Content-Type: application/json` with a stable, versioned envelope containing form identity, submission identity, timestamp, and original answer data. The reference must establish what remains immutable, whether revisions exist, and how 404, revoked access, malformed IDs, and unavailable storage are reported.

For R2, use a safe unique object key of the form `submissions/<safe-form-id>/submission-<cryptographically-random-id>-<utc-timestamp>.json`, coupled to the stable `submissionId` via an explicit, documented deterministic mapping or small index. **Do not generate an opaque URL that cannot actually be resolved later.** Do not rely on merely guessing filenames from timestamps. If immutable source records are preferred, document retention, deletion, and replacement semantics.

**Security boundary:** Form answers may contain email addresses, documents, or other private data. A stable URL is not by itself authorization. Default to **private, authenticated retrieval**, or a securely signed, time-limited share URL if deliberately enabled by the owner. Publicly accessible raw JSON must be an explicit opt-in with a warning about downstream sharing, indexing, and retention. Avoid exposing R2 buckets publicly just to implement record URLs. The receipt handed to respondents must not automatically disclose a privileged read credential.

**Future interoperability proof:** A *second unrelated test application* retrieves a permitted submission by URL, validates the versioned JSON contract, and processes an answer field without invoking the form or its editor. Include independent HTTP retrieval, access-denial, wrong-ID, and persistence/restart tests. This proves the owner's deeper intent: one application may generate reusable structured data upon which other independent products can build.

**Status:** Design requirement for the proposed reference, not a currently implemented or verified public URL feature.


### Quick-start assumption: preconfigured R2 bucket

The owner prefers minimal setup and may provide an **existing R2 bucket with public development access already configured**. The lab should accept that bucket rather than recreate infrastructure. If the user wants direct public raw-object URLs, show how to enable public access/custom domain and test those URLs using **synthetic submissions only**. If direct browser access to R2 is used, explain CORS for the *real webpage origin* (Cloudflare Pages host/custom domain); a GitHub repository alone is not an R2 browser origin. For the standard recommended flow, the Pages Function reads/writes through an R2 binding, which requires **neither public bucket access nor R2 CORS**. The canonical `/api/submissions/<id>` record URL can be served by that Function from a private bucket. Keep public object URL testing explicitly optional and do not block the normal deployment lab on that setting.
