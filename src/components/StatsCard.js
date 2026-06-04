export function renderStatsCard(title, rows, emptyMessage = '') {
  const section = document.createElement('section');
  section.className = 'stats-card';
  
  const heading = document.createElement('h2');
  heading.textContent = title;
  section.appendChild(heading);
  
  if (rows.length === 0 && emptyMessage) {
    const p = document.createElement('p');
    p.className = 'empty-state';
    p.textContent = emptyMessage;
    section.appendChild(p);
  }
  
  rows.forEach(([label, value]) => {
    const row = document.createElement('div');
    row.className = 'stat-row';
    
    const labelSpan = document.createElement('span');
    labelSpan.textContent = label;
    
    const valueSpan = document.createElement('strong');
    valueSpan.textContent = value;
    
    row.appendChild(labelSpan);
    row.appendChild(valueSpan);
    section.appendChild(row);
  });
  
  return section;
}
