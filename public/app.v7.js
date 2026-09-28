const $=s=>document.querySelector(s);let current=ATLAS[0],leaf=null,zoom=100,visited=new Set();try{visited=new Set(JSON.parse(localStorage.getItem('continuum-visited')||'[]'))}catch{}let history=[];
function art(type){const branchVisual=window.AGING_BRANCH_VISUALS?.[type]||window.DISEASE_DEATH_BRANCH_VISUALS?.[type];if(branchVisual){const v=branchVisual;return `<img class="branch-illustration" src="${v.src}" alt="${v.alt}">`;}let body='';if(type==='cell')body=`<ellipse cx="60" cy="60" rx="45" ry="40" fill="url(#cellfill)" stroke="#97bea7" stroke-width="1.5"/><ellipse cx="60" cy="60" rx="40" ry="35" fill="none" stroke="#6b9b81" stroke-width=".5" stroke-dasharray="2 2"/><path d="M23 55 Q32 15 69 25M37 91Q79 104 99 64" fill="none" stroke="#c0d6a6" opacity=".6"/><ellipse cx="65" cy="55" rx="17" ry="15" fill="#597760" stroke="#b0c79c"/><ellipse cx="67" cy="53" rx="7" ry="6" fill="#a7b993"/><g fill="#96ba96" opacity=".8"><ellipse cx="35" cy="58" rx="8" ry="4" transform="rotate(40 35 58)"/><ellipse cx="76" cy="83" rx="9" ry="4" transform="rotate(-35 76 83)"/><ellipse cx="38" cy="78" rx="6" ry="3"/><ellipse cx="85" cy="40" rx="5" ry="3"/></g><g fill="#bdd1a6"><circle cx="51" cy="34" r="2"/><circle cx="86" cy="64" r="2"/><circle cx="52" cy="80" r="2"/><circle cx="30" cy="43" r="1.5"/></g>`;
if(type==='dna'){for(let y=12;y<109;y+=8){let x=60+24*Math.sin(y/16),x2=120-x;body+=`<path d="M${x} ${y}L${x2} ${y}" stroke="#7aab9b" stroke-width="2" opacity=".6"/><circle cx="${x}" cy="${y}" r="3" fill="#badbcc"/><circle cx="${x2}" cy="${y}" r="3" fill="#729b9c"/>`}body+='<path d="M77 10C112 40 9 59 43 88S80 110 80 110M43 10C8 40 111 59 77 88S40 110 40 110" fill="none" stroke="#a0cabc" stroke-width="2"/>'}
if(type==='neuron')body=`<g stroke="#accac0" fill="none" stroke-linecap="round"><path d="M57 52L35 28 29 8M35 28L13 21M57 52L76 27 76 10M76 27L99 17M57 52L26 56 9 46M26 56L9 73M57 52L83 56 110 41M83 56L100 76M57 52L47 81 20 96M47 81L46 108M57 52Q68 83 76 92L79 114M76 92L99 104" stroke-width="2"/><path d="M28 17L40 10M17 22L12 10M83 24L89 7M19 55L7 58M91 51L107 59M35 88L25 77M73 85L87 82M79 102L65 111" stroke-width="1"/></g><path d="M54 38L63 43 72 45 70 55 77 64 64 61 57 73 52 61 38 63 45 51 43 41Z" fill="#8dac9f"/><circle cx="57" cy="53" r="7" fill="#d4dfca"/>`;
if(type==='heart')body=`<path d="M61 36C49 15 25 28 28 52C28 75 49 89 68 106C73 85 94 70 94 51C94 33 77 26 68 40L70 18L61 13Z" fill="url(#heartfill)" stroke="#c4a599" stroke-width="1.5"/><path d="M55 37L47 15L38 19L47 44M73 39L83 19L76 13L63 34" fill="#8b7771" stroke="#c6ada1"/><path d="M57 47Q64 66 68 99M61 63L42 53M65 78L83 61M65 73L47 72M71 63L82 48" fill="none" stroke="#d6c3b0" stroke-width="1.5"/><path d="M35 46Q33 66 50 78" fill="none" stroke="#e5c1a1" opacity=".5"/>`;
if(type==='balance')body=`<g fill="none" stroke="#aec5c0"><circle cx="60" cy="60" r="37" stroke-width=".6" stroke-dasharray="2 4"/><ellipse cx="60" cy="60" rx="45" ry="18" transform="rotate(-35 60 60)"/><ellipse cx="60" cy="60" rx="45" ry="18" transform="rotate(35 60 60)"/><ellipse cx="60" cy="60" rx="45" ry="18" transform="rotate(90 60 60)"/></g><circle cx="60" cy="60" r="11" fill="#8bb4a1"/><circle cx="60" cy="60" r="5" fill="#d2e0bd"/><g fill="#bfd4b8"><circle cx="23" cy="37" r="5"/><circle cx="91" cy="85" r="4"/><circle cx="64" cy="16" r="4"/></g>`;
return `<svg viewBox="0 0 120 120" aria-hidden="true"><defs><radialGradient id="cellfill"><stop stop-color="#7b977766"/><stop offset=".8" stop-color="#3f624d88"/><stop offset="1" stop-color="#8cab7755"/></radialGradient><linearGradient id="heartfill"><stop stop-color="#ad9984"/><stop offset=".5" stop-color="#806e63"/><stop offset="1" stop-color="#3d4542"/></linearGradient></defs>${body}</svg>`}
// Category and branch navigation share one connected atlas, not separate pages.
function domain(){return ATLAS_DOMAINS.find(d=>d.id===current.domain)}
function branches(d=domain()){return ATLAS.filter(a=>a.domain===d.id)}
function topicCount(items){return items.reduce((sum,a)=>sum+Object.keys(a.topics).length,0)}
const totalTopics=topicCount(ATLAS);
const validVisits=new Set(ATLAS.flatMap(a=>Object.keys(a.topics).map(t=>a.id+':'+t)));
visited=new Set([...visited].filter(key=>validVisits.has(key)));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function topicVisual(topic){const v=TOPIC_VISUALS[topic];return `<img class="topic-illustration" src="${v.src}" alt="${esc(v.alt)}" width="240" height="200" data-visual-topic="${esc(topic)}">`;}
function renderMap(){
 const d=domain();
 $('#knowledge-sections').innerHTML=ATLAS_DOMAINS.map(section=>`<button class="biology domain-button ${section.id===d.id?'current-domain':''}" data-domain="${section.id}" aria-expanded="${section.id===d.id}"><span>${section.symbol}</span><strong>${section.name}</strong><small>${topicCount(branches(section))}</small><span>${section.id===d.id?'−':'+'}</span></button><div class="tree" ${section.id===d.id?'':'hidden'}>${branches(section).map(a=>`<button data-category="${a.id}" title="${esc(a.name)}">${art(a.icon)}<span class="tree-name">${a.shortName||a.name}</span><span class="number">${Object.keys(a.topics).length.toString().padStart(2,'0')}</span></button>`).join('')}</div>`).join('');
 $('#domain-tabs').innerHTML=ATLAS_DOMAINS.map(section=>`<button data-domain="${section.id}" class="${section.id===d.id?'active':''}" aria-pressed="${section.id===d.id}"><span>${section.symbol}</span> ${section.name}<small>${topicCount(branches(section))}</small></button>`).join('');
 $('.workspace').dataset.domain=d.id;
 $('.breadcrumb').innerHTML='The Scientist <span>/</span> '+d.name;
 $('h1').textContent=d.title;
 $('.workspace-heading p').textContent=d.subtitle;
 $('.sidebar-note h3').innerHTML=d.noteTitle;
 $('.sidebar-note p').textContent=d.note;
 $('.bottom-context p').textContent=d.context;
 $('.bottom-count').innerHTML=`${branches().length} ${d.unit} <span>·</span> ${topicCount(branches())} concepts`;
 const positions=d.nodePositions||(d.id==='aging'?[[22,23],[78,26],[22,69],[80,72]]:null);
 $('#map-nodes').innerHTML=branches().map((a,i)=>`<button class="node" data-id="${a.id}" data-category="${a.id}" ${positions?`style="left:${positions[i][0]}%;top:${positions[i][1]}%"`:''} aria-label="Explore ${esc(a.name)}"><span class="node-art">${art(a.icon)}</span><strong>${a.shortName||a.name}</strong><small>${a.subtitle}</small></button>`).join('');
 $('.connections').innerHTML=d.id==='disease-death'?'<path d="M176 248 Q287 199 400 230 M632 395 Q522 420 400 345"/><circle cx="400" cy="230" r="3"/><circle cx="400" cy="345" r="3"/>':d.id==='aging'?'<path d="M176 154 Q280 132 400 205 M624 174 Q518 160 400 205 M176 462 Q287 392 400 320 M640 482 Q520 415 400 390"/><circle cx="400" cy="205" r="3"/><circle cx="400" cy="320" r="3"/><circle cx="400" cy="390" r="3"/>':'<path d="M180 145 Q295 135 400 205 M622 170 Q510 140 400 205 M153 345 Q288 285 400 295 M646 402 Q525 350 400 320 M205 550 Q303 470 400 390"/><circle cx="400" cy="205" r="3"/><circle cx="400" cy="295" r="3"/><circle cx="400" cy="320" r="3"/><circle cx="400" cy="390" r="3"/>';
}
let activeDomain=null;
function select(id,topic=null){
 const next=ATLAS.find(a=>a.id===id);if(!next||(topic&&!Object.hasOwn(next.topics,topic)))return;
 current=next;leaf=topic;
 if(activeDomain!==current.domain){renderMap();activeDomain=current.domain;}
 if(topic){visited.add(id+':'+topic);try{localStorage.setItem('continuum-visited',JSON.stringify([...visited]))}catch{}}
 document.querySelectorAll('[data-category]').forEach(el=>{el.classList.toggle('active',el.dataset.category===id);el.classList.toggle('selected',el.dataset.category===id);el.setAttribute('aria-pressed',String(el.dataset.category===id));});
 render();progress();
}
function render(){
 const d=domain(),siblings=branches(),i=siblings.indexOf(current);
 const related=(current.related||[siblings[(i+1)%siblings.length].id,siblings[(i+3)%siblings.length].id]).map(id=>ATLAS.find(a=>a.id===id));
 $('#detail').innerHTML=`<div class="detail-top"><span class="eyebrow">${leaf?'CONCEPT IN FOCUS':d.overviewLabel||(d.id==='aging'?'AGING OVERVIEW':'SYSTEM OVERVIEW')}</span>${leaf?'<button id="branch-overview" aria-label="Return to branch overview" title="Return to overview">↩</button>':'<span>⌗</span>'}</div><div class="detail-art ${leaf?'has-topic':''}">${leaf?topicVisual(leaf):art(current.icon)}</div>${leaf?`<div class="visual-caption"><span>${TOPIC_VISUALS[leaf].kind} · not to scale</span><p>${TOPIC_VISUALS[leaf].caption}</p></div>`:''}<div class="chapter">${d.name.toUpperCase()} / 0${i+1}${leaf?' / CONCEPT':''}</div><h2 class="${(leaf||current.name).length>25?'long-heading':''}">${leaf||current.name}</h2><p class="subtitle">${leaf?(current.shortName||current.name)+' · '+current.subtitle:current.subtitle}</p><p class="description">${leaf?current.topics[leaf]:current.description}</p><div class="section-label">${leaf?'EXPLORE THIS BRANCH':d.id!=='biology'?'EXPLORE THE CONCEPTS':'EXPLORE THE BUILDING BLOCKS'}<span>${Object.keys(current.topics).length} topics</span></div><div class="topic-list ${d.id!=='biology'?'aging-topics':''}">${Object.keys(current.topics).map(t=>`<button data-topic="${esc(t)}" class="${leaf===t?'active':''}">${t}<span>${visited.has(current.id+':'+t)?'✓':'↗'}</span></button>`).join('')}</div><div class="relevance"><h3><span>✧</span> Why it matters for longevity</h3><p>${current.relevance}</p></div><button class="explore-button" id="explore-detail">${leaf?'Ask Atlas about this concept':'Explore '+(current.shortName||current.name)}<span>→</span></button><div class="related"><small>CONNECTED TO</small><div>${related.map(a=>`<button data-category="${a.id}" title="${ATLAS_DOMAINS.find(x=>x.id===a.domain).name}">${a.shortName||a.name} ↗</button>`).join('')}</div><div class="source-note">${d.sourceLabel||(d.id==='aging'?'AGING SCIENCE':'FOUNDATIONAL BIOLOGY')} · CURATED OVERVIEW<br>Longevity is a field of research, not a promise.</div>`;
 $('.human').style.opacity='.85';
 $('#chat-context').textContent='EXPLORING / '+d.name+' / '+current.name+(leaf?' / '+leaf:'');
 $('.map-hint').innerHTML='<span>◎</span> '+(leaf?'Concept illustration in the overview panel':'Select a '+(d.id!=='biology'?'branch':'system')+' to begin exploring');
 $('#detail').scrollTop=0;
}
function progress(){
 $('#visited-count').textContent=visited.size;
 $('#progress-count').textContent=visited.size+' / '+totalTopics;
 $('#progress-bar').style.width=(visited.size/totalTopics*100)+'%';
}
document.addEventListener('click',e=>{
 const section=e.target.closest('button[data-domain]'),category=e.target.closest('[data-category]'),topic=e.target.closest('[data-topic]');
 if(section){const d=ATLAS_DOMAINS.find(d=>d.id===section.dataset.domain);select(d.branches[0]);}
 if(category)select(category.dataset.category);
 if(topic)select(current.id,topic.dataset.topic);
 if(e.target.closest('#branch-overview'))select(current.id);
 if(e.target.closest('#explore-detail')){if(leaf){openChat();$('#chat-input').value='How does '+leaf+' relate to aging?';$('#chat-input').focus();}else select(current.id,Object.keys(current.topics)[0]);}
 const suggestion=e.target.closest('[data-question]');if(suggestion)send(suggestion.dataset.question);
});
$('#path-button').onclick=()=>{$('#path-menu').hidden=!$('#path-menu').hidden};
$('#explore').onclick=()=>{select(domain().branches[0]);window.scrollTo({top:0,behavior:'smooth'})};
function zoomTo(n){zoom=Math.max(70,Math.min(150,n));$('.human').style.transform=`translate(-50%,-50%) scale(${zoom/100})`;$('#zoom-label').textContent=zoom+'%'}
$('#zoom-in').onclick=()=>zoomTo(zoom+10);$('#zoom-out').onclick=()=>zoomTo(zoom-10);$('#fit').onclick=()=>zoomTo(100);$('#reset').onclick=()=>{zoomTo(100);select(domain().branches[0])};
function modal(content){$('#modal-content').innerHTML=content;$('#modal').showModal()}
$('#about').onclick=()=>modal(`<div class="eyebrow">THE HUMAN POSSIBILITY</div><h2>Life is a connected story.</h2><p>Explore the Scientist pathway through Human Biology, Aging, and Disease &amp; Death: ${ATLAS.length} branches and ${totalTopics} concepts in one connected atlas.</p><p>Human Biology explores the systems that sustain life. Aging connects evolutionary theories, selected mechanisms, accumulated damage, and whole-person consequences. Disease &amp; Death separates causes that threaten life from the biological scales at which death is discussed.</p><p>The Aging map follows ten selected mechanisms, not every hallmark included in published frameworks. Debated theories and conceptual illustrations are labeled accordingly.</p><p>Extending healthy life is an active scientific goal; human immortality is not an established medical possibility. Death-related illustrations are educational, not diagnostic criteria. Two other pathways remain reserved for future exploration.</p>`);
$('#journey').onclick=()=>modal(`<div class="eyebrow">YOUR EXPLORATION</div><h2>Every discovery counts.</h2><p>You’ve explored ${visited.size} of ${totalTopics} concepts. Your progress is saved in this browser.</p>${ATLAS_DOMAINS.map(d=>{const items=[...visited].filter(v=>ATLAS.find(a=>a.id===v.split(':')[0]).domain===d.id);return `<h3>${d.name} <small>${items.length} / ${topicCount(branches(d))}</small></h3>${items.length?'<ul>'+items.map(v=>{const [id,t]=v.split(':');return `<li><button data-journey-id="${id}" data-journey-topic="${esc(t)}">${esc(t)} ↗</button></li>`}).join('')+'</ul>':'<p>Choose a branch and a concept to begin.</p>'}`}).join('')}`);
$('#modal-content').addEventListener('click',e=>{const b=e.target.closest('[data-journey-id]');if(b){$('#modal').close();select(b.dataset.journeyId,b.dataset.journeyTopic)}});
$('#close-modal').onclick=()=>$('#modal').close();$('#modal').onclick=e=>{if(e.target===$('#modal'))$('#modal').close()};
function openChat(){$('#chat').hidden=false;$('#chat-input').focus()}
$('#open-chat').onclick=()=>$('#chat').hidden?openChat():$('#chat').hidden=true;$('#close-chat').onclick=()=>$('#chat').hidden=true;
function message(text,role){let div=document.createElement('div');div.className='message '+role;div.textContent=text;$('#messages').append(div);$('#messages').scrollTop=$('#messages').scrollHeight;return div}let sending=false;
const chatBuild='7';
$('.chat-disclaimer').textContent='Atlas v'+chatBuild+' · AI can make mistakes. Not medical advice.';
async function chatRequest(payload){
  const endpoint=new URL(window.location.href);
  endpoint.hash='';endpoint.searchParams.set('atlas_api','chat');
  endpoint.searchParams.set('chat_version',chatBuild);
  let response;
  try{response=await fetch(endpoint,{method:'POST',credentials:'same-origin',cache:'no-store',signal:AbortSignal.timeout(55000),headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)});}
  catch(e){throw new Error(e.name==='TimeoutError'?'Atlas took too long to respond. Please retry.':'Atlas could not connect. Check your connection and reopen this app in Arena’s Live Preview.');}
  const raw=await response.text();
  if(!response.headers.get('content-type')?.includes('application/json')||raw.trimStart().startsWith('<')){
    throw new Error('The preview returned a webpage instead of a chat response. Reopen “Continuum — Biology Atlas” in Arena’s Live Preview, then try again.');
  }
  let data;try{data=JSON.parse(raw);}catch{throw new Error('Atlas received an unreadable service response. Please retry.');}
  if(!response.ok)throw new Error(data.error||(response.status===403?'Your preview session has expired. Reopen the app from Arena’s Live Preview.':'The chat service is unavailable. Please retry.'));
  if(typeof data.text!=='string'||!data.text.trim())throw new Error('Atlas returned an empty answer. Please retry.');
  return data.text;
}
async function send(q){
  q=q.trim();if(sending||!q)return;
  sending=true;message(q,'user');$('#chat-input').value='';$('#chat-form button').disabled=true;
  const wait=message('Connecting the dots…','bot');
  try{
    const text=await chatRequest({message:q,context:domain().name+' / '+current.name+': '+current.description+' '+(leaf?leaf+': '+current.topics[leaf]:''),history});
    wait.textContent=text;history.push({role:'user',parts:[{text:q}]},{role:'model',parts:[{text}]});
  }catch(e){
    wait.textContent=e.message;wait.classList.add('error');
    const retry=document.createElement('button');retry.textContent='Retry question ↻';retry.className='chat-retry';
    retry.onclick=()=>{if(!sending){wait.remove();send(q)}};wait.append(document.createElement('br'),retry);
  }finally{sending=false;$('#chat-form button').disabled=false;$('#messages').scrollTop=$('#messages').scrollHeight;}
}
$('#chat-form').onsubmit=e=>{e.preventDefault();send($('#chat-input').value)};select('cells');
