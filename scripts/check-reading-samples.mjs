// Production compilation and content contracts; browser QA is a separate command.
import assert from 'node:assert/strict';
import {compile, confined} from './build-ai-topics.mjs';
import {readFileSync, cpSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';
let checks = 0;
const check = (value, message) => {assert.ok(value, message); checks++;};
const a = compile(), b = compile();
assert.deepEqual(a, b); checks++;
check(a.manifest.topics.length === 20, '20 topics');
check(Object.keys(a.files).length === 60, '60 modes');
check(a.manifest.topics.reduce((n,t)=>n+t.figureCount,0) === 57, '57 figures');
for (const t of a.manifest.topics) {
  check(t.defaultMode === 'explanation', t.id + ': default explanation');
  check(t.summary && t.title, t.id + ': fixed header');
  for (const m of t.modes) {
    const text = a.files[m.resource];
    const source = readFileSync(resolve('docs', m.source), 'utf8');
    const blocks = value => [...value.matchAll(/^```([^\n]*)\n([\s\S]*?)^```\s*$/gm)].filter(x => x[1] !== 'mermaid').map(x => x[1] + '\n' + x[2]);
    assert.deepEqual(blocks(text), blocks(source), t.id + ': code examples preserved'); checks++;
    check((text.match(/^\|/gm) || []).length === (source.match(/^\|/gm) || []).length, t.id + ': table rows preserved');
    check(m.resource.includes(a.manifest.version), t.id + ': version isolation');
    check(!text.includes('footprint:figure'), t.id + ': figure expansion');
    const captions = [...text.matchAll(/^#{2,6} (图 \d.+)$/gm)].map(x => x[1]);
    check(new Set(captions).size === captions.length, t.id + ': no duplicate caption headings');
    check(!/\]\((?!https?:)[^\s)]*\.md(?:#|\))/.test(text), t.id + ': source links mapped');
    if (m.id !== 'overview') check((text.match(/```mermaid/g) || []).length === t.figureCount, t.id + ': registered figures in ' + m.id);
  }
  check(Object.keys(t.legacyAnchors).length > 0, t.id + ': historical heading inventory');
}
for (const entry of ['../outside.json', '/tmp/x.json', 'https://x/a.json', '%2e%2e/a.json', 'a\\b.json', 'a.md']) {
  assert.throws(()=>confined('/tmp/package', entry, '.json')); checks++;
}
const temp = mkdtempSync(resolve(tmpdir(), 'footprint-contract-'));
try {
  cpSync('docs', resolve(temp, 'docs'), {recursive: true});
  const cases = [
    ['note/ai/topics/index.json', x=>{x.formatVersion=9;}, 'formatVersion'],
    ['note/ai/topics/index.json', x=>{x.topics[1].id=x.topics[0].id;}, 'duplicate'],
    ['note/ai/topics/03-agent-loop/modes/index.json', x=>{x.defaultMode='missing';}, 'defaultMode'],
    ['note/ai/topics/03-agent-loop/modes/index.json', x=>{x.modes[0].renderer='script';}, 'renderer'],
    ['note/ai/topics/03-agent-loop/topic.json', x=>{x.modes='../modes.json';}, 'package'],
    ['note/ai/topics/03-agent-loop/figures/index.json', x=>{x.figures[0].source='figures/missing.mmd';}, 'ENOENT']
  ];
  for (const [file, edit, message] of cases) {
    const path = resolve(temp, 'docs', file), original = readFileSync(path, 'utf8'), value = JSON.parse(original); edit(value); writeFileSync(path, JSON.stringify(value));
    assert.throws(()=>compile(resolve(temp, 'docs')), undefined, message); checks++; writeFileSync(path, original);
  }
  const path=resolve(temp,'docs/note/ai/topics/03-agent-loop/modes/overview.md'), original=readFileSync(path,'utf8');
  for (const suffix of ['\n<a id="x"></a>\n<a id="x"></a>', '\n<script>alert(1)</script>', '\n[图](../../03-react/figures/figure-01.mmd "footprint:figure")']) {
    writeFileSync(path, original + suffix); assert.throws(()=>compile(resolve(temp,'docs'))); checks++;
  }
} finally {rmSync(temp,{recursive:true,force:true});}
const html=readFileSync('docs/index.html','utf8');
check(html.includes('FootprintReader') && html.includes('topic-loader.js') && html.includes('knowledge-reader.js'), 'Docute adapter wired');
check(!html.includes('user-scalable=0'), 'zoom allowed');
check(readFileSync('docs/asset/knowledge-reader.js','utf8').includes("securityLevel: 'strict'"), 'Mermaid strict');
console.log(`PASS: ${checks} compilation/content/negative assertions. Not browser evidence.`);
