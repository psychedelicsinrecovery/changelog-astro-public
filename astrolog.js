/* 🌵 PIR® AstroLog behaviour, alongside the shared alex.js (theme, palette, progress, spotlight).
   No network, no storage beyond the shared theme key alex.js already uses. */
(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  /* star chart: the rail fills as you read down it, and each star lights as it comes into view */
  var charts = $$('.chart');
  var fill = function () {
    charts.forEach(function (c) {
      var r = c.getBoundingClientRect();
      var v = (innerHeight * 0.8 - r.top) / (r.height || 1);
      c.style.setProperty('--fill', Math.max(0, Math.min(1, v)));
    });
  };
  if (charts.length) {
    if (reduce) charts.forEach(function (c) { c.style.setProperty('--fill', 1); });
    else { addEventListener('scroll', fill, { passive: true }); addEventListener('resize', fill); fill(); }
    var stars = $$('.chart .star');
    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('lit'); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -12% 0px' });
      stars.forEach(function (s, i) { s.style.transitionDelay = (i % 6) * 0.06 + 's'; io.observe(s); });
    } else stars.forEach(function (s) { s.classList.add('lit'); });
  }

  /* collapsible write-ups: open whichever section a link points into, and offer expand/collapse all */
  var openFor = function (hash) {
    if (!hash || hash.length < 2) return;
    var t; try { t = document.getElementById(decodeURIComponent(hash.slice(1))); } catch (e) { return; }
    if (!t) return;
    for (var p = t.parentElement; p; p = p.parentElement) if (p.tagName === 'DETAILS') p.open = true;
    t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };
  addEventListener('hashchange', function () { openFor(location.hash); });
  if (location.hash) setTimeout(function () { openFor(location.hash); }, 60);
  $$('.toc a').forEach(function (a) { a.addEventListener('click', function () { setTimeout(function () { openFor(a.getAttribute('href')); }, 0); }); });

  // Expand all: shown whenever the write-up has a folded section (one is enough: a write-up that keeps
  // its whole story in one fold gets the button too). With none, it stays hidden (astrolog.css makes
  // sure [hidden] wins over alex.css's .tool display).
  var toggle = document.querySelector('[data-details-toggle]');
  var all = $$('.prose details');
  if (toggle && all.length) {
    toggle.hidden = false;
    var label = toggle.querySelector('.lbl');
    var sync = function () { var open = all.every(function (d) { return d.open; }); label.textContent = open ? 'Collapse all' : 'Expand all'; toggle.setAttribute('aria-label', label.textContent + ' sections'); toggle.setAttribute('aria-pressed', open); };
    toggle.addEventListener('click', function () { var open = !all.every(function (d) { return d.open; }); all.forEach(function (d) { d.open = open; }); sync(); });
    all.forEach(function (d) { d.addEventListener('toggle', sync); });
    sync();
  }
  addEventListener('beforeprint', function () { all.forEach(function (d) { d.dataset.wasOpen = d.open; d.open = true; }); });
  addEventListener('afterprint', function () { all.forEach(function (d) { d.open = d.dataset.wasOpen === 'true'; }); });
})();
