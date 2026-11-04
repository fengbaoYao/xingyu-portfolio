/* JSX 已预编译；原组件来源保留在下方。 */
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["children", "delay", "as", "className"],
  _excluded2 = ["children", "className", "style", "delay", "stagger"],
  _excluded3 = ["children", "href", "className", "strength"];
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// UI 与动效来源：https://yangsir.net/app/sections.jsx
// Section components.

var _React = React,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useState = _React.useState;

// ── 全局: 复制微信号 + 尝试打开微信 + 触发 toast ───────────────────────────
window.copyWeChat = function copyWeChat() {
  var id = window.SITE && window.SITE.contact && window.SITE.contact.wechat || "alwaysraiseuplikesun";
  var lang = window.SITE && window.SITE.lang || "zh";
  var msg = lang === "zh" ? "\u5FAE\u4FE1\u53F7\u5DF2\u590D\u5236\uFF1A".concat(id, "\u3000\u53BB\u5FAE\u4FE1\u7C98\u8D34\u641C\u7D22") : "WeChat ID copied: ".concat(id, " \u2014 paste in WeChat search");
  // copy
  var writeAsync = navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(id)["catch"](function () {}) : Promise.resolve().then(function () {
    var ta = document.createElement("textarea");
    ta.value = id;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(ta);
  });
  writeAsync["finally"](function () {
    window.dispatchEvent(new CustomEvent("toast", {
      detail: {
        msg: msg
      }
    }));
    // 移动端尝试拉起微信，桌面端无 handler 会被静默忽略
    setTimeout(function () {
      try {
        window.location.href = "weixin://";
      } catch (e) {}
    }, 80);
  });
};

// ── PermalinkChip ─────────────────────────────────────────────────────────
// 悬停在节标题旁淡入 # 按钮，点击复制 https://yangsir.net/#<id> 到剪贴板
function PermalinkChip(_ref) {
  var id = _ref.id;
  var onClick = function onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window === "undefined") return;
    var url = window.location.href.split("#")[0] + "#" + id;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)["catch"](function () {});
    }
    try {
      history.replaceState(null, "", "#".concat(id));
    } catch (_) {}
    var lang = window.SITE && window.SITE.lang || "zh";
    var msg = lang === "zh" ? "\u94FE\u63A5\u5DF2\u590D\u5236\uFF1A".concat(url) : "Link copied: ".concat(url);
    window.dispatchEvent(new CustomEvent("toast", {
      detail: {
        msg: msg
      }
    }));
  };
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    className: "permalink-chip",
    "data-cur": "link",
    "data-curlabel": "COPY LINK",
    "aria-label": "Copy link to #".concat(id)
  }, "#");
}

// ── Toast ─────────────────────────────────────────────────────────────────
function Toast() {
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    msg = _useState2[0],
    setMsg = _useState2[1];
  useEffect(function () {
    var timer;
    var onToast = function onToast(e) {
      setMsg(e.detail && e.detail.msg);
      clearTimeout(timer);
      timer = setTimeout(function () {
        return setMsg(null);
      }, 2400);
    };
    window.addEventListener("toast", onToast);
    return function () {
      window.removeEventListener("toast", onToast);
      clearTimeout(timer);
    };
  }, []);
  if (!msg) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed left-1/2 bottom-8 -translate-x-1/2 px-4 py-2 rounded-sm font-mono text-[12px] shadow-lg",
    style: {
      background: "var(--fg)",
      color: "var(--bg)",
      zIndex: 10000,
      letterSpacing: "0.02em"
    },
    role: "status",
    "aria-live": "polite"
  }, msg);
}

// ── helpers ────────────────────────────────────────────────────────────────

// Reveal-on-scroll
function Reveal(_ref2) {
  var children = _ref2.children,
    _ref2$delay = _ref2.delay,
    delay = _ref2$delay === void 0 ? 0 : _ref2$delay,
    _ref2$as = _ref2.as,
    As = _ref2$as === void 0 ? "div" : _ref2$as,
    _ref2$className = _ref2.className,
    className = _ref2$className === void 0 ? "" : _ref2$className,
    rest = _objectWithoutProperties(_ref2, _excluded);
  var ref = useRef(null);
  useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          setTimeout(function () {
            return el.classList.add("in");
          }, delay);
          io.unobserve(el);
        }
      });
    }, {
      threshold: 0.15
    });
    io.observe(el);
    return function () {
      return io.disconnect();
    };
  }, [delay]);
  return /*#__PURE__*/React.createElement(As, _extends({
    ref: ref,
    className: "reveal ".concat(className)
  }, rest), children);
}

// Split-text reveal: each word is masked + slid up. Words can be split across lines.
function SplitText(_ref3) {
  var children = _ref3.children,
    _ref3$className = _ref3.className,
    className = _ref3$className === void 0 ? "" : _ref3$className,
    style = _ref3.style,
    _ref3$delay = _ref3.delay,
    delay = _ref3$delay === void 0 ? 0 : _ref3$delay,
    _ref3$stagger = _ref3.stagger,
    stagger = _ref3$stagger === void 0 ? 60 : _ref3$stagger,
    rest = _objectWithoutProperties(_ref3, _excluded2);
  var wrapRef = useRef(null);
  useEffect(function () {
    var el = wrapRef.current;
    if (!el) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var words = el.querySelectorAll(".split-line");
          words.forEach(function (w, i) {
            return setTimeout(function () {
              return w.classList.add("in");
            }, delay + i * stagger);
          });
          io.unobserve(el);
        }
      });
    }, {
      threshold: 0.2
    });
    io.observe(el);
    return function () {
      return io.disconnect();
    };
  }, [delay, stagger]);

  // accept string or array of strings (lines)
  var renderText = function renderText(text) {
    var words = String(text).split(/(\s+)/);
    return words.map(function (w, i) {
      return /^\s+$/.test(w) ? /*#__PURE__*/React.createElement("span", {
        key: i
      }, w) : /*#__PURE__*/React.createElement("span", {
        key: i,
        className: "split-line"
      }, /*#__PURE__*/React.createElement("span", null, w));
    });
  };
  var isBlock = /\bblock\b/.test(className);
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: wrapRef,
    className: className,
    style: _objectSpread({
      display: isBlock ? "block" : "inline-block"
    }, style)
  }, rest), Array.isArray(children) ? children.map(function (line, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        display: "block"
      }
    }, renderText(line));
  }) : renderText(children));
}

// Magnetic button
function MagnetButton(_ref4) {
  var children = _ref4.children,
    _ref4$href = _ref4.href,
    href = _ref4$href === void 0 ? "#" : _ref4$href,
    _ref4$className = _ref4.className,
    className = _ref4$className === void 0 ? "" : _ref4$className,
    _ref4$strength = _ref4.strength,
    strength = _ref4$strength === void 0 ? 0.35 : _ref4$strength,
    rest = _objectWithoutProperties(_ref4, _excluded3);
  var ref = useRef(null);
  var inner = useRef(null);
  var onMove = function onMove(e) {
    var el = ref.current;
    var i = inner.current;
    if (!el || !i) return;
    var r = el.getBoundingClientRect();
    var x = e.clientX - r.left - r.width / 2;
    var y = e.clientY - r.top - r.height / 2;
    el.style.transform = "translate(".concat(x * strength, "px, ").concat(y * strength, "px)");
    i.style.transform = "translate(".concat(x * strength * 0.4, "px, ").concat(y * strength * 0.4, "px)");
  };
  var onLeave = function onLeave() {
    if (ref.current) ref.current.style.transform = "";
    if (inner.current) inner.current.style.transform = "";
  };
  return /*#__PURE__*/React.createElement("a", _extends({
    ref: ref,
    href: href,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: "magnet inline-flex items-center gap-2 ".concat(className),
    "data-cur": "link",
    "data-curlabel": "\u2192"
  }, rest), /*#__PURE__*/React.createElement("span", {
    ref: inner,
    className: "inline-flex items-center gap-2"
  }, children));
}

