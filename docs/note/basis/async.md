# 异步处理：Promise、await 与任务生命周期

> 核查日期：2026-10-08。状态：全文静态审阅与关键语义修正；教学代码未运行。

## 核心对比

| 组合方式 | 完成条件 | 风险 |
| --- | --- | --- |
| 顺序 await | 按依赖逐步等待 | 无依赖任务也串行会增加延迟 |
| Promise.all | 全部成功，首次失败即拒绝 | 不会自动取消其他任务 |
| Promise.allSettled | 全部完成并收集状态 | 长期 pending 会一直等待 |
| Promise.race | 首个 settled | 不取消其他任务 |
| Promise.any | 首个成功，全部拒绝才失败 | 不限制并发与资源 |

await 暂停当前 async 函数，不是阻塞整个事件循环；CPU 密集同步工作放进 async 函数仍会占用执行线程。


## 简介

主流的异步处理方案主要有：回调函数(CallBack)、Promise、Generator、async/await。这一小节，我们通过一个小例子，对比这几种异步处理方案的不同。

### 回调函数(CallBack)

假设我们有一个 `getData` 方法，用于异步获取数据，第一个参数为请求的 `url` 地址，第二个参数是回调函数，如下：

```js
function getData(url, callBack) {
    // 模拟发送网络请求
    setTimeout(() => {
        // 假设 res 就是返回的数据
        var res = {
            url: url,
            data: Math.random()
        };
        // 执行回调，将数据作为参数传递
        callBack(res);
    }, 1000);
}
```

我们预先设定一个场景，假设我们要请求三次服务器，每一次的请求依赖上一次请求的结果，如下：

```js
getData('/page/1?param=123', (res1) => {
    console.log(res1);
    getData(`/page/2?param=${res1.data}`, (res2) => {
        console.log(res2);
        getData(`/page/3?param=${res2.data}`, (res3) => {
            console.log(res3);
        });
    });
});
```

通过上面的代码可以看出，第一次请求的 `url` 地址为：`/page/1?param=123`，返回结果为 `res1`。

第二个请求的 `url` 地址为：`/page/2?param=${res1.data}`，依赖第一次请求的 `res1.data`，返回结果为 `res2`。

第三次请求的 `url` 地址为：`/page/3?param=${res2.data}`，依赖第二次请求的 `res2.data`，返回结果为 `res3`。

由于后续请求依赖前一个请求的结果，所以我们只能把下一次请求写到上一次请求的回调函数内部，这样就形成了常说的：考百科·海尔 🐵

### 使用 Promise

`Promise` 就是为了解决回调地狱的问题，为异步编程提供统一接口而提出的，最早有社区实现，由于 ES6 的原因，现在 `Promise` 已经是语言基础的一部分了。

现在我们使用 `Promise` 重新实现上面的案例，首先，我们要把异步请求数据的方法封装成 `Promise` ：

```js
function getDataAsync(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var res = {
                url: url,
                data: Math.random()
            };
            resolve(res);
        }, 1000);
    });
}
```

那么请求的代码应该这样写：

```js
getDataAsync('/page/1?param=123')
    .then((res1) => {
        console.log(res1);
        return getDataAsync(`/page/2?param=${res1.data}`);
    })
    .then((res2) => {
        console.log(res2);
        return getDataAsync(`/page/3?param=${res2.data}`);
    })
    .then((res3) => {
        console.log(res3);
    });
```

`then` 方法返回一个新的 `Promise` 对象，`then` 方法的链式调用避免了 `CallBack` 回调地狱。但也并不是完美，比如我们要添加很多 `then` 语句，
每一个 `then` 还是要写一个回调。如果场景再复杂一点，比如后边的每一个请求依赖前面所有请求的结果，而不仅仅依赖上一次请求的结果，那会更复杂。
为了做的更好，`async/await` 就应运而生了，来看看使用 `async/await` 要如何实现。

### async/await

`getDataAsync` 方法不变，如下：

