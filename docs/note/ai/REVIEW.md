# AI 知识库审阅记录与证据范围

> 日期：2026-10-08。此次迭代基线：981da7bbbdd14317030c64344f5ba9d78b095315。
> 审查对象：18 篇主题正文与知识库导航。目标是知识储备与印证，不是课程或工程项目。

## 1. 本轮调整

- 原 14 个文件路径保留，正文改为认知问题、机制、辨析、案例和深入入口。
- 新增机器学习、语言模型机制、提示行为、多模态 4 个基础专题。
- 第 14 篇由项目练习改为全景关联与实践印证规范。
- 新增主题关系图、59 项术语入口、Advance 问题索引和条目规范。
- 已移除原章节里的作业、自测和项目里程碑要求；解释性代码、算例、评估用例保留。
- 未安装依赖、启动模型/API 实验、创建应用、改站点运行时代码或迁移框架。

## 2. 逐主题核查范围

| 条目 | 本轮主要核查 | 依据/性质 | 未声称完成 |
| --- | --- | --- | --- |
| 01 全景 | 方法/模型/系统的分类轴，训练与上下文边界 | 基础术语＋自写概念地图 | 整个 AI 学科完整覆盖 |
| 02 推理 | 请求/计算/事件分帧/业务完成的区别 | MDN SSE；平台无关说明 | 真实厂商 SDK 接入 |
| 03 Loop | 调用与结果关联、控制权、停止状态 | ReAct 高层方法；自写运行模型 | 可恢复 Agent 实现 |
| 04 Context | 生命周期、预算、摘要失真 | 固定参考书主题；自写算例 | token 实际计费或摘要模型实验 |
| 05 工具 | MCP 角色、能力、调用字段与权限区别 | MCP 2025-06-18 Architecture/Tools | 当前最新协议声明或 Server 联调 |
| 06 检索 | 检索/生成/引用阶段与知识维护 | RAG 论文高层机制；自写管道分析 | 检索基准实测 |
| 07 UI IR | 引用图、事件与权限边界 | 自定义解释性合同 | ChatGPT 私有协议或统一行业标准 |
| 08 状态 | 发布中/未知态、Actor 与远端效果 | XState Actor 文档；自写状态模型 | 状态机代码或分布式恢复运行 |
| 09 安全 | 批准、幂等、Outbox、注入与日志 | OWASP、AWS 官方设计说明 | 渗透测试与真实故障演练 |
| 10 Evals | 评分方式、污染、配对和归因 | ML 基础、LLM-as-judge 论文高层限制 | 样例报告是真实实验 |
| 11 协作 | 任务依赖、重复成本、相关错误 | 工程模式资料；自写成本例子 | 多 Agent 性能数据 |
| 12 Harness | 概念职责、任务合同、证据绑定 | 工程分析与自写变更案例 | 统一 Harness 标准 |
| 13 模型系统 | 训练目标/参数化/运行机制区别 | LoRA、DPO、RLHF、PagedAttention | 训练或硬件部署实验 |
| 14 全景 | 各知识面的数据和责任关联 | 自写解释模型 | 具体项目已采用此架构 |
| 15 ML | 学习范式、梯度、指标、泛化与泄漏 | Google ML、scikit-learn | 真实训练集泛化成绩 |
| 16 模型 | token、Attention 形状、mask、FFN、生成 | Transformer 正文相关机制；基础计算 | 任意闭源模型内部细节 |
| 17 提示 | ICL、示例、事实支持与不确定性 | Few-shot、ReAct 高层贡献；应用分析 | 提示策略对所有模型有效 |
| 18 多模态 | 任务边界与代表性方法 | ViT、CLIP、Whisper、DDPM 论文摘要/高层贡献 | 模型实验或完整多模态理论 |

论文主要用于支持对应的高层机制和贡献；没有复现其全部推导与实验，也没有把特定 benchmark 的提升幅度写成普遍事实。Transformer 的公式与形状另做一致性检查。工程示意中的记录字段、预算和案例均为自写，不冒充原始 SDK 或源码。

## 3. 关键来源定位

