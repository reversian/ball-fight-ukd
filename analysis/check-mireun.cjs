const fs=require('fs'),vm=require('vm');
let seed=20261024;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
const elements=new Map();const ctx=new Proxy({},{get:(_,key)=>key==='measureText'?()=>({width:50}):()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};
const sandbox={console,Math:seededMath,document,window:{devicePixelRatio:1},localStorage:{getItem(){}},Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`{
const artist=CHARACTERS.findIndex(c=>c.name==='김재윤'),enemy=CHARACTERS.findIndex(c=>c.name==='이민규');
function setup(){picks=[artist,enemy];reset();state='running';balls[0].x=200;balls[0].y=300;balls[1].x=450;balls[1].y=300;return balls;}
let [a,e]=setup();a.hp=10;a.stun=2;a.darkBurn={owner:e,remaining:5,tick:0};dealDamage(e,a,5,{source:'test'});if(!a.mireunUsed||a.hp!==8||!mireunIntro||a.stun||a.darkBurn)throw Error('threshold trigger and cleanse');
const oldElapsed=elapsed,ex=e.x;update(.5);updateTexts(.5);render();if(elapsed!==oldElapsed||e.x!==ex||a.hp!==8||a.mireun.age!==0)throw Error('intro full freeze');update(1);if(mireunIntro)throw Error('intro length');
if(dealDamage(e,a,100,{source:'test'})!==0||a.hp!==8)throw Error('damage immunity');knockback(a,{x:1,y:0},5);loseHp(a,2);heal(a,5);if(a.boost||a.hp!==8)throw Error('knockback or health immunity');
const distance=Math.hypot(a.x-e.x,a.y-e.y);updateMireun(.1);if(Math.hypot(a.x-e.x,a.y-e.y)>=distance)throw Error('fast chase');
a.x=e.x-60;a.y=e.y;updateMireun(.01);if(!a.mireun.attached)throw Error('attachment');e.x=300;e.y=150;updateMireun(.01);if(!a.mireun.attached||Math.hypot(a.x-e.x,a.y-e.y)>a.radius+e.radius-14+1e-8)throw Error('attachment lost after target move');e.jumpTime=.5;if(Math.abs(mireunLift(a)-125)>1e-8)throw Error('attached jump visual');e.jumpTime=0;const hp=e.hp;updateMireun(1);if(hp-e.hp<2||hp-e.hp>4||a.hp!==7)throw Error('attached tick and self drain');render();
updateMireun(6.89);finishBattleIfNeeded();if(state!=='over'||winner!==e||a.hp!==0||a.mireun)throw Error('eight second loss');a.hp=0;checkLethal(a);if(a.hp!==0||mireunIntro)throw Error('once only');
[a,e]=setup();a.hp=50;dealDamage(e,a,999,{source:'test'});if(a.hp!==8||!mireunIntro)throw Error('lethal rescue');update(1.5);a.x=e.x-60;a.y=e.y;e.hp=2;updateMireun(1);finishBattleIfNeeded();if(winner!==a)throw Error('can win during last stand');
[a,e]=setup();a.art={kind:'draw',age:2.99,shots:0,contacted:false,penTouch:false,tipX:300,tipY:100};e.x=550;e.y=550;a.def.update(a,e,.02);const doodle=projectiles.find(p=>p.stickman);if(!doodle)throw Error('drawing passive');const before=e.hp;doodle.onHit(e);if(e.hp!==before-4)throw Error('doodle damage');
reset();if(mireunIntro||balls[0].mireunUsed||balls[0].mireun)throw Error('reset');console.log('Mireun threshold/lethal, freeze, immunity, pursuit, attacks, self drain, win/loss, passive and reset verified');
}`,sandbox);




