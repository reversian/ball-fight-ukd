const fs=require('fs'),vm=require('vm');
let seed=20261024;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
const elements=new Map();const ctx=new Proxy({},{get:()=>()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};
const sandbox={console,Math:seededMath,document,window:{devicePixelRatio:1},localStorage:{getItem(){}},Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`{
picks=[CHARACTERS.findIndex(c=>c.name==='김재윤'),CHARACTERS.findIndex(c=>c.name==='이민규')];reset();const a=balls[0],e=balls[1];a.x=100;a.y=100;e.x=380;e.y=300;artBalls=[{owner:a,x:300,y:300,vx:440,vy:0,distance:320,r:12,color:'#f0f'}];const hp=e.hp;updateArt(0);if(e.hp!==hp-4||artGround.length!==1)throw Error('burst splash');updateArt(.1);if(e.hp!==hp-4)throw Error('duplicate entry');updateArt(.9);if(e.hp!==hp-8)throw Error('ongoing DPS');console.log('Paint burst, no duplicate entry and ongoing damage verified');
}`,sandbox);