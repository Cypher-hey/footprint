# 懒加载：按需获取与生命周期

> 审阅日期：2026-10-08。状态：文档扩展，未进行浏览器实测。

## 1. 解决的问题

把当前不需要的资源延后加载，减少初始下载与处理。懒加载、预加载、代码分割和虚拟列表各有不同职责，不要混用名称。

## 2. 选择方式

图片可评估原生 loading="lazy"；自定义曝光/分页可使用 IntersectionObserver；代码按功能边界使用动态 import。首屏关键图片不应一律懒加载。

## 3. 状态

idle → loading → loaded / error。重复进入视口时复用进行中的请求；失败允许有界重试；页面卸载后清理观察器并忽略过期结果。

## 4. 验证

弱网、快速滚动、返回页面、重复观察和加载失败。给图片预留尺寸，避免资源到达后布局跳动。浏览器报告相交不必然等于用户真正看见内容。

## 5. 来源

- [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
