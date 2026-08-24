document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-lx-faq]').forEach((faq) => {
    faq.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button) return;
      const item = button.closest('.lx-card');
      item.classList.toggle('is-open');
      button.setAttribute('aria-expanded', item.classList.contains('is-open') ? 'true' : 'false');
    });
  });

  document.querySelectorAll('[data-filter-list]').forEach((list) => {
    const input = document.querySelector('[data-filter-input="' + list.dataset.filterList + '"]');
    const select = document.querySelector('[data-filter-select="' + list.dataset.filterList + '"]');
    const apply = () => {
      const q = (input?.value || '').toLowerCase();
      const category = select?.value || 'all';
      list.querySelectorAll('[data-filter-card]').forEach((card) => {
        const text = card.textContent.toLowerCase();
        const matchesText = !q || text.includes(q);
        const matchesCategory = category === 'all' || card.dataset.category === category;
        card.classList.toggle('lx-filter-hidden', !(matchesText && matchesCategory));
      });
    };
    input?.addEventListener('input', apply);
    select?.addEventListener('change', apply);
    apply();
  });

  document.querySelectorAll('.lx-stat strong').forEach((stat) => {
    const finalValue = stat.textContent.trim();
    const match = finalValue.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match || match[2].includes('/')) return;
    const target = Number(match[1]);
    const suffix = match[2];
    const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;
    const animate = () => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / 1200, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        stat.textContent = (target * eased).toFixed(decimals).replace(/\.0$/, '') + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (!('IntersectionObserver' in window)) {
      stat.textContent = finalValue;
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      animate();
      observer.disconnect();
    }, { threshold: .35 });
    observer.observe(stat);
  });

  const homeSearch = document.querySelector('[data-filter-input="home-tests"]');
  const homeSuggestions = document.querySelector('[data-home-suggestions]');
  if (homeSearch && homeSuggestions) {
    const suggestions = [
      ['CBC', 'pages/test-details.html'],
      ['HbA1c', 'pages/tests.html'],
      ['Vitamin D', 'pages/blog-vitamin-d.html'],
      ['Lipid Profile', 'pages/blog-lipid-profile.html'],
      ['Thyroid Profile', 'pages/tests.html'],
      ['Complete Health Checkup', 'pages/package-details.html']
    ];
    const renderSuggestions = () => {
      const query = homeSearch.value.trim().toLowerCase();
      const matches = suggestions.filter(([label]) => !query || label.toLowerCase().includes(query)).slice(0, 5);
      homeSuggestions.innerHTML = matches.map(([label, href]) => '<a href="' + href + '"><span>' + label + '</span><i class="bi bi-arrow-right"></i></a>').join('');
      homeSuggestions.classList.toggle('is-open', matches.length > 0 && document.activeElement === homeSearch);
    };
    homeSearch.addEventListener('focus', renderSuggestions);
    homeSearch.addEventListener('input', renderSuggestions);
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.lx-autocomplete')) homeSuggestions.classList.remove('is-open');
    });
  }

  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const track = slider.querySelector('.lx-slider-track');
    const slides = [...slider.querySelectorAll('.lx-slide')];
    const dots = slider.querySelector('.lx-dots');
    if (!track || slides.length < 2 || !dots) return;
    let index = 0;
    const nav = document.createElement('div');
    nav.className = 'lx-slider-nav';
    nav.innerHTML = '<button class="lx-slider-btn" type="button" data-slider-prev aria-label="Previous testimonial"><i class="bi bi-arrow-left"></i></button><button class="lx-slider-btn" type="button" data-slider-next aria-label="Next testimonial"><i class="bi bi-arrow-right"></i></button>';
    slider.appendChild(nav);
    const visibleCount = () => matchMedia('(max-width: 640px)').matches ? 1 : matchMedia('(max-width: 980px)').matches ? 2 : 3;
    const maxIndex = () => Math.max(slides.length - visibleCount(), 0);
    const syncDots = () => {
      const pages = maxIndex() + 1;
      dots.innerHTML = '';
      Array.from({ length: pages }).forEach((_, i) => {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', 'Show testimonial group ' + (i + 1));
        dot.addEventListener('click', () => move(i));
        dots.appendChild(dot);
      });
    };
    const move = (next) => {
      const visible = visibleCount();
      const max = maxIndex();
      index = next < 0 ? max : next > max ? 0 : next;
      const direction = document.documentElement.dir === 'rtl' ? 1 : -1;
      track.style.transform = 'translateX(' + (direction * index * (100 / visible)) + '%)';
      dots.querySelectorAll('button').forEach((dot, i) => dot.classList.toggle('active', i === index));
    };
    syncDots();
    move(0);
    nav.querySelector('[data-slider-prev]').addEventListener('click', () => move(index - 1));
    nav.querySelector('[data-slider-next]').addEventListener('click', () => move(index + 1));
    let timer = setInterval(() => move(index + 1), 4500);
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', () => timer = setInterval(() => move(index + 1), 4500));
    addEventListener('resize', () => {
      syncDots();
      move(index);
    });
  });

  document.querySelectorAll('[data-countdown]').forEach((node) => {
    const target = new Date(node.dataset.countdown).getTime();
    const tick = () => {
      const diff = Math.max(target - Date.now(), 0);
      const d = Math.floor(diff / 86400000);
      const h = Math.floor(diff / 3600000) % 24;
      const m = Math.floor(diff / 60000) % 60;
      const s = Math.floor(diff / 1000) % 60;
      node.innerHTML = [['Days', d], ['Hours', h], ['Minutes', m], ['Seconds', s]].map(([label, value]) => '<div><strong>' + String(value).padStart(2, '0') + '</strong><span>' + label + '</span></div>').join('');
    };
    tick();
    setInterval(tick, 1000);
  });
});
