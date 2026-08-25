// LaboraX global appearance and public navigation system.
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  let rootPath = '';
  const pagesIndex = location.pathname.indexOf('/pages/');
  if (pagesIndex !== -1) {
    const afterPages = location.pathname.substring(pagesIndex + '/pages/'.length);
    const depth = afterPages.split('/').length;
    for (let i = 0; i < depth; i++) rootPath += '../';
  }
  const currentContext = (location.pathname.includes('/home2/') || location.pathname.includes('home-2.html')) ? 'home2' : 'home1';
  const header = document.getElementById('main-header');

  if (header) {
    const legacyTopbar = header.previousElementSibling;
    if (legacyTopbar?.classList.contains('bg-primary')) legacyTopbar.remove();

    header.className = 'lx-header';
    header.innerHTML = `
      <div class="lx-wrap">
        <a class="lx-logo" href="${rootPath}index.html">Labora<span>X</span></a>
        <nav class="lx-links" aria-label="Primary navigation">
          <details class="lx-home">
            <summary>Home <i class="bi bi-chevron-down"></i></summary>
            <div class="lx-dropdown">
              <a href="${rootPath}index.html"><i class="bi bi-heart-pulse"></i><span><b>Home 1</b><small>Trusted Diagnostics</small></span></a>
              <a href="${rootPath}home-2.html"><i class="bi bi-grid-1x2"></i><span><b>Home 2</b><small>Digital Diagnostics</small></span></a>
            </div>
          </details>
          <a href="${rootPath}pages/${currentContext}/tests.html">Tests</a>
          <a href="${rootPath}pages/${currentContext}/packages.html">Packages</a>
          <a href="${rootPath}pages/${currentContext}/services.html">Services</a>
          <a href="${rootPath}pages/${currentContext}/about.html">About</a>
          <a href="${rootPath}pages/${currentContext}/blog.html">Blog</a>
          <a href="${rootPath}pages/${currentContext}/contact.html">Contact</a>
          <a href="${rootPath}pages/${currentContext}/faq.html">FAQ</a>
          <a href="${rootPath}pages/${currentContext}/pricing.html">Pricing</a>
        </nav>
        <div class="lx-controls">
          <button class="lx-icon" data-search-open aria-label="Search tests and pages" aria-controls="lx-search-dialog"><i class="bi bi-search"></i></button>
          <button class="lx-icon" data-theme-toggle aria-label="Switch to dark mode"><i class="bi bi-moon-stars"></i></button>
          <button class="lx-direction" data-rtl-toggle aria-label="Switch text direction">RTL</button>
          ${(typeof isAuthenticated === 'function' && isAuthenticated()) ? `
          <details class="lx-profile-dropdown" style="position:relative; cursor:pointer;">
            <summary style="display:flex; align-items:center; gap:8px; list-style:none;">
              <span style="display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:50%; background:var(--primary-color, #ef4444); color:#fff; font-weight:600; font-size:14px;">${getInitials(getCurrentUser().fullName)}</span>
              <span class="lx-profile-name" style="font-weight:600; font-size:14px;">${getCurrentUser().fullName.split(' ')[0]}</span>
              <i class="bi bi-chevron-down" style="font-size:12px;"></i>
            </summary>
            <div class="lx-dropdown" style="right:0; left:auto; min-width:200px; padding:8px 0;">
              <div style="padding:10px 16px; border-bottom:1px solid var(--border-color, #e2e8f0); margin-bottom:4px;">
                <strong style="display:block; font-size:14px; font-weight:600; color:var(--text-color);">${getCurrentUser().fullName}</strong>
                <span style="display:block; font-size:12px; color:var(--muted);">${getCurrentUser().email}</span>
              </div>
              <a href="${rootPath}pages/dashboard/patient/profile.html" style="font-size:14px; padding:8px 16px;"><i class="bi bi-person" style="margin-right:8px;"></i> My Profile</a>
              <a href="${rootPath}pages/dashboard/patient/bookings.html" style="font-size:14px; padding:8px 16px;"><i class="bi bi-calendar-check" style="margin-right:8px;"></i> My Bookings</a>
              <a href="${rootPath}pages/dashboard/patient/reports.html" style="font-size:14px; padding:8px 16px;"><i class="bi bi-file-medical" style="margin-right:8px;"></i> My Reports</a>
              <a href="${rootPath}pages/dashboard/patient/settings.html" style="font-size:14px; padding:8px 16px;"><i class="bi bi-gear" style="margin-right:8px;"></i> Settings</a>
              <div style="border-top:1px solid var(--border-color, #e2e8f0); margin:4px 0;"></div>
              <a href="#" data-auth-logout style="color:var(--danger-color, #ef4444); font-size:14px; padding:8px 16px;"><i class="bi bi-box-arrow-right" style="margin-right:8px;"></i> Logout</a>
            </div>
          </details>
          ` : `
          <a class="lx-login" href="${rootPath}pages/auth/login.html">Login</a>
          <a class="lx-login" href="${rootPath}pages/auth/register.html">Register</a>
          `}
          <a class="lx-book" href="${rootPath}pages/${currentContext}/tests.html">Book a Test <i class="bi bi-arrow-right"></i></a>
          <button class="lx-icon lx-menu" id="lx-menu" aria-label="Open navigation" aria-controls="lx-mobile" aria-expanded="false"><i class="bi bi-list"></i></button>
        </div>
      </div>
      <nav class="lx-mobile" id="lx-mobile">
        ${(typeof isAuthenticated === 'function' && isAuthenticated()) ? `
        <div style="padding:16px; display:flex; align-items:center; gap:12px; border-bottom:1px solid var(--border-color, #e2e8f0); margin-bottom:8px;">
          <span style="display:inline-flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:50%; background:var(--primary-color, #ef4444); color:#fff; font-weight:700; font-size:16px;">${getInitials(getCurrentUser().fullName)}</span>
          <div>
            <strong style="display:block; font-size:15px; font-weight:600; color:var(--text-color);">${getCurrentUser().fullName}</strong>
            <span style="display:block; font-size:13px; color:var(--muted);">${getCurrentUser().email}</span>
          </div>
        </div>
        <a href="${rootPath}pages/dashboard/patient/profile.html"><i class="bi bi-person"></i> My Profile</a>
        <a href="${rootPath}pages/dashboard/patient/bookings.html"><i class="bi bi-calendar-check"></i> My Bookings</a>
        <a href="${rootPath}pages/dashboard/patient/reports.html"><i class="bi bi-file-medical"></i> My Reports</a>
        <a href="${rootPath}pages/dashboard/patient/settings.html"><i class="bi bi-gear"></i> Settings</a>
        <a href="#" data-auth-logout style="color:var(--danger-color, #ef4444);"><i class="bi bi-box-arrow-right"></i> Logout</a>
        <div style="border-top:1px solid var(--border-color, #e2e8f0); margin:8px 0;"></div>
        ` : ``}
        <a href="${rootPath}index.html">Home 1 - Trusted Diagnostics</a>
        <a href="${rootPath}home-2.html">Home 2 - Digital Diagnostics</a>
        <a href="${rootPath}pages/${currentContext}/tests.html">Tests</a>
        <a href="${rootPath}pages/${currentContext}/packages.html">Packages</a>
        <a href="${rootPath}pages/${currentContext}/services.html">Services</a>
        <a href="${rootPath}pages/${currentContext}/about.html">About</a>
        <a href="${rootPath}pages/${currentContext}/blog.html">Blog</a>
        <a href="${rootPath}pages/${currentContext}/contact.html">Contact</a>
        <a href="${rootPath}pages/${currentContext}/faq.html">FAQ</a>
        <a href="${rootPath}pages/${currentContext}/pricing.html">Pricing</a>
        ${(typeof isAuthenticated === 'function' && isAuthenticated()) ? `` : `
        <a href="${rootPath}pages/auth/login.html">Login</a>
        <a href="${rootPath}pages/auth/register.html">Register</a>
        `}
        <a class="lx-book" href="${rootPath}pages/${currentContext}/tests.html">Book a Test</a>
      </nav>
      <div class="lx-search-dialog" id="lx-search-dialog" role="dialog" aria-modal="true" aria-labelledby="lx-search-title" hidden>
        <div class="lx-search-box">
          <div class="lx-search-top">
            <input class="lx-input" id="lx-global-search" data-global-search type="search" placeholder="Search tests, packages, doctors, reports..." aria-labelledby="lx-search-title">
            <button class="lx-search-close" type="button" data-search-close aria-label="Close search"><i class="bi bi-x-lg"></i></button>
          </div>
          <div class="lx-search-results" data-global-search-results>
            <h2 id="lx-search-title" class="sr-only">Search LaboraX</h2>
          </div>
        </div>
      </div>`;

    const menuButton = document.getElementById('lx-menu');
    const mobileMenu = document.getElementById('lx-mobile');
    const setMenu = (open) => {
      mobileMenu?.classList.toggle('is-open', open);
      menuButton?.setAttribute('aria-expanded', String(open));
      menuButton?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      menuButton && (menuButton.innerHTML = open ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>');
      document.body.classList.toggle('lx-menu-open', open);
    };

    menuButton?.addEventListener('click', () => setMenu(!mobileMenu?.classList.contains('is-open')));
    mobileMenu?.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenu(false);
    });

    const searchDialog = document.getElementById('lx-search-dialog');
    const searchInput = document.querySelector('[data-global-search]');
    const searchResults = document.querySelector('[data-global-search-results]');
    const searchItems = [
      ['CBC Test', `${rootPath}pages/${currentContext}/services/blood-testing.html`, 'Blood testing'],
      ['HbA1c', `${rootPath}pages/${currentContext}/tests.html`, 'Diabetes'],
      ['Thyroid Profile', `${rootPath}pages/${currentContext}/tests.html`, 'Thyroid'],
      ['Vitamin D', `${rootPath}pages/${currentContext}/blog/vitamin-d.html`, 'Health education'],
      ['Complete Health Checkup', `${rootPath}pages/${currentContext}/packages/complete-health.html`, 'Package'],
      
      ['Digital Reports', `${rootPath}pages/dashboard/patient/reports.html`, 'Reports'],
      ['Patient Dashboard', `${rootPath}pages/dashboard/patient/index.html`, 'Dashboard'],
      ['Admin Dashboard', `${rootPath}pages/dashboard/admin/index.html`, 'Admin'],
      ['Contact Support', `${rootPath}pages/${currentContext}/contact.html`, 'Support']
    ];

    const renderSearch = () => {
      if (!searchResults) return;
      const query = (searchInput?.value || '').trim().toLowerCase();
      const matches = searchItems.filter(([label, , meta]) => !query || `${label} ${meta}`.toLowerCase().includes(query)).slice(0, 8);
      searchResults.innerHTML = '<h2 id="lx-search-title" class="sr-only">Search LaboraX</h2>' + matches.map(([label, href, meta]) => `<a href="${href}"><span>${label}<small>${meta}</small></span><i class="bi bi-arrow-right"></i></a>`).join('');
    };

    const setSearch = (open) => {
      if (!searchDialog) return;
      searchDialog.hidden = !open;
      document.body.classList.toggle('lx-modal-open', open);
      if (open) {
        renderSearch();
        requestAnimationFrame(() => searchInput?.focus());
      }
    };

    document.querySelector('[data-search-open]')?.addEventListener('click', () => setSearch(true));
    document.querySelector('[data-search-close]')?.addEventListener('click', () => setSearch(false));
    searchDialog?.addEventListener('click', (event) => {
      if (event.target === searchDialog || event.target.closest('a')) setSearch(false);
    });
    searchInput?.addEventListener('input', renderSearch);

    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    }, { passive: true });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setSearch(false);
        setMenu(false);
      }
    });
  }

  const applyTheme = (theme) => {
    const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = theme === 'dark' || (theme === 'system' && prefersDark);
    root.classList.toggle('dark', dark);
    root.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('laboraX-theme', theme);
    localStorage.setItem('theme', theme);

    document.querySelectorAll('[data-theme-toggle], #theme-switcher, #theme-switcher-desktop, #theme-switcher-mobile').forEach((control) => {
      if (control.tagName === 'SELECT') {
        control.value = theme;
        return;
      }

      control.setAttribute('aria-pressed', String(dark));
      control.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      control.innerHTML = dark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
    });
  };

  const applyDirection = (dir) => {
    root.dir = dir;
    localStorage.setItem('direction', dir);
    document.querySelectorAll('[data-rtl-toggle], #rtl-switcher').forEach((control) => {
      if (control.type === 'checkbox') {
        control.checked = dir === 'rtl';
      } else {
        control.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
    });
  };

  applyTheme(localStorage.getItem('laboraX-theme') || localStorage.getItem('theme') || 'system');
  applyDirection(localStorage.getItem('direction') || 'ltr');

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-theme-toggle]')) {
      applyTheme(root.classList.contains('dark') ? 'light' : 'dark');
    }

    if (event.target.closest('[data-rtl-toggle]')) {
      applyDirection(root.dir === 'rtl' ? 'ltr' : 'rtl');
    }
  });

  document.querySelectorAll('#theme-switcher').forEach((select) => {
    select.addEventListener('change', () => applyTheme(select.value));
  });

  // === DYNAMIC FOOTER INJECTION ===
  const footer = document.getElementById('main-footer');
  if (footer) {
    const isHome2 = location.pathname.includes('home-2.html');
    const newsletterText = isHome2 ? "Stay connected with smarter digital healthcare." : "Get practical health tips and diagnostic updates.";

    let patientCareLinks = '';
    if (typeof isAuthenticated === 'function' && isAuthenticated()) {
      patientCareLinks = `
        <li><a href="${rootPath}pages/dashboard/patient/profile.html">My Profile &rarr;</a></li>
        <li><a href="${rootPath}pages/dashboard/patient/bookings.html">My Bookings &rarr;</a></li>
        <li><a href="${rootPath}pages/dashboard/patient/reports.html">My Reports &rarr;</a></li>
        <li><a href="${rootPath}pages/dashboard/patient/index.html">Dashboard &rarr;</a></li>
      `;
    } else {
      patientCareLinks = `
        <li><a href="${rootPath}pages/${currentContext}/tests.html">Book a Test &rarr;</a></li>
        <li><a href="${rootPath}pages/auth/login.html">Login &rarr;</a></li>
        <li><a href="${rootPath}pages/auth/register.html">Register &rarr;</a></li>
      `;
    }

    footer.innerHTML = `
      <div class="lx-footer-newsletter fade-up">
        <div class="lx-container">
          <div class="lx-newsletter-inner">
            <div class="lx-newsletter-text">
              <h2>Stay Ahead of Your Health</h2>
              <p>${newsletterText}</p>
            </div>
            <form class="lx-newsletter-form" id="lx-newsletter-ajax-form">
              <input type="hidden" name="_subject" value="New Newsletter Subscription (LaboraX)">
              <input type="hidden" name="_captcha" value="false">
              <div class="lx-input-group">
                <input type="email" name="email" placeholder="Email address" required aria-label="Email address for newsletter">
                <button type="submit" aria-label="Subscribe to newsletter">Subscribe &rarr;</button>
              </div>
              <small>We respect your privacy. Unsubscribe anytime.</small>
            </form>
          </div>
        </div>
      </div>
      
      <div class="lx-footer-main">
        <div class="lx-container">
          <div class="lx-footer-grid">
            <div class="lx-footer-brand stagger-up">
              <a class="lx-logo" href="${rootPath}index.html">Labora<span>X</span></a>
              <p>Reliable diagnostics, accurate reports, and connected healthcare designed around your needs.</p>
              <div class="lx-footer-rating">
                <span class="stars">★★★★★</span> <strong>4.9/5</strong> Patient Rating
              </div>
              <div class="lx-footer-stats">
                <strong>50K+</strong> Patients Served
              </div>
              <div class="lx-social">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow LaboraX on Facebook"><i class="bi bi-facebook"></i></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow LaboraX on Instagram"><i class="bi bi-instagram"></i></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Follow LaboraX on LinkedIn"><i class="bi bi-linkedin"></i></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Follow LaboraX on YouTube"><i class="bi bi-youtube"></i></a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Follow LaboraX on X"><i class="bi bi-twitter-x"></i></a>
              </div>
            </div>
            
            <div class="lx-footer-col stagger-up">
              <h3 class="lx-accordion-trigger">Company <i class="bi bi-plus-lg lx-mobile-only"></i></h3>
              <ul class="lx-footer-list">
                <li><a href="${rootPath}pages/${currentContext}/about.html">About LaboraX &rarr;</a></li>
                <li><a href="${rootPath}pages/${currentContext}/services.html">Our Services &rarr;</a></li>
                <li><a href="${rootPath}pages/${currentContext}/doctors.html">Our Doctors &rarr;</a></li>
                <li><a href="${rootPath}pages/${currentContext}/about.html">Laboratory Quality &rarr;</a></li>
                <li><a href="${rootPath}pages/${currentContext}/contact.html">Careers &rarr;</a></li>
                <li><a href="${rootPath}pages/${currentContext}/contact.html">Contact Us &rarr;</a></li>
              </ul>
            </div>
            
            <div class="lx-footer-col stagger-up">
              <h3 class="lx-accordion-trigger">Diagnostics <i class="bi bi-plus-lg lx-mobile-only"></i></h3>
              <ul class="lx-footer-list">
                ${currentContext === 'home2' ? `
                <li><a href="${rootPath}pages/home2/services/digital-reports.html">Digital Reports &rarr;</a></li>
                <li><a href="${rootPath}pages/home2/services/sample-tracking.html">Sample Tracking &rarr;</a></li>
                <li><a href="${rootPath}pages/home2/services/health-analytics.html">Health Analytics &rarr;</a></li>
                <li><a href="${rootPath}pages/home2/packages.html">Digital Packages &rarr;</a></li>
                <li><a href="${rootPath}pages/home2/contact.html">Digital Support &rarr;</a></li>
                ` : `
                <li><a href="${rootPath}pages/home1/tests.html">Blood Tests &rarr;</a></li>
                <li><a href="${rootPath}pages/home1/packages.html">Health Packages &rarr;</a></li>
                                <li><a href="${rootPath}pages/home1/doctors.html">Doctors &rarr;</a></li>
                <li><a href="${rootPath}pages/home1/services/blood-testing.html">Patient Care &rarr;</a></li>
                `}
              </ul>
            </div>
            
            <div class="lx-footer-col stagger-up">
              <h3 class="lx-accordion-trigger">Patient Care <i class="bi bi-plus-lg lx-mobile-only"></i></h3>
              <ul class="lx-footer-list">
                ${patientCareLinks}
                <li><a href="${rootPath}pages/${currentContext}/faq.html">FAQs &rarr;</a></li>
                <li><a href="${rootPath}pages/pricing.html">Pricing &rarr;</a></li>
                <li><a href="${rootPath}pages/${currentContext}/contact.html">Support &rarr;</a></li>
              </ul>
            </div>
            
            <div class="lx-footer-col stagger-up">
              <h3 class="lx-accordion-trigger">Contact LaboraX <i class="bi bi-plus-lg lx-mobile-only"></i></h3>
              <ul class="lx-footer-contact">
                <li><a href="tel:+919876543210"><i class="bi bi-telephone"></i> +91 98765 43210</a></li>
                <li><a href="mailto:support@laborax.com"><i class="bi bi-envelope"></i> support@laborax.com</a></li>
                <li><i class="bi bi-clock"></i> Mon – Sat<br>7:00 AM – 8:00 PM</li>
                <li><i class="bi bi-geo-alt"></i> LaboraX Diagnostic Centre<br>Coimbatore, Tamil Nadu, India</li>
              </ul>
              
              <div class="lx-support-card">
                <strong>Need Help With Your Test?</strong>
                <p>Our support team is available to help.</p>
                <a href="${rootPath}pages/${currentContext}/contact.html">Contact Support &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="lx-footer-trust fade-up">
        <div class="lx-container">
          <div class="lx-trust-strip">
            <h3>Trusted Diagnostic Care</h3>
            <div class="lx-trust-items">
              <span><i class="bi bi-shield-check"></i> Certified Laboratories</span>
              <span><i class="bi bi-patch-check"></i> Quality Controlled Testing</span>
              <span><i class="bi bi-file-lock2"></i> Secure Digital Reports</span>
              <span><i class="bi bi-person-check"></i> Trained Professionals</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="lx-footer-bottom">
        <div class="lx-container lx-bottom-flex">
          <div class="lx-copyright">
            &copy; 2026 LaboraX. All rights reserved.
          </div>
          <div class="lx-legal">
            <a href="${rootPath}pages/utility/privacy.html">Privacy Policy</a>
            <a href="${rootPath}pages/utility/terms.html">Terms & Conditions</a>
            <a href="${rootPath}pages/utility/privacy.html">Cookie Policy</a>
            <a href="${rootPath}pages/utility/privacy.html">Accessibility</a>
          </div>
          <div class="lx-made-with">
            Made with care for better healthcare.
          </div>
        </div>
      </div>
    `;

    // Mobile accordion logic
    const accordions = footer.querySelectorAll('.lx-accordion-trigger');
    accordions.forEach(acc => {
      acc.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          const list = acc.nextElementSibling;
          const icon = acc.querySelector('i');
          const isExpanded = list.classList.contains('expanded');
          
          footer.querySelectorAll('.lx-footer-list, .lx-footer-contact').forEach(l => l.classList.remove('expanded'));
          footer.querySelectorAll('.lx-accordion-trigger i').forEach(i => { i.classList.remove('bi-dash-lg'); i.classList.add('bi-plus-lg'); });
          
          if (!isExpanded) {
            list.classList.add('expanded');
            icon.classList.remove('bi-plus-lg');
            icon.classList.add('bi-dash-lg');
          }
        }
      });
    });
    
    
    // Newsletter Formsubmit AJAX
    const nlForm = footer.querySelector('#lx-newsletter-ajax-form');
    if (nlForm) {
      nlForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const btn = this.querySelector('button');
        btn.innerHTML = '...';
        btn.disabled = true;
        
        fetch('https://formsubmit.co/ajax/clament.iq@outlook.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                email: email, 
                _subject: 'New Newsletter Subscription (LaboraX)' 
            })
        })
        .then(response => response.json())
        .then(data => {
            this.innerHTML = '<span class="lx-success-msg"><i class="bi bi-check-circle-fill"></i> You\'re subscribed!</span>';
        })
        .catch(error => {
            this.innerHTML = '<span style="color:#EF4444;font-weight:600">Error. Please try again later.</span>';
        });
      });
    }
  }

  // Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.fade-up, .stagger-up, .lx-social a').forEach(el => observer.observe(el));
});
