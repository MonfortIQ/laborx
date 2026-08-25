// assets/js/auth.js

/**
 * localStorage authentication is intended for template/demo purposes only.
 * Production authentication must be implemented securely on a backend.
 */

// ==========================================
// CORE AUTH HELPER FUNCTIONS
// ==========================================

function getUsers() {
  const users = localStorage.getItem('laboraXUsers');
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem('laboraXUsers', JSON.stringify(users));
}

function getSession() {
  // Check sessionStorage first (if Remember Me was NOT checked)
  let session = sessionStorage.getItem('laboraXSession');
  if (session) return JSON.parse(session);
  
  // Then check localStorage (if Remember Me WAS checked or general persistence)
  session = localStorage.getItem('laboraXSession');
  return session ? JSON.parse(session) : null;
}

function setSession(session, rememberMe = true) {
  if (rememberMe) {
    localStorage.setItem('laboraXSession', JSON.stringify(session));
  } else {
    sessionStorage.setItem('laboraXSession', JSON.stringify(session));
  }
}

function clearSession() {
  localStorage.removeItem('laboraXSession');
  sessionStorage.removeItem('laboraXSession');
}

function isAuthenticated() {
  return getSession() !== null;
}

function getCurrentUser() {
  return getSession();
}

function registerUser(user) {
  const users = getUsers();
  const exists = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
  if (exists) {
    return { success: false, message: "An account with this email already exists." };
  }
  
  const newUser = {
    id: `user_${Date.now()}`,
    ...user,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveUsers(users);
  return { success: true, message: "Account created successfully. Please login to continue." };
}

function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return { success: false, message: "No account found with this email." };
  }
  
  if (user.password !== password) {
    return { success: false, message: "Incorrect password. Please try again." };
  }
  
  const session = {
    isLoggedIn: true,
    userId: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone || '',
    provider: 'local'
  };
  
  return { success: true, session: session };
}

function updateUser(updatedUser) {
  const users = getUsers();
  const session = getSession();
  
  if (!session) return false;
  
  const index = users.findIndex(u => u.id === session.userId);
  if (index !== -1) {
    // Only update allowed fields
    users[index].fullName = updatedUser.fullName || users[index].fullName;
    users[index].phone = updatedUser.phone || users[index].phone;
    saveUsers(users);
    
    // Update session
    session.fullName = users[index].fullName;
    session.phone = users[index].phone;
    setSession(session, localStorage.getItem('laboraXSession') !== null);
    
    return true;
  }
  return false;
}

function logoutUser(redirectPath = "pages/auth/login.html") {
  clearSession();
  window.location.href = getRootPath() + redirectPath;
}

// ==========================================
// DEMO OAUTH PROVIDERS
// ==========================================

function demoGoogleLogin() {
  // Demo Google authentication for static HTML template.
  // Real Google OAuth requires Google Identity Services and valid OAuth configuration/backend.
  const session = {
    isLoggedIn: true,
    userId: "google_demo_user",
    fullName: "Google User",
    email: "google.user@example.com",
    provider: "google"
  };
  setSession(session, true);
  showToast("Logged in with Google successfully!", "success");
  setTimeout(() => {
    window.location.href = getRootPath() + "index.html";
  }, 1000);
}

function demoAppleLogin() {
  // Demo Apple authentication.
  // Real Sign in with Apple requires Apple Developer configuration and OAuth/OpenID Connect integration.
  const session = {
    isLoggedIn: true,
    userId: "apple_demo_user",
    fullName: "Apple User",
    email: "apple.user@example.com",
    provider: "apple"
  };
  setSession(session, true);
  showToast("Logged in with Apple successfully!", "success");
  setTimeout(() => {
    window.location.href = getRootPath() + "index.html";
  }, 1000);
}


// ==========================================
// UTILITIES (TOASTS, PATHS, ANIMATIONS)
// ==========================================

