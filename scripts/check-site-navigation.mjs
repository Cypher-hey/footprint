import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import vm from 'node:vm';
const context = {window: {}};
vm.runInNewContext(readFileSync('docs/asset/site-navigation-data.js', 'utf8'), context);
const data = JSON.parse(JSON.stringify(context.window.FootprintNavigation));
assert.equal(data.formatVersion, 1);
assert.deepEqual(data.domains.map(d => d.id), ['ai', 'frontend', 'computer', 'tools', 'source', 'language']);
const ids = new Set(), paths = new Set(); let groups = 0;
function unique(id) {assert.match(id, /^[a-z][a-z0-9-]+$/); assert(!ids.has(id), 'duplicate ID: ' + id); ids.add(id);}
for (const d of data.domains) {
  unique(d.id); assert(d.title && d.groups.length);
  for (const g of d.groups) {
    unique(g.id); assert(g.title && g.articles.length, 'empty group'); groups++;
    for (const a of g.articles) {
      unique(a.id); assert(a.title && a.title.trim());
      assert.match(a.path, /^\/[A-Za-z0-9/ _&.-]+$/); assert(!a.path.endsWith('/'));
      assert(!paths.has(a.path), 'duplicate path: ' + a.path); paths.add(a.path);
      assert(existsSync('docs' + a.path + '.md'), 'missing route: ' + a.path);
      const project = a.path.match(/^\/note\/sourceLearn\/([^/]+)\//)?.[1];
      const names = {preactAnalysis: 'Preact', 'react-native-analysis': 'React Native', zustandAnalysis: 'Zustand', mobxAnalysis: 'Mobx', webpackAnalysis: 'Webpack 5', 'openclaw-agent-skills': 'OpenClaw Agent Skills'};
      if (project && names[project]) assert.equal(g.title, names[project]);
    }
  }
}
const migration = JSON.parse(readFileSync('docs/implementation/NAVIGATION_MIGRATION.json'));
const validBefore = migration.baselineEntries.filter(a => existsSync('docs' + a.path + '.md'));
for (const a of validBefore) assert(paths.has(a.path), 'lost old route: ' + a.path);
assert.equal(migration.removed.length, migration.baselineEntries.length - validBefore.length);
for (const a of migration.removed) {assert(!existsSync('docs' + a.path + '.md')); assert(a.reason);}
const files = execFileSync('git', ['ls-files', 'docs/note'], {encoding: 'utf8'}).trim().split('\n');
const articles = files.filter(f => f.endsWith('.md') && !f.includes('/ai/topics/'));
for (const f of articles) assert(paths.has('/' + f.slice(5, -3)), 'uncovered document: ' + f);
const packages = files.filter(f => f.endsWith('/topic.json'));
for (const f of packages) {const topic = JSON.parse(readFileSync(f)); assert(topic.legacyRoutes.some(p => paths.has(p)), 'uncovered AI topic: ' + topic.id);}
assert.equal(data.domains.flatMap(d => d.groups).filter(g => g.title === 'TypeScript').length, 1);
assert(!/type:\s*'dropdown'/.test(readFileSync('docs/index.html', 'utf8')), 'duplicate old menu');
console.log(`PASS navigation schema: ${data.domains.length} domains, ${groups} nonempty groups, ${paths.size} unique real routes; all ${validBefore.length}/${validBefore.length} valid old entries, ${articles.length} top-level note documents, ${packages.length} AI topics covered; ${migration.removed.length} documented invalid entries.`);
