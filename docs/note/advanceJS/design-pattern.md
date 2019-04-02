## 设计模式

### 原型模式和基于原型继承的JS对象系统

[ref](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

`函数构造器`（Function constructor）

函数构造器用于创建一个函数对象，在JavaScript中实际上每一个函数都是一个函数对象: 

语法：

```js
new Function ([arg1[, arg2[, ...argN]],] functionBody)
```
参数：

arg1, arg2, ... argN  被用于作为函数正常参数名的变量名字，这些变量名必须是符合JavaScript变量标识规范的表示单个变量的字符串或者以逗号分隔的表示多个变量的字符串，比如"x", "theValue", or "a,b"。

functionBody   包含函数定义的JavaScript语句的`字符串`。

描述：

1. 在创建函数时，将解析使用Function构造函数创建的函数对象。(Function objects created with the Function constructor are parsed when the function is created.) 。但是这样会比以函数声明、函数表达式等方式低效，因为这些函数是通过代码直接解析的。(Function objects created with the Function constructor are parsed when the function is created. This is less efficient than declaring a function with a function expression or function statement and calling it within your code because such functions are parsed with the rest of the code.)

2. 传递给函数构造器的字符串参数都会被当作函数构造器生成函数的变量参数名字，以他们出现的顺序作为生成的函数的参数的顺序。(All arguments passed to the function are treated as the names of the identifiers of the parameters in the function to be created, in the order in which they are passed. Omitting an argument will result in the value of that parameter being undefined.)

3. 以函数的方式调用函数构造器（不管用不用new关键词修饰）效果一样。(Invoking the Function constructor as a function (without using the new operator) has the same effect as invoking it as a constructor.)

函数构造器和函数声明的区别：

用函数构造器创建的函数不会在上下文中创建闭包，它们总是被创建在全局作用域中，当执行被创建的函数时，它们只能使用自己的局部变量或者全局变量，这和eval是不同的。

### 设计模式

[ref](https://juejin.im/post/5afe6430518825428630bc4d)

|设计模式       |特点|
|--            |--|
|单例模式       |一个类只能构造出唯一实例|
|策略模式       |根据不同参数可以命中不同的策略|
|代理模式       |代理对象和本体对象具有一致的接口|
|迭代器模式     |能获取聚合对象的顺序和元素|
|发布-订阅模式   |PubSub|
|命令模式       |不同对象间约定好相应的接口|
|组合模式       |组合模式在对象间形成一致对待的树形结构|
|模板方法模式    |父类中定好执行顺序|
|享元模式       |减少创建实例的个数|
|职责链模式     |通过请求第一个条件，会持续执行后续的条件，直到返回结果为止|
|中介者模式     |对象和对象之间借助第三方中介者进行通信|
|装饰者模式     |动态地给函数赋能|
|状态模式       |每个状态建立一个类，状态改变会产生不同行为|
|适配者模式     |一种数据结构改成另一种数据结构|

#### 单例模式

**单例模式两个条件**

* 确保只有一个实例
* 可以全局访问

**实现**

```js
const singleton = function(name) {
  this.name = name
  this.instance = null
}

singleton.prototype.getName = function() {
  console.log(this.name)
}

singleton.getInstance = function(name) {
  if (!this.instance) { // 关键语句
    this.instance = new singleton(name)
  }
  return this.instance
}

// test
const a = singleton.getInstance('a') // 通过 getInstance 来获取实例
const b = singleton.getInstance('b')
console.log(a === b)
```

因为 JavaScript 是无类的语言，而且 JS 中的全局对象符合单例模式两个条件。很多时候我们把全局对象当成单例模式来使用

```js
var obj = {}
```

**1、弹窗框的实践**

实现弹框的一种做法是先创建好弹框，然后使之隐藏，这样子的话会浪费部分不必要的 DOM 开销，我们可以在需要弹框的时候再进行创建，同时结合单例模式实现只有一个实例，从而节省部分 DOM 开销。下列为登入框部分代码：

```js
const createLoginLayer = function() {
  const div = document.createElement('div')
  div.innerHTML = '登入浮框'
  div.style.display = 'none'
  document.appendChild(div)
  return div
}
```

使单例模式和创建弹框代码解耦

```js
const getSingle = function(fn) {
  const result
  return function() {
    return result || result = fn.apply(this, arguments)
  }
}
```

```js
const createSingleLoginLayer = getSingle(createLoginLayer)

document.getElementById('loginBtn').onclick = function() {
  createSingleLoginLayer()
}
```

#### 策略模式

**定义：根据不同参数可以命中不同的策略**

根据不同的参数（level）获得不同策略方法(规则)，这是策略模式在 JS 比较经典的运用之一。

```js
const strategy = {
  'S': function(salary) {
    return salary * 4
  },
  'A': function(salary) {
    return salary * 3
  },
  'B': function(salary) {
    return salary * 2
  }
}

const calculateBonus = function(level, salary) {
  return strategy[level](salary)
}

calculateBonus('A', 10000) // 30000

// 在函数是一等公民的 JS 中，策略模式的使用常常隐藏在高阶函数中，稍微变换下上述 demo 的形式如下

const S = function(salary) {
  return salary * 4
}

const A = function(salary) {
  return salary * 3
}

const B = function(salary) {
  return salary * 2
}

const calculateBonus = function(func, salary) {
  return func(salary)
}

calculateBonus(A, 10000) // 30000
```

** 优点 **

* 能减少大量的 if 语句
* 复用性好

#### 代理模式

代理对象和本体对象具有一致的接口，对使用者友好

代理模式的种类有很多，在 JS 中最常用的为**虚拟代理**和**缓存代理**。

**虚拟代理实现图片预加载**：

下面代码运用代理模式来实现图片预加载，可以看到通过代理模式巧妙地将创建图片与预加载逻辑分离，并且在未来如果不需要预加载，只要改成请求本体代替请求代理对象就行。

```js
const myImage = (function() {
  const imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function(src) {
      imgNode.src = src
    }
  }
})()

const proxyImage = (function() {
  const img = new Image()
  img.onload = function() { // http 图片加载完毕后才会执行
    myImage.setSrc(this.src)
  }
  return {
    setSrc: function(src) {
      myImage.setSrc('loading.jpg') // 本地 loading 图片
      img.src = src
    }
  }
})()

proxyImage.setSrc('http://loaded.jpg')
```

**缓存代理实现乘积计算**

```js
const mult = function() {
  let a = 1
  for (let i = 0, l; l = arguments[i++];) {
    a = a * l
  }
  return a
}

const proxyMult = (function() {
  const cache = {}
  return function() {
    const tag = Array.prototype.join.call(arguments, ',')
    if (cache[tag]) {
      return cache[tag]
    }
    cache[tag] = mult.apply(this, arguments)
    return cache[tag]
  }
})()

proxyMult(1, 2, 3, 4) // 24
```

在开发时候不要先去猜测是否需要使用代理模式，如果发现直接使用某个对象不方便时，再来优化.