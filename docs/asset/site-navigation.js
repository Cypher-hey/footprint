/* One sitewide disclosure, backed only by FootprintNavigation. */
(function () {
  'use strict';
  var domains = window.FootprintNavigation.domains;
  var header = document.createElement('header'); header.className = 'footprint-header';
  header.innerHTML = '<a class="footprint-brand" href="#/">footprint<span>.</span></a><button type="button" class="catalog-trigger" aria-controls="footprint-catalog" aria-expanded="false">知识库</button><nav class="catalog-quick" aria-label="一级知识分类"></nav><button type="button" class="catalog-arrow" aria-label="展开完整知识库" aria-controls="footprint-catalog" aria-expanded="false">⌄</button>';
  var panel = document.createElement('section'); panel.id = 'footprint-catalog'; panel.className = 'catalog-panel'; panel.hidden = true; panel.setAttribute('aria-label', '知识库导航面板');
  panel.innerHTML = '<div class="catalog-head"><h2>知识库</h2><input type="search" class="catalog-search" placeholder="筛选标题 / 路径 / 分组" aria-label="筛选导航标题、路径或所属分组"><button type="button" class="catalog-close" aria-label="关闭知识库">×</button></div><nav class="catalog-primary catalog-row" aria-label="一级分类"></nav><nav class="catalog-secondary catalog-row" aria-label="二级分组"></nav><p class="catalog-location" aria-live="polite"></p><div class="catalog-articles"></div><p class="catalog-foot">导航筛选 · 标题、路径与所属分组 · Esc 关闭</p>';
  document.body.appendChild(header); document.body.appendChild(panel);
  var quick = header.querySelector('.catalog-quick'), primary = panel.querySelector('.catalog-primary'), secondary = panel.querySelector('.catalog-secondary'), entries = panel.querySelector('.catalog-articles'), search = panel.querySelector('.catalog-search'), locationLabel = panel.querySelector('.catalog-location');
  var domain = 0, group = 0, opener = null, hoverTimer, closeTimer, pinned = false;
  var initialPath = decodeURI(location.hash.split('?')[0].slice(1));
  domains.forEach(function (d, i) {d.groups.forEach(function (g, j) {if (g.articles.some(function (a) {return a.path === initialPath;})) {domain = i; group = j;}});});
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  function button(title, index, className) {var b = document.createElement('button'); b.type = 'button'; b.textContent = title; b.dataset.index = index; b.className = className; return b;}
  domains.forEach(function (d, i) {
    var b = button(d.title, i, 'catalog-quick-tab'); b.setAttribute('aria-controls', panel.id); b.setAttribute('aria-expanded', 'false'); quick.appendChild(b);
    primary.appendChild(button(d.title, i, 'catalog-level'));
  });
  var triggers = Array.from(header.querySelectorAll('button'));
  // Preserve the existing auxiliary site links inside the same disclosure.
  var footer = panel.querySelector('.catalog-foot');
  [['百度', 'http://www.baidu.com'], ['CodePen', 'https://codepen.io/pen/'], ['GitHub', 'https://github.com/heydadaya/footprint']].forEach(function (entry) {var a = document.createElement('a'); a.textContent = entry[0]; a.href = entry[1]; a.target = '_blank'; a.rel = 'noopener noreferrer'; footer.appendChild(a);});
  function expanded() {triggers.forEach(function (b) {b.setAttribute('aria-expanded', String(!panel.hidden && (!b.classList.contains('catalog-quick-tab') || Number(b.dataset.index) === domain)));});}
  function article(a, d, g) {
    var link = document.createElement('a'); link.className = 'catalog-article'; link.href = '#' + a.path; link.dataset.article = a.id;
    var title = document.createElement('strong'); title.textContent = a.title;
    var context = document.createElement('span'); context.textContent = d.title + ' / ' + g.title;
    var path = document.createElement('small'); path.textContent = a.path;
    link.appendChild(title); link.appendChild(context); link.appendChild(path);
    if (decodeURI(location.hash.split('?')[0].slice(1)) === a.path) link.setAttribute('aria-current', 'page');
    entries.appendChild(link);
  }
  function render() {
    var d = domains[domain], g = d.groups[group], query = search.value.trim().toLocaleLowerCase();
    primary.querySelectorAll('button').forEach(function (b, i) {b.setAttribute('aria-pressed', String(i === domain));});
    secondary.replaceChildren();
    d.groups.forEach(function (g, i) {var b = button(g.title, i, 'catalog-level'); b.setAttribute('aria-pressed', String(i === group)); secondary.appendChild(b);});
    entries.replaceChildren();
    if (query) {
      domains.forEach(function (d) {d.groups.forEach(function (g) {g.articles.forEach(function (a) {if ((d.title + ' ' + g.title + ' ' + a.title + ' ' + a.path).toLocaleLowerCase().includes(query)) article(a, d, g);});});});
      locationLabel.textContent = '全部分类 · ' + entries.childElementCount + ' 条匹配';
      if (!entries.childElementCount) {var empty = document.createElement('p'); empty.className = 'catalog-empty'; empty.textContent = '没有匹配的导航条目，请换一个标题、路径或分组。'; entries.appendChild(empty);}
    } else {locationLabel.textContent = d.title + ' / ' + g.title + ' · ' + g.articles.length + ' 篇'; g.articles.forEach(function (a) {article(a, d, g);});}
    expanded();
  }
  function cancel() {clearTimeout(hoverTimer); clearTimeout(closeTimer);}
  function show(b, index, keyboard) {
    cancel(); opener = b;
    if (index !== undefined && domain !== index) {domain = index; group = 0;}
    panel.hidden = false; render();
    if (keyboard) {pinned = true; primary.querySelectorAll('button')[domain].focus({preventScroll: true});}
  }
  function close(restore) {cancel(); panel.hidden = true; pinned = false; expanded(); if (restore && opener) opener.focus({preventScroll: true});}
  function delayed(fn) {cancel(); hoverTimer = setTimeout(fn, 140);}
  function leave(e) {
    if (e.relatedTarget && (panel.contains(e.relatedTarget) || header.contains(e.relatedTarget))) return;
    clearTimeout(hoverTimer); clearTimeout(closeTimer);
    closeTimer = setTimeout(function () {if (!pinned && !panel.contains(document.activeElement)) close(false);}, 300);
  }
  triggers.forEach(function (b) {
    var index = b.classList.contains('catalog-quick-tab') ? Number(b.dataset.index) : undefined;
    b.addEventListener('pointerenter', function (e) {if (fine.matches && e.pointerType !== 'touch') delayed(function () {show(b, index);});});
    b.addEventListener('click', function () {
      if (!panel.hidden && pinned && index === undefined) {close(true); return;}
      pinned = true; show(b, index);
    });
    b.addEventListener('keydown', function (e) {if (e.key === 'ArrowDown') {e.preventDefault(); show(b, index, true);}});
  });
  function select(row, index) {
    if ((row === primary && domain === index) || (row !== primary && group === index)) return;
    if (row === primary) {if (domain !== index) {domain = index; group = 0;}}
    else group = index;
    render();
  }
  [primary, secondary].forEach(function (row) {
    row.addEventListener('pointerover', function (e) {var b = e.target.closest('button'); if (b && fine.matches && e.pointerType !== 'touch') delayed(function () {select(row, Number(b.dataset.index));});});
    row.addEventListener('pointerleave', function () {clearTimeout(hoverTimer);});
    row.addEventListener('click', function (e) {var b = e.target.closest('button'); if (!b) return; cancel(); pinned = true; var i = Number(b.dataset.index); select(row, i); row.querySelectorAll('button')[i].focus({preventScroll: true});});
    row.addEventListener('keydown', function (e) {
      var b = e.target.closest('button'); if (!b) return; var i = Number(b.dataset.index), count = row.childElementCount, next;
      if (e.key === 'ArrowRight') next = (i + 1) % count;
      if (e.key === 'ArrowLeft') next = (i + count - 1) % count;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = count - 1;
      if (next !== undefined) {e.preventDefault(); select(row, next); row.querySelectorAll('button')[next].focus({preventScroll: true});}
      if (e.key === 'ArrowDown') {e.preventDefault(); (row === primary ? secondary.querySelectorAll('button')[group] : entries.querySelector('a'))?.focus({preventScroll: true});}
    });
  });
  [header, panel].forEach(function (el) {el.addEventListener('pointerenter', function () {clearTimeout(closeTimer);}); el.addEventListener('pointerleave', leave);});
  search.addEventListener('input', render);
  search.addEventListener('focus', function () {pinned = true;});
  panel.querySelector('.catalog-close').addEventListener('click', function () {close(true);});
  entries.addEventListener('click', function (e) {if (e.target.closest('a') && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) close(true);});
  document.addEventListener('keydown', function (e) {if (e.key === 'Escape' && !panel.hidden) {e.preventDefault(); close(true);}});
  document.addEventListener('pointerdown', function (e) {if (!header.contains(e.target) && !panel.contains(e.target)) close(false);});
  document.addEventListener('focusin', function (e) {if (!panel.hidden && !header.contains(e.target) && !panel.contains(e.target)) close(false);});
  window.addEventListener('hashchange', function () {close(false);});
  function fit() {
    var tabs = Array.from(quick.children); tabs.forEach(function (b) {b.hidden = false;});
    var available = quick.clientWidth, used = 0, overflow = false;
    tabs.forEach(function (b) {used += b.getBoundingClientRect().width + 4; if (used > available) overflow = true; b.hidden = overflow;});
    if (opener && opener.hidden && !panel.hidden) {opener = header.querySelector('.catalog-arrow');}
  }
  new ResizeObserver(fit).observe(header); window.addEventListener('resize', fit); document.fonts.ready.then(fit); fit();
})();
