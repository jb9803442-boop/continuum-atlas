// Still images rendered from the same avatar geometry as the interactive body.
import * as T from './vendor/three.module.js';
import {createEvolutionAvatar} from './evolution-avatar.js';
let renderer;
export function snapshotBody(growth,modules){
 if(!renderer){renderer=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setPixelRatio(1);renderer.setSize(320,400);renderer.setClearColor('#0b1a25');renderer.outputColorSpace=T.SRGBColorSpace;}
 const scene=new T.Scene(),avatar=createEvolutionAvatar();avatar.update(growth,modules);scene.add(avatar.root);scene.add(new T.HemisphereLight('#d5f2ff','#26435a',3));const key=new T.DirectionalLight('#ffffff',3);key.position.set(3,6,6);scene.add(key);const rim=new T.DirectionalLight('#8abce8',2);rim.position.set(-3,3,-2);scene.add(rim);
 const height=avatar.getState().headHeight+.45,focus=new T.Vector3(0,height*.5,0),distance=height/(2*Math.tan(T.MathUtils.degToRad(16)))*1.12;
 const camera=new T.PerspectiveCamera(32,.8,.1,60);camera.position.set(distance*.13,focus.y+.12,distance);camera.lookAt(focus);
 try{renderer.render(scene,camera);return renderer.domElement.toDataURL('image/png');}finally{const geometries=new Set(),materials=new Set();avatar.root.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}
}
