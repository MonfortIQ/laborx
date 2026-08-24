const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const write = (file, contents) => {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, contents.replace(/\n{3,}/g, '\n\n').trim() + '\n', 'utf8');
};

const css = `
:root {
  --lx-shadow: 0 20px 55px rgba(177, 25, 35, .12);
  --lx-radius: 8px;
  --lx-header-offset: 76px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { overflow-x: hidden; margin: 0; }
a { color: inherit; }
img { max-width: 100%; display: block; }
.lx-shell { background: rgb(var(--bg-secondary)); color: rgb(var(--text-primary)); min-height: 100vh; }
.lx-main { padding-top: var(--lx-header-offset); }
.lx-section { padding: clamp(56px, 8vw, 104px) 20px; }
.lx-band { background: rgb(var(--surface)); border-block: 1px solid rgb(var(--border-primary)); }
.lx-container { width: min(1180px, 100%); margin-inline: auto; }
.lx-grid { display: grid; grid-template-columns: repeat(var(--cols, 3), minmax(0, 1fr)); gap: 22px; align-items: stretch; }
.lx-two { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(320px, .95fr); gap: clamp(28px, 5vw, 68px); align-items: center; }
.lx-eyebrow { color: rgb(var(--primary-red)); font-weight: 800; font-size: 13px; letter-spacing: .08em; text-transform: uppercase; display: inline-flex; align-items: center; gap: 8px; }
.lx-title { margin: 10px 0 14px; font-size: clamp(32px, 5vw, 64px); line-height: 1.02; font-weight: 850; letter-spacing: 0; color: rgb(var(--text-primary)); }
.lx-heading { margin: 8px 0 12px; font-size: clamp(28px, 4vw, 44px); line-height: 1.08; font-weight: 850; color: rgb(var(--text-primary)); }
.lx-copy { color: rgb(var(--text-secondary)); font-size: clamp(16px, 2vw, 18px); line-height: 1.75; max-width: 720px; }
.lx-muted { color: rgb(var(--text-muted)); }
.lx-hero { position: relative; overflow: hidden; padding: clamp(72px, 10vw, 126px) 20px clamp(48px, 8vw, 90px); background: linear-gradient(135deg, rgb(var(--surface)), rgb(var(--bg-secondary))); }
.lx-hero::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 12% 18%, rgba(214,40,40,.12), transparent 32%), radial-gradient(circle at 92% 8%, rgba(22,163,74,.08), transparent 30%); pointer-events: none; }
.lx-hero > .lx-container { position: relative; z-index: 1; }
.lx-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 26px; }
.lx-btn { display: inline-flex; align-items: center; justify-content: center; gap: 9px; min-height: 46px; padding: 12px 18px; border-radius: var(--lx-radius); border: 1px solid rgb(var(--primary-red)); font-weight: 800; line-height: 1.2; text-align: center; text-decoration: none; white-space: nowrap; transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease; }
.lx-btn.primary { background: rgb(var(--primary-red)); color: #fff; box-shadow: 0 14px 28px rgba(214, 40, 40, .2); }
.lx-btn.secondary { color: rgb(var(--primary-red)); background: rgb(var(--surface)); }
.lx-btn:hover { transform: translateY(-2px); box-shadow: var(--lx-shadow); }
.lx-btn:hover i { transform: translateX(2px); }
[dir="rtl"] .lx-btn:hover i { transform: translateX(-2px); }
.lx-card { height: 100%; min-width: 0; display: flex; flex-direction: column; background: rgb(var(--surface)); border: 1px solid rgb(var(--border-primary)); border-radius: var(--lx-radius); padding: clamp(18px, 3vw, 28px); box-shadow: 0 1px 0 rgba(255,255,255,.05); transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
.lx-card:hover { transform: translateY(-6px); border-color: rgb(var(--primary-red)); box-shadow: var(--lx-shadow); }
.lx-card h3 { font-size: 20px; line-height: 1.25; font-weight: 850; margin: 12px 0 8px; color: rgb(var(--text-primary)); }
.lx-card p { color: rgb(var(--text-secondary)); line-height: 1.65; }
.lx-iconbox { width: 48px; height: 48px; border-radius: var(--lx-radius); display: inline-grid; place-items: center; background: rgb(var(--primary-red-light)); color: rgb(var(--primary-red)); font-size: 23px; }
.lx-media { border-radius: var(--lx-radius); min-height: 360px; overflow: hidden; border: 1px solid rgb(var(--border-primary)); box-shadow: var(--lx-shadow); background: rgb(var(--surface)); }
.lx-media img { width: 100%; height: 100%; min-height: 360px; object-fit: cover; object-position: center; transition: transform .45s ease; }
.lx-media:hover img { transform: scale(1.04); }
.lx-card > .lx-media { width: calc(100% + 16px); min-height: 190px; aspect-ratio: 16 / 10; margin: -8px -8px 18px; flex: 0 0 auto; box-shadow: none; }
.lx-card > .lx-media img { min-height: 190px; aspect-ratio: 16 / 10; }
.lx-card > .lx-chip-row { margin-top: 12px; padding-top: 0; }
.lx-card > .lx-price { min-height: 40px; margin-top: auto; padding-top: 18px; }
.lx-card > .lx-page-actions { margin-top: 0; padding-top: 18px; }
.lx-card:not(:has(.lx-price)) > .lx-page-actions { margin-top: auto; }
.lx-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-top: 34px; }
.lx-stat { padding: 18px; border: 1px solid rgb(var(--border-primary)); border-radius: var(--lx-radius); background: rgb(var(--surface)); }
.lx-stat strong { display: block; font-size: clamp(24px, 3vw, 34px); color: rgb(var(--primary-red)); line-height: 1; }
.lx-stat span { color: rgb(var(--text-muted)); font-size: 13px; font-weight: 700; }
.lx-section-head { display: flex; justify-content: space-between; gap: 24px; align-items: end; margin-bottom: 30px; }
.lx-chip-row { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 14px; }
.lx-chip { border: 1px solid rgb(var(--border-primary)); background: rgb(var(--surface)); color: rgb(var(--text-secondary)); border-radius: 999px; padding: 8px 12px; font-size: 13px; font-weight: 800; }
.lx-price { display: flex; align-items: baseline; gap: 9px; margin: 16px 0; }
.lx-price strong { color: rgb(var(--primary-red)); font-size: 28px; }
.lx-price del { color: rgb(var(--text-muted)); }
.lx-list { display: grid; gap: 12px; margin-top: 18px; }
.lx-list li { display: flex; gap: 10px; align-items: flex-start; color: rgb(var(--text-secondary)); }
.lx-list i { color: rgb(var(--primary-red)); margin-top: 2px; }
.lx-search { display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: center; background: rgb(var(--surface)); border: 1px solid rgb(var(--border-primary)); border-radius: var(--lx-radius); padding: 12px; box-shadow: var(--lx-shadow); }
.lx-input, .lx-select, .lx-textarea { width: 100%; min-height: 46px; border: 1px solid rgb(var(--border-primary)); background: rgb(var(--bg-secondary)); color: rgb(var(--text-primary)); border-radius: var(--lx-radius); padding: 12px 14px; outline: none; }
.lx-input:focus, .lx-select:focus, .lx-textarea:focus { border-color: rgb(var(--primary-red)); box-shadow: 0 0 0 3px rgba(214,40,40,.14); }
.lx-table-wrap { overflow-x: auto; border: 1px solid rgb(var(--border-primary)); border-radius: var(--lx-radius); background: rgb(var(--surface)); }
.lx-table { width: 100%; min-width: 760px; border-collapse: collapse; }
.lx-table th, .lx-table td { padding: 15px; text-align: start; border-bottom: 1px solid rgb(var(--border-primary)); }
.lx-table th { color: rgb(var(--text-muted)); font-size: 12px; text-transform: uppercase; letter-spacing: .05em; }
.lx-steps { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; counter-reset: step; }
.lx-step { position: relative; }
.lx-step::before { counter-increment: step; content: counter(step); width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; background: rgb(var(--primary-red)); color: #fff; font-weight: 850; margin-bottom: 16px; }
.lx-faq { display: grid; gap: 12px; }
.lx-faq button { width: 100%; display: flex; justify-content: space-between; gap: 16px; align-items: center; text-align: start; color: rgb(var(--text-primary)); font-weight: 850; }
.lx-faq-panel { max-height: 0; overflow: hidden; transition: max-height .25s ease; color: rgb(var(--text-secondary)); line-height: 1.7; }
.lx-faq .is-open .lx-faq-panel { max-height: 180px; padding-top: 14px; }
.lx-faq .is-open i { transform: rotate(45deg); }
.lx-slider { overflow: hidden; }
.lx-slider-track { display: flex; transition: transform .35s ease; }
.lx-slide { flex: 0 0 33.333%; padding: 0 10px; }
.lx-slider-nav { display: flex; gap: 10px; justify-content: center; margin-top: 18px; }
.lx-slider-btn { width: 42px; height: 42px; display: inline-grid; place-items: center; border-radius: var(--lx-radius); border: 1px solid rgb(var(--border-primary)); background: rgb(var(--surface)); color: rgb(var(--text-primary)); cursor: pointer; transition: transform .2s ease, border-color .2s ease, color .2s ease; }
.lx-slider-btn:hover { transform: translateY(-2px); border-color: rgb(var(--primary-red)); color: rgb(var(--primary-red)); }
.lx-dots { display: flex; gap: 8px; justify-content: center; margin-top: 20px; }
.lx-dots button { width: 9px; height: 9px; border-radius: 99px; background: rgb(var(--border-secondary)); }
.lx-dots button.active { width: 26px; background: rgb(var(--primary-red)); }
.lx-autocomplete { position: relative; }
.lx-suggestions { position: absolute; inset-inline: 12px; top: calc(100% + 8px); z-index: 25; display: none; padding: 8px; border: 1px solid rgb(var(--border-primary)); border-radius: var(--lx-radius); background: rgb(var(--surface)); box-shadow: var(--lx-shadow); }
.lx-suggestions.is-open { display: grid; gap: 4px; }
.lx-suggestions a { display: flex; justify-content: space-between; gap: 12px; padding: 10px; border-radius: var(--lx-radius); color: rgb(var(--text-primary)); text-decoration: none; font-weight: 800; }
.lx-suggestions a:hover { background: rgb(var(--primary-red-light)); color: rgb(var(--primary-red)); }
.lx-cta { position: relative; overflow: hidden; color: #fff; background: linear-gradient(rgba(89, 13, 18, .76), rgba(89, 13, 18, .78)), var(--cta-image); background-size: cover; background-position: center; }
.lx-cta .lx-heading, .lx-cta .lx-copy { color: #fff; }
.lx-dashboard { display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; background: rgb(var(--bg-secondary)); }
.lx-sidebar { background: rgb(var(--surface)); border-inline-end: 1px solid rgb(var(--border-primary)); padding: 22px; }
.lx-sidebar a { display: flex; align-items: center; gap: 10px; padding: 11px 12px; border-radius: var(--lx-radius); color: rgb(var(--text-secondary)); text-decoration: none; font-weight: 800; }
.lx-sidebar a.active, .lx-sidebar a:hover { background: rgb(var(--primary-red-light)); color: rgb(var(--primary-red)); }
.lx-dash-content { padding: 26px; min-width: 0; }
.lx-kpis { --cols: 4; }
.lx-report-preview { background: rgb(var(--surface)); border: 1px solid rgb(var(--border-primary)); border-radius: var(--lx-radius); padding: 24px; }
.lx-bar-chart { display: flex; align-items: end; gap: 8px; height: 150px; padding-top: 18px; }
.lx-bar-chart span { flex: 1; border-radius: 6px 6px 0 0; background: linear-gradient(180deg, rgb(var(--primary-red)), rgb(var(--primary-red-dark))); min-height: 18px; }
.lx-timeline { display: grid; gap: 14px; }
.lx-timeline li { display: grid; grid-template-columns: auto 1fr; gap: 14px; }
.lx-timeline b { width: 36px; height: 36px; border-radius: 50%; background: rgb(var(--primary-red)); color: #fff; display: grid; place-items: center; }
.lx-filter-hidden { display: none !important; }
.lx-auth { min-height: 100vh; display: grid; place-items: center; padding: 28px 20px; background: linear-gradient(135deg, rgb(var(--surface)), rgb(var(--bg-secondary))); }
.lx-auth-card { width: min(460px, 100%); }
.lx-auth-tools, .lx-dash-tools { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: flex-end; margin-bottom: 18px; }
.lx-dash-head { display: flex; justify-content: space-between; gap: 18px; align-items: flex-start; margin-bottom: 22px; }
.lx-article { width: min(860px, 100%); margin-inline: auto; }
.lx-article h2 { margin: 34px 0 12px; font-size: clamp(24px, 3vw, 34px); line-height: 1.15; color: rgb(var(--text-primary)); }
.lx-article p { color: rgb(var(--text-secondary)); font-size: 17px; line-height: 1.85; margin-top: 14px; }
.lx-article .lx-media { margin: 28px 0; }
.lx-article-meta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
.lx-breadcrumb { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; color: rgb(var(--text-muted)); font-size: 14px; margin-bottom: 18px; }
.lx-breadcrumb a { color: rgb(var(--primary-red)); text-decoration: none; font-weight: 800; }
[dir="rtl"] .lx-breadcrumb i, [dir="rtl"] .bi-arrow-right { transform: scaleX(-1); }
.lx-page-hero { padding: 112px 20px 52px; background: linear-gradient(135deg, rgb(var(--surface)), rgb(var(--bg-secondary))); border-bottom: 1px solid rgb(var(--border-primary)); }
.lx-form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
.lx-countdown { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 24px 0; }
.lx-countdown div { padding: 18px 10px; background: rgb(var(--surface)); border: 1px solid rgb(var(--border-primary)); border-radius: var(--lx-radius); text-align: center; }
.lx-countdown strong { font-size: 30px; color: rgb(var(--primary-red)); display: block; }
.lx-page-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 22px; align-items: center; }
.lx-page-actions .lx-btn { min-width: 136px; }
.lx-card .lx-page-actions .lx-btn { width: fit-content; }

.lx-auth { position: relative; min-height: 100vh; display: grid; place-items: center; padding: clamp(24px, 5vw, 56px) 20px; background: linear-gradient(135deg, rgb(var(--surface)), rgb(var(--bg-secondary))); overflow: hidden; }
.lx-auth::before { content: ""; position: absolute; inset: 0; background: linear-gradient(115deg, rgba(214,40,40,.12), transparent 32%), radial-gradient(circle at 82% 12%, rgba(22,163,74,.09), transparent 28%); pointer-events: none; }
.lx-auth-card { position: relative; width: min(980px, 100%); display: grid; grid-template-columns: minmax(0, .95fr) minmax(360px, 1.05fr); gap: 0; overflow: hidden; padding: 0; }
.lx-auth-visual { min-height: 560px; padding: clamp(28px, 4vw, 46px); display: flex; flex-direction: column; justify-content: space-between; color: #fff; background: linear-gradient(rgba(88, 13, 18, .76), rgba(88, 13, 18, .82)), url('https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=85') center/cover; }
.lx-auth-visual .lx-logo { color: #fff; }
.lx-auth-visual h2 { font-size: clamp(30px, 4vw, 48px); line-height: 1.05; margin: 28px 0 14px; font-weight: 850; }
.lx-auth-visual p { color: rgba(255,255,255,.82); line-height: 1.7; max-width: 360px; }
.lx-auth-points { display: grid; gap: 12px; margin-top: 24px; }
.lx-auth-points span { display: flex; gap: 10px; align-items: center; color: rgba(255,255,255,.92); font-weight: 750; }
.lx-auth-panel { padding: clamp(28px, 4vw, 46px); background: rgb(var(--surface)); display: flex; flex-direction: column; justify-content: center; }
.lx-auth-tools { margin-bottom: 26px; }
.lx-auth-panel .lx-heading { margin-bottom: 8px; }
.lx-auth-panel .lx-copy { font-size: 15px; line-height: 1.6; margin-bottom: 18px; }
.lx-auth-form { display: grid; gap: 14px; margin-top: 18px; }
.lx-field { display: grid; gap: 7px; }
.lx-field label { font-weight: 800; color: rgb(var(--text-primary)); font-size: 13px; }
.lx-auth-alt { display: flex; flex-wrap: wrap; align-items: center; gap: 9px; margin-top: 18px; color: rgb(var(--text-secondary)); }
.lx-auth-alt a { color: rgb(var(--primary-red)); font-weight: 850; text-decoration: none; }

@media (max-width: 980px) {
  :root { --lx-header-offset: 66px; }
  .lx-two, .lx-dashboard { grid-template-columns: 1fr; }
  .lx-sidebar { position: sticky; top: 0; z-index: 20; border-inline-end: 0; border-bottom: 1px solid rgb(var(--border-primary)); overflow-x: auto; display: flex; gap: 8px; padding: 12px; }
  .lx-sidebar a { white-space: nowrap; }
  .lx-grid, .lx-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); --cols: 2; }
  .lx-stats, .lx-steps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .lx-section-head { display: block; }
  .lx-slide { flex-basis: 50%; }
  .lx-auth-card { grid-template-columns: 1fr; max-width: 560px; }
  .lx-auth-visual { min-height: auto; padding: 28px; }
  .lx-auth-visual h2 { margin-top: 18px; }
}

@media (max-width: 640px) {
  .lx-hero, .lx-page-hero { padding-inline: 14px; }
  .lx-section { padding: 48px 14px; }
  .lx-grid, .lx-kpis, .lx-stats, .lx-steps, .lx-form-grid, .lx-countdown { grid-template-columns: 1fr; --cols: 1; }
  .lx-search { grid-template-columns: 1fr; }
  .lx-actions, .lx-page-actions { flex-direction: column; }
  .lx-btn { width: 100%; }
  .lx-card .lx-page-actions .lx-btn { width: 100%; }
  .lx-dash-head { display: block; }
  .lx-auth-tools, .lx-dash-tools { justify-content: flex-start; }
  .lx-auth { padding: 16px; align-items: start; }
  .lx-auth-card { border-radius: 8px; }
  .lx-auth-visual { display: none; }
  .lx-auth-panel { padding: 24px 18px; }
  .lx-media, .lx-media img { min-height: 260px; }
  .lx-card > .lx-media, .lx-card > .lx-media img { min-height: 180px; }
  .lx-slide { flex-basis: 100%; }
  .lx-suggestions { position: static; margin-top: 10px; }
  .lx-title { font-size: clamp(34px, 12vw, 46px); }
}

@media (prefers-reduced-motion: reduce) {
  * { scroll-behavior: auto !important; transition: none !important; animation: none !important; }
}
`;

