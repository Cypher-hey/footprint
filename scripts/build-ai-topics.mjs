// Deterministic author-package compiler. No network, model calls or content execution.
import {readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, existsSync, realpathSync} from 'node:fs';
import {resolve, dirname, relative, sep, posix} from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const slug = text => {
  text = text.replace(/<(?:.|\n)*?>/gm, '').replace(/[!"#$%&'()*+,/:;<=>?@[\\\]^`{|}~]/g, '').replace(/(\s|\.)/g, '-').replace(/-+/g, '-').toLowerCase();
  return /^\d/.test(text) ? '_' + text : text;
};
export function confined(base, entry, extension) {
  if (typeof entry !== 'string' || !entry || /[\\?#\x00-\x1f]/.test(entry) || posix.isAbsolute(entry) || /%|:/.test(entry)) throw Error(`Unsafe path: ${entry}`);
  const target = resolve(base, entry), rel = relative(base, target);
  if (!rel || rel === '..' || rel.startsWith('..' + sep) || !target.endsWith(extension)) throw Error(`Out of package/type: ${entry}`);
  return target;
}
const unique = (rows, file) => {
  const ids = new Set();
  for (const row of rows) {
    if (!/^[a-z][a-z0-9-]*$/.test(row.id) || ids.has(row.id)) throw Error(`${file}: invalid/duplicate ID ${row.id}`);
    ids.add(row.id);
  }
};
const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export function compile(sourceRoot = resolve(root, 'docs')) {
  const inputs = new Map();
  function read(path) {
    if (!realpathSync(path).startsWith(realpathSync(sourceRoot) + sep)) throw Error(`${path}: symlink outside content package`);
    const value = readFileSync(path, 'utf8');
    if (value.length > 300000) throw Error(`${path}: resource too large`);
    inputs.set(relative(sourceRoot, path).split(sep).join('/'), value);
    return value;
  }
  function json(path) {
    const value = JSON.parse(read(path));
    if (value.formatVersion !== 1) throw Error(`${path}: unsupported formatVersion`);
    return value;
  }
  const base = resolve(sourceRoot, 'note/ai/topics');
  const index = json(resolve(base, 'index.json'));
  unique(index.topics, 'topics/index.json');
  const topics = index.topics.map(row => {
    const file = confined(base, row.entry, '.json'), dir = dirname(file), topic = json(file);
    if (topic.id !== row.id || !topic.title || !topic.summary) throw Error(`${file}: identity/title/summary missing`);
    const modeFile = confined(dir, topic.modes, '.json'), modeDir = dirname(modeFile), modes = json(modeFile);
    unique(modes.modes, modeFile);
    if (!modes.modes.some(m => m.id === modes.defaultMode)) throw Error(`${modeFile}: missing defaultMode`);
    const figures = json(resolve(dir, 'figures/index.json'));
    unique(figures.figures, dir);
    const sources = new Map(figures.figures.map(f => {
      const path = confined(dir, f.source, '.mmd'), text = read(path);
      if (text.length > 40000 || text.split('\n').length > 300 || /(?:^|\n)\s*(?:click|%%\{)/.test(text)) throw Error(`${path}: unsafe/oversized Mermaid source`);
      return [path, {...f, text}];
    }));
    const compiled = modes.modes.map(m => {
      if (m.renderer !== 'markdown' || !m.label) throw Error(`${modeFile}: unknown renderer/label ${m.renderer}`);
      const path = confined(modeDir, m.entry, '.md'), text = read(path);
      const outside = text.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '');
      if ((outside.match(/^# /gm) || []).length !== 1 || (text.match(/^```/gm) || []).length % 2) throw Error(`${path}: H1/fence contract`);
      if (/```mermaid/.test(text)) throw Error(`${path}: duplicated Mermaid author source`);
      const anchors = [...outside.matchAll(/<a id="([^"]+)"><\/a>/g)].map(x => x[1]);
      if (new Set(anchors).size !== anchors.length) throw Error(`${path}: duplicate anchors`);
      if (/<[^>\n]+>/.test(outside.replace(/<a id="[a-zA-Z0-9_-]+"><\/a>/g, ''))) throw Error(`${path}: HTML outside anchor allowlist`);
      let content = text.replace(/^# .+\r?\n/, '');
      // This author package currently has one display formula; use native MathML without a new renderer dependency.
      // Unrecognized future formulas remain readable TeX, never executable HTML.
      content = content.replace(/\$\$\n([\s\S]*?)\n\$\$/g, (_, tex) => {
        const expected = String.raw`\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}+M\right)V`;
        if (tex.trim() !== expected) return '\n```text\n' + tex + '\n```\n';
        return '<div class="knowledge-math"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block" aria-label="Attention Q K V equals softmax of Q K transpose divided by square root d k plus M, times V"><mrow><mi>Attention</mi><mo>(</mo><mi>Q</mi><mo>,</mo><mi>K</mi><mo>,</mo><mi>V</mi><mo>)</mo><mo>=</mo><mi>softmax</mi><mo>(</mo><mfrac><mrow><mi>Q</mi><msup><mi>K</mi><mi>⊤</mi></msup></mrow><msqrt><msub><mi>d</mi><mi>k</mi></msub></msqrt></mfrac><mo>+</mo><mi>M</mi><mo>)</mo><mi>V</mi></mrow></math></div>\n\n<details><summary>查看公式 TeX 源码</summary><pre>' + escape(tex) + '</pre></details>';
      });
      const used = [];
      content = content.replace(/^\[([^\n]+)\]\(([^\s)]+) "footprint:figure"\)\s*$/gm, (_, caption, href, offset) => {
        const target = resolve(dirname(path), href);
        const f = sources.get(target);
        if (!f) throw Error(`${path}: unregistered figure ${href}`);
        used.push(f.id);
        const priorHeading = [...content.slice(0, offset).matchAll(/^#{2,6} (.+)$/gm)].at(-1)?.[1];
        const heading = m.id === 'explanation' && priorHeading !== caption ? '### ' + caption + '\n\n' : '';
        return `${heading}[共享图源](${href})\n\n\`\`\`mermaid\n${f.text.trim()}\n\`\`\`\n`;
      });
      if (content.includes('footprint:figure')) throw Error(`${path}: figure marker must be a standalone link`);
      const counts = new Map();
      const headingIds = [...content.matchAll(/^(#{2,6}) (.+)$/gm)].map(h => {
        const direct = slug(h[2]), count = counts.get(direct) || 0; counts.set(direct, count + 1); return direct + (count || '');
      });
      if (anchors.some(id => headingIds.includes(id))) throw Error(`${path}: explicit/generated anchor collision`);
      return {...m, source: relative(sourceRoot, path).split(sep).join('/'), content, anchors, headingIds, figures: used};
    });
    for (const f of figures.figures) {
      for (const key of ['explanation', 'diagrams']) if (!compiled.find(m => m.id === key)?.figures.includes(f.id) || !compiled.find(m => m.id === key)?.anchors.includes(f.id)) throw Error(`${dir}: ${f.id} reference/anchor absent from ${key}`);
    }
    if (readdirSync(resolve(dir, 'figures')).filter(f => f.endsWith('.mmd')).length !== sources.size) throw Error(`${dir}: unregistered source file`);
    return {...topic, slug: relative(base, dir).split(sep).join('/'), titleAnchor: slug(topic.title), defaultMode: modes.defaultMode, modes: compiled, figureCount: sources.size};
  });
  const routes = {}, files = {};
  for (const t of topics) {
    for (const route of t.legacyRoutes) {
      if (!/^\/note\/ai\/[a-z0-9-]+$/.test(route) || routes[route]) throw Error(`Invalid/duplicate route ${route}`);
      routes[route] = t.id;
    }
    routes['/note/ai/topics/' + t.slug + '/README'] = t.id;
    for (const m of t.modes) routes['/' + m.source.replace(/\.md$/, '')] = {topic: t.id, mode: m.id};
  }
  const lookup = new Map(topics.map(t => [t.id, t]));
  function target(href, source) {
    if (/^(?:https?:|mailto:)/.test(href)) return href;
    if (/^[a-z]+:|^\/\/|[\\\x00-\x1f]/i.test(href)) throw Error(`${source}: unsafe URL ${href}`);
    if (href.startsWith('#')) return href; // resolved below with current mode
    const [file, anchor] = href.split('#'), absolute = resolve(sourceRoot, dirname(source), decodeURIComponent(file));
    if (!absolute.startsWith(sourceRoot + sep) || !existsSync(absolute)) throw Error(`${source}: missing/outside link ${href}`);
    if (!file.endsWith('.md')) return relative(sourceRoot, absolute).split(sep).join('/');
    const route = '/' + relative(sourceRoot, absolute).split(sep).join('/').replace(/\.md$/, '');
    const mapped = routes[route];
    if (mapped) {
      const t = lookup.get(typeof mapped === 'string' ? mapped : mapped.topic), mode = typeof mapped === 'string' ? t.defaultMode : mapped.mode;
      if (anchor && !t.modes.find(m => m.id === mode).anchors.includes(decodeURIComponent(anchor)) && !t.modes.find(m => m.id === mode).headingIds.includes(decodeURIComponent(anchor))) throw Error(`${source}: missing target anchor ${href}`);
      return t.legacyRoutes[0] + '?view=' + mode + (anchor ? '&id=' + encodeURIComponent(decodeURIComponent(anchor)) : '');
    }
    return route + (anchor ? '?id=' + encodeURIComponent(decodeURIComponent(anchor)) : '');
  }
  for (const t of topics) {
    t.legacyAnchors = {};
    for (const m of t.modes) {
      m.content = m.content.replace(/\[([^\]\n]+)\]\(([^\s)]+)(?: "([^"]*)")?\)/g, (_, label, href, title) => {
        if (href.startsWith('#')) {
          const id = decodeURIComponent(href.slice(1));
          if (!m.anchors.includes(id) && !m.headingIds.includes(id)) throw Error(`${m.source}: missing anchor ${id}`);
          href = t.legacyRoutes[0] + '?view=' + m.id + '&id=' + encodeURIComponent(id);
        } else href = target(href, m.source);
        return `[${label}](${href}${title ? ' "' + title + '"' : ''})`;
      });
    }
    const legacy = read(resolve(sourceRoot, t.legacyRoutes[0].slice(1) + '.md')).replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '');
    const counts = new Map();
    for (const h of legacy.matchAll(/^(#{2,6}) (.+)$/gm)) {
      const direct = slug(h[2]), n = counts.get(direct) || 0; counts.set(direct, n + 1); const old = direct + (n || '');
      let match;
      for (const m of t.modes) if (m.headingIds.includes(direct)) {match = {mode: m.id, id: direct}; break;}
      if (!match) {
        const specials = {'先用这条主线回答': 'overview', '完整口语答案': 'overview', '快速回顾': 'overview', '书面精讲': 'explanation', '概念图解': 'diagrams', '把三张知识卡连起来': 'diagrams', '图解后的关联': 'diagrams'};
        const mode = specials[h[2]];
        if (mode) match = {mode, id: ['把三张知识卡连起来', '图解后的关联'].includes(h[2]) ? slug('图没有承诺什么') : ''};
      }
      if (!match) throw Error(`${t.slug}: unmapped historical heading ${h[2]}`);
      t.legacyAnchors[old] = match;
    }
  }
  // Compiler identity includes configuration as well as author files.
  const hash = createHash('sha256').update(readFileSync(fileURLToPath(import.meta.url))).update(JSON.stringify([...inputs].sort())).digest('hex').slice(0, 20);
  for (const t of topics) for (const m of t.modes) {
    m.resource = `asset/ai-topics/${hash}/${t.slug}/${m.id}.md`;
    files[m.resource] = m.content;
    delete m.content;
  }
  return {manifest: {formatVersion: 1, version: hash, topics, routes}, files};
}
export function build(out = resolve(root, 'build')) {
  const result = compile();
  rmSync(resolve(out, 'asset/ai-topics'), {recursive: true, force: true});
  for (const [file, content] of Object.entries(result.files)) {mkdirSync(dirname(resolve(out, file)), {recursive: true}); writeFileSync(resolve(out, file), content);}
  mkdirSync(resolve(out, 'asset'), {recursive: true});
  writeFileSync(resolve(out, 'asset/ai-topic-manifest.json'), JSON.stringify(result.manifest, null, 2) + '\n');
  writeFileSync(resolve(out, 'asset/ai-topic-manifest.js'), 'window.FootprintTopics = ' + JSON.stringify(result.manifest).replace(/</g, '\\u003c') + ';\n');
  console.log(`PASS build: ${result.manifest.topics.length} topics, ${Object.keys(result.files).length} modes, ${result.manifest.topics.reduce((n,t)=>n+t.figureCount,0)} figures; version ${result.manifest.version}`);
  return result;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) build(process.argv[2] ? resolve(process.argv[2]) : undefined);
