export function renderNavigation() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  
  const navContainer = document.createElement('div');
  navContainer.className = 'nav-container app-container';
  
  // Logo
  const logo = document.createElement('a');
  logo.href = '#/';
  logo.className = 'nav-logo';
  logo.textContent = 'F1';
  logo.onclick = (e) => {
    e.preventDefault();
    window.navigate('/');
  };
  
  // Navigation items
  const navItems = [
    { path: '/schedule', label: 'Schedule' },
    { path: '/results', label: 'Results' },
    { path: '/news', label: 'News' },
    { path: '/drivers', label: 'Drivers' },
    { path: '/teams', label: 'Teams' },
  ];
  
  const navMenu = document.createElement('ul');
  navMenu.className = 'nav-menu';
  
  navItems.forEach(item => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    
    const link = document.createElement('a');
    link.href = '#' + item.path;
    link.className = 'nav-link';
    link.setAttribute('data-path', item.path);
    link.textContent = item.label + ' ▾';
    link.onclick = (e) => {
      e.preventDefault();
      window.navigate(item.path);
    };
    
    li.appendChild(link);
    navMenu.appendChild(li);
  });
  
  // Right side links
  const navRight = document.createElement('div');
  navRight.className = 'nav-right';
  
  const signInLink = document.createElement('a');
  signInLink.href = '#/signin';
  signInLink.className = 'members-link';
  signInLink.textContent = 'Đăng nhập';
  signInLink.onclick = (e) => {
    e.preventDefault();
    window.navigate('/signin');
  };
  
  const signUpLink = document.createElement('a');
  signUpLink.href = '#/signup';
  signUpLink.className = 'members-link';
  signUpLink.textContent = 'Đăng kí';
  signUpLink.onclick = (e) => {
    e.preventDefault();
    window.navigate('/signup');
  };
  
  navRight.appendChild(signInLink);
  navRight.appendChild(signUpLink);
  
  navContainer.appendChild(logo);
  navContainer.appendChild(navMenu);
  navContainer.appendChild(navRight);
  nav.appendChild(navContainer);
  
  return nav;
}
