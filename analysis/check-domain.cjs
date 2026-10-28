const fs=require('fs'),vm=require('vm');
let seed=20261024;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
const elements=new Map();const ctx=new Proxy({},{get:()=>()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};
const sandbox={console,Math:seededMath,document,window:{devicePixelRatio:1},localStorage:{getItem(){}},Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`{
picks=[CHARACTERS.findIndex(c=>c.name==='박건'),CHARACTERS.findIndex(c=>c.name==='이민규')];reset();const p=balls[0],e=balls[1];p.x=200;p.y=200;e.x=201;e.y=200;
for(let i=0;i<7;i++){p.domain={r:p.radius+i*DOMAIN_STEP+.001};e.hp=1000;p.def.update(p,e,0);if(e.hp!==1000-6*(i+1))throw Error('domain stage '+i);}
p.domain={r:p.radius+320-.001};e.hp=1000;p.def.update(p,e,0);if(e.hp!==964)throw Error('before previous max boundary');p.domain={r:p.radius+320};e.hp=1000;p.def.update(p,e,0);if(e.hp!==958)throw Error('same max boundary');console.log('Seven damage stages and unchanged 320px max boundary verified');
}`,sandbox);
