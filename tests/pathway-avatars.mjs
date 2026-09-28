import {chromium} from 'playwright';import assert from 'node:assert/strict';
const b=await chromium.launch({args:['--no-sandbox']});
try{
 const p=await b.newPage({viewport:{width:1440,height:1000}});const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://localhost:3000/atlas.html');
 const cases=[['scientist','anatomy-clear.png'],['philosopher','philosopher-male-avatar.png'],['futurist','futurist-male-avatar.png'],['scientist','anatomy-clear.png']];
 for(const [id,file] of cases){
  await p.locator('#workspace-path-button').click();await p.locator(`button[data-pathway="${id}"]`).click();await p.waitForFunction(()=>{const im=document.querySelector('.human');return im.complete&&im.naturalWidth>0});
  assert.equal(await p.locator('.human').getAttribute('src'),'./'+file);assert.equal(await p.locator('#avatar-viewport img').count(),1);
  const dims=await p.evaluate(()=>{const a=document.querySelector('.human').getBoundingClientRect(),v=document.querySelector('#avatar-viewport').getBoundingClientRect();return {fits:a.top>=v.top&&a.bottom<=v.bottom&&a.left>=v.left&&a.right<=v.right}});assert.ok(dims.fits);
  const tabs=await p.locator('#domain-tabs button').count();for(let i=0;i<tabs;i++){await p.locator('#domain-tabs button').nth(i).click();assert.equal(await p.locator('.human').getAttribute('src'),'./'+file);}
  await p.locator('#zoom-in').click();assert.equal(await p.locator('#zoom-label').textContent(),'125%');assert.equal(await p.locator('#inspect-body').getAttribute('aria-pressed'),'false');assert.equal(await p.locator('#map-nodes button').first().isVisible(),true);await p.locator('#fit').click();
  if(id!=='scientist'){await p.locator('#domain-tabs button').first().click();await p.screenshot({path:`${id}-avatar-desktop.png`,animations:'disabled'});}
 }
 await p.setViewportSize({width:390,height:844});await p.locator('#workspace-path-button').click();await p.locator('button[data-pathway="futurist"]').click();await p.waitForFunction(()=>document.querySelector('.human').complete);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.deepEqual(errors,[]);
 console.log('PASS: correct pathway figures across all categories, Scientist restored, full-body fit, single central figure, zoom retains topic visibility, mobile layout, no JS errors.');
}finally{await b.close()}