function getRootPath() {
  const isDashboardPage = location.pathname.includes('/pages/dashboard/');
  const isAuthPage = location.pathname.includes('/pages/auth/');
  const isUtilityPage = location.pathname.includes('/pages/utility/');
  const fromPages = location.pathname.includes('/pages/');
  return isDashboardPage ? '../../../' : ((isAuthPage || isUtilityPage) ? '../../' : (fromPages ? '../' : ''));
}

function getInitials(name) {
  if (!name) return "U";
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function showToast(message, type = "success") {
  // Simple toast system
  let toastContainer = document.getElementById('lx-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'lx-toast-container';
    toastContainer.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
    document.body.appendChild(toastContainer);
  }
  
  const toast = document.createElement('div');
  const bgColor = type === 'success' ? 'var(--success-color, #10b981)' : 'var(--danger-color, #ef4444)';
  
  toast.style.cssText = `
    background: ${bgColor};
    color: #fff;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    gap: 10px;
  `;
  
  const icon = type === 'success' ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-exclamation-circle-fill"></i>';
  toast.innerHTML = `${icon} <span>${message}</span>`;
  
  toastContainer.appendChild(toast);
  
  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });
  
  // Remove after 3s
  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3000);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeElement(element) {
  element.classList.add('error-shake');
  setTimeout(() => element.classList.remove('error-shake'), 400);
}

// Add simple shake animation to head if not present
if (!document.getElementById('lx-auth-styles')) {
  const style = document.createElement('style');
  style.id = 'lx-auth-styles';
  style.textContent = `
    @keyframes errorShake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    .error-shake {
      animation: errorShake 0.4s ease;
      border-color: var(--danger-color, #ef4444) !important;
    }
    .lx-password-toggle { cursor: pointer; color: var(--muted); }
    .lx-password-toggle:hover { color: var(--text-color); }
    .lx-field-password-wrapper { position: relative; }
    .lx-field-password-wrapper .lx-password-toggle { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); font-size: 1.2rem; }
    .lx-field-password-wrapper input { padding-right: 45px; }
  `;
  document.head.appendChild(style);
}


