# Advance 入口：值得继续展开的问题

> 更新：2026-10-08。此页是问题索引与阅读入口，不宣称高级专题正文已经完成。
> Base 保留主定义；Advance 应增加推导、实现变体、证据或条件性取舍，不重复抄一遍基础名词。

## 1. 模型计算与学习

| 深入问题 | 前置知识 | 阅读入口与目的 |
| --- | --- | --- |
| Attention 的计算量、显存与访存怎样区分？ | [模型机制](16-language-models.md) | [Transformer](https://arxiv.org/abs/1706.03762)：核对运算结构，之后再研究具体内核优化 |
| LoRA 的低秩假设限制什么？ | [后训练](13-training-inference-systems.md) | [LoRA](https://arxiv.org/abs/2106.09685)：理解参数化与论文实验范围 |
| DPO 与 RLHF 的目标有什么关系？ | [学习目标](15-machine-learning.md) | [DPO](https://arxiv.org/abs/2305.18290)、[InstructGPT](https://arxiv.org/abs/2203.02155)：比较目标与数据流程，不能只比名称 |
| KV 分页怎样改变容量与并发？ | [推理系统](13-training-inference-systems.md) | [PagedAttention](https://arxiv.org/abs/2309.06180)：研究内存管理而非误当注意力定义变化 |
| 模型评估为什么受数据污染影响？ | [泛化](15-machine-learning.md) | [scikit-learn pitfalls](https://scikit-learn.org/stable/common_pitfalls.html)：先理解泄漏，再延伸到 LLM 基准 |

## 2. 上下文、检索与记忆

| 深入问题 | 前置知识 | 阅读入口与目的 |
| --- | --- | --- |
| 摘要压缩怎样保留否定、批准与版本？ | [Context](04-context-memory.md) | [AI Agent Book 上下文](https://github.com/bojieli/ai-agent-book/blob/dbc046eb896ac4e39aa19c7774c8bf49583b89a6/book/chapter2.md)：主题扩展，具体保真判据需独立定义 |
| 长上下文何时能简化检索，何时不能？ | [RAG](06-retrieval.md) | [RAG 原始论文](https://arxiv.org/abs/2005.11401)：先区分参数知识与外部知识；现代长上下文对比另需新证据 |
| 记忆冲突如何按时间和情境消解？ | [记忆生命周期](04-context-memory.md)、[维护](06-retrieval.md) | [AI Agent Book 记忆](https://github.com/bojieli/ai-agent-book/blob/dbc046eb896ac4e39aa19c7774c8bf49583b89a6/book/chapter3.md)：扩展写入、检索与更新视角 |
| 示例选择怎样影响 ICL？ | [提示](17-prompt-behavior.md) | [Few-shot](https://arxiv.org/abs/2005.14165)：了解原始问题设定，再研究位置与选择偏差 |

## 3. Agent 控制与安全

| 深入问题 | 前置知识 | 阅读入口与目的 |
| --- | --- | --- |
| Loop 如何断点恢复而不重复副作用？ | [Loop](03-agent-loop.md)、[安全](09-reliability-security.md) | [ReAct](https://arxiv.org/abs/2210.03629)提供决策反馈视角，持久化恢复仍需系统设计资料 |
| Actor 停止与远端任务取消有何差异？ | [状态机](08-workflow-state.md) | [XState Actors](https://stately.ai/docs/actors)：核对生命周期，不把它当跨服务事务 |
| MCP 能力协商与业务授权如何分层？ | [工具](05-tools-mcp-skills.md) | [固定协议架构](https://modelcontextprotocol.io/specification/2025-06-18/architecture)：区分支持某能力与获准使用 |
| 提示注入防护的失效边界在哪里？ | [安全](09-reliability-security.md) | [OWASP LLM01](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)：建立威胁类别，不寻找万能过滤器 |
| 多 Agent 怎样处理相关错误和冲突？ | [协作](11-multi-agent.md) | [工程模式](https://www.anthropic.com/engineering/building-effective-agents)：比较组织方式；收益需任务级证据 |

## 4. 应用、评测与多模态

| 深入问题 | 前置知识 | 阅读入口与目的 |
| --- | --- | --- |
| 流式 IR 如何同时保证预览与最终一致性？ | [UI IR](07-ui-ir.md)、[请求](02-inference.md) | 先以本库自定义合同推导，再比较具体开源实现；没有统一“标准 UI IR” |
| 模型评审怎样与人工判据校准？ | [Evals](10-evaluation.md) | [MT-Bench/Chatbot Arena 论文](https://arxiv.org/abs/2306.05685)：研究 LLM-as-judge 的能力与偏差 |
| 视觉表示怎样与文本对齐？ | [多模态](18-multimodal.md) | [CLIP](https://arxiv.org/abs/2103.00020)：对比表示学习，不等于完整视觉对话系统 |
| 视频抽帧怎样影响可支持的结论？ | [多模态](18-multimodal.md) | [ViT](https://arxiv.org/abs/2010.11929)先理解图像表示；时间建模需要另行补来源 |
| 生成机制如何影响可控性？ | [模型](16-language-models.md) | [DDPM](https://arxiv.org/abs/2006.11239)：理解扩散的代表性机制，不推广全部性能结论 |

## 5. 从 Base 扩展，而不复制 Base

主定义归属见 [知识地图](KNOWLEDGE_MAP.md)。Advance 页面应链接前置并用几句承接，只展开新增问题；不能把完整基础定义、图和边界原样复制后换一个“高级”标题。分析仍以概念和机制为主线，项目案例只提供局部证据。

## 6. 新增 Advance 条目的条件

一个高级条目应有明确问题、Base 前置链接、至少一个具体机制、推导、实现分析或可核验印证、成立条件与依据。如果只有“某框架支持这个功能”，先作为资料线索，不直接写成机制结论。

新资料可以先记录待核查问题；确认后更新主条目，保留修订依据。这里的链接是深入引子，不代表本库已经复现论文全部实验。

[回到知识地图](KNOWLEDGE_MAP.md)
