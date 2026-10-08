# JavaScript 值、引用与函数参数

> 适用：JavaScript 语言语义。核查日期：2026-10-08。
> 状态：文档对照、示例静态推导；未实际执行。

## 1. 核心结论

JavaScript 参数按值传递。对于对象，可以用“复制指向同一对象的引用值”建立心智模型：两个绑定能访问同一个对象，但修改形参绑定不会改写调用者的变量。

不要把这进一步推断成规范要求了某种内存布局，也不要说 JavaScript 的所有原始值都会先装箱再传递。

## 2. 最小示例

```js
const original = { count: 1 };

function change(value) {
  value.count = 2;       // 修改共享对象
  value = { count: 3 }; // 只重新绑定形参
  return value;
}

const returned = change(original);
console.log(original.count); // 预期 2
console.log(returned.count); // 预期 3
console.log(original === returned); // 预期 false
```

执行过程：original 与形参最初指向同一对象；第一次写入改变对象属性；第二次赋值只改变函数内部 value 的绑定。

## 3. const 与不可变不是同一回事

const 限制绑定重新赋值，不会冻结对象。展开语法和 Object.assign 通常是浅复制：嵌套对象仍可能共享。Object.freeze 也不递归冻结整个对象图。

工程里可以选择不可变更新，但要明确复制深度、数据规模和身份比较成本。不要用“对象一定在堆、原始值一定在栈”解释所有引擎行为。

## 4. 练习

给 original 增加 nested: { count: 1 }，使用展开语法复制后修改副本 nested.count。预测原对象是否变化，并解释为什么。随后仅复制被修改路径，观察对象身份如何变化。

## 5. 修订与来源

旧文从其他语言的 call-by-sharing 叙述推导“不是按值传递”，容易误导。这里保留“共享同一对象”的直觉，但回到 JavaScript 的参数语义。

- [MDN Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
