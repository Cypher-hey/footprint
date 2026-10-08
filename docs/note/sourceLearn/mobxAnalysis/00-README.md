# 📚 MobX 源码解析 - 文档索引

## 版本范围与本轮校核

旧笔记以 MobX 6.x 为范围，但没有固定 commit，因此内部字段、完整函数体与行号仍待逐项复现；不能把 main 或 6.x 写作永远的最新版。此次按官方公开 API 校正 action/追踪边界，未运行 MobX 测试。

### 先掌握这些边界

- action(fn) 创建包装函数，必须再调用；runInAction(fn) 才立即执行。await 之后更新 observable，要进入新的 action 或使用 flow。
- 追踪的是被跟踪函数同步执行时读取的 observable 属性。定时器、Promise 回调中才读取的数据不会自动成为外层 autorun 的依赖。
- computed 应保持派生计算的纯度；reaction/autorun 的 disposer 要随所属页面或服务销毁。状态可观察不代表所有对象递归成员都必然被追踪。
- 本系列包含内部实现教学片段，不应从应用直接调用私有字段或以简化版调度器替换框架。

核查日期：2026-10-08；[官方依据](https://mobx.js.org/actions.html)。以下原有长篇实现保留学习上下文；未验证部分不标记为“源码一致性通过”。

> 本系列共 **5 章**，深入解析 MobX 6.x 源码架构。

## 📖 快速开始

按顺序阅读，从第 1 章到第 5 章渐进式深入。

## 📝 文档列表

- [📚 文档索引（本文档）](./00-README.md)
- [第 1 章：项目概览与架构](./ch01-introduction.md)
- [第 2 章：核心算法](./ch02-core-algorithm.md)
- [第 3 章：数据类型层](./ch03-types-layer.md)
- [第 4 章：API 层](./ch04-api-layer.md)
- [第 5 章：最佳实践](./ch05-best-practices.md)

## 🔄 同步信息

- **最后同步时间**: 2026-03-12 00:41:57
- **文档数量**: 6 章
- **源位置**: /home/admin/.openclaw/workspace-source-code/output/mobxAnalysis
- **项目目录**: mobxAnalysis

---

*本文档由源码解析专家 Agent 自动生成*
