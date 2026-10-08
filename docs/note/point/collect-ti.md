# 面试编码题：二分、异步与调用语义

> 审阅日期：2026-10-08。状态：正文/代码静态修正，未执行。
> bind 片段只演示绑定接收者，不是支持 new 等全部语义的合格 polyfill；不要覆盖生产原型。Foo 题假定非严格普通脚本环境，ES 模块/严格模式下结果不同。连续赋值还涉及左侧引用先求值，不能简单把 A=B=C 替换为两条语句。

## 二分查找

二分法查找（binarySearch），也称折半查找，是一种在有序数组中查找特定元素的搜索算法。查找过程可以分为以下步骤：
（1）首先，从`有序`数组的中间的元素开始搜索，如果该元素正好是目标元素（即要查找的元素），则搜索过程结束，否则进行下一步。
mid = parseInt((high + low) / 2);

（2）如果目标元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半区域查找，然后重复第一步的操作。
binarySearch(arr, low, high, target)

（3）如果某一步数组为空，则表示找不到目标元素。
if (low > high){
return -1;
}

## 将回调函数转换成 promise

```js
// 注：函数f为不定参数函数，最后一个参数为回调函数
// 原函数
function f(arg1, ..., cb) {}

// 工具类函数
function promisify(f) {
    // 补充完整
}

// 原使用方式
f(arg1, arg2, ..., (err, data) => {
if (err) {
    // ...
    }
    // ...
});

// 使用工具函数
promisify(f)(arg1, arg2, ...).then((data) => {}).catch((err) => {})
```

```js
// 工具类函数
function promisify(f) {
    return function () {
        const receiver = this;
        let args = Array.prototype.slice.call(arguments);
        return new Promise((resolve, reject) => {
            args.push((err, data) => {
                err ? reject(err) : resolve(data);
            });
            f.apply(receiver, args);
            // f.call(null, ...args)
            // f(...args);  可以？
        });
    };
}
```

## 有界并发请求（教学用）

```js
async function request(urls, maxNumber, callback) {
  if (!Number.isInteger(maxNumber) || maxNumber < 1) {
    throw new RangeError("maxNumber 必须是正整数");
  }
  const results = new Array(urls.length);
  let cursor = 0;
  async function worker() {
    while (cursor < urls.length) {
      const index = cursor++;
      try {
        const response = await fetch(urls[index]);
        if (!response.ok) throw new Error("HTTP " + response.status);
        const text = await response.text();
        results[index] = { ok: true, text };
      } catch (error) {
        results[index] = { ok: false, error };
      }
    }
  }
  await Promise.all(Array.from(
    { length: Math.min(maxNumber, urls.length) }, () => worker()
  ));
  if (callback) callback(results);
  return results;
}
```

本例收集全部结果并保持输入顺序，不修改 urls。生产还需要超时、取消、响应大小上限和目标授权；文档中未发起任何请求。

## bind 函数实现

bind 函数有哪些功能：

1. 改变原函数的 this 指向，即绑定 this

2. 返回绑定函数对象，不是克隆原函数全部语义

3. 注意，还有一点，当 new 调用绑定函数的时候，thisArg 参数无效。也就是 new 操作符修改 this 指向的优先级更高

```js
if (!Function.prototype.bind)
    (function () {
        var slice = Array.prototype.slice;
        Function.prototype.bind = function () {
            var thatFunc = this,
                thatArg = arguments[0];
            var args = slice.call(arguments, 1);
            if (typeof thatFunc !== 'function') {
                // closest thing possible to the ECMAScript 5
                // internal IsCallable function
                throw new TypeError('Function.prototype.bind - ' + 'what is trying to be bound is not callable');
            }
            return function () {
                var funcArgs = args.concat(slice.call(arguments));
                return thatFunc.apply(thatArg, funcArgs);
            };
        };
    })();
```

## 写出输出的结果(主要考察引用类型的指针特性 + 连等赋值）

```js
var a = {x: 1};
var b = a;
a.x = a = {n: 1};
console.log(a);
console.log(b);
```

1. 在 A=B=C 中,连等赋值真正的运算规则是 B = C; A = B; 即连续赋值是从右至左永远只取等号右边的表达式结果赋值到等号左侧。
2. 成员运算符 `.` 的优先级 远高于 赋值运算符 `=`

## visibility:hidden 与 display:none 区别

**总结**

-   使用 CSS display:none 属性后，相应布局盒不生成，部分几何 API 返回零；DOM 对象和样式声明不会因此消失;

-   而使用 visibility:hidden 属性后，HTML 元素（对象）仅仅是在视觉上看不见（完全透明），而它所占据的空间位置仍然存在。也即是说它仍具有高度、宽度等属性值。

CSS display:none 和 visibility:hidden 的区别

visibility:hidden 隐藏，但在浏览时保留位置；display:none 通常不生成布局盒，但不能据此保证资源不下载。

Overflow 属性值{visible|hidden|scroll|auto}前提是先要限制 DIV 的宽度（width）和高度（height）。二者都是隐藏 HTML 元素，在视觉效果上没有区别，但在一些 DOM 操作中二者还是有所不同的。

## 函数执行 && new . 优先级

1. Member Access || new (with argument list) > new (without argument list)

```js
function Foo() {
    // 注意这里 getName 没有变量声明，所以是一个全局变量
    getName = function () {
        console.error(1);
    };
    return this;
}
Foo.getName = function () {
    console.error(2);
};
Foo.prototype.getName = function () {
    console.error(3);
};
var getName = function () {
    console.error(4);
};
function getName() {
    console.error(5);
}

// 2
Foo.getName();

// 4
getName();

// 1 <= this.getName()
Foo().getName();

// 1 same as above
getName();

// 2
new Foo.getName();

// 3 <= Foo.prototype.getName <= foo.getName
new Foo().getName();

// according to `operator precedence`
// 3 <= new (()=>{console.error(3)})() <= new Foo.prototype.getName() <= new foo.getName() <= (new ((new Foo()).getName()))
new new Foo().getName();
```

