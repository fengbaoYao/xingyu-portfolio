/* JSX 已预编译；原组件来源保留在下方。 */
"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// UI 与动效来源：https://yangsir.net/app/portrait3d.jsx
// Portrait3D — 加载 glb 头像模型，自动慢转 + 鼠标 hover 偏向跟随。
// 不默认请求远程 glb。仅在传入 src 时按需加载 Three，失败不阻塞首屏。

function Portrait3D(_ref) {
  var _ref$src = _ref.src,
    src = _ref$src === void 0 ? "" : _ref$src;
  var containerRef = React.useRef(null);
  var _React$useState = React.useState("loading"),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    status = _React$useState2[0],
    setStatus = _React$useState2[1]; // loading | ok | error

  React.useEffect(function () {
    if (!src) {
      setStatus("error");
      return;
    }
    var cancelled = false;
    var cleanup = function () {};
    function startPortrait() {
    var THREE = window.THREE;
    if (!THREE) {
      setStatus("error");
      return;
    }
    var Loader = THREE.GLTFLoader;
    if (!Loader) {
      setStatus("error");
      return;
    }
    var container = containerRef.current;
    if (!container) return;
    var w = container.clientWidth || 240;
    var h = container.clientHeight || 280;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    camera.position.set(0, 0, 3.6);
    var renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    renderer.setClearColor(0x000000, 0);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // 点云不需要灯光

    var pivot = new THREE.Group();
    scene.add(pivot);
    var pointsRoot = null;
    var disposables = [];
    var loader = new Loader();
    loader.load(src, function (gltf) {
      var root = gltf.scene;
      var meshes = [];
      root.traverse(function (o) {
        if (o.isMesh && o.geometry) {
          o.updateWorldMatrix(true, false);
          meshes.push(o);
        }
      });
      if (!meshes.length) {
        setStatus("error");
        return;
      }

      // 仅取轮廓边端点（EdgesGeometry）：保留显著折角，去掉表面填充
      var EDGE_THRESHOLD = 22; // 角度阈值（度），大→更简洁，小→更密
      var arrays = [];
      var totalLen = 0;
      for (var _i = 0, _meshes = meshes; _i < _meshes.length; _i++) {
        var mesh = _meshes[_i];
        var edgeGeo = new THREE.EdgesGeometry(mesh.geometry, EDGE_THRESHOLD);
        edgeGeo.applyMatrix4(mesh.matrixWorld);
        var arr = edgeGeo.attributes.position.array;
        arrays.push(arr);
        totalLen += arr.length;
        edgeGeo.dispose();
      }
      var positions = new Float32Array(totalLen);
      var off = 0;
      for (var _i2 = 0, _arrays = arrays; _i2 < _arrays.length; _i2++) {
        var a = _arrays[_i2];
        positions.set(a, off);
        off += a.length;
      }
      var geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      var mat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.011,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.95
      });
      var pts = new THREE.Points(geo, mat);
      disposables.push(geo, mat);

      // 居中 + 缩放 + 朝向修正（用一层 group 包装）
      var group = new THREE.Group();
      group.add(pts);
      var box = new THREE.Box3().setFromObject(pts);
      var center = box.getCenter(new THREE.Vector3());
      var size = box.getSize(new THREE.Vector3());
      pts.position.sub(center);
      var maxDim = Math.max(size.x, size.y, size.z) || 1;
      group.scale.setScalar(1.8 / maxDim);
      // 正脸朝相机
      group.rotation.y = -Math.PI / 2;
      pivot.add(group);
      pointsRoot = group;
      setStatus("ok");
    }, undefined, function (err) {
      console.error("[Portrait3D] glb load error:", err);
      setStatus("error");
    });

    // 鼠标偏向
    var tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    var onMouseMove = function onMouseMove(e) {
      var r = container.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    var onMouseLeave = function onMouseLeave() {
      tx = 0;
      ty = 0;
    };
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    // 节流到 30fps
    var raf,
      last = 0;
    var FRAME = 1000 / 30;
    var _tick = function tick(now) {
      raf = requestAnimationFrame(_tick);
      if (now - last < FRAME) return;
      last = now;
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;

      // 不自转，仅跟随鼠标
      pivot.rotation.y = cx * 0.55;
      pivot.rotation.x = -cy * 0.35;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(_tick);
    var onResize = function onResize() {
      w = container.clientWidth || 240;
      h = container.clientHeight || 280;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    var ro = new ResizeObserver(onResize);
    ro.observe(container);
    cleanup = function () {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      disposables.forEach(function (d) {
        return d && d.dispose && d.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
    }
    function ensurePortraitVendor() {
      if (window.THREE && window.THREE.GLTFLoader) return Promise.resolve();
      if (!window.__portrait3dVendor) {
        window.__portrait3dVendor = new Promise(function (resolve, reject) {
          var el = document.createElement("script");
          el.src = "vendor/portrait-3d.js";
          el.async = true;
          el.onload = function () { resolve(); };
          el.onerror = function () { reject(new Error("portrait-3d")); };
          document.head.appendChild(el);
        });
      }
      return window.__portrait3dVendor;
    }
    ensurePortraitVendor().then(function () {
      if (!cancelled) startPortrait();
    }).catch(function () {
      if (!cancelled) setStatus("error");
    });
    return function () {
      cancelled = true;
      cleanup();
    };
  }, [src]);
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    className: "portrait-3d",
    style: {
      position: "absolute",
      inset: 0
    },
    "aria-hidden": "true"
  }, status === "loading" && /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.2em]",
    style: {
      color: "var(--muted)"
    }
  }, "loading\u2026"), status === "error" && /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.2em]",
    style: {
      color: "var(--muted)"
    }
  }, "[ portrait ]"));
}
window.Portrait3D = Portrait3D;
