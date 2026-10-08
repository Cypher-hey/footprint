# 📚 Webpack 源码解析 - 文档索引

## 版本范围与本轮校核

沿用原系列 webpack 5.105.4 标签；本轮核对 Chunk 数据模型并校正模块、产物和优化概念。篇内大量简化函数与行数未逐行对齐，也未运行构建基准，不能把估计数字当实测。

### 先掌握这些边界

- Module 是模块模型；Chunk 是模块分组；Asset 是输出资源。一个 Chunk 的 files/auxiliaryFiles 可包含多个产物，三者不一一对应。
- Compiler 管理编译生命周期；每轮构建有 Compilation。loader 转换模块内容，plugin 参与钩子，不能仅按同步/异步区分二者。
- sideEffects 描述模块求值的副作用，不保证每个导出函数纯；usedExports、模块跳过、压缩删除是相关但不同的阶段。CSS 和注册逻辑要保留。
- runtime 可按配置抽离，不一定每个 chunk 各带一份。HMR 需要 accept/dispose 与框架支持，失败可能整页刷新，不保证保留全部状态。
- Module Federation 是运行时协作，不是安全隔离。singleton/版本协商不能替代兼容性测试；远程来源、降级和供应链风险需另行设计。

核查日期：2026-10-08；[官方依据](https://github.com/webpack/webpack/tree/v5.105.4)。以下原有长篇实现保留学习上下文；未验证部分不标记为“源码一致性通过”。

> 本系列共 10 章，深入解析 Webpack 源码架构。

## 📖 快速开始

按顺序阅读，从第 1 章到第 10 章渐进式深入。

## 📝 文档列表

- [第 1 章：Introduction](./ch01-introduction.md)
- [第 2 章：Compiler Compilation](./ch02-compiler-compilation.md)
- [第 3 章：Module Dependency](./ch03-module-dependency.md)
- [第 4 章：Chunk Split](./ch04-chunk-split.md)
- [第 5 章：Code Generation](./ch05-code-generation.md)
- [第 6 章：Runtime Hmr](./ch06-runtime-hmr.md)
- [第 7 章：Cache Optimization](./ch07-cache-optimization.md)
- [第 8 章：Tree Shaking](./ch08-tree-shaking.md)
- [第 9 章：Module Federation](./ch09-module-federation.md)
- [第 10 章：Summary](./ch10-summary.md)

## 🔄 同步信息

- **最后同步时间**: 2026-03-12 00:24:54
- **文档数量**: 10 章（另有索引）
- **源位置**: /home/admin/.openclaw/workspace-source-code/output/webpackAnalysis
- **项目目录**: webpackAnalysis

---

*本文档由源码解析专家 Agent 自动生成*
