/* Actual Chrome QA. Set FOOTPRINT_PLAYWRIGHT to an existing Playwright installation. */
const {chromium,expect}=require(process.env.FOOTPRINT_PLAYWRIGHT || '@playwright/test');
const fs=require('node:fs'), path=require('node:path');
const base=process.env.FOOTPRINT_BASE || 'http://127.0.0.1:9091/';
const out=path.resolve(process.env.FOOTPRINT_EVIDENCE || 'evidence/browser'); fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000}}), page=await context.newPage();
 const results=[], errors=[], failed=[];
 page.on('pageerror',e=>errors.push(String(e))); page.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()}));
 const record=(name,data={})=>{results.push({name,...data});console.log('PASS',name,JSON.stringify(data));};
 const ready=async(p=page)=>{await expect(p.locator('.knowledge-topic')).toHaveAttribute('data-status','ready');await expect(p.locator('.knowledge-panel')).toHaveCount(1);};
 const go=async(slug,query='')=>{await page.goto(base+'#/note/ai/'+slug+query);await ready();};
 const mode=async(key)=>{await page.locator('#knowledge-tab-'+key).click();await ready();await expect(page.locator('.knowledge-reader')).toHaveAttribute('data-view',key);};
 try {
  await go('03-agent-loop');
  const manifest=await page.evaluate(()=>FootprintTopics);
  const samples=['03-agent-loop','03-tool-calling','03-react'];
  const ordered=[...manifest.topics].sort((a,b)=>{let x=samples.indexOf(a.slug),y=samples.indexOf(b.slug);return (x<0?99:x)-(y<0?99:y);});
  for(const t of ordered){
   await go(t.slug);await expect(page.locator('.knowledge-reader')).toHaveAttribute('data-view','explanation');
   await expect(page.locator('.markdown-body h1')).toHaveCount(1);await expect(page.locator('.markdown-body h1')).toHaveText(t.title);await expect(page.locator('.markdown-body h1')).toHaveAttribute('id',t.titleAnchor);
   await expect(page.locator('.knowledge-summary')).toHaveText(t.summary);
   for(const m of t.modes){
    await mode(m.id);await expect(page.locator('.knowledge-summary')).toBeVisible();
    const actual=await page.evaluate(()=>docute.store.state.page.headings.map(h=>h.slug));
    expect(actual).toEqual(m.headingIds);
    if(m.id!=='overview') await expect(page.locator('.knowledge-diagram svg')).toHaveCount(t.figureCount,{timeout:45000});
    await expect(page.locator('.knowledge-diagram-error')).toHaveCount(0);
    const ids=await page.locator('.knowledge-panel h2[id], .knowledge-panel h3[id], .knowledge-panel h4[id], .knowledge-panel h5[id], .knowledge-panel h6[id], .knowledge-panel a[id]').evaluateAll(els=>els.map(e=>e.id));expect(new Set(ids).size).toBe(ids.length);
   }
   record(t.slug+' three modes, fixed summary, TOC and Mermaid',{figures:t.figureCount});
   if(samples.includes(t.slug)){
    await page.screenshot({path:path.join(out,t.slug+'-desktop.png')});
    await page.setViewportSize({width:375,height:812});
    const widths=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,tabs:document.querySelector('.knowledge-tabs').getBoundingClientRect().right}));
    expect(widths.document).toBeLessThanOrEqual(376);expect(widths.tabs).toBeLessThanOrEqual(376);
    await page.screenshot({path:path.join(out,t.slug+'-mobile.png')});record(t.slug+' narrow layout',widths);
    await page.setViewportSize({width:1440,height:1000});
    await page.locator('#knowledge-tab-diagrams').focus();await page.keyboard.press('ArrowRight');await ready();await expect(page.locator('#knowledge-tab-overview')).toBeFocused();
    await page.keyboard.press('End');await ready();await expect(page.locator('#knowledge-tab-diagrams')).toBeFocused();
    await page.reload();await ready();await expect(page.locator('.knowledge-reader')).toHaveAttribute('data-view','diagrams');record(t.slug+' keyboard and refresh');
   }
  }
  for(const [old,key] of [['oral','overview'],['written','explanation'],['diagram','diagrams']]){await go('03-agent-loop','?view='+old);await expect(page.locator('.knowledge-reader')).toHaveAttribute('data-view',key);await expect(page).toHaveURL(new RegExp('view='+key));}
  await go('03-agent-loop','?view=bad');await expect(page.locator('.knowledge-notice')).toContainText('未知');record('legacy mode aliases and invalid mode notice');
  for(const id of ['loop-environment','loop-roles','loop-control','loop-information']){
   await go('03-agent-loop','?view=diagram&id='+id);await expect(page.locator('#'+id)).toBeAttached();await expect(page.locator('.knowledge-diagram svg')).toHaveCount(4);
   await page.reload();await ready();await expect(page.locator('#'+id)).toBeAttached();
  }record('four historical figure anchors and refresh');
  // Every generated historical heading mapping is checked against actual mounted targets.
  for(const t of manifest.topics){for(const m of t.modes){await go(t.slug,'?view='+m.id);const mapped=Object.entries(t.legacyAnchors).filter(([old,target])=>target.mode===m.id&&target.id);for(const [old,target] of mapped) expect(await page.locator('[id]').evaluateAll((els,id)=>els.some(e=>e.id===id),target.id),t.slug+': '+old).toBe(true);}}
  record('all historical heading targets exist in Chrome',{headings:manifest.topics.reduce((n,t)=>n+Object.keys(t.legacyAnchors).length,0)});
  await go('03-agent-loop','?view=explanation&id=section-05');await expect(page.locator('#section-05')).toBeAttached();
  await page.locator('.knowledge-panel a').filter({hasText:'Tool Calling'}).first().click();await ready();await expect(page).toHaveURL(/03-tool-calling/);
  await page.goBack();await ready();await expect(page).toHaveURL(/03-agent-loop.*section-05/);await page.goForward();await ready();await expect(page).toHaveURL(/03-tool-calling/);record('relative cross-topic link and back/forward anchor');
  await page.goto(base+'#/note/ai/topics/03-react/modes/overview');await ready();await expect(page).toHaveURL(/03-react\?view=overview/);record('author mode entry canonical deep link');
  await go('16-language-models');await expect(page.locator('math')).toHaveCount(1);await expect(page.locator('math')).toBeVisible();await expect(page.locator('.knowledge-panel pre code')).not.toHaveCount(0);await page.screenshot({path:path.join(out,'16-formula-code.png')});record('native MathML and code');
  for(const slug of ['05-tools-mcp-skills','08-workflow-state','09-reliability-security','18-multimodal']) {await go(slug);await expect(page.locator('.knowledge-diagram svg')).not.toHaveCount(0);await page.screenshot({path:path.join(out,slug+'.png')});}
  await go('03-agent-loop','?view=all');await expect(page.locator('.knowledge-panel')).toContainText('核心概要');await expect(page.locator('.knowledge-diagram svg')).toHaveCount(8,{timeout:45000});await page.emulateMedia({media:'print'});await expect(page.locator('.knowledge-tabs')).toBeHidden();await expect(page.locator('.knowledge-panel')).toBeVisible();await page.pdf({path:path.join(out,'complete-print.pdf')});await page.emulateMedia({media:'screen'});record('complete content for browser search and print');
  await page.goto(base+'#/note/basis/array');await expect(page.locator('.markdown-body h1')).toBeVisible();await expect(page.locator('.knowledge-tabs')).toHaveCount(0);
  await page.goto(base+'#/note/mermaid-test');await expect(page.locator('.knowledge-diagram svg')).not.toHaveCount(0,{timeout:45000});record('non-AI ordinary Markdown and Mermaid');
  // Fault/race tests use browser request interception, never production source changes.
  const fault=await browser.newContext(), fp=await fault.newPage();let first=true;
  await fault.route('**/03-react/explanation.md',r=>{if(first){first=false;return r.fulfill({status:503,body:'test failure'});}return r.continue();});
  await fp.goto(base+'#/note/ai/03-react');await expect(fp.locator('.knowledge-topic')).toHaveAttribute('data-status','error');await expect(fp.locator('.knowledge-summary')).toBeVisible();await fp.locator('.knowledge-retry').click();await ready(fp);await fault.close();record('HTTP failure, summary retained, explicit retry succeeds');
  const race=await browser.newContext(), rp=await race.newPage();let release;
  await race.route('**/03-agent-loop/overview.md',async r=>{await new Promise(resolve=>release=resolve);await r.continue();});
  await rp.goto(base+'#/note/ai/03-agent-loop');await ready(rp);await rp.locator('#knowledge-tab-overview').click();await expect(rp.locator('.knowledge-topic')).toHaveAttribute('data-status','loading');
  await rp.locator('#knowledge-tab-diagrams').click();await ready(rp);release();await rp.waitForTimeout(1000);await expect(rp.locator('.knowledge-reader')).toHaveAttribute('data-view','diagrams');await expect(rp.locator('.knowledge-panel h2').first()).toContainText('读图主线');
  let requests=0;rp.on('request',r=>{if(r.url().includes('/diagrams.md'))requests++;});await rp.locator('#knowledge-tab-explanation').click();await ready(rp);await rp.locator('#knowledge-tab-diagrams').click();await ready(rp);expect(requests).toBe(0);await race.close();record('slow stale response discarded and same-version cache hit');
  const blocked=await browser.newContext();await blocked.route('**/*mermaid*',r=>r.abort());const bp=await blocked.newPage();await bp.goto(base+'#/note/ai/03-react?view=diagrams');await ready(bp);await expect(bp.locator('pre code')).toHaveCount(2);await expect(bp.locator('.knowledge-panel')).toContainText('读图主线');await expect(bp.locator('.knowledge-diagram svg')).toHaveCount(0);await blocked.close();record('blocked Mermaid engine resource retains source and explanations');
  expect(errors).toEqual([]);expect(failed).toEqual([]);
 }catch(e){results.push({name:'FAILED',error:String(e),stack:e.stack});console.error(e);process.exitCode=1;await page.screenshot({path:path.join(out,'failure.png')}).catch(()=>{});}
 finally{fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({base,results,errors,failed},null,2));await browser.close();}
})();
