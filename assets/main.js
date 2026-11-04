/* JSX 已预编译；原组件来源保留在下方。 */
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// UI 与动效来源：https://yangsir.net/app/main.jsx
// Main app — composes sections, owns theme + lang + tweaks + easter egg.

var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef;
var TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "moss",
  "motion": "full",
  "headingFont": "serif"
} /*EDITMODE-END*/;
var ACCENTS = {
  moss: "oklch(0.62 0.13 145)",
  brick: "oklch(0.60 0.16 35)",
  azure: "oklch(0.60 0.15 250)",
  mono: "oklch(0.50 0.01 250)"
};
function applyTheme(t) {
  var _window$matchMedia, _window;
  var root = document.documentElement;
  var wantsDark = t.theme === "dark" || t.theme === "system" && ((_window$matchMedia = (_window = window).matchMedia) === null || _window$matchMedia === void 0 ? void 0 : _window$matchMedia.call(_window, "(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", wantsDark);
  root.style.setProperty("--accent", ACCENTS[t.accent] || ACCENTS.moss);
  root.classList.remove("motion-reduced", "motion-off");
  if (t.motion === "reduced") root.classList.add("motion-reduced");
  if (t.motion === "off") root.classList.add("motion-off");
}
function getInitialLang() {
  try {
    var saved = localStorage.getItem("xingyu.lang");
    if (saved === "zh" || saved === "en") return saved;
  } catch (_unused) {}
  return "zh";
}
function App() {
  var _useTweaks = useTweaks(TWEAK_DEFAULTS),
    _useTweaks2 = _slicedToArray(_useTweaks, 2),
    tweaks = _useTweaks2[0],
    setTweak = _useTweaks2[1];
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    logoClicks = _useState2[0],
    setLogoClicks = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    eggOn = _useState4[0],
    setEggOn = _useState4[1];
  var _useState7 = useState(function () {
      var l = getInitialLang();
      // 必须在第一次 render 前就同步好 window.SITE，否则 sections 首次渲染读到旧值
      if (window.SITES) window.SITE = window.SITES[l];
      document.documentElement.lang = l;
      return l;
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    lang = _useState8[0],
    setLang = _useState8[1];

  // setLang 包装：先同步切换 window.SITE，再触发 React 重新 render（key 重 mount sections）
  var switchLang = function switchLang(next) {
    if (next === lang) return;
    if (window.SITES) window.SITE = window.SITES[next];
    document.documentElement.lang = next;
    try {
      localStorage.setItem("xingyu.lang", next);
    } catch (_unused2) {}
    setLang(next);
  };
  useEffect(function () {
    applyTheme(tweaks);
  }, [tweaks]);

  // global scroll progress
  useEffect(function () {
    var onScroll = function onScroll() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;

      h.style.setProperty("--p", String(p));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return function () {
      return window.removeEventListener("scroll", onScroll);
    };
  }, []);
  useEffect(function () {
    var _mq$addEventListener;
    if (tweaks.theme !== "system") return;
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var fn = function fn() {
      return applyTheme(tweaks);
    };
    (_mq$addEventListener = mq.addEventListener) === null || _mq$addEventListener === void 0 || _mq$addEventListener.call(mq, "change", fn);
    return function () {
      var _mq$removeEventListen;
      return (_mq$removeEventListen = mq.removeEventListener) === null || _mq$removeEventListen === void 0 ? void 0 : _mq$removeEventListen.call(mq, "change", fn);
    };
  }, [tweaks.theme]);

  // Konami easter egg
  useEffect(function () {
    var seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    var i = 0;
    var onKey = function onKey(e) {
      var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === seq[i]) {
        i++;
        if (i === seq.length) {
          triggerEgg();
          i = 0;
        }
      } else {
        i = k === seq[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return function () {
      return window.removeEventListener("keydown", onKey);
    };
  }, []);
  var cycleTheme = function cycleTheme() {
    var next = tweaks.theme === "light" ? "dark" : tweaks.theme === "dark" ? "system" : "light";
    setTweak("theme", next);
  };
  var toggleLang = function toggleLang() {
    return switchLang(lang === "zh" ? "en" : "zh");
  };
  function triggerEgg() {
    setEggOn(true);
    setTimeout(function () {
      return setEggOn(false);
    }, 2400);
  }
  function onLogoClick() {
    setLogoClicks(function (c) {
      var n = c + 1;
      if (n >= 5) {
        triggerEgg();
        return 0;
      }
      return n;
    });
    setTimeout(function () {
      return setLogoClicks(function (c) {
        return c > 0 ? c : 0;
      });
    }, 1500);
  }

  // 当前语言对应的 site（用于 Tweaks 面板 / 顶栏按钮 label）
  var site = window.SITES && window.SITES[lang] || window.SITE || {};
  var ui = site.ui || {};
  var btnStyle = {
    borderColor: "var(--hairline-strong)",
    color: "var(--fg)",
    background: "color-mix(in oklch, var(--bg) 70%, transparent)",
    backdropFilter: "blur(8px)"
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Cursor, null), /*#__PURE__*/React.createElement("div", {
    className: "scroll-bar"
  }), /*#__PURE__*/React.createElement("div", {
    className: "fixed top-4 right-4 z-50 flex items-center gap-2 font-mono text-[11px]"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: toggleLang,
    "data-cur": "link",
    "data-curlabel": "LANG",
    className: "px-3 py-2 rounded-sm border tabular",
    style: btnStyle,
    title: "toggle language"
  }, "[ ", lang === "zh" ? "中 / EN" : "EN / 中", " ]"), /*#__PURE__*/React.createElement("button", {
    onClick: cycleTheme,
    "data-cur": "link",
    "data-curlabel": "THEME",
    className: "px-3 py-2 rounded-sm border tabular",
    style: btnStyle,
    title: "cycle theme"
  }, "[ ", tweaks.theme === "system" ? "auto" : tweaks.theme, " ]")), /*#__PURE__*/React.createElement("main", {
    key: lang,
    className: "max-w-[1600px] mx-auto"
  }, /*#__PURE__*/React.createElement(Hero, {
    logoClicks: logoClicks,
    onLogoClick: onLogoClick
  }), /*#__PURE__*/React.createElement(Products, null), /*#__PURE__*/React.createElement(Writing, null), /*#__PURE__*/React.createElement(OpenSource, null), /*#__PURE__*/React.createElement(Services, null), /*#__PURE__*/React.createElement(Contact, null)), /*#__PURE__*/React.createElement(Toast, null), eggOn && /*#__PURE__*/React.createElement("div", {
    className: "ee-toast in font-mono"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "\u25CF"), " you found it. \u2014 keep building."), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: ui.tweaksTitle || "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Theme"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: ui.tweakMode || "Mode",
    value: tweaks.theme,
    options: [{
      value: "light",
      label: "light"
    }, {
      value: "dark",
      label: "dark"
    }, {
      value: "system",
      label: "auto"
    }],
    onChange: function onChange(v) {
      return setTweak("theme", v);
    }
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: ui.tweakAccent || "Accent",
    value: tweaks.accent,
    options: [{
      value: "moss",
      label: "moss"
    }, {
      value: "brick",
      label: "brick"
    }, {
      value: "azure",
      label: "azure"
    }, {
      value: "mono",
      label: "mono"
    }],
    onChange: function onChange(v) {
      return setTweak("accent", v);
    }
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Motion"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: ui.tweakAnimations || "Animations",
    value: tweaks.motion,
    options: [{
      value: "full",
      label: "full"
    }, {
      value: "reduced",
      label: "reduced"
    }, {
      value: "off",
      label: "off"
    }],
    onChange: function onChange(v) {
      return setTweak("motion", v);
    }
  })));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
