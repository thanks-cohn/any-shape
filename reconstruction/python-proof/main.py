#!/usr/bin/env python3
"""Independent standard-library preferences reconstruction. Fixture authentication only."""
import argparse, copy, hashlib, hmac, html, json, secrets, sys, threading, uuid
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlsplit
try:
    from decoration import STYLE
    DECORATED = True
except ImportError:
    STYLE = ''
    DECORATED = False

FIELDS = {
 'displayName': {'id':'field.display-name','type':'string','required':True,'minLength':1,'maxLength':80,'trimBeforeValidation':True,'persistence':'none'},
 'density': {'id':'field.density','type':'string','required':True,'enum':['comfortable','compact']}}
ROLES = {'owner':['describe','read','apply'], 'observer':['describe','read']}
ERRORS = ['permission-denied','validation-error','consent-required','idempotency-conflict','revision-conflict','unsupported-operation']

class Domain:
    def __init__(self):
        self.state = {'revision':0,'density':'comfortable'}
        self.retries = {}
        self.retry_secret = secrets.token_bytes(32)
        self.lock = threading.RLock()
    def fail(self, code, message, fields=None):
        result = {'ok':False,'state':dict(self.state),'error':{'code':code,'message':message}}
        if fields: result['error']['fields'] = fields
        return result
    def dispatch(self, request):
        with self.lock:
            if not isinstance(request,dict): return self.fail('validation-error','Request must be an object.')
            op, actor = request.get('operation'), request.get('actor')
            if op not in ('describe','read','apply'): return self.fail('unsupported-operation','Use describe, read or apply.')
            if not isinstance(actor,str) or op not in ROLES.get(actor,[]): return self.fail('permission-denied','Fixture actor is not permitted to perform this operation.')
            if op == 'describe':
                return {'ok':True,'state':dict(self.state),'surface':'surface.preferences','schemaVersion':'0.1-proposed','fields':copy.deepcopy(FIELDS),'actions':[{'id':'action.'+a,'operation':a,'available':a in ROLES[actor], 'parameters':copy.deepcopy(FIELDS) if a=='apply' else {}, 'preconditions':['permission','valid parameters','consent:true','requestId','expectedRevision'] if a=='apply' else []} for a in ('describe','read','apply')], 'errors':ERRORS,'presentations':['native-html','terminal-text','newline-json'],'security':'Named fixture actors are not production authentication.'}
            if op == 'read': return {'ok':True,'state':dict(self.state)}
            params = request.get('params')
            errors = {}
            if not isinstance(params,dict) or set(params) != {'displayName','density'}:
                return self.fail('validation-error','Exactly displayName and density parameters are required.')
            name = params['displayName']
            if not isinstance(name,str) or not 1 <= len(name.strip()) <= 80: errors['displayName']='Enter a name of 1–80 characters after trimming.'
            if params['density'] not in ('comfortable','compact'): errors['density']='Choose comfortable or compact.'
            rid, rev = request.get('requestId'), request.get('expectedRevision')
            if not isinstance(rid,str) or not rid.strip(): errors['requestId']='Provide a nonempty retry key.'
            if type(rev) is not int or rev < 0: errors['expectedRevision']='Provide a nonnegative integer revision.'
            if errors: return self.fail('validation-error','Review the invalid fields.',errors)
            if request.get('consent') is not True: return self.fail('consent-required','Explicit consent is required.')
            # Store only a fingerprint; transient displayName is never retained in retry records.
            fingerprint = hmac.new(self.retry_secret, json.dumps({'params':params,'consent':True,'expectedRevision':rev},sort_keys=True,ensure_ascii=False).encode(), hashlib.sha256).digest()
            key = (actor,rid)
            if key in self.retries:
                oldfinger, result = self.retries[key]
                if fingerprint != oldfinger: return self.fail('idempotency-conflict','Retry key was used with a different request.')
                return copy.deepcopy(result)
            if rev != self.state['revision']: return self.fail('revision-conflict','State changed. Reread and review before applying.')
            self.state = {'revision':rev+1,'density':params['density']}
            result = {'ok':True,'state':dict(self.state)}
            self.retries[key] = (fingerprint,copy.deepcopy(result))
            return result

def text_render(result):
    state = result['state']
    return ('Preferences [surface.preferences]\nDensity [field.density]: '+state['density']+'\nRevision: '+str(state['revision'])+'\n'+('Accepted.' if result['ok'] else result['error']['code']+': '+result['error']['message'])+'\nApply [action.apply] requires displayName (transient), density, consent, requestId and expectedRevision.\n')

