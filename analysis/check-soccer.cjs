const fs=require('fs'),vm=require('vm');
let seed=20261024;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
const elements=new Map();const ctx=new Proxy({},{get:(_,key)=>key==='measureText'?()=>({width:50}):()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};
const sandbox={console,Math:seededMath,document,window:{devicePixelRatio:1},localStorage:{getItem(){}},Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`{
const soccer=CHARACTERS.findIndex(c=>c.name==='박성찬'),enemy=CHARACTERS.findIndex(c=>c.name==='이민규');
function setup(){picks=[soccer,enemy];reset();state='running';const a=balls[0],e=balls[1];a.x=100;a.y=100;e.x=450;e.y=450;return [a,e];}
let [a,e]=setup();if((a.foodWait<5||a.foodWait>7)||a.energy!==1)throw Error('initial food/energy');
for(let level=0;level<=2;level++){[a,e]=setup();a.energy=level;kickSoccer(a,e);if(a.soccerBall.damage!==18||a.soccerBall.bounces!==0||a.energy!==level)throw Error('fixed damage/no bounce');}
[a,e]=setup();a.cd[0]=100;a.def.update(a,e,a.foodWait-.01);if(soccerFoods.length)throw Error('early food');a.def.update(a,e,.02);if(soccerFoods.length!==1)throw Error('food spawn');const food=soccerFoods[0];a.def.update(a,e,10);spawnSoccerFood(a);if(soccerFoods.length!==1||soccerFoods[0]!==food)throw Error('single food cap');a.x=food.x;a.y=food.y;a.energy=2;a.hp=190;food.kind=2;updateSoccer(0);if(soccerFoods.length||a.energy!==2||a.hp!==195||(a.foodWait<5||a.foodWait>7))throw Error('consume/cap/restart');a.def.update(a,e,a.foodWait-.01);if(soccerFoods.length)throw Error('respawn early');a.def.update(a,e,.02);if(soccerFoods.length!==1)throw Error('respawn after eating');
[a,e]=setup();a.energy=2;kickSoccer(a,e);let b=a.soccerBall;b.x=250;b.y=300;b.vx=520;b.vy=0;e.x=300;e.y=300;const hp=e.hp;updateSoccer(.01);if(e.hp!==hp-18||e.boost!==0||b.canDamage||b.vx>=0||!b.recoil)throw Error('soccer hit and roll');
[a,e]=setup();kickSoccer(a,e);b=a.soccerBall;b.x=SIZE-21;b.y=250;b.vx=520;b.vy=0;updateSoccer(.01);if(b.canDamage||!b.wallRoll||b.vx>=0)throw Error('wall roll');for(let i=0;i<70;i++)updateSoccer(.01);if(b.vx||b.vy||!soccerBalls.includes(b))throw Error('persistent stationary ball');
[a,e]=setup();a.energy=2;kickSoccer(a,e);b=a.soccerBall;b.x=500;b.y=100;b.vx=0;b.vy=0;b.age=1.49;b.away=1.49;updateSoccer(.005);if(a.soccerDash)throw Error('early dash');updateSoccer(.01);if(!a.soccerDash||a.energy!==1||dealDamage(e,a,100,{})!==50)throw Error('1.5-second dash');a.x=b.x-30;a.y=b.y;updateSoccer(.01);if(a.soccerDash||a.soccerBall||Math.abs(a.cd[0]-Math.max(0,3.75-b.age))>1e-9)throw Error('dash pickup');
[a,e]=setup();a.cd[0]=0;a.def.update(a,e,.01);if(a.soccerWindup!==.15)throw Error('windup');const x=a.x;update(.075);if(a.x!==x||soccerBalls.length)throw Error('windup freeze');update(.075);if(!a.soccerBall||a.soccerRecovery!==.15)throw Error('kick/recovery');update(.075);if(a.x!==x)throw Error('recovery freeze');update(.075);if(a.soccerRecovery!==0)throw Error('recovery length');
reset();if(soccerBalls.length||soccerFoods.length)throw Error('reset');console.log('Soccer fixed damage, no wall bounce, two energy, one food, 5-7 second respawn, 1.5-second dash, kick timing and reset verified');
}`,sandbox);

vm.runInContext(`{
picks=[CHARACTERS.findIndex(c=>c.name==='박성찬'),CHARACTERS.findIndex(c=>c.name==='이민규')];reset();state='running';const a=balls[0],e=balls[1];a.x=200;a.y=200;e.x=500;e.y=500;a.energy=2;kickSoccer(a,e);const b=a.soccerBall;b.x=220;b.y=200;b.vx=0;b.vy=0;b.age=1;a.vx=0;a.vy=a.speed;updateSoccer(.01);if(a.soccerBall||a.vx!==0||a.vy!==a.speed||a.energy!==2)throw Error('pickup preserves heading and kick energy');
for(let kind=0;kind<3;kind++){a.energy=0;a.hp=180;soccerFoods=[{owner:a,x:a.x,y:a.y,r:28,kind}];updateSoccer(0);if(a.energy!==2||a.hp!==185)throw Error('uniform food '+kind);}
console.log('Kick spends no energy, pickup preserves heading, all foods restore two energy');
}`,sandbox);



vm.runInContext(`{
picks=[CHARACTERS.findIndex(c=>c.name==='박성찬'),CHARACTERS.findIndex(c=>c.name==='이민규')];
for(const phase of ['soccerWindup','soccerRecovery']){reset();const a=balls[0],e=balls[1];if(phase==='soccerRecovery')kickSoccer(a,e);a[phase]=.4;a.cd[0]=0;const kicked=a.soccerBall;knockback(a,{x:1,y:0},2);if(a.soccerWindup||a.soccerRecovery||a.cd[0]!==3.75||a.boost!==2||a.vx<=0||a.soccerBall!==kicked)throw Error('interrupted soccer '+phase);}
reset();const a=balls[0];a.soccerDash=true;a.soccerWindup=.4;knockback(a,{x:1,y:0},2);if(a.soccerWindup||a.boost!==2)throw Error('dash knockback blocked');console.log('Knockback interrupts pre/post kick and resets cooldown; fired ball preserved and dash accepts knockback');
}`,sandbox);



vm.runInContext(`{
picks=[CHARACTERS.findIndex(c=>c.name==='박성찬'),CHARACTERS.findIndex(c=>c.name==='이민규')];reset();state='running';const a=balls[0],e=balls[1];a.x=100;a.y=100;e.x=300;e.y=300;kickSoccer(a,e);const b=a.soccerBall;b.x=230;b.y=300;b.vx=520;b.vy=0;e.vx=0;e.vy=e.speed;const oldX=e.x;updateSoccer(.03);if(!e.soccerPush||b.vx>=0)throw Error('soccer push setup');updateSoccerPushes(.12);if(Math.abs(e.x-oldX-24)>1e-6||e.vx!==0||e.vy!==e.speed||e.boost!==0||e.soccerPush)throw Error('short displacement without speed boost');console.log('Soccer gently pushes target 24px while ball rebounds oppositely');
}`,sandbox);

vm.runInContext(`{
picks=[CHARACTERS.findIndex(c=>c.name==='박성찬'),CHARACTERS.findIndex(c=>c.name==='이지원')];reset();const a=balls[0],e=balls[1];a.energy=0;a.cd[0]=100;a.def.update(a,e,10);if(a.energy||a.hp!==195)throw Error('held ball must not recover or cost health');kickSoccer(a,e);a.def.update(a,e,5.99);if(a.energy)throw Error('early recovery');a.def.update(a,e,.01);if(a.energy!==1||a.hp!==190)throw Error('empty energy recovery health cost');a.energy=0;a.def.update(a,e,5);soccerFoods=[{owner:a,x:a.x,y:a.y,r:44,kind:0}];updateSoccer(0);if(a.emptyEnergyTime||a.energy!==2)throw Error('food resets recovery');a.energy=0;a.def.update(a,e,1);if(a.energy)throw Error('recovery reset');
a.soccerDash=true;const hp=a.hp;if(dealDamage(e,a,20,{source:'test'})!==10||a.hp!==hp-10)throw Error('half damage');if(dealDamage(e,a,1,{source:'darkBurn'})!==.5)throw Error('poison damage reduction');a.stun=0;const beforeDark=a.hp;e.readCharge=.01;e.def.update(e,a,.02);if(a.hp!==beforeDark-35)throw Error('dark psychology bypasses dash reduction');if(a.stun!==1.5||a.darkBurn.remaining!==5)throw Error('full dark psychology status');if(a.def.image!=='images/balls/박성찬질주.jpg')throw Error('swapped default image');console.log('Empty energy recovery, food reset, half damage, poison damage reduction, full status effects and swapped portrait verified');
}`,sandbox);

vm.runInContext(`{picks=[CHARACTERS.findIndex(c=>c.name==='박성찬'),CHARACTERS.findIndex(c=>c.name==='이지원')];reset();const a=balls[0];a.energy=0;a.hp=5;kickSoccer(a,balls[1]);a.soccerDash=true;a.def.update(a,balls[1],6);if(a.hp>0||a.energy!==1)throw Error('recovery cost must ignore dash reduction and allow death');console.log('Automatic energy recovery costs exactly 5 HP, including during dash');}`,sandbox);

vm.runInContext(`{picks=[CHARACTERS.findIndex(c=>c.name==='박성찬'),CHARACTERS.findIndex(c=>c.name==='이민규')];reset();const a=balls[0],e=balls[1];a.energy=0;kickSoccer(a,e);a.def.update(a,e,5);a.soccerBall.x=a.x;a.soccerBall.y=a.y;a.soccerBall.age=1;updateSoccer(0);if(a.soccerBall||a.emptyEnergyTime)throw Error('pickup resets recovery timer');a.def.update(a,e,10);if(a.energy||a.hp!==195)throw Error('no recovery while holding ball');console.log('Held ball pauses automatic recovery and pickup resets timer');}`,sandbox);

vm.runInContext(`{for(const age of [1,3.5,3.75,5]){picks=[CHARACTERS.findIndex(c=>c.name==='박성찬'),CHARACTERS.findIndex(c=>c.name==='이민규')];reset();const a=balls[0];kickSoccer(a,balls[1]);if(a.cd[0]!==3.75)throw Error('cooldown starts on launch');const b=a.soccerBall;b.age=age;b.x=a.x;b.y=a.y;b.vx=b.vy=0;updateSoccer(0);if(a.soccerBall||a.cd[0]!==Math.max(0,3.75-age))throw Error('inclusive cooldown at '+age);}console.log('Shot cooldown includes ball retrieval time: early pickup waits remainder, late pickup has no extra wait');}`,sandbox);
