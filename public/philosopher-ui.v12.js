// A thought-experiment view alongside (not inside) the Scientist pathway.
let reflections={};try{reflections=JSON.parse(localStorage.getItem('continuum-reflections')||'{}')||{}}catch{}
const pathwaySelections={scientist:{id:'cells',topic:null},philosopher:{id:'identity-you',topic:null}};
function pathway(){return ATLAS_PATHWAYS.find(p=>p.id===domain().pathway)}
function pathwayDomains(){return ATLAS_DOMAINS.filter(d=>d.pathway===domain().pathway)}
function pathwayBranches(){const ids=new Set(pathwayDomains().map(d=>d.id));return ATLAS.filter(a=>ids.has(a.domain))}
function updatePerspective(){
 const p=pathway();document.body.dataset.pathway=p.id;
 $('.path-icon').textContent=p.symbol;$('.path-button small').textContent='PATHWAY '+p.number;$('.path-button strong').textContent=p.name;
 $('.side-heading>span:last-child').textContent=p.number+' / 03';
 $('.progress>div:first-child>span:first-child').textContent=(p.id==='philosopher'?'PHILOSOPHER':'SCIENTIST')+' EXPLORATION';
 $('.breadcrumb').innerHTML=`<button id="workspace-path-button" aria-label="Change pathway">${p.name} <span class="path-caret">⌄</span></button><span>/</span>${domain().name}`;
 $('.human-label').innerHTML=domain().id==='future-scenario'?'<span class="tiny-dot"></span> HUMAN POSSIBILITY <small>One present. Many possible futures.</small>':domain().id==='ethics'?'<span class="tiny-dot"></span> HUMANITY <small>A shared future. Many responsibilities.</small>':p.id==='philosopher'?'<span class="tiny-dot"></span> YOU <small>One person. An open question.</small>':'<span class="tiny-dot"></span> HOMO SAPIENS <small>A living, connected system</small>';
}
function showPathways(){
 modal(`<div class="eyebrow">CHOOSE YOUR PERSPECTIVE</div><h2>Different ways of seeing.</h2><p>One exploration. Distinct questions.</p><div class="pathway-choices">${ATLAS_PATHWAYS.map(p=>`<button data-pathway="${p.id}" ${p.disabled?'disabled':''} class="${pathway().id===p.id?'chosen':''}"><span class="choice-symbol">${p.symbol}</span><span><small>PATHWAY ${p.number}${p.disabled?' · COMING LATER':''}</small><strong>${p.name}</strong><em>${p.description}</em></span><b>${pathway().id===p.id?'✓':p.disabled?'—':'↗'}</b></button>`).join('')}</div>`);
}
function renderIdentityMap(){
 const steps=PHILOSOPHER_STEPS;
 $('#knowledge-sections').innerHTML=`<button class="biology domain-button current-domain" data-domain="identity-problem" aria-expanded="true"><span>◇</span><strong>Identity Problem</strong><small>07</small><span>−</span></button><button class="you-root" data-category="identity-you">YOU <span>the starting point</span></button><div class="identity-sidebar-steps">${steps.map((s,i)=>`<button data-topic="${esc(s.name)}"><span>${String(i+1).padStart(2,'0')}</span><strong>${s.name.replace('Replace ','')}</strong></button>`).join('')}</div>`;
 $('#knowledge-sections').insertAdjacentHTML('beforeend',pathwayDomains().filter(d=>d.id!=='identity-problem').map(d=>`<button class="biology domain-button" data-domain="${d.id}" aria-expanded="false"><span>${d.symbol}</span><strong>${d.name}</strong><small>${topicCount(branches(d))}</small><span>+</span></button>`).join(''));
 $('#map-nodes').innerHTML=`<div class="experiment-label"><span>THOUGHT EXPERIMENT 01</span><strong>Change the parts. Follow the person.</strong></div>${steps.map((s,i)=>`<button class="identity-step" data-topic="${esc(s.name)}" style="--step-x:${i%2===0?22:78}%;--step-y:${12+i*10.6}%" aria-label="Step ${i+1}: ${esc(s.name)}"><span class="step-number">${String(i+1).padStart(2,'0')}</span><span><small>${i===0?'BEGIN HERE':i===6?'THE LIMIT CASE':'THEN REPLACE'}</small><strong>${s.shortName}</strong></span><span class="step-status" aria-hidden="true"></span></button>`).join('')}`;
 const pts=steps.map((_,i)=>[i%2===0?176:624,(12+i*10.6)*6.7]);
 $('.connections').innerHTML=`<defs><marker id="sequence-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0 0L5 2.5L0 5" fill="#c4b6d8"/></marker></defs>${pts.slice(0,-1).map((p,i)=>{const n=pts[i+1],dir=n[0]>p[0]?1:-1;return `<path class="sequence-link" d="M${p[0]+dir*72} ${p[1]+12} C400 ${p[1]+17} 400 ${n[1]-10} ${n[0]-dir*82} ${n[1]}" marker-end="url(#sequence-arrow)"/>`}).join('')}`;
 $('.bottom-count').innerHTML='1 thought experiment <span>·</span> 7 steps';
}
function updateIdentitySelection(){
 document.querySelectorAll('.identity-step,.identity-sidebar-steps button').forEach(b=>{
  const selected=b.dataset.topic===leaf;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));b.classList.toggle('visited',visited.has('identity-you:'+b.dataset.topic));
 });
}
function renderIdentityPanel(){
 const i=PHILOSOPHER_STEPS.findIndex(s=>s.name===leaf),step=PHILOSOPHER_STEPS[i],answer=step?reflections[step.name]:null;
 const related=step?[step.related]:current.related;
 $('#detail').innerHTML=`<div class="detail-top"><span class="eyebrow">${step?'REPLACEMENT '+String(i+1).padStart(2,'0')+' / 07':'THE IDENTITY PROBLEM'}</span>${step?'<button id="branch-overview" aria-label="Return to You overview">↩</button>':'<span>◇</span>'}</div><div class="detail-art ${step?'has-topic':''}">${step?topicVisual(step.name):art('identity-you')}</div>${step?`<div class="visual-caption"><span>Conceptual illustration · not a medical procedure</span><p>${TOPIC_VISUALS[step.name].caption}</p></div>`:''}<div class="chapter">THE PHILOSOPHER / YOU ${step?'/ '+String(i+1).padStart(2,'0'):''}</div><h2 class="${step&&step.name.length>25?'long-heading':''}">${step?step.name:'You'}</h2><p class="subtitle">${step?step.status:'One person. Seven replacements.'}</p><p class="description">${step?step.description:current.description}</p>${step?`<section class="reflection"><div class="eyebrow">THE QUESTION</div><h3>${step.question}</h3><p>At this stage, is it still you?</p><div class="reflection-options" role="group" aria-label="Your view on personal identity">${[['same','Still me'],['different','Not me'],['unsure','Unsure']].map(([value,label])=>`<button data-reflection="${value}" aria-pressed="${answer===value}" class="${answer===value?'selected':''}">${label}</button>`).join('')}</div><small id="reflection-saved" aria-live="polite">${answer?'Your reflection is saved in this browser. You can change it.':'Optional. There is no correct answer; you may change your mind.'}</small></section><div class="identity-lenses"><div class="section-label">TWO WAYS TO LOOK AT IT</div>${step.lenses.map(([title,text])=>`<div><strong>${title}</strong><p>${text}</p></div>`).join('')}</div><div class="premise-note"><span>◇</span><p>${step.caveat}</p></div>`:`<div class="relevance"><h3>◇ What are we preserving?</h3><p>${current.relevance}</p></div><div class="identity-intro-note">Begin with real-world bodily change. Later steps deliberately move beyond present technology. Neither functional similarity nor your answers settle whether consciousness or personal identity survives.</div>`}
 <div class="experiment-navigation">${step?`<button data-sequence-step="${i-1}" class="previous-step">← ${i===0?'Overview':'Previous'}</button>`:''}<button class="next-step" data-sequence-step="${step?(i===6?'summary':i+1):0}">${!step?'Begin the thought experiment':i===6?'Analyze my reflections':'Next replacement'} <span>→</span></button></div>${step?'<button class="identity-ask" id="explore-detail">✧ Ask Atlas about this question <span>↗</span></button>':''}<button class="reflection-analysis-entry" data-open-analysis>◇ View my reflection analysis <span>↗</span></button><div class="related"><small>CONNECT TO THE SCIENCE</small><div>${related.map(id=>{const a=ATLAS.find(a=>a.id===id);return `<button data-category="${id}" title="Switch to The Scientist">${a.shortName||a.name} ↗</button>`}).join('')}</div><div class="source-note">PHILOSOPHY OF PERSONAL IDENTITY<br>A thought experiment, not a test of consciousness.</div>`;
 updateIdentitySelection();
 $('#chat-context').textContent='EXPLORING / The Philosopher / Identity Problem / '+(leaf||'You');
 $('.map-hint').innerHTML='<span>◇</span> '+(leaf?'Your view is a starting point—not a verdict.':'Follow the numbered replacements.');
 $('.human').style.opacity='.85';$('#detail').scrollTop=0;
}
function saveReflection(value){
 if(!leaf||!['same','different','unsure'].includes(value))return;
 reflections[leaf]=value;try{localStorage.setItem('continuum-reflections',JSON.stringify(reflections))}catch{}
 document.querySelectorAll('[data-reflection]').forEach(b=>{b.classList.toggle('selected',b.dataset.reflection===value);b.setAttribute('aria-pressed',String(b.dataset.reflection===value));});
 $('#reflection-saved').textContent='Your reflection is saved in this browser. You can change it.';
}
function identitySummary(){openIdentityAnalysis();}
document.addEventListener('click',e=>{
 if(e.target.closest('#workspace-path-button'))showPathways();
 const p=e.target.closest('button[data-pathway]');if(p&&!p.disabled){const choice=ATLAS_PATHWAYS.find(a=>a.id===p.dataset.pathway);if(choice&&!choice.disabled){$('#modal').close();const previous=pathwaySelections[choice.id];select(previous?.id||choice.entry,previous?.topic||null);}}
 const n=e.target.closest('[data-sequence-step]');if(n){if(n.dataset.sequenceStep==='summary'){identitySummary()}else{if($('#modal').open)$('#modal').close();const i=Number(n.dataset.sequenceStep);select('identity-you',i>=0?PHILOSOPHER_STEPS[i]?.name:null);}}
 const r=e.target.closest('[data-reflection]');if(r)saveReflection(r.dataset.reflection);
 const review=e.target.closest('[data-review-step]');if(review){$('#modal').close();select('identity-you',review.dataset.reviewStep);}
});
