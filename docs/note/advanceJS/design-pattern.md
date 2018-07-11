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

