# Transformation and degradation

Status: proposed universal decision framework. Current browser evidence and reconstruction proof cover only named subsets. These rules derive from the explicit owner mission; strategy details remain unreviewed proposals.

## Preserve meaning before selecting a shape

Before adapting, identify essential objects, relationships, operations, authority and current state. Then record the context: available space, aspect, input methods, language, text size, renderer facilities, motion preference, memory, compute and network. Select a presentation capable of preserving those obligations. Test the actual result; a plausible strategy is not evidence that it worked.

A realization MUST NOT treat a missing feature as an empty field, a denied operation as a successful no-op, or an unrendered object as nonexistent. It SHOULD distinguish temporarily unavailable, unsupported, permission-denied, not-yet-loaded and intentionally redacted. Hosts may require existence privacy; explain at the permitted level rather than exposing concealed objects through diagnostics.

| Change | Permitted strategies | Failure and expected correction |
|---|---|---|
| Narrow or unusually short region | Wrap, reorder presentation without semantic order change, stage interaction, labeled scroll | A clipped submit action fails. Move it into reachable flow or a documented action stage. |
| Extreme aspect ratio | Change columns, subordinate decoration, preserve groups and navigation | A horizontal editor loses selection status. Provide a reachable inspector/status surface. |
| Larger text or browser/desktop zoom | Increase flow area, wrap labels, retain reading order | Smaller font used to force fit fails. Recompose or scroll without shrinking essential text. |
| Locale, long words or RTL | Logical ordering/padding, translated labels, expansion-safe text | Truncated critical status or direction-specific action placement fails. Preserve the label and its relationship to the value. |
| Pointer absent, keyboard or assistive input | Native/semantic activation, ordered traversal, visible focus, modality alternatives | Hover-only edit affordance fails. Expose a named operable action. |
| Reduced motion | Static transitions or explicit feedback | Meaning conveyed only by animation fails. Supply status that survives motion reduction. |
| Rich renderer absent | Text summaries, hierarchy lists, structured registries | An unavailable 3D view becomes an empty screen. Expose object IDs, relationships, properties and feasible actions in another supported face. |
| Low compute or memory | Bounded batches, paged records, deferred decoration, explicit limits | Dropping rows silently fails. Expose count, continuation and detail access, and test completeness. |
| Network unavailable | Local operations, cached read state labeled as stale, queued changes only with safe policy | Claiming a remote mutation succeeded fails. Distinguish pending, rejected and confirmed states. |
| Optional enhancement lost | Baseline human flow and independent domain/protocol access | Entire form disappears with diagnosis unavailable. Retain baseline or disclose a named fallback. |

## Loss accounting

A transformation SHOULD produce an internal preservation ledger: which meanings and operations remain; which move; which defer; which are unsupported; and why. For essential operations, absence requires a visible alternative or an explicit limitation, not a silent claim of equivalence. Critical data must remain retrievable under the host's authority rules. Decorative details may be omitted when their removal does not change meaning; a status icon is not decoration if it is the only signal of failure.

Pagination is acceptable only when navigation can retrieve every authorized record and preserves selection/identity across pages. Staged forms are acceptable only when fields and errors remain discoverable and submission still validates the complete logical payload. A read-only fallback may preserve information but does not prove functional parity for a write-capable interface. A structured agent surface may preserve operation while the human face remains unsupported; report those outcomes separately.

## Choosing and testing a fallback

1. Name the lost capability and affected obligation.
2. Prefer an available, simpler presentation before discarding semantics.
3. Declare unsupported/deferred operations and the available alternative.
4. Run positive, negative and transition probes in the constrained environment.
5. Record functional, semantic, accessible and aesthetic continuity independently.

No universal numeric budget is asserted. A proposed resource target MUST specify hardware/runtime, workload size, measurement method and acceptable bound before a benchmark becomes an acceptance gate. The existing small-browser diagnostic timing is not evidence for a million-record dataset or a 3D editor on low-memory hardware.

See [cross-medium examples](CROSS_MEDIUM_EXAMPLES.md) for concrete paired faces, and [acceptance](../RECONSTRUCTION/CONFORMANCE_AND_ACCEPTANCE.md) for the test protocol.
