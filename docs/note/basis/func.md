# 函数：参数、this、调用与构造

> 核查日期：2026-10-08。状态：正文审阅、关键语义纠错；示例未执行。旧规范算法不是当前引擎源码或性能证据。

## 一、创建函数

### 函数声明

```js
function fnName() {}
```

### 函数表达式

```js
var fnName = function () {};
```

### 使用 Function 构造函数

```js
// 参数：Function 接收任意多的参数，但最后一个参数总被认为是函数体，前面的参数是传入新函数的参数
var fnName = new Function('a', 'b', 'c', 'return a + b + c');
```

### 【ES6】箭头函数

```js
var fnName = () => {};
```

## 二、函数的内部属性

### arguments

-   类型：类数组对象，包含着传入函数的所有参数，和 length 属性
-   属性：
    -   arguments.length // 实际传入函数参数的个数
    -   arguments.callee【严格模式报错】 // 指向拥有这个 arguments 对象的函数，即函数本身

### this：由调用语义与函数种类决定

| 场景 | this 来源 |
| --- | --- |
| 严格模式普通函数直接调用 | undefined |
| 非严格普通函数直接调用 | 通常替换为全局对象 |
| obj.method() | 调用表达式中的接收者 obj |
| call / apply | 显式提供的 thisArg，仍受函数种类影响 |
| bind 返回的绑定函数 | 已绑定接收者；作为构造调用时另有规则 |
| 箭头函数 | 捕获外层 this，没有自己的 this 绑定 |
| new 构造调用 | 新对象，具体返回值规则另行处理 |

this 不是词法作用域本身，也不总是“最后调用它的对象”。把 obj.method 赋给独立变量后调用，会失去原来的接收者。箭头函数顶层 this 取决于外层环境，例如脚本和 ES 模块并不相同。

## 三、函数的属性和方法

### 属性

#### fnName.caller

-   历史接口：caller 受严格模式等限制，不作为现代业务逻辑或调试依赖。

#### fnName.length

-   描述：表示函数希望接收的命名参数的个数
<p class="tip">
注意：arguments.length 是实际传入函数参数的个数，而 fnName.length 是函数希望接收命名参数的个数，【ES6函数默认值对length的影响】：指定默认值以及在指定默认值的参数之后的所有参数，都不会计算到length中
</p>

#### fnName.prototype

-   描述：可构造函数通常具有用于实例原型链的 prototype；箭头函数等并不具备相同能力。

#### 【ES6】fnName.name

-   描述：获取函数的函数名
-   返回值：
    -   对于函数声明：返回函数名
    -   对于匿名函数表达式：ES5 返回空字符串，ES6 返回变量的名字
    -   对于具名函数表达式：返回函数的原名字
    -   对于使用 new Function 创建的函数：返回 'anonymous'
    -   对于使用 bind 方法返回的函数：返回 'bound 函数名'

### 方法

#### fnName.apply()

#### fnName.call()

-   描述：上面两个方法都用来在特殊的作用域调用函数，实际上等于设置函数体内的 `this` 对象的值
-   参数：
    -   第一个参数都是 this 的值 \* 第二个参数：`apply` 接收 `arguments` 对象或数组，`call` 必须逐个列举出来

历史资料曾根据抽象步骤推断 call 一定比 apply 快，这不是可靠的跨引擎结论。下面保留历史算法说明作概念背景，不能把步骤数量当成现代引擎性能实测。

他们被调用之后发生了什么:

