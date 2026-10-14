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

The Pages Function is a **small, ordinary JSON receiver and forwarding adapter**. It is *not* a D1/R2/database platform, account service, submission dashboard, queue framework, or proprietary runtime. A successful HTTP receipt must not be misrepresented as downstream persistence or processing.

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

**Do not add D1, R2, extra databases, queues, account systems, analytics, storage indexes or competing deployment backends to prove this reference.** They are separate future products or optional extensions, not prerequisites for the owner's simple GitHub → Pages → arbitrary permitted webhook objective.

**Do not handcraft flagship conversions.** Build one small, valid Pages reference whose behavior and deployment have been independently checked; teach the agent the general export and deployment invariants. Additional examples must justify themselves by revealing genuinely different capabilities, not by duplicating boilerplate.

**Do not call a static-only ZIP a fully working Pages export.** The current Any-Shape export has included a static form/client and webhook destination configuration; a production Pages Function must be implemented, packaged and tested separately before claiming real out-of-box server-side forwarding.

## What this teaches a future agent

A reconstructed web application must be *operationally whole*: independent public UI, conventional deployable project layout, executable server-side effects when required, documented configuration and an empirical run/deploy/verification path. The form example is a small teaching instrument for that general rule, **not the definition of Any-Shape**.

This is the same deeper Forever Works principle: preserve the capability's identity and real authorized effects, not merely a resemblance of source files or a screenshot.

## Future questions (not blockers to the reference)

Hosting services, deployment procedures, and APIs may evolve. Agents should discover the currently supported Cloudflare Pages/Wrangler conventions rather than blindly replay obsolete commands. Any future database, store or advanced delivery layer must be justified by a separately scoped application need and corresponding test evidence.

**Success statement:** A cold agent can inspect one reference, export a respondent-only application with the required Pages Function, commit conventional files to GitHub, deploy through Wrangler, and demonstrate end-to-end webhook delivery without guessing or introducing unnecessary infrastructure.
