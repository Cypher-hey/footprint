/* Mermaid enhancement also applies to ordinary Docute notes. */
(function () {
  'use strict';
  var queued = false, rendering = false, figureCounter = 0;
  function route() {var parts = location.hash.slice(1).split('?'); return {path: parts[0], params: new URLSearchParams(parts.slice(1).join('?'))};}
  async function diagrams() {
    if (rendering) return;
    if (!window.mermaid) {
      if (document.readyState === 'complete') document.querySelectorAll('.markdown-body pre > code').forEach(function (code) {
        if (!/(?:lang|language)-mermaid/.test(code.className) || code.dataset.engineMissing) return;
        code.dataset.engineMissing = 'true';
        var note = document.createElement('p'); note.className = 'knowledge-diagram-unavailable knowledge-diagram-error';
        note.textContent = '图解引擎暂未加载，已保留 Mermaid 图源与文字说明。'; code.parentElement.before(note);
      });
      return;
    }
    var codes = Array.from(document.querySelectorAll('.markdown-body pre > code')).filter(function (code) {
      return /(?:lang|language)-mermaid/.test(code.className) && !code.dataset.diagramDone;
    });
    if (!codes.length) return;
    rendering = true;
    try {
      if (!diagrams.initialized) {
        mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', maxTextSize: 40000, maxEdges: 300, theme: 'neutral', flowchart: { htmlLabels: false, useMaxWidth: true }, fontFamily: 'system-ui, sans-serif' });
        diagrams.initialized = true;
      }
      for (var code of codes) {
        if (code.dataset.engineMissing) {
          var previous = code.parentElement.previousElementSibling;
          if (previous && previous.classList.contains('knowledge-diagram-unavailable')) previous.remove();
          delete code.dataset.engineMissing;
        }
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
    } finally { rendering = false; schedule(); if (window.FootprintPosition) window.FootprintPosition(); }
  }
  function refresh() {
    queued = false;
    document.querySelectorAll('.markdown-body').forEach(function (root) {
      if (window.FootprintEnhance) window.FootprintEnhance(root);
      root.querySelectorAll('a').forEach(function (link) {
        var href = link.getAttribute('href') || '';
        if (!/^[^:?#]+\.md(?:#.*)?$/.test(href)) return;
        var target = new URL(href, 'https://footprint.invalid' + route().path + '.md');
        var path = target.pathname.replace(/\.md$/, '');
        var params = new URLSearchParams(target.hash ? 'id=' + encodeURIComponent(decodeURIComponent(target.hash.slice(1))) : '');
        var mapped = window.FootprintResolve && window.FootprintResolve({path: path, params: params});
        if (mapped) {path = mapped.topic.legacyRoutes[0]; params.set('view', mapped.mode); if (mapped.id) params.set('id', mapped.id);}
        link.setAttribute('href', '#' + path + (params.size ? '?' + params : '')); link.setAttribute('target', '_self');
      });
    });
    diagrams();
  }
  function schedule() {if (!queued) {queued = true; requestAnimationFrame(refresh);}}
  new MutationObserver(schedule).observe(document.body, {childList: true, subtree: true});
  window.addEventListener('load', schedule);
  schedule();
})();
