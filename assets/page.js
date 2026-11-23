/* rstack 工作流使用说明 — 原生轻量交互层（无外部依赖） */
(function () {
  // 1. 顶部阅读进度条
  var barFill = document.querySelector('.read-progress > i');
  if (barFill) {
    var ticking = false;
    var updateBar = function () {
      ticking = false;
      var doc = document.documentElement;
      var max = Math.max(1, doc.scrollHeight - window.innerHeight);
      var pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
      barFill.style.width = pct.toFixed(2) + '%';
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateBar); }
    }, { passive: true });
    updateBar();
  }

  // 2. 顶部导航滚动阴影
  var head = document.querySelector('.site-head');
  if (head) {
    var onScroll = function () { head.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // 3. 左侧目录与顶部导航 Scroll Spy
  function spy(selector, activeCls) {
    var links = Array.prototype.slice.call(document.querySelectorAll(selector));
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (l) {
      var id = (l.getAttribute('href') || '').split('#')[1];
      if (id) map[id] = l;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (l) { l.classList.remove(activeCls); });
          map[en.target.id].classList.add(activeCls);
        }
      });
    }, { rootMargin: '-22% 0px -65% 0px' });
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) io.observe(sec);
    });
  }
  spy('.toc a', 'active');
  spy('.nav a', 'cur');

  // 4. 代码块一键复制
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.querySelector(btn.getAttribute('data-copy'));
      if (!target) return;
      var text = target.innerText.trim();
      var markDone = function () {
        var old = btn.textContent;
        btn.classList.add('done');
        btn.textContent = '已复制 ✓';
        setTimeout(function () { btn.classList.remove('done'); btn.textContent = old; }, 1800);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(markDone);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); markDone(); } catch (e) {}
        ta.remove();
      }
    });
  });

  // 5. 高清图表 Lightbox 缩放查看器
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbCap = document.getElementById('lb-cap');
  var lbStage = document.getElementById('lb-stage');
  var lbZoomBtn = document.getElementById('lb-zoom');
  var lbCloseBtn = document.getElementById('lb-close');

  function openLightbox(src, alt, caption) {
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    if (lbCap) lbCap.textContent = caption || alt || '';
    if (lbStage) lbStage.classList.remove('zoomed');
    if (lbZoomBtn) lbZoomBtn.textContent = '放大 150%';
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.fig-frame').forEach(function (frame) {
    var open = function () {
      var img = frame.querySelector('img');
      if (!img) return;
      var figure = frame.closest('figure');
      var cap = figure ? figure.querySelector('figcaption') : null;
      openLightbox(img.src, img.alt, cap ? cap.innerText.trim() : '');
    };
    frame.addEventListener('click', open);
    frame.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  });

  if (lbZoomBtn && lbStage) {
    lbZoomBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var z = lbStage.classList.toggle('zoomed');
      lbZoomBtn.textContent = z ? '还原适配' : '放大 150%';
    });
  }
  if (lbCloseBtn) lbCloseBtn.addEventListener('click', closeLightbox);
  if (lb) {
    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lb && lb.classList.contains('open')) closeLightbox();
  });

  // 6. 专有名词实时检索
  var searchInput = document.getElementById('glossary-search');
  var items = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
  var countEl = document.getElementById('glossary-count');
  if (searchInput && items.length) {
    searchInput.addEventListener('input', function () {
      var q = searchInput.value.trim().toLowerCase();
      var shown = 0;
      items.forEach(function (it) {
        var hit = !q || it.textContent.toLowerCase().indexOf(q) !== -1;
        it.classList.toggle('hidden', !hit);
        if (hit) shown++;
      });
      if (countEl) countEl.textContent = shown + ' / ' + items.length;
    });
  }

  // 7. 回到顶部
  var topBtn = document.querySelector('.to-top');
  if (topBtn) {
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