const js = `
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
    const match = finalValue.match(/^(\\d+(?:\\.\\d+)?)(.*)$/);
    if (!match || match[2].includes('/')) return;
    const target = Number(match[1]);
    const suffix = match[2];
    const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;
    const animate = () => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / 1200, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        stat.textContent = (target * eased).toFixed(decimals).replace(/\\.0$/, '') + suffix;
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
`;

const images = {
  labHero: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=85',
  blood: 'https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=1200&q=85',
  homeCare: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=85',
  labEquip: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=85',
  doctor: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=85',
  doctor2: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=85',
  doctor3: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=85',
  digital: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85',
  dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
  reports: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85',
  blog: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85',
  microscope: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=85'
};

const assetPath = (depth) => '../'.repeat(depth) + 'assets/';
const homePath = (depth) => '../'.repeat(depth);
const pageHref = (depth, file) => depth === 0 ? 'pages/' + file : '../'.repeat(depth - 1) + file;

const head = ({ title, description, depth = 0 }) => `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
  <link rel="stylesheet" href="${assetPath(depth)}css/style.css">
  <link rel="stylesheet" href="${assetPath(depth)}css/laborax-template.css">
</head>`;

const footer = (depth = 0) => `
<footer class="lx-section" style="background:#111827;color:#fff">
  <div class="lx-container">
    <div class="lx-grid" style="--cols:4">
      <div>
        <a class="lx-logo" href="${homePath(depth)}index.html" style="color:#fff">Labora<span>X</span></a>
        <p class="lx-muted" style="margin-top:16px;color:#9ca3af">Premium diagnostics, home collection, digital reports, and connected patient care in one static HTML template.</p>
      </div>
      <div>
        <h3>Company</h3>
        <ul class="lx-list">
          <li><a href="${pageHref(depth, 'about.html')}">About</a></li>
          <li><a href="${pageHref(depth, 'services.html')}">Services</a></li>
          <li><a href="${pageHref(depth, 'doctors.html')}">Doctors</a></li>
          <li><a href="${pageHref(depth, 'contact.html')}">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3>Diagnostics</h3>
        <ul class="lx-list">
          <li><a href="${pageHref(depth, 'tests.html')}">All Tests</a></li>
          <li><a href="${pageHref(depth, 'packages.html')}">Packages</a></li>
          <li><a href="${pageHref(depth, 'home-collection.html')}">Home Collection</a></li>
          <li><a href="${pageHref(depth, 'reports.html')}">Reports</a></li>
        </ul>
      </div>
      <div>
        <h3>Help</h3>
        <ul class="lx-list">
          <li><a href="${pageHref(depth, 'faq.html')}">FAQ</a></li>
          <li><a href="${pageHref(depth, 'pricing.html')}">Pricing</a></li>
          <li><a href="${pageHref(depth, 'utility/privacy.html')}">Privacy</a></li>
          <li><a href="${pageHref(depth, 'utility/terms.html')}">Terms</a></li>
        </ul>
      </div>
    </div>
    <div style="border-top:1px solid #374151;margin-top:34px;padding-top:22px;color:#9ca3af">&copy; 2026 LaboraX. All rights reserved.</div>
  </div>
</footer>`;

