# AI 术语与别名索引

> 更新：2026-10-08。短释义用于定位，完整定义、条件与反例以链接正文为准；不是另建一套重复维护的百科。

## 模型与学习

| 术语/别名 | 快速定位 | 主定义 |
| --- | --- | --- |
| AI / 人工智能 | 研究与实现智能行为的广泛领域 | [正文](01-foundations.md) |
| ML / 机器学习 | 从数据与目标学习参数或规则的一类方法 | [正文](15-machine-learning.md) |
| Deep Learning / 深度学习 | 利用多层神经网络学习表示与映射 | [正文](15-machine-learning.md) |
| 监督 / 自监督 / 无监督 | 训练信号来源不同的学习范式 | [正文](15-machine-learning.md) |
| RL / 强化学习 | 根据行动与反馈优化策略 | [正文](15-machine-learning.md) |
| Loss / 损失 | 训练时被优化的目标量，不等于业务成功率 | [正文](15-machine-learning.md) |
| Gradient / 梯度 | 参数变化对目标变化的局部方向信息 | [正文](15-machine-learning.md) |
| 泛化 / Generalization | 在未见数据或目标分布上的表现 | [正文](15-machine-learning.md) |
| 过拟合 / Overfitting | 对训练样本适应强而新样本表现较差 | [正文](15-machine-learning.md) |
| 数据泄漏 / Leakage | 评估利用了部署时不应获得的信息 | [正文](15-machine-learning.md) |
| 校准 / Calibration | 预测概率与实际频率之间的对应 | [正文](15-machine-learning.md) |
| Parameter / Hyperparameter | 被训练调整的内部数值 / 控制训练或模型方式的设定 | [正文](15-machine-learning.md) |
| Token / Tokenizer | 序列编码单位及产生它的编码机制 | [正文](16-language-models.md) |
| Embedding / 嵌入 | 将对象编码为向量表示 | [正文](16-language-models.md) |
| Attention / 注意力 | 按输入相关权重组合序列信息 | [正文](16-language-models.md) |
| FFN | Transformer 中对位置表示作非线性变换的模块 | [正文](16-language-models.md) |
| Causal Mask | 限制未来位置可见性的掩码 | [正文](16-language-models.md) |
| Logits / Softmax | 未归一化分数及转为分布的运算 | [正文](16-language-models.md) |
| Autoregressive / 自回归 | 以后续生成依赖已有前缀的方式建模 | [正文](16-language-models.md) |
| MoE / 混合专家 | 按路由激活部分专家模块的模型设计 | [正文](16-language-models.md) |
| SFT | 利用示范数据进行监督适配 | [正文](13-training-inference-systems.md) |
| DPO | 基于特定偏好优化目标的方法 | [正文](13-training-inference-systems.md) |
| RLHF | 利用人类反馈优化模型行为的一类流程 | [正文](13-training-inference-systems.md) |
| LoRA | 低秩参数化适配方法，不是训练任务目标 | [正文](13-training-inference-systems.md) |
| Distillation / 蒸馏 | 将教师行为或表示知识转移给学生 | [正文](13-training-inference-systems.md) |
| Prefill / Decode | 处理已有输入 / 逐步生成后续输出 | [正文](13-training-inference-systems.md) |
| KV Cache | 缓存历史注意力 K/V 的计算状态 | [正文](13-training-inference-systems.md) |
| Quantization / 量化 | 以较低精度等表示减少存储或计算代价 | [正文](13-training-inference-systems.md) |

## 请求、知识与行动