// Hero name with per-letter hover
function HoverName(_ref5) {
  var text = _ref5.text,
    _ref5$className = _ref5.className,
    className = _ref5$className === void 0 ? "" : _ref5$className,
    style = _ref5.style;
  return /*#__PURE__*/React.createElement("span", {
    className: "hov-name ".concat(className),
    style: style
  }, _toConsumableArray(text).map(function (ch, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      className: "hov-letter",
      style: {
        transitionDelay: "".concat(i * 8, "ms")
      }
    }, ch === " " ? "\xA0" : ch);
  }));
}

// ── Hero ───────────────────────────────────────────────────────────────────
// 将百分比隔离到独立组件，滚动时不再重绘整页。
function ScrollIndicator() {
  var state = useState(0), percent = state[0], setPercent = state[1];
  useEffect(function () {
    var last = -1;
    var update = function () {
      var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
      var next = max > 0 ? Math.round(Math.min(1, Math.max(0, h.scrollTop / max)) * 100) : 0;
      if (next !== last) { last = next; setPercent(next); }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return function () { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return React.createElement("span", {className: "tabular hidden md:inline-block", style: {color: "var(--muted)", minWidth: 38, textAlign: "right"}}, String(percent).padStart(3, "0"), "%");
}
function Hero(_ref6) {
  var logoClicks = _ref6.logoClicks,
    onLogoClick = _ref6.onLogoClick;
  var _useState3 = useState(["", "", ""]),
    _useState4 = _slicedToArray(_useState3, 2),
    typed = _useState4[0],
    setTyped = _useState4[1];
  var _useState5 = useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    portraitView = _useState6[0],
    setPortraitView = _useState6[1];
  var _useState7 = useState(function () {
      return typeof document !== "undefined" && document.documentElement.classList.contains("dark");
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    isDark = _useState8[0],
    setIsDark = _useState8[1];
  // 监听 .dark class 变化，明暗主题切换 → 切对应版本图
  useEffect(function () {
    var obs = new MutationObserver(function () {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return function () {
      return obs.disconnect();
    };
  }, []);
  var portraits = ["portfolio-assets/portrait-work-point-cloud-loose-v2.webp", "portfolio-assets/portrait-point-cloud-original-face-v6.webp"];
  // Prefetch suit portrait on idle / first hover so click swap is instant
  var suitPrefetchRef = useRef(false);
  var prefetchSuitPortrait = function prefetchSuitPortrait() {
    if (suitPrefetchRef.current || !portraits[1]) return;
    suitPrefetchRef.current = true;
    try {
      var link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = portraits[1];
      document.head.appendChild(link);
    } catch (e) {}
    try {
      var img = new Image();
      img.decoding = "async";
      img.src = portraits[1];
    } catch (e2) {}
  };
  useEffect(function () {
    var idleId = null;
    var timerId = null;
    if (typeof requestIdleCallback === "function") {
      idleId = requestIdleCallback(function () { prefetchSuitPortrait(); }, { timeout: 2500 });
    } else {
      timerId = setTimeout(prefetchSuitPortrait, 1200);
    }
    return function () {
      if (idleId != null && typeof cancelIdleCallback === "function") cancelIdleCallback(idleId);
      if (timerId != null) clearTimeout(timerId);
    };
  }, []);
  var togglePortrait = function togglePortrait() {
    return setPortraitView(function (v) {
      return (v + 1) % portraits.length;
    });
  };
  var portraitRef = useRef(null);
  var lastSwitchRef = useRef(0);
  var onPortraitMove = function onPortraitMove(e) {
    var fig = portraitRef.current;
    if (!fig) return;
    var img = fig.querySelector(".portrait-img");
    if (!img) return;
    var r = fig.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
    var y = (e.clientY - r.top) / r.height - 0.5;
    img.style.transform = "perspective(900px) rotateX(".concat(-y * 8, "deg) rotateY(").concat(x * 12, "deg) scale(1.02)");
    // 鼠标到边缘 (|x| > 0.42 或 |y| > 0.42)，自动切换图，600ms 防抖
    if (portraits.length > 1 && (Math.abs(x) > 0.42 || Math.abs(y) > 0.42) && Date.now() - lastSwitchRef.current > 700) {
      lastSwitchRef.current = Date.now();
      setPortraitView(function (v) {
        return (v + 1) % portraits.length;
      });
    }
  };
  var onPortraitLeave = function onPortraitLeave() {
    var fig = portraitRef.current;
    if (!fig) return;
    var img = fig.querySelector(".portrait-img");
    if (!img) return;
    img.style.transform = "";
  };
  var lines = window.SITE.status;
  useEffect(function () {
    var cancelled = false;
    var run = /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _loop, _ret, i;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _loop = /*#__PURE__*/_regenerator().m(function _loop(i) {
                var _lines$i, v, _loop2, _ret2, c;
                return _regenerator().w(function (_context2) {
                  while (1) switch (_context2.n) {
                    case 0:
                      _lines$i = _slicedToArray(lines[i], 2), v = _lines$i[1];
                      _loop2 = /*#__PURE__*/_regenerator().m(function _loop2(c) {
                        return _regenerator().w(function (_context) {
                          while (1) switch (_context.n) {
                            case 0:
                              if (!cancelled) {
                                _context.n = 1;
                                break;
                              }
                              return _context.a(2, {
                                v: {
                                  v: void 0
                                }
                              });
                            case 1:
                              _context.n = 2;
                              return new Promise(function (r) {
                                return setTimeout(r, 18);
                              });
                            case 2:
                              setTyped(function (t) {
                                var n = _toConsumableArray(t);
                                n[i] = v.slice(0, c);
                                return n;
                              });
                            case 3:
                              return _context.a(2);
                          }
                        }, _loop2);
                      });
                      c = 0;
                    case 1:
                      if (!(c <= v.length)) {
                        _context2.n = 4;
                        break;
                      }
                      return _context2.d(_regeneratorValues(_loop2(c)), 2);
                    case 2:
                      _ret2 = _context2.v;
                      if (!_ret2) {
                        _context2.n = 3;
                        break;
                      }
                      return _context2.a(2, _ret2.v);
                    case 3:
                      c++;
                      _context2.n = 1;
                      break;
                    case 4:
                      _context2.n = 5;
                      return new Promise(function (r) {
                        return setTimeout(r, 80);
                      });
                    case 5:
                      return _context2.a(2);
                  }
                }, _loop);
              });
              i = 0;
            case 1:
              if (!(i < lines.length)) {
                _context3.n = 4;
                break;
              }
              return _context3.d(_regeneratorValues(_loop(i)), 2);
            case 2:
              _ret = _context3.v;
              if (!_ret) {
                _context3.n = 3;
                break;
              }
              return _context3.a(2, _ret.v);
            case 3:
              i++;
              _context3.n = 1;
              break;
            case 4:
              return _context3.a(2);
          }
        }, _callee);
      }));
      return function run() {
        return _ref7.apply(this, arguments);
      };
    }();
    run();
    return function () {
      cancelled = true;
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "relative overflow-hidden px-6 md:px-12 lg:px-20 pt-12 md:pt-16 pb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex items-center justify-between font-mono text-[11px]",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onLogoClick,
    "data-cur": "link",
    "data-curlabel": "HEY",
    className: "flex items-center gap-2",
    style: {
      color: "var(--fg)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block w-1.5 h-1.5 rounded-full pulse",
    style: {
      background: "var(--accent)"
    }
  }), /*#__PURE__*/React.createElement("span", null, window.SITE.handle, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--muted)"
    }
  }, ".run")), logoClicks > 0 && logoClicks < 5 && /*#__PURE__*/React.createElement("span", {
    className: "opacity-50 ml-1"
  }, "\xB7", logoClicks)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-6"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "hidden md:flex items-center gap-6"
  }, (window.SITE.nav || []).map(function (_ref8) {
    var id = _ref8.id,
      label = _ref8.label;
    return /*#__PURE__*/React.createElement("a", {
      key: id,
      href: "#".concat(id),
      "data-cur": "link",
      "data-curlabel": (label || id).toString().toUpperCase(),
      className: "ul-link"
    }, label);
  })), /*#__PURE__*/React.createElement(ScrollIndicator, null))), /*#__PURE__*/React.createElement("div", {
    className: "mt-20 md:mt-28 grid grid-cols-12 gap-6 relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-span-12 md:col-span-4 lg:col-span-3 font-mono text-[11px] tabular relative",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hairline-b pb-2 mb-3 flex items-baseline justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "// status"), /*#__PURE__*/React.createElement("span", null, "v.2026")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5"
  }, lines.map(function (_ref9, i) {
    var _ref0 = _slicedToArray(_ref9, 1),
      k = _ref0[0];
    return /*#__PURE__*/React.createElement("div", {
      key: k,
      className: "flex"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 64,
        color: "var(--muted)"
      }
    }, k), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg)"
      }
    }, typed[i], i === typed.findIndex(function (t, idx) {
      return t.length < lines[idx][1].length;
    }) && /*#__PURE__*/React.createElement("span", {
      className: "caret"
    })));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "col-span-12 md:col-span-8 lg:col-span-9 grid grid-cols-12 gap-6 relative"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "col-span-12 lg:col-span-8 font-serif leading-[0.92] tracking-tight relative",
    style: {
      fontSize: "clamp(64px, 12vw, 184px)",
      letterSpacing: "-0.02em"
    },
    "data-cur": "text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "block"
  }, /*#__PURE__*/React.createElement(HoverName, {
    text: "Xing"
  })), /*#__PURE__*/React.createElement("span", {
    className: "block italic",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement(HoverName, {
    text: "yu"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "."))), /*#__PURE__*/React.createElement("figure", {
    ref: portraitRef,
    onMouseMove: onPortraitMove,
    onMouseLeave: onPortraitLeave,
    onMouseEnter: prefetchSuitPortrait,
    onTouchStart: prefetchSuitPortrait,
    className: "portrait-fig col-span-12 lg:col-span-4 lg:self-end relative",
    style: {
      width: "100%",
      aspectRatio: "1 / 1.15",
      perspective: "900px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: portraits[portraitView],
    alt: portraitView === 0 ? "星宇生活场景桌前肖像" : "星宇西装正装肖像",
    onClick: togglePortrait,
    role: "button",
    tabIndex: 0,
    "aria-label": portraitView === 0 ? "切换到西装正装" : "切换到生活场景桌前",
    onKeyDown: function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); togglePortrait(); } },
    "data-cur": "link",
    "data-curlabel": "CLICK",
    fetchPriority: "high",
    decoding: "async",
    className: "portrait-img block w-full h-full",
    style: {
      objectFit: "contain",
      cursor: "pointer",
      transformStyle: "preserve-3d",
      willChange: "transform",
      transition: "opacity .35s ease, transform .25s cubic-bezier(.2,.8,.2,1)"
    },
    key: "".concat(portraitView, "-").concat(isDark ? "d" : "l")
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-span-12 lg:col-span-8 max-w-2xl"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[15px] md:text-[17px] leading-[1.85]",
    style: {
      fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      color: "var(--fg)"
    },
    "data-cur": "text"
  }, window.SITE.tagline.prefix, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, window.SITE.tagline.role), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--muted)"
    }
  }, " \xA0|\xA0 "), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontStyle: "normal",
      letterSpacing: "0.01em"
    }
  }, window.SITE.tagline.skills))))));
}

