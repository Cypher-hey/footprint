# CSS 布局：普通流、Flex、Grid 与定位

> 核查日期：2026-10-08。状态：知识重整；示例未进行浏览器验证。

## 1. 按问题选机制

| 需求 | 合适的起点 |
| --- | --- |
| 文档和正文自然排列 | 普通流 |
| 一条主轴上的分配和对齐 | Flex |
| 行列协同的二维布局 | Grid |
| 覆盖、角标和受控浮层 | 定位 |
| 正文绕图 | float |

Flex 可换行，但行之间不会像 Grid 一样天然共享二维轨道。视觉重排也不会自动改变 DOM 阅读和键盘顺序。

## 2. Flex 的关键属性

容器：flex-direction、flex-wrap、justify-content、align-items、align-content、gap。
项目：flex-grow、flex-shrink、flex-basis、align-self、order。

flex-shrink 初始值为 1，不是旧文写的 0。主轴取决于 flex-direction 和书写方向，不总是水平向右。收缩量还与基准大小相关，不仅看 shrink 数字。

## 3. 常见溢出

Flex/Grid 项目的自动最小尺寸可能阻止内容收缩。长文本场景可根据需求设置 min-width: 0 或 minmax(0, 1fr)，再选择换行或省略策略；不要全局隐藏溢出来掩盖问题。

## 4. 最小布局

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
  gap: 1rem;
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}
.center {
  display: grid;
  place-items: center;
}
```

容器需要有实际可分配空间，居中才有意义。文本与按钮的最小可用尺寸仍要验证。

## 5. 定位与居中

absolute 脱离普通流，定位参照包含块；relative 保留原本占位。transform: translate(-50%, -50%) 常与 top/left 配合，但涉及 transform、滚动、包含块和缩放，不能机械套用。

margin-inline: auto 适合有可用剩余空间的块布局；vertical-align 主要用于行内级和表格单元格，不是所有块的通用垂直居中属性。

## 6. 兼容与无障碍

现代 Flex 不要求所有 WebKit 一律手写前缀；支持矩阵以目标版本为准。测试窄屏、长文本、RTL、放大和键盘顺序。不要用 order 制造视觉顺序与阅读顺序冲突。

## 7. 自测与来源

分别解释 justify-content 与 align-items；为什么一个长 URL 会撑破 Flex 项目；为什么加了 align-items: center 仍可能没有视觉变化？

- [MDN Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)
- [MDN Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
