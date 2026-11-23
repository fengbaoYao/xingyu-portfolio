/* Page copy editor. Deferred before site.js: capture parsed, untouched source once. */
(() => {
  'use strict';
  if (!document.querySelector('[data-edit-id]')) {
    const pagePrefix = (location.pathname.split('/').pop() || 'index').replace(/\.html?$/i, '') || 'index';
    let seq = 0;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = node.parentElement;
        if (!p || p.closest('script, style, svg, #copy-editor, .sr-only, [aria-hidden="true"]')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(node => {
      seq += 1;
      const span = document.createElement('edit-text');
      const sec = node.parentElement.closest('section, article, header, footer');
      const heading = sec && sec.querySelector('h1, h2, h3');
      span.dataset.editId = `${pagePrefix}-${String(seq).padStart(3, '0')}`;
      span.dataset.editLocation = `${heading ? heading.textContent.trim().slice(0, 18) : '正文'} / 文字 ${seq}`;
      node.parentNode.insertBefore(span, node);
      span.appendChild(node);
    });
  }
  const template = document.documentElement.cloneNode(true);
  const doctype = document.doctype ? new XMLSerializer().serializeToString(document.doctype) : '<!DOCTYPE html>';
  const sourceURL = new URL(location.href);
  sourceURL.search = ''; sourceURL.hash = '';
  const page = sourceURL.href;
  const key = 'xy-copy-editor:' + page;
  const version = 1;
  const fields = [...document.querySelectorAll('[data-edit-id]')];
  const originals = new Map(fields.map(el => [el.dataset.editId, el.textContent]));
  const byId = new Map(fields.map(el => [el.dataset.editId, el]));
  // Two independent 32-bit accumulators; includes IDs and every original character.
  const baseline = JSON.stringify([...originals]);
  function fingerprint(s) {
    let a = 2166136261, b = 5381;
    for (let i = 0; i < s.length; i++) { a = Math.imul(a ^ s.charCodeAt(i), 16777619); b = Math.imul(b, 33) ^ s.charCodeAt(i); }
    return (a >>> 0).toString(16) + '-' + (b >>> 0).toString(16);
  }
  const initialFingerprint = fingerprint(baseline);
  let active = false, preview = false, pending = null, conflict = false, timer, composing = false;
  let undo = [], redo = [], lastInput = null;
  const times = new Map();
  const root = document.createElement('aside');
  root.id = 'copy-editor'; root.setAttribute('aria-label', '页面文案编辑器');
  root.innerHTML = `<button type="button" data-action="enter" class="editor-launch">编辑文案</button>
    <section class="editor-panel" hidden aria-label="编辑工具栏">
      <strong>页面文案编辑器</strong><p class="editor-notice">可直接点击页面任意文字在线微调（草稿自动保存在当前浏览器，支持一键导出 HTML / Markdown / JSON）。</p>
      <div class="editor-pending" hidden><p></p><div class="editor-actions"><button type="button" data-action="restore">恢复草稿</button><button type="button" data-action="old">导出旧草稿</button><button type="button" data-action="discard">放弃草稿</button></div></div>
      <div class="editor-actions editor-tools">
        <button type="button" data-action="undo">撤销</button><button type="button" data-action="redo">重做</button>
        <button type="button" data-action="preview">预览</button><button type="button" data-action="resume" hidden>继续编辑</button>
        <button type="button" data-action="html">导出HTML</button><button type="button" data-action="json">导出JSON</button><button type="button" data-action="md">导出Markdown</button>
        <button type="button" data-action="reset">恢复原文…</button><button type="button" data-action="exit">退出</button>
      </div><p class="editor-status" role="status" aria-live="polite"></p>
    </section>`;
  document.body.prepend(root);
  const panel = root.querySelector('.editor-panel'), launch = root.querySelector('.editor-launch');
  const status = root.querySelector('.editor-status'), pendingBox = root.querySelector('.editor-pending');
  const button = name => root.querySelector(`[data-action="${name}"]`);
  function say(text) { status.textContent = text; }
  function changed() {
    return fields.filter(el => el.textContent !== originals.get(el.dataset.editId)).map(el => ({
      page, id: el.dataset.editId, location: el.dataset.editLocation,
      original: originals.get(el.dataset.editId), updated: el.textContent,
      time: times.get(el.dataset.editId) || new Date().toISOString()
    }));
  }
  function report() { return { version, page, initialFingerprint, time: new Date().toISOString(), fields: changed() }; }
  function save() {
    clearTimeout(timer);
    if (pending || composing) return;
    try {
      const draft = report();
      if (draft.fields.length) localStorage.setItem(key, JSON.stringify(draft));
      else localStorage.removeItem(key);
      say(draft.fields.length ? '草稿已保存 · 仅当前浏览器' : '当前无改动');
    } catch (e) { say('未自动保存：' + (e.name === 'QuotaExceededError' ? '存储容量不足' : '浏览器存储不可用') + '，请导出保存。'); }
  }
  function schedule() { clearTimeout(timer); say('有改动，尚未自动保存…'); timer = setTimeout(save, 500); }
  function controls() {
    button('undo').disabled = !undo.length || !!pending;
    button('redo').disabled = !redo.length || !!pending;
    button('preview').hidden = preview; button('resume').hidden = !preview;
    button('reset').disabled = !!pending;
    document.documentElement.classList.toggle('copy-editing', active && !preview && !pending);
    fields.forEach(el => {
      if (active && !preview && !pending) { el.setAttribute('contenteditable', 'plaintext-only'); el.setAttribute('spellcheck', 'false'); }
      else { el.removeAttribute('contenteditable'); el.removeAttribute('spellcheck'); }
    });
    window.dispatchEvent(new CustomEvent('copy-editor-state', { detail: { active: active || !!pending } }));
  }
  window.copyEditor = { get active() { return active || !!pending; } };
  function mode(on, viewing = false) {
    active = on; preview = viewing; panel.hidden = !on && !pending; launch.hidden = false;
    launch.textContent = on || pending ? '文案工具 ↑' : '编辑文案';
    lastInput = null; controls();
  }
  function download(text, suffix, mime) {
    const blob = new Blob([text], { type: mime + ';charset=utf-8' });
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = decodeURIComponent(location.pathname.split('/').pop() || 'index.html').replace(/\.html?$/i, '') + suffix;
    root.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
  function exportHTML() {
    const clean = template.cloneNode(true);
    clean.querySelectorAll('[data-edit-id]').forEach(el => { el.textContent = byId.get(el.dataset.editId).textContent; });
    download(doctype + '\n' + clean.outerHTML + '\n', '.html', 'text/html');
  }
  function markdown(data) {
    // Indented code blocks preserve newlines, pipes and user-supplied Markdown literally.
    const code = s => String(s).split('\n').map(line => '    ' + line).join('\n');
    return '# 页面文案修改清单\n\n' + '页面：' + data.page + '\n\n时间：' + data.time + '\n\n' + data.fields.map(f =>
      '## ' + f.id + '\n\n页面：' + f.page + '\n\n位置：\n\n' + code(f.location) + '\n\n时间：' + f.time + '\n\n原文：\n\n' + code(f.original) + '\n\n新文：\n\n' + code(f.updated) + '\n').join('\n');
  }
  function apply(id, text) { byId.get(id).textContent = text; times.set(id, new Date().toISOString()); }
  function record(id, before, after, kind) {
    if (before === after) return;
    const now = Date.now(), tail = undo[undo.length - 1];
    if (kind === 'typing' && lastInput && lastInput.id === id && now - lastInput.time < 1000 && tail && tail.id === id && tail.kind === kind) tail.after = after;
    else undo.push({ id, before, after, kind });
    lastInput = kind === 'typing' ? { id, time: now } : null;
    redo = []; times.set(id, new Date().toISOString()); controls(); schedule();
  }
  function history(back) {
    if (pending) return;
    const source = back ? undo : redo, dest = back ? redo : undo;
    const entry = source.pop(); if (!entry) return;
    if (entry.batch) entry.batch.forEach(e => apply(e.id, back ? e.before : e.after));
    else apply(entry.id, back ? entry.before : entry.after);
    dest.push(entry); lastInput = null; controls(); schedule();
  }
  function reset() {
    if (!confirm('确认恢复本次打开 HTML 时的原文？可使用撤销找回本轮修改。')) return;
    const batch = changed().map(f => ({ id: f.id, before: f.updated, after: f.original }));
    if (!batch.length) return;
    batch.forEach(e => apply(e.id, e.after)); undo.push({ batch }); redo = []; lastInput = null; controls(); schedule();
  }
  function clearPending(restore) {
    const old = pending;
    if (restore && conflict) return;
    let discardFailed = false;
    if (!restore) {
      try { localStorage.removeItem(key); } catch (e) { discardFailed = true; }
    }
    pending = null; pendingBox.hidden = true;
    if (restore) {
      const batch = old.fields.map(f => ({ id: f.id, before: originals.get(f.id), after: f.updated }));
      batch.forEach(e => apply(e.id, e.after)); undo.push({ batch });
    }
    mode(true); if (restore) save(); else say(discardFailed ? '未自动保存：浏览器存储不可用。仅本次忽略旧草稿，刷新可能再次提示；仍可编辑并导出。' : '已放弃旧草稿，当前为原文');
  }
  root.addEventListener('click', e => {
    const b = e.target.closest('[data-action]'); if (!b) return;
    switch (b.dataset.action) {
      case 'enter': if (!active) mode(true); panel.scrollIntoView({ block: 'start' }); break;
      case 'exit': save(); mode(false); break;
      case 'preview': mode(true, true); break;
      case 'resume': mode(true); break;
      case 'undo': history(true); break;
      case 'redo': history(false); break;
      case 'reset': reset(); break;
      case 'html': exportHTML(); break;
      case 'json': download(JSON.stringify(report(), null, 2), '.changes.json', 'application/json'); break;
      case 'md': download(markdown(report()), '.changes.md', 'text/markdown'); break;
      case 'old': download(JSON.stringify(pending, null, 2), '.old-draft.json', 'application/json'); break;
      case 'restore': clearPending(true); break;
      case 'discard': clearPending(false); break;
    }
  });
  // Capture before site.js listeners so navigation cannot win while editing or previewing.
  ['click', 'auxclick'].forEach(type => document.addEventListener(type, e => {
    if (window.copyEditor.active && !root.contains(e.target) && e.target.closest('a')) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true));
  document.addEventListener('keydown', e => {
    if (!active || pending || composing || e.isComposing) return;
    if ((e.metaKey || e.ctrlKey) && !e.altKey && ['z', 'y'].includes(e.key.toLowerCase())) {
      e.preventDefault(); history(e.key.toLowerCase() === 'z' && !e.shiftKey);
    }
  }, true);
  function editable(target) { return target.closest('[data-edit-id][contenteditable]'); }
  const before = new Map();
  document.addEventListener('beforeinput', e => {
    const el = editable(e.target); if (!el || composing || e.isComposing) return;
    if (e.inputType === 'historyUndo' || e.inputType === 'historyRedo') { e.preventDefault(); history(e.inputType === 'historyUndo'); return; }
    if (e.inputType.startsWith('format') || ['insertOrderedList', 'insertUnorderedList', 'insertFromDrop', 'insertFromPaste'].includes(e.inputType)) { e.preventDefault(); return; }
    before.set(el.dataset.editId, el.textContent);
  });
  document.addEventListener('input', e => {
    const el = editable(e.target); if (!el || composing || e.isComposing) return;
    const id = el.dataset.editId;
    record(id, before.get(id) ?? originals.get(id), el.textContent, 'typing');
    before.set(id, el.textContent);
  });
  document.addEventListener('compositionstart', e => { const el = editable(e.target); if (el) { clearTimeout(timer); composing = true; before.set(el.dataset.editId, el.textContent); } });
  document.addEventListener('compositionend', e => {
    const el = editable(e.target); composing = false;
    if (el) { const id = el.dataset.editId; record(id, before.get(id) ?? originals.get(id), el.textContent, 'composition'); before.set(id, el.textContent); schedule(); }
  });
  // Keep selection inside one text leaf: deleting across leaves must never delete tags or emphasis.
  function constrainSelection(el) {
    const sel = getSelection(); if (!sel.rangeCount) return null;
    let range = sel.getRangeAt(0);
    if (!el.contains(range.startContainer) || !el.contains(range.endContainer)) {
      range = document.createRange(); range.selectNodeContents(el); range.collapse(false); sel.removeAllRanges(); sel.addRange(range);
    }
    return range;
  }
  document.addEventListener('beforeinput', e => { const el = editable(e.target); if (el) constrainSelection(el); }, true);
  function insertText(el, text, atDrop) {
    el.focus(); let range;
    if (atDrop && document.caretRangeFromPoint) { range = document.caretRangeFromPoint(atDrop.x, atDrop.y); if (range && el.contains(range.startContainer)) { const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range); } }
    range = constrainSelection(el);
    if (!range) { range = document.createRange(); range.selectNodeContents(el); range.collapse(false); }
    const old = el.textContent;
    range.deleteContents(); const node = document.createTextNode(text); range.insertNode(node); range.setStartAfter(node); range.collapse(true);
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(range);
    record(el.dataset.editId, old, el.textContent, 'insert'); before.set(el.dataset.editId, el.textContent);
  }
  document.addEventListener('paste', e => { const el = editable(e.target); if (el) { e.preventDefault(); insertText(el, e.clipboardData.getData('text/plain')); } });
  document.addEventListener('dragover', e => { if (active) e.preventDefault(); });
  document.addEventListener('drop', e => { if (!active) return; e.preventDefault(); const el = editable(e.target); if (el) insertText(el, e.dataTransfer.getData('text/plain'), { x: e.clientX, y: e.clientY }); });
  document.addEventListener('focusout', e => { if (e.target.matches('[data-edit-id]')) lastInput = null; });
  window.addEventListener('pagehide', () => { if (!pending) save(); });
  // Another tab's draft must be resolved before this tab can save over it.
  window.addEventListener('storage', e => { if (e.key === key && e.newValue) { loadDraft(e.newValue); } });
  function loadDraft(raw) {
    try {
      pending = JSON.parse(raw);
      conflict = pending.version !== version || pending.page !== page || pending.initialFingerprint !== initialFingerprint || !Array.isArray(pending.fields) || pending.fields.some(f => !byId.has(f.id) || f.original !== originals.get(f.id) || typeof f.updated !== 'string');
    } catch (e) { pending = { raw }; conflict = true; }
    clearTimeout(timer); pendingBox.hidden = false;
    pendingBox.querySelector('p').textContent = conflict ? '原文基线已变化或草稿格式不兼容。已阻止覆盖；请导出旧草稿或放弃。' : '发现本页草稿。请选择恢复或放弃，原文尚未被覆盖。';
    button('restore').hidden = conflict;
    mode(true); say(conflict ? '基线冲突 · 未应用旧草稿' : '等待选择草稿');
  }
  try { const raw = localStorage.getItem(key); if (raw) loadDraft(raw); else say('当前无改动'); }
  catch (e) { say('未自动保存：浏览器存储不可用，请导出保存。'); }
  // Dock panel in document flow while open; launcher alone stays in the corner.
})();
