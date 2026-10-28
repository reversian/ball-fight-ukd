const fs=require('fs'),vm=require('vm');
let seed=20261024;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
const elements=new Map();const ctx=new Proxy({},{get:()=>()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};
const sandbox={console,Math:seededMath,document,window:{devicePixelRatio:1},localStorage:{getItem(){}},Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`{
picks=[CHARACTERS.findIndex(c=>c.name==='이권율'),CHARACTERS.findIndex(c=>c.name==='이민규')];reset();state='running';const baker=balls[0],enemy=balls[1];baker.cd[0]=0;baker.def.update(baker,enemy,.01);if(ovens.length!==1||ovens[0].hp!==6)throw Error('summon');const o=ovens[0];const durability=o.hp;damageOven(o);if(o.hp!==durability)throw Error('airborne immunity');o.age=o.flight-.001;updateBakery(.002);if(!o.landed||!heatWaves.length)throw Error('landing wave');heatWaves=[];o.contacts.clear();o.x=350;o.y=350;baker.x=100;baker.y=100;enemy.x=650;enemy.y=650;const cd=baker.cd[0];update(.01);if(baker.cd[0]!==cd)throw Error('cooldown not paused');
enemy.x=350+44+enemy.radius-2;enemy.y=350;enemy.vx=-320;enemy.vy=0;updateBakery(.01);if(o.hp!==5||!enemy.bakeryBurn||enemy.vx<=0)throw Error('enemy collision');
const hp=enemy.hp;enemy.x=650;enemy.y=650;updateBakery(1);if(enemy.hp!==hp-2)throw Error('burn tick');damageOven(o);if(o.hp!==4||heatWaves.length!==1)throw Error('skill wave');
o.bake=o.interval-.01;updateBakery(.02);if(bakeryBread.length!==1||o.open<=0||o.bake!==0)throw Error('bread timer');
let bread=bakeryBread[0];baker.hp=180;bread.x=baker.x;bread.y=baker.y;bread.vx=0;bread.vy=0;updateBakery(.01);if(baker.hp!==185||bakeryBread.length)throw Error('bread healing');
for(let i=0;i<4;i++)damageOven(o);updateBakery(0);if(ovens.length)throw Error('destruction');reset();if(ovens.length||heatWaves.length||bakeryBread.length)throw Error('reset');console.log('Bakery summon, cooldown, collision, burn, waves, bread and destruction checks passed');
}`,sandbox);