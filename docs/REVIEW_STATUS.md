# 文档审阅与迭代记录

> 更新：2026-10-08；基线：next @ f915d710af69cd0ee3860bad5b4351e6ee40ae68；工作分支：ai/next。
> 原有 Markdown：153 篇，合计 1,507,187 字节。已经读取全部文件用于目录与结构盘点；读取和结构扫描不等于逐条事实核查。

## 批次 1：规范与高影响纠错

修订写作/图表规范，重写参数传递、Cookie、GET/POST、缓存、跨源、布局绘制与 ARIA。更新阅读入口，生成全部文档索引。示例均未执行，站点未启动。

## 批次 2：语言/框架与 AI 体系

修订 React、Redux、模块、TypeScript 基础与运算符、数组、函数、异步共 8 篇。新增 AI 总览与 14 篇章节；覆盖基础、循环、上下文、工具、检索、UI、工作流、安全、评测、多 Agent、编码与后训练。AI 为独立编写文档，未复现模型实验。

## 批次 3：浏览器、网络与算法

继续修订网络版本、DNS、CSP、DOM、脚本加载、CSS 布局、性能与数据结构。修正 DNS 43 端口、DOM 兄弟方向、offset 可写、旧引擎性能倍数、BST 空节点、BFS 重复入队和位运算加法等问题。

位运算新增 3 个纯函数的 9 条断言在 JavaScript 执行环境通过；不代表仓库测试、浏览器或其他示例通过。

## 发现的展示问题（尚未修改运行时代码）

- docs/index.html 使用 Docute；提交说明中的 Docusaurus 与实际入口不一致。
- Mermaid 使用一次性 done 标记，可能造成切页图表不渲染；需要浏览器复现。
- Mermaid 显式 loose 安全级别，调整需单独评审。
- 菜单含若干不存在的占位目标；新首页采用已存在文件的直接链接。
- package.json 的 test 是失败占位，不能当作已有测试设施。

## 覆盖清单