```js
function getDataAsync(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var res = {
                url: url,
                data: Math.random()
            };
            resolve(res);
        }, 1000);
    });
}
```

业务代码如下：

```js
async function getData() {
    var res1 = await getDataAsync('/page/1?param=123');
    console.log(res1);
    var res2 = await getDataAsync(`/page/2?param=${res1.data}`);
    console.log(res2);
    var res3 = await getDataAsync(`/page/2?param=${res2.data}`);
    console.log(res3);
}
```

对比 `Promise` 感觉怎么样？是不是非常清晰，但是 `async/await` 是基于 `Promise` 的，因为使用 `async` 修饰的方法最终返回一个 `Promise`，
Generator + 执行器可帮助理解暂停与恢复，但 async/await 有独立规范语义，不能据此断言引擎内部一定用 Generator 实现。下面保留历史教学对照。

### Generator

首先异步函数依然是：

```js
function getDataAsync(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var res = {
                url: url,
                data: Math.random()
            };
            resolve(res);
        }, 1000);
    });
}
```

使用 `Generator` 函数可以这样写：

```js
function * getData () {
    var res1 = yield getDataAsync('/page/1?param=123')
    console.log(res1)
    var res2 = yield getDataAsync(`/page/2?param=${res1.data}`)
    console.log(res2)
    var res3 = yield getDataAsync(`/page/2?param=${res2.data}`)
    console.log(res3)
}
```

然后我们这样逐步执行：

```js
var g = getData();
g.next().value.then((res1) => {
    g.next(res1).value.then((res2) => {
        g.next(res2).value.then(() => {
            g.next();
        });
    });
});
```

上面的代码，我们逐步调用遍历器的 `next()` 方法，由于每一个 `next()` 方法返回值的 `value` 属性为一个 `Promise` 对象，所以我们为其添加 `then` 方法，
在 `then` 方法里面接着运行 `next` 方法挪移遍历器指针，直到 `Generator` 函数运行完成，实际上，这个过程我们不必手动完成，可以封装成一个简单的执行器：

```js
function run(gen) {
    var g = gen();

    function next(data) {
        var res = g.next(data);
        if (res.done) return res.value;
        res.value.then((data) => {
            next(data);
        });
    }

    next();
}
```

`run` 方法用来自动运行异步的 `Generator` 函数，其实就是一个递归的过程调用的过程。这样我们就不必手动执行 `Generator` 函数了。
有了 `run` 方法，我们只需要这样运行 `getData` 方法：

```js
run(getData);
```

这样，我们就可以把异步操作封装到 `Generator` 函数内部，使用 `run` 方法作为 `Generator` 函数的自执行器，来处理异步。其实我们不难发现，
`async/await` 方法相比于 `Generator` 处理异步的方式，有很多相似的地方，只不过 `async/await` 在语义化方面更加明显，同时 `async/await`
不需要我们手写执行器，其内部已经帮我们封装好了，这只是教学类比，不是引擎实现证明。此简易执行器遗漏 rejection 注入与返回 Promise，不能当作生产级协程执行器。

## Promise

> Promise 对象是一个代理对象（代理一个值），被代理的值在 Promise 对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的 Promise 对象。

Promise 是抽象异步处理对象以及对其进行各种操作的组件，

类方法：`reject resolve all race`

实例方法：`Promise() then() catch()`

Promise 对象有以下几种状态：

-   pending：初始状态，不是成功或失败状态。

-   fulfilled：成功状态，意味着操作成功完成。

-   rejected：失败状态，意味着操作失败。

Promise 状态为 pending、fulfilled 或 rejected；后两者合称 settled。resolved 不总等于 fulfilled：resolve 另一个未完成 Promise 时，会跟随它的最终结果。

executor 在构造时同步调用，then/catch 处理函数按异步任务机制执行。对已完成 Promise 新注册处理函数也不会在注册调用栈内立即执行。