// ── About ──────────────────────────────────────────────────────────────────
function About() {
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    className: "relative px-6 md:px-12 lg:px-20 py-24 md:py-36"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-12 gap-6 relative"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "col-span-12 md:col-span-3 font-mono text-[11px]",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hairline-b pb-2 mb-3 flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "01 / about"), /*#__PURE__*/React.createElement("span", null, "\u2014"))), /*#__PURE__*/React.createElement("div", {
    className: "col-span-12 md:col-span-8 lg:col-span-7 space-y-8"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "leading-[1.3]",
    style: {
      fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      fontWeight: 500,
      fontSize: "clamp(28px, 4vw, 44px)",
      color: "var(--fg)",
      letterSpacing: ".01em"
    },
    "data-cur": "text"
  }, "\u5B66\u8BBE\u8BA1\u7684 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "AI \u4EA7\u54C1\u7ECF\u7406"), "\u3002", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontStyle: "normal",
      fontWeight: 400,
      color: "var(--muted)",
      letterSpacing: "0.01em"
    }
  }, " Coding & Agent & Design."))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("p", {
    className: "leading-[1.85]",
    style: {
      fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      fontSize: "clamp(15px, 1.1vw, 17px)",
      color: "var(--fg)"
    },
    "data-cur": "text"
  }, window.SITE.about.one)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 220
  }, /*#__PURE__*/React.createElement("p", {
    className: "leading-[1.85]",
    style: {
      fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      fontSize: "clamp(15px, 1.1vw, 17px)",
      color: "var(--muted)"
    },
    "data-cur": "text"
  }, window.SITE.about.two)))));
}

// ── Now ────────────────────────────────────────────────────────────────────
function Now() {
  var _useState9 = useState(new Date()),
    _useState0 = _slicedToArray(_useState9, 2),
    now = _useState0[0],
    setNow = _useState0[1];
  var sectionRef = useRef(null);
  var _useState1 = useState(0),
    _useState10 = _slicedToArray(_useState1, 2),
    progress = _useState10[0],
    setProgress = _useState10[1];
  useEffect(function () {
    var i = setInterval(function () {
      return setNow(new Date());
    }, 60000);
    return function () {
      return clearInterval(i);
    };
  }, []);
  useEffect(function () {
    var onScroll = function onScroll() {
      var el = sectionRef.current;
      if (!el) return;
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight;
      var total = r.height + vh;
      var passed = Math.max(0, Math.min(total, vh - r.top));
      setProgress(passed / total);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return function () {
      return window.removeEventListener("scroll", onScroll);
    };
  }, []);
  var stamp = now.toISOString().slice(0, 16).replace("T", " ");
  var stateMap = {
    now: {
      dot: "●",
      text: "now",
      color: "var(--accent)"
    },
    cooking: {
      dot: "◐",
      text: "cooking",
      color: "var(--fg)"
    },
    paused: {
      dot: "○",
      text: "paused",
      color: "var(--muted)"
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    ref: sectionRef,
    id: "now",
    className: "relative px-6 md:px-12 lg:px-20 py-24 md:py-32 hairline-t"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute left-0 top-0 bottom-0 w-px hidden md:block",
    style: {
      background: "var(--hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "".concat(progress * 100, "%"),
      background: "var(--accent)",
      transition: "height .15s linear"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-12 gap-6 relative"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "col-span-12 md:col-span-3 font-mono text-[11px]",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hairline-b pb-2 mb-3 flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "02 / now"), /*#__PURE__*/React.createElement("span", {
    className: "tabular"
  }, stamp)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      fontSize: 14,
      lineHeight: 1.7,
      color: "var(--fg)"
    }
  }, "\u624B\u52A8\u66F4\u65B0\u3002\u6700\u8FD1\u5728\u505A\u7684\u3001\u5728\u60F3\u7684\u3001\u5728\u7B49\u7684\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 tabular text-[10px]",
    style: {
      color: "var(--muted)"
    }
  }, "section \xB7 ", String(Math.round(progress * 100)).padStart(3, "0"), "%")), /*#__PURE__*/React.createElement("div", {
    className: "col-span-12 md:col-span-9"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "font-mono text-[13px] md:text-[14px] divide-y",
    style: {
      borderColor: "var(--hairline)"
    }
  }, window.SITE.now.map(function (item, i) {
    var s = stateMap[item.state];
    return /*#__PURE__*/React.createElement(Reveal, {
      as: "li",
      delay: i * 70,
      key: i,
      className: "py-4 flex items-start gap-4",
      "data-cur": "text"
    }, /*#__PURE__*/React.createElement("span", {
      className: "tabular text-[11px] w-8",
      style: {
        color: "var(--muted)"
      }
    }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
      style: {
        color: s.color,
        width: 14
      }
    }, s.dot), /*#__PURE__*/React.createElement("span", {
      className: "font-mono text-[11px] uppercase tracking-wider w-20",
      style: {
        color: "var(--muted)"
      }
    }, s.text), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--fg)",
        fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
        fontSize: 16
      },
      className: "leading-relaxed flex-1"
    }, item.text));
  })))));
}

