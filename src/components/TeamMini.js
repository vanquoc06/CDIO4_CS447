export function renderTeamMini(team, name, teams2025) {
  const span = document.createElement('span');
  span.className = 'person-cell';
  
  const badge = document.createElement('span');
  badge.className = 'team-badge';
  
  let badgeColor = team?.color;
  if (!badgeColor && name) {
    const teamInfo = teams2025.find(t => t.name === name);
    badgeColor = teamInfo?.color ?? '#ff8000';
  }
  badge.style.setProperty('--dot-color', badgeColor);
  
  const text = document.createElement('span');
  text.textContent = name;
  
  span.appendChild(badge);
  span.appendChild(text);
  
  return span;
}
