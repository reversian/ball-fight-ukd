const fs = require('fs');
const prefix = fs.readFileSync('analysis/simulate-junwoo.cjs', 'utf8').split('const results=vm.runInContext')[0];
eval(prefix + `vm.runInContext(${JSON.stringify(`
const moon = {x:100,y:100,outfit:0,radarAngle:0};
const target = {x:180,y:100,radius:20,hp:190,reviving:0,dodgeTime:2};
if (moonRadarHits(moon,target)) throw Error('Radar detected invulnerability');
target.dodgeTime=0;
if (!moonRadarHits(moon,target)) throw Error('Radar did not recover');
let hits=0;
projectiles=[{owner:{},target,homing:true,x:100,y:100,r:10,onHit(){hits++}}];
updateProjectiles(.01);
target.dodgeTime=2; target.y=300;
updateProjectiles(.01);
if(projectiles[0].y!==100 || hits) throw Error('Homing tracked invulnerability');
target.dodgeTime=0;
updateProjectiles(.01);
if(projectiles[0].y!==100) throw Error('Homing reacquired lost target');
console.log('Radar and tracking checks passed');
`)}, sandbox);`);
