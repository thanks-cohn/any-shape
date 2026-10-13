# ADR-0002: Source-distributed core and explicit diagnostic uncertainty

Status: Implemented (2026-10-13).

The initial package distributes CSS, ESM JavaScript, declarations and JSON Schema directly. No bundler or runtime dependency is needed. Static HTML composes native card, navigation, form and disclosure behavior; the lab enhancement is optional and diagnostic imports are lazy. Node's standard-library server and test runner keep essential development utilities replaceable.

Container composition uses a named inline-size container and a 32rem **content-space threshold**; it is not a device breakpoint. A stacked baseline precedes the query layer. Semantic intent and bounded layout-mode CSS markers remain portable. The inspector distinguishes scroll measurements, authored markers, and heuristic clipping/container mismatch rather than pretending to infer the entire cascade.

The foundational proposal named `includeContent?: false`; 0.1 enforces that restriction and rejects unknown options. Reports omit timestamps to keep deterministic structural snapshots; callers can record timing externally. IDs, classes and arbitrary CSS strings are omitted because they may contain sensitive data. Geometry/tag paths still reveal structure and require caller-controlled retention. No telemetry or observers are installed.

Screenshots are captured as review candidates, not automatically accepted goldens. Geometry and accessibility gates run automatically; aesthetics and real assistive technology remain human review tasks. The replacement exercise replaces the test runner with Node assertions while retaining the browser driver; it also physically removes the optional diagnostic module from a scratch copy. Full browser-driver replacement and a source-from-purpose rebuild remain distinct future exercises.

The new source is MIT licensed to make copying and recovery explicit. Public 0.1 classes/tokens/schema now live in `CURRENT_API_V0_1.md`; earlier draft examples remain historical intent. No foundational purpose or required accessibility/content invariant changes. Migrations for a later API version must preserve those outcomes and record changed public behavior.
