# JavaScript 小技巧：可读性与数值边界

> 审阅日期：2026-10-08。状态：旧技巧纠错，示例未实测。

## 1. 位运算不是通用取整

Number 的 ~、~~、|0 等涉及 32 位整数转换。~~x 不等价于所有数值上的 Math.trunc，也不等同于把字符串交给 parseInt。大数、Infinity 和 NaN 都有不同边界。

判断成员存在优先使用 includes 或明确的 indexOf !== -1，不必为简短而使用按位非技巧。

## 2. 布尔转换

Boolean(value) 与 !!value 表达真值转换。常见 falsy 包括 false、0、-0、0n、空字符串、null、undefined、NaN；浏览器还有历史性的 document.all 特例。

未声明变量直接读取会抛 ReferenceError，不能把它与“已声明但值为 undefined”混为一谈。旧例中的 !goo 并不能证明 goo 是 null。

## 3. 相等

=== 不做普通的跨类型转换，NaN 不等于自身；Object.is 区分 +0/-0 并认为 NaN 与自身相同；Set/Map 使用的相等关系又有区别。

== 按规范处理不同类型，不是所有情况都“转成 Number”；BigInt、Symbol、对象转原始值等有具体规则。对象按身份比较，而不是深比较所有字段。

## 4. 可读性原则

简短技巧必须说明输入范围。涉及钱、ID、时间或大型计数时，不用 32 位截断替代业务数值处理。优化先有基准，不宣称“字符少所以更快”。

## 5. 练习

比较 Math.trunc(2 ** 40 + 0.5) 与 ~~(2 ** 40 + 0.5)；比较 NaN、+0/-0 在 ===、Object.is 和 Set 中的结果。

## 6. 延伸

- [位运算练习](../algorithm/example-1.md)
- [值与参数](../basis/concepts.md)
