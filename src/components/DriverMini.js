export function renderDriverMini(driver, team, teams2025) {
  const span = document.createElement('span');
  span.className = 'person-cell';
  
  const dot = document.createElement('span');
  dot.className = 'result-dot';
  
  let dotColor = driver?.color;
  if (!dotColor && team) {
    const teamInfo = teams2025.find(t => t.name === team);
    dotColor = teamInfo?.color ?? '#ff8000';
  }
  dot.style.setProperty('--dot-color', dotColor);
  
  if (driver?.image) {
    const img = document.createElement('img');
    img.src = driver.image;
    img.alt = '';
    img.loading = 'lazy';
    dot.appendChild(img);
  }
  
  const text = document.createElement('span');
  text.textContent = driver ? driver.name.replace('\n', ' ') : team;
  
  span.appendChild(dot);
  span.appendChild(text);
  
  return span;
}
