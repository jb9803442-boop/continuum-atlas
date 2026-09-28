// A camera for the original 2D anatomical illustration: whole-body fit, zoom,
// bounded panning, mouse wheel, keyboard, and touch pinch in inspection mode.
window.AvatarViewer = (() => {
 const viewport=document.querySelector('#avatar-viewport');
 const image=viewport.querySelector('.human');
 const canvas=document.querySelector('#canvas');
 const label=document.querySelector('#zoom-label');
 const toggle=document.querySelector('#inspect-body');
 const state={zoom:100,x:0,y:0,width:0,height:0,inspect:false,touchActive:false};
 const pointers=new Map();let gesture=null;
 const minZoom=50,maxZoom=300;
 const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
 function constrain(){
  const xLimit=Math.max(0,(state.width*state.zoom/100-viewport.clientWidth)/2);
  const yLimit=Math.max(0,(state.height*state.zoom/100-viewport.clientHeight)/2);
  state.x=clamp(state.x,-xLimit,xLimit);state.y=clamp(state.y,-yLimit,yLimit);
 }
 function paint(){
  constrain();
  image.style.width=state.width+'px';image.style.height=state.height+'px';
  image.style.transform=`translate(-50%, -50%) translate(${state.x}px, ${state.y}px) scale(${state.zoom/100})`;
  label.textContent=Math.round(state.zoom)+'%';
  document.querySelector('#zoom-in').disabled=state.zoom>=maxZoom;
  document.querySelector('#zoom-out').disabled=state.zoom<=minZoom;
  canvas.classList.toggle('body-inspection',state.inspect);
  canvas.classList.toggle('camera-interactive',state.inspect||state.touchActive);
  toggle.setAttribute('aria-pressed',String(state.inspect));
  toggle.textContent=state.inspect?'Show topics':'Inspect body';
  viewport.setAttribute('aria-label',`Anatomical illustration, ${Math.round(state.zoom)} percent. ${state.inspect?'Drag to pan, pinch or scroll to zoom.':'Zoom and pan keep topics visible; Inspect body optionally hides them.'}`);
 }
 function measure(){
  const ratio=(image.naturalWidth||768)/(image.naturalHeight||1376);
  const w=Math.max(1,viewport.clientWidth-12),h=Math.max(1,viewport.clientHeight-12);
  state.height=Math.min(h,w/ratio);state.width=state.height*ratio;
  paint();
 }
 function fit({inspect=state.inspect}={}){state.zoom=100;state.x=0;state.y=0;state.inspect=inspect;state.touchActive=false;measure();}
 function inspect(enabled){state.inspect=enabled;paint();}
 function zoomTo(percent,anchor){
  if(!Number.isFinite(percent))return;
  const previous=state.zoom;const next=clamp(percent,minZoom,maxZoom);
  if(Math.abs(next-previous)<.01)return;
  state.touchActive=true;
  if(anchor){state.x=anchor.x-(anchor.x-state.x)*next/previous;state.y=anchor.y-(anchor.y-state.y)*next/previous;}
  state.zoom=next;paint();
 }
 function point(e){const r=viewport.getBoundingClientRect();return {x:e.clientX-r.left-r.width/2,y:e.clientY-r.top-r.height/2};}
 function resetGesture(){
  const pts=[...pointers.values()];
  if(pts.length>=2){const a=pts[0],b=pts[1];gesture={type:'pinch',distance:Math.hypot(a.x-b.x,a.y-b.y)||1,center:{x:(a.x+b.x)/2,y:(a.y+b.y)/2},zoom:state.zoom,x:state.x,y:state.y};}
  else if(pts.length){gesture={type:'drag',point:pts[0],x:state.x,y:state.y};}
  else gesture=null;
 }
 viewport.addEventListener('pointerdown',e=>{
  if(e.pointerType==='mouse'&&e.button!==0)return;
  // Preserve mobile page scrolling until the user zooms or explicitly enables inspection.
  if(e.pointerType==='touch'&&!state.inspect&&!state.touchActive)return;
  if(e.pointerType!=='touch')state.touchActive=true;
  paint();
  viewport.focus({preventScroll:true});pointers.set(e.pointerId,point(e));viewport.setPointerCapture(e.pointerId);resetGesture();canvas.classList.add('avatar-dragging');
 });
 viewport.addEventListener('pointermove',e=>{
  if(!pointers.has(e.pointerId)||!gesture)return;
  pointers.set(e.pointerId,point(e));const pts=[...pointers.values()];
  if(gesture.type==='pinch'&&pts.length>=2){
   const distance=Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y);
   const center={x:(pts[0].x+pts[1].x)/2,y:(pts[0].y+pts[1].y)/2};
   state.zoom=clamp(gesture.zoom*distance/gesture.distance,minZoom,maxZoom);
   const factor=state.zoom/gesture.zoom;
   state.x=center.x-(gesture.center.x-gesture.x)*factor;
   state.y=center.y-(gesture.center.y-gesture.y)*factor;
  }else{state.x=gesture.x+pts[0].x-gesture.point.x;state.y=gesture.y+pts[0].y-gesture.point.y;}
  paint();
 });
 function release(e){pointers.delete(e.pointerId);resetGesture();if(!pointers.size)canvas.classList.remove('avatar-dragging');}
 viewport.addEventListener('pointerup',release);viewport.addEventListener('pointercancel',release);viewport.addEventListener('lostpointercapture',release);
 viewport.addEventListener('wheel',e=>{e.preventDefault();const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?viewport.clientHeight:1);zoomTo(state.zoom*Math.exp(-delta*.0025),point(e));},{passive:false});
 viewport.addEventListener('dblclick',()=>fit());
 viewport.addEventListener('keydown',e=>{
  if(['+','=','-','0','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Escape'].includes(e.key))e.preventDefault();
  if(e.key==='+'||e.key==='=')zoomTo(state.zoom+25);
  if(e.key==='-')zoomTo(state.zoom-25);
  if(e.key==='0')fit();
  if(e.key==='Escape')inspect(false);
  if(e.key.startsWith('Arrow')){state.touchActive=true;if(e.key==='ArrowLeft')state.x-=30;if(e.key==='ArrowRight')state.x+=30;if(e.key==='ArrowUp')state.y-=30;if(e.key==='ArrowDown')state.y+=30;paint();}
 });
 toggle.addEventListener('click',()=>inspect(!state.inspect));
 image.draggable=false;image.addEventListener('load',measure);
 new ResizeObserver(measure).observe(viewport);
 measure();
 return {zoomTo,zoomBy:amount=>zoomTo(state.zoom+amount),fit,inspect,reset:()=>fit({inspect:false}),getState:()=>({...state})};
})();
