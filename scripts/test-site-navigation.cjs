const {assertOutline} = require('./toc-assertions.cjs');
const {chromium, expect} = require(process.env.FOOTPRINT_PLAYWRIGHT || '@playwright/test');
const fs = require('node:fs'), path = require('node:path');
const base = process.env.FOOTPRINT_BASE || 'http://127.0.0.1:9094/';
const out = path.resolve(process.env.FOOTPRINT_EVIDENCE || 'evidence/site-navigation'); fs.mkdirSync(out, {recursive: true});
(async () => {
  const browser = await chromium.launch({channel: 'chrome', headless: true});
  const results = [], errors = [], requests = []; let page;
  const record = (name, data = {}) => {results.push({name, ...data}); console.log('PASS', name, JSON.stringify(data));};
  const shot = async name => {await expect(page.locator('#nprogress')).toHaveCount(0); await page.waitForTimeout(150); await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))); await page.screenshot({path: path.join(out, name)});};
  const primary = title => page.locator('.catalog-primary').getByRole('button', {name: title, exact: true});
  const secondary = title => page.locator('.catalog-secondary').getByRole('button', {name: title, exact: true});
  const bounds = async width => {
    const geom = await page.evaluate(() => {
      const rect = s => document.querySelector(s).getBoundingClientRect().toJSON();
      return {document: document.documentElement.scrollWidth, viewport: innerWidth, height: innerHeight, header: rect('.footprint-header'), panel: rect('.catalog-panel'), title: rect('.catalog-head h2'), search: rect('.catalog-search'), quick: [...document.querySelectorAll('.catalog-quick-tab')].map(b => ({hidden: b.hidden, rect: b.getBoundingClientRect().toJSON()}))};
    });
    expect(geom.document).toBe(width); expect(geom.header.width).toBe(width);
    expect(geom.panel.left).toBeGreaterThanOrEqual(0); expect(geom.panel.right).toBeLessThanOrEqual(width);
    expect(geom.panel.bottom).toBeLessThanOrEqual(geom.height);
    expect(Math.abs((geom.title.top + geom.title.height / 2) - (geom.search.top + geom.search.height / 2))).toBeLessThan(1);
    expect(geom.search.width).toBeGreaterThanOrEqual(140);
    let hidden = false; for (const t of geom.quick) {if (t.hidden) hidden = true; else {expect(hidden).toBe(false); expect(t.rect.right).toBeLessThanOrEqual(width - 44);}}
    return geom;
  };
  try {
    for (const [width, height, scale] of [[320,812,1],[375,812,1],[390,812,1],[768,812,1],[1440,900,1],[1920,900,1],[2560,1080,1],[1440,360,1],[320,360,1],[720,450,2]]) {
      const context = await browser.newContext({viewport: {width, height}, deviceScaleFactor: scale, isMobile: width < 769 && scale === 1, hasTouch: width < 769 && scale === 1});
      page = await context.newPage(); page.on('pageerror', e => errors.push(String(e))); page.on('requestfailed', r => requests.push({url: r.url(), error: r.failure()}));
      await page.goto(base + '#/note/ai/03-agent-loop'); await expect(page.locator('.knowledge-topic')).toHaveAttribute('data-status','ready');
      await page.locator('.catalog-arrow').click(); await expect(page.locator('.catalog-panel')).toBeVisible();
      await primary('源码专题').click(); await secondary('Webpack 5').click();
      const geom = await bounds(width);
      await expect(page.locator('.catalog-primary button')).toHaveCount(6);
      await expect(page.locator('.catalog-article')).toHaveCount(12);
      const last = page.locator('.catalog-article').last(); await last.scrollIntoViewIfNeeded(); await expect(last).toBeInViewport();
      await shot(`menu-${width}-${height}-${scale}.png`);
      await page.keyboard.press('Escape'); await expect(page.locator('.catalog-panel')).toBeHidden(); await expect(page.locator('.catalog-arrow')).toBeFocused();
      await page.locator('.catalog-trigger').focus(); await page.keyboard.press('ArrowDown'); await expect(primary('源码专题')).toBeFocused();
      await page.keyboard.press('End'); await expect(primary('语言')).toBeFocused(); await page.keyboard.press('ArrowDown'); await expect(secondary('English')).toBeFocused();
      await page.keyboard.press('ArrowRight'); await expect(secondary('Japanese')).toBeFocused(); await page.keyboard.press('ArrowDown'); await expect(page.locator('.catalog-article').first()).toBeFocused();
      await page.keyboard.press('Escape'); await expect(page.locator('.catalog-trigger')).toBeFocused();
      await page.locator('.catalog-arrow').click(); await page.locator('.catalog-search').fill('zz-no-navigation-result'); await expect(page.locator('.catalog-empty')).toBeVisible();
      await page.locator('.catalog-search').fill('zustand'); await expect(page.locator('.catalog-article')).toHaveCount(6);
      await primary('AI 知识').click(); await expect(page.locator('.catalog-article')).toHaveCount(6); // Global filtering stays explicit and stable across domain choices.
      await page.locator('.catalog-search').fill(''); await primary('前端开发').click(); await secondary('TypeScript').click(); await expect(page.locator('.catalog-article')).toHaveCount(2);
      await page.locator('.catalog-search').fill('/note/basis/array'); await expect(page.locator('.catalog-article')).toHaveCount(1); await page.locator('.catalog-article').click();
      await expect(page).toHaveURL(base + '#/note/basis/array'); await expect(page.locator('.markdown-body h1')).toContainText('数组'); await expect(page.locator('.catalog-panel')).toBeHidden();
      await expect(page.getByRole('tab')).toHaveCount(0); await expect(page.locator('.knowledge-rail')).toHaveCount(1);
      await expect(page.locator('.knowledge-chapter')).toHaveCount(await page.locator('.markdown-body h2[id],.markdown-body h3[id],.markdown-body h4[id],.markdown-body h5[id],.markdown-body h6[id]').count());
      await assertOutline(page, expect);
      const layout = await page.evaluate(() => {const main = document.querySelector('.main').getBoundingClientRect(), p = document.querySelector('.markdown-body p').getBoundingClientRect(), scroll = document.querySelector('.content-wrap');return {right:main.right,left:main.left,width:main.width,paragraph:p.width,document:document.documentElement.scrollWidth,article:scroll.scrollWidth,available:scroll.clientWidth};});
      expect(layout.right).toBe(width); expect(layout.document).toBe(width); expect(layout.article).toBe(layout.available); if (width >= 1920) expect(layout.paragraph).toBeLessThan(layout.width - 200);
      await page.locator('.catalog-arrow').click(); await page.mouse.click(width - 6, height - 4); await expect(page.locator('.catalog-panel')).toBeHidden();
      await page.goBack(); await expect(page.locator('.knowledge-topic')).toHaveAttribute('data-status','ready');
      await page.goForward(); await expect(page.locator('.markdown-body h1')).toContainText('数组');
      if (width < 769) {await page.locator('.knowledge-rail-toggle').click(); await expect(page.locator('.knowledge-chapter-name').first()).toBeVisible(); await page.keyboard.press('Escape'); await expect(page.locator('.knowledge-rail-toggle')).toBeFocused();}
      const ordinaryChapter = page.locator('.knowledge-chapters > li > .knowledge-chapter-row > .knowledge-chapter').nth(3), ordinaryHref = await ordinaryChapter.getAttribute('href');
      await ordinaryChapter.focus(); await page.keyboard.press('Enter'); await expect(page).toHaveURL(base + ordinaryHref);
      const ordinaryId = new URLSearchParams(ordinaryHref.split('?')[1]).get('id');
      await expect(page.locator('[id="' + ordinaryId + '"]')).toBeFocused();
      record(`${width}x${height} scale ${scale}`, {shownDomains: geom.quick.filter(t=>!t.hidden).length, searchWidth:geom.search.width, layout}); await context.close();
    }
    const context = await browser.newContext({viewport:{width:1440,height:900}}); page = await context.newPage();
    await page.goto(base + '#/note/ai/03-agent-loop'); await expect(page.locator('.knowledge-topic')).toHaveAttribute('data-status','ready');
    await page.locator('.catalog-quick-tab').nth(4).hover(); await expect(page.locator('.catalog-panel')).toBeVisible(); await expect(primary('源码专题')).toHaveAttribute('aria-pressed','true');
    await secondary('Preact').hover(); await expect(page.locator('.catalog-location')).toContainText('Preact');
    await primary('前端开发').hover(); await expect(primary('前端开发')).toHaveAttribute('aria-pressed','true'); await secondary('CSS 与布局').hover(); await expect(page.locator('.catalog-location')).toContainText('CSS 与布局');
    for (let i = 0; i < 4; i++) {await primary('AI 知识').hover(); await primary('源码专题').hover(); await page.locator('.catalog-quick-tab').nth(4).hover();}
    await page.mouse.move(1400,880); await page.waitForTimeout(120); await page.locator('.catalog-panel').hover(); await expect(page.locator('.catalog-panel')).toBeVisible();
    await page.mouse.move(1400,880); await expect(page.locator('.catalog-panel')).toBeHidden();
    await page.locator('.catalog-trigger').hover(); await expect(page.locator('.catalog-panel')).toBeVisible();
    await page.locator('.catalog-arrow').hover(); await expect(page.locator('.catalog-panel')).toBeVisible();
    await page.keyboard.press('Escape'); record('buffered hover across header/primary/secondary, fast movement and leave/reenter');
    await page.locator('.catalog-arrow').click(); await primary('源码专题').click(); await secondary('Zustand').click(); await shot('desktop-menu.png');
    await page.keyboard.press('Escape'); await page.setViewportSize({width:2560,height:1080}); await shot('wide-reading.png');
    await page.goto(base + '#/note/basis/array'); await expect(page.locator('.markdown-body h1')).toContainText('数组'); await shot('wide-ordinary-reading.png');
    // Every canonical real route must load through the actual Docute router.
    const routes = await page.evaluate(() => FootprintNavigation.domains.flatMap(d=>d.groups.flatMap(g=>g.articles.map(a=>a.path))));
    const topics = await page.evaluate(() => FootprintTopics.topics);
    for (const route of process.env.FOOTPRINT_SKIP_ROUTE_SWEEP ? routes.filter(p=>['/note/ai/03-agent-loop','/note/basis/array','/note/point/collect-js','/note/openclaw-agent/main','/note/sourceLearn/zustandAnalysis/ch02-store-creation'].includes(p)) : routes) {
      const topic = topics.find(t=>t.legacyRoutes.includes(route));
      const title = topic ? topic.title : fs.readFileSync(path.resolve(__dirname,'../docs'+route+'.md'),'utf8').match(/^#\s+(.+)$/m)[1].replace(/[*`]/g,'');
      await page.goto(base + '#' + route);
      await expect(page.locator('.markdown-body h1').first()).toHaveText(title);
      await expect(page.locator('#nprogress')).toHaveCount(0);
      await expect(page.locator('.not-found')).toHaveCount(0);
      await expect(page.locator('.knowledge-chapter')).toHaveCount(await page.locator('.markdown-body h2[id],.markdown-body h3[id],.markdown-body h4[id],.markdown-body h5[id],.markdown-body h6[id]').count());
      await assertOutline(page, expect);
    }
    record(process.env.FOOTPRINT_SKIP_ROUTE_SWEEP ? 'representative routes after final adjustment' : 'all 180 canonical articles navigate through actual routes', {routes:process.env.FOOTPRINT_SKIP_ROUTE_SWEEP ? 5 : routes.length});
    await page.setViewportSize({width:390,height:812}); await page.goto(base+'#/note/ai/03-agent-loop'); await expect(page.locator('.knowledge-topic')).toHaveAttribute('data-status','ready');
    await page.locator('.catalog-arrow').click(); await primary('源码专题').click(); await secondary('Preact').click(); await shot('mobile-menu.png');
    await page.keyboard.press('Escape'); await page.emulateMedia({media:'print'}); await expect(page.locator('.footprint-header')).toBeHidden(); await expect(page.locator('.knowledge-rail')).toBeHidden(); record('site header and menu hidden for print');
    expect(errors).toEqual([]); await context.close();
  } catch (e) {results.push({name:'FAILED',error:String(e),stack:e.stack}); console.error(e); process.exitCode=1; if(page&&!page.isClosed())await page.screenshot({path:path.join(out,'failure.png')}).catch(()=>{});}
  finally {fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({base,results,errors,requests},null,2));await browser.close();}
})();
