# 异步处理

## 简介

主流的异步处理方案主要有：回调函数(CallBack)、Promise、Generator、async/await。这一小节，我们通过一个小例子，对比这几种异步处理方案的不同。

#### 回调函数(CallBack)

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

#### 使用 Promise

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

#### async/await

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
实际上，`async/await` 可以看做是使用 `Generator` 函数处理异步的语法糖，我们来看看如何使用 `Generator` 函数处理异步。

#### Generator

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
    console.log(res3))
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
不需要我们手写执行器，其内部已经帮我们封装好了，这就是为什么说 `async/await` 是 `Generator` 函数处理异步的语法糖了。

## Promise

> Promise 对象是一个代理对象（代理一个值），被代理的值在 Promise 对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的 Promise 对象。

Promise 是抽象异步处理对象以及对其进行各种操作的组件，

类方法：`reject resolve all race`

实例方法：`Promise() then() catch()`

Promise 对象有以下几种状态：

-   pending：初始状态，不是成功或失败状态。

-   fulfilled：成功状态，意味着操作成功完成。

-   rejected：失败状态，意味着操作失败。

Promise 对象特点：

1. 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态,`只有异步操作的结果，可以决定当前是哪一种状态(fulfilled, rejected)，任何其他操作都无法改变这个状态。`这也是 Promise 这个名字的由来，意味是「承诺」或者现在翻译为期约倒也合适，表示其他手段无法改变 fulfilled 和 rejected 这两个中的任一状态--（一旦）**settled** -> （只能是） resolve (成功) 或 reject (失败)。

2. `一旦状态改变，就不会再变，任何时候都可以得到这个结果`。Promise 对象的状态改变，只有两种可能：从 pending 变为 resolved 和从 pending 变为 rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

优势：

有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。

缺点：

1. 无法取消 Promise，一旦新建它就会立即执行，无法中途取消。

2. 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。

3. 当处于 Pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

#### 初始化

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

#### 链式操作

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

#### 异步

> -   绝对不能对异步回调函数（即使在数据已经就绪）进行同步调用。

> -   如果对异步回调函数进行同步调用的话，处理顺序可能会与预期不符，可能带来意料之外的后果。

> -   对异步回调函数进行同步调用，还可能导致栈溢出或异常处理错乱等问题。

> -   如果想在将来某时刻调用异步回调函数的话，可以使用 setTimeout 等异步 API。

> > Effective JavaScript — David Herman

为了避免上述中同时使用同步、异步调用可能引起的混乱问题，Promise 在规范上规定** Promise 只能使用异步调用方式 **。

#### resolve

resolve 的作用就是把 Promise 的状态置为 fullfiled，这样我们在 then 中就能捕捉到，然后执行“成功”情况的回调。

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

Promise.resolve 作为 new Promise() 的快捷方式，在进行 Promise 对象的初始化或者编写测试代码的时候都非常方便。

#### reject

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

#### then

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

#### catch

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

#### all

Promise 的 all 方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调

all 方法的效果实际上是「谁跑的慢，以谁为准执行回调」

Promise.all 接收一个 Promise 对象的数组作为参数，当这个数组里的所有 Promise 对象全部变为 resolve (或存在 reject 状态的时候)，它才会去调用 .then 方法。(如果参数中的任何一个 Promise 为 reject 的话，则整个 Promise.all 调用会立即终止，并返回一个 reject 的新的 Promise 对象。)

```js
// 仍旧使用上面定义好的 runAsync1、runAsync2、runAsync3 这三个函数，看下面的例子：

Promise.all([runAsync1(), runAsync2(), runAsync3()]).then(function (results) {
    console.log(results);
});
// 三个异步操作的并行执行的，等到它们都执行完后才会进到then里面;
// all 会把所有异步操作的结果放进一个数组中传给 then，就是上面的 results,
```

通过 all 方法，就可以并行执行多个异步操作，并且在一个回调中处理所有的返回数据。

#### race

相对的就有另一个方法「谁跑的快，以谁为准执行回调」，这就是 race 方法，这个词本来就是赛跑的意思。

Promise.all 在接收到的所有的对象 Promise 都变为 fulFilled 或者 rejected 状态之后才会继续进行后面的处理， 与之相对的是 Promise.race 只要有一个 Promise 对象进入 fulFilled 或者 rejected 状态的话，就会继续进行后面的处理。

```js
// 把上面 runAsync1 的延时改为 1 秒来看一下：

Promise.race([runAsync1(), runAsync2(), runAsync3()]).then(function (results) {
    console.log(results);
});
// 这三个异步操作同样是并行执行的。结果是 1 秒后 runAsync1 已经执行完了，此时 then 里面的就执行了。
// 在 then 里面的回调开始执行时，runAsync2() 和 runAsync3() 并没有停止，仍旧再执行。于是再过 1 秒后，输出了他们结束的标志。
```

> 在 ES6 Promises 规范中，也没有取消（中断）promise 对象执行的概念，我们必须要确保 promise 最终进入 resolve or reject 状态之一。也就是说 Promise 并不适用于 状态 可能会固定不变的处理。也有一些类库提供了对 promise 进行取消的操作。

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
