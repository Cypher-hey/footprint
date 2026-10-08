# 无障碍与 ARIA：语义必须配合真实交互

> 核查日期：2026-10-08。适用：Web UI。状态：规范对照；未做读屏与键盘实测。

## 1. 核心结论

无障碍包括可感知、可操作、可理解和稳健的界面。优先使用原生 HTML 元素；ARIA 补充语义，不会自动实现点击、键盘操作或焦点管理。

旧文建议给链接加 role="button" 即可充当按钮，这不充分。执行操作优先用 button，导航使用带 href 的 a。

## 2. 最小示例

```html
<button type="button" aria-expanded="false" aria-controls="answer">
  显示答案
</button>
<section id="answer" hidden>这里是答案。</section>
```

这只是初始 HTML 状态。交互实现还必须同步 hidden、aria-expanded 和按钮文案。读屏看到的状态应与视觉状态一致。

## 3. 常见语义

| 需求 | 选择 | 易错点 |
| --- | --- | --- |
| 执行操作 | button | 用 div 加点击而漏键盘 |
| 页面导航 | a href | 把按钮写成无 href 的链接 |
| 展开内容 | aria-expanded + 关联目标 | 状态与实际可见性不同步 |
| 表单输入 | label 与控件关联 | 只放 placeholder |
| 动态状态 | 合适的 live region | 逐 token 播报导致干扰 |

aria-hidden 不能作为禁用交互的替代方案。一个元素视觉隐藏、读屏隐藏、不可聚焦、不可操作是不同问题，需要按具体机制验证。

## 4. AI 界面的特殊问题

流式内容不要不断抢焦点。生成失败应有可理解的错误与重试入口；loading、成功和错误需要文本状态。图表提供文字解释，颜色不承担唯一含义。

不要用 aria-label 覆盖可见文案而造成语义冲突。复杂组件应遵循对应 APG 模式，包括键盘与焦点，而不只复制 role。

## 5. 验证清单

仅键盘能否完成主流程？焦点可见且顺序合理吗？对话框关闭后焦点回到哪里？按钮能用 Enter/Space 激活吗？放大文字后内容是否截断？读屏是否能获得名称、角色和状态？

自动检查能找到部分问题，不能证明所有真实辅助技术体验合格。

## 6. 来源

- [WAI APG Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [ARIA in HTML](https://www.w3.org/TR/html-aria/)
