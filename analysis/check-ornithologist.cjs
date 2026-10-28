const fs=require('fs'),vm=require('vm');
let seed=20261024;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
const elements=new Map();const ctx=new Proxy({},{get:()=>()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};
const sandbox={console,Math:seededMath,document,window:{devicePixelRatio:1},localStorage:{getItem(){}},Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`{
picks=[CHARACTERS.findIndex(c=>c.name==='정찬영'),CHARACTERS.findIndex(c=>c.name==='이민규')];reset();state='running';const c=balls[0],e=balls[1];c.x=200;c.y=300;e.x=400;e.y=300;if(c.campaignCd!==30)throw Error('campaign cooldown');if(conures.length!==1||c.def.ability!=='조류박사'||c.def.skills.some(s=>s.name==='연주'))throw Error('new kit');const bird=conures[0];updateMusicWaves(3.99);if(bird.state!=='air')throw Error('early bird dive');updateMusicWaves(.02);if(bird.state!=='straight'||Math.abs(Math.hypot(bird.vx,bird.vy)-460)>1e-8)throw Error('bird launch');e.x=SIZE-50;e.y=SIZE-50;const vx=bird.vx,vy=bird.vy;updateMusicWaves(.3);if(bird.state!=='straight'||bird.vx!==vx||bird.vy!==vy)throw Error('straight flight');updateMusicWaves(.3);if(bird.state!=='chase'||Math.abs(bird.life-7.4)>1e-8)throw Error('tracking after 0.6 seconds');bird.x=e.x;bird.y=e.y;updateMusicWaves(.01);if(bird.state!=='attached')throw Error('attachment');const hp=e.hp;bird.life=4;updateMusicWaves(4);if(hp-e.hp<12||hp-e.hp>20||bird.state!=='return')throw Error('bird return after attack');updateMusicWaves(10);if(bird.state!=='air'||bird.timer!==3||c.cd[0]!==3)throw Error('cooldown after return');bird.state='chase';bird.life=.01;e.dodgeTime=1;updateMusicWaves(.02);if(bird.state!=='return')throw Error('flight timeout');e.dodgeTime=0;updateMusicWaves(10);
reset();const testBird=conures[0];if(testBird.x<=balls[0].x||testBird.y<=balls[0].y)throw Error('lower right');testBird.state='straight';testBird.life=8;testBird.timer=1;testBird.x=SIZE-25;testBird.y=100;testBird.vx=350;testBird.vy=0;balls[1].dodgeTime=2;updateMusicWaves(.1);if(testBird.vx>=0||Math.abs(testBird.life-7.9)>1e-8)throw Error('wall bounce and lifespan');reset();if(conures.length!==1||campaignWaves.length)throw Error('bird reset');console.log('Conure cycle, campaign pull, contact immunity, armor and reset verified');
}`,sandbox);vm.runInContext(`{
for(const airborne of ['jump','study','travel']){
 reset();state='running';const owner=balls[0],target=balls[1],bird=conures[0];
 target.jumpTime=airborne==='jump'?1:0;target.tripAir=airborne!=='jump';target.trip=airborne==='jump'?null:{kind:airborne};
 bird.state='chase';bird.life=8;bird.x=target.x;bird.y=target.y;bird.angle=0;
 updateMusicWaves(.01);if(airborne!=='jump'){if(bird.state==='attached')throw Error('traveler airborne attachment');const hp=target.hp;if(dealDamage(owner,target,4,{source:'conure',projectile:true})!==0||target.hp!==hp)throw Error('traveler airborne damage');continue;}if(bird.state!=='attached')throw Error('airborne attachment '+airborne);
 const hp=target.hp;updateMusicWaves(1);if(hp-target.hp<3||hp-target.hp>5)throw Error('airborne damage '+airborne);
 target.dodgeTime=1;const before=target.hp;updateMusicWaves(1);if(target.hp!==before)throw Error('evasion bypassed');
}
console.log('Conure hits jumping targets; traveler flight and evasion remain immune');
}`,sandbox);




