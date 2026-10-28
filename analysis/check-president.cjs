const fs=require('fs'),vm=require('vm');
let seed=20261024;const seededMath=Object.create(Math);seededMath.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};
const elements=new Map();const ctx=new Proxy({},{get:(_,key)=>key==='measureText'?()=>({width:50}):()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};
const sandbox={console,Math:seededMath,document,window:{devicePixelRatio:1},localStorage:{getItem(){}},Image:class{},requestAnimationFrame(){}};vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
vm.runInContext(`{
for(const winnerName of ['정찬영','박건']){
 picks=[CHARACTERS.findIndex(c=>c.name==='정찬영'),CHARACTERS.findIndex(c=>c.name==='박건')];reset();state='running';const c=balls[0],p=balls[1];c.x=80;c.y=80;p.x=SIZE-80;p.y=SIZE-80;p.domain={r:100};startElection(c);
 if(balls.some(b=>Math.hypot(b.x-electionState.ballot.x,b.y-electionState.ballot.y)-b.radius-24<150))throw Error('ballot too close');if(!electionState.special||electionState.remaining!==1.5)throw Error('special intro');const x=c.x;update(.5);if(c.x!==x)throw Error('intro freeze');update(1);if(electionState.phase!=='election')throw Error('special start');
 const hp=p.hp;dealDamage(c,p,20);if(p.hp!==hp)throw Error('election invulnerability');const r=p.domain.r;update(.1);if(c.x===x||p.domain.r!==r)throw Error('movement or domain freeze');
 const winner=winnerName==='정찬영'?c:p,loser=winner===c?p:c;winner.x=electionState.ballot.x;winner.y=electionState.ballot.y;loser.x=winner.x<SIZE/2?SIZE-60:60;loser.y=winner.y<SIZE/2?SIZE-60:60;loser.hp=190;const before=loser.hp;update(.01);if(electionState.phase!=='celebrate'||electionState.winner!==winner||loser.hp!==before)throw Error('golden celebration');const goldX=winner.x;update(1);if(winner.x!==goldX||electionResult)throw Error('celebration freeze');update(1);
 if(electionState||electionResult.winner!==winner||electionResult.total!==1.5||winner.presidentBuff!==20||loser.hp!==before-10||loser.stun!==1||loser.stunKnockback.boost!==3)throw Error('special result');
 update(1.5);if(electionResult)throw Error('result duration');if(dealDamage(loser,winner,2,{})!==(winner.def.name==='박건'?2:1)||dealDamage(loser,winner,5,{})!==(winner.def.name==='박건'?5:3))throw Error('president defense');
 if(dealDamage(winner,loser,4,{source:'test'})!==5)throw Error('president attack');const specialSource=winner.def.name==='박건'?'domain':'conure';if(dealDamage(winner,loser,4,{source:specialSource})!==6)throw Error('president skill bonus');if(winner.presidentSkillBuff!==20)throw Error('skill duration');
 winner.x=200;winner.y=200;loser.x=200+winner.radius+loser.radius-1;loser.y=200;winner.stun=0;loser.stun=0;touching=false;const prior=loser.hp;collideBalls(winner,loser);if(loser.hp!==prior-(winner.def.name==='박건'?1:3)||loser.boost!==3)throw Error('president contact');
 winner.presidentBuff=.01;update(.02);if(winner.presidentBuff!==0||winner.presidentSkillBuff!==0)throw Error('buff expiry');
}
console.log('President election: both winners, freeze, immunity, buffs, contact and expiry verified');
}`,sandbox);



vm.runInContext(`{
reset();state='running';const c=balls[0],p=balls[1];c.x=200;c.y=300;p.x=200+c.radius+p.radius+2;p.y=300;c.vx=c.speed;c.vy=0;p.vx=-p.speed;p.vy=0;startElection(c);p.x=c.x+c.radius+p.radius+2;update(1.5);electionState.ballot={x:540,y:540};const chp=c.hp,php=p.hp;update(.03);if(Math.hypot(c.x-p.x,c.y-p.y)<c.radius+p.radius-1e-8||c.vx>=0||p.vx<=0||c.hp!==chp||p.hp!==php)throw Error('election body collision');console.log('Election bodies bounce without damage');
}`,sandbox);






