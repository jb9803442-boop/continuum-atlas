import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const b=await chromium.launch({args:['--no-sandbox']});
try{
 const p=await b.newPage({viewport:{width:1440,height:1000}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://localhost:3000/atlas.html');await p.evaluate(()=>{localStorage.setItem('continuum-visited',JSON.stringify(['cells:DNA','aging-mechanisms:Telomere attrition']));localStorage.removeItem('continuum-reflections')});await p.reload();
 assert.equal(await p.locator('#progress-count').textContent(),'2 / 71');assert.equal(await p.locator('#domain-tabs button').count(),3);
 async function switchPath(id,mobile=false){await p.locator(mobile?'#workspace-path-button':'#path-button').click();await p.locator(`button[data-pathway="${id}"]`).click();}
 await p.locator('#path-button').click();assert.equal(await p.locator('button[data-pathway="futurist"]').isDisabled(),false);await p.locator('button[data-pathway="philosopher"]').click();
 assert.equal(await p.locator('.path-button strong').textContent(),'The Philosopher');assert.equal(await p.locator('#domain-tabs button').count(),3);assert.equal(await p.locator('#progress-count').textContent(),'0 / 24');assert.equal(await p.locator('.detail h2').textContent(),'You');
 const names=await p.evaluate(()=>PHILOSOPHER_STEPS.map(s=>s.name));assert.equal(names.length,7);assert.deepEqual(await p.locator('.identity-step').evaluateAll(nodes=>nodes.map(n=>n.dataset.topic)),names);
 await p.locator('.next-step').click();const sources=new Set(),artworks=new Set();
 for(let i=0;i<names.length;i++){
   assert.equal(await p.locator('.detail h2').textContent(),names[i]);
   await p.waitForFunction(()=>document.querySelector('.detail-art img').complete&&document.querySelector('.detail-art img').naturalWidth>0);
   const src=await p.locator('.detail-art img').getAttribute('src');sources.add(src);artworks.add(fs.readFileSync('public/'+src.replace('./',''),'utf8').replace(/<title.*?<\/title>|<desc.*?<\/desc>/g,''));
   assert.equal(await p.locator('#canvas img:not(.human)').count(),0);assert.equal(await p.locator('.identity-step.active').getAttribute('data-topic'),names[i]);assert.equal(await p.locator('#focus-visual').count(),0);
   const opinion=i<4?'same':i<6?'unsure':'different';await p.locator(`[data-reflection="${opinion}"]`).click();assert.equal(await p.locator(`[data-reflection="${opinion}"]`).getAttribute('aria-pressed'),'true');
   if(i===4)await p.screenshot({path:'philosopher-desktop.png',animations:'disabled'});
   await p.locator('.next-step').click();
 }
 assert.equal(sources.size,7);assert.equal(artworks.size,7);assert.equal(await p.locator('#progress-count').textContent(),'7 / 24');assert.equal(await p.locator('.reflection-summary li').count(),7);assert.match(await p.locator('#modal-content').textContent(),/Not me/);
 await p.locator('[data-review-step="Replace entire biological substrate"]').click();assert.equal(await p.locator('[data-reflection="different"]').getAttribute('aria-pressed'),'true');
 await p.locator('[data-reflection="unsure"]').click();await p.locator('.previous-step').click();assert.equal(await p.locator('.detail h2').textContent(),names[5]);
 await switchPath('scientist');assert.equal(await p.locator('#progress-count').textContent(),'2 / 71');assert.equal(await p.locator('#domain-tabs button').count(),3);await switchPath('philosopher');assert.equal(await p.locator('.detail h2').textContent(),names[5]);
 await p.locator('.related [data-category="nervous"]').click();assert.equal(await p.locator('.path-button strong').textContent(),'The Scientist');assert.equal(await p.locator('.detail h2').textContent(),'Nervous System');await switchPath('philosopher');
 let payload;
 await p.route('**/*atlas_api=chat*',async route=>{payload=route.request().postDataJSON();await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({text:'This is an open philosophical question.'})});});
 await p.locator('#explore-detail').click();await p.locator('#chat-form button').click();await p.waitForFunction(()=>!document.querySelector('#chat-form button').disabled);
 assert.match(payload.context,/The Philosopher/);assert.match(payload.context,/not a demonstrated technology/);assert.equal(await p.locator('.message.bot').last().textContent(),'This is an open philosophical question.');await p.locator('#close-chat').click();
 for(const width of [390,320]){
  await p.setViewportSize({width,height:844});await switchPath('scientist',true);await switchPath('philosopher',true);
  await p.locator('.identity-step').nth(6).click();assert.equal(await p.locator('.detail h2').textContent(),names[6]);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await p.locator('h1').scrollIntoViewIfNeeded();await p.screenshot({path:`philosopher-mobile-${width}.png`,animations:'disabled'});
 }
 await p.reload();await switchPath('philosopher',true);await p.locator('.identity-step').nth(6).click();assert.equal(await p.locator('[data-reflection="unsure"]').getAttribute('aria-pressed'),'true');assert.equal(await p.locator('#progress-count').textContent(),'7 / 24');
 await p.locator('#journey').click();assert.match(await p.locator('#modal-content').textContent(),/9 of 141/);assert.match(await p.locator('#modal-content').textContent(),/Identity Problem/);assert.deepEqual(errors,[]);
 console.log('PASS: separate pathways and progress, ordered 7-step experiment, 7 unique side-only illustrations, next/previous/overview, optional editable reflections, summary, persistence, cross-pathway links, grounded chat context (mocked transport), enabled third pathway, 390/320 mobile switches. No browser errors.');
}finally{await b.close()}
