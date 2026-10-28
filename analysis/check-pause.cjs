const fs=require('fs'),vm=require('vm');
let seed=20261024;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
const elements=new Map();const ctx=new Proxy({},{get:(_,key)=>key==='measureText'?()=>({width:50}):()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};
const sandbox={console,Math:seededMath,document,window:{devicePixelRatio:1},localStorage:{getItem(){}},Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`{
reset();state='ready';startGame();if(state!=='running')throw Error('start');
update(.1);const before=elapsed,x=balls[0].x;toggleGame();render();if(state!=='paused'||startBtn.textContent!=='시작'||document.getElementById('stop').hidden)throw Error('pause controls');
texts.push({x:0,y:0,text:'test',life:1});const life=texts[texts.length-1].life;loop(lastTime+16);if(elapsed!==before||balls[0].x!==x||texts[texts.length-1].life!==life)throw Error('pause freeze');
toggleGame();render();if(state!=='running'||elapsed!==before||startBtn.textContent!=='게임 정지'||!document.getElementById('stop').hidden)throw Error('resume');
toggleGame();stopGame();render();if(state!=='ready'||elapsed!==0||startBtn.textContent!=='시작'||!document.getElementById('stop').hidden)throw Error('exit');console.log('Pause freezes game and effects; resume and exit verified');
}`,sandbox);