const scripts = (depth = 0) => `
<script src="${assetPath(depth)}js/theme.js"></script>
<script src="${assetPath(depth)}js/main.js"></script>
<script src="${assetPath(depth)}js/navigation.js"></script>
<script src="${assetPath(depth)}js/laborax-template.js"></script>`;

const shell = ({ title, description, depth = 0, body }) => `${head({ title, description, depth })}
<body class="lx-shell">
  <header id="main-header"></header>
  <main class="lx-main">${body}</main>
  ${footer(depth)}
  ${scripts(depth)}
</body>
</html>`;

const hero = ({ eyebrow, title, copy, image, imageAlt, primaryHref, primaryText, secondaryHref, secondaryText, stats = [] }) => `
<section class="lx-hero">
  <div class="lx-container lx-two">
    <div class="reveal">
      <span class="lx-eyebrow"><i class="bi bi-shield-check"></i>${eyebrow}</span>
      <h1 class="lx-title">${title}</h1>
      <p class="lx-copy">${copy}</p>
      <div class="lx-actions">
        <a class="lx-btn primary" href="${primaryHref}">${primaryText}<i class="bi bi-arrow-right"></i></a>
        <a class="lx-btn secondary" href="${secondaryHref}">${secondaryText}</a>
      </div>
      <div class="lx-stats">${stats.map(s => `<div class="lx-stat"><strong>${s.value}</strong><span>${s.label}</span></div>`).join('')}</div>
    </div>
    <figure class="lx-media reveal fade-left">
      <img src="${image}" alt="${imageAlt}">
    </figure>
  </div>
</section>`;

const sectionHead = (eyebrow, title, copy = '') => `
<div class="lx-section-head reveal">
  <div>
    <span class="lx-eyebrow">${eyebrow}</span>
    <h2 class="lx-heading">${title}</h2>
    ${copy ? `<p class="lx-copy">${copy}</p>` : ''}
  </div>
</div>`;

const cards = (items, cols = 3) => `<div class="lx-grid" style="--cols:${cols}">${items.map((item, i) => `
<article class="lx-card reveal" data-filter-card data-category="${item.category || 'all'}" style="transition-delay:${Math.min(i * 70, 350)}ms">
  ${item.img ? `<div class="lx-media" style="min-height:190px;margin:-8px -8px 18px"><img src="${item.img}" alt="${item.alt || item.title}" loading="lazy" style="min-height:190px"></div>` : `<span class="lx-iconbox"><i class="bi ${item.icon || 'bi-check2-circle'}"></i></span>`}
  <h3>${item.title}</h3>
  <p>${item.copy}</p>
  ${item.meta ? `<div class="lx-chip-row">${item.meta.map(m => `<span class="lx-chip">${m}</span>`).join('')}</div>` : ''}
  ${item.price ? `<div class="lx-price"><strong>${item.price}</strong>${item.old ? `<del>${item.old}</del>` : ''}</div>` : ''}
  ${item.href ? `<div class="lx-page-actions"><a class="lx-btn secondary" href="${item.href}">${item.cta || 'View Details'}</a></div>` : ''}
</article>`).join('')}</div>`;

const pageHero = (title, copy, depth, crumbs = []) => `
<section class="lx-page-hero">
  <div class="lx-container">
    <nav class="lx-breadcrumb" aria-label="Breadcrumb">
      <a href="${homePath(depth)}index.html">Home</a><i class="bi bi-chevron-right"></i>${crumbs.map(c => c.href ? `<a href="${c.href}">${c.label}</a><i class="bi bi-chevron-right"></i>` : `<span>${c.label}</span>`).join('')}
    </nav>
    <span class="lx-eyebrow">LaboraX Diagnostics</span>
    <h1 class="lx-title">${title}</h1>
    <p class="lx-copy">${copy}</p>
  </div>
</section>`;

const packages = [
  ['Complete Health Checkup', '78 parameters covering blood, heart, liver, kidney, thyroid, vitamins, and diabetes risk.', '$149', '$229', 'Popular'],
  ['Diabetes Care Package', 'Fasting glucose, HbA1c, insulin resistance markers, kidney health, and lipid risk review.', '$79', '$119', 'Diabetes'],
  ['Heart Health Screening', 'Lipid profile, hs-CRP, liver enzymes, kidney function, and cardiac risk indicators.', '$99', '$159', 'Heart'],
  ["Women's Wellness Package", 'Hormones, thyroid, anemia, vitamin D, calcium, and preventive health essentials.', '$129', '$199', 'Women'],
  ["Men's Health Package", 'Metabolic, liver, kidney, testosterone, lipid, and inflammation markers for active men.', '$119', '$179', 'Men'],
  ['Senior Citizen Health Package', 'Organ function, arthritis markers, diabetes, vitamins, urine analysis, and heart risk.', '$139', '$219', 'Senior'],
  ['Vitamin & Nutrition Package', 'Vitamin D, B12, iron profile, calcium, magnesium, and nutrition-linked biomarkers.', '$69', '$109', 'Nutrition'],
  ['Thyroid Wellness Package', 'T3, T4, TSH, antibody screening, vitamin D, and metabolic wellness markers.', '$59', '$89', 'Thyroid']
];

const tests = [
  ['CBC', 'Complete blood count for infection, anemia, and general wellness screening.', '$18', '6 hours', 'blood'],
  ['HbA1c', 'Three-month average blood glucose marker for diabetes monitoring.', '$24', '12 hours', 'diabetes'],
  ['Blood Sugar', 'Fasting and post-meal glucose screening with digital report.', '$12', '6 hours', 'diabetes'],
  ['Lipid Profile', 'Cholesterol, HDL, LDL, VLDL, and triglyceride assessment.', '$32', '12 hours', 'heart'],
  ['Thyroid Profile', 'T3, T4, and TSH for thyroid function monitoring.', '$28', '12 hours', 'thyroid'],
  ['Vitamin D', '25-OH vitamin D level for bone, immunity, and fatigue concerns.', '$42', '24 hours', 'vitamin'],
  ['Vitamin B12', 'B12 level assessment for fatigue, nerve health, and nutrition.', '$38', '24 hours', 'vitamin'],
  ['Liver Function', 'Bilirubin, SGOT, SGPT, protein, and enzyme panel.', '$35', '12 hours', 'liver'],
  ['Kidney Function', 'Creatinine, urea, uric acid, electrolytes, and eGFR.', '$35', '12 hours', 'kidney'],
  ['Iron Profile', 'Iron, ferritin, TIBC, and transferrin saturation assessment.', '$46', '24 hours', 'blood'],
  ['Hormone Tests', 'Targeted hormone panels for fertility and metabolic health.', '$58', '24 hours', 'hormone'],
  ['Urine Analysis', 'Routine microscopy and chemical urine screening.', '$15', '6 hours', 'kidney']
];

