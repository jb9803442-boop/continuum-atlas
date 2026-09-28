import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const box={ATLAS_DOMAINS:[],ATLAS:[]};box.window=box;vm.createContext(box);vm.runInContext(fs.readFileSync('public/philosopher-data.js','utf8'),box);vm.runInContext(fs.readFileSync('public/identity-reasoning.js','utf8'),box);
const R=box.IdentityReasoning,steps=box.PHILOSOPHER_STEPS;
function profile(values){return R.inspect(steps,Object.fromEntries(steps.map((s,i)=>[s.name,values[i]])))}
assert.equal(profile(Array(7).fill('same')).kind,'accepting');assert.equal(profile(Array(7).fill('different')).kind,'rejecting');assert.equal(profile(Array(7).fill('unsure')).kind,'uncertain');assert.equal(profile([]).kind,'empty');
assert.equal(profile(['same','same','same','same','different','different','different']).kind,'boundary');assert.equal(profile(['same','different','same','unsure','same','different','same']).kind,'return');assert.equal(profile(['same','same','same','same','unsure','unsure','unsure']).kind,'hesitant');
let n=0;
for(let v=0;v<4**7;v++){
 let num=v,vals=[];for(let i=0;i<7;i++){vals.push([null,'same','different','unsure'][num%4]);num=Math.floor(num/4)}
 const p=profile(vals);assert.equal(p.answered.length,vals.filter(Boolean).length);assert.equal(p.rows.filter(r=>!r.value).length,7-p.answered.length);assert.ok(p.headline);assert.ok(!JSON.stringify(p.insights).includes('undefined'));n++;
}
const p=profile(['same','same','same','same','unsure','unsure','different']);
const routes=new Set(),summaries=new Set();let completed=0;
for(const a0 of R.question(p,[],0).options)for(const a1 of R.question(p,[{choice:a0.id}],1).options){
 const base=[{choice:a0.id},{choice:a1.id}];const q2=R.question(p,base,2);routes.add(q2.id);
 for(const a2 of q2.options){const three=[...base,{choice:a2.id}];const q3=R.question(p,three,3);routes.add(q3.id);
  for(const a3 of q3.options){const answers=[...three,{choice:a3.id}];const s=R.synthesize(p,answers);assert.ok(s.rule);assert.ok(!JSON.stringify(s).includes('undefined'));summaries.add(JSON.stringify(s));completed++;}
 }
}
assert.equal(routes.size,8);assert.equal(summaries.size,completed);
const same=profile(Array(7).fill('same'));const specific=R.synthesize(same,[{choice:'numerical'},{choice:'material'},{choice:'specific'},{choice:'one'}]);assert.ok(specific.tensions.some(t=>t.title.includes('Original matter')));
const revised=R.synthesize(same,[{choice:'both'},{choice:'material'},{choice:'organization'},{choice:'neither'}]);assert.ok(revised.refinements.some(t=>t.title.includes('revised matter')));assert.ok(!revised.tensions.some(t=>t.title.includes('Original matter')));
const partial=profile(['same',null,'unsure']);assert.equal(partial.answered.length,2);assert.equal(partial.unsure.length,1);assert.ok(partial.insights.some(i=>i.title==='This is a partial reading'));
console.log(`PASS: ${n} answer combinations; ${completed} distinct follow-up paths; ${routes.size} adaptive probe routes; missing vs unsure; qualified transitions; evidence-based refinements.`);
