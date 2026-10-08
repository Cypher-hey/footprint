# 队列：FIFO、实现成本与任务调度

> 审阅日期：2026-10-08。状态：教学代码静态审阅，未运行。

## 成本与使用边界

下方数组 + shift 是易懂的演示，不保证出队 O(1)。大队列可用头尾索引、环形缓冲或链表，并注意释放已消费元素引用。优先队列按优先级出队，与普通 FIFO 是不同抽象；需明确相同优先级是否保持顺序。

## 队列

### 概念

队列是一种先进先出(first-in-first-out)的数据结构，只允许在一端插入数据，在另一端读取数据。对队列的操作有如下几种：

* 入队（向队列尾部插入新元素）
* 出队（删除队列头部的元素）
* 读取队头的元素（获取但不删除队列头部的元素）
* 清空队列
* 获取队列的元素个数
* 等...

### JavaScript实现

我们知道，JavaScript数组原生提供了队列方法，如：`push`、`pop`、`unshift`、`shift` 等等，所以我们既可以用数组来模拟栈，又可以用数组来模拟队列，可按需要封装接口，限制调用者只使用指定操作。

#### 队列的方法和属性

* 属性
    * 无
    * 或者自定义需要的属性
* 方法
    * enqueue(element)
    * dequeue()
    * peek()
    * clear()
    * length()

#### 代码实现

```js
function Queue () {
    this.store = []
}
Queue.prototype = {
    constructor: Queue,
    enqueue: function (element) {
        return this.store.push(element)
    },
    dequeue: function () {
        return this.store.shift()
    },
    peek: function () {
        return this.store[0]
    },
    clear: function () {
        this.store.length = 0
    },
    length: function () {
        return this.store.length
    }
}
```

上面的代码是一个极简的队列实现，我们可以写如下测试代码：

```js
var qu = new Queue()

qu.enqueue('1')
qu.enqueue('2')
qu.enqueue('3')

console.log(qu.peek())  // 1

qu.dequeue()

console.log(qu.peek())  // 2

qu.clear()

console.log(qu.peek())  // undefined
```

### 优先队列

一般情况下，队列始终保持着先进先出的原则，但有些业务场景，并不一定要求先进来的要先出去，在出队的时候，要考虑队列中所有元素权重因子，优先级最高的元素最先出队，这种队列叫做`优先队列`。

## 工程练习

测试空队列、连续入出队、清空后再用；任务队列还要有容量上限、背压、取消和失败处理。数据结构里的 dequeue 不等于任务已成功完成。
