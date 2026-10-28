const fs=require('fs');let seed=20261024;const math=Object.create(Math);math.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};const elements=new Map(),ctx=new Proxy({},{get:()=>()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};

const source=fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
function comparison(){
  const a=CHARACTERS.findIndex(c=>c.name==='김재윤'),rows=[];
  const totals={on:{matches:0,wins:0,losses:0,timeouts:0,draws:0},off:{matches:0,wins:0,losses:0,timeouts:0,draws:0},activated:0,rescued:0,reversed:0};
  for(let b=0;b<CHARACTERS.length;b++){
    if(a===b||CHARACTERS[b].name==='이서안')continue;
    const row={opponent:CHARACTERS[b].name,onWins:0,offWins:0,rescued:0,reversed:0,activated:0};
    for(let n=0;n<20;n++){
      const outcomes={};
      for(const mode of ['on','off']){
        reseed(20261028+b*100+n);const side=n%2;picks=side?[b,a]:[a,b];reset();state='running';const artist=balls[side];if(mode==='off')artist.mireunUsed=true;
        for(let f=0;f<10800&&state==='running';f++){update(1/60);updateTexts(1/60);}
        const s=totals[mode];s.matches++;
        const result=state==='running'?'timeouts':!winner?'draws':winner===artist?'wins':'losses';s[result]++;outcomes[mode]=result;
        if(result==='wins')row[mode+'Wins']++;
        if(mode==='on'&&artist.mireunUsed){row.activated++;totals.activated++;}
      }
      if(outcomes.on==='wins'&&outcomes.off!=='wins'){row.rescued++;totals.rescued++;}
      if(outcomes.off==='wins'&&outcomes.on!=='wins'){row.reversed++;totals.reversed++;}
    }
    rows.push(row);console.log(JSON.stringify(row));
  }
  return {totals,rows};
}
const data=new Function('document','window','localStorage','Image','requestAnimationFrame','Math','reseed',source+'\nreturn ('+comparison.toString()+')()')(document,{devicePixelRatio:1},{getItem(){}},class{},()=>{},math,v=>{seed=v;});
fs.writeFileSync('analysis/mireun-impact.json',JSON.stringify({matchesPerOpponentPerMode:20,fps:60,limitSeconds:180,...data},null,2));console.log(JSON.stringify(data.totals));
