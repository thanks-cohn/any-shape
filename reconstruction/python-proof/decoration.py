"""Optional presentation only; domain and native HTML never import policy from here."""
STYLE = '''
:root {font: 100%/1.5 system-ui,sans-serif;color:#172b36;background:#f4f7f8}
* {box-sizing:border-box} body {margin:0;padding:clamp(.5rem,3vw,2rem)}
main {max-inline-size:75rem;margin-inline:auto} a {color:#124ba0}
.workspace {display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:1rem}
.card {container-type:inline-size;min-inline-size:0;border:1px solid #9cacb5;border-radius:.6rem;background:white;padding:1rem}
h1,h2,p,label,summary,a,output {overflow-wrap:anywhere} .fields {display:grid;gap:1rem}
.field {min-inline-size:0} label {display:block;font-weight:600}
input:not([type=checkbox]),select,button {font:inherit;max-inline-size:100%;inline-size:100%;padding:.6rem;border:1px solid #647580;border-radius:.3rem}
button {background:#143c59;color:white;cursor:pointer} :focus-visible {outline:3px solid #b35900;outline-offset:3px}
pre {white-space:pre-wrap;overflow-wrap:anywhere} nav {display:flex;flex-wrap:wrap;gap:1rem;margin-block:1rem} details {margin-block:1rem} .consent {display:flex;gap:.5rem;align-items:start}
@container (min-width:32rem) {.fields {grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
@container (max-width:25rem) {.card-content nav {display:grid}}
@media (max-width:40rem) {.workspace {grid-template-columns:minmax(0,1fr)}}
@media (prefers-reduced-motion:reduce) {* {animation:none!important;transition:none!important;scroll-behavior:auto!important}}
'''
STYLE += '''
.local-stage {display:flex;flex-wrap:wrap;align-items:start;gap:1rem;max-inline-size:100%}
.local-host {container-type:inline-size;min-inline-size:0;max-inline-size:100%;border:1px dashed #647580;padding:.5rem}
.local-card {--composition:stack;display:grid;grid-template-columns:minmax(0,1fr);gap:1rem;min-inline-size:0;padding:.5rem}
.local-card > * {min-inline-size:0} .local-card p {margin:0;overflow-wrap:anywhere}
.local-card button {align-self:center} .stress-copy {overflow-wrap:anywhere}
@container (min-width:30rem) {.local-card {--composition:side-by-side;grid-template-columns:minmax(0,2fr) minmax(0,1fr)}}
.broken-clip {position:relative;block-size:5rem;overflow:hidden}
.broken-clip button {position:absolute;inset-block-start:7rem}
.broken-intrinsic p {white-space:nowrap;overflow-wrap:normal}
.broken-host {container-type:normal}
'''