```js
Function.prototype.apply (thisArg, argArray)

1、如果 IsCallable（Function）为false，即 Function 不可以被调用，则抛出一个 TypeError 异常。
2、如果 argArray 为 null 或未定义，则返回调用 Function 的 [[Call]] 内部方法的结果，提供thisArg 和一个空数组作为参数。
3、如果 Type（argArray）不是 Object，则抛出 TypeError 异常。
4、获取 argArray 的长度。调用 argArray 的 [[Get]] 内部方法，找到属性 length。 赋值给 len。
5、定义 n 为 ToUint32（len）。
6、初始化 argList 为一个空列表。
7、初始化 index 为 0。
8、循环迭代取出 argArray。重复循环 while（index < n）
    a、将下标转换成String类型。初始化 indexName 为 ToString(index).
    b、定义 nextArg 为 使用 indexName 作为参数调用argArray的[[Get]]内部方法的结果。
    c、将 nextArg 添加到 argList 中，作为最后一个元素。
    d、设置 index ＝ index＋1
9、返回调用 Function 的 [[Call]] 内部方法的结果，提供 thisArg 作为该值，argList 作为参数列表。
```

由于 apply 中定义的参数格式（数组），使得被调用之后需要做更多的事，需要将给定的参数格式改变（步骤 8）。 同时也有一些对参数的检查（步骤 2），在 call 中却是不必要的。
另外一个很重要的点：在 apply 中不管有多少个参数，都会执行循环，也就是步骤 6-8，在 call 中也就是对应步骤 3 ，是有需要才会被执行。

```js
Function.prototype.call (thisArg [ , arg1 [ , arg2, … ] ] )

1、如果 IsCallable（Function）为 false，即 Function 不可以被调用，则抛出一个 TypeError 异常。
2、定义 argList 为一个空列表。
3、如果使用超过一个参数调用此方法，则以从arg1开始的从左到右的顺序将每个参数附加为 argList 的最后一个元素
4、返回调用func的[[Call]]内部方法的结果，提供 thisArg 作为该值，argList 作为参数列表。
```

#### fnName.bind()

-   描述：根据已有函数，创建一个被绑定新 `this` 值的函数
-   参数：指定 `this` 值
-   返回值：
    -   `{Function}` 被指定 `this` 值的`新函数`

## 四、ES6 对函数的扩展

### 参数默认值

```js
function withDefaults(a = 2, b = 3){

}
```

<p class="tip">【注意：函数的length属性，不会计算指定默认值的参数以及其后的所有参数】</p>

### rest 参数 [...变量名]

-   描述：用于获取函数多余的参数，将其放入一个数组
-   注意：
    -   1、rest 参数后面，不能有其他参数，否则会报错
    -   2、rest 参数不会被计算到函数的 length 属性中

### 箭头函数

箭头函数有几点需要注意：

-   箭头函数没有自己的 this，使用外层词法环境的 this，而不是任意“定义时所在对象”
-   不能用箭头函数当做构造函数，也就是说不能使用 new 命令，否则会报错
-   没有自己的 arguments；可能引用外层普通函数的 arguments。接收自身参数优先使用 rest。
-   不可以使用 `yield` 命令，因此箭头函数不能用作 `Generator` 函数。
-   由于箭头函数没有自己的 `this`，所以当然也就不能用 `call()`、`apply()`、`bind()` 这些方法去改变 `this` 的指向。

### 尾调用与尾递归

尾调用优化有规范条件与实现差异；不能承诺“写了尾递归就不会栈溢出”。跨引擎库对深递归应使用显式循环、工作栈或经过测试的 trampoline。柯里化、尾调用和尾递归是不同概念，不应混为一个性能技巧。

### new.target【ES6】

`new` 操作符用来调用函数或 ES6 的类，从而创建一个实例，ES6 为 new 操作符添加一个属性即：`new.target`，它保存着 `new` 操作符所作用的那个函数或类，一般用在构造函数里，如果使用函数或类时没有使用 `new` 操作符，那么 `new.target` 的值为 `undefined`。

利用 `new.target` 就可以写出不能单独被实例化，必须要继承后才能使用的类：

```js
class Super {
    constructor() {
        if (new.target === Super) {
            throw new Error('不能单独实例化');
        }
    }
}
class Sub extends Super {

}

new Super() // 报错
new Sub()   // 正常使用
```

## 自测与参考

将 obj.method 解构后调用，再分别使用 bind 与箭头函数，说明 this 的变化。尝试对箭头函数使用 new，解释为什么不成立。

- [MDN Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [MDN Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
