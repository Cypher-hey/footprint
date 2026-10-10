# 语言模型机制：Token、表示、Attention 与自回归生成

> 本目录是新版作者源。网站按模式清单读取；源图链接可直接查阅。

## 先抓住这条主线

自回归语言模型先编码输入，再通过注意力与逐位置变换计算分布，解码选择的 token 成为后续前缀；这与 Agent 行动循环不同。

## 选择阅读模式

- [核心概要](modes/overview.md)：快速建立概念模型与边界。
- [系统阐述](modes/explanation.md)：完整定义、连续论述、图表、局部例证及来源。
- [概念图解](modes/diagrams.md)：按关系与过程重新理解，并回到正文查证。

## 内容归属

本主题维护 token、表示、Attention、Block 与自回归机制；采样配置归 02，服务缓存容量归 13。

[模式清单](modes/index.json) · [共享图源清单](figures/index.json) · [全部主题](../README.md) · [作者规范](../../TOPIC_AUTHORING.md)
