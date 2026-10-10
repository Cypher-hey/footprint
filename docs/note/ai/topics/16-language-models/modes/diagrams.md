# 语言模型机制：Token、表示、Attention 与自回归生成｜概念图解

## 读图主线

自回归语言模型先编码输入，再通过注意力与逐位置变换计算分布，解码选择的 token 成为后续前缀；这与 Agent 行动循环不同。

先读整体边界，再打开内部职责或时间变化；图是简化机制模型，不是实际运行记录。所有图与系统阐述共享同一份源文件。

<a id="figure-01"></a>

## 图 1：只看最外层的自回归反馈

回边只追加 token，不调用外部工具；与 Agent Loop 先划清重复单元。

[图 1：只看最外层的自回归反馈](../figures/figure-01.mmd "footprint:figure")

回边发生在 token 层，不涉及外部工具。第 03 篇的 Agent Loop 则发生在模型调用与环境行动之间；两种循环可以嵌套，不能混为一谈。

[结合正文解释阅读](explanation.md#figure-01)

<a id="figure-02"></a>

## 图 2：把图 1 的模型计算展开

把输入编码、网络表示和词表输出分开，不能将其当成逐条检索数据库。

[图 2：把图 1 的模型计算展开](../figures/figure-02.mmd "footprint:figure")

每个 block 改变表示，但不会给每个位置“存一段中文解释”。图中的词表输出发生在数值空间；自然语言只出现在编码之前和解码之后。

[结合正文解释阅读](explanation.md#figure-02)

<a id="figure-03"></a>

## 图 3：分数与内容走两条路径

Q/K 决定混合权重，V 提供被混合的内容；矩阵形式与读图说明描述同一运算。

[图 3：分数与内容走两条路径](../figures/figure-03.mmd "footprint:figure")

Q/K 决定权重，V 提供被组合的内容。因此“算出注意力分数”和“得到新的表示”不是同一步。下面的公式正是这张图的数值表达。

[结合正文解释阅读](explanation.md#figure-03)

<a id="figure-04"></a>

## 图 4：一个常见 pre-norm Block 的简化结构

沿主路看 Attention 与 FFN，沿旁路看残差；这是 pre-norm 示例，不代表全部架构。

[图 4：一个常见 pre-norm Block 的简化结构](../figures/figure-04.mmd "footprint:figure")

两条旁路把输入直接加到子层输出上，这就是残差。图只表示一种常见排列；原始 Transformer 使用的归一化位置不同，具体模型也可能使用不同模块。图 2 的“多个 blocks”不能被理解成纯 Attention 的反复复制。

[结合正文解释阅读](explanation.md#figure-04)

## 图没有承诺什么

- 向量维度不是可数的人类概念数量。
- 注意力权重不能直接视为忠实因果解释。
- 贪心每步最大不保证整段序列最优或事实正确。

完整的定义、条件、例证和来源见[系统阐述](explanation.md)。源文件链接在普通 Markdown 中可直接打开；网站接入适配器后在原位显示图，并保留源码回退。
