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

  // 12. 首页核心能力五维闭环图 + 一表总览粒子巡检特效 + 标签切换 + 展开全部
  var skillSection = document.getElementById('skills');
  if (skillSection) {
    var sArch = skillSection.querySelector('.skill-arch');
    var sCanvas = skillSection.querySelector('.arch-fx-canvas');
    var sLiveDot = skillSection.querySelector('.arch-live-dot');
    var sTabs = Array.prototype.slice.call(skillSection.querySelectorAll('[data-skill-tab]'));
    var sPanels = Array.prototype.slice.call(skillSection.querySelectorAll('[data-skill-panel]'));
    var sArchNodes = Array.prototype.slice.call(skillSection.querySelectorAll('.skill-arch [data-skill-target]'));
    var sJumps = Array.prototype.slice.call(skillSection.querySelectorAll('.matrix-jump[data-skill-target]'));
    var sExpandBtn = skillSection.querySelector('[data-skill-expand]');
    var activeSkillId = '01';
    var allExpanded = false;
    var PALETTE = ['#1b4d38', '#1f8a5b', '#4eb889', '#c79345'];

    var nodeById = {};
    sArchNodes.forEach(function (n) {
      nodeById[n.getAttribute('data-skill-target')] = n;
    });

    // ---- 轻量 Canvas 巡检特效引擎（仅在切换至「一表总览」时运行，结束后自动停帧） ----
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

    var stopAllFx = function () {
      clearTimers.forEach(clearTimeout);
      clearTimers = [];
      fxParticles = [];
      fxRings = [];
      fxComets = [];
      if (fxRaf) {
        cancelAnimationFrame(fxRaf);
        fxRaf = 0;
      }
      fxLastTs = 0;
      if (fxCtx && sCanvas && sArch) {
        var r = sArch.getBoundingClientRect();
        fxCtx.clearRect(0, 0, r.width, r.height);
      }
      if (sLiveDot) sLiveDot.classList.remove('is-pinging');
      sArchNodes.forEach(function (n) {
        n.classList.remove('is-passing');
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

      for (var i = fxComets.length - 1; i >= 0; i--) {
        var c = fxComets[i];
        c.elapsed += dt;
        var rawT = Math.min(1, c.elapsed / c.duration);
        var eT = easeInOutCubic(rawT);
        var pos = c.sampler(eT);
        c.trail.push(pos);
        if (c.trail.length > 14) c.trail.shift();

        if (rawT >= 0 && Math.random() < 0.72) {
          spawnParticle(
            pos.x + (Math.random() * 6 - 3),
            pos.y + (Math.random() * 6 - 3),
            (Math.random() * 32 - 16),
            (Math.random() * 32 - 16) - 6,
            1.3 + Math.random() * 1.7,
            0.28 + Math.random() * 0.25,
            PALETTE[Math.floor(Math.random() * PALETTE.length)]
          );
        }

        if (c.trail.length > 1) {
          for (var j = 1; j < c.trail.length; j++) {
            var frac = j / c.trail.length;
            fxCtx.beginPath();
            fxCtx.moveTo(c.trail[j - 1].x, c.trail[j - 1].y);
            fxCtx.lineTo(c.trail[j].x, c.trail[j].y);
            fxCtx.strokeStyle = 'rgba(31, 138, 91, ' + (frac * 0.5).toFixed(3) + ')';
            fxCtx.lineWidth = 1.3 + frac * 2.2;
            fxCtx.lineCap = 'round';
            fxCtx.stroke();
          }
        }

        if (rawT >= 0) {
          var grad = fxCtx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 11);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
          grad.addColorStop(0.35, 'rgba(78, 184, 137, 0.85)');
          grad.addColorStop(1, 'rgba(27, 77, 56, 0)');
          fxCtx.fillStyle = grad;
          fxCtx.beginPath();
          fxCtx.arc(pos.x, pos.y, 11, 0, Math.PI * 2);
          fxCtx.fill();
        }

        if (rawT >= 1) {
          if (c.onArrive) c.onArrive(pos);
          fxComets.splice(i, 1);
        }
      }

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

    var triggerMatrixFx = function (fromId) {
      if (reduceMotion) return;
      stopAllFx();

      void sArch.offsetWidth;
      if (sLiveDot) {
        sLiveDot.classList.add('is-pinging');
        scheduleClear(function () { sLiveDot.classList.remove('is-pinging'); }, 720);
      }

      var baseRect = syncCanvasSize();
      if (!baseRect || !fxCtx) return;

      var fromNode = nodeById[fromId];
      var srcPt = fromNode ? getNodePoint(fromNode, baseRect, true) : { x: baseRect.width / 2, y: baseRect.height / 2 };
      spawnBurst(srcPt.x, srcPt.y, 12, 85);

      sArchNodes.forEach(function (n, idx) {
        var dst = getNodePoint(n, baseRect, true);
        fxComets.push({
          elapsed: -idx * 0.04,
          duration: 0.44,
          trail: [],
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

      fxLastTs = 0;
      fxRaf = requestAnimationFrame(stepFx);
    };

    var animateMatrixRows = function (panel) {
      if (reduceMotion || !panel || panel.hidden) return;
      panel.classList.remove('is-entering');
      void panel.offsetWidth;
      var rows = panel.querySelectorAll('.skill-matrix-table tbody tr');
      for (var i = 0; i < rows.length; i++) {
        rows[i].style.setProperty('--stagger', Math.min(i * 42, 210) + 'ms');
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
        panel.hidden = !show;
        if (show && pid === 'matrix') {
          animateMatrixRows(panel);
        }
      });

      if (withFx && !allExpanded && activeSkillId === 'matrix') {
        triggerMatrixFx(prevId);
      } else {
        stopAllFx();
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
