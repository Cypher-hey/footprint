/* Docute adapter: preserve the bundled parser, TOC and ordinary loader. */
(function () {
  'use strict';
  var manifest = window.FootprintTopics, cache = new Map(), epoch = 0, activePage, api;
  var selected, focusMode, focusTopic, positions = new Map(), lastURL = '', restoring = false, normalizing = '';
  var aliases = {oral: 'overview', written: 'explanation', diagram: 'diagrams'};
  function escape(s) {return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');}
  function route() {var parts = location.hash.slice(1).split('?'); return {path: decodeURI(parts[0]), params: new URLSearchParams(parts.slice(1).join('?'))};}
  function resolveRoute(r) {
    if (!manifest || manifest.formatVersion !== 1) return null;
    var mapping = manifest.routes[r.path]; if (!mapping) return null;
    var t = manifest.topics.find(function (t) {return t.id === (typeof mapping === 'string' ? mapping : mapping.topic);});
    var requested = r.params.get('view') || r.params.get('mode') || (typeof mapping === 'object' && mapping.mode) || t.defaultMode;
    var mode = aliases[requested] || requested, notice = '', id = r.params.get('id') || '';
    if (mode !== 'all' && !t.modes.some(function (m) {return m.id === mode;})) {notice = '未知阅读模式，已返回默认模式。'; mode = t.defaultMode;}
    var legacy = t.legacyAnchors[id];
    if (id && !r.params.has('view') && !r.params.has('mode') && legacy) {mode = legacy.mode; id = legacy.id;}
    if (id && mode !== 'all') {
      var current = t.modes.find(function (m) {return m.id === mode;});
      if (id !== t.titleAnchor && !current.anchors.includes(id) && !current.headingIds.includes(id)) {
        var other = t.modes.find(function (m) {return m.anchors.includes(id) || m.headingIds.includes(id);});
        if (other) mode = other.id;
        else if (legacy) {mode = legacy.mode; id = legacy.id;}
        else {notice += ' 未找到此锚点，已显示模式顶部。'; id = '';}
      }
    }
    return {topic: t, mode: mode, id: id, notice: notice};
  }
  function href(t, mode, id) {return '#' + t.legacyRoutes[0] + '?view=' + mode + (id ? '&id=' + encodeURIComponent(id) : '');}
  function header(state, status) {
    return '# ' + state.topic.title + '\n\n<div class="knowledge-topic" data-topic="' + escape(state.topic.id) + '" data-mode="' + state.mode + '" data-status="' + status + '"></div>\n\n' +
      '<section class="knowledge-summary" aria-label="主题摘要">' + escape(state.topic.summary) + '</section>\n\n' +
      (state.notice ? '<p class="knowledge-notice" role="status">' + escape(state.notice) + '</p>\n\n' : '');
  }
  async function resource(mode) {
    var key = manifest.version + ':' + mode.resource;
    if (cache.has(key)) return cache.get(key);
    var promise = fetch(new URL(mode.resource, document.baseURI), {cache: 'no-cache'}).then(async function (response) {
      if (!response.ok) throw Error('HTTP ' + response.status);
      var text = await response.text();
      if (text.length > 300000 || /<(?:script|iframe|object)\b/i.test(text)) throw Error('无效内容资源');
      return text;
    });
    cache.set(key, promise);
    try {return await promise;} catch (e) {cache.delete(key); throw e;}
  }
  function container() {return activePage && activePage.$refs.contentWrap;}
  function savePosition() {var el = container(); if (el && lastURL) positions.set(lastURL, el.scrollTop);}
  function readyPosition(state, token) {
    if (token !== epoch) return;
    var el = container(); if (!el) return;
    if (state.id) {var target = document.getElementById(state.id); if (target) {target.scrollIntoView({block: 'start'}); api.store.dispatch('updateActiveId', state.id);}}
    else el.scrollTop = state.restoreTop || 0;
  }
  window.FootprintReader = function (plugin) {
    api = plugin;
    plugin.Vue.mixin({
      beforeCreate: function () {
        var methods = this.$options.methods;
        if (!methods || !methods.fetchData || !methods.handleRelation) return;
        var original = methods.fetchData;
        this.$options.methods = Object.assign({}, methods, {fetchData: async function () {
          activePage = this;
          var token = ++epoch, vm = this, snapshot = this.$route, state = resolveRoute(route());
          if (state) state.restoreTop = restoring ? (positions.get(href(state.topic, state.mode, state.id)) || 0) : 0;
          selected = state;
          // Freeze route and source for each call, and reject every stale store update (including ordinary pages).
          var facade = Object.create(vm);
          Object.defineProperties(facade, {
            $route: {value: snapshot}, currentNavSource: {value: vm.currentNavSource},
            updatePage: {value: function (page) {if (token === epoch) vm.updatePage(page);}},
            jumpToId: {value: function (id) {if (token === epoch && !state) vm.jumpToId(id);}}
          });
          function parse(markdown) {Object.defineProperty(facade, 'currentNavItem', {value: {markdown: markdown}, configurable: true}); return original.call(facade);}
          if (!state) {Object.defineProperty(facade, 'currentNavItem', {value: vm.currentNavItem}); lastURL = location.hash; return original.call(facade);}
          var canonical = href(state.topic, state.mode, state.id);
          if (location.hash !== canonical) {normalizing = canonical.slice(1); history.replaceState(history.state, '', location.pathname + location.search + canonical); plugin.router.replace(canonical.slice(1)); setTimeout(function () {normalizing = '';}, 0);}
          lastURL = canonical;
          await parse(header(state, 'loading') + '<p role="status">正在加载当前模式…</p>');
          try {
            var markdown;
            if (state.mode === 'all') {
              var contents = await Promise.all(state.topic.modes.map(resource));
              markdown = contents.map(function (text, i) {var mode = state.topic.modes[i]; return '## ' + mode.label + '\n\n' + text.replace(/^(#{2,5}) /gm, '$1# ').replace(/<a id="([^"]+)"/g, '<a id="' + mode.id + '-$1"');}).join('\n\n');
            } else markdown = await resource(state.topic.modes.find(function (m) {return m.id === state.mode;}));
            if (token !== epoch) return;
            await parse(header(state, 'ready') + markdown); await vm.$nextTick();
            requestAnimationFrame(function () {readyPosition(state, token);});
          } catch (e) {
            if (token !== epoch) return;
            await parse(header(state, 'error') + '<p class="knowledge-load-error" role="alert">当前模式加载失败（' + escape(e.message) + '），其他模式仍可切换。</p>\n\n<button type="button" class="knowledge-retry">重试当前模式</button>');
          }
        }});
      },
      mounted: function () {
        if (!this.$options.methods || !this.$options.methods.handleRelation) return;
        var vm = this;
        this.$watch('$route.fullPath', function (to, from) {if (to === normalizing) {normalizing = ''; return;} if (to.split('?')[0] === from.split('?')[0] && resolveRoute(route())) vm.fetchData();});
        var el = this.$refs.contentWrap;
        if (el) el.addEventListener('scroll', function () {if (selected && !selected.id) savePosition();}, {passive: true});
      }
    });
    plugin.router.beforeEach(function (to, from, next) {savePosition(); next();});
    window.addEventListener('popstate', function () {restoring = true;});
  };
  function enhance(root) {
    var marker = root.querySelector('.knowledge-topic');
    if (!marker) {root.classList.remove('knowledge-reader'); delete root.dataset.view; return;}
    var t = manifest.topics.find(function (t) {return t.id === marker.dataset.topic;});
    root.classList.add('knowledge-reader'); root.dataset.view = marker.dataset.mode; root.dataset.contentVersion = manifest.version;
    if (root.querySelector('.knowledge-tabs')) return;
    var tablist = document.createElement('div'); tablist.className = 'knowledge-tabs'; tablist.setAttribute('role', 'tablist'); tablist.setAttribute('aria-label', '阅读模式');
    t.modes.forEach(function (mode, i) {
      var button = document.createElement('button'); button.type = 'button'; button.textContent = mode.label; button.id = 'knowledge-tab-' + mode.id;
      button.setAttribute('role', 'tab'); button.setAttribute('aria-controls', 'knowledge-panel'); button.setAttribute('aria-selected', String(mode.id === marker.dataset.mode)); button.tabIndex = mode.id === marker.dataset.mode ? 0 : -1;
      function choose(index, focus) {restoring = false; focusMode = focus ? t.modes[index].id : null; focusTopic = t.id; api.router.push(href(t, t.modes[index].id).slice(1));}
      button.addEventListener('click', function () {choose(i, false);});
      button.addEventListener('keydown', function (e) {
        var next;
        if (e.key === 'ArrowRight') next = (i + 1) % t.modes.length;
        if (e.key === 'ArrowLeft') next = (i + t.modes.length - 1) % t.modes.length;
        if (e.key === 'Home') next = 0;
        if (e.key === 'End') next = t.modes.length - 1;
        if (next !== undefined) {e.preventDefault(); choose(next, true);}
      }); tablist.appendChild(button);
    });
    root.querySelector('.knowledge-summary').after(tablist);
    var complete = document.createElement('p'); complete.className = 'knowledge-complete';
    var link = document.createElement('a'); link.href = href(t, 'all'); link.textContent = '完整内容（搜索 / 打印）'; complete.appendChild(link); tablist.after(complete);
    var panel = document.createElement('section'); panel.id = 'knowledge-panel'; panel.className = 'knowledge-panel'; panel.tabIndex = 0; panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-label', marker.dataset.mode === 'all' ? '完整内容' : t.modes.find(function (m) {return m.id === marker.dataset.mode;}).label); panel.setAttribute('aria-busy', String(marker.dataset.status === 'loading'));
    if (marker.dataset.mode !== 'all') panel.setAttribute('aria-labelledby', 'knowledge-tab-' + marker.dataset.mode);
    var siblings = []; for (var node = complete.nextSibling; node; node = node.nextSibling) siblings.push(node);
    root.appendChild(panel); siblings.forEach(function (node) {panel.appendChild(node);});
    var retry = panel.querySelector('.knowledge-retry'); if (retry) retry.addEventListener('click', function () {activePage.fetchData();});
    if (focusMode && focusTopic === t.id) {var tab = document.getElementById('knowledge-tab-' + focusMode); if (tab) tab.focus();}
    root.querySelectorAll('a[router-link]').forEach(function (link) {var target = link.getAttribute('router-link'); if (target.startsWith('/')) link.setAttribute('href', '#' + target); link.setAttribute('target', '_self');});
  }
  window.FootprintEnhance = enhance;
  window.FootprintResolve = resolveRoute;
  window.FootprintPosition = function () {if (selected) readyPosition(selected, epoch);};
  document.addEventListener('click', function (e) {if (e.target.closest && e.target.closest('a')) {restoring = false; focusMode = null;}}, true);
})();
