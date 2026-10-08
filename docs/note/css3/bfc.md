# BFC 与格式化上下文：布局隔离的具体含义

> 核查日期：2026-10-08。状态：内容修订；未运行布局测试。

## 1. 核心结论

BFC（块级格式化上下文）定义块布局与浮动交互的一部分规则。“隔离”不是内部尺寸永远不影响外部；容器自身大小仍能影响周围布局，也不代表内容不会溢出。

Flex 和 Grid 容器建立各自的格式化上下文，不宜笼统说“flex 就是 BFC”。

## 2. 常见建立方式

根元素、浮动、绝对定位、部分 display 取值、合适的 overflow 等可建立 BFC。为了明确表达意图，常可使用 display: flow-root，避免把 overflow: hidden 误当无代价的清除浮动工具。

overflow: clip 不应与 hidden 混为一谈；各条件以目标浏览器与规范为准。

## 3. 解决哪些问题

| 问题 | 机制 | 注意 |
| --- | --- | --- |
| 浮动子元素不计入普通父容器高度 | 新 BFC 可包容内部浮动 | 外部尺寸仍会变化 |
| 父子外边距折叠 | 新格式化上下文可建立边界 | 相邻内部块仍有各自折叠条件 |
| 内容与旁边浮动重叠 | BFC 外边界与浮动交互规则 | 并非通用多列布局方案 |

## 4. 最小例子

```css
.article {
  display: flow-root;
}
.article img {
  float: left;
  margin-inline-end: 1rem;
}
```

用于正文图片环绕。多列卡片通常优先考虑 Grid/Flex，而不是为复用旧技巧增加浮动复杂度。

## 5. 外边距与包含块

外边距折叠有条件，还涉及负值，不能仅用“取最大值”概括所有情况。绝对定位的包含块也不一定是 body，transform 等属性可改变包含块建立方式。

旧 IE hasLayout 属于历史兼容机制，不作为现代布局建议。

## 6. 验证

观察浮动、长内容、负 margin、不同 writing-mode 和窄容器，说明哪些边界被隔离、哪些尺寸仍向外影响。

## 7. 来源

- [MDN Block Formatting Context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Block_formatting_context)
