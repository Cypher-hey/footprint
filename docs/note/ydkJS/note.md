# You Don't Know JS 阅读摘记：真值与 NaN

> 审阅日期：2026-10-08。状态：历史阅读笔记补充，不是原书全文校勘。
> falsy 还包括 BigInt 的 0n，浏览器 document.all 有历史例外。NaN 与自己在 === 下不相等，但 Object.is(NaN, NaN) 为 true。

## 1. JS中的“假”值-false

- ""(空字符串)
- 0, -0, NaN(无效数字)
— null, undefined
- false

`其他不在假值中的都为“真”值：{}、[]`

## 2. NaN 既不大于也不小于任何其他值

```js
// NaN 是整个JS语言中唯一一个和自身不相等的值
if (!Number.isNaN) {
    Number.isNaN = function isNaN(x) {
        return x !== x;
    };
}
```

## 3. transpiling <= transforming + compiling


