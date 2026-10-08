# Flutter 与跨端：历史阅读记录的当前边界

> 审阅日期：2026-10-08。状态：概念纠错；未进行跨框架性能实测或应用迁移。

## 1. 跨端不是一次编写零适配

共享代码可以降低部分重复工作，但平台能力、输入方式、无障碍、部署、性能和插件维护仍需投入。成本节省应按真实团队和功能验证。

## 2. 技术路径

| 路径 | 主要模型 | 关注点 |
| --- | --- | --- |
| WebView / Hybrid | Web UI + 平台桥接 | Web 能力、桥接安全、集成 |
| React Native | React 描述平台 UI，架构随版本演进 | 原生模块、渲染与线程 |
| Flutter | Dart 与自己的 UI/渲染体系 | 引擎、平台通道与插件 |

旧文的“原生支持 90%/20%/5%”没有统一口径，不保留为事实。React Native 的通信成本不能归因于“因为 JIT”；Flutter 也没有消除与平台交互的需求。

## 3. 选择维度

先看目标平台、现有团队、组件生态、设备性能、启动、包体、复杂交互、原生能力和长期维护。不要把框架名称直接映射为“性能差/中/优”。

## 4. Dart 与 JavaScript Symbol

JavaScript Symbol 是原始类型，可用作属性键，不是把任意复杂对象转换成键的函数。Dart Symbol 的语义有自身用途，不能因为名称一样就说二者基本一致。

## 5. 学习练习

用同一个业务页面列出平台专属能力，区分可共享逻辑、可共享 UI 和必须适配部分。做性能比较时固定设备、功能、构建模式与测试流程。

## 6. 来源

- [Flutter 架构概览](https://docs.flutter.dev/resources/architectural-overview)
- [React Native 新架构](https://reactnative.dev/architecture/landing-page)
