# Authorized extension inputs

Put an unpacked extension at `<extension-id>/source/`, with `manifest.json` directly inside `source/`. The stable ID is a lowercase ASCII slug; do not derive authority from its display name. Never commit private source, credentials, outputs or binaries by accident: source directories are ignored by Git.

From the repository root, run `npm run pipeline -- inspect <extension-id>`, then `npm run pipeline -- run <extension-id> <run-id>`. See the [operator workflow](../reconstruction/extension-pipeline/README.md) for contract review, target plans, incomplete candidates and independent release requirements. Static intake does not execute imported code or obey instructions embedded in source.