// ── Products / Lab ─────────────────────────────────────────────────────────
function ProductReveal(_ref1) {
  var children = _ref1.children,
    index = _ref1.index,
    active = _ref1.active;
  return /*#__PURE__*/React.createElement("div", {
    className: "product-reveal".concat(active ? " active" : ""),
    "data-i": index,
    style: {
      "--reveal-i": index
    }
  }, children);
}
function ProductCard(_ref10) {
  var p = _ref10.p,
    span = _ref10.span;
  var ref = useRef(null);
  var heroRef = useRef(null);
  var onMove = function onMove(e) {
    var el = ref.current;
    if (!el) return;
    var r = el.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = "perspective(900px) rotateX(".concat(-y * 3, "deg) rotateY(").concat(x * 3, "deg) translateZ(0)");
    if (heroRef.current) {
      heroRef.current.style.transform = "translate3d(".concat(-x * 8, "px, ").concat(-y * 6, "px, 0)");
    }
  };
  var onLeave = function onLeave() {
    if (ref.current) ref.current.style.transform = "";
    if (heroRef.current) heroRef.current.style.transform = "";
  };
  var accent = p.accent || "var(--accent)";
  return /*#__PURE__*/React.createElement("a", {
    ref: ref,
    href: p.url || undefined,
    target: p.url && /^(https?:)?\/\//.test(p.url) ? "_blank" : undefined,
    rel: p.url ? "noopener" : undefined,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    "data-cur": "card",
    className: "card product-card relative block ".concat(span, " hairline border rounded-sm overflow-hidden flex flex-col"),
    style: {
      background: "var(--surface)",
      borderColor: "var(--hairline)",
      "--p-accent": accent
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "product-hover-tip",
    "aria-hidden": "true"
  }, window.SITE.lang === "zh" ? "阅读项目 →" : "Read case (中文) →"), /*#__PURE__*/React.createElement("div", {
    className: "product-browser",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "product-chrome"
  }, /*#__PURE__*/React.createElement("span", {
    className: "product-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "product-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "product-dot"
  }), /*#__PURE__*/React.createElement("div", {
    className: "product-urlbar font-mono tabular"
  }, /*#__PURE__*/React.createElement("span", {
    className: "product-lock"
  }, "\uD83D\uDD12"), /*#__PURE__*/React.createElement("span", {
    className: "product-url"
  }, p.domain)), /*#__PURE__*/React.createElement("span", {
    className: "product-state-pill font-mono"
  }, /*#__PURE__*/React.createElement("span", {
    className: "product-state-dot"
  }), /*#__PURE__*/React.createElement("span", null, p.state))), /*#__PURE__*/React.createElement("div", {
    className: "product-viewport"
  }, p.screenshot || p.screenshot43 ? /*#__PURE__*/React.createElement(React.Fragment, null, p.screenshot && /*#__PURE__*/React.createElement("img", {
    src: p.screenshot,
    alt: p.name,
    className: "product-viewport-img product-viewport-img-21",
    loading: "lazy",
    decoding: "async",
    draggable: "false"
  }), p.screenshot43 && /*#__PURE__*/React.createElement("img", {
    src: p.screenshot43,
    alt: p.name,
    className: "product-viewport-img product-viewport-img-43",
    loading: "lazy",
    decoding: "async",
    draggable: "false"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "product-viewport-wash"
  }), /*#__PURE__*/React.createElement("div", {
    className: "product-viewport-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "product-viewport-hero",
    ref: heroRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "product-hero-eyebrow font-mono"
  }, p.n, " / ", p.kind), /*#__PURE__*/React.createElement("div", {
    className: "product-hero-name font-serif"
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "product-hero-tagline"
  }, p.tagline)), /*#__PURE__*/React.createElement("div", {
    className: "product-glyph font-serif",
    "aria-hidden": "true"
  }, p.glyph || "·")))), /*#__PURE__*/React.createElement("div", {
    className: "product-body relative p-6 md:p-7 flex-1 flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "watermark"
  }, p.domain), /*#__PURE__*/React.createElement("div", {
    className: "product-row-meta relative flex items-start justify-between font-mono text-[11px]",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "tabular"
  }, p.n), /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block w-1.5 h-1.5 rounded-full",
    style: {
      background: p.state === "live" ? "var(--accent)" : "var(--muted)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "uppercase tracking-wider"
  }, p.state))), /*#__PURE__*/React.createElement("div", {
    className: "product-row-kind relative mt-6 md:mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[11px]",
    style: {
      color: "var(--muted)"
    }
  }, p.kind, " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg)"
    }
  }, p.domain))), /*#__PURE__*/React.createElement("div", {
    className: "product-row-text relative mt-5 md:mt-6 flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "product-row-tagline text-[15px] leading-snug max-w-md",
    style: {
      color: "var(--fg)"
    }
  }, p.tagline), /*#__PURE__*/React.createElement("div", {
    className: "product-row-why mt-3 text-[13px] leading-relaxed max-w-md",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-[10px] uppercase tracking-wider mr-2",
    style: {
      color: "var(--muted)"
    }
  }, "why"), p.why)), /*#__PURE__*/React.createElement("div", {
    className: "product-row-footer relative mt-6 flex items-center justify-end font-mono text-[11px]",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg)"
    }
  }, window.SITE.lang === "zh" ? "阅读项目 →" : "Read case (中文) →"))));
}
function Products() {
  var ps = window.SITE.products;
  var _useState11 = useState("grid"),
    _useState12 = _slicedToArray(_useState11, 2),
    mode = _useState12[0],
    setMode = _useState12[1];
  var _useState13 = useState(0),
    _useState14 = _slicedToArray(_useState13, 2),
    activeIdx = _useState14[0],
    setActiveIdx = _useState14[1];
  var sectionRef = useRef(null);
  var wrapRef = useRef(null);
  var activeIdxRef = useRef(0);
  var modeRef = useRef("grid");
  useEffect(function () {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);
  useEffect(function () {
    modeRef.current = mode;
  }, [mode]);

  // 横竖屏及窗口尺寸变化时，同步手机端展示模式。
  useEffect(function () {
    var syncMode = function () {
      if (window.innerWidth <= 768) { modeRef.current = "grid"; setMode("grid"); }
    };
    syncMode();
    window.addEventListener("resize", syncMode, { passive: true });
    return function () { window.removeEventListener("resize", syncMode); };
  }, []);

  // === scroll lock：wrap 完全在视口时，wheel/touch 转化为切卡，page 不滚 ===
  useEffect(function () {
    var wrap = wrapRef.current;
    if (!wrap) return;
    var lastSwitch = 0;
    var COOLDOWN = 900;
    var touchStartY = null;
    var TOUCH_THRESHOLD = 40;
    var isInLock = function isInLock() {
      // 矮屏中卡片高度超过视口，保持页面可自由滚动。
      if (window.innerWidth <= 768 && window.innerHeight <= 520) return false;
      var r = wrap.getBoundingClientRect();
      var vh = window.innerHeight;
      if (window.innerWidth <= 768 && r.height > vh - 16) return false;
      // center-based：wrap 中心距 viewport 中心 < 30% vh 时启动 lock
      // 兼容 wrap 任意高度（包括 < viewport）
      var wrapCenter = r.top + r.height / 2;
      return Math.abs(wrapCenter - vh / 2) < vh * 0.3 && modeRef.current === "grid";
    };

    // 检查"边界 + 同向" —— 这种情况要释放 page scroll，不能 preventDefault
    var isReleaseDirection = function isReleaseDirection(dy) {
      var curr = activeIdxRef.current;
      return dy > 0 && curr >= ps.length - 1 || dy < 0 && curr <= 0;
    };
    var onWheel = function onWheel(e) {
      if (!isInLock()) return;
      // 边界 + 同向：直接放行（不 preventDefault），page 自然滚出 wrap
      if (isReleaseDirection(e.deltaY)) return;
      e.preventDefault();
      var now = performance.now();
      if (now - lastSwitch < COOLDOWN) return;
      lastSwitch = now;
      var curr = activeIdxRef.current;
      setActiveIdx(e.deltaY > 0 ? curr + 1 : curr - 1);
    };
    var onTouchStart = function onTouchStart(e) {
      if (!isInLock()) {
        touchStartY = null;
        return;
      }
      touchStartY = e.touches[0].clientY;
    };
    var onTouchMove = function onTouchMove(e) {
      if (touchStartY === null || !isInLock()) return;
      var dy = touchStartY - e.touches[0].clientY;
      // 边界 + 同向：直接放行 page，让 user 滑到下一区
      if (isReleaseDirection(dy)) return;
      if (Math.abs(dy) < TOUCH_THRESHOLD) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      var now = performance.now();
      if (now - lastSwitch < COOLDOWN) return;
      lastSwitch = now;
      var curr = activeIdxRef.current;
      setActiveIdx(dy > 0 ? curr + 1 : curr - 1);
      touchStartY = e.touches[0].clientY;
    };
    window.addEventListener("wheel", onWheel, {
      passive: false
    });
    window.addEventListener("touchstart", onTouchStart, {
      passive: false
    });
    window.addEventListener("touchmove", onTouchMove, {
      passive: false
    });
    return function () {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [ps.length]);

  // === mode 切换（基于滚动方向） ===
  // 手机端 (≤ 768px) 不需要 mode 切换 — 始终用 grid mode 体验
  useEffect(function () {
    var lastY = window.scrollY;
    var accum = 0;
    var raf = 0;
    var THRESHOLD = 30;
    var onScroll = function onScroll() {
      if (window.innerWidth <= 768) { lastY = window.scrollY; accum = 0; return; }
      if (raf) return;
      raf = requestAnimationFrame(function () {
        if (window.innerWidth <= 768) { lastY = window.scrollY; accum = 0; raf = 0; return; }
        var y = window.scrollY;
        var dy = y - lastY;
        lastY = y;
        raf = 0;
        if (Math.abs(dy) < 1) return;
        if (dy > 0 && accum < 0 || dy < 0 && accum > 0) accum = 0;
        accum += dy;
        var sec = sectionRef.current;
        if (!sec) return;
        var rect = sec.getBoundingClientRect();
        var inView = rect.bottom > 80 && rect.top < window.innerHeight - 80;
        if (!inView) {
          accum = 0;
          return;
        }
        if (accum > THRESHOLD) {
          setMode("grid");
          accum = 0;
        } else if (accum < -THRESHOLD) {
          setMode("stack");
          accum = 0;
        }
      });
    };
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return function () {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    ref: sectionRef,
    id: "work",
    className: "relative px-6 md:px-12 lg:px-20 py-24 md:py-36 product-mode-".concat(mode)
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-12 gap-6 mb-12 md:mb-16 relative"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "col-span-12 md:col-span-3 font-mono text-[11px]",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hairline-b pb-2 mb-3 flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "01 / products"), /*#__PURE__*/React.createElement("span", null, ps.length, " ", window.SITE.ui && window.SITE.ui.sectionLabel && window.SITE.ui.sectionLabel.products || "件")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      fontSize: 14,
      lineHeight: 1.7,
      color: "var(--fg)"
    }
  }, window.SITE.ui && window.SITE.ui.products_subtitle)), /*#__PURE__*/React.createElement("div", {
    className: "col-span-12 md:col-span-9"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-serif",
    style: {
      fontSize: "clamp(40px, 6vw, 84px)",
      lineHeight: 0.95,
      letterSpacing: "-0.02em"
    },
    "data-cur": "text"
  }, /*#__PURE__*/React.createElement(SplitText, {
    className: "block",
    stagger: 50
  }, window.SITE.ui && window.SITE.ui.products_h2_a || "things I built"), /*#__PURE__*/React.createElement(SplitText, {
    className: "block italic",
    style: {
      color: "var(--muted)"
    },
    stagger: 50,
    delay: 120
  }, window.SITE.ui && window.SITE.ui.products_h2_b || "because I wanted them.")), /*#__PURE__*/React.createElement(PermalinkChip, {
    id: "work"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-4",
    style: {
      fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      fontSize: 16,
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg)"
    }
  }, window.SITE.ui && window.SITE.ui.products_subhead && window.SITE.ui.products_subhead.strong || "自己造"), window.SITE.ui && window.SITE.ui.products_subhead && window.SITE.ui.products_subhead.rest || "，自己用，给同样的人用。"), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 font-mono text-[11px] flex items-center gap-2 product-mode-toggle",
    style: {
      color: "var(--muted)",
      letterSpacing: "0.08em"
    }
  }, /*#__PURE__*/React.createElement("span", null, "mode"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setMode("grid");
    },
    style: {
      color: mode === "grid" ? "var(--fg)" : "var(--muted)",
      background: "transparent",
      border: "none",
      padding: "2px 6px",
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: "inherit",
      letterSpacing: "inherit",
      textDecoration: mode === "grid" ? "underline" : "none",
      textUnderlineOffset: "3px"
    }
  }, "grid"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setMode("stack");
    },
    style: {
      color: mode === "stack" ? "var(--fg)" : "var(--muted)",
      background: "transparent",
      border: "none",
      padding: "2px 6px",
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: "inherit",
      letterSpacing: "inherit",
      textDecoration: mode === "stack" ? "underline" : "none",
      textUnderlineOffset: "3px"
    }
  }, "stack"), /*#__PURE__*/React.createElement("span", {
    className: "ml-2 opacity-60"
  }, "click to switch \xB7 or scroll \u2191/\u2193")))), /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    className: "product-stack-wrap relative",
    "data-active": activeIdx
  }, /*#__PURE__*/React.createElement("div", {
    className: "product-stack"
  }, ps.map(function (p, i) {
    return /*#__PURE__*/React.createElement(ProductReveal, {
      key: p.n,
      index: i,
      active: i === activeIdx
    }, /*#__PURE__*/React.createElement(ProductCard, {
      p: p,
      span: ""
    }));
  })), /*#__PURE__*/React.createElement("svg", {
    "aria-hidden": "true",
    focusable: "false",
    style: {
      position: "absolute",
      width: 0,
      height: 0,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("filter", {
    id: "nav-dot-goo"
  }, /*#__PURE__*/React.createElement("feGaussianBlur", {
    "in": "SourceGraphic",
    stdDeviation: "4",
    result: "blur"
  }), /*#__PURE__*/React.createElement("feColorMatrix", {
    "in": "blur",
    mode: "matrix",
    values: "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
  })))), /*#__PURE__*/React.createElement("nav", {
    className: "product-nav-dots",
    "aria-label": "\u5207\u6362\u7F51\u7AD9"
  }, ps.map(function (p, i) {
    return /*#__PURE__*/React.createElement("button", {
      key: p.n,
      type: "button",
      className: "product-nav-dot",
      "data-active": i === activeIdx ? "true" : undefined,
      style: {
        "--dot-accent": p.accent
      },
      onClick: function onClick() {
        return setActiveIdx(i);
      },
      "aria-label": "\u5207\u6362\u5230 ".concat(p.name),
      "aria-current": i === activeIdx ? "true" : undefined,
      "data-cur": "link",
      "data-curlabel": p.name
    });
  }))));
}

