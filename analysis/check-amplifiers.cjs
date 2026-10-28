const fs=require('fs'),vm=require('vm');
let seed=20261024;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
const elements=new Map();const ctx=new Proxy({},{get:()=>()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};
const sandbox={console,Math:seededMath,document,window:{devicePixelRatio:1},localStorage:{getItem(){}},Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`{
picks=[CHARACTERS.findIndex(c=>c.name==='박성웅'),CHARACTERS.findIndex(c=>c.name==='이민규')];reset();state='running';const p=balls[0],e=balls[1];p.cd[0]=0;p.def.update(p,e,.01);if(amplifiers.length!==1)throw Error('throw');const a=amplifiers[0];const projectile={owner:e,x:a.x,y:a.y,r:8};if(interceptAmp(projectile,a.x,a.y))throw Error('air vulnerability');
a.endX=350;a.endY=350;e.x=430;e.y=350;a.age=a.flight-.001;const hp=e.hp;updateAmplifiers(.002);if(!a.landed||e.hp!==hp-a.landingDamage)throw Error('landing');
updateAmplifiers(1);updateAmplifiers(.2);if(e.hp!==hp-a.landingDamage-3)throw Error('wave');
if(a.hits!==1)throw Error('landing durability');a.hits=0;projectile.x=a.x;projectile.y=a.y;if(!interceptAmp(projectile,a.x,a.y)||a.hits!==1)throw Error('first hit');interceptAmp(projectile,a.x,a.y);if(a.hits!==2)throw Error('second hit');interceptAmp(projectile,a.x,a.y);updateAmplifiers(0);if(amplifiers.length)throw Error('destruction');
p.cd[0]=0;p.def.update(p,e,.01);p.cd[0]=0;p.def.update(p,e,.01);if(amplifiers.length!==2)throw Error('multiple amps');reset();if(amplifiers.length)throw Error('reset');console.log('Amplifier flight immunity, landing, pulse, destruction and stacking checks passed');
}`,sandbox);