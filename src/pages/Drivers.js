import { drivers2025 } from '../data/f1Data.js';

export function renderDrivers() {
  const driversDiv = document.createElement('div');
  driversDiv.className = 'drivers-page';
  
  let selectedDriver = null;
  
  function showDriverDetail(driver) {
    selectedDriver = driver;
    renderDriverDetail(driversDiv, driver, showDriversList);
  }
  
  function showDriversList() {
    selectedDriver = null;
    renderDriversList(driversDiv, showDriverDetail);
  }
  
  renderDriversList(driversDiv, showDriverDetail);
  
  return driversDiv;
}

function renderDriversList(container, onSelectDriver) {
  container.innerHTML = '';
  
  const section = document.createElement('section');
  section.className = 'drivers-grid-section';
  
  const heading = document.createElement('h1');
  heading.className = 'page-title';
  heading.textContent = '2025 FORMULA ONE DRIVERS';
  section.appendChild(heading);
  
  const driversGrid = document.createElement('div');
  driversGrid.className = 'drivers-grid';
  
  drivers2025.forEach((driver) => {
    const card = document.createElement('button');
    card.className = 'driver-card';
    card.style.setProperty('--team-color', driver.color);
    card.innerHTML = `
      <div class="driver-photo-wrap">
        <img class="driver-photo" src="${driver.image}" alt="${driver.name.replace('\n', ' ')}" loading="lazy" />
      </div>
      <div class="driver-card-header">
        <span class="driver-number">#${driver.number}</span>
        <h2>${driver.name.replace('\n', ' ')}</h2>
        <p>${driver.team}</p>
      </div>
    `;
    card.onclick = () => onSelectDriver(driver);
    driversGrid.appendChild(card);
  });
  
  section.appendChild(driversGrid);
  container.appendChild(section);
}

function renderDriverDetail(container, driver, onBack) {
  const isNorris = driver.name.includes('Norris');
  
  const stats = isNorris
    ? { pos: '1st', pts: 408, races: 23, gpPts: 379, wins: 7, podiums: 17, poles: 7, top10: 20, fl: 6, dnf: 2 }
    : { pos: '2nd', pts: 370, races: 23, gpPts: 341, wins: 9, podiums: 18, poles: 4, top10: 21, fl: 5, dnf: 1 };
  
  const seasonRows = [
    ['Season Position', stats.pos],
    ['Season Points', stats.pts],
    ['Grand Prix Races', stats.races],
    ['Grand Prix Points', stats.gpPts],
    ['Grand Prix Wins', stats.wins],
    ['Grand Prix Podiums', stats.podiums],
    ['Grand Prix Poles', stats.poles],
    ['Grand Prix Top 10s', stats.top10],
    ['DHL Fastest Laps', stats.fl],
    ['DNFs', stats.dnf],
  ];
  
  const careerRows = [
    ['Grand Prix Entered', isNorris ? 151 : 123],
    ['Career Points', isNorris ? 1415 : 982],
    ['Highest Race Finish', '1 (x11)'],
    ['Podiums', isNorris ? 43 : 31],
    ['Highest Grid Position', '1 (x16)'],
    ['Pole Positions', isNorris ? 16 : 8],
    ['World Championships', 0],
    ['DNFs', isNorris ? 13 : 10],
  ];
  
  container.innerHTML = `
    <div class="driver-detail">
      <button class="back-btn">← Back to Drivers</button>
      <header class="driver-detail-hero" style="--team-color: ${driver.color}">
        <div class="driver-detail-copy">
          <p>${driver.nationality} ${driver.team} | #${driver.number}</p>
          <h1>${driver.name.replace('\n', ' ')}</h1>
        </div>
        <img class="driver-detail-photo" src="${driver.image}" alt="${driver.name.replace('\n', ' ')}" />
      </header>
      
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
  
  seasonRows.forEach(([label, value]) => {
    const row = document.createElement('div');
    row.className = 'stat-row';
    row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    seasonCard.appendChild(row);
  });
  statsGrid.appendChild(seasonCard);
  
  // Add career stats
  const careerCard = document.createElement('section');
  careerCard.className = 'stats-card';
  careerCard.innerHTML = `<h2>CAREER STATS</h2>`;
  
  careerRows.forEach(([label, value]) => {
    const row = document.createElement('div');
    row.className = 'stat-row';
    row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    careerCard.appendChild(row);
  });
  statsGrid.appendChild(careerCard);
}
