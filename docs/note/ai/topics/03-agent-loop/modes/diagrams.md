# Agent Loop：目标、行动与反馈构成的运行机制｜概念图解

## 读图主线

Agent Loop 重复控制步骤，并用行动产生的新观察更新下一次决策；闭环是否有效，要同时看回边、信息变化与停止条件。

先读整体边界，再打开内部职责或时间变化；图是简化机制模型，不是实际运行记录。所有图与系统阐述共享同一份源文件。

<a id="loop-environment"></a>

## 图 1：先看 Agent 与环境的反馈关系

只看 Agent 与环境：行动和观察共同闭合路径，不必先理解框架或 API。

[图 1：先看 Agent 与环境的反馈关系](../figures/figure-01.mmd "footprint:figure")

**读图结论：** 闭合路径是 Agent → 环境 → Agent；行动与观察把系统和外部世界连接起来。

[结合正文解释阅读](explanation.md#loop-environment)

<a id="loop-roles"></a>

## 图 2：打开 Agent 的职责边界

打开 Agent 方框后，区分模型提议、运行时控制和工具执行；这些是职责，不是部署拓扑。

[图 2：打开 Agent 的职责边界](../figures/figure-02.mmd "footprint:figure")

**读图结论：** Model 提议，Runtime 调度，Tool 执行。方框表示职责，不表示必须分成不同服务器。

[结合正文解释阅读](explanation.md#loop-roles)

<a id="loop-control"></a>

## 图 3：完整最小控制循环

从④沿回边回到①，同时辨认最终结果、等待和不能继续的出口。图是最小机制，不覆盖全部异常恢复。

[图 3：完整最小控制循环](../figures/figure-03.mmd "footprint:figure")

**读图结论：** 关键回边是记录观察之后，带着更新的信息返回输入构造；完成、等待和预算耗尽是不同出口。

[结合正文解释阅读](explanation.md#loop-control)

<a id="loop-information"></a>

## 图 4：沿着回边，信息发生了什么变化

沿时间看 Sₜ 如何结合决策与观察成为 Sₜ₊₁；这张展开图解释回到同一步时信息为什么不同。

[图 4：沿着回边，信息发生了什么变化](../figures/figure-04.mmd "footprint:figure")

**读图结论：** 控制规则可以重复，下一轮使用的信息却可能改变；系统保存的信息还需要被选入模型上下文。

[结合正文解释阅读](explanation.md#loop-information)

## 图没有承诺什么

- 重复调用不自动构成有效反馈。
- 一项任务只调用一次模型也可能由 Agent 系统完成。
- 安全 policy 与强化学习中的 policy 不是同一含义。

完整的定义、条件、例证和来源见[系统阐述](explanation.md)。源文件链接在普通 Markdown 中可直接打开；网站接入适配器后在原位显示图，并保留源码回退。
