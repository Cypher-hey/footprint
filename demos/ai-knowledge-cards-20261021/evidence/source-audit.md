# 来源核验记录

核对日期：2026-10-21。方法：浏览工具实际打开官方文档和原始论文页面，阅读相关章节；不以搜索摘要替代正文核对。下列章节名可用于原文定位，不伪造永久段落锚点。逐卡支持范围另见 cards.json。

| 来源 | 实际打开地址 | 阅读定位与核实事项 | 未作的推论 |
| --- | --- | --- | --- |
| Anthropic Building effective agents | https://www.anthropic.com/research/building-effective-agents | What are agents、Agents；workflow/agent 控制权、环境反馈、停止条件 | 不把 2024 年分类当所有产品的统一标准；不继承过期工具推荐 |
| Anthropic Effective context engineering | https://www.anthropic.com/research/effective-context-engineering-for-ai-agents | Context engineering vs prompt engineering、Compaction、Structured note-taking；输入策展、摘要与笔记 | 不声称本文的 Context Builder 是官方接口，不承诺压缩无损 |
| Claude Context windows | https://platform.claude.com/docs/en/build-with-claude/context-windows | How the context window works；窗口含历史及生成响应、与训练语料不同 | 未绑定厂商当前最大容量；32k 算例不是模型规格 |
| Claude Tool use | https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview | How tool use works；客户端和服务端工具、tool_use/tool_result | 不把模型提议当执行结果，不把所有工具都说成客户端执行 |
| LangGraph Thinking in LangGraph | https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph | Design your state、Keep state raw, format prompts on-demand | 不把 LangGraph state 命名当普遍标准，不推出 state 必然持久化或为事实 |
| LangGraph Persistence | https://docs.langchain.com/oss/javascript/langgraph/persistence | Checkpointer vs store、MemorySaver does not persist between restarts | 不把内存存储当生产持久化 |
| LangGraph Checkpointers | https://docs.langchain.com/oss/javascript/langgraph/checkpointers | Checkpoints、Replay、Durability modes；线程快照、checkpoint 后步骤会重跑 | 不声称恢复会撤销外部副作用；不提前批准特定耐久策略 |
| LangGraph Interrupts | https://docs.langchain.com/oss/javascript/langgraph/interrupts | Pause using interrupt、Resuming interrupts、Side effects called before interrupt must be idempotent | 不声称批准布尔值可无限复用；动作版本绑定为作者建议 |
| LangChain Memory overview | https://docs.langchain.com/oss/javascript/concepts/memory | Short-term memory、Long-term memory；作用域及 checkpoint/store | 不把外部记忆当模型训练或自动事实认证 |
| Lewis 等 RAG | https://arxiv.org/abs/2005.11401 | 摘要与书目信息；参数化生成器和检索非参数化记忆结合 | 未复现论文训练，也不把现代工程管线全部归为原论文细节 |
| Reimers & Gurevych SBERT | https://arxiv.org/abs/1908.10084 | 摘要与书目信息；句向量与余弦相似度 | 未测向量分数，不推出相似即蕴含或正确 |
| Nogueira & Cho Re-ranking | https://arxiv.org/abs/1901.04085 | 摘要与书目信息；查询导向的段落重排 | 不把重排当事实核查，不迁移论文性能到 Demo |
| JSON Schema object | https://json-schema.org/understanding-json-schema/reference/object | Properties、Required Properties、Additional Properties | 不把字段类型当订单存在和实时权限校验 |
| Claude Structured outputs | https://platform.claude.com/docs/en/build-with-claude/structured-outputs | JSON outputs 与 strict tools、Invalid outputs；拒答、截断与支持范围 | 不承诺每种响应均可按业务成功路径解析 |
| AWS Making retries safe | https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/ | Retrying and side effects、Reducing client complexity；超时不确定性、请求标识 | 不承诺外部系统恰好一次，不把同参数当同一意图 |
| Anthropic Demystifying evals | https://www.anthropic.com/research/demystifying-evals-for-ai-agents | The structure of an evaluation、Types of graders；trial、trace、outcome | 未运行真实 Agent 评测；退款案例为教学样例 |
| MCP Architecture overview | https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture | Scope、Participants、Primitives；host/client/server 及协议范围 | 不把 MCP 当 Agent 大脑、授权系统或工具业务语义 |

## 重定向与时效

两篇 Anthropic 工程文章的 engineering 路径已重定向到 research；卡片使用核对后的落地链接。MCP 无版本架构链接落地到 2026-07-28 版，记录该路径。LangGraph 旧 memory 路径落地到 concepts/memory。旧 durable-execution 路径当前落地为 Persistence，未用它声称核对独立 durable execution 文档；恢复机制改查当前 Checkpointers 与 Interrupts。

## 内容归因的边界

没有逐字长引。中文概览、对照表、代码、虚构工单/邮件/退款/制度案例为人工组织的教学综合。原文提供核心机制与定义的依据，不为每条工程建议背书。所有源码里的 TS 片段只展示，未连接外部业务。每卡 sources.scope 和 editorial 明确这一点。

## 复核时应做什么

先看概览是否过度概括，再核对紧邻结论的限定；进入来源对应章节，检查来源版本和术语范围。如来源改变，保留旧核对记录并重新标记待复核。复习答案也要随着正文与依据一起更新。
