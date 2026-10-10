/* Run against a built site in the Mini's existing Chrome. No new dependencies. */
const {chromium, expect} = require(process.env.FOOTPRINT_PLAYWRIGHT || '@playwright/test');
const fs = require('node:fs'), path = require('node:path');
const base = process.env.FOOTPRINT_BASE || 'http://127.0.0.1:9093/';
const out = path.resolve(process.env.FOOTPRINT_EVIDENCE || 'evidence/navigation');
fs.mkdirSync(out, {recursive: true});
(async () => {
  const browser = await chromium.launch({channel: 'chrome', headless: true});
  const results = [], errors = [], failures = [];
  const record = (name, data = {}) => {results.push({name, ...data}); console.log('PASS', name, JSON.stringify(data));};
  const ready = async p => {
    await expect(p.locator('.knowledge-topic')).toHaveAttribute('data-status', 'ready');
    await expect(p.locator('.knowledge-rail')).toHaveCount(1);
    await expect(p.locator('.knowledge-panel')).toBeVisible();
  };
  const go = async (p, slug = '03-agent-loop', query = '') => {
    await p.goto(base + '#/note/ai/' + slug + query); await ready(p);
    await expect(p.locator('.knowledge-diagram svg')).toHaveCount(slug === '03-agent-loop' ? 4 : 2);
  };
  const screenshot = async (p, name) => {await expect(p.locator('#nprogress')).toHaveCount(0); await p.screenshot({path: path.join(out, name)});};
  let page;
  try {
    for (const width of [1440, 320, 375, 390, 768]) {
      const context = await browser.newContext({viewport: {width, height: 812}, isMobile: width < 769, hasTouch: width < 769});
      page = await context.newPage(); page.on('pageerror', e => errors.push(String(e))); page.on('requestfailed', r => failures.push(r.url()));
      await go(page);
      const tabs = page.getByRole('tab'), toggle = page.locator('.knowledge-rail-toggle');
      await expect(toggle).toHaveAccessibleName(width < 769 ? '展开目录' : '收起目录');
      await expect(tabs).toHaveCount(3);
      for (const label of ['核心概要', '系统阐述', '概念图解']) await expect(page.getByRole('tab', {name: label, exact: true})).toBeVisible();
      const dimensions = await tabs.evaluateAll(els => els.map(e => {const r = e.getBoundingClientRect(); return {width: r.width, height: r.height};}));
      for (const d of dimensions) {expect(d.width).toBeGreaterThanOrEqual(44); expect(d.height).toBeGreaterThanOrEqual(44);}
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
      expect(await page.locator('.content-wrap').evaluate(e => e.scrollWidth)).toBe(await page.locator('.content-wrap').evaluate(e => e.clientWidth));
      if (width > 768) {
        const menu = await page.evaluate(() => ({bottom: Math.max(...Array.from(document.querySelectorAll('.header.is-desktop .nav-list > .nav-item'), e => e.getBoundingClientRect().bottom)), title: document.querySelector('.knowledge-reader h1').getBoundingClientRect().top, scroll: document.querySelector('.content-wrap').getBoundingClientRect().top}));
        expect(menu.title).toBeGreaterThan(menu.bottom); expect(menu.scroll).toBeGreaterThanOrEqual(menu.bottom);
      }
      await screenshot(page, `navigation-${width}-top.png`);
      await toggle.click(); await expect(toggle).toHaveAttribute('aria-expanded', width < 769 ? 'true' : 'false');
      if (width < 769) {
        await expect(page.locator('.knowledge-chapter-name').first()).toBeVisible();
        await screenshot(page, `navigation-${width}-expanded.png`);
        await page.keyboard.press('Escape'); await expect(toggle).toHaveAttribute('aria-expanded', 'false'); await expect(toggle).toBeFocused();
      } else {await expect(page.locator('.knowledge-chapter-name').first()).toBeHidden(); await toggle.click();}
      const chapter = page.locator('.knowledge-chapter').nth(6), target = new URL(await chapter.getAttribute('href'), base).hash;
      await chapter.focus(); await page.keyboard.press('Enter'); await expect(page).toHaveURL(base + target); await ready(page);
      await expect(page.locator('.knowledge-diagram svg')).toHaveCount(4);
      const id = new URLSearchParams(target.split('?')[1]).get('id');
      await expect(page.locator('.knowledge-chapter[aria-current=location]')).toHaveAttribute('href', target);
      await expect(page.locator('[id="' + id + '"]')).toBeFocused();
      const geometry = await page.evaluate(id => {
        const tabs = document.querySelector('.knowledge-tabs').getBoundingClientRect(), heading = document.getElementById(id).getBoundingClientRect();
        const scroll = document.querySelector('.content-wrap').getBoundingClientRect();
        return {tabsTop: tabs.top, scrollTop: scroll.top, tabsBottom: tabs.bottom, headingTop: heading.top};
      }, id);
      expect(Math.abs(geometry.tabsTop - geometry.scrollTop)).toBeLessThan(2);
      expect(geometry.headingTop).toBeGreaterThanOrEqual(geometry.tabsBottom);
      expect(geometry.headingTop).toBeLessThan(geometry.tabsBottom + 50);
      await screenshot(page, `navigation-${width}-sticky.png`);
      const scrolledTarget = await page.locator('.knowledge-chapter').nth(8).getAttribute('href');
      await page.evaluate(id => document.getElementById(id).scrollIntoView({block: 'start'}), new URLSearchParams(scrolledTarget.split('?')[1]).get('id'));
      await expect(page.locator('.knowledge-chapter[aria-current=location]')).toHaveAttribute('href', scrolledTarget);
      await expect(page).toHaveURL(base + target);
      // The long chapter list scrolls independently and stops wheel chaining at its boundary.
      const before = await page.locator('.content-wrap').evaluate(e => e.scrollTop);
      await page.locator('.knowledge-chapters').hover(); await page.mouse.wheel(0, 1600);
      await expect.poll(() => page.locator('.knowledge-chapters').evaluate(e => e.scrollTop)).toBeGreaterThan(0);
      expect(await page.locator('.content-wrap').evaluate(e => e.scrollTop)).toBe(before);
      const last = page.locator('.knowledge-chapter').last(), lastTarget = await last.getAttribute('href');
      await last.click(); await expect(page).toHaveURL(base + lastTarget); await ready(page); await expect(page.locator('.knowledge-diagram svg')).toHaveCount(4);
      await expect(page.locator('.knowledge-chapter[aria-current=location]')).toHaveAttribute('href', lastTarget);
      // All three tabs are directly clickable while reading; roving keyboard focus survives remounts.
      for (const [key, label] of [['overview', '核心概要'], ['diagrams', '概念图解'], ['explanation', '系统阐述']]) {
        await page.getByRole('tab', {name: label, exact: true}).click(); await expect(page).toHaveURL(new RegExp('view=' + key + '$')); await ready(page);
        await expect(page.locator('#knowledge-tab-' + key)).toHaveAttribute('aria-selected', 'true'); await expect(page.locator('#knowledge-tab-' + key)).toBeFocused();
        await expect(page.locator('.knowledge-chapter')).toHaveCount(await page.locator('.knowledge-panel h2[id], .knowledge-panel h3[id], .knowledge-panel h4[id], .knowledge-panel h5[id], .knowledge-panel h6[id]').count());
        expect(await page.locator('.content-wrap').evaluate(e => e.scrollTop)).toBeLessThan(2);
      }
      await page.keyboard.press('ArrowRight'); await ready(page); await expect(page.locator('#knowledge-tab-diagrams')).toBeFocused();
      await page.keyboard.press('Home'); await ready(page); await expect(page.locator('#knowledge-tab-overview')).toBeFocused();
      await page.keyboard.press('End'); await ready(page); await expect(page.locator('#knowledge-tab-diagrams')).toBeFocused();
      // Real rapid DOM clicks occur before slow route rendering can finish.
      await page.evaluate(() => {for (const key of ['overview', 'explanation', 'diagrams', 'overview', 'explanation']) document.getElementById('knowledge-tab-' + key).click();});
      await expect(page).toHaveURL(/view=explanation$/); await ready(page); await expect(page.locator('.knowledge-diagram svg')).toHaveCount(4);
      await page.reload(); await ready(page); await expect(page.locator('.knowledge-reader')).toHaveAttribute('data-view', 'explanation');
      await expect(page.locator('.knowledge-diagram svg')).toHaveCount(4);
      await page.evaluate(() => {document.querySelector('.content-wrap').scrollTop = 700;});
      await expect.poll(() => page.locator('.content-wrap').evaluate(e => e.scrollTop)).toBeGreaterThan(600);
      for (let historyRun = 0; historyRun < 4; historyRun++) {
        const overviewBox = await page.getByRole('tab', {name: '核心概要', exact: true}).boundingBox();
        await page.mouse.click(overviewBox.x + overviewBox.width / 2, overviewBox.y + overviewBox.height / 2); await ready(page);
        await page.goBack(); await ready(page); await expect(page.locator('.knowledge-diagram svg')).toHaveCount(4);
        await expect.poll(() => page.locator('.content-wrap').evaluate(e => e.scrollTop)).toBeGreaterThan(600);
        await page.waitForTimeout(100);
        expect(await page.locator('.content-wrap').evaluate(e => e.scrollTop)).toBeGreaterThan(600);
      }
      await page.goForward(); await ready(page); await expect(page.locator('.knowledge-reader')).toHaveAttribute('data-view', 'overview');
      await go(page, '03-tool-calling'); await expect(page.locator('.knowledge-chapter')).not.toHaveCount(0);
      await page.goto(base + '#/note/basis/array'); await expect(page.locator('.markdown-body h1')).toBeVisible();
      await expect(page.locator('.knowledge-rail')).toHaveCount(0); await expect(page.locator('.knowledge-page')).toHaveCount(0);
      if (width < 769) {await page.locator('.mobile-header .header-left').click(); await expect(page.locator('.sidebar')).toHaveClass(/visible/); await expect(page.locator('.sidebar .header-nav')).toBeVisible();}
      record(`navigation ${width}px`, {dimensions, geometry}); await context.close();
    }
    const sweep = await browser.newContext({viewport: {width: 320, height: 812}, isMobile: true, hasTouch: true});
    page = await sweep.newPage(); page.on('pageerror', e => errors.push(String(e))); page.on('requestfailed', r => failures.push(r.url()));
    await go(page); const topics = await page.evaluate(() => FootprintTopics.topics);
    for (const topic of topics) {
      for (const mode of topic.modes) {
        await page.goto(base + '#' + topic.legacyRoutes[0] + '?view=' + mode.id); await ready(page);
        if (mode.id !== 'overview') await expect(page.locator('.knowledge-diagram svg')).toHaveCount(topic.figureCount);
        const widths = await page.evaluate(() => {const el = document.querySelector('.content-wrap'); return {document: document.documentElement.scrollWidth, article: el.scrollWidth, available: el.clientWidth};});
        expect(widths.document, topic.id + ':' + mode.id).toBe(320); expect(widths.article, topic.id + ':' + mode.id).toBe(widths.available);
      }
    }
    record('all 60 AI modes have no article overflow at 320px'); await sweep.close();
    const context = await browser.newContext(); page = await context.newPage();
    await go(page); await page.evaluate(() => {docute.router.push('/note/ai/03-agent-loop?view=all');}); await ready(page);
    await expect(page.locator('.knowledge-diagram svg')).toHaveCount(8);
    await page.emulateMedia({media: 'print'}); await expect(page.locator('.knowledge-rail')).toBeHidden(); await expect(page.locator('.knowledge-tabs')).toBeHidden();
    expect(await page.locator('.main').evaluate(e => e.getBoundingClientRect().width)).toBe(await page.evaluate(() => innerWidth));
    await page.pdf({path: path.join(out, 'navigation-complete-print.pdf')}); record('complete view print without navigation'); await context.close();
    expect(errors).toEqual([]); expect(failures).toEqual([]);
  } catch (e) {console.error(e); results.push({name: 'FAILED', error: String(e), stack: e.stack}); process.exitCode = 1; if (page && !page.isClosed()) await page.screenshot({path: path.join(out, 'failure.png')}).catch(() => {});}
  finally {fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify({base, results, errors, failures}, null, 2)); await browser.close();}
})();
