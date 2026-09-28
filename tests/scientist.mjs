import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const b=await chromium.launch({args:['--no-sandbox']});
try{
 const page=await b.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3000/atlas.html');
 await page.evaluate(()=>localStorage.setItem('continuum-visited',JSON.stringify(['cells:DNA','aging-mechanisms:Telomere attrition'])));await page.reload();
 assert.equal(await page.locator('#progress-count').textContent(),'2 / 71');
 assert.equal(await page.locator('#domain-tabs button').count(),3);
 const systems=await page.evaluate(()=>ATLAS.filter(a=>ATLAS_DOMAINS.find(d=>d.id===a.domain).pathway==='scientist').map(a=>({id:a.id,domain:a.domain,topics:Object.keys(a.topics)})));
 assert.equal(systems.filter(a=>a.domain==='disease-death').reduce((n,a)=>n+a.topics.length,0),14);
 const sources=new Set(),artworks=new Set();
 for(const system of systems){
   await page.locator(`#domain-tabs [data-domain="${system.domain}"]`).click();
   await page.locator(`.node[data-id="${system.id}"]`).click();
   for(const name of system.topics){
     await page.locator(`[data-topic="${name}"]`).click();
     assert.equal(await page.locator('.detail h2').textContent(),name);
     await page.waitForFunction(()=>[...document.querySelectorAll('.topic-illustration')].every(i=>i.complete&&i.naturalWidth>0));
     const img=page.locator('.detail-art .topic-illustration');assert.equal(await img.count(),1);
     assert.equal(await page.locator('#canvas .topic-illustration').count(),0);
     assert.equal(await page.locator('#focus-visual').count(),0);
     assert.equal(await page.locator('.human').evaluate(e=>getComputedStyle(e).opacity),'0.85');
     const src=await img.getAttribute('src');sources.add(src);
     artworks.add(fs.readFileSync('public/'+src.replace('./',''),'utf8').replace(/<title.*?<\/title>|<desc.*?<\/desc>/g,''));
     assert.match(await page.locator('#chat-context').textContent(),new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
   }
 }
 assert.equal(sources.size,71);assert.equal(artworks.size,71);
 assert.equal(await page.locator('#progress-count').textContent(),'71 / 71');
 await page.locator('#journey').click();assert.match(await page.locator('#modal-content').textContent(),/71 of 141/);assert.match(await page.locator('#modal-content').textContent(),/Disease & Death/);await page.locator('#close-modal').click();
 await page.locator('#domain-tabs [data-domain="disease-death"]').click();
 assert.equal(await page.locator('#map-nodes .node').count(),2);assert.equal(await page.locator('h1').textContent(),'The limits of living.');
 assert.equal(await page.locator('.topic-list button').count(),9);
 await page.locator('.node[data-id="death-levels"]').click();assert.equal(await page.locator('.topic-list button').count(),5);
 await page.locator('[data-topic="Brain death"]').click();assert.match(await page.locator('.description').textContent(),/not coma/);
 await page.screenshot({path:'disease-death-desktop.png',animations:'disabled'});
 await page.locator('#branch-overview').click();assert.equal(await page.locator('.detail h2').textContent(),'Death');
 await page.locator('.related [data-category="homeostasis"]').click();assert.equal(await page.locator('h1').textContent(),'The biology of being.');
 for(const width of [390,320]){
   await page.setViewportSize({width,height:844});await page.locator('#domain-tabs [data-domain="disease-death"]').click();
   assert.equal(await page.locator('#map-nodes .node').count(),2);
   await page.locator('.node[data-id="death-levels"]').click();await page.locator('[data-topic="Loss of integrated biological function"]').click();
   assert.equal(await page.locator('.detail h2').textContent(),'Loss of integrated biological function');
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'No mobile horizontal overflow');
   await page.locator('.detail h2').scrollIntoViewIfNeeded();await page.screenshot({path:`disease-death-mobile-${width}.png`,animations:'disabled'});
 }
 await page.reload();assert.equal(await page.locator('#progress-count').textContent(),'71 / 71');assert.deepEqual(errors,[]);
 console.log('PASS: all 71 distinct illustrations and topic selections; 3 categories; 14 new topics; 2 separate new branches; images only in side panel; preserved progress; cross-category connections; chat context; return navigation; 320px and 390px mobile layouts. No browser errors.');
}finally{await b.close()}
