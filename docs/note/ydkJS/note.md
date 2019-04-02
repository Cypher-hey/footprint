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


