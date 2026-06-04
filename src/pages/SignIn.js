export function renderSignIn(initialTab = 'signin') {
  const authPage = document.createElement('div');
  authPage.className = 'auth-page';
  
  const logoBar = document.createElement('div');
  logoBar.className = 'auth-logo-bar';
  const logo = document.createElement('a');
  logo.href = '#/';
  logo.className = 'auth-logo';
  logo.textContent = 'F1';
  logo.onclick = (e) => {
    e.preventDefault();
    window.navigate('/');
  };
  logoBar.appendChild(logo);
  authPage.appendChild(logoBar);
  
  const shell = document.createElement('div');
  shell.className = 'auth-shell';
  
  const tabsDiv = document.createElement('div');
  tabsDiv.className = 'auth-tabs';
  
  let activeTab = initialTab;
  
  function updateTab(tab, button) {
    activeTab = tab;
    [signInBtn, registerBtn].forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    
    const oldContent = shell.querySelector('.auth-content');
    if (oldContent) oldContent.remove();
    
    renderAuthContent(shell, tab, signInBtn, registerBtn);
  }
  
  const signInBtn = document.createElement('button');
  signInBtn.className = activeTab === 'signin' ? 'active' : '';
  signInBtn.textContent = 'Sign in';
  signInBtn.onclick = (e) => {
    e.preventDefault();
    updateTab('signin', e.currentTarget);
  };
  
  const registerBtn = document.createElement('button');
  registerBtn.className = activeTab === 'register' ? 'active' : '';
  registerBtn.textContent = 'Register';
  registerBtn.onclick = (e) => {
    e.preventDefault();
    updateTab('register', e.currentTarget);
  };
  
  tabsDiv.appendChild(signInBtn);
  tabsDiv.appendChild(registerBtn);
  shell.appendChild(tabsDiv);
  
  renderAuthContent(shell, activeTab, signInBtn, registerBtn);
  
  authPage.appendChild(shell);
  
  return authPage;
}

function renderAuthContent(shell, tab, signInBtn, registerBtn) {
  const content = document.createElement('div');
  content.className = 'auth-content';
  
  if (tab === 'signin') {
    content.innerHTML = `
      <section class="auth-box">
        <h1>SIGN IN</h1>
        <div class="auth-divider"></div>
        <label class="form-group">
          <span>Email address</span>
          <input type="email" placeholder="Enter your username" />
        </label>
        <label class="form-group password-field">
          <span>Password</span>
          <div class="password-input">
            <input type="password" placeholder="Enter your password" />
            <button type="button" class="toggle-pw">Show</button>
          </div>
        </label>
        <div class="auth-right"><button class="link-btn">Forgotten password?</button></div>
        <button class="auth-btn">SIGN IN</button>
        <p>Don't have an account yet? <button class="link-btn switch-tab" data-tab="register">Register with F1</button></p>
      </section>
    `;
  } else {
    content.innerHTML = `
      <section class="auth-box">
        <h1>CREATE ACCOUNT</h1>
        <div class="auth-divider"></div>
        <label class="form-group">
          <span>Title</span>
          <select>
            <option>Select</option>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Ms</option>
            <option>Dr</option>
          </select>
        </label>
        <label class="form-group">
          <span>First name</span>
          <input type="text" placeholder="First name" />
        </label>
        <label class="form-group">
          <span>Last name</span>
          <input type="text" placeholder="Last name" />
        </label>
        <label class="form-group">
          <span>Date of birth</span>
          <input type="text" placeholder="DD/MM/YYYY" />
        </label>
        <label class="form-group">
          <span>Country of residence</span>
          <select>
            <option>Select</option>
            <option>Vietnam</option>
            <option>United Kingdom</option>
            <option>United States</option>
          </select>
        </label>
        <label class="form-group password-field">
          <span>Password</span>
          <div class="password-input">
            <input type="password" placeholder="Create password" />
            <button type="button" class="toggle-pw">Show</button>
          </div>
        </label>
        <button class="auth-btn">CREATE ACCOUNT</button>
        <p>Already have an account? <button class="link-btn switch-tab" data-tab="signin">Sign in here</button></p>
      </section>
    `;
  }
  
  shell.appendChild(content);
  
  // Setup password toggle
  const toggleButtons = content.querySelectorAll('.toggle-pw');
  toggleButtons.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const input = btn.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = 'Hide';
      } else {
        input.type = 'password';
        btn.textContent = 'Show';
      }
    };
  });

  // Setup switch-tab buttons inside auth content
  const switchButtons = content.querySelectorAll('.switch-tab');
  switchButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (button.dataset.tab === 'signin') {
        updateTab('signin', signInBtn);
      } else {
        updateTab('register', registerBtn);
      }
    });
  });
}
