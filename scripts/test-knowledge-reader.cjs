/* Minimal DOM contract harness, not a replacement for a real browser. No deps. */
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
let checks = 0;
const verify = (x, label) => { assert.ok(x, label); checks++; };
class Element {
  constructor(tag) { this.tagName = tag.toUpperCase(); this.children = []; this.dataset = {}; this.attrs = {}; this.listeners = {}; this.hidden = false; this.text = ''; this.className = ''; this.id = ''; }
  get classList() { const e = this; return { add(...s) { e.className = [...new Set(e.className.split(' ').filter(Boolean).concat(s))].join(' '); }, remove(s) { e.className = e.className.split(' ').filter(c => c !== s).join(' '); } }; }
  set textContent(v) { this.text = v; }
  get textContent() { return this.text + this.children.map(c => c.textContent).join(''); }
  get parentElement() { return this.parent; }
  get isConnected() { return this.tagName === 'BODY' || !!this.parent?.isConnected; }
  appendChild(e) { e.remove(); this.children.push(e); e.parent = this; return e; }
  insertBefore(e, ref) { e.remove(); const i = this.children.indexOf(ref); assert.notEqual(i, -1); this.children.splice(i, 0, e); e.parent = this; }
  remove() { if (this.parent) this.parent.children.splice(this.parent.children.indexOf(this), 1); this.parent = null; }
  setAttribute(k, v) { this.attrs[k] = v; }
  getAttribute(k) { return this.attrs[k] ?? null; }
  addEventListener(k, fn) { this.listeners[k] = fn; }
  matches(selector) { if (selector[0] === '.') return this.className.split(' ').includes(selector.slice(1)); if (selector === '[hidden]') return this.hidden; const m = /^\[([^=\]]+)(?:="([^"]+)")?\]$/.exec(selector); return m ? (m[2] ? this.attrs[m[1]] === m[2] : m[1] in this.attrs) : this.tagName === selector.toUpperCase(); }
  querySelectorAll(s) { return this.children.flatMap(c => [c, ...c.querySelectorAll('*')]).filter(e => s === '*' || e.matches(s)); }
  querySelector(s) { return this.querySelectorAll(s)[0] || null; }
  closest(s) { return this.matches(s) ? this : this.parent?.closest(s) || null; }
  contains(e) { return e === this || this.children.some(c => c.contains(e)); }
  focus() { active = this; }
  scrollIntoView() { scrolled = this; }
}
let active, scrolled, observer, blocked = false;
const body = new Element('body');
const docListeners = {}, winListeners = {}, raf = [], saved = {};
const location = { hash: '#/note/ai/03-agent-loop', pathname: '/docs/', search: '' };
const document = {body, createElement: t => new Element(t), addEventListener: (k, fn) => docListeners[k] = fn,
 querySelectorAll: s => body.querySelectorAll(s), getElementById: id => body.querySelectorAll('*').find(e => e.id === id) };
const window = {addEventListener: (k, fn) => winListeners[k] = fn};
const context = {document, window, location, URLSearchParams, history: {replaceState(_, __, url) { location.hash = '#' + url.split('#')[1]; }},
 localStorage: {getItem(k) {if (blocked) throw Error('blocked'); return saved[k];}, setItem(k,v) {if (blocked) throw Error('blocked'); saved[k]=v;}},
 requestAnimationFrame: f => raf.push(f), MutationObserver: class {constructor(fn) {observer=fn;} observe() {}}, console};
function flush() { let n=0; while(raf.length) { if (++n>30) throw Error('refresh loop'); raf.shift()(); } }
function fixture(parent, complete = true) {
 parent.children.forEach(c => c.parent = null); parent.children=[];
 ['标题','先用这条主线回答','完整口语答案','书面精讲',...(complete?['概念图解']:[])].forEach((s,i)=>{
  const h=new Element(i===0?'h1':'h2'); h.textContent=s; parent.appendChild(h);
  const p=new Element('p');p.textContent=s+' 正文';parent.appendChild(p);
  if(s==='概念图解') { const a=new Element('a');a.id='diagram-anchor';parent.appendChild(a); }
 });
}
const root = new Element('div');root.className='markdown-body';body.appendChild(root);fixture(root);
vm.runInNewContext(readFileSync(require('node:path').join(__dirname,'../docs/asset/knowledge-reader.js'),'utf8'),context);flush();
const tabs=()=>root.querySelectorAll('[role="tab"]');
const panels=()=>root.querySelectorAll('.knowledge-panel');
verify(tabs().length===3,'three tabs'); verify(panels().length===3,'three panels');
verify(root.querySelector('.knowledge-summary').textContent.includes('正文'),'summary retained');
verify(root.dataset.view==='oral' && panels()[0].hidden===false && panels()[1].hidden,'oral default');
for(let i=0;i<3;i++){tabs()[i].listeners.click();flush();verify(panels().filter(p=>!p.hidden).length===1,'one visible');verify(tabs()[i].getAttribute('aria-selected')==='true','selected');verify(location.hash.includes('view='+['oral','written','diagram'][i]),'deep link');}
let prevented=false;tabs()[2].listeners.keydown({key:'ArrowRight',preventDefault(){prevented=true;}});flush();verify(prevented && active===tabs()[0],'keyboard wraps');
tabs()[0].listeners.keydown({key:'End',preventDefault(){}});flush();verify(active===tabs()[2],'End selects final');
location.hash='#/note/ai/03-agent-loop?id=diagram-anchor';winListeners.hashchange();flush();verify(root.dataset.view==='diagram' && scrolled?.id==='diagram-anchor','hidden anchor revealed');
const count=root.querySelectorAll('*').length;observer();flush();verify(root.querySelectorAll('*').length===count,'idempotent enhancement');
// Vue may retain root while replacing innerHTML: old dataset must not block new page.
fixture(root);location.hash='#/note/ai/03-react?view=written';observer();flush();verify(root.dataset.view==='written' && tabs().length===3,'SPA root reuse');
fixture(root,false);observer();flush();verify(!root.dataset.knowledgeReady && tabs().length===0,'ordinary incomplete page untouched');
blocked=true;fixture(root);location.hash='#/note/ai/03-tool-calling?view=unknown';observer();flush();verify(root.dataset.view==='oral','invalid view and denied storage fallback');
tabs()[1].listeners.click();flush();verify(root.dataset.view==='written','storage failure does not break view');
console.log(`PASS: ${checks} DOM-contract assertions (simulated DOM; not Docute/Chromium or Mermaid rendering).`);