| 文件 | 本轮状态 | 后续检查 |
| --- | --- | --- |
| [DEPLOY.md](https://github.com/Cypher-hey/footprint/blob/ai/next/DEPLOY.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [MARKDOWN_SPEC.md](https://github.com/Cypher-hey/footprint/blob/ai/next/MARKDOWN_SPEC.md) | 已修订；见正文验证范围 | 代码示例/网页效果未实测 |
| [README.md](https://github.com/Cypher-hey/footprint/blob/ai/next/README.md) | 已修订；见正文验证范围 | 代码示例/网页效果未实测 |
| [docs/MERMAID_SPEC.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/MERMAID_SPEC.md) | 已修订；见正文验证范围 | 代码示例/网页效果未实测 |
| [docs/README.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/README.md) | 已修订；见正文验证范围 | 代码示例/网页效果未实测 |
| [docs/note/advanceJS/APL.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/advanceJS/APL.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/advanceJS/advance-base.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/advanceJS/advance-base.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/advanceJS/design-pattern.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/advanceJS/design-pattern.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/advanceJS/js-in-use.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/advanceJS/js-in-use.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/advanceJS/node.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/advanceJS/node.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/advanceJS/stackoverflow-snippets.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/advanceJS/stackoverflow-snippets.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/advanceJS/useful-snippets.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/advanceJS/useful-snippets.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/advanceJS/useful-tips.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/advanceJS/useful-tips.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/algorithm/advance-sort.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/algorithm/advance-sort.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/algorithm/basic-sort.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/algorithm/basic-sort.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/algorithm/bst.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/algorithm/bst.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/algorithm/data-structure.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/algorithm/data-structure.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/algorithm/example-1.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/algorithm/example-1.md) | 已修订；正文/示例静态审阅 | 新增3个函数的9条断言通过，其他未运行 |
| [docs/note/algorithm/graph.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/algorithm/graph.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/algorithm/linked-list.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/algorithm/linked-list.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/algorithm/queue.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/algorithm/queue.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/algorithm/stack.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/algorithm/stack.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/algorithm/time-space.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/algorithm/time-space.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/basis/array.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/basis/array.md) | 已修订；正文审阅与关键语义核查 | 示例未运行，详见正文 |
| [docs/note/basis/async.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/basis/async.md) | 已修订；正文审阅与关键语义核查 | 示例未运行，详见正文 |
| [docs/note/basis/concepts.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/basis/concepts.md) | 已修订；见正文验证范围 | 代码示例/网页效果未实测 |
| [docs/note/basis/cookie-storage.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/basis/cookie-storage.md) | 已修订；见正文验证范围 | 代码示例/网页效果未实测 |
| [docs/note/basis/func.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/basis/func.md) | 已修订；正文审阅与关键语义核查 | 示例未运行，详见正文 |
| [docs/note/basis/javascript-info.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/basis/javascript-info.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/basis/module.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/basis/module.md) | 已修订；正文审阅与关键语义核查 | 示例未运行，详见正文 |
| [docs/note/basis/regexp.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/basis/regexp.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/basis/string.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/basis/string.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/collect/javascript.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/collect/javascript.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/collect/related-work.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/collect/related-work.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/compatibility/compatibility.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/compatibility/compatibility.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/css3/bfc.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/css3/bfc.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/css3/layout.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/css3/layout.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/css3/matrix.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/css3/matrix.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/css3/selector.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/css3/selector.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/css3/transform.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/css3/transform.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/cultureLanguage/english/pronunciation.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/cultureLanguage/english/pronunciation.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/cultureLanguage/japanese/pronunciation.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/cultureLanguage/japanese/pronunciation.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/deploy/norm.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/deploy/norm.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/dom/dom-event.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/dom/dom-event.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/dom/dom.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/dom/dom.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/functionalProgram/fp-base.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/functionalProgram/fp-base.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/git/commonly-used.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/git/commonly-used.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/git/config.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/git/config.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/git/git-base.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/git/git-base.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/h5/rem.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/h5/rem.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/http/ajax.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/http/ajax.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/http/cache.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/http/cache.md) | 已修订；见正文验证范围 | 代码示例/网页效果未实测 |
| [docs/note/http/cross-domain.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/http/cross-domain.md) | 已修订；见正文验证范围 | 代码示例/网页效果未实测 |
| [docs/note/http/dns.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/http/dns.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/http/get-post.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/http/get-post.md) | 已修订；见正文验证范围 | 代码示例/网页效果未实测 |
| [docs/note/http/http-concepts.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/http/http-concepts.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/http/url-render.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/http/url-render.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/linux/linux-base.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/linux/linux-base.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/linux/linux-command.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/linux/linux-command.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/linux/shell.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/linux/shell.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/linux/ubuntu-utils.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/linux/ubuntu-utils.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/linux/vim.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/linux/vim.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/mermaid-diag.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/mermaid-diag.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/mermaid-test.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/mermaid-test.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/nginx/nginx-base.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/nginx/nginx-base.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/npm/npm-base.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/npm/npm-base.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/openclaw-agent/01-soul.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/openclaw-agent/01-soul.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/openclaw-agent/02-agents.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/openclaw-agent/02-agents.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/openclaw-agent/03-user.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/openclaw-agent/03-user.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/openclaw-agent/04-identity.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/openclaw-agent/04-identity.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/openclaw-agent/05-tools.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/openclaw-agent/05-tools.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/openclaw-agent/06-bootstrap.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/openclaw-agent/06-bootstrap.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/openclaw-agent/07-memory.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/openclaw-agent/07-memory.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/openclaw-agent/README.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/openclaw-agent/README.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/openclaw-agent/agent-frontend.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/openclaw-agent/agent-frontend.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/openclaw-agent/agent-invoice.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/openclaw-agent/agent-invoice.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/openclaw-agent/agent-source-code.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/openclaw-agent/agent-source-code.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/openclaw-agent/main.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/openclaw-agent/main.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/performance/DOM.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/performance/DOM.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/performance/ECMAScript.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/performance/ECMAScript.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/performance/h5-perf.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/performance/h5-perf.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/performance/performance.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/performance/performance.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/performance/reflow-repaint.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/performance/reflow-repaint.md) | 已修订；见正文验证范围 | 代码示例/网页效果未实测 |
| [docs/note/performance/render-page.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/performance/render-page.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/performance/ssr.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/performance/ssr.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/point/collect-code.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/point/collect-code.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/point/collect-css.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/point/collect-css.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/point/collect-h5.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/point/collect-h5.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/point/collect-html.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/point/collect-html.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/point/collect-http.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/point/collect-http.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/point/collect-js.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/point/collect-js.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/point/collect-ti.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/point/collect-ti.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/point/collect-web.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/point/collect-web.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/react/react-base.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/react/react-base.md) | 已修订；正文审阅与关键语义核查 | 示例未运行，详见正文 |
| [docs/note/react/redux-base.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/react/redux-base.md) | 已修订；正文审阅与关键语义核查 | 示例未运行，详见正文 |
| [docs/note/readings/hjswks/memory-leaks.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/readings/hjswks/memory-leaks.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/readings/lagou/flutter.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/readings/lagou/flutter.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/readings/lagou/js.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/readings/lagou/js.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/security/csp.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/security/csp.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/sourceLearn/mermaid-test.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/mermaid-test.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/mobxAnalysis/00-README.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/mobxAnalysis/00-README.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/mobxAnalysis/ch01-introduction.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/mobxAnalysis/ch01-introduction.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/mobxAnalysis/ch02-core-algorithm.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/mobxAnalysis/ch02-core-algorithm.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/mobxAnalysis/ch03-types-layer.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/mobxAnalysis/ch03-types-layer.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/mobxAnalysis/ch04-api-layer.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/mobxAnalysis/ch04-api-layer.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/mobxAnalysis/ch05-best-practices.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/mobxAnalysis/ch05-best-practices.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/openclaw-agent-skills/ch01-agent-architecture.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/openclaw-agent-skills/ch01-agent-architecture.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/openclaw-agent-skills/ch02-skills-system.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/openclaw-agent-skills/ch02-skills-system.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/openclaw-agent-skills/ch03-agent-skills-integration.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/openclaw-agent-skills/ch03-agent-skills-integration.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/openclaw-agent-skills/ch04-architecture-comparison.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/openclaw-agent-skills/ch04-architecture-comparison.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/preactAnalysis/ch01-architecture-overview.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/preactAnalysis/ch01-architecture-overview.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/preactAnalysis/ch02-h-function-vnode.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/preactAnalysis/ch02-h-function-vnode.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/preactAnalysis/ch03-render-mount-flow.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/preactAnalysis/ch03-render-mount-flow.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/preactAnalysis/ch04-diff-algorithm-core.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/preactAnalysis/ch04-diff-algorithm-core.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/preactAnalysis/ch05-children-diff-keyed.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/preactAnalysis/ch05-children-diff-keyed.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/preactAnalysis/ch06-component-lifecycle.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/preactAnalysis/ch06-component-lifecycle.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/preactAnalysis/ch07-hooks-implementation.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/preactAnalysis/ch07-hooks-implementation.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/preactAnalysis/ch08-summary-best-practices.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/preactAnalysis/ch08-summary-best-practices.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/react-native-analysis/ch01-architecture-overview.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/react-native-analysis/ch01-architecture-overview.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/react-native-analysis/ch02-javascript-side.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/react-native-analysis/ch02-javascript-side.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/react-native-analysis/ch03-native-side.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/react-native-analysis/ch03-native-side.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/react-native-analysis/ch04-rendering-system.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/react-native-analysis/ch04-rendering-system.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/react-native-analysis/ch05-summary-best-practices.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/react-native-analysis/ch05-summary-best-practices.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/webpackAnalysis/00-README.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/webpackAnalysis/00-README.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/webpackAnalysis/README.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/webpackAnalysis/README.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/webpackAnalysis/ch01-introduction.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/webpackAnalysis/ch01-introduction.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/webpackAnalysis/ch02-compiler-compilation.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/webpackAnalysis/ch02-compiler-compilation.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/webpackAnalysis/ch03-module-dependency.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/webpackAnalysis/ch03-module-dependency.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/webpackAnalysis/ch04-chunk-split.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/webpackAnalysis/ch04-chunk-split.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/webpackAnalysis/ch05-code-generation.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/webpackAnalysis/ch05-code-generation.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/webpackAnalysis/ch06-runtime-hmr.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/webpackAnalysis/ch06-runtime-hmr.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/webpackAnalysis/ch07-cache-optimization.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/webpackAnalysis/ch07-cache-optimization.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/webpackAnalysis/ch08-tree-shaking.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/webpackAnalysis/ch08-tree-shaking.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/webpackAnalysis/ch09-module-federation.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/webpackAnalysis/ch09-module-federation.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/webpackAnalysis/ch10-summary.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/webpackAnalysis/ch10-summary.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/zustandAnalysis/ch01-overview.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/zustandAnalysis/ch01-overview.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/zustandAnalysis/ch02-store-creation.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/zustandAnalysis/ch02-store-creation.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/zustandAnalysis/ch03-react-integration.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/zustandAnalysis/ch03-react-integration.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/zustandAnalysis/ch04-middleware.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/zustandAnalysis/ch04-middleware.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/zustandAnalysis/ch05-flow-analysis.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/zustandAnalysis/ch05-flow-analysis.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/sourceLearn/zustandAnalysis/ch06-summary-best-practices.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/sourceLearn/zustandAnalysis/ch06-summary-best-practices.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/specification/aria.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/specification/aria.md) | 已修订；见正文验证范围 | 代码示例/网页效果未实测 |
| [docs/note/specification/cypher.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/specification/cypher.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/specification/dtd.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/specification/dtd.md) | 已修订；正文/示例静态审阅 | 示例与浏览器行为未实测 |
| [docs/note/specification/eslintrc.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/specification/eslintrc.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/ts/base.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/ts/base.md) | 已修订；正文审阅与关键语义核查 | 示例未运行，详见正文 |
| [docs/note/ts/symbols.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/ts/symbols.md) | 已修订；正文审阅与关键语义核查 | 示例未运行，详见正文 |
| [docs/note/vue/cycle-life.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/vue/cycle-life.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/vue/data-bind.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/vue/data-bind.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/vue/vue-records.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/vue/vue-records.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/vue/vue3.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/vue/vue3.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/ydkJS/note.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/ydkJS/note.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |
| [docs/note/ydkJS/this&OBJECT PROTOTYPES.md](https://github.com/Cypher-hey/footprint/blob/ai/next/docs/note/ydkJS/this&OBJECT%20PROTOTYPES.md) | 结构已盘点，内容待逐篇核查 | 结论、年代、示例、来源 |

## 新增 AI 内容

- [AI 基础：从机器学习到大语言模型](note/ai/01-foundations.md)：正文完成，示例未执行。
- [推理请求：输入、采样、结构化输出与流式传输](note/ai/02-inference.md)：正文完成，示例未执行。
- [Agent Loop：工具结果怎样成为下一轮输入](note/ai/03-agent-loop.md)：正文完成，示例未执行。
- [Context Builder：选择、预算、压缩与记忆](note/ai/04-context-memory.md)：正文完成，示例未执行。
- [工具、MCP 与 Skills：三种不同的能力边界](note/ai/05-tools-mcp-skills.md)：正文完成，示例未执行。
- [RAG 与长期记忆：从找得到到用得对](note/ai/06-retrieval.md)：正文完成，示例未执行。
- [AI 原生界面：Catalog、UI IR、Event IR 与可信执行](note/ai/07-ui-ir.md)：正文完成，示例未执行。
- [Workflow、状态机与 XState：把行为边界写清楚](note/ai/08-workflow-state.md)：正文完成，示例未执行。
- [Agent 可靠性与安全：把权限和恢复放在模型之外](note/ai/09-reliability-security.md)：正文完成，示例未执行。
- [Evals 与可观测性：让改进成为可验证的判断](note/ai/10-evaluation.md)：正文完成，示例未执行。
- [多 Agent：分工收益、上下文成本与单一责任人](note/ai/11-multi-agent.md)：正文完成，示例未执行。
- [AI Coding 与 Harness：把交付变成受控闭环](note/ai/12-ai-coding.md)：正文完成，示例未执行。
- [深入模型层：后训练、蒸馏与推理系统](note/ai/13-training-inference-systems.md)：正文完成，示例未执行。
- [贯穿实践：可验证的 AI 知识卡片助手](note/ai/14-learning-project.md)：正文完成，示例未执行。

## 完成口径

当前为分批交付，不是全仓事实校验完成。后续修订必须更新此表，不可将未审阅条目标为通过。没有启动 Work / Codex 工程任务，没有合并或部署。
