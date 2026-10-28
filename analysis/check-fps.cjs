const fs=require('fs'),vm=require('vm');
let seed=20261024;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
const elements=new Map();const ctx=new Proxy({},{get:()=>()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};
const sandbox={console,Math:seededMath,document,window:{devicePixelRatio:1},localStorage:{getItem(){}},Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`{
 picks=[CHARACTERS.findIndex(c=>c.name==='구동우'),CHARACTERS.findIndex(c=>c.name==='이민규')];reset();const g=balls[0],e=balls[1];if(g.fpsUpgradeRoll!==2||Object.values(g.fpsUpgrades).some(v=>v>0))throw Error('starting roll');updateFpsUpgrades(g,2);if(Object.values(g.fpsUpgrades).filter(v=>v>0).length!==1||g.fpsUpgradeFlash!==.95)throw Error('starting upgrade');g.fpsUpgrades={computer:0,mouse:0,keyboard:0};g.fpsUpgradeWait=Infinity;g.x=200;g.y=300;e.x=400;e.y=300;
 if(g.def.trait.name!=='업그레이드'||g.fpsAmmo!==25||g.def.onContact)throw Error('old kit remains');
 g.fpsAngle=-Math.PI/2*.01;g.def.update(g,e,.01);if(projectiles.length!==1||g.fpsAmmo!==24)throw Error('first radar shot');
 const hp=e.hp;projectiles[0].onHit(e);if(e.hp!==hp-2)throw Error('bullet damage');
 g.fpsTracking=false;g.fpsAngle=Math.PI;g.def.update(g,e,.5);if(g.fpsAmmo!==24)throw Error('outside radar shot');
 for(let i=0;i<24;i++){g.fpsTracking=false;g.fpsAngle=-Math.PI/2*.3;g.def.update(g,e,.3);}
 if(g.fpsAmmo!==0||g.fpsReload!==3||fpsMagazines.length!==1)throw Error('empty magazine reload');
 const m=fpsMagazines[0];e.x=m.x;e.y=m.y;const before=e.hp;updateFpsMagazines(.99);if(e.hp!==before)throw Error('airborne magazine hit');updateFpsMagazines(.02);if(e.hp!==before-3||fpsMagazines.length)throw Error('landing magazine');
 g.def.update(g,e,2.99);if(g.fpsAmmo!==0)throw Error('early reload');g.def.update(g,e,.02);if(g.fpsAmmo!==25||g.fpsReload!==0)throw Error('reload complete');
 g.fpsTracking=false;e.x=10000;g.fpsAngle=0;for(let i=0;i<60;i++)g.def.update(g,e,.1);if(Math.abs(g.fpsAngle-Math.PI)>1e-8)throw Error('full circle scan');g.fpsUpgrades={computer:8,mouse:5.5,keyboard:6.5};const st=fpsStats(g);if(st.damage!==3||st.range!==360||Math.abs(st.half*360/Math.PI-23)>1e-8||st.interval!==.2||st.bulletSpeed!==1500||st.reloadRate!==2)throw Error('stacked stats');
g.fpsUpgrades.computer=.1;grantFpsUpgrade(g,'computer');if(g.fpsUpgrades.computer<7||g.fpsUpgrades.computer>12.5||g.fpsUpgrades.mouse!==5.5)throw Error('refresh independent');
e.x=400;e.y=300;g.fpsAngle=Math.PI;g.def.update(g,e,.01);if(Math.abs(g.fpsAngle)>1e-8)throw Error('mouse tracking');
g.fpsReload=3;g.fpsAmmo=0;g.def.update(g,e,1.5);if(g.fpsReload!==0||g.fpsAmmo!==25)throw Error('keyboard reload');
g.fpsUpgradeWait=0;g.fpsUpgradeRoll=0;updateFpsUpgrades(g,.01);if(g.fpsUpgradeRoll!==2)throw Error('roll start');updateFpsUpgrades(g,2);if(g.fpsUpgradeRoll!==0||!g.fpsUpgradeShown)throw Error('roll finish');
g.fpsUpgrades={computer:.01,mouse:0,keyboard:0};g.fpsUpgradeWait=Infinity;updateFpsUpgrades(g,.02);if(fpsBrokenGear.length!==1||g.fpsUpgrades.computer!==0)throw Error('gear expiration');updateFpsMagazines(.6);if(fpsBrokenGear.length!==1)throw Error('gear landing');updateFpsMagazines(1.51);if(fpsBrokenGear.length)throw Error('gear ground lifetime');
ovens=[{owner:e,landed:true,hp:6,x:500,y:300,radius:44}];const bullet={owner:g,fpsBullet:true,x:500,y:300,r:6};if(!interceptOven(bullet,500,300)||ovens[0].hp!==5.5)throw Error('half oven damage');ovens=[];amplifiers=[{owner:e,landed:true,hits:0,x:500,y:300,radius:24}];if(!interceptAmp(bullet,500,300)||amplifiers[0].hits!==.5)throw Error('half amp damage');
reset();if(fpsMagazines.length)throw Error('reset');console.log('FPS radar, bullets, ammunition, reload and magazine verified');
}`,sandbox);