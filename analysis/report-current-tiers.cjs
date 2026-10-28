const fs = require('fs');
const data = JSON.parse(fs.readFileSync('analysis/all-character-balance.json', 'utf8'));
const tier = r => r >= 70 ? 'S' : r >= 60 ? 'A' : r >= 45 ? 'B' : r >= 35 ? 'C' : 'D';
const rows = data.stats.map((s, i) => {
  const matchups = data.pairs.filter(p => p.a === s.name || p.b === s.name).map(p => ({
    opponent: p.a === s.name ? p.b : p.a,
    rate: (p.a === s.name ? p.aWins : p.bWins) / data.matchesPerPair * 100,
    timeouts: p.timeouts,
  })).sort((a,b) => b.rate - a.rate);
  return {rank:i+1,...s,tier:tier(s.winRate),best:matchups.slice(0,3),worst:matchups.slice(-3).reverse(),matchups};
});
const count = data.pairs.length * data.matchesPerPair;
let md = `# 현재 캐릭터 티어 분석\n\n${data.stats.length}명, ${data.pairs.length}개 조합, 조합별 ${data.matchesPerPair}판, 총 ${count}판. 60FPS, 경기당 실제 시뮬레이션 시간 180초 제한, 좌우 교대. 렌더링과 오디오 없이 현재 게임의 전투 코드를 실행했습니다.\n\n승률은 전체 경기 중 승리 비율이며 시간 초과와 무승부도 분모에 포함합니다. S 70% 이상, A 60% 이상, B 45% 이상, C 35% 이상, D 35% 미만.\n\n| 순위 | 캐릭터 | 티어 | 승률 | 승 | 패 | 시간 초과 |\n|---|---|---|---|---|---|---|\n`;
for(const r of rows) md += `| ${r.rank} | ${r.name} | ${r.tier} | ${r.winRate.toFixed(1)}% | ${r.wins} | ${r.losses} | ${r.timeouts} |\n`;
for(const r of rows) {
  md += `\n## ${r.name}\n\n| 상대 | 승률 | 시간 초과 |\n|---|---|---|\n`;
  for(const m of r.matchups) md += `| ${m.opponent} | ${m.rate.toFixed(1)}% | ${m.timeouts} |\n`;
}
fs.writeFileSync('analysis/current-tiers.md',md);
fs.writeFileSync('analysis/current-tiers.json',JSON.stringify({matches:count,rows},null,2));
console.log(JSON.stringify(rows.map(({rank,name,tier,winRate,timeouts,best,worst})=>({rank,name,tier,winRate,timeouts,best,worst})),null,2));
