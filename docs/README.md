# Footprint 知识地图

先理解机制，再用示例和反例验证。已有资料保留原路径，新旧版本结论通过正文说明区分。

## 阅读方式

- **第一次学习**：看导读、核心概念、最小示例。
- **工程使用**：看边界、失败路径与验证清单。
- **历史资料**：先确认框架和浏览器年代，再决定是否适用。
- **源码解构**：先核对仓库版本和路径；教学代码不等于当前实现。

[全部文档索引](ALL_DOCUMENTS.md) · [审阅进度与已知问题](REVIEW_STATUS.md) · [Mermaid 规范](MERMAID_SPEC.md)

## 前端基础路径

| 阶段 | 主题 | 推荐入口 |
| --- | --- | --- |
| 语言语义 | 值、对象、函数、异步 | [值与引用](note/basis/concepts.md)、[函数](note/basis/func.md)、[异步](note/basis/async.md) |
| 数据操作 | 数组、字符串、正则 | [数组](note/basis/array.md)、[字符串](note/basis/string.md)、[正则](note/basis/regexp.md) |
| Web 平台 | DOM、事件、存储 | [DOM](note/dom/dom.md)、[事件](note/dom/dom-event.md)、[Cookie 与存储](note/basis/cookie-storage.md) |
| 网络安全 | 方法、缓存、跨源、CSP | [GET/POST](note/http/get-post.md)、[缓存](note/http/cache.md)、[跨源](note/http/cross-domain.md)、[CSP](note/security/csp.md) |
| 界面体验 | 布局、渲染、无障碍 | [布局](note/css3/layout.md)、[布局与绘制](note/performance/reflow-repaint.md)、[ARIA](note/specification/aria.md) |
| 工程化 | TS、模块、工具链 | [TypeScript](note/ts/base.md)、[模块](note/basis/module.md)、[npm](note/npm/npm-base.md) |
| 框架 | React、Redux、Vue | [React](note/react/react-base.md)、[Redux](note/react/redux-base.md)、[Vue 历史生命周期](note/vue/cycle-life.md) |
| 算法基础 | 结构、不变量、复杂度 | [数据结构](note/algorithm/data-structure.md)、[复杂度](note/algorithm/time-space.md)、[链表](note/algorithm/linked-list.md) |

## 源码阅读

源码专题包含 Preact、React Native、MobX、Zustand、Webpack 和 OpenClaw。通过[完整索引](ALL_DOCUMENTS.md)进入，不把某篇源码笔记当作跨版本 API 合同。

## 其他积累

外语、历史兼容性、读书摘记和命令速查保留在原目录。命令示例只用于学习；执行安装、凭据或部署操作前应单独审查影响。

## 本轮维护原则

优先修正会影响实现和安全判断的结论。结构扫描、正文审阅、官方来源对照、代码实测、网页实测分别记录，避免用“已整理”代替验证证据。