| 术语/别名 | 快速定位 | 主定义 |
| --- | --- | --- |
| Prompt | 当前任务说明、示例等行为引导输入 | [正文](17-prompt-behavior.md) |
| ICL / 上下文学习 | 利用当前输入中的任务信息，无需本次梯度更新 | [正文](17-prompt-behavior.md) |
| Grounding / 证据支撑 | 让结论与可定位来源建立支持关系 | [正文](06-retrieval.md) |
| Hallucination / 幻觉 | 对缺乏依据或不真实输出的宽泛称呼，需细分原因 | [正文](17-prompt-behavior.md) |
| Schema | 规定数据形状与结构约束的合同 | [正文](02-inference.md) |
| Streaming / 流式 | 结果分段传递，不等于每段都是完整对象 | [正文](02-inference.md) |
| Agent | 围绕目标感知环境并采取行动的系统角色 | [正文](03-agent-loop.md) |
| Model / 模型 | 本库通常指计算结构与参数定义的输入输出映射 | [正文](01-foundations.md) |
| Runtime / 运行时 | 管理调用、状态、执行和停止的应用运行部分 | [正文](03-agent-loop.md) |
| Function call / Tool call | 模型提出的结构化调用意图，不等于已经执行 | [正文](03-agent-loop.md) |
| Policy | 可能指行动规则，也可能指 RL 中的决策策略，需看语境 | [正文](03-agent-loop.md) |
| ReAct | 将推理与行动反馈结合的代表性方法 | [正文](03-agent-loop.md) |
| Agent Loop | 观察、决策、行动与反馈的循环组织 | [正文](03-agent-loop.md) |
| Observation | 工具/环境结果及其状态、来源和错误信息 | [正文](03-agent-loop.md) |
| Context Builder | 选择并组织本轮可见信息的应用职责 | [正文](04-context-memory.md) |
| Memory / 长期记忆 | 跨任务保存并可再检索的信息 | [正文](04-context-memory.md) |
| Compaction / 压缩 | 缩减历史信息但尽量保留关键约束 | [正文](04-context-memory.md) |
| RAG | 利用外部检索证据增强生成的一类方法 | [正文](06-retrieval.md) |
| Chunk / 分块 | 检索与引用的内容单元，不是网络 chunk | [正文](06-retrieval.md) |
| Index / 索引 | 用于加速查找的组织结构，不限于向量 | [正文](06-retrieval.md) |
| Retrieval / 召回 | 从候选空间选取相关项的过程 | [正文](06-retrieval.md) |
| Reranker / 重排 | 重新评估召回候选的顺序 | [正文](06-retrieval.md) |
| Tool | 具有输入、结果和副作用合同的可调用能力 | [正文](05-tools-mcp-skills.md) |
| MCP | 连接宿主与外部上下文/能力的协议 | [正文](05-tools-mcp-skills.md) |
| Skill | 任务知识、步骤和可选资源的组织方式 | [正文](05-tools-mcp-skills.md) |
| Host / Client / Server | 宿主管理 / 协议连接 / 能力提供者 | [正文](05-tools-mcp-skills.md) |

## 应用与验证

| 术语/别名 | 快速定位 | 主定义 |
| --- | --- | --- |
| Workflow | 工作步骤、分支、依赖与交接的组织 | [正文](08-workflow-state.md) |
| State / Event / Transition | 当前情况 / 输入或事实 / 状态变化规则 | [正文](08-workflow-state.md) |
| Effect / 副作用 | 与外部世界发生的操作 | [正文](08-workflow-state.md) |
| Guard / Action / Actor | 转换条件 / 转换动作 / 有生命周期的工作单元 | [正文](08-workflow-state.md) |
| UI IR / Event IR | 界面中间表示 / 交互业务含义的表示 | [正文](07-ui-ir.md) |
| Catalog | 受限组件及其语义合同集合 | [正文](07-ui-ir.md) |
| Deterministic Runtime | 对已验证状态和事件按明确规则运行的部分 | [UI 语境](07-ui-ir.md)、[转换机制](08-workflow-state.md) |
| Idempotency / 幂等 | 重复同一操作不改变其约定最终效果；范围由业务定义 | [正文](09-reliability-security.md) |
| Authentication / Authorization | 确认主体 / 判断其资源与操作权限 | [正文](09-reliability-security.md) |
| Trust Boundary / 信任边界 | 不同可信程度、身份或权限范围的交界 | [正文](09-reliability-security.md) |
| Outbox / 补偿 | 本地事务内记录待发事件 / 通过另一个动作修复业务影响 | [正文](09-reliability-security.md) |
| Approval / 批准 | 对固定动作、目标与版本的可信授权记录 | [正文](09-reliability-security.md) |
| Prompt Injection | 不可信内容试图改变系统指令或行动边界 | [正文](09-reliability-security.md) |
| Evals | 在明确任务与判据下评估行为和结果 | [正文](10-evaluation.md) |
| Rubric / Judge | 评分准则 / 应用准则的评分器或评审者 | [正文](10-evaluation.md) |
| Metric / 指标 | 按定义量化或聚合的观察结果 | [正文](10-evaluation.md) |
| Trace | 一次运行的可关联事件轨迹 | [正文](10-evaluation.md) |
| Harness | 围绕模型的运行、约束和验证设施，边界因项目而异 | [正文](12-ai-coding.md) |
| Critical Path / 关键路径 | 依赖图中决定最早完成时间的最长必要路径 | [正文](11-multi-agent.md) |
| Multi-agent | 多个决策单元间的任务与信息协作 | [正文](11-multi-agent.md) |
| Alignment / Fusion | 跨模态对应关系 / 不同模态信息的交互融合 | [正文](18-multimodal.md) |
| OCR / ASR / TTS | 图像文字识别 / 语音识别 / 文本转语音 | [正文](18-multimodal.md) |
| Multimodal / 多模态 | 跨不同信息通道的编码、关联或生成 | [正文](18-multimodal.md) |

## 易歧义用法

“模型”可能指参数、架构或服务端点；“记忆”可能指上下文、计算缓存或持久化知识；“推理”可能指 inference 或 reasoning。decode 可以指生成阶段、token 选择或字节解码；grounding 可以指来源支持，也可指视觉定位；policy 可指执行规则或学习出的决策策略。引用时写明层次，避免借同名词把不同机制连成错误因果。

[知识地图](KNOWLEDGE_MAP.md) · [全部主题](README.md)
