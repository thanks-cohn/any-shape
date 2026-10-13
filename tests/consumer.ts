import { inspectLayout, createOverlay, type DiagnosticReport } from '@any-shape/core';
const report: DiagnosticReport = inspectLayout(document.body, { includeContent: false });
const overlay = createOverlay(document.body);
overlay.enable();
overlay.refresh();
overlay.disable();
overlay.destroy();
report.findings.forEach(finding => console.log(finding.code, finding.confidence));
// @ts-expect-error Content collection is deliberately unsupported.
inspectLayout(document.body, { includeContent: true });
