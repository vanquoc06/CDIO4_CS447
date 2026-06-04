import { schedule, raceImages } from '../data/f1Data.js';

export function renderSchedule() {
  const scheduleDiv = document.createElement('div');
  scheduleDiv.className = 'schedule';
  
  // Title row
  const titleRow = document.createElement('div');
  titleRow.className = 'schedule-title-row';
  titleRow.innerHTML = `
    <h1 class="page-title">2025 FIA FORMULA ONE WORLD CHAMPIONSHIP™ RACE CALENDAR</h1>
    <button class="calendar-btn">Add F1 calendar</button>
  `;
  scheduleDiv.appendChild(titleRow);
  
  // Featured races
  const featured = document.createElement('section');
  featured.className = 'schedule-featured';
  
  const previousRaces = schedule.slice(-4, -1);
  const nextRace = schedule.find((race) => race.isNext);
  
  // Previous races
  const prevDiv = document.createElement('div');
  const prevHeading = document.createElement('h2');
  prevHeading.textContent = 'Previous';
  prevDiv.appendChild(prevHeading);
  
  const prevRacesDiv = document.createElement('div');
  prevRacesDiv.className = 'featured-races previous-races';
  
  previousRaces.forEach((race) => {
    const card = document.createElement('article');
    card.className = 'featured-race-card';
    card.innerHTML = `
      <img src="${raceImages[race.name] ?? raceImages.default}" alt="${race.name} Grand Prix" />
      <div class="featured-race-copy">
        <span>${race.round}</span>
        <h3>${race.name}</h3>
        <p>${race.date}</p>
      </div>
    `;
    prevRacesDiv.appendChild(card);
  });
  
  prevDiv.appendChild(prevRacesDiv);
  featured.appendChild(prevDiv);
  
  // Next race
  if (nextRace) {
    const nextDiv = document.createElement('div');
    const nextHeading = document.createElement('h2');
    nextHeading.textContent = 'Next';
    nextDiv.appendChild(nextHeading);
    
    const card = document.createElement('article');
    card.className = 'featured-race-card next-featured';
    card.innerHTML = `
      <img src="${raceImages[nextRace.name] ?? raceImages.default}" alt="${nextRace.name} Grand Prix" />
      <div class="featured-race-copy">
        <span>${nextRace.round}</span>
        <h3>${nextRace.name}</h3>
        <p>${nextRace.date}</p>
      </div>
    `;
    nextDiv.appendChild(card);
    featured.appendChild(nextDiv);
  }
  
  scheduleDiv.appendChild(featured);
  
  // Weekend sessions
  const weekendPanel = document.createElement('section');
  weekendPanel.className = 'weekend-session-panel';
  
  const toolbar = document.createElement('div');
  toolbar.className = 'weekend-session-toolbar';
  toolbar.innerHTML = `
    <button class="calendar-btn compact">Add F1 calendar</button>
    <div class="time-toggle" aria-label="Time display">
      <button class="active">My time</button>
      <button>Track time</button>
    </div>
  `;
  weekendPanel.appendChild(toolbar);
  
  const weekendSessions = [
    { day: '14', month: 'MAR', title: 'PRACTICE 1', time: '08:30 - 09:30' },
    { day: '14', month: 'MAR', title: 'PRACTICE 2', time: '12:00 - 13:00' },
    { day: '15', month: 'MAR', title: 'PRACTICE 3', time: '08:30 - 09:30' },
    { day: '15', month: 'MAR', title: 'QUALIFYING', time: '12:00 - 13:00' },
    { day: '16', month: 'MAR', title: 'RACE', time: '11:00' },
  ];
  
  const sessionList = document.createElement('div');
  sessionList.className = 'weekend-session-list';
  
  weekendSessions.forEach((session) => {
    const row = document.createElement('article');
    row.className = 'session-row';
    row.innerHTML = `
      <div class="session-date">
        <strong>${session.day}</strong>
        <span>${session.month}</span>
      </div>
      <div class="session-detail">
        <h3>${session.title}</h3>
        <time>${session.time}</time>
      </div>
    `;
    sessionList.appendChild(row);
  });
  
  weekendPanel.appendChild(sessionList);
  scheduleDiv.appendChild(weekendPanel);
  
  // Full calendar
  const calendarSection = document.createElement('section');
  calendarSection.className = 'race-calendar';
  
  const calendarHeading = document.createElement('h2');
  calendarHeading.textContent = '2025 CALENDAR';
  calendarSection.appendChild(calendarHeading);
  
  const calendarTable = document.createElement('div');
  calendarTable.className = 'calendar-table';
  
  schedule.forEach((race) => {
    const raceRow = document.createElement('div');
    raceRow.className = 'calendar-race-row';
    raceRow.innerHTML = `
      <div class="race-flag">${race.flag}</div>
      <div class="race-name">${race.name}</div>
      <div class="race-round">${race.round}</div>
      <div class="race-date">${race.date}</div>
      ${race.sponsor ? `<div class="race-sponsor">${race.sponsor}</div>` : ''}
    `;
    calendarTable.appendChild(raceRow);
  });
  
  calendarSection.appendChild(calendarTable);
  scheduleDiv.appendChild(calendarSection);
  
  return scheduleDiv;
}
