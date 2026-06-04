import { drivers2025, news } from '../data/f1Data.js';

export function renderNews() {
  const newsPage = document.createElement('div');
  newsPage.className = 'news-page';
  
  const latestSection = document.createElement('section');
  latestSection.className = 'latest-news';
  
  const heading = document.createElement('h1');
  heading.textContent = 'LATEST F1 NEWS';
  latestSection.appendChild(heading);
  
  const filters = ['All', 'Analysis', 'Technical', 'Lifestyle & Culture', 'F1 Unlocked', 'F2', 'F3', 'F1 Academy'];
  let activeFilter = 'All';
  
  const toolbar = document.createElement('div');
  toolbar.className = 'news-toolbar';
  
  const filtersContainer = document.createElement('div');
  filtersContainer.className = 'news-filters';
  
  function updateNewsGrid() {
    const visibleNews = news.slice(0, 6);
    newsGrid.innerHTML = '';
    
    visibleNews.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'latest-news-card';
      card.innerHTML = `
        <img src="${item.image}" alt="" loading="lazy" />
        <div>
          ${item.tag ? `<span style="background-color: ${item.bg}">${item.tag}</span>` : ''}
          <h2>${item.title}</h2>
          <p>${item.time}</p>
        </div>
      `;
      newsGrid.appendChild(card);
    });
  }
  
  filters.forEach((filter) => {
    const button = document.createElement('button');
    button.className = `filter-pill ${filter === 'All' ? 'active' : ''}`;
    button.textContent = filter;
    button.onclick = () => {
      document.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeFilter = filter;
      updateNewsGrid();
    };
    filtersContainer.appendChild(button);
  });
  
  toolbar.appendChild(filtersContainer);
  
  const selectBtn = document.createElement('button');
  selectBtn.className = 'news-filter-select';
  selectBtn.textContent = 'All⌄';
  toolbar.appendChild(selectBtn);
  
  latestSection.appendChild(toolbar);
  
  const newsGrid = document.createElement('div');
  newsGrid.className = 'latest-news-grid';
  
  updateNewsGrid();
  latestSection.appendChild(newsGrid);
  
  newsPage.appendChild(latestSection);
  
  // Featured article
  const hadjar = drivers2025.find((driver) => driver.name.includes('Hadjar'));
  
  const article = document.createElement('article');
  article.className = 'news-article';
  
  const tags = document.createElement('div');
  tags.className = 'article-tags';
  tags.innerHTML = `
    <span>ISACK HADJAR</span>
    <span>RED BULL RACING</span>
    <span>MAX VERSTAPPEN</span>
    <button aria-label="More related tags">›</button>
  `;
  article.appendChild(tags);
  
  const header = document.createElement('header');
  header.className = 'article-header';
  header.innerHTML = `
    <h1>'THE BEGINNING OF A NEW JOURNEY' - HADJAR ADMITS HE 'NEEDS TO DELIVER' AS HE REACTS TO RED BULL PROMOTION</h1>
    <p>Ahead of his final race as a Racing Bulls driver, Isack Hadjar has been reflecting on what lies ahead for him in 2026 as he prepares to join Max Verstappen at Red Bull.</p>
    <time>5 hours ago</time>
  `;
  article.appendChild(header);
  
  const figure = document.createElement('figure');
  figure.className = 'article-hero';
  figure.innerHTML = `<img src="${hadjar?.image}" alt="Isack Hadjar" />`;
  article.appendChild(figure);
  
  const body = document.createElement('div');
  body.className = 'article-body';
  body.innerHTML = `
    <p><strong>Isack Hadjar has shared his reaction following the news that he will be promoted to Red Bull in 2026, with the Frenchman admitting that he "needs to deliver" as he prepares to embark on "the beginning of a new journey".</strong></p>
    <p>It was confirmed in the days prior to the 2025 season finale in Abu Dhabi that <a href="#hadjar">Hadjar</a> - who has impressed many during his rookie campaign for <a href="#racing-bulls">Racing Bulls</a> - will <a href="#promotion">make the step up</a> to partner <a href="#verstappen">Max Verstappen</a> next year, while <a href="#tsunoda">Yuki Tsunoda</a> becomes a reserve driver for the outfit.</p>
    <p>Over at Racing Bulls, <a href="#lawson">Liam Lawson</a> continues on with the squad and rookie <a href="#lindblad">Arvid Lindblad</a> will join to fill Hadjar's vacant seat.</p>
  `;
  article.appendChild(body);
  
  newsPage.appendChild(article);
  
  return newsPage;
}