const home1 = shell({
  title: 'LaboraX | Trusted Diagnostic Laboratory HTML Template',
  description: 'Premium multipage diagnostic laboratory template with tests, packages, home sample collection, reports, doctors, dark mode, RTL, dashboards, and responsive pages.',
  body: `${hero({
    eyebrow: 'Trusted Diagnostic Care',
    title: 'Your Health.<br><span style="color:rgb(var(--primary-red))">Our Precision.</span>',
    copy: 'Trusted diagnostic testing with accurate results, convenient home sample collection, and experienced laboratory professionals.',
    image: images.labHero,
    imageAlt: 'Laboratory technician preparing blood samples in a modern diagnostic lab',
    primaryHref: 'pages/tests.html',
    primaryText: 'Book a Test',
    secondaryHref: 'pages/packages.html',
    secondaryText: 'Explore Packages',
    stats: [
      { value: '50K+', label: 'Patients Served' },
      { value: '150K+', label: 'Tests Completed' },
      { value: '98.7%', label: 'Report Accuracy' },
      { value: '4.9/5', label: 'Patient Rating' }
    ]
  })}
  <section class="lx-section lx-band">
    <div class="lx-container">
      ${sectionHead('Find the Right Test', 'Search blood tests, thyroid, vitamin, diabetes...', 'Start with a test name, symptom, or package category and jump directly into booking.')}
      <div class="lx-search lx-autocomplete reveal">
        <input class="lx-input" data-filter-input="home-tests" type="search" placeholder="Search CBC, HbA1c, Vitamin D, Lipid Profile">
        <a class="lx-btn primary" href="pages/tests.html">Search Tests</a>
        <div class="lx-suggestions" data-home-suggestions></div>
      </div>
      <div class="lx-chip-row reveal"><span class="lx-chip">CBC</span><span class="lx-chip">Thyroid</span><span class="lx-chip">Vitamin D</span><span class="lx-chip">HbA1c</span><span class="lx-chip">Lipid Profile</span></div>
    </div>
  </section>
  <section class="lx-section">
    <div class="lx-container">
      ${sectionHead('Popular Packages', 'Popular Health Packages', 'Curated preventive checkups with transparent pricing, preparation guidance, and fast report timelines.')}
      ${cards(packages.map((p, i) => ({ title: p[0], copy: p[1], price: p[2], old: p[3], img: [images.blood, images.homeCare, images.labEquip, images.doctor][i % 4], meta: [p[4], 'Home collection', '12-24 hr report'], href: 'pages/package-details.html', cta: 'View Details' })), 4)}
    </div>
  </section>
  <section class="lx-section lx-band">
    <div class="lx-container">
      ${sectionHead('Why Thousands Trust LaboraX', 'Diagnostic care without guesswork.', 'Every sample moves through trained collection, certified processing, quality review, and secure digital delivery.')}
      ${cards([
        { icon: 'bi-bullseye', title: 'Accurate Results', copy: 'Validated workflows and repeated quality checks before reports are released.' },
        { icon: 'bi-patch-check', title: 'Certified Laboratories', copy: 'Accreditation-ready sections for quality badges and certification details.' },
        { icon: 'bi-person-heart', title: 'Experienced Professionals', copy: 'Phlebotomists, lab technologists, and doctors presented with realistic profiles.' },
        { icon: 'bi-clock-history', title: 'Fast Reports', copy: 'Most routine reports are designed around same-day or next-day delivery.' },
        { icon: 'bi-house-heart', title: 'Home Sample Collection', copy: 'Flexible slots, digital confirmation, and trained technicians at the doorstep.' },
        { icon: 'bi-file-lock2', title: 'Secure Reports', copy: 'Patient dashboard pages support report history, prescriptions, and profile workflows.' }
      ], 3)}
    </div>
  </section>
  <section class="lx-section">
    <div class="lx-container">
      ${sectionHead('How It Works', 'Four simple steps from booking to report.', 'A patient-first journey designed for families, professionals, and senior citizens.')}
      <div class="lx-steps">
        ${['Choose Your Test', 'Book Your Slot', 'Sample Collection', 'Receive Your Report'].map((s, i) => `<article class="lx-card lx-step reveal"><h3>${s}</h3><p>${['Search tests or select a preventive package.', 'Pick home collection or lab visit at your preferred time.', 'A trained technician collects samples safely.', 'Download verified reports from your dashboard.'][i]}</p></article>`).join('')}
      </div>
    </div>
  </section>
  <section class="lx-section lx-band">
    <div class="lx-container lx-two">
      <div class="reveal">
        <span class="lx-eyebrow">Home Sample Collection</span>
        <h2 class="lx-heading">Healthcare at Your Doorstep</h2>
        <p class="lx-copy">Professional technicians visit the patient's home with sterile equipment, digital confirmation, and rapid lab handoff.</p>
        <ul class="lx-list"><li><i class="bi bi-check-circle"></i>Flexible appointment windows</li><li><i class="bi bi-check-circle"></i>Safe sample collection</li><li><i class="bi bi-check-circle"></i>Trained technician assignment</li><li><i class="bi bi-check-circle"></i>Digital confirmation and tracking</li></ul>
        <div class="lx-page-actions"><a class="lx-btn primary" href="pages/home-collection.html">Book Home Collection</a></div>
      </div>
      <figure class="lx-media reveal fade-left"><img src="${images.homeCare}" alt="Healthcare professional assisting a patient during home sample collection" loading="lazy"></figure>
    </div>
  </section>
  <section class="lx-section">
    <div class="lx-container">
      ${sectionHead('Popular Tests', 'Large Diagnostic Test Directory', 'Preview routine, preventive, and specialist tests with report times and prices.')}
      ${cards(tests.map(t => ({ icon: 'bi-droplet-half', title: t[0], copy: t[1], price: t[2], meta: [t[4], t[3]], href: 'pages/test-details.html', cta: 'Book Test', category: t[4] })), 4)}
    </div>
  </section>
  <section class="lx-section lx-band">
    <div class="lx-container lx-two">
      <figure class="lx-media reveal"><img src="${images.labEquip}" alt="Advanced laboratory equipment for diagnostic quality control" loading="lazy"></figure>
      <div class="reveal fade-left">
        <span class="lx-eyebrow">Laboratory Quality</span>
        <h2 class="lx-heading">Precision You Can Trust</h2>
        <p class="lx-copy">Certified labs, quality controls, advanced equipment, and experienced technicians form the backbone of every LaboraX report.</p>
        <div class="lx-grid" style="--cols:2;margin-top:22px">${['Certified Labs','Quality Control','Advanced Equipment','Experienced Technicians'].map(x => `<div class="lx-card"><span class="lx-iconbox"><i class="bi bi-check2"></i></span><h3>${x}</h3></div>`).join('')}</div>
      </div>
    </div>
  </section>
  <section class="lx-section">
    <div class="lx-container">
      ${sectionHead('Doctors', 'Specialists Behind Your Reports', 'Realistic medical cards for pathologists, consultants, and laboratory leadership.')}
      ${cards([
        { img: images.doctor, title: 'Dr. Sarah Jenkins', copy: 'Consultant Pathologist with 14 years in hematology and preventive diagnostics.', meta: ['Pathology', '14 yrs'], href: 'pages/doctor-details.html', cta: 'View Profile' },
        { img: images.doctor2, title: 'Dr. Robert Chen', copy: 'Laboratory Director focused on quality systems and clinical chemistry.', meta: ['Clinical Chemistry', '18 yrs'], href: 'pages/doctor-details.html', cta: 'View Profile' },
        { img: images.doctor3, title: 'Dr. Maya Patel', copy: 'Endocrine diagnostics specialist for diabetes, thyroid, and hormone testing.', meta: ['Endocrinology', '11 yrs'], href: 'pages/doctor-details.html', cta: 'View Profile' }
      ], 3)}
    </div>
  </section>
  <section class="lx-section lx-band">
    <div class="lx-container">
      ${sectionHead('Certified. Trusted. Reliable.', 'Accreditation-ready quality badges.', 'Generic certification-style cards avoid fake official logos while keeping the template commercially useful.')}
      ${cards(['Accreditation Workflow','Quality Audit Program','ISO Process Documentation','Daily Internal Controls'].map((x, i) => ({ icon: 'bi-award', title: x, copy: ['Structured sample handling, result review, and release checkpoints for accredited laboratory operations.','Routine internal audits help teams keep procedures measurable, documented, and easy to verify.','Documented procedures for specimen handling, equipment checks, reporting, and corrective actions.','Daily controls, calibration logs, and review steps support consistent diagnostic quality.'][i] })), 4)}
    </div>
  </section>
  <section class="lx-section">
    <div class="lx-container">
      ${sectionHead('Testimonials', 'Patients trust the details.', 'A smooth responsive carousel with different patient stories and ratings.')}
      <div class="lx-slider reveal" data-slider><div class="lx-slider-track">
        ${['The technician was on time and the report was easy to understand.|Ava Morgan, Queens','My parents use LaboraX for monthly tests. The home visit flow is calm and reliable.|Daniel Reed, Brooklyn','Fast reports helped my doctor adjust treatment the same day.|Priya Shah, Jersey City','The package pricing was clear and the dashboard kept all records together.|Liam Carter, Newark','Booking a slot for my father took less than two minutes.|Nora Williams, Edison','The support team explained fasting instructions clearly.|Mateo Garcia, Hoboken'].map(t => { const [quote, name] = t.split('|'); return `<article class="lx-slide"><div class="lx-card"><span style="color:#f59e0b">5/5 rating</span><p style="margin-top:12px">${quote}</p><h3>${name}</h3></div></article>`; }).join('')}
      </div><div class="lx-dots"></div></div>
    </div>
  </section>
  <section class="lx-section lx-band">
    <div class="lx-container">
      ${sectionHead('Health Tips', 'Medical education that supports better testing.', 'Prepared article cards for patient education and SEO-rich content.')}
      ${cards([
        { img: images.blog, title: 'Blood Test Preparation', copy: 'When to fast, what to drink, and how medication timing affects results.', href: 'pages/blog-fasting-blood-sugar.html', cta: 'Read Article' },
        { img: images.blood, title: 'Understanding CBC', copy: 'A patient-friendly walkthrough of common blood count markers.', href: 'pages/blog-details.html', cta: 'Read Article' },
        { img: images.doctor, title: 'Vitamin D Testing', copy: 'Why vitamin D matters for bone, immunity, and fatigue evaluation.', href: 'pages/blog-vitamin-d.html', cta: 'Read Article' }
      ], 3)}
    </div>
  </section>
  <section class="lx-section">
    <div class="lx-container">
      ${sectionHead('FAQ', 'Common questions before a blood test.', '')}
      <div class="lx-faq" data-lx-faq>
        ${['How should I prepare for a blood test?|Some tests need 8-12 hours of fasting. Your booking confirmation should show preparation instructions for each test.','Can I book home sample collection?|Yes. Choose Home Collection during checkout or use the dedicated home collection page.','How long do reports take?|Most routine reports are ready within 12 to 24 hours. Specialty tests may take longer.','Can I upload a prescription?|Yes. The patient dashboard includes prescription upload pages.','How can I download my report?|Login to the patient dashboard and open Reports to view or download PDFs.','Can I reschedule my appointment?|Yes. Open your booking details and select a different available slot.'].map(q => { const [a,b] = q.split('|'); return `<article class="lx-card"><button aria-expanded="false">${a}<i class="bi bi-plus-lg"></i></button><div class="lx-faq-panel">${b}</div></article>`; }).join('')}
      </div>
    </div>
  </section>
  <section class="lx-section lx-cta" style="--cta-image:url('${images.microscope}')">
    <div class="lx-container reveal">
      <h2 class="lx-heading">Your Health Deserves Better Answers.</h2>
      <p class="lx-copy">Book a test or explore preventive packages with a diagnostic template built to feel premium from the first screen.</p>
      <div class="lx-actions"><a class="lx-btn primary" href="pages/tests.html">Book a Test</a><a class="lx-btn secondary" href="pages/packages.html">Explore Packages</a></div>
    </div>
  </section>`
});