// ── Open Source ────────────────────────────────────────────────────────────
function OpenSource() {
  var oss = window.SITE.oss;
  return /*#__PURE__*/React.createElement("section", {
    id: "oss",
    className: "relative px-6 md:px-12 lg:px-20 py-24 md:py-36 hairline-t"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-12 gap-6 mb-12 relative"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "col-span-12 md:col-span-3 font-mono text-[11px]",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hairline-b pb-2 mb-3 flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "03 / capabilities"), /*#__PURE__*/React.createElement("span", null, "product")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      fontSize: 14,
      lineHeight: 1.7,
      color: "var(--fg)"
    }
  }, window.SITE.ui && window.SITE.ui.oss_subtitle || "写代码不只是为了产品 — 也为了搞清楚一件事。")), /*#__PURE__*/React.createElement("div", {
    className: "col-span-12 md:col-span-9"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-serif",
    style: {
      fontSize: "clamp(40px, 6vw, 84px)",
      lineHeight: 0.95,
      letterSpacing: "-0.02em"
    },
    "data-cur": "text"
  }, /*#__PURE__*/React.createElement(SplitText, {
    className: "block italic",
    style: {
      color: "var(--muted)"
    },
    stagger: 50
  }, window.SITE.ui && window.SITE.ui.oss_h2_a || "code"), /*#__PURE__*/React.createElement(SplitText, {
    className: "block",
    stagger: 50,
    delay: 120
  }, window.SITE.ui && window.SITE.ui.oss_h2_b || "I share.")), /*#__PURE__*/React.createElement(PermalinkChip, {
    id: "oss"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-12 gap-5 relative"
  }, oss.map(function (o, i) {
    return /*#__PURE__*/React.createElement(Reveal, {
      delay: i * 100,
      key: o.name,
      className: oss.length === 1 ? "col-span-12" : oss.length === 2 ? "col-span-12 md:col-span-6" : oss.length === 5 ? i < 2 ? "col-span-12 md:col-span-6" : "col-span-12 md:col-span-4" : "col-span-12 md:col-span-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "p-6 border hairline rounded-sm h-full flex flex-col",
      style: {
        background: "var(--surface)",
        borderColor: "var(--hairline)"
      },
      "data-cur": "text"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-mono text-[11px] flex items-center justify-between",
      style: {
        color: "var(--muted)"
      }
    }, /*#__PURE__*/React.createElement("span", null, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", null, o.stack.join(" · "))), /*#__PURE__*/React.createElement("h3", {
      className: "mt-4 font-serif",
      style: {
        fontSize: 32,
        lineHeight: 1
      }
    }, o.name), /*#__PURE__*/React.createElement("p", {
      className: "mt-3 leading-relaxed flex-1",
      style: {
        fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
        fontSize: 14,
        color: "var(--fg)"
      }
    }, o.desc), /*#__PURE__*/React.createElement("div", {
      className: "mt-5 flex items-center gap-4 font-mono text-[11px]"
    }, /*#__PURE__*/React.createElement("a", {
      href: o.repo || undefined,
      target: "_blank",
      rel: "noopener",
      className: "ul-link",
      "data-cur": "link",
      "data-curlabel": "REPO \u2192",
      style: {
        color: "var(--fg)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "arrow-pull inline-block"
    }, ""), window.SITE.lang === "zh" ? "能力方向" : "capability"), o.demo && /*#__PURE__*/React.createElement("a", {
      href: o.demo,
      target: "_blank",
      rel: "noopener",
      className: "ul-link",
      "data-cur": "link",
      "data-curlabel": window.SITE.lang === "zh" ? "教程 →" : "TUTORIAL →",
      style: {
        color: "var(--fg)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "arrow-pull inline-block"
    }, "\u2197"), " ", window.SITE.lang === "zh" ? "配套教程" : "tutorial"))));
  })));
}