def page(domain, result=None, actor='owner', direction='ltr', long=False):
    state = domain.dispatch({'operation':'read','actor':'owner'})['state']
    esc = html.escape
    result = result or {'ok':True,'state':state}
    status = 'Ready. Current state is authoritative.' if result['ok'] else result['error']['code']+': '+result['error']['message']
    if result['ok'] and result.get('submitted'): status = 'Preferences applied.'
    errors = result.get('error',{}).get('fields',{})
    name_label = 'Display name — required, transient, never saved' if not long else 'Display name with a deliberately extensive explanation of the transient identity input that is validated for this submission and is never saved in the preferences state'
    fields_html = ''
    for field in ('displayName','density'):
        ident = FIELDS[field]['id']; error = errors.get(field,''); error_id=ident+'-error'
        attrs = ' aria-describedby="'+ident+'-hint'+(' '+error_id if error else '')+'"'+(' aria-invalid="true"' if error else '')
        if field == 'displayName': control='<input id="'+ident+'" data-field-id="'+ident+'" name="displayName" type="text" required maxlength="80" autocomplete="off" dir="auto"'+attrs+'>'
        else: control='<select id="'+ident+'" data-field-id="'+ident+'" name="density"'+attrs+'>'+''.join('<option value="'+v+'"'+(' selected' if v==state['density'] else '')+'>'+v.title()+'</option>' for v in ('comfortable','compact'))+'</select>'
        fields_html += '<div class="field"><label for="'+ident+'">'+esc(name_label if field=='displayName' else 'Density')+'</label>'+control+'<p id="'+ident+'-hint">'+('1–80 characters after trimming. Not persisted.' if field=='displayName' else 'Applies to the shared preferences state.')+'</p>'+('<p id="'+error_id+'">'+esc(error)+'</p>' if error else '')+'</div>'
    return '''<!doctype html><html lang="en" dir="'''+direction+'''"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Any-Shape preferences proof</title><style>'''+STYLE+'''</style><body><main id="surface.preferences" data-surface-id="surface.preferences"><h1>Preferences, in any available shape</h1><p>Local proof. Owner and observer are trusted fixture actors, not production authentication.</p><nav aria-label="Sections"><a href="#card.preferences">Preferences</a><a href="#card.state">State and explanation</a><a href="/?dir=rtl">Right-to-left view</a><a href="/?long=1">Long labels</a><a href="/text">Text view</a></nav><p id="outcome" role="status" aria-live="polite">'''+esc(status)+'''</p><div class="workspace"><section class="card" id="card.preferences" data-target-id="card.preferences" aria-labelledby="preferences-heading"><div class="card-content"><h2 id="preferences-heading">Apply preferences</h2><form method="post" action="/apply" id="preferences-form"><label for="actor">Fixture actor</label><select id="actor" name="actor"><option value="owner"'''+(' selected' if actor=='owner' else '')+'''>Owner</option><option value="observer"'''+(' selected' if actor=='observer' else '')+'''>Observer (read only)</option></select><div class="fields">'''+fields_html+'''</div><input type="hidden" name="expectedRevision" value="'''+str(state['revision'])+'''"><input type="hidden" name="requestId" value="'''+uuid.uuid4().hex+'''"><label class="consent" for="consent"><input id="consent" name="consent" type="checkbox" value="true">I consent to apply this density change.</label><button id="action.apply" data-action-id="action.apply" type="submit">Apply preferences</button></form></div></section><section class="card" id="card.state" data-target-id="card.state" aria-labelledby="state-heading"><div class="card-content"><h2 id="state-heading">Shared state</h2><p>Density: <output id="state-density">'''+esc(state['density'])+'''</output></p><p>Revision: <output id="state-revision">'''+str(state['revision'])+'''</output></p><details id="state-details"><summary>Rules and available routes</summary><p>Display names are transient. Both human submissions and agents use one dispatcher. Denial, validation, consent, stale revisions and conflicting retries preserve state. Restart resets this in-memory proof.</p><nav aria-label="State routes"><a href="/">Refresh authoritative state</a><a href="/text">Terminal-style view</a></nav></details><details><summary>Local optional geometry diagnostics</summary><p>No automatic collection or network reporting. Only numeric geometry and authored target IDs are measured after activation.</p><button type="button" id="measure">Measure cards locally</button><pre id="measurements"></pre></details><p id="renderer-status">'''+('Optional decoration available.' if DECORATED else 'Decoration unavailable. Native HTML remains operable; /text and --text provide an alternate renderer.')+'''</p></div></section></div></main><script src="/inspection.js" defer></script></body></html>'''

