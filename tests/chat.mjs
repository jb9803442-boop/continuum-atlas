import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const b=await chromium.launch({args:['--no-sandbox']});
try{
const p=await b.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto('http://localhost:3000/atlas.html');await p.locator('#open-chat').click();assert.match(await p.locator('.chat-disclaimer').textContent(),/Atlas v16/);
async function ask(q){await p.locator('#chat-input').fill(q);await p.locator('#chat-form button').click();await p.waitForFunction(()=>!document.querySelector('#chat-form button').disabled,null,{timeout:60000});return p.locator('.message.bot').last().textContent();}
const live=await ask('What does the nucleus do? Answer in two short sentences.');console.log('Live browser response:',live);assert.equal(await p.locator('.message.bot').last().evaluate(e=>e.classList.contains('error')),false,'Live request must return an AI answer');
await p.route('**/*atlas_api=chat*',r=>r.fulfill({status:502,contentType:'text/html',body:'<!DOCTYPE html><html>Proxy error</html>'}));
const bad=await ask('What is DNA?');assert.match(bad,/preview returned a webpage/);assert.ok(!bad.includes('Unexpected token'));assert.ok(!bad.includes('From the atlas'));assert.equal(await p.locator('.chat-retry').count(),1);console.log('HTML response: safely handled, with retry.');
await p.unroute('**/*atlas_api=chat*');await p.route('**/*atlas_api=chat*',r=>r.fulfill({status:200,contentType:'application/json',body:JSON.stringify({text:'Retry succeeded.'})}));await p.locator('.chat-retry').click();await p.waitForFunction(()=>!document.querySelector('#chat-form button').disabled);assert.equal(await p.locator('.message.bot').last().textContent(),'Retry succeeded.');assert.deepEqual(errors,[]);console.log('Retry: passed. Browser errors: none.');
}finally{await b.close();}
