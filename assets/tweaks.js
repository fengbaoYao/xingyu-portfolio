/* JSX 已预编译；原组件来源保留在下方。 */
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// UI 与动效来源：https://yangsir.net/app/tweaks.jsx
// Tweaks panel — useTweaks hook + UI primitives used by main.jsx.

function useTweaks(defaults) {
  var KEY = "evan.tweaks.v1";
  var _React$useState = React.useState(function () {
      try {
        var raw = localStorage.getItem(KEY);
        return raw ? _objectSpread(_objectSpread({}, defaults), JSON.parse(raw)) : defaults;
      } catch (_unused) {
        return defaults;
      }
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    tweaks = _React$useState2[0],
    setTweaks = _React$useState2[1];
  var setTweak = function setTweak(k, v) {
    return setTweaks(function (prev) {
      var next = _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, k, v));
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch (_unused2) {}
      return next;
    });
  };
  return [tweaks, setTweak];
}
function TweaksPanel(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? "Tweaks" : _ref$title,
    children = _ref.children;
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    open = _React$useState4[0],
    setOpen = _React$useState4[1];
  return /*#__PURE__*/React.createElement("div", {
    className: "tweaks"
  }, open && /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg)",
      textTransform: "uppercase",
      letterSpacing: ".15em"
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setOpen(false);
    },
    style: {
      color: "var(--muted)"
    },
    "data-cur": "link",
    "data-curlabel": "CLOSE"
  }, "\xD7")), children), /*#__PURE__*/React.createElement("button", {
    className: "toggle",
    onClick: function onClick() {
      return setOpen(function (o) {
        return !o;
      });
    },
    "data-cur": "link",
    "data-curlabel": "TWEAK"
  }, open ? "× close" : "[ tweak ]"));
}
function TweakSection(_ref2) {
  var label = _ref2.label;
  return /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, label);
}
function TweakRadio(_ref3) {
  var label = _ref3.label,
    value = _ref3.value,
    options = _ref3.options,
    onChange = _ref3.onChange;
  return /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "seg"
  }, options.map(function (opt) {
    return /*#__PURE__*/React.createElement("button", {
      key: opt.value,
      className: value === opt.value ? "on" : "",
      onClick: function onClick() {
        return onChange(opt.value);
      },
      "data-cur": "link",
      "data-curlabel": opt.label.toUpperCase()
    }, opt.label);
  })));
}
Object.assign(window, {
  useTweaks: useTweaks,
  TweaksPanel: TweaksPanel,
  TweakSection: TweakSection,
  TweakRadio: TweakRadio
});
