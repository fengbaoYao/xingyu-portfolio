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

    var pFrame = fig.querySelector('.portrait-frame');
    if (pFrame) {
      pFrame.addEventListener('click', function () {
        var cur = fig.getAttribute('data-view') === 'life' ? 'work' : 'life';
        setView(cur, true);
      });
    }

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

  // 12. 首页核心能力五维闭环图 + 点击触发流转与粒子动效 + 标签切换 + 展开全部
  var skillSection = document.getElementById('skills');
  if (skillSection) {
    var sArch = skillSection.querySelector('.skill-arch');
    var sCanvas = skillSection.querySelector('.arch-fx-canvas');
    var sLiveDot = skillSection.querySelector('.arch-live-dot');
    var sFeedbackArc = skillSection.querySelector('.arch-feedback-arc');
    var sBus = skillSection.querySelector('.arch-bus');
    var sArrows = Array.prototype.slice.call(skillSection.querySelectorAll('.arch-arrow[data-arrow-idx]'));
    var sTabs = Array.prototype.slice.call(skillSection.querySelectorAll('[data-skill-tab]'));
    var sPanels = Array.prototype.slice.call(skillSection.querySelectorAll('[data-skill-panel]'));
    var sArchNodes = Array.prototype.slice.call(skillSection.querySelectorAll('.skill-arch [data-skill-target]'));
    var sJumps = Array.prototype.slice.call(skillSection.querySelectorAll('.matrix-jump[data-skill-target]'));
    var sExpandBtn = skillSection.querySelector('[data-skill-expand]');
    var sToolbar = skillSection.querySelector('.skill-toolbar');
    var activeSkillId = '01';
    var allExpanded = false;
    var MAIN_ORDER = ['01', '02', '03', '05'];
    var PALETTE = ['#1b4d38', '#1f8a5b', '#4eb889', '#c79345'];

    var nodeById = {};
    sArchNodes.forEach(function (n) {
      nodeById[n.getAttribute('data-skill-target')] = n;
    });

    // ---- 轻量 Canvas 粒子与能量流轨迹引擎（仅在点击切换时运行，结束后自动停帧） ----
    var fxCtx = sCanvas && sCanvas.getContext ? sCanvas.getContext('2d') : null;
    var fxParticles = [];
    var fxRings = [];
    var fxComets = [];
    var fxRaf = 0;
    var fxLastTs = 0;
    var clearTimers = [];

    var scheduleClear = function (fn, ms) {
      var t = setTimeout(fn, ms);
      clearTimers.push(t);
    };

    var resetTransientClasses = function () {
      clearTimers.forEach(clearTimeout);
      clearTimers = [];
      if (sLiveDot) sLiveDot.classList.remove('is-pinging');
      if (sFeedbackArc) sFeedbackArc.classList.remove('is-flowing');
      if (sBus) sBus.classList.remove('is-flowing');
      sArrows.forEach(function (a) { a.classList.remove('is-flowing'); });
      sArchNodes.forEach(function (n) {
        n.classList.remove('is-arriving', 'is-passing');
      });
    };

    var syncCanvasSize = function () {
      if (!sCanvas || !sArch) return null;
      var rect = sArch.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.round(rect.width * dpr);
      var h = Math.round(rect.height * dpr);
      if (sCanvas.width !== w || sCanvas.height !== h) {
        sCanvas.width = w;
        sCanvas.height = h;
      }
      if (fxCtx) fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return rect;
    };

    var getNodePoint = function (node, baseRect, preferIcon) {
      var target = (preferIcon && node.querySelector('.arch-ico')) || node;
      var r = target.getBoundingClientRect();
      return {
        x: r.left - baseRect.left + r.width / 2,
        y: r.top - baseRect.top + r.height / 2
      };
    };

    var spawnParticle = function (x, y, vx, vy, size, life, color) {
      fxParticles.push({
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        size: size,
        life: life,
        maxLife: life,
        color: color || PALETTE[Math.floor(Math.random() * PALETTE.length)]
      });
    };

    var spawnBurst = function (x, y, count, maxSpeed) {
      for (var i = 0; i < count; i++) {
        var ang = (Math.PI * 2 * i) / count + (Math.random() * 0.45 - 0.225);
        var spd = (maxSpeed || 95) * (0.45 + Math.random() * 0.7);
        spawnParticle(
          x, y,
          Math.cos(ang) * spd,
          Math.sin(ang) * spd,
          1.6 + Math.random() * 2.1,
          0.38 + Math.random() * 0.34,
          PALETTE[i % PALETTE.length]
        );
      }
      fxRings.push({ x: x, y: y, r: 8, maxR: 38, life: 0.46, maxLife: 0.46 });
    };

    var samplePolyline = function (pts, t) {
      if (pts.length === 1) return pts[0];
      var segs = [];
      var total = 0;
      for (var i = 0; i < pts.length - 1; i++) {
        var dx = pts[i + 1].x - pts[i].x;
        var dy = pts[i + 1].y - pts[i].y;
        var len = Math.hypot(dx, dy) || 1;
        segs.push({ a: pts[i], b: pts[i + 1], len: len });
        total += len;
      }
      var targetDist = Math.max(0, Math.min(1, t)) * total;
      var acc = 0;
      for (var j = 0; j < segs.length; j++) {
        var s = segs[j];
        if (acc + s.len >= targetDist || j === segs.length - 1) {
          var localT = (targetDist - acc) / s.len;
          return {
            x: s.a.x + (s.b.x - s.a.x) * localT,
            y: s.a.y + (s.b.y - s.a.y) * localT
          };
        }
        acc += s.len;
      }
      return pts[pts.length - 1];
    };

    var sampleCubic = function (p0, p1, p2, p3, t) {
      var u = 1 - t;
      return {
        x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
        y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y
      };
    };

    var easeInOutCubic = function (t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    var stepFx = function (ts) {
      if (!fxCtx || !sCanvas) return;
      if (!fxLastTs) fxLastTs = ts;
      var dt = Math.min(0.05, (ts - fxLastTs) / 1000);
      fxLastTs = ts;

      var rect = sArch.getBoundingClientRect();
      fxCtx.clearRect(0, 0, rect.width, rect.height);

      // 更新彗星能量包并沿途播撒微粒子
      for (var i = fxComets.length - 1; i >= 0; i--) {
        var c = fxComets[i];
        c.elapsed += dt;
        var rawT = Math.min(1, c.elapsed / c.duration);
        var eT = easeInOutCubic(rawT);
        var pos = c.sampler(eT);
        c.trail.push(pos);
        if (c.trail.length > 16) c.trail.shift();

        // 尾迹粒子
        var emitCount = c.trailDensity || 2;
        for (var k = 0; k < emitCount; k++) {
          if (Math.random() < 0.78) {
            spawnParticle(
              pos.x + (Math.random() * 6 - 3),
              pos.y + (Math.random() * 6 - 3),
              (Math.random() * 36 - 18),
              (Math.random() * 36 - 18) - 8,
              1.3 + Math.random() * 1.8,
              0.30 + Math.random() * 0.28,
              PALETTE[Math.floor(Math.random() * PALETTE.length)]
            );
          }
        }

        // 绘制拖尾光带
        if (c.trail.length > 1) {
          for (var j = 1; j < c.trail.length; j++) {
            var frac = j / c.trail.length;
            fxCtx.beginPath();
            fxCtx.moveTo(c.trail[j - 1].x, c.trail[j - 1].y);
            fxCtx.lineTo(c.trail[j].x, c.trail[j].y);
            fxCtx.strokeStyle = 'rgba(31, 138, 91, ' + (frac * 0.55).toFixed(3) + ')';
            fxCtx.lineWidth = 1.4 + frac * 2.6;
            fxCtx.lineCap = 'round';
            fxCtx.stroke();
          }
        }

        // 彗星头部光晕
        var grad = fxCtx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 13);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        grad.addColorStop(0.35, 'rgba(78, 184, 137, 0.85)');
        grad.addColorStop(1, 'rgba(27, 77, 56, 0)');
        fxCtx.fillStyle = grad;
        fxCtx.beginPath();
        fxCtx.arc(pos.x, pos.y, 13, 0, Math.PI * 2);
        fxCtx.fill();

        if (rawT >= 1) {
          if (c.onArrive) c.onArrive(pos);
          fxComets.splice(i, 1);
        }
      }

      // 更新粒子
      for (var p = fxParticles.length - 1; p >= 0; p--) {
        var pt = fxParticles[p];
        pt.life -= dt;
        if (pt.life <= 0) {
          fxParticles.splice(p, 1);
          continue;
        }
        pt.vx *= 0.93;
        pt.vy *= 0.93;
        pt.x += pt.vx * dt;
        pt.y += pt.vy * dt;
        var alpha = Math.max(0, pt.life / pt.maxLife);
        fxCtx.globalAlpha = alpha * 0.9;
        fxCtx.fillStyle = pt.color;
        fxCtx.beginPath();
        fxCtx.arc(pt.x, pt.y, pt.size * (0.45 + 0.55 * alpha), 0, Math.PI * 2);
        fxCtx.fill();
      }
      fxCtx.globalAlpha = 1;

      // 更新到达扩散环
      for (var r = fxRings.length - 1; r >= 0; r--) {
        var rg = fxRings[r];
        rg.life -= dt;
        if (rg.life <= 0) {
          fxRings.splice(r, 1);
          continue;
        }
        var prog = 1 - rg.life / rg.maxLife;
        var curR = rg.r + (rg.maxR - rg.r) * (1 - Math.pow(1 - prog, 2));
        fxCtx.strokeStyle = 'rgba(31, 138, 91, ' + ((1 - prog) * 0.52).toFixed(3) + ')';
        fxCtx.lineWidth = 1.6 * (1 - prog * 0.5);
        fxCtx.beginPath();
        fxCtx.arc(rg.x, rg.y, curR, 0, Math.PI * 2);
        fxCtx.stroke();
      }

      if (fxComets.length || fxParticles.length || fxRings.length) {
        fxRaf = requestAnimationFrame(stepFx);
      } else {
        fxRaf = 0;
        fxLastTs = 0;
        fxCtx.clearRect(0, 0, rect.width, rect.height);
      }
    };

    var ensureFxLoop = function () {
      if (!fxRaf && fxCtx) {
        fxLastTs = 0;
        fxRaf = requestAnimationFrame(stepFx);
      }
    };

    var triggerTransitionFx = function (fromId, toId) {
      if (reduceMotion) return;
      resetTransientClasses();

      // 强制 reflow 以重放一次性的 CSS 脉冲动画
      void sArch.offsetWidth;
      if (sLiveDot) {
        sLiveDot.classList.add('is-pinging');
        scheduleClear(function () { sLiveDot.classList.remove('is-pinging'); }, 720);
      }

      var baseRect = syncCanvasSize();
      if (!baseRect || !fxCtx) return;

      var toNode = nodeById[toId];
      var fromNode = nodeById[fromId];

      // 切到一表总览：全链路星散巡检波
      if (toId === 'matrix') {
        var srcPt = fromNode ? getNodePoint(fromNode, baseRect, true) : { x: baseRect.width / 2, y: baseRect.height / 2 };
        spawnBurst(srcPt.x, srcPt.y, 12, 85);
        sArchNodes.forEach(function (n, idx) {
          var dst = getNodePoint(n, baseRect, true);
          fxComets.push({
            elapsed: -idx * 0.04,
            duration: 0.44,
            trail: [],
            trailDensity: 1,
            sampler: function (t) {
              var clamped = Math.max(0, t);
              return {
                x: srcPt.x + (dst.x - srcPt.x) * clamped,
                y: srcPt.y + (dst.y - srcPt.y) * clamped - Math.sin(clamped * Math.PI) * 18
              };
            },
            onArrive: function (pos) {
              spawnBurst(pos.x, pos.y, 8, 60);
              n.classList.add('is-passing');
              scheduleClear(function () { n.classList.remove('is-passing'); }, 340);
            }
          });
        });
        ensureFxLoop();
        return;
      }

      if (!toNode) return;
      var toPt = getNodePoint(toNode, baseRect, true);

      // 原地再点同一节点：局部脉冲 + 粒子环
      if (!fromNode || fromId === toId) {
        spawnBurst(toPt.x, toPt.y, 14, 78);
        toNode.classList.add('is-arriving');
        scheduleClear(function () { toNode.classList.remove('is-arriving'); }, 660);
        ensureFxLoop();
        return;
      }

      var fromPt = getNodePoint(fromNode, baseRect, true);
      var fromIdx = MAIN_ORDER.indexOf(fromId);
      var toIdx = MAIN_ORDER.indexOf(toId);
      var sampler = null;
      var duration = 0.52;

      spawnBurst(fromPt.x, fromPt.y, 8, 56);

      // 情形 1：往返涉及 04（支撑底座总线）—— 严格贴合下方 T 型支撑总线走线
      if (fromId === '04' || toId === '04') {
        if (sBus) {
          sBus.classList.add('is-flowing');
          scheduleClear(function () { sBus.classList.remove('is-flowing'); }, 740);
        }
        var busRect = sBus ? sBus.getBoundingClientRect() : null;
        if (busRect && busRect.height) {
          var busY = busRect.top - baseRect.top + busRect.height * 0.5;
          var busCenterX = busRect.left - baseRect.left + busRect.width * 0.5;
          if (toId === '04') {
            var fromCol = getNodePoint(fromNode, baseRect, false);
            var startEdge = { x: fromCol.x, y: fromNode.getBoundingClientRect().bottom - baseRect.top };
            var dropEnd = { x: busCenterX, y: toNode.getBoundingClientRect().top - baseRect.top + 8 };
            sampler = function (t) {
              return samplePolyline([startEdge, { x: fromCol.x, y: busY }, { x: busCenterX, y: busY }, dropEnd, toPt], t);
            };
          } else {
            var toCol = getNodePoint(toNode, baseRect, false);
            var liftStart = { x: busCenterX, y: fromNode.getBoundingClientRect().top - baseRect.top };
            var endEdge = { x: toCol.x, y: toNode.getBoundingClientRect().bottom - baseRect.top - 8 };
            sampler = function (t) {
              return samplePolyline([fromPt, liftStart, { x: busCenterX, y: busY }, { x: toCol.x, y: busY }, endEdge, toPt], t);
            };
          }
        } else {
          sampler = function (t) { return samplePolyline([fromPt, toPt], t); };
        }
        duration = 0.56;
      }
      // 情形 2：主链路向后回流（例如 05 → 01 或 03 → 01），走上方闭环回流弧线
      else if (fromIdx !== -1 && toIdx !== -1 && toIdx < fromIdx) {
        if (sFeedbackArc) {
          sFeedbackArc.classList.add('is-flowing');
          scheduleClear(function () { sFeedbackArc.classList.remove('is-flowing'); }, 880);
        }
        var arcTopY = sFeedbackArc && sFeedbackArc.getBoundingClientRect().height
          ? (sFeedbackArc.getBoundingClientRect().top - baseRect.top + 8)
          : Math.max(12, Math.min(fromPt.y, toPt.y) - 62);
        var ctrl1 = { x: fromPt.x, y: arcTopY };
        var ctrl2 = { x: toPt.x, y: arcTopY };
        sampler = function (t) { return sampleCubic(fromPt, ctrl1, ctrl2, toPt, t); };
        duration = 0.62;
      }
      // 情形 3：主链路顺向流转（例如 01 → 02 / 01 → 05），沿箭头中轴穿过并汇入目标图标
      else if (fromIdx !== -1 && toIdx !== -1 && toIdx > fromIdx) {
        var waypoints = [fromPt];
        for (var step = fromIdx; step < toIdx; step++) {
          var arrEl = sArrows[step];
          var nextNode = nodeById[MAIN_ORDER[step + 1]];
          if (arrEl && arrEl.getBoundingClientRect().width) {
            var arrPt = getNodePoint(arrEl, baseRect, false);
            waypoints.push(arrPt);
          } else if (nextNode) {
            waypoints.push(getNodePoint(nextNode, baseRect, true));
          }
        }
        if (waypoints[waypoints.length - 1] !== toPt) waypoints.push(toPt);

        for (var a = fromIdx; a < toIdx; a++) {
          (function (arrowEl, delay) {
            if (!arrowEl) return;
            scheduleClear(function () { arrowEl.classList.add('is-flowing'); }, delay);
            scheduleClear(function () { arrowEl.classList.remove('is-flowing'); }, delay + 560);
          })(sArrows[a], (a - fromIdx) * 110);
        }
        for (var mid = fromIdx + 1; mid < toIdx; mid++) {
          (function (midNode, delay) {
            if (!midNode) return;
            scheduleClear(function () { midNode.classList.add('is-passing'); }, delay);
            scheduleClear(function () { midNode.classList.remove('is-passing'); }, delay + 280);
          })(nodeById[MAIN_ORDER[mid]], Math.round((mid - fromIdx) / (toIdx - fromIdx) * 340));
        }
        sampler = function (t) { return samplePolyline(waypoints, t); };
        duration = 0.42 + (toIdx - fromIdx) * 0.08;
      } else {
        sampler = function (t) { return samplePolyline([fromPt, toPt], t); };
      }

      fxComets.push({
        elapsed: 0,
        duration: duration,
        trail: [],
        trailDensity: 2,
        sampler: sampler,
        onArrive: function (pos) {
          spawnBurst(pos.x, pos.y, 16, 96);
          toNode.classList.add('is-arriving');
          scheduleClear(function () { toNode.classList.remove('is-arriving'); }, 660);
        }
      });

      ensureFxLoop();
    };

    var animatePanelCards = function (panel) {
      if (reduceMotion || !panel || panel.hidden) return;
      panel.classList.remove('is-entering');
      void panel.offsetWidth;
      var items = panel.querySelectorAll('.skill-node, .skill-step, .skill-matrix-table tbody tr');
      for (var i = 0; i < items.length; i++) {
        items[i].style.setProperty('--stagger', Math.min(i * 42, 210) + 'ms');
      }
      panel.classList.add('is-entering');
    };

    var renderSkills = function (id, expandAll, withFx) {
      var prevId = activeSkillId;
      allExpanded = !!expandAll;
      if (id) activeSkillId = id;

      if (sArch) sArch.setAttribute('data-active-node', allExpanded ? 'all' : activeSkillId);

      if (sExpandBtn) {
        sExpandBtn.setAttribute('aria-pressed', String(allExpanded));
        sExpandBtn.textContent = allExpanded ? '收起为单维视图' : '展开全部 5 维';
      }

      sTabs.forEach(function (tab) {
        var tid = tab.getAttribute('data-skill-tab');
        var on = !allExpanded && tid === activeSkillId;
        tab.classList.toggle('is-active', on);
        tab.setAttribute('aria-selected', String(on));
      });

      sArchNodes.forEach(function (node) {
        var nid = node.getAttribute('data-skill-target');
        var on = allExpanded || (!allExpanded && nid === activeSkillId);
        node.classList.toggle('is-active', on);
        node.setAttribute('aria-pressed', String(on));
      });

      sPanels.forEach(function (panel) {
        var pid = panel.getAttribute('data-skill-panel');
        var show = allExpanded ? pid !== 'matrix' : pid === activeSkillId;
        var wasHidden = panel.hidden;
        panel.hidden = !show;
        if (show && (wasHidden || withFx)) {
          animatePanelCards(panel);
        }
      });

      if (withFx && !allExpanded) {
        triggerTransitionFx(prevId, activeSkillId);
      }
    };

    sTabs.forEach(function (tab, idx) {
      tab.addEventListener('click', function () {
        renderSkills(tab.getAttribute('data-skill-tab'), false, true);
      });
      tab.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault();
        var next = (idx + (e.key === 'ArrowRight' ? 1 : -1) + sTabs.length) % sTabs.length;
        sTabs[next].focus();
        renderSkills(sTabs[next].getAttribute('data-skill-tab'), false, true);
      });
    });

    sArchNodes.forEach(function (node) {
      node.addEventListener('click', function () {
        renderSkills(node.getAttribute('data-skill-target'), false, true);
      });
    });

    sJumps.forEach(function (btn) {
      btn.addEventListener('click', function () {
        renderSkills(btn.getAttribute('data-skill-target'), false, true);
        if (sArch) sArch.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
      });
    });

    if (sExpandBtn) {
      sExpandBtn.addEventListener('click', function () {
        if (allExpanded) renderSkills(activeSkillId === 'matrix' ? '01' : activeSkillId, false, true);
        else renderSkills(activeSkillId, true, false);
      });
    }

    renderSkills('01', false, false);
  }
})();
