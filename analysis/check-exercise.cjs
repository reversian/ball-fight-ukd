const fs=require('fs'),vm=require('vm');
let seed=20261024;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
const elements=new Map();const ctx=new Proxy({},{get:()=>()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};
const sandbox={console,Math:seededMath,document,window:{devicePixelRatio:1},localStorage:{getItem(){}},Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`{
picks=[CHARACTERS.findIndex(c=>c.name==='양시온'),CHARACTERS.findIndex(c=>c.name==='이민규')];reset();const s=balls[0],e=balls[1];s.exerciseBonus=14;interruptPullupContact(s);if(s.exerciseBonus!==14||s.barActive)throw Error('interruption loses attack');s.pullupCry=0;s.pullupRecovery=0;const hp=e.hp;s.def.onContact(s,e,{x:1,y:0});if(e.hp!==hp-20||![12,13].includes(s.exerciseBonus))throw Error('damage decay');
e.dodgeTime=1;const bonus=s.exerciseBonus;s.def.onContact(s,e,{x:1,y:0});if(s.exerciseBonus!==bonus)throw Error('immune decay');e.dodgeTime=0;s.exerciseBonus=0;s.def.onContact(s,e,{x:1,y:0});if(s.exerciseBonus!==0)throw Error('attack floor');console.log('Pullup interruption, attack decay and minimum verified');
}`,sandbox);