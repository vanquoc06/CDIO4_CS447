import { drivers2025, raceResults, teams2025 } from '../data/f1Data.js';

const tabs = ['Races', 'Drivers', 'Teams', 'Awards'];

const driverStandings = [
  ['Lando Norris', 'GBR', 'McLaren', 408],
  ['Max Verstappen', 'NED', 'Red Bull Racing', 396],
  ['Oscar Piastri', 'AUS', 'McLaren', 392],
  ['George Russell', 'GBR', 'Mercedes', 309],
  ['Charles Leclerc', 'MON', 'Ferrari', 242],
  ['Lewis Hamilton', 'GBR', 'Ferrari', 156],
].map(([name, nationality, team, points], index) => ({
  pos: index + 1,
  name,
  nationality,
  team,
  points,
  driver: drivers2025.find((driver) => driver.name.replace('\n', ' ') === name),
  teamInfo: teams2025.find((item) => item.name === team),
}));

const teamStandings = [
  ['McLaren', 800],
  ['Mercedes', 459],
  ['Red Bull Racing', 426],
  ['Ferrari', 382],
  ['Williams', 137],
  ['Racing Bulls', 92],
].map(([name, points], index) => ({
  pos: index + 1,
  name,
  points,
  team: teams2025.find((item) => item.name === name),
}));

const awards = [
  ['DHL Fastest Lap Award', 'Lando Norris', 'McLaren'],
  ['Pole Position Award', 'Oscar Piastri', 'McLaren'],
  ['Overtake Award', 'Max Verstappen', 'Red Bull Racing'],
  ['Rookie Highlight', 'Kimi Antonelli', 'Mercedes'],
];

export function renderResults() {
  const results = document.createElement('div');
  results.className = 'results';
  
  // Top bar with tabs
  const topbar = document.createElement('div');
  topbar.className = 'results-topbar';
  topbar.innerHTML = '<button class="season-select">2025⌄</button>';
  
  let activeTab = 'Races';
  
  function updateTabContent(tab) {
    activeTab = tab;
    const tabButtons = topbar.querySelectorAll('.results-tab');
    tabButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-tab') === tab) {
        btn.classList.add('active');
      }
    });
    renderTabContent(results, tab);
  }
  
  tabs.forEach((tab) => {
    const button = document.createElement('button');
    button.className = `results-tab ${tab === 'Races' ? 'active' : ''}`;
    button.textContent = tab;
    button.setAttribute('data-tab', tab);
    button.onclick = () => updateTabContent(tab);
    topbar.appendChild(button);
  });
  
  results.appendChild(topbar);
  
  const filterBtn = document.createElement('button');
  filterBtn.className = 'results-filter';
  filterBtn.textContent = 'All⌄';
  results.appendChild(filterBtn);
  
  // Initial content
  renderTabContent(results, 'Races');
  
  return results;
}

function renderTabContent(container, activeTab) {
  const existingContent = container.querySelector('.results-content');
  if (existingContent) {
    existingContent.remove();
  }
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'results-content';
  
  if (activeTab === 'Races') {
    contentDiv.innerHTML = `
      <h1 class="results-title">2025 RACE RESULTS</h1>
      <div class="table-shell">
        <table class="results-table">
          <thead>
            <tr>
              <th>Grand Prix</th>
              <th>Date</th>
              <th>Winner</th>
              <th>Team</th>
              <th>Laps</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            ${raceResults.map((result) => {
              const driver = drivers2025.find(d => d.name.includes(result.winner.split(' ')[0]));
              const teamColor = teams2025.find(t => t.name === result.p1team)?.color || '#ff8000';
              return `
                <tr>
                  <td><strong>${result.race}</strong></td>
                  <td>${result.date}</td>
                  <td>
                    <span class="person-cell">
                      <span class="result-dot" style="--dot-color: ${driver?.color || teamColor}">
                        ${driver?.image ? `<img src="${driver.image}" alt="" loading="lazy" />` : ''}
                      </span>
                      ${result.winner}
                    </span>
                  </td>
                  <td>
                    <span class="person-cell">
                      <span class="team-badge" style="--dot-color: ${teamColor}"></span>
                      ${result.p1team}
                    </span>
                  </td>
                  <td>${result.round}</td>
                  <td>${result.time}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  } else if (activeTab === 'Drivers') {
    contentDiv.innerHTML = `
      <h1 class="results-title">2025 DRIVER STANDINGS</h1>
      <div class="table-shell">
        <table class="results-table">
          <thead>
            <tr>
              <th>POS</th>
              <th>DRIVER</th>
              <th>NATIONALITY</th>
              <th>TEAM</th>
              <th>POINTS</th>
            </tr>
          </thead>
          <tbody>
            ${driverStandings.map((standing) => {
              return `
                <tr>
                  <td><strong>${standing.pos}</strong></td>
                  <td>
                    <span class="person-cell">
                      <span class="result-dot" style="--dot-color: ${standing.driver?.color || '#ff8000'}">
                        ${standing.driver?.image ? `<img src="${standing.driver.image}" alt="" loading="lazy" />` : ''}
                      </span>
                      ${standing.name}
                    </span>
                  </td>
                  <td>${standing.nationality}</td>
                  <td>
                    <span class="person-cell">
                      <span class="team-badge" style="--dot-color: ${standing.teamInfo?.color || '#ff8000'}"></span>
                      ${standing.team}
                    </span>
                  </td>
                  <td><strong>${standing.points}</strong></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  } else if (activeTab === 'Teams') {
    contentDiv.innerHTML = `
      <h1 class="results-title">2025 TEAM STANDINGS</h1>
      <div class="table-shell">
        <table class="results-table">
          <thead>
            <tr>
              <th>POS</th>
              <th>TEAM</th>
              <th>POINTS</th>
            </tr>
          </thead>
          <tbody>
            ${teamStandings.map((standing) => {
              return `
                <tr>
                  <td><strong>${standing.pos}</strong></td>
                  <td>
                    <span class="person-cell">
                      <span class="team-badge" style="--dot-color: ${standing.team?.color || '#ff8000'}"></span>
                      ${standing.name}
                    </span>
                  </td>
                  <td><strong>${standing.points}</strong></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  } else if (activeTab === 'Awards') {
    contentDiv.innerHTML = `
      <h1 class="results-title">2025 AWARDS</h1>
      <div class="awards-grid">
        ${awards.map(([award, winner, team]) => {
          return `
            <div class="award-card">
              <h3>${award}</h3>
              <p><strong>${winner}</strong></p>
              <p>${team}</p>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
  
  container.appendChild(contentDiv);
}