const home2 = shell({
  title: 'LaboraX Digital | Connected Diagnostics Platform',
  description: 'Digital diagnostics homepage for online booking, sample tracking, digital reports, patient dashboard, analytics, and connected healthcare.',
  body: `${hero({
    eyebrow: 'Digital Diagnostics',
    title: 'Diagnostics, Reimagined for a <span style="color:rgb(var(--primary-red))">Digital World.</span>',
    copy: 'Book tests, track samples, receive digital reports, and manage your diagnostic journey from one connected platform.',
    image: images.digital,
    imageAlt: 'Doctor reviewing digital diagnostic reports on a connected healthcare interface',
    primaryHref: 'pages/auth/register.html',
    primaryText: 'Start Your Test',
    secondaryHref: '#platform',
    secondaryText: 'Explore Digital Services',
    stats: [
      { value: '24/7', label: 'Digital Access' },
      { value: '6', label: 'Journey Milestones' },
      { value: 'PDF', label: 'Secure Reports' },
      { value: 'Live', label: 'Sample Tracking' }
    ]
  })}
  <section id="platform" class="lx-section lx-band"><div class="lx-container">${sectionHead('Digital Platform', 'Everything About Your Diagnostics, In One Place', 'Different from Home 1, this experience focuses on booking, tracking, dashboards, notifications, and analytics.')}${cards([
    { icon: 'bi-calendar2-check', title: 'Online Booking', copy: 'Choose tests, packages, slots, and collection type through a guided flow.' },
    { icon: 'bi-file-earmark-medical', title: 'Digital Reports', copy: 'Secure report history with PDF download and doctor sharing concepts.' },
    { icon: 'bi-geo-alt', title: 'Sample Tracking', copy: 'Milestone-based visibility from booking confirmation to report-ready status.' },
    { icon: 'bi-cloud-upload', title: 'Prescription Upload', copy: 'Patient dashboard screens support prescription storage and review.' },
    { icon: 'bi-speedometer2', title: 'Patient Dashboard', copy: 'Bookings, reports, family profiles, and trend summaries in one place.' },
    { icon: 'bi-bell', title: 'Notifications', copy: 'Appointment reminders, report alerts, and status updates for every journey.' }
  ], 3)}</div></section>
  <section class="lx-section"><div class="lx-container">${sectionHead('Patient Journey', 'From booking to download, every status is visible.', '')}<ol class="lx-timeline">${['Book','Confirm','Sample Collected','Processing','Report Ready','Download'].map((x,i)=>`<li class="reveal"><b>${i+1}</b><div class="lx-card"><h3>${x}</h3><p>${['Select a test or digital wellness plan.','Receive slot and technician confirmation.','Collection status is captured digitally.','The lab processes and quality-checks the sample.','You are notified as soon as the report is verified.','Download the report or share it with a doctor.'][i]}</p></div></li>`).join('')}</ol></div></section>
  <section class="lx-section lx-band"><div class="lx-container lx-two"><figure class="lx-report-preview reveal"><h3>Report Preview</h3><p class="lx-muted">Complete Blood Count</p><div class="lx-table-wrap" style="margin-top:18px"><table class="lx-table"><tbody><tr><td>Hemoglobin</td><td>14.1 g/dL</td><td>Normal</td></tr><tr><td>WBC</td><td>7,200 /uL</td><td>Normal</td></tr><tr><td>Platelets</td><td>248k /uL</td><td>Normal</td></tr></tbody></table></div></figure><div class="reveal fade-left"><span class="lx-eyebrow">Digital Reports</span><h2 class="lx-heading">Reports built for action.</h2><p class="lx-copy">Secure access, PDF downloads, historical reports, doctor sharing, and notifications are presented as a polished product workflow.</p><ul class="lx-list"><li><i class="bi bi-check-circle"></i>Secure access</li><li><i class="bi bi-check-circle"></i>PDF download</li><li><i class="bi bi-check-circle"></i>Historical reports</li><li><i class="bi bi-check-circle"></i>Doctor sharing</li></ul></div></div></section>
  <section class="lx-section"><div class="lx-container lx-two"><div class="reveal"><span class="lx-eyebrow">Smart Analytics</span><h2 class="lx-heading">Health trends made readable.</h2><p class="lx-copy">Visual sections support monthly statistics, test history, report status, and trend monitoring without heavy chart libraries.</p><div class="lx-bar-chart"><span style="height:45%"></span><span style="height:70%"></span><span style="height:52%"></span><span style="height:90%"></span><span style="height:66%"></span><span style="height:82%"></span></div></div><figure class="lx-media reveal fade-left"><img src="${images.dashboard}" alt="Healthcare analytics dashboard visual" loading="lazy"></figure></div></section>
  <section class="lx-section lx-band"><div class="lx-container">${sectionHead('Digital Packages', 'Monitoring plans for connected care.', '')}${cards([
    { icon:'bi-phone', title:'Digital Wellness Plan', copy:'Quarterly testing plus report history and trend summaries.', price:'$199', meta:['Digital-first','Quarterly'], href:'pages/package-details.html' },
    { icon:'bi-briefcase', title:'Executive Health Monitoring', copy:'Priority booking, monthly markers, and consolidated reports.', price:'$349', meta:['Premium','Analytics'], href:'pages/package-details.html' },
    { icon:'bi-people', title:'Family Digital Care', copy:'Family profile tracking and shared package management.', price:'$399', meta:['Family','Dashboard'], href:'pages/package-details.html' },
    { icon:'bi-activity', title:'Annual Health Tracker', copy:'Year-long preventive diagnostics with report comparisons.', price:'$499', meta:['Annual','Trends'], href:'pages/package-details.html' },
    { icon:'bi-heart-pulse', title:'Senior Digital Care', copy:'Routine monitoring for seniors with reminders and status alerts.', price:'$299', meta:['Senior','Alerts'], href:'pages/package-details.html' }
  ], 3)}</div></section>
  <section class="lx-section"><div class="lx-container">${sectionHead('Technology', 'Technology Behind Better Diagnostics', '')}${cards(['Automated Processing','Secure Data','Digital Tracking','Smart Notifications','Connected Labs','Fast Reporting'].map((x,i)=>({icon:['bi-cpu','bi-shield-lock','bi-pin-map','bi-bell','bi-hdd-network','bi-lightning'][i],title:x,copy:'A HealthTech-focused feature block for modern diagnostic platform positioning.'})),3)}</div></section>
  <section class="lx-section lx-band"><div class="lx-container">${sectionHead('Digital Blog', 'Ideas for connected healthcare.', '')}${cards(['How Digital Lab Reports Work','The Future of Connected Diagnostics','How Sample Tracking Improves Healthcare','Understanding Digital Health Records','Why Online Diagnostics Are Growing','How Laboratory Automation Improves Accuracy'].map((x,i)=>({img:[images.reports,images.digital,images.dashboard][i%3],title:x,copy:'A technology-led article distinct from traditional patient education content.',href:'pages/blog.html',cta:'Read Insight'})),3)}</div></section>
  <section class="lx-section"><div class="lx-container">${sectionHead('Digital Testimonials', 'Built for convenience and clarity.', '')}<div class="lx-slider reveal" data-slider><div class="lx-slider-track">${['I could track every status from pickup to report ready.|Maya L., Product Manager','The dashboard made family reports much easier to manage.|Owen P., Parent','PDF reports and alerts saved me a follow-up call.|Isabella R., Consultant','Online booking was fast and the technician details were clear.|Noah S., Analyst'].map(t=>{const [q,n]=t.split('|');return `<article class="lx-slide"><div class="lx-card"><span style="color:#f59e0b">5/5 rating</span><p style="margin-top:12px">${q}</p><h3>${n}</h3></div></article>`}).join('')}</div><div class="lx-dots"></div></div></div></section>
  <section class="lx-section lx-cta" style="--cta-image:url('${images.digital}')"><div class="lx-container"><h2 class="lx-heading">Your Diagnostics. Connected.</h2><p class="lx-copy">Create an account or book a test through a complete HealthTech homepage experience.</p><div class="lx-actions"><a class="lx-btn primary" href="pages/auth/register.html">Create Account</a><a class="lx-btn secondary" href="pages/tests.html">Book a Test</a></div></div></section>`
});

write('assets/css/laborax-template.css', css);
write('assets/js/laborax-template.js', js);
write('index.html', home1);
write('home-2.html', home2);

const serviceItems = ['Blood Testing','Diabetes Testing','Thyroid Testing','Vitamin Testing','Hormone Testing','Heart Health',"Women's Health","Men's Health",'Liver Function','Kidney Function','Preventive Screening','Home Sample Collection'];
write('pages/services.html', shell({ title:'Services - LaboraX', description:'Diagnostic laboratory services including blood testing, diabetes, thyroid, vitamin, hormone, heart, liver, kidney, preventive screening, and home sample collection.', depth:1, body:`${pageHero('Diagnostic Services','Traditional laboratory services and digital diagnostics workflows for a complete static template.',1,[{label:'Services'}])}<section class="lx-section"><div class="lx-container">${sectionHead('Home 1 Services','Patient-focused diagnostic care','')}${cards(serviceItems.map((x,i)=>({icon:['bi-droplet','bi-activity','bi-lightning','bi-sun','bi-gender-ambiguous','bi-heart-pulse'][i%6],title:x,copy:'Detailed service card with benefits, preparation instructions, process steps, FAQ hooks, and related service links.',href:'service-details.html'})),4)}</div></section><section class="lx-section lx-band"><div class="lx-container">${sectionHead('Home 2 Services','Digital healthcare services','')}${cards(['Online Test Booking','Digital Reports','Sample Tracking','Prescription Upload','Patient Dashboard','Digital Notifications','Health History','Health Analytics','Lab Integration','Corporate Diagnostics'].map((x,i)=>({icon:['bi-calendar2-check','bi-file-earmark-medical','bi-geo','bi-cloud-upload','bi-speedometer2'][i%5],title:x,copy:'Digital diagnostics content focused on connected healthcare and platform workflows.',href:'service-details.html'})),4)}</div></section>`}));

write('pages/service-details.html', shell({ title:'Service Details - LaboraX', description:'Service overview, benefits, included tests, preparation instructions, process, FAQ, related services, and booking CTA.', depth:1, body:`${pageHero('Blood Testing Service','A detailed diagnostic service page with overview, benefits, preparation, process, related services, and CTA.',1,[{label:'Services',href:'services.html'},{label:'Blood Testing'}])}<section class="lx-section"><div class="lx-container lx-two"><div><span class="lx-eyebrow">Service Overview</span><h2 class="lx-heading">Reliable blood testing for everyday decisions.</h2><p class="lx-copy">Use this page for any diagnostic service detail. It includes benefits, included parameters, preparation guidance, process timeline, FAQ content, and related services.</p><ul class="lx-list"><li><i class="bi bi-check-circle"></i>Routine and preventive panels</li><li><i class="bi bi-check-circle"></i>Home collection supported</li><li><i class="bi bi-check-circle"></i>Secure digital report delivery</li></ul><div class="lx-page-actions"><a class="lx-btn primary" href="tests.html">Book This Service</a></div></div><figure class="lx-media"><img src="${images.blood}" alt="Blood samples prepared for diagnostic testing" loading="lazy"></figure></div></section><section class="lx-section lx-band"><div class="lx-container">${sectionHead('Process','What happens after booking','')}<div class="lx-steps">${['Choose service','Prepare sample','Lab processing','Report delivery'].map(x=>`<article class="lx-card lx-step"><h3>${x}</h3><p>Clear timeline copy for service detail customization.</p></article>`).join('')}</div></div></section>`}));

