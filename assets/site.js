/* 星宇作品集 · Editorial FinTech Interactive Layer (v4) — 原生轻量 JS，无外部依赖 */
(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- 单语中文 URL 清理 ----------
  try {
    var u0 = new URL(location.href);
    if (u0.searchParams.has('lang')) { u0.searchParams.delete('lang'); history.replaceState(null, '', u0.toString()); }
  } catch (e) {}

  function announce(msg) { var live = document.getElementById('lang-live'); if (live) live.textContent = msg; }

  // ---------- 顶部极细阅读进度条 ----------
  var bar = document.querySelector('.read-progress');
  if (!bar && document.body) {
    bar = document.createElement('div');
    bar.className = 'read-progress';
    bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = '<i></i>';
    document.body.prepend(bar);
  }
  var barFill = bar ? bar.querySelector('i') : null;
  if (barFill) {
    var rafBar = false;
    var updateBar = function () {
      rafBar = false;
      var doc = document.documentElement;
      var max = Math.max(1, doc.scrollHeight - window.innerHeight);
      var pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
      barFill.style.width = pct.toFixed(2) + '%';
    };
    window.addEventListener('scroll', function () {
      if (!rafBar) { rafBar = true; requestAnimationFrame(updateBar); }
    }, { passive: true });
    updateBar();
  }

  // ---------- 首屏肖像：支持手动切换 + 首次向下滚动自动切换 ----------
  var fig = document.querySelector('[data-portrait]');
  if (fig) {
    var pWork = fig.querySelector('.p-work'), pLife = fig.querySelector('.p-life');
    var pBtns = Array.prototype.slice.call(fig.querySelectorAll('[data-portrait-btn]'));
    var baseY = window.scrollY, switched = false, pending = false, intent = false, touchY = null;

    var setView = function (view, manual) {
      if (manual) switched = true;
      fig.setAttribute('data-view', view);
      if (pWork && pLife) {
        if (view === 'life') {
          pWork.setAttribute('aria-hidden', 'true');
          pLife.removeAttribute('aria-hidden');
        } else {
          pLife.setAttribute('aria-hidden', 'true');
          pWork.removeAttribute('aria-hidden');
        }
      }
      pBtns.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-portrait-btn') === view));
      });
    };

    pBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        setView(b.getAttribute('data-portrait-btn') || 'work', true);
      });
    });

    window.addEventListener('wheel', function (e) { if (e.deltaY > 0) intent = true; }, { passive: true });
    window.addEventListener('touchstart', function (e) { touchY = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('touchmove', function (e) {
      if (touchY !== null && e.touches[0].clientY < touchY) intent = true;
      touchY = e.touches[0].clientY;
    }, { passive: true });
    document.addEventListener('keydown', function (e) {
      if (['ArrowDown', 'PageDown', 'End', ' '].includes(e.key) &&
          !e.altKey && !e.ctrlKey && !e.metaKey &&
          !e.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')) intent = true;
    });
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (target && target.getBoundingClientRect().top > 4) intent = true;
    });

    var trySwitch = function () {
      if (switched || pending) return;
      if (!intent) { baseY = window.scrollY; return; }
      if (window.scrollY <= baseY + 4) { baseY = Math.min(baseY, window.scrollY); return; }
      pending = true;
      window.removeEventListener('scroll', trySwitch);
      var ready = function () { switched = true; pending = false; setView('life', false); };
      if (pLife.complete && pLife.naturalWidth) ready();
      else if (pLife.decode) pLife.decode().then(ready, function () { pLife.addEventListener('load', ready, { once: true }); });
      else pLife.addEventListener('load', ready, { once: true });
    };
    if (pWork && pLife) window.addEventListener('scroll', trySwitch, { passive: true });
  }

  // ---------- 轻量克制的滚动显现 ----------
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reveals.length && !reduceMotion && 'IntersectionObserver' in window) {
    root.classList.add('js-reveal');
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          rio.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
    reveals.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.94) el.classList.add('in');
      else rio.observe(el);
    });
  }

  // ---------- header ----------
  var head = document.querySelector('.site-head');
  if (head) {
    var onScroll = function () { head.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('primary-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      if (open) { var f = nav.querySelector('a'); if (f) f.focus(); }
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.focus(); }
    });
  }

  // ---------- scroll spy (home nav + case toc) ----------
  function spy(linksSel, cls) {
    var links = Array.prototype.slice.call(document.querySelectorAll(linksSel));
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (l) { var id = (l.getAttribute('href') || '').split('#')[1]; if (id) map[id] = l; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (l) { l.classList.remove(cls); if (cls === 'cur') l.removeAttribute('aria-current'); });
          map[en.target.id].classList.add(cls);
          if (cls === 'cur') map[en.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-32% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }
  spy('#primary-nav a', 'cur');
  spy('.toc a', 'active');

  // ---------- copy buttons ----------
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = document.querySelector(btn.getAttribute('data-copy'));
      var text = src ? src.innerText.trim() : (btn.getAttribute('data-copy-text') || '');
      var done = function () {
        var label = btn.querySelector('.zh') || btn;
        var old = label.textContent;
        btn.classList.add('done');
        label.textContent = '已复制 ✓';
        announce('已复制');
        setTimeout(function () { btn.classList.remove('done'); label.textContent = old; }, 1800);
      };
      var failed = function () { announce('复制失败，请选中文字手动复制。'); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, failed);
      else {
        var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
        var copied = false; try { copied = document.execCommand('copy'); } catch (e) {}
        ta.remove(); if (copied) done(); else failed();
      }
    });
  });

  // ---------- back to top ----------
  document.querySelectorAll('.to-top').forEach(function (b) {
    b.addEventListener('click', function () { window.scrollTo({ top: 0 }); var s = document.getElementById('top'); if (s) s.focus({ preventScroll: true }); });
  });

  // ---------- footer year ----------
  document.querySelectorAll('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });

  // ---------- FinSearch-X interstitial ----------
  var redirect = document.querySelector('[data-redirect]');
  if (redirect) {
    if (!reduceMotion) {
      var t, stopped = false;
      var stop = document.getElementById('stay');
      function updateRedirect() {
        clearTimeout(t);
        var paused = window.copyEditor && window.copyEditor.active;
        var progress = document.querySelector('.progress i');
        if (progress) progress.style.animationPlayState = paused ? 'paused' : 'running';
        if (!paused && !stopped) t = setTimeout(function () {
          if (!(window.copyEditor && window.copyEditor.active)) location.href = redirect.getAttribute('data-redirect') + '?from=finsearch-x#evolution';
        }, 5000);
      }
      window.addEventListener('copy-editor-state', updateRedirect);
      updateRedirect();
      if (stop) stop.addEventListener('click', function () { stopped = true; clearTimeout(t); stop.setAttribute('aria-disabled', 'true'); stop.disabled = true; var p = document.querySelector('.progress'); if (p) p.style.visibility = 'hidden'; });
    }
  }
  if (new URLSearchParams(location.search).get('from') === 'finsearch-x') {
    var n = document.getElementById('from-fsx'); if (n) n.hidden = false;
  }
})();
