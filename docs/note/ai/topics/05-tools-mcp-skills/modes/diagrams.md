# 工具、MCP 与 Skills：三种不同的能力边界｜概念图解

## 读图主线

Tool 定义可调用操作，MCP 组织能力连接，Skill 提供过程知识；可发现、可连接和获准执行是不同条件。

先读整体边界，再打开内部职责或时间变化；图是简化机制模型，不是实际运行记录。所有图与系统阐述共享同一份源文件。

<a id="figure-01"></a>

## 图 1：三者在同一能力路径上的位置

Skill 与能力描述进入上下文；实际动作通过运行时到工具，协议只是连接路径之一。

[图 1：三者在同一能力路径上的位置](../figures/figure-01.mmd "footprint:figure")

Skill 影响“怎样做”的选择，Tool 规定“调用什么”的合同，MCP 解决部分连接与消息交互。箭头没有从 Skill 直接通向外部动作，因为一份知识文档本身不是执行授权。

[结合正文解释阅读](explanation.md#figure-01)

<a id="figure-02"></a>

## 图 2：宿主内部与外部能力的边界

Host 包含多个 Client，而每条连接面向相应 Server；角色数量不是 Agent 数量。

[图 2：宿主内部与外部能力的边界](../figures/figure-02.mmd "footprint:figure")

两条连接并不意味着两个 Agent。Host/Client/Server 描述协议角色；Agent 描述目标驱动决策与环境交互。角色之间的关系以所选协议版本为准。

[结合正文解释阅读](explanation.md#figure-02)

<a id="figure-03"></a>

## 图 3：同一次动作在不同层有不同标识

分清模型 callId、协议 request id 和业务 operationId，各自服务不同关联与恢复问题。

[图 3：同一次动作在不同层有不同标识](../figures/figure-03.mmd "footprint:figure")

这些标识各自解决关联问题，生命周期也不同。JSON-RPC id 用于请求与响应配对，不能自动承担业务幂等保证；业务 operationId 的语义见 [09](../../09-reliability-security/README.md)。

[结合正文解释阅读](explanation.md#figure-03)

## 图没有承诺什么

- MCP Server 可以是本地进程，不必远程部署。
- JSON-RPC id 不能自动承担业务幂等。
- 工具名称、annotations 或 Skill 文本不是授权证据。

完整的定义、条件、例证和来源见[系统阐述](explanation.md)。源文件链接在普通 Markdown 中可直接打开；网站接入适配器后在原位显示图，并保留源码回退。