// ==========================================
// PAGE INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Protect Dashboard Pages
  if (location.pathname.includes('/pages/dashboard/') && !location.pathname.includes('admin/')) {
    if (!isAuthenticated()) {
      window.location.href = getRootPath() + 'pages/auth/login.html';
      return;
    }
  }

  // 2. Setup Password Toggles (Delegate pattern in case they are generated dynamically)
  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('lx-password-toggle')) {
      const wrapper = e.target.closest('.lx-field-password-wrapper');
      if (wrapper) {
        const input = wrapper.querySelector('input');
        if (input.type === 'password') {
          input.type = 'text';
          e.target.classList.replace('bi-eye-slash', 'bi-eye');
        } else {
          input.type = 'password';
          e.target.classList.replace('bi-eye', 'bi-eye-slash');
        }
      }
    }
  });

  // 3. Register Form Handler
  const registerForm = document.getElementById('lx-register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const terms = document.getElementById('terms').checked;
      const btn = registerForm.querySelector('button[type="submit"]');
      
      let isValid = true;
      
      if (!validateEmail(email)) {
        shakeElement(document.getElementById('email'));
        showToast("Please enter a valid email address.", "error");
        isValid = false;
      }
      
      if (password.length < 8) {
        shakeElement(document.getElementById('password'));
        showToast("Password must be at least 8 characters long.", "error");
        isValid = false;
      }
      
      if (password !== confirmPassword) {
        shakeElement(document.getElementById('confirmPassword'));
        showToast("Passwords do not match.", "error");
        isValid = false;
      }
      
      if (!terms) {
        showToast("You must agree to the Terms & Conditions.", "error");
        isValid = false;
      }
      
      if (!isValid) return;
      
      // Loading State
      const originalBtnText = btn.innerHTML;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating Account...';
      btn.disabled = true;
      
      const result = registerUser({ fullName: name, email, phone, password });
      
      setTimeout(() => {
        btn.innerHTML = originalBtnText;
        btn.disabled = false;
        
        if (result.success) {
          showToast(result.message, "success");
          // Optionally prefill login email using sessionStorage
          sessionStorage.setItem('prefillEmail', email);
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 1500);
        } else {
          shakeElement(document.getElementById('email'));
          showToast(result.message, "error");
        }
      }, 800);
    });
  }

  // 4. Login Form Handler
  const loginForm = document.getElementById('lx-login-form');
  if (loginForm) {
    // Prefill email if coming from register
    const prefill = sessionStorage.getItem('prefillEmail');
    if (prefill) {
      document.getElementById('email').value = prefill;
      sessionStorage.removeItem('prefillEmail');
    }
    
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember') ? document.getElementById('remember').checked : false;
      const btn = loginForm.querySelector('button[type="submit"]');
      
      if (!validateEmail(email)) {
        shakeElement(document.getElementById('email'));
        showToast("Please enter a valid email address.", "error");
        return;
      }
      
      // Loading State
      const originalBtnText = btn.innerHTML;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Signing In...';
      btn.disabled = true;
      
      const result = loginUser(email, password);
      
      setTimeout(() => {
        btn.innerHTML = originalBtnText;
        btn.disabled = false;
        
        if (result.success) {
          setSession(result.session, remember);
          showToast("Login successful!", "success");
          setTimeout(() => {
            window.location.href = getRootPath() + 'index.html';
          }, 800);
        } else {
          if (result.message.includes("email")) {
            shakeElement(document.getElementById('email'));
          } else {
            shakeElement(document.getElementById('password'));
          }
          showToast(result.message, "error");
        }
      }, 800);
    });
  }

  // 5. Connect Google/Apple Demo buttons if present
  const googleBtn = document.getElementById('google-demo-login');
  if (googleBtn) googleBtn.addEventListener('click', demoGoogleLogin);
  
  const appleBtn = document.getElementById('apple-demo-login');
  if (appleBtn) appleBtn.addEventListener('click', demoAppleLogin);
  
  // 6. Global Logout Handler (if logout is clicked anywhere)
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('[data-auth-logout]')) {
      e.preventDefault();
      if (confirm("Are you sure you want to logout?")) {
        logoutUser();
      }
    }
  });

});

  // 7. Profile Page Handler
  const profileForm = document.getElementById('lx-profile-form');
  if (profileForm && isAuthenticated()) {
    const user = getCurrentUser();
    
    // Populate form
    const nameInput = document.getElementById('profileFullName');
    const emailInput = document.getElementById('profileEmail');
    const phoneInput = document.getElementById('profilePhone');
    const providerInput = document.getElementById('profileProvider');
    const avatarEl = document.getElementById('lx-profile-avatar');
    const nameEl = document.getElementById('lx-profile-name');
    const emailEl = document.getElementById('lx-profile-email');
    
    if (nameInput) nameInput.value = user.fullName || '';
    if (emailInput) emailInput.value = user.email || '';
    if (phoneInput) phoneInput.value = user.phone || '';
    if (providerInput) providerInput.value = user.provider || 'local';
    
    if (avatarEl) avatarEl.textContent = getInitials(user.fullName);
    if (nameEl) nameEl.textContent = user.fullName;
    if (emailEl) emailEl.textContent = user.email;
    
    // Handle Update
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newName = nameInput.value.trim();
      const newPhone = phoneInput ? phoneInput.value.trim() : '';
      
      const btn = profileForm.querySelector('button[type="submit"]');
      const originalBtnText = btn.innerHTML;
      btn.innerHTML = 'Saving...';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.innerHTML = originalBtnText;
        btn.disabled = false;
        
        const success = updateUser({ fullName: newName, phone: newPhone });
        
        if (success) {
          showToast("Profile updated successfully!", "success");
          if (avatarEl) avatarEl.textContent = getInitials(newName);
          if (nameEl) nameEl.textContent = newName;
          
          // Force header to update by simulating a small delay or recreating it if needed
          // For now, reload to ensure the navbar updates, or we could manually update the DOM elements in navbar.
          setTimeout(() => location.reload(), 1000);
        } else {
          showToast("Failed to update profile.", "error");
        }
      }, 600);
    });
  }