def fixture_page(domain, broken=False, direction='ltr'):
    def card(instance):
        return '<article class="local-card" data-object-id="record.delivery" data-target-id="'+instance+'" data-expects-container="true"><div><h3>Delivery options</h3><p>Review delivery preferences before making a choice. This same logical record keeps its meaning, order and operation in each host.</p></div><details><summary>Review options</summary><p>Options are disclosed locally. Preferences remain in the native form above.</p></details></article>'
    if broken:
        extra = '<section id="broken-fixtures"><h2>Deliberately broken diagnostics specimens</h2><p>These specimens are intentionally unusable demonstrations, not the healthy interface. Return to <a href="/fixtures">healthy fixtures</a>.</p><div class="local-host" style="inline-size:280px"><article class="local-card broken-intrinsic" data-target-id="broken.intrinsic" data-expects-container="true"><h3>Intrinsic overflow</h3><p>'+('UnbreakableWord'*30)+'</p></article></div><article class="card broken-clip" data-target-id="broken.clipped-action"><h3>Clipped action</h3><button type="button" data-target-id="broken.action">Intentionally clipped action</button></article><div class="local-host broken-host" style="inline-size:280px">'+card('broken.missing-container')+'</div></section>'
    else:
        extra = '<section id="local-fixtures"><h2>Same card in unequal local hosts</h2><p>At a wide viewport these authored hosts are 280 and 720 pixels. Each can be resized independently; at a narrow viewport each remains within available space.</p><div class="local-stage"><div class="local-host" id="host-narrow" data-local-host="narrow" style="inline-size:280px">'+card('demo.narrow')+'</div><div class="local-host" id="host-wide" data-local-host="wide" style="inline-size:720px">'+card('demo.wide')+'</div></div><article class="card" data-target-id="demo.stress"><h3>Long words and native disclosure</h3><p class="stress-copy">'+('MeaningMustRemainReachable'*20)+'</p><details><summary>Read the full explanation</summary><p>Wrapping preserves the complete text. Navigation, labels, density selection and submit remain above.</p></details></article><a href="/broken">Inspect intentionally broken specimens</a></section>'
    base = page(domain,direction=direction,long=True)
    return base.replace('</main>',extra+'</main>')

class Handler(BaseHTTPRequestHandler):
    domain = Domain()
    def log_message(self,*args): pass # Do not log URLs, submitted values or body.
    def send(self, body, content_type='text/html; charset=utf-8', status=200):
        data=body.encode();self.send_response(status);self.send_header('Content-Type',content_type);self.send_header('Content-Length',str(len(data)));self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(data)
    def do_GET(self):
        url=urlsplit(self.path);query=parse_qs(url.query)
        if url.path=='/inspection.js':
            try:
                from pathlib import Path
                return self.send(Path(__file__).with_name('inspection.js').read_text(), 'text/javascript; charset=utf-8')
            except FileNotFoundError:
                return self.send('Optional local inspection unavailable.', 'text/plain; charset=utf-8', 404)
        if url.path=='/text': return self.send(text_render(self.domain.dispatch({'operation':'read','actor':'observer'})),'text/plain; charset=utf-8')
        if url.path in ('/fixtures','/broken'):
            return self.send(fixture_page(self.domain,broken=url.path=='/broken',direction='rtl' if query.get('dir')==['rtl'] else 'ltr'))
        if url.path!='/': return self.send('Not found','text/plain',404)
        self.send(page(self.domain,direction='rtl' if query.get('dir')==['rtl'] else 'ltr',long=query.get('long')==['1']))
    def do_POST(self):
        try:
            length=int(self.headers.get('Content-Length','0'))
            if length<0 or length>65536: raise ValueError('Request too large')
            raw=self.rfile.read(length).decode('utf-8')
            if self.path=='/agent':
                result=self.domain.dispatch(json.loads(raw));return self.send(json.dumps(result),'application/json')
            if self.path!='/apply': return self.send('Not found','text/plain',404)
            form=parse_qs(raw,keep_blank_values=True)
            get=lambda key:form.get(key,[''])[0]
            try: revision=int(get('expectedRevision'))
            except ValueError: revision=None
            actor=get('actor')
            result=self.domain.dispatch({'operation':'apply','actor':actor,'params':{'displayName':get('displayName'),'density':get('density')},'consent':get('consent')=='true','requestId':get('requestId'),'expectedRevision':revision})
            result['submitted']=True
            self.send(page(self.domain,result,actor=actor))
        except (ValueError,UnicodeError): self.send(json.dumps(self.domain.fail('validation-error','Malformed request.')),'application/json',400)

def main():
    parser=argparse.ArgumentParser();group=parser.add_mutually_exclusive_group(required=True);group.add_argument('--protocol',action='store_true');group.add_argument('--serve',type=int,metavar='PORT');group.add_argument('--text',action='store_true');args=parser.parse_args()
    domain=Domain()
    if args.serve is not None:
        Handler.domain=domain;server=HTTPServer(('127.0.0.1',args.serve),Handler);print('Listening on http://127.0.0.1:'+str(server.server_port),file=sys.stderr,flush=True)
        try:server.serve_forever()
        except KeyboardInterrupt:pass
        finally:server.server_close()
    else:
        if args.text:print(text_render(domain.dispatch({'operation':'read','actor':'owner'})),flush=True)
        for line in sys.stdin:
            try: result=domain.dispatch(json.loads(line))
            except (ValueError,UnicodeError):result=domain.fail('validation-error','Malformed JSON request.')
            print(text_render(result) if args.text else json.dumps(result,ensure_ascii=False),flush=True)
if __name__=='__main__':main()
