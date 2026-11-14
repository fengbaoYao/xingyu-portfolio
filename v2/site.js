/* ==========================================================================
   星宇 · 作品集 v2 — 约 130 行，无框架、无第三方请求
   1) 语言切换  2) 抽屉  3) 复制  4) 外链 CTA 状态  5) 主题
   ========================================================================== */
(function () {
  'use strict';

  var STORAGE_LANG = 'xingyu.lang';
  var STORAGE_THEME = 'xingyu.theme';

  /* ---------------------------------------------------------------- 1. 语言 */
  var TITLES = {
    zh: '星宇 — 做能落地的 AI 产品',
    en: 'Xingyu — AI products that ship'
  };

  function applyLang(lang) {
    var html = document.documentElement;
    html.lang = lang === 'en' ? 'en' : 'zh-CN';
    document.title = TITLES[lang] || TITLES.zh;

    // 语言切换按钮的双向标签
    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      btn.textContent = lang === 'en' ? '中' : 'EN';
      btn.setAttribute('aria-label', lang === 'en' ? '切换到中文' : 'Switch to English');
    });

    // 只在有 data-en 的页面处理（单语页无需切换）
    try { localStorage.setItem(STORAGE_LANG, lang); } catch (e) {}
  }

  function initLang() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_LANG); } catch (e) {}
    var initial = stored || (navigator.language || 'zh').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en';
    if (!stored) {
      // 默认中文；只有浏览器明确是英文环境且没有中文时切英文
      initial = (navigator.language || '').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'zh';
    }
    applyLang(stored || 'zh');

    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(document.documentElement.lang === 'en' ? 'zh' : 'en');
      });
    });
  }

  /* ---------------------------------------------------------------- 2. 抽屉 */
  function initDrawer() {
    var trigger = document.querySelector('[data-drawer-open]');
    var drawer = document.querySelector('[data-drawer]');
    var backdrop = document.querySelector('[data-backdrop]');
    if (!trigger || !drawer || !backdrop) return;

    var closeBtn = drawer.querySelector('[data-drawer-close]');
    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      drawer.setAttribute('data-open', 'true');
      backdrop.setAttribute('data-open', 'true');
      drawer.removeAttribute('inert');
      drawer.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      document.documentElement.style.overflow = 'hidden';
      (closeBtn || drawer).focus();
    }

    function close() {
      drawer.setAttribute('data-open', 'false');
      backdrop.setAttribute('data-open', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.setAttribute('inert', '');
      trigger.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    trigger.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (drawer.getAttribute('data-open') !== 'true') return;
      e.preventDefault();
      close();
    });

    // 焦点陷阱
    drawer.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = drawer.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ---------------------------------------------------------------- 3. 复制 */
  function initCopy() {
    document.querySelectorAll('[data-copy-target]').forEach(function (btn) {
      var status = document.querySelector('[data-copy-status]');
      var target = document.querySelector(btn.getAttribute('data-copy-target'));
      if (!target) return;
      var original = btn.textContent;

      function setStatus(msg, isError) {
        if (!status) return;
        status.textContent = msg;
        if (isError) status.setAttribute('data-error', 'true');
        else status.removeAttribute('data-error');
      }

      function done() {
        btn.textContent = btn.getAttribute('data-label-done') || '已复制';
        setStatus(btn.getAttribute('data-msg-done') || '已复制到剪贴板', false);
        setTimeout(function () { btn.textContent = original; setStatus('', false); }, 2600);
      }

      function fail() {
        btn.textContent = btn.getAttribute('data-label-fail') || '请手动选择';
        setStatus(btn.getAttribute('data-msg-fail') || '没有复制成功，请手动选择文字', true);
        var range = document.createRange();
        range.selectNodeContents(target);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }

      function legacy() {
        var ta = document.createElement('textarea');
        ta.value = target.textContent;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;left:-9999px';
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
        document.body.removeChild(ta);
        ok ? done() : fail();
      }

      btn.addEventListener('click', function () {
        var text = target.textContent.replace(/^\n/, '').replace(/\n$/, '');
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(done).catch(legacy);
        } else {
          legacy();
        }
      });
    });
  }

  /* ------------------------------------------------------- 4. 外链 CTA 状态 */
  function initExternalCta() {
    document.querySelectorAll('a[data-external]').forEach(function (a) {
      a.addEventListener('click', function () {
        if (a.getAttribute('aria-busy') === 'true') return;
        var label = a.getAttribute('data-busy-label') || '正在打开…';
        a.setAttribute('data-original', a.innerHTML);
        a.setAttribute('aria-busy', 'true');
        a.innerHTML = label;
        setTimeout(function () {
          a.removeAttribute('aria-busy');
          if (a.getAttribute('data-original')) a.innerHTML = a.getAttribute('data-original');
        }, 2600);
      });
    });
  }

  /* ---------------------------------------------------------------- 5. 主题 */
  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_THEME); } catch (e) {}
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');

    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var isDark = document.documentElement.classList.toggle('dark');
        try { localStorage.setItem(STORAGE_THEME, isDark ? 'dark' : 'light'); } catch (e) {}
        btn.textContent = isDark ? 'light' : 'dark';
      });
      btn.textContent = theme === 'dark' ? 'light' : 'dark';
    });
  }

  /* ---------------------------------------------------------------- 启动 */
  function boot() {
    initLang();
    initDrawer();
    initCopy();
    initExternalCta();
    initTheme();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