// ── Services ───────────────────────────────────────────────────────────────
function Services() {
  var items = window.SITE.services || [];
  var ui = window.SITE.ui || {};
  if (!items.length) return null;

  // 用 Cal JS API 手动打开日历 — 不依赖 data-cal-link 自动监听（React 动态渲染的按钮常拿不到监听）
  // 本地复刻：保留按钮外观，不接入外部预约服务。
  var openCal = function openCal(s) {};
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    className: "relative px-6 md:px-12 lg:px-20 py-24 md:py-36 hairline-t"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-12 gap-6 mb-12 md:mb-16 relative"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "col-span-12 md:col-span-3 font-mono text-[11px]",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hairline-b pb-2 mb-3 flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "04 / approach"), /*#__PURE__*/React.createElement("span", null, ui.services_section_label || "approach")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      fontSize: 14,
      lineHeight: 1.7,
      color: "var(--fg)"
    }
  }, ui.services_subtitle || "")), /*#__PURE__*/React.createElement("div", {
    className: "col-span-12 md:col-span-9"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-serif",
    style: {
      fontSize: "clamp(40px, 6vw, 84px)",
      lineHeight: 0.95,
      letterSpacing: "-0.02em"
    },
    "data-cur": "text"
  }, /*#__PURE__*/React.createElement(SplitText, {
    className: "block",
    stagger: 50
  }, ui.services_h2_a || "what I"), /*#__PURE__*/React.createElement(SplitText, {
    className: "block italic",
    style: {
      color: "var(--muted)"
    },
    stagger: 50,
    delay: 120
  }, ui.services_h2_b || "can help with.")), /*#__PURE__*/React.createElement(PermalinkChip, {
    id: "services"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-12 gap-5 md:gap-6 relative"
  }, items.map(function (s, i) {
    return /*#__PURE__*/React.createElement(Reveal, {
      delay: i * 90,
      key: s.id,
      className: "col-span-12 md:col-span-4"
    }, /*#__PURE__*/React.createElement("div", {
      "data-cur": "text",
      className: "service-card relative block h-full text-left w-full"
    }, /*#__PURE__*/React.createElement("div", {
      className: "service-num font-mono tabular"
    }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("h3", {
      className: "service-title font-serif"
    }, s.title), /*#__PURE__*/React.createElement("p", {
      className: "service-desc",
      style: {
        fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif'
      }
    }, s.desc), s.includes && s.includes.length > 0 && /*#__PURE__*/React.createElement("ul", {
      className: "service-list service-list-yes"
    }, s.includes.map(function (it, k) {
      return /*#__PURE__*/React.createElement("li", {
        key: "y" + k
      }, /*#__PURE__*/React.createElement("span", {
        className: "service-list-mark service-list-mark-yes"
      }, "\u2713"), /*#__PURE__*/React.createElement("span", null, it));
    })), s.excludes && s.excludes.length > 0 && /*#__PURE__*/React.createElement("ul", {
      className: "service-list service-list-no"
    }, s.excludes.map(function (it, k) {
      return /*#__PURE__*/React.createElement("li", {
        key: "n" + k
      }, /*#__PURE__*/React.createElement("span", {
        className: "service-list-mark service-list-mark-no"
      }, "\u2715"), /*#__PURE__*/React.createElement("span", null, it));
    })), /*#__PURE__*/React.createElement("div", {
      className: "service-meta font-mono"
    }, /*#__PURE__*/React.createElement("span", {
      className: "service-duration"
    }, s.duration), /*#__PURE__*/React.createElement("span", {
      className: "service-price"
    }, s.price)), /*#__PURE__*/React.createElement("div", {
      className: "service-cta font-mono"
    }, /*#__PURE__*/React.createElement("span", null, ui.services_book_btn || "Book ↗"))));
  })));
}

