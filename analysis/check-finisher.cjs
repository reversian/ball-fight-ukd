const fs=require('fs'),vm=require('vm');
let seed=20261024;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
const elements=new Map();const ctx=new Proxy({},{get:()=>()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};
const sandbox={console,Math:seededMath,document,window:{devicePixelRatio:1},localStorage:{getItem(){}},Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`{
picks=[CHARACTERS.findIndex(c=>c.name==='권혁주'),CHARACTERS.findIndex(c=>c.name==='이지원')];reset();const k=balls[0],e=balls[1];e.hp=20;e.dodgeTime=1;e.tripAir=true;k.finisher={remaining:.01};k.finisherUsed=true;k.def.update(k,e,.02);if(e.hp!==0||!k.laser||k.finisher)throw Error('finisher laser execution');console.log('Charged laser execution verified');
}`,sandbox);