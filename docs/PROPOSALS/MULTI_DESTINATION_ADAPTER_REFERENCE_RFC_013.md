# RFC-013 — Shared Connections, Multi-Destination Receipts and Respondent Views

**Status:** Browser source implemented for three reference applications; manual end-to-end verification and native parity not yet established.

## Generalizable principle

The user-facing application defines *an authorized operation and its required observable consequences*. A replaceable effect adapter executes the operation in its own platform. The current web reference at `examples/shared/destinations.js` demonstrates this for an explicit, bounded subset: local records and HTTPS JSON POST receivers.

**This is a teaching reference, not the entire future universe of effect kinds.** New adapters must be attachable without rewriting the continuity ontology or giving agents extra authority.

## Shared version 1 configuration

```json
{
  "connections": {
    "version": 1,
    "targets": [
      {"id": "local", "label": "Local responses", "kind": "local", "url": "", "enabled": true, "required": true},
      {"id": "receiver", "label": "Example receiver", "kind": "http", "url": "https://example.org/receive", "enabled": true, "required": true}
    ]
  }
}
```

Studio stores this on `config.destinations` for compatibility with its original schema; Flow stores it on `model.connections` with legacy-destination migration; Schema stores it on `config.connections`. The *portable contract* is the same normalized object returned by `normalizeDestinations`; a future schema migration should standardize the enclosing key with an explicit migration plan.

Each target has a stable ID, label, type, URL, enabled flag and required-for-success flag. Up to 12 entries in this initial UI. Local writes and remote POSTs yield `accepted` or `failed` receipts; the dispatcher returns individual results plus required-outcome success and partial-delivery indication. A live test sends synthetic data and might trigger a real webhook, so test only an authorized receiver.

## Security and reliability boundaries

- HTTP targets are allowed only with HTTPS or HTTP loopback for development.
- Browser requests omit credentials; browser CORS, server security, privacy policy and authorization still apply.
- Client JSON can be inspected by respondents. Never embed private webhook signing secrets, bearer tokens or provider credentials; place those in a server-side connector/relay.
- A 2xx result means the HTTP request was accepted, **not** that every downstream integration finished.
- Browser localStorage is per browser origin/profile and cannot aggregate remote respondents on its own.
- Delivery to multiple targets can partially succeed; naive retry may duplicate writes. Production adapters need durable outbox, idempotency, independent receipts, rate limiting, dead-letter recovery and explicit retry policies.
- Local-only publishing does not create a shareable hosted collector, credential boundary or trusted multi-tenant form service.

## Author versus respondent separation

For each form, the author page (explicit `?edit=1`) contains editing controls, appearance and Connections dialogs. The published plain URL renders **only title, description, sections, question controls, respondent navigation, and submission feedback**. No toggle or settings sidebar is visible. This is a visual separation; it **does not authenticate the author**. A public deployment requires real server-side author permission and safe publication of an immutable or signed respondent configuration, separate from private integrations.

## Transference teaching chain

```text
Submit / enter / other approved input
    → stable operation and typed canonical record
    → validation, authorization and recipient policy
    → N normalized destination effect obligations
    → environment-specific local/HTTP adapters
    → per-destination observed receipts
    → success/failure/partial feedback and parity test
```

A native Python/Avalonia/C/C++ implementation must preserve the record schema, enabled/required target selection, request method/body/path and meaningful delivery outcomes while implementing local storage and HTTP with native libraries. Add additional future effect types through versioned and permissioned adapters, not form-specific hardcoding. Include conformance fixtures that observe a real local test receiver before asserting same-endpoint parity.

## Tests and open issues

Source changes and tests are checked in under `tests/browser/`. Syntax-only validation does not prove visual quality, CORS interoperability or cross-browser behavior. CI and manual human review must be executed and interpreted. The third TypeScript example currently has a TS source and browser distributable plus a build script; make its compilation, semantic type checking, responsive/a11y review and contract parity independently reproducible.

See RFC-010 through RFC-012 and `docs/EXAMPLES/OPENFORM_CONTINUITY.md`.