// ── Community ──────────────────────────────────────────────────────────────
function CommunityCloud(_ref11) {
  var members = _ref11.members;
  var canvasRef = useRef(null);
  var containerRef = useRef(null);
  var _useState15 = useState(null),
    _useState16 = _slicedToArray(_useState15, 2),
    hovered = _useState16[0],
    setHovered = _useState16[1];
  var _useState17 = useState({
      x: 0,
      y: 0
    }),
    _useState18 = _slicedToArray(_useState17, 2),
    popPos = _useState18[0],
    setPopPos = _useState18[1];
  useEffect(function () {
    var canvas = canvasRef.current;
    var container = containerRef.current;
    if (!canvas || !container || !members || !members.length) return;
    var cancelled = false;
    var detach = function () {};
    function drawCloud() {
    if (!window.WordCloud) return;

    // tag → brief 查表
    var briefMap = {};
    members.forEach(function (m) {
      var label = m.tag || (m.who || "").replace("@", "");
      briefMap[label] = m.brief || m.text || "";
    });
    var list = members.map(function (m) {
      var label = m.tag || (m.who || "").replace("@", "");
      var weight = m.weight || 3;
      return [label, weight];
    });
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = container.clientWidth || 800;
    // 字号与画布高度共用一个 scale 系数，避免"字小但画布空"的留白
    var SCALE = w / 900;
    var h = Math.max(320, Math.round(w * 0.46));
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    var ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    var isDark = document.documentElement.classList.contains("dark");
    window.WordCloud(canvas, {
      list: list,
      fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      fontWeight: function fontWeight(word, weight) {
        return weight >= 4 ? "700" : weight >= 3 ? "500" : "400";
      },
      color: function color(word, weight) {
        if (isDark) {
          return weight >= 4 ? "oklch(0.95 0.01 85)" : weight >= 3 ? "oklch(0.85 0.01 85)" : "oklch(0.65 0.01 250)";
        }
        return weight >= 4 ? "oklch(0.18 0.015 250)" : weight >= 3 ? "oklch(0.30 0.015 250)" : "oklch(0.55 0.01 250)";
      },
      backgroundColor: "transparent",
      rotateRatio: 0.45,
      rotationSteps: 2,
      minRotation: -Math.PI / 2,
      maxRotation: Math.PI / 2,
      shape: "square",
      weightFactor: function weightFactor(s) {
        return Math.pow(s, 2.2) * SCALE;
      },
      gridSize: Math.max(6, Math.round(8 * w / 800)),
      drawOutOfBound: false,
      shrinkToFit: true,
      hover: function hover(item, dim, e) {
        if (item) {
          var r = canvas.getBoundingClientRect();
          setPopPos({
            x: e.clientX - r.left,
            y: e.clientY - r.top
          });
          setHovered({
            tag: item[0],
            brief: briefMap[item[0]] || ""
          });
        } else {
          setHovered(null);
        }
      }
    });
    var onLeave = function onLeave() {
      return setHovered(null);
    };
    canvas.addEventListener("mouseleave", onLeave);
    detach = function () {
      canvas.removeEventListener("mouseleave", onLeave);
    };
    }
    function ensureWordCloud() {
      if (window.WordCloud) return Promise.resolve();
      if (!window.__wordcloudVendor) {
        window.__wordcloudVendor = new Promise(function (resolve, reject) {
          var el = document.createElement("script");
          el.src = "vendor/wordcloud2.js";
          el.async = true;
          el.onload = function () { resolve(); };
          el.onerror = function () { reject(new Error("wordcloud")); };
          document.head.appendChild(el);
        });
      }
      return window.__wordcloudVendor;
    }
    ensureWordCloud().then(function () {
      if (!cancelled) drawCloud();
    }).catch(function () {});
    return function () {
      cancelled = true;
      detach();
    };
  }, [members]);
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    className: "cw-cloud",
    style: {
      position: "relative",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      display: "block"
    }
  }), hovered && hovered.brief && /*#__PURE__*/React.createElement("div", {
    className: "cw-cloud-pop",
    style: {
      left: popPos.x,
      top: popPos.y - 14
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "cw-quote"
  }, hovered.brief), /*#__PURE__*/React.createElement("span", {
    className: "cw-who"
  }, hovered.tag)));
}
function CommunityMarquee(_ref12) {
  var members = _ref12.members;
  if (!members || members.length === 0) return null;
  // 三行交错分配：i % 3
  var rowA = members.filter(function (_, i) {
    return i % 3 === 0;
  });
  var rowB = members.filter(function (_, i) {
    return i % 3 === 1;
  });
  var rowC = members.filter(function (_, i) {
    return i % 3 === 2;
  });
  var renderRow = function renderRow(items, reverse, speedClass) {
    return /*#__PURE__*/React.createElement("div", {
      className: "cm-row".concat(reverse ? " cm-reverse" : "").concat(speedClass ? " " + speedClass : "")
    }, /*#__PURE__*/React.createElement("div", {
      className: "cm-track"
    }, [0, 1].map(function (dup) {
      return /*#__PURE__*/React.createElement("div", {
        className: "cm-group",
        key: dup,
        "aria-hidden": dup === 1 ? "true" : undefined
      }, items.map(function (m, i) {
        var label = m.tag || (m.who || "").replace("@", "");
        var brief = m.brief || m.text || "";
        return /*#__PURE__*/React.createElement("span", {
          className: "cm-pill",
          key: "".concat(dup, "-").concat(i),
          "data-cur": "text"
        }, /*#__PURE__*/React.createElement("span", {
          className: "cm-pill-label"
        }, label), brief && /*#__PURE__*/React.createElement("span", {
          className: "cm-brief"
        }, brief));
      }));
    })));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "cm-stage",
    "aria-label": "community tags"
  }, renderRow(rowA, false, "cm-fast"), renderRow(rowB, true, null), renderRow(rowC, false, "cm-slow"));
}
function Community() {
  var c = window.SITE.community;
  return /*#__PURE__*/React.createElement("section", {
    id: "community",
    className: "relative px-6 md:px-12 lg:px-20 py-24 md:py-36",
    style: {
      background: "var(--warm)",
      borderTop: ".5px solid var(--hairline)",
      borderBottom: ".5px solid var(--hairline)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-12 gap-6 mb-12 relative"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "col-span-12 md:col-span-3 font-mono text-[11px]",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hairline-b pb-2 mb-3 flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "05 / community"), /*#__PURE__*/React.createElement("span", null, window.SITE.ui && window.SITE.ui.sectionLabel && window.SITE.ui.sectionLabel.community || "暖")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      fontSize: 14,
      lineHeight: 1.7,
      color: "var(--fg)"
    }
  }, window.SITE.ui && window.SITE.ui.community_subtitle || "写代码会冷。这块刻意暖一点。")), /*#__PURE__*/React.createElement("div", {
    className: "col-span-12 md:col-span-9"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-serif",
    style: {
      fontSize: "clamp(40px, 6vw, 84px)",
      lineHeight: 0.95,
      letterSpacing: "-0.02em"
    },
    "data-cur": "text"
  }, /*#__PURE__*/React.createElement(SplitText, {
    stagger: 45
  }, c.name + ".")), /*#__PURE__*/React.createElement(PermalinkChip, {
    id: "community"
  }), /*#__PURE__*/React.createElement("p", {
    className: "mt-4 max-w-xl leading-snug",
    style: {
      fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      fontSize: 19,
      color: "var(--fg)"
    },
    "data-cur": "text"
  }, c.tagline))), /*#__PURE__*/React.createElement(Reveal, {
    className: "mb-12 relative"
  }, /*#__PURE__*/React.createElement(CommunityMarquee, {
    members: c.members || c.quotes || []
  })), /*#__PURE__*/React.createElement(Reveal, {
    className: "relative"
  }, /*#__PURE__*/React.createElement(MagnetButton, {
    href: c.cta.href,
    className: "px-6 py-4 rounded-sm font-mono text-[12px] uppercase tracking-[0.18em]",
    style: {
      background: "var(--fg)",
      color: "var(--bg)"
    }
  }, /*#__PURE__*/React.createElement("span", null, c.cta.label), /*#__PURE__*/React.createElement("span", {
    className: "arrow-pull"
  }, "\u2192"))));
}