Promise 本身没有通用取消方法；底层操作可以提供 AbortSignal 等取消协议。未处理 rejection 可以被宿主报告，不能说“内部错误永远不反映到外部”。

### 初始化

一般情况下我们都会使用 new Promise() 来创建 Promise 对象:

构造函数：

```js
var promise = new Promise(function (resolve, reject) {
    // 异步处理
    // 处理结束后，调用 resolve 或 reject，进入完成或失败状态
});
```

例：

```js
// resolve 将 Promise 的状态置为 fullfiled,
// reject 将 Promise 的状态置为 rejected

var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    setTimeout(function () {
        console.log('执行完成');
        resolve('随便什么数据');
    }, 2000);
});
// 执行了一个异步操作，也就是 setTimeout，2秒后，输出“执行完成”，并且调用 resolve 方法。
```

使用 Promise 一般是包裹在一个函数中，在需要的时候去运行这个函数：

```js
function runAsync() {
    var p = new Promise(function (resolve, reject) {
        //做一些异步操作
        setTimeout(function () {
            console.log('执行完成');
            resolve('随便什么数据');
        }, 2000);
    });
    return p;
}
runAsync();
// 执行这个函数我们得到了一个Promise对象
```

### 链式操作

从表面上看，Promise 只是能够简化层层回调的写法，而实质上，Promise 的精髓是`状态`，用维护状态、传递状态的方式来使得回调函数能够及时调用，它比传递 callback 函数要简单、灵活的多。

所以使用 Promise 的正确场景是这样的：

```js
// 定义三个包含 Promise 的函数
function runAsync1() {
    var p = new Promise(function (resolve, reject) {
        // 做一些异步操作
        setTimeout(function () {
            console.log('异步任务1执行完成');
            resolve('随便什么数据1');
        }, 1000);
    });
    return p;
}
function runAsync2() {
    var p = new Promise(function (resolve, reject) {
        //做一些异步操作
        setTimeout(function () {
            console.log('异步任务2执行完成');
            resolve('随便什么数据2');
        }, 2000);
    });
    return p;
}
function runAsync3() {
    var p = new Promise(function (resolve, reject) {
        //做一些异步操作
        setTimeout(function () {
            console.log('异步任务3执行完成');
            resolve('随便什么数据3');
        }, 2000);
    });
    return p;
}
```

```js
// 链式调用 1
runAsync1()
    .then(function (data) {
        console.log(data);
        return runAsync2();
    })
    .then(function (data) {
        console.log(data);
        return runAsync3();
    })
    .then(function (data) {
        console.log(data);
    });
// 这样能够按顺序，每隔两秒输出每个异步回调中的内容，在 runAsync2 中传给 resolve 的数据，能在接下来的 then 方法中拿到。

// 链式调用 2
// 在 then 方法中，你也可以直接 return 数据而不是 Promise 对象，在后面的 then 中就可以接收到数据了，比如我们把上面的代码修改成这样：
runAsync1()
    .then(function (data) {
        console.log(data);
        return runAsync2();
    })
    .then(function (data) {
        console.log(data);
        return '直接返回数据'; //这里直接返回数据
    })
    .then(function (data) {
        console.log(data);
    });
```

### 异步

> -   绝对不能对异步回调函数（即使在数据已经就绪）进行同步调用。

> -   如果对异步回调函数进行同步调用的话，处理顺序可能会与预期不符，可能带来意料之外的后果。

> -   对异步回调函数进行同步调用，还可能导致栈溢出或异常处理错乱等问题。

> -   如果想在将来某时刻调用异步回调函数的话，可以使用 setTimeout 等异步 API。

> > Effective JavaScript — David Herman

注意区分：Promise executor 同步调用，then/catch 的 reaction 异步执行；不能笼统说 Promise 内所有代码都异步。

### resolve

resolve 接受普通值时可以 fulfillment，接受 Promise/thenable 时则采用其结果；不能把 resolve 与 fulfilled 无条件等同。

