"""Create allowlisted semantic-only inputs; this does not enforce filesystem isolation."""
import hashlib
import json
from pathlib import Path
import shutil
import sys

ROOT = Path(__file__).resolve().parents[1]
target = Path(sys.argv[1]).resolve() if len(sys.argv) == 2 else None
if target is None or target.exists():
    raise SystemExit('Supply a new output directory; existing directories are never overwritten.')
target.mkdir(parents=True)
names = ['PROJECT_ESSENCE', 'ONTOLOGY_AND_SEMANTICS', 'HUMAN_AND_AGENT_FACES',
         'TRANSFORMATION_AND_DEGRADATION', 'AESTHETIC_AND_ACCESSIBILITY_INVARIANTS',
         'CROSS_MEDIUM_EXAMPLES', 'GLOSSARY_AND_DECISIONS']
for name in names:
    shutil.copyfile(ROOT / f'docs/IDENTITY/{name}.md', target / f'{name}.md')
shutil.copyfile(ROOT / 'conformance/universal-v01.json', target / 'universal-v01.json')
text = (ROOT / 'docs/RECONSTRUCTION/CONFORMANCE_SPEC.md').read_text()
(target / 'CONFORMANCE_SPEC.md').write_text(text.split('## Cross-language reconstruction')[0])
source_model = ROOT / 'forever'
manifest = json.loads((source_model / 'manifest.json').read_text())
projection = {'foreverVersion': manifest['foreverVersion'], 'projectId': manifest['projectId'], 'records': {}}
for kind in ['intent', 'capabilities', 'invariants', 'constraints']:
    projection['records'][kind] = manifest['records'][kind]
    for name in projection['records'][kind]:
        record = json.loads((source_model / name).read_text())
        for key in ['relatedImplementations', 'verification', 'extensions']:
            record.pop(key, None)
        record['provenance']['sourceReference'] = 'Owner mission in handoff 002; technical graph mapping is agent-proposed unless explicit.'
        file = target / 'forever' / name
        file.parent.mkdir(parents=True, exist_ok=True)
        file.write_text(json.dumps(record, sort_keys=True, ensure_ascii=False, indent=2) + '\n')
(target / 'forever/manifest.json').write_text(json.dumps(projection, sort_keys=True, indent=2) + '\n')
inventory = {str(p.relative_to(target)): hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(target.rglob('*')) if p.is_file()}
(target / 'INPUT_INVENTORY.json').write_text(json.dumps({'isolation': 'Input projection only; use a separate enforced sandbox/host for strict isolation.', 'files': inventory}, sort_keys=True, indent=2) + '\n')
print(f'Created {len(inventory)} allowlisted semantic inputs at {target}. Review before release.')
