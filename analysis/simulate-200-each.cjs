const fs=require('fs');let seed=20261024;const math=Object.create(Math);math.random=()=>{seed=(seed+0x6D2B79F5)>>>0;let t=seed;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};const elements=new Map(),ctx=new Proxy({},{get:()=>()=>{}});const document={getElementById(id){if(!elements.has(id))elements.set(id,{style:{},getContext:()=>ctx,addEventListener(){},setAttribute(){}});return elements.get(id);},addEventListener(){}};

const source=fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
const simulation=()=>{
  CHARACTERS.splice(CHARACTERS.findIndex(c=>c.name==='이서안'),1);
  const names=CHARACTERS.map(c=>c.name),N=names.length;
  const targetMatches=200,baseMatches=Math.floor(targetMatches/(N-1)),extraMatches=targetMatches-baseMatches*(N-1);
  const edges=[],adj=names.map(()=>[]);
  function edge(a,b){const id=edges.length;edges.push([a,b]);adj[a].push(id);adj[b].push(id);}
  // 18 opponents x 11 games = 198; two opponents get one extra game.
  for(let a=0;a<N;a++)for(let b=a+1;b<N;b++)for(let n=0;n<baseMatches;n++)edge(a,b);
  for(let a=0;a<N;a++)for(let d=1;d<=Math.floor(extraMatches/2);d++)edge(a,(a+d)%N);
  if(extraMatches%2){if(N%2)throw Error('Odd schedule degree');for(let a=0;a<N/2;a++)edge(a,a+N/2);}
  // Euler orientation gives every character exactly 100 games on each starting side.
  const used=new Set(),stack=[0],schedule=[];
  while(stack.length){const a=stack[stack.length-1];while(adj[a].length&&used.has(adj[a][adj[a].length-1]))adj[a].pop();if(!adj[a].length){stack.pop();continue;}const id=adj[a].pop();used.add(id);const b=edges[id][0]===a?edges[id][1]:edges[id][0];schedule.push([a,b]);stack.push(b);}
  for(let i=schedule.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[schedule[i],schedule[j]]=[schedule[j],schedule[i]];}
  const stats=names.map(name=>({name,matches:0,wins:0,losses:0,draws:0,timeouts:0,sides:[0,0]})),pairs={};
  for(let i=0;i<schedule.length;i++){
    const [a,b]=schedule[i];picks=[a,b];reset();state='running';
    for(let f=0;f<10800&&state==='running';f++){update(1/60);updateTexts(1/60);}
    const sa=stats[a],sb=stats[b];sa.matches++;sb.matches++;sa.sides[0]++;sb.sides[1]++;
    const key=[a,b].sort((x,y)=>x-y).join('-');if(!pairs[key])pairs[key]={a:names[Math.min(a,b)],b:names[Math.max(a,b)],matches:0,aWins:0,bWins:0,draws:0,timeouts:0};const pair=pairs[key];pair.matches++;
    if(state==='running'){sa.timeouts++;sb.timeouts++;pair.timeouts++;}
    else if(!winner){sa.draws++;sb.draws++;pair.draws++;}
    else{const w=winner.side===0?a:b,l=winner.side===0?b:a;stats[w].wins++;stats[l].losses++;if(names[w]===pair.a)pair.aWins++;else pair.bWins++;}
    if((i+1)%100===0)console.log('Completed '+(i+1)+'/'+schedule.length);
  }
  for(const s of stats){if(s.matches!==200||s.sides[0]!==100||s.sides[1]!==100)throw Error('Unbalanced schedule '+JSON.stringify(s));s.winRate=s.wins/2;}
  stats.sort((a,b)=>b.wins-a.wins);
  return {stats,pairs:Object.values(pairs),totalMatches:schedule.length};
};
const data=new Function('document','window','localStorage','Image','requestAnimationFrame','Math',source+'\nreturn ('+simulation.toString()+')()')(document,{devicePixelRatio:1},{getItem(){}},class{},()=>{},math);
fs.writeFileSync('analysis/current-200-each.json',JSON.stringify({seed:20261024,fps:60,limitSeconds:180,matchesPerCharacter:200,excluded:['이서안'],...data},null,2));
console.log(JSON.stringify(data.stats,null,2));


