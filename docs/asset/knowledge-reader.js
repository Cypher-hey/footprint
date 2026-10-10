/* Progressive enhancement: Markdown remains the complete author source. */
(function () {
  'use strict';
  var labels = ['完整口语答案', '书面精讲', '概念图解'];
  var keys = ['oral', 'written', 'diagram'];
  var queued = false;
  var rendering = false;
  var figureCounter = 0;
  function route() {
    var hash = location.hash.slice(1).split('?');
    return { path: hash[0], params: new URLSearchParams(hash.slice(1).join('?')) };
  }
  function remembered() {
    try { return localStorage.getItem('footprint.reading-view'); } catch (_) { return null; }
  }
  function choose(root, key, persist, focus) {
    var panels = Array.from(root.querySelectorAll('.knowledge-panel'));
    var tabs = Array.from(root.querySelectorAll('[role="tab"]'));
    if (keys.indexOf(key) < 0) key = 'oral';
    panels.forEach(function (panel, i) {
      panel.hidden = keys[i] !== key;
      tabs[i].setAttribute('aria-selected', String(keys[i] === key));
      tabs[i].tabIndex = keys[i] === key ? 0 : -1;
    });
    root.dataset.view = key;
    if (persist) {
      try { localStorage.setItem('footprint.reading-view', key); } catch (_) { /* private mode */ }
      var r = route();
      r.params.set('view', key);
      r.params.delete('id');
      history.replaceState(null, '', location.pathname + location.search + '#' + r.path + '?' + r.params);
    }
    if (focus) tabs[keys.indexOf(key)].focus();
    schedule();
  }
  function revealAnchor(root) {
    var id = route().params.get('id');
    if (!id) return false;
    var target = document.getElementById(id);
    if (!target || !root.contains(target)) return false;
    var panel = target.closest('.knowledge-panel');
    if (panel) choose(root, panel.dataset.key, false, false);
    requestAnimationFrame(function () { target.scrollIntoView({ block: 'start' }); });
    return true;
  }
  function enhance(root) {
    if (root.dataset.knowledgeReady && root.querySelector('.knowledge-panel')) return;
    delete root.dataset.knowledgeReady;
    root.classList.remove('knowledge-reader');
    var children = Array.from(root.children);
    var headings = children.filter(function (el) { return el.tagName === 'H2'; });
    var title = function (el) { return el.textContent.trim(); };
    var summary = headings.find(function (el) { return title(el) === '先用这条主线回答'; });
    var starts = labels.map(function (label) { return headings.find(function (el) { return title(el) === label; }); });
    if (!summary || starts.some(function (el) { return !el; })) return;
    var indices = starts.map(function (el) { return children.indexOf(el); });
    if (!(children.indexOf(summary) < indices[0] && indices[0] < indices[1] && indices[1] < indices[2])) return;
    root.dataset.knowledgeReady = 'true';
    root.classList.add('knowledge-reader');
    var summaryBox = document.createElement('section');
    summaryBox.className = 'knowledge-summary';
    summaryBox.setAttribute('aria-label', '先用这条主线回答');
    root.insertBefore(summaryBox, summary);
    children.slice(children.indexOf(summary), indices[0]).forEach(function (el) { summaryBox.appendChild(el); });
    var tablist = document.createElement('div');
    tablist.className = 'knowledge-tabs';
    tablist.setAttribute('role', 'tablist');
    tablist.setAttribute('aria-label', '知识表达视图');
    root.insertBefore(tablist, starts[0]);
    starts.forEach(function (heading, i) {
      var panel = document.createElement('section');
      panel.className = 'knowledge-panel';
      panel.id = 'knowledge-panel-' + keys[i];
      panel.dataset.key = keys[i];
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', 'knowledge-tab-' + keys[i]);
      panel.tabIndex = 0;
      root.insertBefore(panel, heading);
      children.slice(indices[i], i < 2 ? indices[i + 1] : children.length).forEach(function (el) { panel.appendChild(el); });
      heading.classList.add('knowledge-view-heading');
      var button = document.createElement('button');
      button.type = 'button';
      button.id = 'knowledge-tab-' + keys[i];
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', panel.id);
      button.textContent = labels[i];
      button.addEventListener('click', function () { choose(root, keys[i], true, false); });
      button.addEventListener('keydown', function (event) {
        var next;
        if (event.key === 'ArrowRight') next = (i + 1) % 3;
        if (event.key === 'ArrowLeft') next = (i + 2) % 3;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = 2;
        if (next !== undefined) { event.preventDefault(); choose(root, keys[next], true, true); }
      });
      tablist.appendChild(button);
    });
    choose(root, route().params.get('view') || remembered() || 'oral', false, false);
    revealAnchor(root);
  }
  async function diagrams() {
    if (rendering || !window.mermaid) return;
    var codes = Array.from(document.querySelectorAll('.markdown-body pre > code')).filter(function (code) {
      return /(?:lang|language)-mermaid/.test(code.className) && !code.dataset.diagramDone && !code.closest('[hidden]');
    });
    if (!codes.length) return;
    rendering = true;
    try {
      if (!diagrams.initialized) {
        mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'neutral', flowchart: { htmlLabels: false, useMaxWidth: true }, fontFamily: 'system-ui, sans-serif' });
        diagrams.initialized = true;
      }
      for (var code of codes) {
        code.dataset.diagramDone = 'true';
        var pre = code.parentElement;
        try {
          var result = await mermaid.render('footprint-diagram-' + (++figureCounter), code.textContent.trim());
          if (!pre.isConnected) continue;
          var figure = document.createElement('figure');
          figure.className = 'knowledge-diagram';
          var graphic = document.createElement('div');
          graphic.className = 'knowledge-diagram-scroll';
          graphic.innerHTML = result.svg;
          var svg = graphic.querySelector('svg');
          if (svg) { svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', '机制图，文字说明与图源见下方'); }
          figure.appendChild(graphic);
          var details = document.createElement('details');
          var summary = document.createElement('summary');
          summary.textContent = '查看 Mermaid 图源';
          details.appendChild(summary);
          pre.replaceWith(figure);
          details.appendChild(pre);
          figure.appendChild(details);
        } catch (error) {
          if (!pre.isConnected) continue;
          var note = document.createElement('p');
          note.className = 'knowledge-diagram-error';
          note.textContent = '此图暂未渲染，已保留图源，请结合下方文字说明阅读。';
          pre.before(note);
        }
      }
    } finally { rendering = false; schedule(); }
  }
  function refresh() {
    queued = false;
    document.querySelectorAll('.markdown-body').forEach(enhance);
    diagrams();
  }
  function schedule() {
    if (!queued) { queued = true; requestAnimationFrame(refresh); }
  }
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  window.addEventListener('hashchange', function () {
    document.querySelectorAll('.knowledge-reader').forEach(function (root) {
      if (!revealAnchor(root)) choose(root, route().params.get('view') || remembered() || 'oral', false, false);
    });
    schedule();
  });
  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('[jump-to-id]');
    if (!link) return;
    var target = document.getElementById(link.getAttribute('jump-to-id'));
    var panel = target && target.closest('.knowledge-panel');
    if (panel) choose(panel.closest('.knowledge-reader'), panel.dataset.key, false, false);
  }, true);
  window.addEventListener('load', schedule);
  schedule();
})();