```js
// 在这段代码中的 resolve(42); 会让这个promise对象立即进入确定（即resolved）状态，
// 并将 42 传递给后面then里所指定的 onFulfilled 函数。
new Promise(function (resolve) {
    resolve(42);
});

// 静态方法 Promise.resolve(value) 可以认为是 new Promise() 方法的快捷方式:
Promise.resolve(42);

// 返回值也是一个promise对象, 可以像下面那样接着对其返回值进行 .then 调用。
Promise.resolve(42).then(function (value) {
    console.log(value);
});
```

Promise.resolve 作为将值转换为 Promise 的便捷方式，在进行 Promise 对象的初始化或者编写测试代码的时候都非常方便。

### reject

reject 的作用就是把 Promise 的状态置为 rejected，这样我们在 then 中就能捕捉到，然后执行“失败”情况的回调。

```js
// 这段代码的功能是调用该promise对象通过then指定的 onRejected 函数，并将错误（Error）对象传递给这个 onRejected 函数。
new Promise(function (resolve, reject) {
    reject(new Error('出错了'));
});

// 快捷方式为：
Promise.reject(new Error('出错了'));

// 返回值也是一个promise对象
Promise.reject(new Error('BOOM!')).catch(function (error) {
    console.error(error);
});
```

它和 Promise.resolve(value) 的不同之处在于 Promise 内调用的函数是 reject 而不是 resolve，这在编写测试代码或者进行 debug 时，说不定会用得上。

### then

每次调用 then 都会返回一个新创建的 promise 对象。

```js
// 在我们包装好的函数最后，会 return 出 Promise 对象，也就是说，执行这个函数 runAsync() 我们得到了一个 Promise 对象:
function runAsync() {
    var p = new Promise(function (resolve, reject) {
        //做一些异步操作
        setTimeout(function () {
            console.log('执行完成');
            resolve('随便什么数据');
        }, 2000);
    });
    return p;
}

// 在runAsync()的返回上直接调用then方法，then 接收一个函数作为参数，并且是作为在runAsync中调用resolve时（此例中）传的的参数。
runAsync().then(function (data) {
    console.log(data);
    //后面可以用传过来的数据做些其他操作
    //......
});

// 运行这段代码，会在2秒后输出“执行完成”，紧接着输出“随便什么数据”。
```

原理上 then 里面的函数就跟我们平时的回调函数一个意思，能够在 runAsync 这个**异步任务执行完成之后被执行**。这就是 Promise 的作用了，简单来讲，就是能把原来的回调写法分离出来，在异步操作执行完后，用链式调用的方式执行回调函数。

** 而 Promise 的优势在于，可以在 then 方法中继续写 Promise 对象并返回，然后继续调用 then 来进行回调操作。 **

### catch

Promise 对象除了 then 方法，还有一个 catch 方法，实际上它只是 `promise.then(undefined, onRejected)` 方法的一个别名，用来指定 reject 的回调；

也就是说，catch 方法用来注册当 Promise 对象状态变为 rejected 时的回调函数。

用法：

```js
function getNumber() {
    var p = new Promise(function (resolve, reject) {
        //做一些异步操作
        setTimeout(function () {
            var num = Math.ceil(Math.random() * 10); //生成1-10的随机数
            if (num <= 5) {
                resolve(num);
            } else {
                reject('数字太大了');
            }
        }, 2000);
    });
    return p;
}
// 仅使用 then 方法
getNumber().then(
    function (data) {
        console.log('resolved');
        console.log(data);
    },
    function (reason, data) {
        console.log('rejected');
        console.log(reason);
    }
);

// 用途 1：效果和写在 then 的第二个参数里面一样.
getNumber()
    .then(function (data) {
        console.log('resolved');
        console.log(data);
    })
    .catch(function (reason) {
        console.log('rejected');
        console.log(reason);
    });

// 用途 2：在执行 resolve 的回调（也就是上面 then 中的第一个参数）时，如果抛出异常了（代码出错了），
// 那么并不会报错卡死js，而是会进到这个 catch 方法中。
getNumber()
    .then(function (data) {
        console.log('resolved');
        console.log(data);
        console.log(somedata); //此处的 somedata 未定义
    })
    .catch(function (reason) {
        console.log('rejected');
        console.log(reason);
    });
```

