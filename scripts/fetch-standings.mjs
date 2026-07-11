#!/usr/bin/env node
const BASE = 'https://api.jolpi.ca/ergast/f1/2026';
const OUT = new URL('../src/data/standings.json', import.meta.url);
const { writeFileSync } = await import('fs');

const TEAM_MAP = {
  'Alpine F1 Team': 'Alpine',
  'RB F1 Team': 'Racing Bulls',
  'Haas F1 Team': 'Haas',
  'Cadillac F1 Team': 'Cadillac',
};
const team = (t) => TEAM_MAP[t] || t;

async function main() {
  const [d, c] = await Promise.all([
    fetch(`${BASE}/driverStandings.json`).then(r => r.json()),
    fetch(`${BASE}/constructorStandings.json`).then(r => r.json()),
  ]);

  const sl = d.MRData.StandingsTable.StandingsLists[0];
  const cl = c.MRData.StandingsTable.StandingsLists[0];
  const round = sl.round;

  const drivers = sl.DriverStandings.map(d => ({
    pos: +d.position,
    name: `${d.Driver.givenName} ${d.Driver.familyName}`,
    team: team(d.Constructors[0].name),
    points: +d.points,
    wins: +d.wins,
  }));

  const constructors = cl.ConstructorStandings.map(c => ({
    pos: +c.position,
    name: team(c.Constructor.name),
    points: +c.points,
  }));

  const data = {
    lastUpdated: new Date().toISOString().split('T')[0],
    seasonProgress: { completed: +round, total: 22 },
    drivers,
    constructors,
  };

  writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n');
  console.log(`Updated standings.json — Round ${round}/22`);
}

main().catch(e => { console.error(e); process.exit(1); });
