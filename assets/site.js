/* 星宇作品集 · 统一轻量交互层 (v5) — 零外部依赖 */
(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. 清理冗余 ?lang 参数
  try {
    var u0 = new URL(location.href);
    if (u0.searchParams.has('lang')) {
      u0.searchParams.delete('lang');
      history.replaceState(null, '', u0.toString());
    }
  } catch (e) {}

  function announce(msg) {
    var live = document.getElementById('live-status');
    if (live) live.textContent = msg;
  }

  // 2. 顶部极细阅读进度条
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

  // 3. 顶部导航滚动态 + 移动端抽屉菜单
  var head = document.querySelector('.site-head');
  if (head) {
    var onScroll = function () { head.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('primary-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      if (open) {
        var firstLink = nav.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
      }
    });
  }

  // 4. 首页双态肖像切换
  var fig = document.querySelector('[data-portrait]');
  if (fig) {
    var pWork = fig.querySelector('.p-work');
    var pLife = fig.querySelector('.p-life');
    var pBtns = Array.prototype.slice.call(fig.querySelectorAll('[data-portrait-btn]'));
    var baseY = window.scrollY, switched = false, pending = false, intent = false, touchY = null;

    var setView = function (view, manual) {
      if (manual) switched = true;
      fig.setAttribute('data-view', view);
      if (pWork && pLife) {
        pWork.setAttribute('aria-hidden', view === 'life' ? 'true' : 'false');
        pLife.setAttribute('aria-hidden', view === 'life' ? 'false' : 'true');
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

    var trySwitch = function () {
      if (switched || pending) return;
      if (!intent) { baseY = window.scrollY; return; }
      if (window.scrollY <= baseY + 12) { baseY = Math.min(baseY, window.scrollY); return; }
      pending = true;
      window.removeEventListener('scroll', trySwitch);
      var ready = function () { switched = true; pending = false; setView('life', false); };
      if (pLife.complete && pLife.naturalWidth) ready();
      else pLife.addEventListener('load', ready, { once: true });
    };
    if (pWork && pLife) window.addEventListener('scroll', trySwitch, { passive: true });
  }

  // 5. 克制的滚动淡入
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
      if (el.getBoundingClientRect().top < window.innerHeight * 0.94) el.classList.add('in');
      else rio.observe(el);
    });
  }

  // 6. Scroll Spy（主导航 & 案例目录）
  function spy(selector, cls) {
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
          links.forEach(function (l) { l.classList.remove(cls); });
          map[en.target.id].classList.add(cls);
        }
      });
    }, { rootMargin: '-24% 0px -64% 0px' });
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) io.observe(sec);
    });
  }
  spy('#primary-nav a', 'cur');
  spy('.toc a', 'active');

  // 7. 一键复制（代码 & 提示词）
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.querySelector(btn.getAttribute('data-copy'));
      var text = target ? target.innerText.trim() : '';
      if (!text) return;
      var done = function () {
        var old = btn.textContent;
        btn.classList.add('done');
        btn.textContent = '已复制 ✓';
        announce('已复制到剪贴板');
        setTimeout(function () { btn.classList.remove('done'); btn.textContent = old; }, 1800);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        ta.remove();
      }
    });
  });

  // 8. 通用高清图表 Lightbox
  var zoomFrames = document.querySelectorAll('.fig-zoom');
  if (zoomFrames.length) {
    var lb = document.getElementById('lightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'lightbox';
      lb.className = 'lightbox';
      lb.setAttribute('aria-hidden', 'true');
      lb.setAttribute('role', 'dialog');
      lb.setAttribute('aria-label', '原图查看器');
      lb.innerHTML =
        '<div class="lightbox-bar">' +
          '<span id="lb-cap" class="lightbox-cap"></span>' +
          '<div class="lightbox-actions">' +
            '<button id="lb-zoom" class="lb-btn" type="button">放大 150%</button>' +
            '<button id="lb-close" class="lb-btn" type="button">关闭 (ESC)</button>' +
          '</div>' +
        '</div>' +
        '<div id="lb-stage" class="lightbox-stage"><img id="lb-img" alt=""></div>';
      document.body.appendChild(lb);
    }
    var lbImg = document.getElementById('lb-img');
    var lbCap = document.getElementById('lb-cap');
    var lbStage = document.getElementById('lb-stage');
    var lbZoom = document.getElementById('lb-zoom');
    var lbClose = document.getElementById('lb-close');

    var closeLb = function () {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lbImg.removeAttribute('src');
    };
    var openLb = function (src, alt, cap) {
      lbImg.src = src;
      lbImg.alt = alt || '';
      lbCap.textContent = cap || alt || '';
      lbStage.classList.remove('zoomed');
      lbZoom.textContent = '放大 150%';
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    zoomFrames.forEach(function (frame) {
      var trigger = function () {
        var img = frame.querySelector('img');
        if (!img) return;
        var figEl = frame.closest('figure');
        var capEl = figEl ? figEl.querySelector('figcaption') : null;
        openLb(img.currentSrc || img.src, img.alt, capEl ? capEl.innerText.trim() : '');
      };
      frame.addEventListener('click', trigger);
      frame.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
      });
    });

    lbZoom.addEventListener('click', function (e) {
      e.stopPropagation();
      var z = lbStage.classList.toggle('zoomed');
      lbZoom.textContent = z ? '还原适配' : '放大 150%';
    });
    lbClose.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target === lbStage) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('open')) closeLb();
    });
  }

  // 9. 专有名词实时过滤（rstack）
  var gSearch = document.getElementById('glossary-search');
  var gItems = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
  var gCount = document.getElementById('glossary-count');
  if (gSearch && gItems.length) {
    gSearch.addEventListener('input', function () {
      var q = gSearch.value.trim().toLowerCase();
      var shown = 0;
      gItems.forEach(function (it) {
        var hit = !q || it.textContent.toLowerCase().indexOf(q) !== -1;
        it.classList.toggle('hidden', !hit);
        if (hit) shown++;
      });
      if (gCount) gCount.textContent = shown + ' / ' + gItems.length;
    });
  }

  // 10. 回到顶部 & 年份
  document.querySelectorAll('.to-top').forEach(function (b) {
    b.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });
  document.querySelectorAll('[data-year]').forEach(function (n) {
    n.textContent = String(new Date().getFullYear());
  });

  // 11. FinSearch-X 自动跳转与来源提示
  var redirect = document.querySelector('[data-redirect]');
  if (redirect && !reduceMotion) {
    var timer = setTimeout(function () {
      location.href = redirect.getAttribute('data-redirect') + '?from=finsearch-x#evolution';
    }, 5000);
    var stayBtn = document.getElementById('stay');
    if (stayBtn) {
      stayBtn.addEventListener('click', function () {
        clearTimeout(timer);
        stayBtn.disabled = true;
        var p = document.querySelector('.progress');
        if (p) p.style.visibility = 'hidden';
      });
    }
  }
  if (new URLSearchParams(location.search).get('from') === 'finsearch-x') {
    var note = document.getElementById('from-fsx');
    if (note) note.hidden = false;
  }
})();
