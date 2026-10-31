// Scroll-Effekte: Fortschrittsbalken, sanftes Einblenden, Hero-Parallax.
// Bei "Bewegung reduzieren" im System werden alle Animationen abgeschaltet.
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bar = document.querySelector('.scroll-progress');
  var hero = document.querySelector('.hero .wrap');
  var nav = document.querySelector('.nav');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (nav) nav.classList.toggle('scrolled', y > 10);
    if (hero && !reduce) {
      var h = hero.offsetHeight || 1;
      var p = Math.min(y / (h * 1.1), 1);
      hero.style.transform = 'translateY(' + (y * 0.3) + 'px) scale(' + (1 - p * 0.06) + ')';
      hero.style.opacity = String(1 - p * 0.9);
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  if (reduce || !('IntersectionObserver' in window)) return;

  var sel = '.sec .h-xl, .sec .h-l, .sec .lead, .sec .eyebrow, .tile, .tiles > .tile, .steps > div, .row > div, .chips span, .calc, .ind-switch, .sec .actions, .legal h2, .legal p';
  var els = Array.prototype.slice.call(document.querySelectorAll(sel)).filter(function (el) {
    return !el.closest('.hero');
  });
  els.forEach(function (el) {
    var sibs = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
    el.classList.add('reveal');
    if (el.matches('.chips span')) el.classList.add('reveal-pop');
    el.style.transitionDelay = Math.min(sibs, 8) * 70 + 'ms';
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();
