import { renderNavigation } from './components/Navigation.js';
import { renderHome } from './pages/Home.js';
import { renderSchedule } from './pages/Schedule.js';
import { renderResults } from './pages/Results.js';
import { renderNews } from './pages/News.js';
import { renderDrivers } from './pages/Drivers.js';
import { renderTeams } from './pages/Teams.js';
import { renderSignIn } from './pages/SignIn.js';

const root = document.getElementById('root');

const routes = {
  '/': renderHome,
  '/schedule': renderSchedule,
  '/results': renderResults,
  '/news': renderNews,
  '/drivers': renderDrivers,
  '/teams': renderTeams,
  '/signin': () => renderSignIn('signin'),
  '/signup': () => renderSignIn('register'),
  '/members': () => renderSignIn('signin'),
};

function getCurrentPath() {
  // Using hash-based routing for client-side navigation
  const hash = window.location.hash.slice(1) || '/';
  return hash.startsWith('/') ? hash : '/' + hash;
}

function navigate(path) {
  window.location.hash = path;
  window.scrollTo(0, 0);
}

function render() {
  const currentPath = getCurrentPath();
  const renderFn = routes[currentPath] || renderHome;
  
  // Clear root and render new page
  root.innerHTML = '';
  root.appendChild(renderNavigation());
  
  const mainContent = document.createElement('main');
  mainContent.className = 'main-content';
  mainContent.appendChild(renderFn());
  
  root.appendChild(mainContent);
  
  // Update active navigation link
  updateActiveNav(currentPath);
}

function updateActiveNav(currentPath) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('data-path');
    link.classList.remove('active');
    if (href === currentPath || (currentPath === '/' && href === '/')) {
      link.classList.add('active');
    }
  });
}

// Make navigate function globally available
window.navigate = navigate;

// Initial render
render();

// Handle hash changes
window.addEventListener('hashchange', () => {
  render();
});

// Optional: Handle direct URL changes
window.addEventListener('popstate', () => {
  render();
});
