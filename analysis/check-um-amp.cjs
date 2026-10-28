const fs=require('fs'),vm=require('vm');
let seed=20261024;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
const elements=new Map();const ctx=new Proxy({},{get:()=>()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};
const sandbox={console,Math:seededMath,document,window:{devicePixelRatio:1},localStorage:{getItem(){}},Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`{
picks=[CHARACTERS.findIndex(c=>c.name==='박성웅'),CHARACTERS.findIndex(c=>c.name==='권혁주')];reset();const owner=balls[0],kwon=balls[1];owner.cd[0]=0;owner.def.update(owner,kwon,.01);const air=amplifiers[0];amplifiers.push({...air,landed:true,hits:0});castKwon(kwon,owner,0);if(air.hits!==0||amplifiers[1].hits!==1)throw Error('Um amp damage');console.log('Um hits grounded amps once and ignores airborne amps');
}`,sandbox);