write('pages/home-collection.html', shell({ title:'Home Sample Collection - LaboraX', description:'Book safe diagnostic home sample collection with trained technicians, flexible slots, lab processing, and digital report delivery.', depth:1, body:`${pageHero('Home Sample Collection','Professional technicians visit your home for safe sample collection and quick laboratory processing.',1,[{label:'Home Collection'}])}<section class="lx-section"><div class="lx-container lx-two"><div><span class="lx-eyebrow">Doorstep Diagnostics</span><h2 class="lx-heading">Book Slot. Technician Arrival. Sample Collection. Report Delivery.</h2><p class="lx-copy">A dedicated page for the home collection workflow requested in the brief.</p><ul class="lx-list"><li><i class="bi bi-check-circle"></i>Flexible appointments</li><li><i class="bi bi-check-circle"></i>Digital technician assignment</li><li><i class="bi bi-check-circle"></i>Safe sample handling</li><li><i class="bi bi-check-circle"></i>Fast report delivery</li></ul></div><figure class="lx-media"><img src="${images.homeCare}" alt="Medical professional providing home sample collection" loading="lazy"></figure></div></section><section class="lx-section lx-band"><div class="lx-container"><div class="lx-steps">${['Book Slot','Technician Arrival','Sample Collection','Laboratory Processing','Report Delivery'].map(x=>`<article class="lx-card lx-step"><h3>${x}</h3><p>Use this step to explain the doorstep diagnostic journey.</p></article>`).join('')}</div></div></section>`}));

write('pages/reports.html', shell({ title:'Reports - LaboraX', description:'Digital diagnostic reports page covering report processing, expected times, downloads, report history, and doctor sharing.', depth:1, body:`${pageHero('Digital Reports','Understand report processing, timelines, downloads, report history, and doctor sharing.',1,[{label:'Reports'}])}<section class="lx-section"><div class="lx-container lx-two"><div class="lx-report-preview"><h2 class="lx-heading">Report Preview</h2><div class="lx-table-wrap"><table class="lx-table"><tbody><tr><td>CBC</td><td>Ready</td><td>PDF</td></tr><tr><td>Vitamin D</td><td>Processing</td><td>Expected tomorrow</td></tr><tr><td>Lipid Profile</td><td>Ready</td><td>Shared with doctor</td></tr></tbody></table></div></div><div><span class="lx-eyebrow">Report Workflow</span><h2 class="lx-heading">From sample processing to secure download.</h2><ul class="lx-list"><li><i class="bi bi-check-circle"></i>Report processing</li><li><i class="bi bi-check-circle"></i>Expected time display</li><li><i class="bi bi-check-circle"></i>Digital download</li><li><i class="bi bi-check-circle"></i>Report history</li><li><i class="bi bi-check-circle"></i>Doctor sharing</li></ul></div></div></section>`}));

write('pages/test-details.html', shell({ title:'Test Details - LaboraX', description:'Detailed test page with overview, preparation, parameters, price, report time, FAQ, and booking CTA.', depth:1, body:`${pageHero('Complete Blood Count Test','A detailed test page with overview, preparation, parameters, price, report time, FAQ, and booking CTA.',1,[{label:'Tests',href:'tests.html'},{label:'CBC'}])}<section class="lx-section"><div class="lx-container lx-two"><div><span class="lx-eyebrow">CBC Test</span><h2 class="lx-heading">A core blood test for routine health screening.</h2><p class="lx-copy">CBC checks red cells, white cells, hemoglobin, hematocrit, platelets, and related markers.</p><div class="lx-price"><strong>$18</strong><del>$25</del></div><ul class="lx-list"><li><i class="bi bi-clock"></i>Report time: 6 hours</li><li><i class="bi bi-cup-hot"></i>No fasting required unless combined with other tests</li><li><i class="bi bi-house-heart"></i>Home collection available</li></ul><div class="lx-page-actions"><a class="lx-btn primary" href="tests.html">Book CBC</a></div></div><figure class="lx-media"><img src="${images.blood}" alt="Blood tube used for CBC diagnostic testing" loading="lazy"></figure></div></section>`}));

write('pages/package-details.html', shell({ title:'Package Details - LaboraX', description:'Detailed package page with included tests, pricing, discount, preparation, process, FAQ, and booking CTA.', depth:1, body:`${pageHero('Complete Health Checkup Package','A package details page with included tests, pricing, preparation, process, FAQ, and booking CTA.',1,[{label:'Packages',href:'packages.html'},{label:'Complete Health Checkup'}])}<section class="lx-section"><div class="lx-container lx-two"><div><span class="lx-eyebrow">78 Parameters</span><h2 class="lx-heading">Complete preventive screening for major organ systems.</h2><p class="lx-copy">Includes CBC, diabetes markers, thyroid, liver, kidney, lipid profile, urine routine, vitamins, and inflammation indicators.</p><div class="lx-price"><strong>$149</strong><del>$229</del></div><ul class="lx-list"><li><i class="bi bi-check-circle"></i>8-10 hours fasting recommended</li><li><i class="bi bi-check-circle"></i>Home collection included</li><li><i class="bi bi-check-circle"></i>Reports in 24 hours</li></ul><div class="lx-page-actions"><a class="lx-btn primary" href="packages.html">Book Package</a></div></div><figure class="lx-media"><img src="${images.labEquip}" alt="Modern diagnostic lab equipment for health package testing" loading="lazy"></figure></div></section>`}));

write('pages/doctor-details.html', shell({ title:'Doctor Details - LaboraX', description:'Doctor profile page with specialization, experience, credentials, consultation focus, and related diagnostics.', depth:1, body:`${pageHero('Dr. Sarah Jenkins','Consultant pathologist profile with specialization, experience, credentials, and related diagnostic services.',1,[{label:'Doctors',href:'doctors.html'},{label:'Dr. Sarah Jenkins'}])}<section class="lx-section"><div class="lx-container lx-two"><figure class="lx-media"><img src="${images.doctor}" alt="Professional medical portrait of a diagnostic specialist" loading="lazy"></figure><div><span class="lx-eyebrow">Consultant Pathologist</span><h2 class="lx-heading">14 years of hematology and preventive diagnostics.</h2><p class="lx-copy">Use this page for doctor profiles, medical credentials, specialties, availability, and related tests.</p><ul class="lx-list"><li><i class="bi bi-award"></i>Hematology and clinical pathology</li><li><i class="bi bi-hospital"></i>Quality review lead</li><li><i class="bi bi-file-medical"></i>CBC, anemia, and preventive screening interpretation</li></ul></div></div></section>`}));

write('pages/faq.html', shell({ title:'FAQ - LaboraX', description:'Frequently asked questions about test preparation, home collection, reports, prescriptions, rescheduling, and digital access.', depth:1, body:`${pageHero('Frequently Asked Questions','Answers for test preparation, home collection, reports, prescriptions, rescheduling, and dashboards.',1,[{label:'FAQ'}])}<section class="lx-section"><div class="lx-container"><div class="lx-faq" data-lx-faq>${['How should I prepare for a blood test?|Preparation depends on the test. Fasting instructions appear during booking.','Can I book home sample collection?|Yes, select a slot and a trained technician will visit your home.','How long do reports take?|Routine tests usually take 12 to 24 hours.','Can I upload a prescription?|Yes, use the prescription upload page inside the patient dashboard.','How can I download my report?|Login, open Reports, and download the PDF.','Can I reschedule my appointment?|Yes, rescheduling is available from booking details.'].map(q=>{const[a,b]=q.split('|');return `<article class="lx-card"><button aria-expanded="false">${a}<i class="bi bi-plus-lg"></i></button><div class="lx-faq-panel">${b}</div></article>`}).join('')}</div></div></section>`}));

write('pages/pricing.html', shell({ title:'Pricing - LaboraX', description:'Transparent LaboraX diagnostic package pricing for basic tests, wellness packages, premium screenings, and corporate plans.', depth:1, body:`${pageHero('Transparent Pricing','Compare diagnostic tests, packages, premium screenings, family plans, and corporate diagnostics.',1,[{label:'Pricing'}])}<section class="lx-section"><div class="lx-container">${cards([
{icon:'bi-droplet',title:'Basic Tests',copy:'Routine blood, urine, glucose, and thyroid tests.',price:'From $12',href:'tests.html',cta:'Browse Tests'},
{icon:'bi-heart-pulse',title:'Wellness Packages',copy:'Preventive checkups with bundled savings.',price:'From $59',href:'packages.html',cta:'View Packages'},
{icon:'bi-stars',title:'Premium Screening',copy:'Advanced panels with priority processing.',price:'From $199',href:'packages.html',cta:'Compare Plans'},
{icon:'bi-building',title:'Corporate Diagnostics',copy:'Employee health screening and custom reporting.',price:'Custom',href:'contact.html',cta:'Contact Sales'}
],4)}</div></section>`}));

write('pages/blog-details.html', shell({ title:'Blog Details - LaboraX', description:'Detailed medical education article template with hero image, author, date, reading time, content, quote, tags, and related posts.', depth:1, body:`${pageHero('5 Essential Tests You Should Take Annually','A complete blog details layout with hero image, author, date, reading time, content, quote, tags, and related posts.',1,[{label:'Blog',href:'blog.html'},{label:'Annual Tests'}])}<article class="lx-section"><div class="lx-container lx-two"><figure class="lx-media"><img src="${images.blog}" alt="Doctor discussing preventive annual health screening" loading="lazy"></figure><div><span class="lx-eyebrow">Preventive Care - 7 min read</span><h2 class="lx-heading">Annual testing helps find silent health changes early.</h2><p class="lx-copy">Use this article template for long-form patient education. Include headings, realistic imagery, practical preparation guidance, and related test CTAs.</p><blockquote class="lx-card" style="margin-top:20px">Preventive diagnostics are most useful when patients can understand the purpose of every marker.</blockquote></div></div></article>`}));

