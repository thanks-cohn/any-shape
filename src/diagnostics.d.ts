export type Box = { x: number; y: number; width: number; height: number };
export type CSSClues = { display: string; overflowX: string; overflowY: string; whiteSpace: string; minInlineSize: number };
export type Finding = {
  code: 'overflow-x' | 'overflow-y' | 'clipping' | 'clipped-control' | 'layout-mode' | 'container-mismatch';
  severity: 'info' | 'warning' | 'error';
  confidence: 'measured' | 'authored' | 'heuristic';
  selector: string;
  evidence: {
    box: Box; scrollWidth: number; scrollHeight: number; css: CSSClues;
    ancestors: Array<{ selector: string; box: Box; css: CSSClues }>;
    reason: 'hidden-overflow' | 'scroll-extent-exceeds-box' | 'control-outside-clipping-ancestor' | 'authored-css-marker' | 'missing-query-container';
    ancestor?: string; mode?: 'stack' | 'split' | 'unknown'; container?: Box | null;
  };
};
export type DiagnosticReport = { schemaVersion: '0.1'; viewport: { width: number; height: number }; findings: Finding[] };
export function inspectLayout(root?: Element, options?: { includeContent?: false }): DiagnosticReport;
export function classifyGeometry(input: { box: Box; scrollWidth: number; scrollHeight: number; overflowX: string; overflowY: string }): Array<'overflow-x' | 'overflow-y' | 'clipping'>;
export function createOverlay(root?: Element): { enable(): void; refresh(): void; disable(): void; destroy(): void };
