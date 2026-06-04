import { teams2025 } from '../data/f1Data.js';

export function renderTeams() {
  const teamsDiv = document.createElement('div');
  teamsDiv.className = 'teams';
  teamsDiv.innerHTML = `
    <p class="section-kicker">F1 TEAMS 2025</p>
    <p class="section-subtitle">Find the current Formula 1 teams for the 2025 season</p>
  `;
  
  const teamsGrid = document.createElement('div');
  teamsGrid.className = 'teams-grid';
  
  let selectedTeam = null;
  
  function showTeamDetail(team) {
    selectedTeam = team;
    renderTeamDetail(teamsDiv, team, showTeams);
  }
  
  function showTeams() {
    selectedTeam = null;
    teamsDiv.innerHTML = `
      <p class="section-kicker">F1 TEAMS 2025</p>
      <p class="section-subtitle">Find the current Formula 1 teams for the 2025 season</p>
    `;
    const grid = document.createElement('div');
    grid.className = 'teams-grid';
    
    teams2025.forEach((team) => {
      const button = document.createElement('button');
      button.className = 'team-card';
      button.style.setProperty('--team-color', team.color);
      button.innerHTML = `
        <div class="team-card-header">
          <h2>${team.name}</h2>
          <div class="team-drivers">
            ${team.drivers.map((driver) => `<span>${driver}</span>`).join('')}
          </div>
        </div>
        <div class="team-car">
          <img src="${team.image}" alt="${team.name} 2025 Formula 1 car" loading="lazy" />
        </div>
      `;
      button.onclick = () => showTeamDetail(team);
      grid.appendChild(button);
    });
    
    teamsDiv.appendChild(grid);
  }
  
  teams2025.forEach((team) => {
    const button = document.createElement('button');
    button.className = 'team-card';
    button.style.setProperty('--team-color', team.color);
    button.innerHTML = `
      <div class="team-card-header">
        <h2>${team.name}</h2>
        <div class="team-drivers">
          ${team.drivers.map((driver) => `<span>${driver}</span>`).join('')}
        </div>
      </div>
      <div class="team-car">
        <img src="${team.image}" alt="${team.name} 2025 Formula 1 car" loading="lazy" />
      </div>
    `;
    button.onclick = () => showTeamDetail(team);
    teamsGrid.appendChild(button);
  });
  
  teamsDiv.appendChild(teamsGrid);
  
  return teamsDiv;
}

function renderTeamDetail(container, team, onBack) {
  const isMcLaren = team.name === 'McLaren';
  
  const seasonRows = isMcLaren ? [
    ['Season Position', '1st'],
    ['Season Points', '800'],
    ['Grand Prix Races', '23'],
    ['Grand Prix Points', '742'],
    ['Grand Prix Wins', '14'],
    ['Grand Prix Podiums', '32'],
    ['Grand Prix Poles', '13'],
    ['Grand Prix Top 10s', '41'],
    ['DHL Fastest Laps', '12'],
    ['DNFs', '3'],
  ] : [];
  
  const summaryRows = isMcLaren ? [
    ['Grand Prix Entered', '994'],
    ['Team Points', '7750.5'],
    ['Highest Race Finish', '1 (x203)'],
    ['Podiums', '444'],
    ['Highest Grid Position', '1 (x177)'],
    ['Pole Positions', '177'],
    ['World Championships', '10'],
  ] : [];
  
  container.innerHTML = `
    <div class="team-detail">
      <header class="team-detail-hero" style="--team-color: ${team.color}">
        <img class="team-detail-image" src="${team.image}" alt="${team.name} 2025 Formula 1 car" />
        <div class="team-detail-copy">
          <h1>${team.name.toUpperCase()}</h1>
          <div>${team.drivers.map((driver) => `<span>${driver}</span>`).join('')}</div>
        </div>
      </header>
      
      <button class="back-btn">← Back to Teams</button>
      <div class="stats-grid"></div>
    </div>
  `;
  
  const backBtn = container.querySelector('.back-btn');
  backBtn.onclick = onBack;
  
  const statsGrid = container.querySelector('.stats-grid');
  
  // Add season stats
  const seasonCard = document.createElement('section');
  seasonCard.className = 'stats-card';
  seasonCard.innerHTML = `<h2>2025 SEASON</h2>`;
  
  if (seasonRows.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'Season stats coming soon.';
    seasonCard.appendChild(empty);
  } else {
    seasonRows.forEach(([label, value]) => {
      const row = document.createElement('div');
      row.className = 'stat-row';
      row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
      seasonCard.appendChild(row);
    });
  }
  statsGrid.appendChild(seasonCard);
  
  // Add summary stats
  const summaryCard = document.createElement('section');
  summaryCard.className = 'stats-card';
  summaryCard.innerHTML = `<h2>TEAM SUMMARY</h2>`;
  
  if (summaryRows.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'Team summary coming soon.';
    summaryCard.appendChild(empty);
  } else {
    summaryRows.forEach(([label, value]) => {
      const row = document.createElement('div');
      row.className = 'stat-row';
      row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
      summaryCard.appendChild(row);
    });
  }
  statsGrid.appendChild(summaryCard);
}
