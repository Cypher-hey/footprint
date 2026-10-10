// Dependency-free source/contract checks. This does not prove browser rendering.
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
const root = resolve(import.meta.dirname, '..');
const labels = ['先用这条主线回答', '完整口语答案', '书面精讲', '概念图解'];
let checks = 0;
function check(value, message) { assert.ok(value, message); checks++; }
for (const name of ['03-agent-loop', '03-tool-calling', '03-react']) {
  const path = resolve(root, 'docs/note/ai', name + '.md');
  const text = readFileSync(path, 'utf8');
  const outside = text.replace(/```[\s\S]*?```/g, '');
  check((outside.match(/^# /gm) || []).length === 1, name + ': one H1');
  assert.deepEqual([...outside.matchAll(/^## (.+)$/gm)].map(m => m[1]), labels); checks++;
  check((text.match(/^```/gm) || []).length % 2 === 0, name + ': balanced fences');
  const parts = labels.map((label, i) => text.slice(text.indexOf('## ' + label), i < 3 ? text.indexOf('## ' + labels[i + 1]) : undefined));
  check((parts[0].match(/^\d\. /gm) || []).length >= 3, name + ': summary');
  check(parts[1].length >= 350 && !parts[1].includes('```'), name + ': real oral explanation');
  check(parts[2].length > parts[1].length, name + ': substantive written view');
  check(parts[2].includes('https://'), name + ': cited written view');
  check(!parts[2].includes('```mermaid'), name + ': no duplicated figure source');
  check((parts[3].match(/```mermaid/g) || []).length >= 2, name + ': progressive diagrams');
  const ids = [...outside.matchAll(/<a id="([^"]+)"/g)].map(m => m[1]);
  check(new Set(ids).size === ids.length, name + ': unique explicit anchors');
  for (const [,href] of outside.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^https?:/.test(href)) continue;
    if (href.startsWith('#')) { check(ids.includes(href.slice(1)), name + ': anchor ' + href); continue; }
    check(existsSync(resolve(dirname(path), decodeURIComponent(href.split('#')[0]))), name + ': link ' + href);
  }
}
const html = readFileSync(resolve(root, 'docs/index.html'), 'utf8');
check(html.includes('knowledge-reader.css') && html.includes('knowledge-reader.js'), 'reader assets loaded');
check(!html.includes('user-scalable=0'), 'browser zoom allowed');
check(!html.includes("securityLevel: 'loose'"), 'old Mermaid handler removed');
for (const name of ['03-agent-loop','03-tool-calling','03-react']) check(html.includes('/note/ai/' + name), 'nav ' + name);
console.log(`PASS: ${checks} source/contract assertions. Browser layout and live Mermaid rendering require separate acceptance.`);
