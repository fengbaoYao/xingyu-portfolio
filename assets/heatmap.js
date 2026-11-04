/* JSX 已预编译；原组件来源保留在下方。 */
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// UI 与动效来源：https://yangsir.net/app/heatmap.jsx
// GitHub contribution heatmap.
// Tries to fetch real data via a public proxy; falls back to deterministic mock.

function makeMockYear() {
  var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  // 53 weeks x 7 days
  var weeks = [];
  var s = seed;
  var rand = function rand() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  var today = new Date();
  // start ~ 53 weeks ago, on a Sunday
  var start = new Date(today);
  start.setDate(start.getDate() - 52 * 7 - today.getDay());
  for (var w = 0; w < 53; w++) {
    var days = [];
    for (var d = 0; d < 7; d++) {
      var date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      if (date > today) {
        days.push(null);
        continue;
      }
      // pattern: weekends lighter, recent denser, occasional bursts
      var recencyBoost = Math.max(0, 1 - (today - date) / (1000 * 60 * 60 * 24 * 180));
      var weekendDamp = d === 0 || d === 6 ? 0.5 : 1;
      var r = rand() * recencyBoost * weekendDamp;
      var count = 0,
        level = 0;
      if (r > 0.18) {
        count = 1 + Math.floor(rand() * 2);
        level = 1;
      }
      if (r > 0.42) {
        count = 2 + Math.floor(rand() * 4);
        level = 2;
      }
      if (r > 0.62) {
        count = 4 + Math.floor(rand() * 6);
        level = 3;
      }
      if (r > 0.78) {
        count = 8 + Math.floor(rand() * 10);
        level = 4;
      }
      days.push({
        date: date.toISOString().slice(0, 10),
        count: count,
        level: level
      });
    }
    weeks.push(days);
  }
  return weeks;
}
function Heatmap(_ref) {
  var user = _ref.user;
  var _React$useState = React.useState(function () {
      return makeMockYear(7);
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    weeks = _React$useState2[0],
    setWeeks = _React$useState2[1];
  var _React$useState3 = React.useState("mock"),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    source = _React$useState4[0],
    setSource = _React$useState4[1];
  var _React$useState5 = React.useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    hover = _React$useState6[0],
    setHover = _React$useState6[1];

  // 本地复刻：仅展示原站自带模拟数据，不连接数据服务。

  var total = weeks.flat().filter(Boolean).reduce(function (a, c) {
    return a + c.count;
  }, 0);
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // month labels: take the first week of each month present
  var monthLabels = React.useMemo(function () {
    var seen = new Set();
    return weeks.map(function (w, i) {
      var first = w.find(Boolean);
      if (!first) return null;
      var m = new Date(first.date).getMonth();
      if (seen.has(m)) return null;
      seen.add(m);
      return {
        i: i,
        label: months[m]
      };
    });
  }, [weeks]);
  return /*#__PURE__*/React.createElement("div", {
    className: "font-mono text-[11px]",
    style: {
      color: "var(--muted)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--fg)"
    },
    className: "tabular"
  }, total.toLocaleString()), " contributions \xB7 last year"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tabular"
  }, source === "live" ? "● live" : "○ sample"), /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/".concat(user),
    target: "_blank",
    rel: "noopener",
    "data-cur": "link",
    "data-curlabel": "GITHUB \u2192",
    className: "ul-link",
    style: {
      color: "var(--fg)"
    }
  }, "@", user))), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-block"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex pl-7 mb-1"
  }, weeks.map(function (_, i) {
    var m = monthLabels[i];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        width: 13
      },
      className: "text-[10px]"
    }, m ? m.label : "");
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col mr-2 text-[10px] gap-[2px]",
    style: {
      height: 7 * 13 - 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 11
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 11
    }
  }, "Mon"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 11
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 11
    }
  }, "Wed"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 11
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 11
    }
  }, "Fri"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 11
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-[2px]"
  }, weeks.map(function (wk, wi) {
    return /*#__PURE__*/React.createElement("div", {
      key: wi,
      className: "flex flex-col gap-[2px]"
    }, wk.map(function (d, di) {
      if (!d) return /*#__PURE__*/React.createElement("div", {
        key: di,
        style: {
          width: 11,
          height: 11
        }
      });
      return /*#__PURE__*/React.createElement("div", {
        key: di,
        className: "hm-cell hm-l".concat(d.level),
        onMouseEnter: function onMouseEnter() {
          return setHover(d);
        },
        onMouseLeave: function onMouseLeave() {
          return setHover(function (h) {
            return h === d ? null : h;
          });
        }
      });
    }));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-end gap-1 mt-2 text-[10px]"
  }, /*#__PURE__*/React.createElement("span", null, "less"), /*#__PURE__*/React.createElement("div", {
    className: "hm-cell"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hm-cell hm-l1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hm-cell hm-l2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hm-cell hm-l3"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hm-cell hm-l4"
  }), /*#__PURE__*/React.createElement("span", null, "more")))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 h-4 tabular"
  }, hover ? "".concat(hover.date, " \xB7 ").concat(hover.count, " contribution").concat(hover.count === 1 ? "" : "s") : "\xA0"));
}
window.Heatmap = Heatmap;
