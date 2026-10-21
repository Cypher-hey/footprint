"""有行为断言的浏览器验收。需要环境已有 Playwright/Chromium；不安装依赖。"""
from pathlib import Path
import json,collections,re,time,datetime
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).parent
BASE='http://127.0.0.1:8765'
results=[]
def check(name,ok,detail=''):
 results.append(dict(name=name,passed=bool(ok),detail=detail))
 if not ok:raise AssertionError(f'{name}: {detail}')
def width(page):return page.evaluate('({viewport:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth})')
def no_overflow(page):
 d=width(page);return max(d['document'],d['body'])<=d['viewport']
def ready(page,id):page.wait_for_function('(id)=>current===id',arg=id)
def save(name,page,full=False):page.screenshot(path=str(ROOT/'screenshots'/name),full_page=full)

def main():
 cards=json.loads((ROOT/'cards.json').read_text());ids={c['id'] for c in cards}
 check('20 unique complete cards',len(cards)==20 and len(ids)==20 and all(c['overview'] and c['blocks'] and c['sources'] and c['review']['question'] and c['review']['answer'] for c in cards))
 counts=dict(collections.Counter(c['kind'] for c in cards));check('Three learning types',counts=={'mechanism':7,'concept':7,'relation':6},counts)
 check('All pending; all manual links resolve',all(c['endorsement']=='pending' and all(r in ids for r in c['related']) for c in cards))
 combinations={tuple(b['type'] for b in c['blocks']) for c in cards}
 check('Diverse ordered combinations',len(combinations)>=7,{'count':len(combinations),'combinations':[list(x) for x in sorted(combinations)]})
 with sync_playwright() as pw:
  browser=pw.chromium.launch(executable_path='/usr/bin/chromium',headless=True)
  context=browser.new_context(viewport={'width':1440,'height':1050},device_scale_factor=1)
  page=context.new_page();errors=[];requests=[]
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.on('request',lambda r:requests.append(r.url))
  response=page.goto(BASE+'/index.html');check('HTTP entry',response.status==200)
  check('Catalog 20 items',page.locator('.tile').count()==20)
  check('Desktop catalog no horizontal overflow',no_overflow(page),width(page))
  save('01-desktop-catalog.png',page)
  page.locator('[data-filter="relation"]').click();check('Relation filter has 6 cards',page.locator('.tile').count()==6)
  page.locator('[data-scene="reliability"]').click();check('Scene + type intersection',page.locator('.tile').count()==1)
  page.locator('#search').fill('this_will_never_match_2913');check('Empty state',page.locator('#empty').is_visible() and page.locator('.tile').count()==0)
  save('08-empty-state.png',page)
  page.locator('[data-reset]').click();check('Clear restores cards',page.locator('.tile').count()==20 and page.locator('#search').input_value()=='')
  page.locator('#search').fill('两次相同金额');check('Full text search reaches non-title paragraph',page.locator('.tile').count()==1 and page.locator('.tile-title h3').inner_text()=='Idempotency')
  page.locator('#search').fill('pending writes');check('Full text search inside body',page.locator('.tile').count()==1 and page.locator('.tile-title h3').inner_text()=='Checkpoint')
  page.locator('#search').fill('')
  page.locator('[data-open="agent-loop"]').first.click();ready(page,'agent-loop')
  check('Default reading; review hidden',page.locator('#review-panel').is_hidden() and page.locator('#review-answer').is_hidden())
  page.locator('#review-toggle').click();check('Question visible; answer still hidden',page.locator('#review-panel').is_visible() and page.locator('#review-answer').is_hidden())
  page.locator('#reveal').click();check('Answer reveal',page.locator('#review-answer').is_visible())
  page.locator('#reveal').click();check('Answer hide',page.locator('#review-answer').is_hidden())
  page.locator('#reveal').click()
  page.locator('.source-details summary').click();check('Source details expand',page.locator('.source-list').is_visible())
  save('02-desktop-mechanism.png',page,True)
  related=page.locator('[data-related="tool-loop"]');related.scroll_into_view_if_needed();related.hover();page.wait_for_timeout(180)
  check('Desktop hover preview',page.locator('#quick').is_visible() and page.locator('#quick h3').inner_text()=='Tool Calling Loop')
  check('Preview uses same overview',page.locator('#quick-summary').inner_text()==next(c['overview'] for c in cards if c['id']=='tool-loop'))
  save('03-desktop-hover-preview.png',page)
  page.keyboard.press('Escape');check('Escape closes quick preview',page.locator('#quick').is_hidden())
  page.wait_for_timeout(160);related.blur();related.focus();page.wait_for_timeout(100)
  check('Keyboard focus preview',page.locator('#quick').is_visible())
  page.keyboard.press('Tab');check('Tab reaches preview full card button',page.evaluate('document.activeElement.closest("#quick")!==null'))
  page.keyboard.press('Escape');check('Escape restores link focus',page.evaluate('document.activeElement.dataset.related==="tool-loop"'))
  page.wait_for_timeout(160)
  y=page.evaluate('scrollY');related.click();check('Click preview modal',page.locator('#sheet').evaluate('(d)=>d.open'))
  check('No duplicate DOM IDs with preview',page.evaluate('(()=>{const a=[...document.querySelectorAll("[id]")].map(x=>x.id);return a.length===new Set(a).size})()'))
  page.locator('#sheet [data-open="tool-loop"]').click();ready(page,'tool-loop')
  check('Related full card opens',page.locator('.reader-head h1').inner_text()=='Tool Calling Loop')
  page.locator('#back').click();ready(page,'agent-loop');page.wait_for_timeout(150)
  check('Back restores reading position',abs(page.evaluate('scrollY')-y)<3,{'expected':y,'actual':page.evaluate('scrollY')})
  check('Back restores expanded states',page.locator('#review-answer').is_visible() and page.locator('.source-details').get_attribute('open') is not None)
  check('Back restores link focus',page.evaluate('document.activeElement.dataset.related==="tool-loop"'))
  page.go_back();page.wait_for_function('current===null');check('Browser back reaches catalog',page.locator('.tile').count()==20)
  page.go_forward();ready(page,'agent-loop');check('Browser forward restores card',page.locator('.reader-head h1').inner_text()=='Agent Loop')
  # 每卡、两视口，核查顺序、来源、复习、宽度与相邻导航。
  for viewport in [{'width':1440,'height':1050},{'width':390,'height':844}]:
   page.set_viewport_size(viewport)
   for card in cards:
    page.evaluate('(id)=>openCard(id,false)',card['id'])
    check(f'{viewport["width"]} {card["id"]}: body order',page.locator('.reader-paper>.block h2').all_text_contents()==[b['title'] for b in card['blocks']])
    check(f'{viewport["width"]} {card["id"]}: no page overflow',no_overflow(page),width(page))
    check(f'{viewport["width"]} {card["id"]}: source URLs',page.locator('.source-list a').evaluate_all('(a)=>a.map(x=>x.href)')==[s['url'] for s in card['sources']])
    page.locator('#review-toggle').click();page.locator('#reveal').click()
    check(f'{viewport["width"]} {card["id"]}: answer exact',page.locator('#review-answer').inner_text()==card['review']['answer'])
    page.locator('.source-details summary').click();check(f'{viewport["width"]} {card["id"]}: sources visible',page.locator('.source-list').is_visible())
    check(f'{viewport["width"]} {card["id"]}: all related targets',page.locator('.relations>.related').evaluate_all('(a)=>a.map(x=>x.dataset.related)')==card['related'])
    # 溢出只留在代码框内部。
    if page.locator('pre').count():
     check(f'{viewport["width"]} {card["id"]}: code scroll container',page.locator('pre').first.evaluate('(p)=>getComputedStyle(p).overflowX==="auto"'))
   check(f'{viewport["width"]} all 20 rendered',True)
  # 390px 手机完整卡及底部 sheet。
  page.evaluate('openCard("state-context",false)');save('04-mobile-relation.png',page,True)
  page.locator('[data-related="state"]').click();check('Mobile bottom sheet open',page.locator('#sheet').evaluate('(d)=>d.open'))
  check('Mobile sheet within viewport',page.locator('#sheet').evaluate('(d)=>{const r=d.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+1&&r.bottom<=innerHeight+1}'))
  save('05-mobile-sheet.png',page)
  for _ in range(6):page.keyboard.press('Tab')
  check('Modal keyboard focus remains inside',page.evaluate('document.activeElement.closest("#sheet")!==null'))
  page.keyboard.press('Escape');check('Mobile Esc closes modal',not page.locator('#sheet').evaluate('(d)=>d.open'))
  check('Modal close restores related focus',page.evaluate('document.activeElement.dataset.related==="state"'))
  page.locator('[data-related="state"]').click();page.locator('#close-sheet').click();check('Visible close button works',not page.locator('#sheet').evaluate('(d)=>d.open'))
  page.evaluate('openCard("structured-validation",false)');save('06-mobile-code-and-sources.png',page,True)
  pre=page.locator('pre');check('Long code scrolls internally',pre.evaluate('(p)=>p.scrollWidth>p.clientWidth'))
  pre.evaluate('(p)=>p.scrollLeft=p.scrollWidth');check('Code can be horizontally scrolled',pre.evaluate('(p)=>p.scrollLeft>0'))
  check('Scrolled code still no page overflow',no_overflow(page))
  page.evaluate('openCard("checkpoint",false)');save('07-mobile-concept.png',page,True)
  # 完整白皮书 HTML 与应用内离线阅读。
  page.set_viewport_size({'width':1440,'height':1050});page.locator('#whitepaper-link').click()
  check('Embedded complete whitepaper opens',page.locator('#whitepaper-dialog').evaluate('(d)=>d.open'))
  frame=page.frame_locator('#whitepaper-dialog iframe');check('Whitepaper includes full sections',frame.locator('h2').count()==15,frame.locator('h2').all_text_contents())
  page.locator('#close-whitepaper').click();check('Whitepaper close works',not page.locator('#whitepaper-dialog').evaluate('(d)=>d.open'))
  context.set_offline(True)
  page.locator('#nav-cards').click();page.locator('[data-filter="concept"]').click();page.locator('[data-open="embedding"]').first.click();page.locator('[data-related="rag"]').click();page.locator('#sheet [data-open="rag"]').click()
  ready(page,'rag');page.locator('#whitepaper-link').click();check('Offline reading, filtering, related and whitepaper',page.locator('#whitepaper-dialog').evaluate('(d)=>d.open'))
  context.set_offline(False)
  check('No external runtime requests',all(u.startswith(BASE) for u in requests),requests)
  check('No JS runtime errors',not errors,errors)
  page.locator('#close-whitepaper').click()
  page.goto(BASE+'/whitepaper.html');check('Standalone whitepaper HTML',page.locator('h2').count()==15)
  save('09-whitepaper-desktop.png',page)
  page.pdf(path=str(ROOT/'实施计划白皮书.pdf'),format='A4',print_background=True,display_header_footer=False)
  page.set_viewport_size({'width':390,'height':844});check('Mobile whitepaper no page overflow',no_overflow(page),width(page));save('10-whitepaper-mobile.png',page)
  browser.close()
 metadata=dict(date=datetime.datetime.now(datetime.timezone.utc).isoformat(),browser='Chromium /usr/bin/chromium',playwright='environment-installed',viewports=['1440x1050','390x844'],results=results,passed=sum(r['passed'] for r in results),failed=sum(not r['passed'] for r in results),limits=['file:// navigation blocked by browser administrator policy; did not change policy or retry','Real Android browser/file opener not tested','No screen reader or iOS Safari testing','No actual model, tool or Agent benchmark execution'])
 (ROOT/'qa-results.json').write_text(json.dumps(metadata,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({'passed':metadata['passed'],'failed':metadata['failed'],'screenshots':len(list((ROOT/'screenshots').glob('*.png')))},ensure_ascii=False))
if __name__=='__main__':
 try:main()
 except Exception:
  (ROOT/'qa-failure.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
  raise
