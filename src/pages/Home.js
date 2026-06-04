import { drivers2025, news } from '../data/f1Data.js';

export function renderHome() {
  const home = document.createElement('div');
  home.className = 'home';
  
  // Race status
  const raceStatus = document.createElement('div');
  raceStatus.className = 'race-status';
  raceStatus.innerHTML = `
    <div class="race-status-left">
      <span class="race-location">Abu Dhabi</span>
      <strong>FP1</strong>
      <b>15<small>H</small> 41<small>M</small> 42<small>S</small></b>
    </div>
    <div class="race-status-right">
      <span>MY TIME <b>00:48</b></span>
      <span>TRACK TIME <b>21:48</b></span>
    </div>
  `;
  home.appendChild(raceStatus);
  
  // Hero section with drivers
  const heroDrivers = ['Lando', 'Oscar', 'Max'].map((name) =>
    drivers2025.find((driver) => driver.name.includes(name))
  ).filter(Boolean);
  
  const heroSection = document.createElement('section');
  heroSection.className = 'home-hero';
  
  const heroMainPanel = document.createElement('div');
  heroMainPanel.className = 'hero-main-panel';
  heroMainPanel.innerHTML = '<div class="hero-overlay"></div>';
  
  const heroDriverStage = document.createElement('div');
  heroDriverStage.className = 'hero-driver-stage';
  heroDriverStage.setAttribute('aria-hidden', 'true');
  
  heroDrivers.forEach((driver, index) => {
    const img = document.createElement('img');
    img.className = `hero-driver hero-driver-${index + 1}`;
    img.src = driver.image;
    img.alt = '';
    heroDriverStage.appendChild(img);
  });
  heroMainPanel.appendChild(heroDriverStage);
  
  const heroCopy = document.createElement('div');
  heroCopy.className = 'hero-copy';
  heroCopy.innerHTML = `
    <span class="paddock-tag">PADDOCK INSIDER</span>
    <h1>Norris, Verstappen or Piastri - the title showdown is here</h1>
  `;
  heroMainPanel.appendChild(heroCopy);
  heroSection.appendChild(heroMainPanel);
  
  // Sidebar news
  const sideNews = [
    { title: "'F1 is my life' - Tsunoda reacts to Red Bull's driver decision", image: news[5].image },
    { title: "Norris knows he has 'most to lose' in Abu Dhabi", image: heroDrivers[0]?.image ?? news[0].image },
    { title: "Hamilton suggests personnel changes needed for 2026 at Ferrari", image: news[2].image },
    { title: "Verstappen 'very relaxed' ahead of Abu Dhabi title decider", image: heroDrivers[2]?.image ?? news[3].image },
  ];
  
  const heroSidebar = document.createElement('aside');
  heroSidebar.className = 'hero-sidebar';
  
  sideNews.forEach((item) => {
    const article = document.createElement('article');
    article.className = 'sidebar-item';
    article.innerHTML = `
      <div class="sidebar-thumb">
        <img src="${item.image}" alt="" loading="lazy" />
      </div>
      <h3>${item.title}</h3>
    `;
    heroSidebar.appendChild(article);
  });
  
  const warmupArticle = document.createElement('article');
  warmupArticle.className = 'sidebar-item warmup';
  warmupArticle.innerHTML = `
    <div class="sidebar-thumb">
      <img src="${news[1].image}" alt="" loading="lazy" />
    </div>
    <div>
      <span class="weekend-tag">WEEKEND WARM-UP</span>
      <h3>Watch Weekend Warm-Up ahead of the Abu Dhabi GP</h3>
    </div>
  `;
  heroSidebar.appendChild(warmupArticle);
  heroSection.appendChild(heroSidebar);
  
  home.appendChild(heroSection);
  
  // Featured race section
  const featuredSection = document.createElement('section');
  featuredSection.className = 'featured-race';
  featuredSection.innerHTML = '<h2>LATEST F1 NEWS</h2>';
  
  const newsGrid = document.createElement('div');
  newsGrid.className = 'home-news-grid';
  
  news.slice(0, 3).forEach((item) => {
    const card = document.createElement('article');
    card.className = 'home-news-card';
    card.innerHTML = `
      <div class="home-news-img">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="home-news-body">
        ${item.tag ? `<span style="background-color: ${item.bg}">${item.tag}</span>` : ''}
        <h3>${item.title}</h3>
        <p>${item.time}</p>
      </div>
    `;
    newsGrid.appendChild(card);
  });
  
  featuredSection.appendChild(newsGrid);
  home.appendChild(featuredSection);
  
  return home;
}
