const fs=require('fs'),vm=require('vm');
let seed=20261024;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
const elements=new Map();const ctx=new Proxy({},{get:()=>()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};
const sandbox={console,Math:seededMath,document,window:{devicePixelRatio:1},localStorage:{getItem(){}},Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`{
picks=[CHARACTERS.findIndex(c=>c.name==='김지성'),CHARACTERS.findIndex(c=>c.name==='이민규')];reset();state='running';const k=balls[0],e=balls[1];k.x=300;k.y=300;e.x=420;e.y=300;k.cd[0]=0;k.def.update(k,e,.01);
if(k.jumpTime!==1 || k.cd[0]!==6)throw Error('jump start');const hp=k.hp;if(dealDamage(e,k,14)!==0||k.hp!==hp)throw Error('airborne hit');
k.def.update(k,e,1);if(quakes.length!==1||e.hp!==e.maxHp-15||e.stun!==2)throw Error('landing');
if(!e.stunKnockback?.quakeOwner)throw Error('delayed knockback');
e.stun=0;const n=e.stunKnockback;e.stunKnockback=null;knockback(e,n,3);if(!e.quakeWall)throw Error('wall damage marker missing');
knockback(k,{x:1,y:0},4);if(k.boost!==2)throw Error('fat reduction');
const before=e.hp;updateQuakes(1);if(e.hp!==before-2)throw Error('quake tick');elapsed=4;updateQuakes(.01);if(quakes.length)throw Error('quake expiration');console.log('Jump, immunity, landing, stun, knockback and quake checks passed');
}`,sandbox);