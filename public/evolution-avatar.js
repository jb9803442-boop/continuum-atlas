import * as T from './vendor/three.module.js';
export function createEvolutionAvatar(){
 const root=new T.Group(),parts={},mods={};let currentGrowth=0;
 const skin=new T.MeshStandardMaterial({color:'#98c8d3',metalness:.3,roughness:.43,transparent:true,opacity:.84});
 const dark=new T.MeshStandardMaterial({color:'#163549',roughness:.6}),metal=new T.MeshStandardMaterial({color:'#9cb6c9',metalness:.85,roughness:.24}),blue=new T.MeshStandardMaterial({color:'#8cd8ff',emissive:'#279aca',emissiveIntensity:.7,metalness:.5,roughness:.3}),green=new T.MeshBasicMaterial({color:'#a4ebc6'});
 const add=(parent,geo,mat,x=0,y=0,z=0)=>{const m=new T.Mesh(geo,mat);m.position.set(x,y,z);parent.add(m);return m;};
 const ball=(p,r,m,x,y,z)=>add(p,new T.SphereGeometry(r,24,16),m,x,y,z);
 const bar=(p,a,b,r,mat)=>{const av=new T.Vector3(...a),bv=new T.Vector3(...b),d=bv.clone().sub(av);const m=add(p,new T.CylinderGeometry(r,r,d.length(),14),mat);m.position.copy(av.add(bv).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return m;};
 parts.head=new T.Group();root.add(parts.head);ball(parts.head,.31,skin,0,0,0).scale.set(.85,1.16,.91);ball(parts.head,.19,skin,0,-.15,.015).scale.set(.9,.7,1);ball(parts.head,.052,skin,0,-.015,.28).scale.set(.65,1,.9);
 for(const x of [-.105,.105]){ball(parts.head,.035,dark,x,.035,.255).scale.set(1,.53,.5);ball(parts.head,.063,skin,x<0?-.27:.27,-.03,0).scale.set(.45,1,.7);}bar(parts.head,[-.063,-.15,.231],[.063,-.15,.231],.008,dark);
 const hair=add(parts.head,new T.SphereGeometry(.314,24,16,0,Math.PI*2,0,1.25),dark,0,.025,-.01);hair.scale.set(.87,1.16,.95);
 parts.torso=ball(root,1,skin,0,1.14,0);parts.pelvis=ball(root,1,dark,0,.8,0);parts.neck=add(root,new T.CylinderGeometry(.1,.14,.17,20),skin);
 parts.arms=[];parts.legs=[];
 for(const side of [-1,1]){const arm=new T.Group();root.add(arm);ball(arm,.13,skin,0,0,0);bar(arm,[0,0,0],[side*.06,-.37,0],.087,skin);ball(arm,.09,skin,side*.06,-.37,0);bar(arm,[side*.06,-.37,0],[side*.08,-.7,.015],.071,skin);const hand=ball(arm,.09,skin,side*.08,-.77,.02);hand.scale.set(.7,1.2,.5);for(let i=0;i<4;i++)bar(arm,[side*.08+(i-1.5)*.03,-.8,.02],[side*.08+(i-1.5)*.03,-.94,.02],.012,skin);parts.arms.push(arm);
 const leg=new T.Group();root.add(leg);bar(leg,[0,0,0],[0,-.39,0],.115,skin);ball(leg,.1,skin,0,-.4,0);bar(leg,[0,-.4,0],[0,-.78,0],.08,skin);ball(leg,.125,dark,0,-.85,.06).scale.set(.85,.55,1.7);parts.legs.push(leg);}
 for(const name of ['dna','regeneration','repair','heart','arm','neural','senses','exo','continuity']){mods[name]=new T.Group();root.add(mods[name]);}
 for(let i=0;i<22;i++){const y=.93+i*.026,x=Math.sin(i*.65)*.13,z=Math.cos(i*.65)*.09;ball(mods.dna,.019,green,x,y,z);ball(mods.dna,.019,blue,-x,y,-z);if(i%2===0)bar(mods.dna,[x,y,z],[-x,y,-z],.009,green);}
 for(let i=0;i<18;i++){const angle=i*2.4;ball(mods.regeneration,.025,green,Math.sin(angle)*.22,.93+(i%7)*.055,Math.cos(angle)*.14);}
 for(let i=0;i<7;i++){const r=add(mods.repair,new T.TorusGeometry(.21+i*.007,.007,6,36),green,0,.93+i*.064,0);r.rotation.x=Math.PI/2;}
 const heart=ball(mods.heart,.11,metal,-.09,1.29,.17);heart.scale.set(.85,1.3,.7);bar(mods.heart,[-.09,1.4,.17],[-.09,1.54,.17],.027,blue);bar(mods.heart,[-.05,1.24,.17],[.05,1.08,.17],.018,blue);
 const arm=mods.arm;ball(arm,.14,metal,0,0,0);bar(arm,[0,-.1,0],[.05,-.36,0],.09,metal);ball(arm,.103,dark,.05,-.4,0);ball(arm,.06,blue,.05,-.4,.07);bar(arm,[.05,-.44,0],[.075,-.69,.01],.075,metal);bar(arm,[.05,-.46,.07],[.075,-.68,.075],.012,blue);add(arm,new T.BoxGeometry(.15,.16,.075),metal,.08,-.79,.02);for(let i=0;i<4;i++){const x=.08+(i-1.5)*.039;bar(arm,[x,-.86,.02],[x,-.94,.025],.014,metal);ball(arm,.018,blue,x,-.94,.025);bar(arm,[x,-.96,.025],[x,-1.02,.06],.012,metal);}bar(arm,[.01,-.79,.02],[-.065,-.89,.04],.019,metal);
 for(let i=0;i<10;i++){const a=i/10*Math.PI*2;ball(mods.neural,.025,blue,Math.cos(a)*.265,.13+Math.sin(a)*.1,Math.sin(a)*.22);}
 for(const x of [-.105,.105])ball(mods.senses,.046,blue,x,.035,.272).scale.set(1,.55,.6);
 for(const side of [-1,1]){bar(mods.exo,[side*.22,.9,.12],[side*.23,.5,.13],.034,metal);ball(mods.exo,.075,blue,side*.23,.5,.13);bar(mods.exo,[side*.23,.45,.13],[side*.23,.08,.14],.025,metal);}
 const memory=new T.MeshBasicMaterial({color:'#d8b6f0',transparent:true,opacity:.7});const ring=add(mods.continuity,new T.TorusGeometry(.38,.012,8,64),memory,0,0,0);ring.rotation.x=.45;
 function update(growth,acquired){currentGrowth=growth;const g=T.MathUtils.clamp(growth,0,1),leg=.8+g*.65,torso=.62+g*.45,shoulder=leg+torso+.1,headY=shoulder+.34;
 parts.torso.position.y=leg+torso*.53;parts.torso.scale.set(.29+g*.15,torso*.62,.17+g*.05);parts.pelvis.position.y=leg+.035;parts.pelvis.scale.set(.28+g*.07,.18,.18+g*.035);parts.neck.position.y=shoulder+.07;parts.head.position.y=headY;parts.head.scale.setScalar(1-g*.18);
 parts.arms.forEach((a,i)=>{a.position.set((i?1:-1)*(.37+g*.18),shoulder-.04,0);a.scale.set(1+g*.24,1+g*.34,1+g*.24);a.visible=!(i===1&&acquired.includes('arm'));});parts.legs.forEach((l,i)=>{l.position.set((i?1:-1)*(.16+g*.04),leg,0);l.scale.set(1+g*.32,leg/.91,1+g*.3);});
 Object.entries(mods).forEach(([id,m])=>{m.visible=acquired.includes(id);if(['dna','regeneration','repair','heart'].includes(id)){m.scale.set(1+g*.4,torso/.62,1+g*.3);m.position.y=leg-.8*(torso/.62);}if(id==='arm'){m.position.copy(parts.arms[1].position);m.scale.copy(parts.arms[1].scale);}if(['neural','senses','continuity'].includes(id)){m.position.set(0,headY,0);m.scale.setScalar(1-g*.18);}if(id==='exo')m.scale.set(1+g*.1,leg/.91,1);});
 // A signal trunk visibly connects the acquired neural interface to the arm.
 if(mods.neural.userData.trunk){mods.neural.remove(mods.neural.userData.trunk);mods.neural.userData.trunk.geometry.dispose();}if(acquired.includes('neural')&&acquired.includes('arm')){mods.neural.userData.trunk=bar(mods.neural,[.22,-.12,.05],[.37+g*.18,shoulder-headY,.05],.014,blue);}skin.opacity=acquired.some(x=>['dna','heart','regeneration','repair'].includes(x))?.48:.84;
 }
 update(0,[]);
 return {root,update,walk:(t,on)=>{parts.arms.forEach((a,i)=>a.rotation.x=on?Math.sin(t*8)*.2*(i?1:-1):0);parts.legs.forEach((a,i)=>a.rotation.x=on?Math.sin(t*8)*.2*(i?-1:1):0);},getState:()=>({growth:currentGrowth,adult:currentGrowth===1,modules:Object.keys(mods).filter(k=>mods[k].visible),biologicalRightArm:parts.arms[1].visible,headHeight:parts.head.position.y})};
}
