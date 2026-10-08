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
| Agent Loop | 观察、决策、行动与反馈的循环组织 | [正文](03-agent-loop.md) |
| Observation | 工具/环境结果及其状态、来源和错误信息 | [正文](03-agent-loop.md) |
| Context Builder | 选择并组织本轮可见信息的应用职责 | [正文](04-context-memory.md) |
| Memory / 长期记忆 | 跨任务保存并可再检索的信息 | [正文](04-context-memory.md) |
| Compaction / 压缩 | 缩减历史信息但尽量保留关键约束 | [正文](04-context-memory.md) |
| RAG | 利用外部检索证据增强生成的一类方法 | [正文](06-retrieval.md) |
| Chunk / 分块 | 检索与引用的内容单元，不是网络 chunk | [正文](06-retrieval.md) |
| Reranker / 重排 | 重新评估召回候选的顺序 | [正文](06-retrieval.md) |
| Tool | 具有输入、结果和副作用合同的可调用能力 | [正文](05-tools-mcp-skills.md) |
| MCP | 连接宿主与外部上下文/能力的协议 | [正文](05-tools-mcp-skills.md) |
| Skill | 任务知识、步骤和可选资源的组织方式 | [正文](05-tools-mcp-skills.md) |
| Host / Client / Server | 宿主管理 / 协议连接 / 能力提供者 | [正文](05-tools-mcp-skills.md) |

## 应用与验证

| 术语/别名 | 快速定位 | 主定义 |
| --- | --- | --- |
| Workflow | 预先定义的流程或转换结构 | [正文](08-workflow-state.md) |
| Guard / Action / Actor | 转换条件 / 转换动作 / 有生命周期的工作单元 | [正文](08-workflow-state.md) |
| UI IR / Event IR | 界面中间表示 / 交互业务含义的表示 | [正文](07-ui-ir.md) |
| Catalog | 受限组件及其语义合同集合 | [正文](07-ui-ir.md) |
| Deterministic Runtime | 对已验证输入按明确规则转换状态的运行部分 | [正文](07-ui-ir.md) |
| Idempotency / 幂等 | 重复同一操作不改变其约定最终效果；范围由业务定义 | [正文](09-reliability-security.md) |
| Approval / 批准 | 对固定动作、目标与版本的可信授权记录 | [正文](09-reliability-security.md) |
| Prompt Injection | 不可信内容试图改变系统指令或行动边界 | [正文](09-reliability-security.md) |
| Evals | 在明确任务与判据下评估行为和结果 | [正文](10-evaluation.md) |
| Trace | 一次运行的可关联事件轨迹 | [正文](10-evaluation.md) |
| Harness | 围绕模型的运行、约束和验证设施，边界因项目而异 | [正文](12-ai-coding.md) |
| Multi-agent | 多个决策单元间的任务与信息协作 | [正文](11-multi-agent.md) |
| OCR / ASR / TTS | 图像文字识别 / 语音识别 / 文本转语音 | [正文](18-multimodal.md) |
| Multimodal / 多模态 | 跨不同信息通道的编码、关联或生成 | [正文](18-multimodal.md) |

## 易歧义用法

“模型”可能指参数、架构或服务端点；“记忆”可能指上下文、计算缓存或持久化知识；“推理”可能指 inference 或 reasoning。引用时写明层次，避免借同名词把不同机制连成错误因果。

[知识地图](KNOWLEDGE_MAP.md) · [全部主题](README.md)
