// Optional, explicit, local inspection. Never reads text, values or URLs.
(() => {
 const number = value => Math.round(value * 100) / 100;
 const known = new Set(['card.preferences','card.state','demo.narrow','demo.wide','demo.stress','broken.intrinsic','broken.clipped-action','broken.action','broken.missing-container']);
 function inspect(root = document) {
  return Array.from(root.querySelectorAll('[data-target-id]')).filter(e=>known.has(e.dataset.targetId)).map(e=>{
   const box=e.getBoundingClientRect(), style=getComputedStyle(e);
   let host=e.parentElement;
   while(host && getComputedStyle(host).containerType==='normal') host=host.parentElement;
   const findings=[];
   if(e.scrollWidth>e.clientWidth+1) findings.push({code:'intrinsic-overflow',evidence:{clientWidth:e.clientWidth,scrollWidth:e.scrollWidth},hypothesis:{cause:'Intrinsic content may resist available width.',certainty:'uncertain'}});
   for(const control of e.querySelectorAll('button,input,select,a')) {
    let ancestor=control.parentElement;
    const c=control.getBoundingClientRect();
    while(ancestor && ancestor!==document.body){
     const a=ancestor.getBoundingClientRect(), css=getComputedStyle(ancestor);
     if(['hidden','clip'].includes(css.overflowY) && (c.top<a.top-1 || c.bottom>a.bottom+1) || ['hidden','clip'].includes(css.overflowX) && (c.left<a.left-1 || c.right>a.right+1)) {
      findings.push({code:'clipped-action',evidence:{controlWidth:number(c.width),controlHeight:number(c.height),ancestorWidth:number(a.width),ancestorHeight:number(a.height)},hypothesis:{cause:'A clipping ancestor may hide an action.',certainty:'uncertain'}});break;
     }
     ancestor=ancestor.parentElement;
    }
   }
   if(e.dataset.expectsContainer==='true' && !host) findings.push({code:'missing-intended-container',evidence:{foundQueryContainer:false},hypothesis:{cause:'Intended local container may be absent or configured incorrectly.',certainty:'uncertain'}});
   return {target:e.dataset.targetId,measured:{width:number(box.width),height:number(box.height),clientWidth:e.clientWidth,scrollWidth:e.scrollWidth,containerWidth:host?number(host.getBoundingClientRect().width):null},authored:{declaredMode:style.getPropertyValue('--composition').trim()||null,containerType:host?getComputedStyle(host).containerType:null},explanation:{modeSource:'Computed authored CSS declaration, distinct from measured geometry.',rootCause:'Unknown; findings are observations and hypotheses.'},findings};
  });
 }
 const button=document.getElementById('measure');
 const listener=()=>{document.getElementById('measurements').textContent=JSON.stringify(inspect(),null,2)};
 button?.addEventListener('click',listener);
 window.anyShapeInspect={inspect,teardown(){button?.removeEventListener('click',listener);button?.remove();document.getElementById('measurements')?.replaceChildren();delete window.anyShapeInspect;}};
})();
