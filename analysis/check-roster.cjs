const fs=require('fs'),vm=require('vm');
let seed=20261024;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
const elements=new Map();const ctx=new Proxy({},{get:(o,k)=>k==="measureText"?()=>({width:40}):()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};
const sandbox={console,Math:seededMath,document,window:{devicePixelRatio:1},localStorage:{getItem(){}},Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`
if(CHARACTERS.some(c=>/권용균/.test(c.name)))throw Error('Removed character remains');
for(let i=0;i<CHARACTERS.length;i++){picks=[i,(i+1)%CHARACTERS.length];reset();state='running';for(let f=0;f<600&&state==='running';f++){update(1/60);updateTexts(1/60);}render();}
console.log('All remaining characters update and render successfully');
`,sandbox);vm.runInContext(`{
picks=[CHARACTERS.findIndex(c=>c.name==='김재윤'),CHARACTERS.findIndex(c=>c.name==='함태준')];reset();
const owner=balls[0],enemy=balls[1];enemy.x=300;enemy.y=300;
artGround=[{owner,kind:'paint',x1:300,y1:300,x2:300,y2:300,radius:105,expires:6,color:owner.def.color,hitTargets:new Set()}];
const hp=enemy.hp;updateArt(.01);if(enemy.hp!==hp-4)throw Error('Immediate paint damage');updateArt(.01);if(enemy.hp!==hp-4)throw Error('Repeated entry damage');console.log('Immediate paint damage verified');
}`,sandbox);

