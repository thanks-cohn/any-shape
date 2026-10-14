# RFC-012 — Portable Destinations and Effect Adapters

**Status:** Proposed language-neutral contract; first browser vertical slice implemented in OpenForm Flow. No native Python or TypeScript realization is claimed.
**Date:** 2026-10-13

## Principle

Preserve the *destination and real effects* of an action, not only its appearance. A browser or native Submit must validate the same data, perform equivalent authorized destination operations, and truthfully report acceptance, failure or partial completion. A successful UI message is not evidence of downstream fulfillment.

## Current working browser slice

OpenForm Flow has a **Destinations** settings dialog and a portable `destinations` configuration object with `mode` and `url`.

| Mode | Meaning |
| --- | --- |
| `local` | Write JSON response envelope to this browser's localStorage |
| `endpoint` | Send an HTTP JSON POST to a permitted URL, with no local response copy |
| `local-and-endpoint` | Attempt both, report partial failure distinctly |

Configured URLs must use HTTPS or localhost/loopback HTTP for development. JavaScript Fetch uses `Content-Type: application/json`, CORS mode, credentials omitted, and rejects non-2xx acceptance. A synthetic test POST is available, explicitly marked `test: true`; it actually reaches the destination and may trigger third-party automation. Do not test a webhook without permission.

The complete response envelope has `schemaVersion`, `formId`, `id`, `submittedAt`, and `answers`. Exported form JSON includes the destination, so deployed frontend code may expose it. **Do not put tokens, credentials, private webhook URLs, or sensitive data in public JSON.** For secret-bearing integrations use a trusted backend relay with server-side credentials.

Publishing locally only switches the editor into respondent mode. It does not create a public website, multi-device collector, queue, verified signature, uploaded attachment, or backend service. Browser localStorage is not reliable centralized storage. A remote 2xx response confirms HTTP acceptance only, not downstream processing. A manual retry may duplicate previously successful local or remote effects; production must introduce idempotency/deduplication and durable receipt tracking.

## Language-neutral extensibility contract

The proposed adapter interface is a small, versioned, namespaced description of an **effect obligation** and an independent implementation:

- Stable action ID and source trigger; input/output schema and error taxonomy
- Effect capability ID, destination identity and transport descriptor
- Authority, secrets policy, expected revision and allowed initiators
- Ordering/dependencies, idempotency key, retry/deadline/compensation policy
- Requested/attempted/completed/failed/unknown evidence and receipt
- Portable conformance fixtures including rejected and partial completion
- Renderer adapter and platform delivery adapter, replaceable independently

Future effects may be local files, generated artifacts, SQL, object stores, RPC, webhooks, queues, event streams, notifications, scheduled jobs, device APIs, or technologies not yet anticipated. Adding a new type should require a new namespaced schema/adapter and fixtures, not changes to the minimal semantic core. Do not hard-code the system to forms, HTTP, webhooks, or a browser runtime.

## Native transference obligation

Future Python, Avalonia, C and C++ realizations must reproduce logical submission, equivalent payload and endpoint method/path, accepted failures, local-or-remote delivery policy, and evidence status. Native storage locations or HTTP libraries can differ. Agent-facing discovery should expose action → effect intent → implementation adapter → verified observed outcome without granting extra privileges.

OpenForm Flow implements an initial user-facing adapter and settings surface; full effect registries, permissioned agent execution, secure backend connectors and independent cross-runtime conformance are still planned. Read RFC-010 and RFC-011 for causal-chain and open-ended ontology requirements.