const articlePage = ({ file, title, description, category, meta, image, alt, intro, sections, relatedHref = 'tests.html', relatedText = 'Book a Related Test' }) => write(`pages/${file}.html`, shell({
  title: `${title} | LaboraX`,
  description,
  depth: 1,
  body: `${pageHero(title, description, 1, [{label:'Blog',href:'blog.html'},{label:title}])}<article class="lx-section"><div class="lx-container lx-article"><span class="lx-eyebrow">${category}</span><div class="lx-article-meta"><span class="lx-chip">${meta}</span><span class="lx-chip">Reviewed content</span></div><figure class="lx-media"><img src="${image}" alt="${alt}" loading="lazy"></figure><p>${intro}</p>${sections.map(section => `<h2>${section.title}</h2><p>${section.copy}</p>`).join('')}<blockquote class="lx-card" style="margin-top:28px"><p>Use this article layout for patient education, search-friendly health content, and clear calls to action without losing the premium diagnostic template feel.</p></blockquote><div class="lx-page-actions"><a class="lx-btn primary" href="${relatedHref}">${relatedText}<i class="bi bi-arrow-right"></i></a><a class="lx-btn secondary" href="blog.html">Back to Blog</a></div></div></article>`
}));

[
  {
    file: 'blog-fasting-blood-sugar',
    title: 'How to Prepare for a Fasting Blood Sugar Test',
    description: 'Learn how to prepare for a fasting blood sugar test, including timing, medication questions, and appointment guidance.',
    category: 'Diet & Nutrition',
    meta: 'Oct 08, 2026 - 4 min read',
    image: images.labHero,
    alt: 'Laboratory blood sample preparation for a fasting glucose test',
    intro: 'Following collection instructions for a fasting glucose test helps make the result easier for a qualified clinician to interpret.',
    sections: [
      { title: 'Before your appointment', copy: 'Follow the fasting duration shown with your booking. Water is usually allowed, but confirm the exact instruction for your selected test or package.' },
      { title: 'Medication and health context', copy: 'If you take regular medication or have diabetes care instructions, ask your clinician whether any changes are needed before the test.' }
    ],
    relatedHref: 'tests.html',
    relatedText: 'Book Blood Sugar Test'
  },
  {
    file: 'blog-vitamin-d',
    title: 'Understanding the Impact of Vitamin D on Your Immune System',
    description: 'Learn why vitamin D testing can support preventive health conversations about immunity, energy, and wellness.',
    category: 'Preventive Health',
    meta: 'Oct 15, 2026 - Dr. Sarah Jenkins - 6 min read',
    image: images.doctor,
    alt: 'Doctor explaining vitamin D testing and preventive wellness',
    intro: 'Vitamin D supports normal immune function and is a useful preventive health marker for many wellness conversations.',
    sections: [
      { title: 'A clear view of your level', copy: 'Sun exposure, food intake, age, and individual health factors can affect vitamin D levels. Testing gives a more concrete baseline.' },
      { title: 'Using results responsibly', copy: 'A qualified professional can review your result with symptoms, medical history, and nutrition goals before suggesting next steps.' }
    ],
    relatedHref: 'tests.html',
    relatedText: 'Find Vitamin Tests'
  },
  {
    file: 'blog-lipid-profile',
    title: 'Understanding Your Lipid Profile Report',
    description: 'Understand lipid profile report markers such as HDL, LDL, and triglycerides in the context of heart health screening.',
    category: 'Heart Health',
    meta: 'Oct 05, 2026 - 5 min read',
    image: images.labEquip,
    alt: 'Laboratory analysis for lipid profile diagnostics',
    intro: 'A lipid profile measures several blood fats that can help describe cardiovascular risk in the context of your overall health.',
    sections: [
      { title: 'Reading results in context', copy: 'HDL, LDL, and triglyceride values are most useful when reviewed alongside age, family history, blood pressure, lifestyle, and other clinical information.' },
      { title: 'Why repeat testing matters', copy: 'Trend history can be more useful than a single value, especially when lifestyle changes or treatment plans are being monitored.' }
    ],
    relatedHref: 'tests.html',
    relatedText: 'Book Lipid Profile'
  },
  {
    file: 'blog-preventive-screening',
    title: 'Why Preventive Health Screening Matters After 30',
    description: 'A patient-friendly guide to preventive health screening after 30 and building useful diagnostic baselines.',
    category: 'Preventive Health',
    meta: 'Oct 12, 2026 - 5 min read',
    image: images.blog,
    alt: 'Preventive health consultation in a diagnostic clinic',
    intro: 'Preventive screening helps identify meaningful changes before they become more difficult to manage.',
    sections: [
      { title: 'Build a useful routine', copy: 'A qualified clinician can recommend the tests most relevant to your age, history, and goals. Results then become a practical baseline.' },
      { title: 'Choose packages with purpose', copy: 'Bundled health packages are most useful when they match your risk profile instead of simply including the largest number of parameters.' }
    ],
    relatedHref: 'packages.html',
    relatedText: 'Explore Packages'
  },
  {
    file: 'blog-ai-pathology',
    title: 'The Future of AI in Diagnostic Pathology',
    description: 'Explore how AI supports diagnostic pathology workflows, lab review prioritization, and responsible HealthTech innovation.',
    category: 'Diagnostics Innovation',
    meta: 'Oct 01, 2026 - 7 min read',
    image: images.digital,
    alt: 'Digital healthcare technology used in diagnostic pathology workflows',
    intro: 'Artificial intelligence is helping laboratory teams organize information, prioritize review, and support consistent diagnostic workflows.',
    sections: [
      { title: 'Technology supports expertise', copy: 'AI tools are designed to support qualified professionals, not replace clinical judgment. Responsible adoption keeps patient care at the center.' },
      { title: 'Connected diagnostics', copy: 'Automation, structured data, and digital report delivery can reduce friction across booking, sample processing, report review, and follow-up.' }
    ],
    relatedHref: '../home-2.html',
    relatedText: 'Explore Digital Diagnostics'
  }
].forEach(articlePage);

write('pages/about.html', shell({ title:'About LaboraX', description:'About LaboraX with distinct traditional diagnostic laboratory story and digital diagnostics vision.', depth:1, body:`${pageHero('Trusted Healthcare, Built Around You','LaboraX combines traditional diagnostic excellence with the future of digital diagnostics.',1,[{label:'About'}])}<section class="lx-section"><div class="lx-container lx-two"><div><span class="lx-eyebrow">Home 1 About</span><h2 class="lx-heading">Our Story, Mission, Values, and Patient Promise.</h2><p class="lx-copy">LaboraX was created to make diagnostic healthcare more accessible, transparent, reliable, and convenient. This traditional section supports lab excellence, patient care, quality commitment, and medical teams.</p><ul class="lx-list"><li><i class="bi bi-check-circle"></i>Laboratory excellence</li><li><i class="bi bi-check-circle"></i>Quality commitment</li><li><i class="bi bi-check-circle"></i>Patient-first operations</li></ul></div><figure class="lx-media"><img src="${images.labEquip}" alt="Laboratory technicians working in a diagnostic lab" loading="lazy"></figure></div></section><section class="lx-section lx-band"><div class="lx-container lx-two"><figure class="lx-media"><img src="${images.digital}" alt="Healthcare professionals using digital diagnostic technology" loading="lazy"></figure><div><span class="lx-eyebrow">Home 2 About</span><h2 class="lx-heading">Building the Future of Digital Diagnostics.</h2><p class="lx-copy">This separate content area covers digital vision, technology, innovation, connected healthcare, data security, patient experience, and future roadmap without duplicating the traditional lab story.</p><ul class="lx-list"><li><i class="bi bi-check-circle"></i>Connected healthcare</li><li><i class="bi bi-check-circle"></i>Secure data workflows</li><li><i class="bi bi-check-circle"></i>Digital patient experience</li></ul></div></div></section>`}));

write('pages/contact.html', shell({ title:'Contact LaboraX', description:'Contact LaboraX for support, home collection, reports, corporate diagnostics, and feedback.', depth:1, body:`${pageHero('Get in Touch','Support for bookings, reports, home collection, corporate tie-ups, and feedback.',1,[{label:'Contact'}])}<section class="lx-section"><div class="lx-container lx-two"><div><span class="lx-eyebrow">Support</span><h2 class="lx-heading">Traditional care and digital help channels.</h2><ul class="lx-list"><li><i class="bi bi-geo-alt"></i>123 Health Avenue, Medical District, NY 10001</li><li><i class="bi bi-telephone"></i>+1 (555) 123-4567</li><li><i class="bi bi-envelope"></i>support@laborax.com</li></ul></div><form class="lx-card"><div class="lx-form-grid"><input class="lx-input" placeholder="First name"><input class="lx-input" placeholder="Last name"></div><div class="lx-form-grid" style="margin-top:14px"><input class="lx-input" type="email" placeholder="Email"><input class="lx-input" placeholder="Phone"></div><select class="lx-select" style="margin-top:14px"><option>Test booking support</option><option>Report status</option><option>Corporate diagnostics</option></select><textarea class="lx-textarea" style="margin-top:14px" rows="5" placeholder="How can we help?"></textarea><button class="lx-btn primary" type="submit" style="margin-top:14px">Send Message</button></form></div></section>`}));

write('pages/blog.html', shell({ title:'Health Blog - LaboraX', description:'Medical education and digital healthcare articles for LaboraX diagnostics.', depth:1, body:`${pageHero('Health & Digital Diagnostics Blog','Medical education for Home 1 and HealthTech insights for Home 2, with distinct topics and categories.',1,[{label:'Blog'}])}<section class="lx-section"><div class="lx-container">${sectionHead('Home 1 Medical Education',"Blood tests, nutrition, preventive care, diabetes, thyroid, and women's health",'')}${cards(['Blood test preparation','Understanding CBC','Vitamin D testing','Diabetes screening','Thyroid testing',"Women's preventive care"].map((x,i)=>({img:[images.blog,images.blood,images.doctor][i%3],title:x,copy:'Traditional patient education article topic with realistic medical imagery.',href:['blog-fasting-blood-sugar.html','blog-details.html','blog-vitamin-d.html','blog-preventive-screening.html','blog-lipid-profile.html','blog-preventive-screening.html'][i],cta:'Read More'})),3)}</div></section><section class="lx-section lx-band"><div class="lx-container">${sectionHead('Home 2 Digital Healthcare','Digital health, lab automation, patient experience, health data, and innovation','')}${cards(['How Digital Lab Reports Work','The Future of Connected Diagnostics','How Sample Tracking Improves Healthcare','Understanding Digital Health Records','Why Online Diagnostics Are Growing','How Laboratory Automation Improves Accuracy'].map((x,i)=>({img:[images.digital,images.dashboard,images.reports][i%3],title:x,copy:'Distinct HealthTech article topic for Home 2 content.',href:'blog-ai-pathology.html',cta:'Read Insight'})),3)}</div></section>`}));