// ── Writing ────────────────────────────────────────────────────────────────
function WritingCard(_ref13) {
  var w = _ref13.w,
    i = _ref13.i;
  return /*#__PURE__*/React.createElement("a", {
    href: w.href || undefined,
    target: "_blank",
    rel: "noopener",
    "data-cur": "link",
    "data-curlabel": "READ \u2192",
    className: "writing-card relative block",
    style: {
      "--idx": i
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "writing-meta mb-3 px-0.5"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "leading-snug writing-title",
    style: {
      fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      fontWeight: 500,
      fontSize: "clamp(14px, 1vw, 16px)"
    }
  }, w.title), /*#__PURE__*/React.createElement("div", {
    className: "mt-1 font-mono text-[10px] tabular uppercase tracking-[0.18em]",
    style: {
      color: "var(--muted)"
    }
  }, w.date)), /*#__PURE__*/React.createElement("div", {
    className: "writing-cover",
    style: {
      aspectRatio: "3 / 4"
    }
  }, w.cover ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    src: w.cover,
    alt: "",
    "aria-hidden": "true",
    className: "writing-cover-bg",
    loading: "lazy",
    decoding: "async",
    draggable: "false"
  }), /*#__PURE__*/React.createElement("img", {
    src: w.cover,
    alt: w.title,
    className: "writing-cover-img",
    loading: "lazy",
    decoding: "async",
    draggable: "false"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "writing-cover-placeholder"
  }, /*#__PURE__*/React.createElement("span", null, w.title)), /*#__PURE__*/React.createElement("span", {
    className: "writing-no font-mono tabular"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    className: "writing-shine",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "writing-spine",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "writing-tip font-mono"
  }, window.SITE.ui && window.SITE.ui.writing_tip || "Click to read ↗")));
}
function Writing() {
  var items = window.SITE.writing;
  return /*#__PURE__*/React.createElement("section", {
    id: "writing",
    className: "relative px-6 md:px-12 lg:px-20 py-24 md:py-36"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-12 gap-6 mb-12 md:mb-16 relative"
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "col-span-12 md:col-span-3 font-mono text-[11px]",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hairline-b pb-2 mb-3 flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "02 / writing"), /*#__PURE__*/React.createElement("span", null, window.SITE.lang === "zh" ? "思考方向" : "ideas")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: '"PingFang SC", "HarmonyOS Sans SC", "Microsoft YaHei", "Noto Sans SC", sans-serif',
      fontSize: 14,
      lineHeight: 1.7,
      color: "var(--fg)"
    }
  }, window.SITE.lang === "zh" ? "这些是正在梳理的思考方向，尚未发布。" : "Questions I am exploring; not published articles.")), /*#__PURE__*/React.createElement("div", {
    className: "col-span-12 md:col-span-9"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-serif",
    style: {
      fontSize: "clamp(40px, 6vw, 84px)",
      lineHeight: 0.95,
      letterSpacing: "-0.02em"
    },
    "data-cur": "text"
  }, /*#__PURE__*/React.createElement(SplitText, {
    stagger: 50
  }, window.SITE.ui && window.SITE.ui.writing_h2 || "recent writing.")), /*#__PURE__*/React.createElement(PermalinkChip, {
    id: "writing"
  }))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "writing-stack"
  }, items.map(function (w, i) {
    return /*#__PURE__*/React.createElement(WritingCard, {
      w: w,
      i: i,
      key: "".concat(w.href, "-").concat(i)
    });
  }))));
}

// ── Contact ────────────────────────────────────────────────────────────────
function Contact() { var zh=window.SITE.lang==='zh'; return React.createElement("section",{id:"contact",className:"relative px-6 md:px-12 lg:px-20 py-24 md:py-36 hairline-t"},React.createElement("div",{className:"grid grid-cols-12 gap-6"},React.createElement("div",{className:"col-span-12 md:col-span-3 font-mono text-[11px]",style:{color:"var(--muted)"}},React.createElement("div",{className:"hairline-b pb-2 mb-3 flex justify-between"},React.createElement("span",null,"06 / contact"),React.createElement("span",null,"—"))),React.createElement("div",{className:"col-span-12 md:col-span-9"},React.createElement("h2",{className:"font-serif",style:{fontSize:"clamp(48px,8vw,130px)",lineHeight:.92,letterSpacing:"-.02em"}},React.createElement("span",{className:"italic",style:{color:"var(--muted)"}},zh?"聊聊":"say")," ",zh?"产品与 AI":"hello",React.createElement("span",{style:{color:"var(--accent)"}},".")),React.createElement(PermalinkChip,{id:"contact"}),React.createElement("p",{className:"mt-6 leading-[1.7]",style:{fontSize:17}},window.SITE.contact.pitch))),React.createElement("div",{className:"mt-24 font-mono text-[10px] uppercase tracking-[0.2em]",style:{color:"var(--muted)"}},"© ",new Date().getFullYear()," XINGYU · MADE WITH CURIOSITY"));}
Object.assign(window, {
  Hero: Hero,
  About: About,
  Now: Now,
  Products: Products,
  OpenSource: OpenSource,
  Community: Community,
  Writing: Writing,
  Contact: Contact,
  Reveal: Reveal,
  MagnetButton: MagnetButton,
  SplitText: SplitText,
  HoverName: HoverName,
  Toast: Toast,
  PermalinkChip: PermalinkChip
});
