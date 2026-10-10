const {chromium, expect} = require(process.env.FOOTPRINT_PLAYWRIGHT || '@playwright/test');
const {assertOutline} = require('./toc-assertions.cjs');
const fs = require('node:fs'), path = require('node:path');
const base = process.env.FOOTPRINT_BASE || 'http://127.0.0.1:9095/';
const out = path.resolve(process.env.FOOTPRINT_EVIDENCE || 'evidence/toc'); fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});const results=[], errors=[], requests=[];let page;
 const record=(name,data={})=>{results.push({name,...data});console.log('PASS',name,JSON.stringify(data));};
 const ready=async()=>{await expect(page.locator('.knowledge-rail')).toHaveCount(1);await expect(page.locator('#nprogress')).toHaveCount(0);};
 const byId=id=>page.locator(`.knowledge-chapter[href$="id=${id}"]`);
 const revealAll=async()=>page.evaluate(()=>document.querySelectorAll('.knowledge-branch-toggle[aria-expanded=false]').forEach(b=>b.click()));
 try {
  for(const width of [320,390,768,1440]){
   const context=await browser.newContext({viewport:{width,height:900},isMobile:width<=768,hasTouch:width<=768});page=await context.newPage();page.on('pageerror',e=>errors.push({message:String(e),stack:e.stack,url:page.url()}));page.on('requestfailed',r=>requests.push({url:r.url(),failure:r.failure()}));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('/favicon.ico'))requests.push({url:r.url(),status:r.status()});});
   await page.goto(base+'#/note/dom/dom?id=nodename');await ready();await expect(byId('nodename')).toHaveAttribute('aria-current','location');
   const count=await assertOutline(page,expect);
   const hierarchy=await page.evaluate(()=>{
    const a=document.querySelector('.knowledge-chapter[href$="id=nodename"]');const parents=[];
    for(let li=a.closest('li').parentElement.closest('.knowledge-chapter-item');li;li=li.parentElement.closest('.knowledge-chapter-item')) parents.push({level:li.querySelector('a').dataset.level,expanded:li.querySelector('button').getAttribute('aria-expanded')});
    const h=document.getElementById('nodename'), sc=document.querySelector('.content-wrap');return {parents,headingTop:h.getBoundingClientRect().top,scrollTop:sc.getBoundingClientRect().top};
   });
   expect(hierarchy.parents.length).toBeGreaterThanOrEqual(2);expect(hierarchy.parents.every(p=>p.expanded==='true')).toBe(true);expect(hierarchy.headingTop).toBeGreaterThanOrEqual(hierarchy.scrollTop);expect(hierarchy.headingTop).toBeLessThan(hierarchy.scrollTop+90);
   if(width>768)await page.locator('.knowledge-rail-toggle').click();
   await expect(page.locator('.knowledge-chapter:visible')).toHaveCount(count.roots);
   await expect(page.locator('.knowledge-chapter-path:visible')).toHaveCount(1);
   await page.screenshot({path:path.join(out,`dom-${width}-compact.png`)});
   const compactRoot = page.locator('.knowledge-chapter-path:visible'); const rootHref = await compactRoot.getAttribute('href');
   await compactRoot.click(); await expect(page).toHaveURL(base + rootHref); await expect(page.locator('.knowledge-chapter[aria-current]')).toHaveAttribute('href',rootHref);
   await page.evaluate(()=>location.hash='#/note/dom/dom?id=nodename'); await expect(byId('nodename')).toHaveAttribute('aria-current','location');
   await page.locator('.knowledge-rail-toggle').click();await expect(byId('nodename')).toBeVisible();
   await expect(page.locator('[aria-current=location]')).toHaveCount(1);
   await page.screenshot({path:path.join(out,`dom-${width}-expanded.png`)});
   // Manually opened unrelated branches survive current-path tracking.
   const otherId = await page.locator('.knowledge-chapters > li > div > .knowledge-branch-toggle[aria-expanded=false]').first().getAttribute('aria-controls');
   const other = page.locator(`.knowledge-branch-toggle[aria-controls=${otherId}]`);
   await other.focus(); await page.keyboard.press('Space'); await expect(other).toHaveAttribute('aria-expanded','true');
   await page.evaluate(()=>document.getElementById('nodetype').scrollIntoView({block:'start'})); await expect(byId('nodetype')).toHaveAttribute('aria-current','location'); await expect(other).toHaveAttribute('aria-expanded','true'); await expect(other).toBeFocused();
   await page.evaluate(()=>document.getElementById('nodename').scrollIntoView({block:'start'})); await expect(byId('nodename')).toHaveAttribute('aria-current','location');
   // Manual collapse persists while reading deeper siblings; keyboard control keeps focus.
   const parentButton=byId('nodename').locator('xpath=ancestor::ul[1]/parent::li/div/button');
   await parentButton.focus();await page.keyboard.press('Enter');await expect(parentButton).toHaveAttribute('aria-expanded','false');await expect(parentButton).toBeFocused();
   await page.evaluate(()=>document.getElementById('nodetype').scrollIntoView({block:'start'}));await expect(byId('nodetype')).toHaveAttribute('aria-current','location');await expect(parentButton).toHaveAttribute('aria-expanded','false');await expect(parentButton).toBeFocused();
   await expect(byId('nodename')).toBeHidden();
   // Explicit deep hash must reveal the collapsed chain, without rebuilding ordinary DOM.
   await page.evaluate(()=>location.hash='#/note/dom/dom?id=nodename');await page.waitForTimeout(100);
   // same URL doesn't emit a hash event, so first navigate another ID
   await page.evaluate(()=>location.hash='#/note/dom/dom?id=nodetype');await expect(parentButton).toHaveAttribute('aria-expanded','true');
   await page.evaluate(()=>location.hash='#/note/dom/dom?id=nodename');await expect(byId('nodename')).toHaveAttribute('aria-current','location');
   await page.reload();await ready();await expect(byId('nodename')).toHaveAttribute('aria-current','location');await assertOutline(page,expect);
   if(width<=768)await page.locator('.knowledge-rail-toggle').click();
   await revealAll();
   const before=await page.locator('.content-wrap').evaluate(e=>e.scrollTop);await page.locator('.knowledge-chapters').hover();await page.mouse.wheel(0,10000);await expect.poll(()=>page.locator('.knowledge-chapters').evaluate(e=>e.scrollTop)).toBeGreaterThan(0);expect(await page.locator('.content-wrap').evaluate(e=>e.scrollTop)).toBe(before);
   const last=page.locator('.knowledge-chapter').last();await last.scrollIntoViewIfNeeded();await expect(last).toBeInViewport();await page.screenshot({path:path.join(out,`dom-${width}-last.png`)});
   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(width);expect(await page.locator('.content-wrap').evaluate(e=>e.scrollWidth-e.clientWidth)).toBe(0);
   await byId('nodename').scrollIntoViewIfNeeded();await byId('nodename').click();await expect(page.locator('#nodename')).toBeFocused();
   await page.goto(base+'#/note/basis/array');await ready();await assertOutline(page,expect);await expect(byId('nodename')).toHaveCount(0);await page.goBack();await ready();await expect(byId('nodename')).toHaveAttribute('aria-current','location');
   record(`DOM outline/deep link/manual state/scroll/history/layout ${width}`,{...count,hierarchy});await context.close();
  }
  // Synthetic author Markdown exercises headings without changing shipped content.
  const context=await browser.newContext({viewport:{width:1440,height:900}});page=await context.newPage();page.on('pageerror',e=>errors.push({message:String(e),stack:e.stack,url:page.url()}));page.on('requestfailed',r=>requests.push({url:r.url(),failure:r.failure()}));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('/favicon.ico'))requests.push({url:r.url(),status:r.status()});});
  let markdown='';await page.route('**/note/dom/dom.md*',r=>r.fulfill({status:200,contentType:'text/plain',body:markdown}));
  for(const [name,body] of [
   ['skip-and-repeat','# Title\n\n### Early\n\n##### Deep\n\n## Root\n\n#### Same\n\n##### Leaf\n\n#### Same\n\n## Last'],
   ['full-depth','# Title\n\n## Root\n\n### Branch\n\n#### Child\n\n##### Leaf\n\n###### Tip\n\n## Other'],
   ['single-level','# Title\n\n### One\n\n### Two'],['empty','# Title\n\nNo sections.']]){
   markdown=body;await page.goto(base+'#/note/dom/dom');await page.reload();await ready();const count=await assertOutline(page,expect);
   if(name==='skip-and-repeat'){expect(count).toEqual({roots:3,headings:7});const ids=await page.locator('.knowledge-chapter').evaluateAll(as=>as.map(a=>a.hash));expect(new Set(ids).size).toBe(7);await revealAll();}
   if(name==='full-depth'){expect(count).toEqual({roots:2,headings:6});await revealAll();}
   if(name==='single-level')expect(count).toEqual({roots:2,headings:2});if(name==='empty'){expect(count).toEqual({roots:0,headings:0});await expect(page.locator('.knowledge-chapters-empty')).toBeVisible();}
   record(name,count);await page.screenshot({path:path.join(out,`fixture-${name}.png`)});
  }
  expect(errors).toEqual([]);record('no page errors');
 }catch(e){fs.writeFileSync(path.join(out,'failure.txt'),String(e));if(page&&!page.isClosed()) fs.writeFileSync(path.join(out,'failure-geometry.json'),JSON.stringify(await page.evaluate(()=>({hash:location.hash,scroll:document.querySelector('.content-wrap')?.scrollTop,sc:document.querySelector('.content-wrap')?.getBoundingClientRect().top,heading:document.getElementById('nodename')?.getBoundingClientRect().top,current:document.querySelector('.knowledge-chapter[aria-current]')?.outerHTML})),null,2));if(page&&!page.isClosed())await page.screenshot({path:path.join(out,'failure.png')});throw e;}
 finally{fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({results,errors,requests},null,2));await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
