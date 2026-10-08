# JavaScript 模块：ESM、CommonJS 与运行时边界

> 核查日期：2026-10-08。适用：现代浏览器及 Node.js；具体互操作取决于运行时版本。
> 状态：文档对照；示例未运行。

## 1. 模块解决什么

模块用明确导入导出管理依赖、作用域与初始化。文件拆分本身不保证低耦合：循环依赖、隐式副作用和跨层访问仍会让系统难维护。

## 2. 两种常见机制

| 维度 | ESM | CommonJS |
| --- | --- | --- |
| 表达 | import / export | require / module.exports |
| 绑定 | 导入绑定关联到导出 | require 返回导出值 |
| 常见加载 | 静态依赖图，也支持 import() | require 常见为同步加载 |
| 可分析性 | 静态声明便于工具分析 | 动态代码使分析更困难 |
| 环境 | 浏览器原生及 Node.js | 主要见于 Node.js 与打包兼容 |

CommonJS 的“值拷贝”不能理解为深拷贝。若导出对象，多个消费者可能拿到同一对象，属性修改可以被观察到；消费者解构出原始值后则不会变成 live binding。

## 3. 最小例子

```js
// counter.js（ESM）
export let count = 0;
export function increment() { count += 1; }

// consumer.js
import { count, increment } from "./counter.js";
increment();
console.log(count); // 预期 1
```

两个文件示例，需要分别保存于支持 ESM 的环境。导入方不能直接给 count 赋值；这与能否调用 increment 是不同权限。

## 4. 静态与动态导入

静态 import 必须在模块顶层，不是必须位于文件最前一行。动态 import() 可按需加载并返回 Promise；不能把所有依赖都说成编译时完全固定。

Tree shaking 不仅依赖 ESM，还受副作用、包声明和构建配置影响。不要为了缩包把真实副作用错误标为不存在。

## 5. 浏览器入口

```html
<script type="module" src="./main.js"></script>
<script nomodule src="./legacy.js"></script>
```

nomodule 是布尔属性，不是 type="nomodule"。模块 URL、MIME、跨源策略与路径扩展名需要由浏览器实际解析规则决定。

## 6. Node.js 与历史生态

Node.js 通过扩展名、package.json 和解析条件等识别模块。require 与 ESM 的互操作在不同版本中有边界，不应复制一份固定旧结论适用于所有版本。

AMD、CMD、UMD 和 IIFE 对理解历史工程有价值，但新项目选择应围绕目标运行时、发布格式、类型声明和包 exports 契约。

## 7. 验证题

- 同一个 CommonJS 导出对象被两处 require 后，修改其属性是否可见？
- 动态 import 是否等于把文件当任意脚本文本执行？
- 为什么 sideEffects: false 写错会导致打包后功能缺失？

## 8. 来源

- [Node.js CommonJS](https://nodejs.org/api/modules.html)
- [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
