"""Local sanity evidence only. External evaluation remains independent."""
import json, pathlib, subprocess, sys, tempfile, shutil
ROOT=pathlib.Path(__file__).resolve().parent
fixture=json.loads((ROOT/'universal-v01.json').read_text())
requests=''.join(json.dumps(case['request'])+'\n' for case in fixture['sequence'])
def check(root):
    process=subprocess.run([sys.executable,str(root/'main.py'),'--protocol'],input=requests,text=True,capture_output=True,check=True)
    results=[json.loads(line) for line in process.stdout.splitlines()]
    assert len(results)==len(fixture['sequence'])
    for case,result in zip(fixture['sequence'],results):
        expect=case['expect'];assert result['ok']==expect['ok'],case['id'];assert result['state']==expect['state'],case['id']
        if 'errorCode' in expect:assert result['error']['code']==expect['errorCode'],case['id']
        assert 'displayName' not in result['state']
    return len(results)
print('Fixture checks:',check(ROOT))
with tempfile.TemporaryDirectory() as temp:
    target=pathlib.Path(temp)
    shutil.copy(ROOT/'main.py',target/'main.py')
    print('Optional decoration absent, fixture checks:',check(target))
    result=subprocess.run([sys.executable,str(target/'main.py'),'--text'],input='',text=True,capture_output=True,check=True)
    assert 'Density [field.density]: comfortable' in result.stdout
print('Text fallback checked; independent browser evidence still required.')

# Actual file disappearance: temporary runnable distribution, not import mocking.
import urllib.request, urllib.error
with tempfile.TemporaryDirectory() as temp:
    target=pathlib.Path(temp)
    for name in ('main.py','decoration.py','inspection.js'):
        shutil.copy(ROOT/name,target/name)
    (target/'inspection.js').unlink()
    process=subprocess.Popen([sys.executable,str(target/'main.py'),'--serve','0'],stderr=subprocess.PIPE,stdout=subprocess.PIPE,text=True)
    try:
        address=process.stderr.readline().strip().split('Listening on ')[1]
        with urllib.request.urlopen(address+'/fixtures') as response:
            body=response.read().decode()
        assert 'preferences-form' in body and 'host-narrow' in body and 'host-wide' in body
        try: urllib.request.urlopen(address+'/inspection.js')
        except urllib.error.HTTPError as error: assert error.code==404
        else: raise AssertionError('Removed inspection artifact unexpectedly served')
        req=urllib.request.Request(address+'/agent',data=json.dumps(fixture['sequence'][5]['request']).encode(),headers={'Content-Type':'application/json'})
        with urllib.request.urlopen(req) as response: result=json.load(response)
        assert result['ok'] and result['state']=={'revision':1,'density':'compact'}
        with urllib.request.urlopen(address+'/text') as response: assert 'compact' in response.read().decode()
        print('Physically removed diagnostic artifact: native page and agent/text behavior checked.')
    finally:
        process.terminate();process.wait(timeout=5)