### all

Promise.all 聚合已有的输入；真正启动操作的是调用函数等动作，不是 all 创造线程或自动启动所有异步任务。

all 方法的效果实际上是「谁跑的慢，以谁为准执行回调」

Promise.all 接收 iterable，全部 fulfillment 时按输入顺序返回结果；任一 rejection 使聚合 Promise 拒绝，但不会取消其他操作。

```js
// 仍旧使用上面定义好的 runAsync1、runAsync2、runAsync3 这三个函数，看下面的例子：

Promise.all([runAsync1(), runAsync2(), runAsync3()]).then(function (results) {
    console.log(results);
});
// 三个异步操作的并行执行的，等到它们都执行完后才会进到then里面;
// all 会把所有异步操作的结果放进一个数组中传给 then，就是上面的 results,
```

通过 all 方法，就可以并行执行多个异步操作，并且在一个回调中处理所有的返回数据。

### race

相对的就有另一个方法「谁跑的快，以谁为准执行回调」，这就是 race 方法，这个词本来就是赛跑的意思。

Promise.all 等待全部 fulfillment，或在首次 rejection 后拒绝， 与之相对的是 Promise.race 只要有一个 Promise 对象进入 fulFilled 或者 rejected 状态的话，就会继续进行后面的处理。

```js
// 把上面 runAsync1 的延时改为 1 秒来看一下：

Promise.race([runAsync1(), runAsync2(), runAsync3()]).then(function (results) {
    console.log(results);
});
// 这三个异步操作同样是并行执行的。结果是 1 秒后 runAsync1 已经执行完了，此时 then 里面的就执行了。
// 在 then 里面的回调开始执行时，runAsync2() 和 runAsync3() 并没有停止，仍旧再执行。于是再过 1 秒后，输出了他们结束的标志。
```

> Promise 可以一直 pending，规范不会强制超时。工程上需要为外部依赖设置超时、取消和恢复策略；race 超时只改变竞争结果，不会自动中止输掉的操作。

## practices

1. A Promise can be created from scratch using its constructor. This should be needed only to wrap old APIs.
直接用构造器创建一个 Promise 实例，只应出现在需要处理对老旧 APIs 的兼容的场景下

In an ideal world, all asynchronous functions would already return promises. Unfortunately, some APIs still expect success and/or failure callbacks to be passed in the old way. The most obvious example is the setTimeout() function:

```js
// Mixing old-style callbacks and promises is problematic. If saySomething() fails or contains a programming error, nothing catches it. setTimeout is to blame for this.
setTimeout(() => saySomething('10 seconds passed'), 10 * 1000);

// Luckily we can wrap setTimeout in a promise. Best practice is to wrap problematic functions at the lowest possible level, and then never call them directly again:
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait(10 * 1000)
    .then(() => saySomething('10 seconds'))
    .catch(failureCallback);

// Basically, the promise constructor takes an executor function that lets us resolve or reject a promise manually. Since setTimeout() doesn't really fail, we left out reject in this case.
```

references:

-   [JavaScript Promise 迷你书（中文版）](http://liubin.org/promises-book/#chapter1-what-is-promise)

-   [ES6 Promise 用法](http://blog.csdn.net/cut001/article/details/73369141)

## 工程补充与验证

对外请求至少考虑：HTTP 错误是否显式检查、超时、取消、重试上限、并发上限和过期结果。重复写操作需要幂等设计，不能只重试。

练习：让请求 A 比 B 更晚返回，但 B 是用户最后选择的内容。用 requestId 判断哪个结果能写回；再说明 AbortController 与忽略旧结果分别解决什么。

- [MDN Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
