# 函数包装与转发：阅读笔记

> 审阅日期：2026-10-08。状态：概念与示例定向审阅，未运行。
> 本页 decorator 指高阶函数包装，不能直接等同于 TC39 装饰器语法。普通包装函数可转发 this 与参数；箭头函数的 this 不会因 apply/call 改变。

## 原阅读记录

## call-apply-decorators

[call-apply-decorators](https://javascript.info/call-apply-decorators)

1、装饰器 decorator: a special function that takes another function and alters its behavior.

2、forwarding:  The wrapper passes everything it gets: the context this and arguments to anotherFunction and returns back its result.

```js
// The wrapper passes everything it gets: the context this and arguments to anotherFunction and returns back its result.
let wrapper = function() {
  return anotherFunction.apply(this, arguments);
};
```

3、func.apply && func.call

```js
func.call(context, arg1, arg2…) // – calls func with given context and arguments.
func.apply(context, args) // – calls func passing context as this and array-like args into a list of arguments.

func.call(context, ...args); // pass an array as list with spread operator
func.apply(context, args);   // is same as using apply
```

method borrowing:

```js
function hash() {
  alert( [].join.call(arguments) ); // 1,2   arguments === this
}

hash(1, 2);
```

4、DOM elements

历史常量表包含 [12 node type 常量](https://dom.spec.whatwg.org/#node). In practice we usually work with 4 of them:

1. document – the “entry point” into DOM.

2. element nodes – HTML-tags, the tree building blocks.

3. text nodes – contain text.

4. comments – sometimes we can put the information there, it won’t be shown, but JS can read it from the DOM.

## 自测

为一个方法加日志包装，验证返回值、异常、this 与参数都保持合同；不要因为包了一层就吞掉错误。
