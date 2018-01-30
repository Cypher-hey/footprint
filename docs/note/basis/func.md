## 一、创建函数

#### 函数声明

```js
function fnName(){

}
```

#### 函数表达式

```js
var fnName = function(){

}
```

#### 使用Function构造函数

```js
// 参数：Function 接收任意多的参数，但最后一个参数总被认为是函数体，前面的参数是传入新函数的参数
var fnName = new Function(a, b, c, 'return a + b + c')
```

#### 【ES6】箭头函数

```js
var fnName = () => {

}
```

## 二、函数的内部属性

#### anguments

* 类型：类数组对象，包含着传入函数的所有参数，和length属性
* 属性：
    * anguments.length	// 实际传入函数参数的个数
    * anguments.callee【严格模式报错】	// 指向拥有这个anguments对象的函数，即函数本身

#### this

** this 永远`指向最后调用它`的那个`对象` **

在JavaScript中，`this是当前执行函数的上下文（lexical scope）`。JavaScript有4种不同的函数调用方式:

* 函数调用: alert('Hello World!')
* 方法调用: console.log('Hello World!')
* 构造函数调用: new RegExp('\\d')
* 隐式调用apply/ call: alert.call(undefined, 'Hello World!')

this 在 JavaScript 中主要由以下五种使用场景。

* 作为函数调用，this 绑定全局对象，浏览器环境全局对象为 window 。
* 内部函数的 this 也绑定全局对象，应该绑定到其外层函数对应的对象上，这是 JavaScript的缺陷，用that替换。
* 作为构造函数使用，this 绑定到新创建的对象。
* 作为对象方法使用，this 绑定到该对象。
* 使用apply或call调用 this 将会被显式设置为函数调用的第一个参数。

<p class="tip">箭头函数的 this 始终指向函数定义时的 this，而非执行时。</p>

###### 改变 this 的指向

* 使用 ES6 的箭头函数
  * 箭头函数中没有 this 绑定，必须通过`查找作用域链`来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined。

* 在函数内部使用 _this = this
  * 将调用这个函数的对象保存在变量 _this(self) 中，然后在函数中都使用这个 _this(self)  通过(var self = this)

* 使用 apply、call、bind

* new 实例化一个对象

## 三、函数的属性和方法

#### 属性

###### fnName.caller
* 描述：保存着调用当前函数的函数的引用，如果在全局作用域调用当前函数，则返回 `null`

###### fnName.length
* 描述：表示函数希望接收的命名参数的个数
<p class="tip">
注意：anguments.length 是实际传入函数参数的个数，而 fnName.length 是函数希望接收命名参数的个数，【ES6函数默认值对length的影响】：指定默认值以及在指定默认值的参数之后的所有参数，都不会计算到length中
</p>

###### fnName.prototype
* 描述：保存函数的原型对象

###### 【ES6】fnName.name
* 描述：获取函数的函数名
* 返回值：
    * 对于函数声明：返回函数名
    * 对于匿名函数表达式：ES5返回空字符串，ES6返回变量的名字
    * 对于具名函数表达式：返回函数的原名字
    * 对于使用 new Function 创建的函数：返回 'anonymous'
    * 对于使用bind方法返回的函数：返回 'bound 函数名'

#### 方法

###### fnName.apply()

###### fnName.call()
* 描述：上面两个方法都用来在特殊的作用域调用函数，实际上等于设置函数体内的 `this` 对象的值
* 参数：
    * 第一个参数都是 this 的值
	* 第二个参数：`apply` 接收 `anguments` 对象或数组，`call` 必须逐个列举出来

[call 比 apply 快的原因是 call 方法的参数格式正是内部方法所需要的格式。](https://github.com/coderwin/__/issues/6)

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
由于 apply 中定义的参数格式（数组），使得被调用之后需要做更多的事，需要将给定的参数格式改变（步骤8）。 同时也有一些对参数的检查（步骤2），在 call 中却是不必要的。
另外一个很重要的点：在 apply 中不管有多少个参数，都会执行循环，也就是步骤 6-8，在 call 中也就是对应步骤3 ，是有需要才会被执行。

```js
Function.prototype.call (thisArg [ , arg1 [ , arg2, … ] ] )

1、如果 IsCallable（Function）为 false，即 Function 不可以被调用，则抛出一个 TypeError 异常。
2、定义 argList 为一个空列表。
3、如果使用超过一个参数调用此方法，则以从arg1开始的从左到右的顺序将每个参数附加为 argList 的最后一个元素
4、返回调用func的[[Call]]内部方法的结果，提供 thisArg 作为该值，argList 作为参数列表。
```
###### fnName.bind()
* 描述：根据已有函数，创建一个被绑定新 `this` 值的函数
* 参数：指定 `this` 值
* 返回值：
    * `{Function}` 被指定 `this` 值的`新函数`

## 四、ES6对函数的扩展

#### 参数默认值

```js
function (a = 2, b = 3){

}
```
<p class="tip">【注意：函数的length属性，不会计算指定默认值的参数以及其后的所有参数】</p>

#### rest参数 [...变量名]
* 描述：用于获取函数多余的参数，将其放入一个数组
* 注意：
    * 1、rest参数后面，不能有其他参数，否则会报错
    * 2、rest参数不会被计算到函数的length属性中

    
#### 箭头函数

箭头函数有几点需要注意：

* 函数体内的 `this` 对象是函数定义是所在的对象，而不是使用时的对象
* 不能用箭头函数当做构造函数，也就是说不能使用new命令，否则会报错
* 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `Rest参数` 代替。
* 不可以使用 `yield` 命令，因此箭头函数不能用作 `Generator` 函数。
* 由于箭头函数没有自己的 `this`，所以当然也就不能用 `call()`、`apply()`、`bind()` 这些方法去改变 `this` 的指向。

#### 尾递归

<p class="tip">【注意：ES6的尾调用优化只在严格模式下开启，正常模式是无效的。】</p>

```
    ES6明确规定，所有ECMAScript的实现，都必须部署“尾调用优化”。这就是说，在ES6中，只要使用尾递归，就不会发生栈溢出，相对节省内存。
        相关概念：
            1、尾调用：函数的最后一步调用另一个函数，叫做尾调用
                尾调用的好处是：只保留内层函数的调用帧，节省内存
            2、尾递归：函数尾调用自身，叫做尾递归
            3、柯里化：将多参数函数转成单参数函数
    因为尾调用优化的本质是，只保留内层函数的调用帧，ES6的尾调用只在严格模式下生效，那么在非严格模式下是否可以进行尾调用优化呢？但是可以的，有两种方案，一种是使用蹦床函数，一种是真正的尾调用，阮一峰的教程里有讲
```

#### new.target【ES6】

`new` 操作符用来调用函数或ES6的类，从而创建一个实例，ES6为new操作符添加一个属性即：`new.target`，它保存着 `new` 操作符所作用的那个函数或类，一般用在构造函数里，如果使用函数或类时没有使用 `new` 操作符，那么 `new.target` 的值为 `undefined`。

利用 `new.target` 就可以写出不能单独被实例化，必须要继承后才能使用的类：

```js
class Super {
    if (new.target === Super) {
        throw new Error('不能单独实例化')
    }
}
class Sub extends Super {

}

new Super() // 报错
new Sub()   // 正常使用
```




