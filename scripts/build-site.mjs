import {execFileSync} from 'node:child_process';
import {readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from './build-ai-topics.mjs';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(process.argv[2] || resolve(root, 'build'));
if (out === root || out.startsWith(resolve(root, 'docs'))) throw Error('Output must not overwrite author source');
rmSync(out, {recursive: true, force: true});
const files = execFileSync('git', ['ls-files', '-z', 'docs'], {cwd: root, encoding: 'utf8'}).split('\0').filter(Boolean);
for (const file of files) {
  const relative = file.slice(5);
  if ((relative.startsWith('implementation/') && relative !== 'implementation/AI_TOPIC_INTEGRATION.md') || relative.split('/').some(p => p.startsWith('.'))) continue;
  mkdirSync(dirname(resolve(out, relative)), {recursive: true}); copyFileSync(resolve(root, file), resolve(out, relative));
}
// New source files are explicit so an untracked preview is complete too.
for (const file of ['topic-loader.js', 'mermaid-11.17.2.min.js', 'mermaid-LICENSE']) {mkdirSync(resolve(out, 'asset'), {recursive: true}); copyFileSync(resolve(root, 'docs/asset', file), resolve(out, 'asset', file));}
const result = build(out);
const commit = execFileSync('git', ['rev-parse', 'HEAD'], {cwd: root, encoding: 'utf8'}).trim();
const branch = execFileSync('git', ['branch', '--show-current'], {cwd: root, encoding: 'utf8'}).trim();
writeFileSync(resolve(out, 'version.json'), JSON.stringify({repository: 'Cypher-hey/footprint', branch, commit, contentVersion: result.manifest.version}, null, 2) + '\n');
console.log(`Static site: ${out}; source ${commit}`);
