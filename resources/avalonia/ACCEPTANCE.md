# Independent acceptance and promotion

Required stage ladder: source discovery -> accepted semantic contract -> architecture check -> per-target build -> per-target runtime behavior -> effect and accessibility verification -> security/release approval -> promotion.

Windows, Linux and Android each get independent PASS / FAIL / UNKNOWN / NOT RUN requirement results. Build success is not user-functionality proof. Verify installation, startup, state persistence, actual permitted side effects, permission refusal, error/recovery paths, input modalities, display adaptation and accessibility. Android requires realistic emulator and, where required, device tests. Reproducible packaging, licensing, signing, upgrades/migration and security are release requirements.

No candidate in runs/ may be promoted to productions/ on another platform's evidence. Preserve incomplete work and honest unsupported capability reports; never generate fake native equivalents for extension-only powers.

One coordinated run vs separate runs is an experimental question, not already proven superior. Independent evaluators need held-out or separately constructed fixtures.
