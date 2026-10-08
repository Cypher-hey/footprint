# CSP：内容安全策略与 XSS 防御边界

> 核查日期：2026-10-08。状态：知识说明，未修改任何站点安全配置。

## 1. CSP 解决什么

CSP 约束页面可加载和执行的内容，是纵深防御的一层。它不能替代按上下文编码、HTML 清洗、避免危险注入点和服务端授权。

不可信字符串进入 HTML、URL、JavaScript 或 CSS 时，所需处理不同；把所有输入统一转成 HTML 实体并不充分。

## 2. 常见指令

| 指令 | 作用 |
| --- | --- |
| default-src | 部分资源获取指令的回退 |
| script-src | 脚本来源及相关执行约束 |
| style-src / img-src | 样式与图片 |
| connect-src | fetch、XHR、WebSocket 等连接 |
| frame-src | 页面可嵌入哪些 frame |
| frame-ancestors | 谁可以把当前页面嵌入 frame |
| object-src | object/embed 等内容 |
| base-uri | base 元素可使用的 URL |
| form-action | 表单提交目标 |

default-src 不是所有指令的万能默认值。frame-ancestors 与 frame-src 方向相反，旧文对此不准确。

## 3. 交付方式

优先使用 HTTP 响应头。meta 方式有能力限制，例如不能等价表达所有响应头策略；不能把配置方式视为完全互换。

先通过 Report-Only 观察违规，再分阶段收紧；报告本身可能含敏感 URL，应控制收集与访问。文档示例不应让读者未经评估直接复制到生产。

## 4. 脚本与内联代码

可考虑基于随机 nonce 或内容 hash 的严格策略，注意每次响应 nonce 的生成与分发。简单放宽 unsafe-inline/unsafe-eval 可能削弱防护，不能只为消除控制台告警而放行。

允许可信 CDN 也不保证其中每个资源安全；依赖供应链、版本固定和资源完整性需要独立考虑。

## 5. Mermaid 与富文本

渲染外部 Markdown/HTML 的工具可能有自己的安全设置。站点 CSP、Markdown 清洗、Mermaid 安全级别各有职责，不能把某一层开启就当作全链路安全。

## 6. 验证清单

正常资源是否可加载？内联脚本、事件属性、危险 URL、未授权 frame 是否被处理？第三方脚本和动态加载路径是否完整？实际违规日志是否被监控？

## 7. 来源

- [MDN CSP 指南](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
