# JavaScript 问答：机制、反例与正文入口

> 审阅日期：2026-10-08。状态：重复知识纠错与归并；不保留无基准的性能倍数。

## 1. 闭包一定泄漏吗？

不会。闭包使函数继续访问词法环境中的绑定；是否泄漏取决于不再需要的数据是否仍被存活引用保留。不是“参数永远不回收”。见 [内存管理](../readings/hjswks/memory-leaks.md)。

## 2. 怎样判断数组？

通常使用 Array.isArray。instanceof 受构造器与跨 realm 影响；Object.prototype.toString 可受 Symbol.toStringTag 影响。不根据旧 jsperf 数字决定正确性。

## 3. CommonJS 输出是深拷贝吗？

不是。require 返回导出值，对象可共享；ESM 的导入绑定具有 live binding 语义。现代模块和历史 IIFE/AMD/CMD 分开学习，见 [模块](../basis/module.md)。

## 4. Map 与 Object 怎么选？

| 需求 | 候选 |
| --- | --- |
| 有固定字段的记录 | Object |
| 任意类型键、频繁增删与 size | Map |
| JSON 序列化 | 明确转换后的普通结构 |
| 不延长对象生命周期的关联 | WeakMap，注意不可枚举 |

不存在跨引擎统一“Map 多存 50%”或“所有插入一定更快”的保证。把属性设为 undefined 不等于删除，存在性、枚举和内存语义都会不同。

## 5. 自测

给出两个内容相同但身份不同的对象作为 Map 键；解释是否是同一个键。再对比 Object.hasOwn、in 与直接读取 truthy 的结果。

## 6. 正文

[值与参数](../basis/concepts.md) · [函数](../basis/func.md) · [数组与集合](../basis/array.md) · [异步](../basis/async.md)