| 来源 | 用途 | 阅读限制 |
| --- | --- | --- |
| [Google ML Glossary](https://developers.google.com/machine-learning/glossary) | 术语核对入口 | 不把所有本库建议归给词表 |
| [Overfitting](https://developers.google.com/machine-learning/crash-course/overfitting/overfitting) | 泛化与过拟合 | 本文数据划分建议另考虑时间/分组问题 |
| [scikit-learn pitfalls](https://scikit-learn.org/stable/common_pitfalls.html) | 数据泄漏与预处理 | 未复现库 API |
| [Transformer](https://arxiv.org/html/1706.03762v7) | Attention 与架构 | 原始架构不是所有现代模型 |
| [MCP Architecture](https://modelcontextprotocol.io/specification/2025-06-18/architecture) | Host/Client/Server 与协商 | 固定版本 |
| [MCP Tools](https://modelcontextprotocol.io/specification/2025-06-18/server/tools) | tools/call 与返回结构 | 未进行网络联调 |
| [MDN SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) | 流式分帧 | 非厂商完整 API 协议 |
| [XState Actors](https://stately.ai/docs/actors) | Actor 术语 | 未选定项目依赖版本 |
| [OWASP LLM01](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | 提示注入风险 | 非万能防御证明 |
| [幂等 API](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) | 请求标识与重复语义 | 不照搬特定云服务保证 |
| [Outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html) | 双写与去重 | 设计模式，不是本库已运行系统 |
| [LLM-as-judge](https://arxiv.org/abs/2306.05685) | 评审偏差 | 不推广论文一致率 |
| [参考书固定版本](https://github.com/bojieli/ai-agent-book/tree/dbc046eb896ac4e39aa19c7774c8bf49583b89a6) | Agent 主题组织与延伸 | 非全书逐行审校或全部实验复现 |

其他论文入口随各页具体段落标注，避免把来源堆在与结论无关的页尾。

## 4. 表达与可读性检查

知识正文均有快速回顾、机制解释、边界或辨析、内部关联及带说明的外部入口。标题顺序、代码围栏、JSON 示例和相对文件路径分别静态检查。

Mermaid 是源文本与结构说明；本轮未启动 GitHub/Docute 的浏览器逐图渲染。现有站点的脚本、安全级别和路由问题沿用全仓审阅记录，不以 Markdown 修改冒充运行时修复。理论公式提供普通文本表达，不依赖某个数学插件才能理解。

## 5. 实践与证据诚实性

- 既有梯度算例和 LoRA/KV 算例已完成独立数值核对，不是模型训练证据。
- 新增时间、预算、向量加权等算例是确定性计算，不是真实性能基准。
- 所有 JSON 示例为说明性数据，不包含真实凭据或生产业务数据。
- 未提供真实项目的印证链接；以后按条目规范补充，不能编造。
- Advance 目前是问题索引，正文扩展属于后续内容，不标记为已经完成。

## 6. 维护原则

新增事实应更新主定义与关联；API/实现结论固定版本；实验结论保留条件。发现错误时记录“旧结论—修正—依据”，不只修改表述而隐藏范围变化。

[知识库入口](README.md) · [条目规范](KNOWLEDGE_SPEC.md) · [全仓历史记录](../../REVIEW_STATUS.md)

## 7. 本轮静态核对结果

提交前对 24 个 AI Markdown 与 3 个全仓导航/审阅文件进行检查：433 处相对文件路径均指向存在文件，11 个 json 围栏可被 JSON.parse 解析，一级标题和代码围栏闭合检查未发现问题，表格列数检查未发现不一致。此检查不是完整 Markdown 渲染器，也不验证所有外链可持续访问。

10 条独立 JavaScript 数值断言通过：上下文预算/合计、加权向量、串并行时间示意、LoRA 参数、KV 字节和百分点差。16 个 Mermaid 图块及 1 个数学块完成源文本检查，未在目标站点逐图渲染。

## 8. Agent Loop 可理解性修订（2026-10-08）

读者反馈指出：此前虽有回边与注意事项，但必要术语未定义、最小例子没有完整走到结束、子章节缺乏连贯推导。这说明前面的事实/格式核查不能替代解释质量审查。

本次仅针对第 03 篇重写：统一 note-a/read_note 场景；定义 Agent、Model、Tool、Runtime、function_call、Observation、Policy、Workflow、ReAct；补足两轮模型调用和一次工具执行的全过程；同时提供流程图、时序图与无图文字路径。Policy 还区分了权限规则与强化学习决策策略两种含义。

参考了 Composing Programs 的迭代执行说明和 AIMA 官方 Agent 伪代码；没有宣称审阅两本教材的全部内容。本文为构造案例和伪代码，没有运行真实 Agent。

知识条目规范增加“问题动机—首次定义—最小模型—同例追踪—抽象与边界”的解释检查。本次不把其他 17 篇自动标为已达到同一标准，后续应按这个维度继续审阅。
