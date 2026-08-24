// LaboraX global appearance and public navigation system.
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const isDashboardPage = location.pathname.includes('/pages/dashboard/');
  const isAuthPage = location.pathname.includes('/pages/auth/');
  const isUtilityPage = location.pathname.includes('/pages/utility/');
  const fromPages = location.pathname.includes('/pages/');
  const rootPath = isDashboardPage ? '../../../' : ((isAuthPage || isUtilityPage) ? '../../' : (fromPages ? '../' : ''));
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
          <a href="${rootPath}pages/tests.html">Tests</a>
          <a href="${rootPath}pages/packages.html">Packages</a>
          <a href="${rootPath}pages/home-collection.html">Home Collection</a>
          <a href="${rootPath}pages/services.html">Services</a>
          <a href="${rootPath}pages/about.html">About</a>
          <a href="${rootPath}pages/blog.html">Blog</a>
          <a href="${rootPath}pages/contact.html">Contact</a>
          <a href="${rootPath}pages/faq.html">FAQ</a>
          <a href="${rootPath}pages/pricing.html">Pricing</a>
        </nav>
        <div class="lx-controls">
          <button class="lx-icon" data-search-open aria-label="Search tests and pages" aria-controls="lx-search-dialog"><i class="bi bi-search"></i></button>
          <button class="lx-icon" data-theme-toggle aria-label="Switch to dark mode"><i class="bi bi-moon-stars"></i></button>
          <button class="lx-direction" data-rtl-toggle aria-label="Switch text direction">RTL</button>
          <a class="lx-login" href="${rootPath}pages/auth/login.html">Login</a>
          <a class="lx-book" href="${rootPath}pages/tests.html">Book a Test <i class="bi bi-arrow-right"></i></a>
          <button class="lx-icon lx-menu" id="lx-menu" aria-label="Open navigation" aria-controls="lx-mobile" aria-expanded="false"><i class="bi bi-list"></i></button>
        </div>
      </div>
      <nav class="lx-mobile" id="lx-mobile">
        <a href="${rootPath}index.html">Home 1 - Trusted Diagnostics</a>
        <a href="${rootPath}home-2.html">Home 2 - Digital Diagnostics</a>
        <a href="${rootPath}pages/tests.html">Tests</a>
        <a href="${rootPath}pages/packages.html">Packages</a>
        <a href="${rootPath}pages/home-collection.html">Home Collection</a>
        <a href="${rootPath}pages/services.html">Services</a>
        <a href="${rootPath}pages/about.html">About</a>
        <a href="${rootPath}pages/blog.html">Blog</a>
        <a href="${rootPath}pages/contact.html">Contact</a>
        <a href="${rootPath}pages/faq.html">FAQ</a>
        <a href="${rootPath}pages/pricing.html">Pricing</a>
        <a href="${rootPath}pages/auth/login.html">Login</a>
        <a class="lx-book" href="${rootPath}pages/tests.html">Book a Test</a>
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
      ['CBC Test', `${rootPath}pages/test-details.html`, 'Blood testing'],
      ['HbA1c', `${rootPath}pages/tests.html`, 'Diabetes'],
      ['Thyroid Profile', `${rootPath}pages/tests.html`, 'Thyroid'],
      ['Vitamin D', `${rootPath}pages/blog-vitamin-d.html`, 'Health education'],
      ['Complete Health Checkup', `${rootPath}pages/package-details.html`, 'Package'],
      ['Home Sample Collection', `${rootPath}pages/home-collection.html`, 'Doorstep diagnostics'],
      ['Digital Reports', `${rootPath}pages/reports.html`, 'Reports'],
      ['Patient Dashboard', `${rootPath}pages/dashboard/patient/index.html`, 'Dashboard'],
      ['Admin Dashboard', `${rootPath}pages/dashboard/admin/index.html`, 'Admin'],
      ['Contact Support', `${rootPath}pages/contact.html`, 'Support']
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
});
