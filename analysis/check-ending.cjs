const fs=require('fs'),vm=require('vm');
let seed=20261024;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
const elements=new Map();const ctx=new Proxy({},{get:()=>()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};
const sandbox={console,Math:seededMath,document,window:{devicePixelRatio:1},localStorage:{getItem(){}},Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`{
picks=[1,2];reset();state='running';balls[0].hp=0;update(0);
if(state!=='over'||endSequence.age!==0||endSequence.losers[0]!==balls[0])throw Error('ending start');
updateEndSequence(.99);if(endSequence.burst)throw Error('early burst');
updateEndSequence(.02);if(!endSequence.burst||endSequence.age>=2)throw Error('burst timing');
const old=state;startGame();if(state!==old)throw Error('restart during ending');
updateEndSequence(.99);if(endSequence.age!==2)throw Error('result delay');
reset();if(endSequence!==null)throw Error('reset');console.log('Defeat shake, burst, result timing and restart checks passed');
}`,sandbox);