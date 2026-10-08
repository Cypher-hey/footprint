# HTML 文档模式：标准、有限怪异与怪异模式

> 核查日期：2026-10-08。状态：概念纠错，未实测不同浏览器。

## 1. 为什么有多种模式

浏览器需要兼容历史页面。DOCTYPE 会影响文档模式选择，进而影响部分布局行为。现代 HTML 页面应以 <!doctype html> 开头。

## 2. 不要混淆术语

标准模式不是 JavaScript 的 "use strict"。文档模式、脚本严格模式与 TypeScript strict 配置是三件独立事情。除了标准和怪异模式，还存在有限怪异模式。

## 3. 最小文档

```html
<!doctype html>
<html lang="zh-CN">
  <head><meta charset="utf-8"><title>示例</title></head>
  <body><p>知识笔记</p></body>
</html>
```

## 4. 验证

document.compatMode 可帮助区分 BackCompat 与 CSS1Compat，但不能据此单独区分所有细节模式。不要为了修某个样式问题删除 DOCTYPE。

旧 HTML4/XHTML 声明可用于历史排查，新页面没有必要继续复制长 DTD。

## 5. 来源

- [MDN Quirks and Standards Modes](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Quirks_mode_and_standards_mode)