const authPage = ({ file, title, intro, fields, cta, links = '' }) => write(`pages/auth/${file}.html`, `${head({title:title + ' - LaboraX', description:title + ' page for the LaboraX patient dashboard.', depth:2})}<body class="lx-shell"><main class="lx-auth"><section class="lx-card lx-auth-card"><aside class="lx-auth-visual"><div><a class="lx-logo" href="../../index.html">Labora<span>X</span></a><h2>Diagnostics made easier to manage.</h2><p>Access bookings, prescription uploads, digital reports, and family health records from one secure LaboraX account.</p></div><div class="lx-auth-points"><span><i class="bi bi-shield-check"></i> Secure report access</span><span><i class="bi bi-file-earmark-medical"></i> Digital health history</span><span><i class="bi bi-house-heart"></i> Home collection tracking</span></div></aside><div class="lx-auth-panel"><div class="lx-auth-tools"><button class="lx-icon" data-theme-toggle type="button" aria-label="Switch to dark mode"><i class="bi bi-moon-stars"></i></button><button class="lx-direction" data-rtl-toggle type="button" aria-label="Switch text direction">RTL</button></div><a class="lx-logo" href="../../index.html">Labora<span>X</span></a><h1 class="lx-heading">${title}</h1><p class="lx-copy">${intro}</p><form class="lx-auth-form">${fields.map(f=>`<div class="lx-field"><label for="${f.id}">${f.label}</label><input class="lx-input" id="${f.id}" name="${f.id}" type="${f.type}" placeholder="${f.placeholder}" autocomplete="${f.autocomplete}" ${f.req?'required':''}></div>`).join('')}<button class="lx-btn primary" type="submit">${cta}<i class="bi bi-arrow-right"></i></button></form><div class="lx-auth-alt">${links}</div></div></section></main>${scripts(2)}</body></html>`);
authPage({file:'login',title:'Login',intro:'Welcome back. Continue to your reports, bookings, prescriptions, and family profiles.',fields:[{id:'email',type:'email',label:'Email address',placeholder:'name@example.com',autocomplete:'email',req:true},{id:'password',type:'password',label:'Password',placeholder:'Enter your password',autocomplete:'current-password',req:true}],cta:'Login',links:'<span>New to LaboraX?</span><a href="register.html">Create account</a><span>or</span><a href="forgot-password.html">reset password</a>'});
authPage({file:'register',title:'Register',intro:'Create a patient account for faster bookings, digital reports, and home collection updates.',fields:[{id:'name',type:'text',label:'Full name',placeholder:'Your full name',autocomplete:'name',req:true},{id:'email',type:'email',label:'Email address',placeholder:'name@example.com',autocomplete:'email',req:true},{id:'phone',type:'tel',label:'Phone number',placeholder:'+1 (555) 123-4567',autocomplete:'tel'},{id:'password',type:'password',label:'Password',placeholder:'Create a password',autocomplete:'new-password',req:true}],cta:'Create Account',links:'<span>Already registered?</span><a href="login.html">Login</a>'});
authPage({file:'forgot-password',title:'Forgot Password',intro:'Enter your email and we will send instructions to help you regain access.',fields:[{id:'email',type:'email',label:'Email address',placeholder:'name@example.com',autocomplete:'email',req:true}],cta:'Send Reset Link',links:'<a href="login.html">Back to login</a>'});
authPage({file:'reset-password',title:'Reset Password',intro:'Choose a new password for your LaboraX dashboard account.',fields:[{id:'password',type:'password',label:'New password',placeholder:'Create a new password',autocomplete:'new-password',req:true},{id:'confirm-password',type:'password',label:'Confirm password',placeholder:'Repeat new password',autocomplete:'new-password',req:true}],cta:'Reset Password',links:'<a href="login.html">Back to login</a>'});

const utility = (file, title, copy, extra = '') => write(`pages/utility/${file}.html`, shell({title:`${title} - LaboraX`,description:copy,depth:2,body:`${pageHero(title,copy,2,[{label:title}])}<section class="lx-section"><div class="lx-container"><article class="lx-card">${extra || `<p class="lx-copy">${copy}</p><div class="lx-page-actions"><a class="lx-btn primary" href="../../index.html">Back Home</a><a class="lx-btn secondary" href="../tests.html">Book a Test</a></div>`}</article></div></section>`}));
utility('404','Oops! This Result Does Not Exist.','Creative diagnostic 404 page for missing template routes.');
utility('coming-soon','Something Better Is Being Prepared.','Coming soon page with countdown timer.',`<h2 class="lx-heading">Launching soon.</h2><div class="lx-countdown" data-countdown="2026-12-31T00:00:00"></div><input class="lx-input" placeholder="Email for notification"><div class="lx-page-actions"><a class="lx-btn primary" href="../../index.html">Back Home</a></div>`);
utility('maintenance','We Are Improving Your Diagnostic Experience.','Maintenance page with progress indicator and support contact.',`<h2 class="lx-heading">Maintenance in progress.</h2><p class="lx-copy">Expected return: 2 hours. Contact support@laborax.com for urgent report access.</p><div style="height:12px;background:rgb(var(--border-primary));border-radius:999px;overflow:hidden;margin:24px 0"><span style="display:block;width:72%;height:100%;background:rgb(var(--primary-red))"></span></div><a class="lx-btn primary" href="../contact.html">Contact Support</a>`);
utility('privacy','Privacy Policy','Privacy policy page for diagnostic report data, account access, communication preferences, and support workflows.');
utility('terms','Terms & Conditions','Terms page for appointments, package use, sample collection, report timelines, payments, and template customization.');

const dashShell = (area, file, title, active, cardsHtml) => write(`pages/dashboard/${area}/${file.endsWith('.html') ? file : file + '.html'}`, `${head({title:`${title} - LaboraX ${area === 'admin' ? 'Admin' : 'Patient'} Dashboard`,description:`${title} dashboard page for LaboraX.`,depth:3})}<body class="lx-shell"><main class="lx-dashboard"><aside class="lx-sidebar"><a class="lx-logo" href="../../../index.html">Labora<span>X</span></a>${(area === 'admin' ? [['index.html','Overview','bi-grid'],['patients.html','Patients','bi-people'],['tests-catalog.html','Tests','bi-droplet'],['packages.html','Packages','bi-box'],['bookings.html','Bookings','bi-calendar'],['reports.html','Reports','bi-file-medical'],['messages.html','Messages','bi-chat'],['analytics.html','Analytics','bi-graph-up'],['settings.html','Settings','bi-gear']] : [['index.html','Overview','bi-grid'],['bookings.html','Bookings','bi-calendar'],['reports.html','Reports','bi-file-medical'],['prescriptions.html','Prescriptions','bi-cloud-upload'],['family.html','Family','bi-people'],['profile.html','Profile','bi-person'],['settings.html','Settings','bi-gear']]).map(([href,label,icon])=>`<a class="${label===active?'active':''}" href="${href}"><i class="bi ${icon}"></i>${label}</a>`).join('')}<a href="../../../index.html"><i class="bi bi-box-arrow-left"></i>Exit</a></aside><section class="lx-dash-content"><div class="lx-dash-head"><div><span class="lx-eyebrow">${area === 'admin' ? 'Admin' : 'Patient'} Dashboard</span><h1 class="lx-heading">${title}</h1></div><div class="lx-dash-tools"><button class="lx-icon" data-theme-toggle type="button" aria-label="Switch to dark mode"><i class="bi bi-moon-stars"></i></button><button class="lx-direction" data-rtl-toggle type="button" aria-label="Switch text direction">RTL</button></div></div>${cardsHtml}</section></main>${scripts(3)}</body></html>`);
const kpiCards = cards([{icon:'bi-calendar-check',title:'Bookings',copy:'24 active workflows'},{icon:'bi-file-medical',title:'Reports',copy:'18 ready reports'},{icon:'bi-droplet',title:'Tests',copy:'142 catalog items'},{icon:'bi-cash',title:'Revenue',copy:'$42.8k this month'}],4);
dashShell('patient','index','Patient Overview','Overview',`${kpiCards}<section class="lx-card" style="margin-top:22px"><h2>Recent Reports</h2><div class="lx-table-wrap"><table class="lx-table"><tbody><tr><td>CBC</td><td>Ready</td><td><a href="reports.html">View</a></td></tr><tr><td>Vitamin D</td><td>Processing</td><td>Tomorrow</td></tr></tbody></table></div></section>`);
['bookings','reports','prescriptions','family','profile','settings'].forEach(name=>dashShell('patient',`${name}.html`,name[0].toUpperCase()+name.slice(1),name[0].toUpperCase()+name.slice(1),`<div class="lx-grid" style="--cols:2"><article class="lx-card"><h3>${name} management</h3><p>Responsive patient dashboard page for ${name} workflows.</p></article><article class="lx-card"><h3>Mobile-ready</h3><p>Tables and cards adapt for small screens.</p></article></div>`));
dashShell('admin','index','Admin Overview','Overview',`${kpiCards}<section class="lx-card" style="margin-top:22px"><h2>Bookings Chart</h2><div class="lx-bar-chart"><span style="height:40%"></span><span style="height:80%"></span><span style="height:55%"></span><span style="height:90%"></span><span style="height:70%"></span></div></section>`);
['patients','tests-catalog','packages','bookings','reports','messages','analytics','settings'].forEach(name=>dashShell('admin',`${name}.html`,name.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' '),name==='tests-catalog'?'Tests':name[0].toUpperCase()+name.slice(1),`<div class="lx-grid" style="--cols:2"><article class="lx-card"><h3>${name} tools</h3><p>Admin dashboard page for managing ${name.replace('-',' ')}.</p></article><article class="lx-card"><h3>Responsive table</h3><div class="lx-table-wrap"><table class="lx-table"><tbody><tr><td>Sample item</td><td>Active</td><td>Updated</td></tr></tbody></table></div></article></div>`));

write('pages/admin/index.html', '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin Dashboard Redirect - LaboraX</title><meta name="description" content="Redirect helper page for the LaboraX admin dashboard."><meta http-equiv="refresh" content="0; url=../dashboard/admin/index.html"></head><body><main><h1>Admin Dashboard</h1><a href="../dashboard/admin/index.html">Open Admin Dashboard</a></main></body></html>');
write('pages/dashboard/index.html', '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Patient Dashboard Redirect - LaboraX</title><meta name="description" content="Redirect helper page for the LaboraX patient dashboard."><meta http-equiv="refresh" content="0; url=patient/index.html"></head><body><main><h1>Patient Dashboard</h1><a href="patient/index.html">Open Patient Dashboard</a></main></body></html>');


