#### 闭包的理解

使用闭包主要是为了设计私有的方法和变量。

闭包的优点是可以避免全局变量的污染，

缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。

闭包有三个特性:

1. 函数嵌套函数
2. 函数内部可以引用外部的参数和变量
3. 参数和变量不会被垃圾回收机制回收

#### Javascript 垃圾回收方法

`标记清除（mark and sweep）`

这是 JavaScript 最常见的垃圾回收方式，当变量进入执行环境的时候，比如函数中声明一个变量，垃圾回收器将其标记为“进入环境”，当变量离开环境的时候（函数执行结束）将其标记为“离开环境”。

垃圾回收器会在运行的时候给存储在内存中的所有变量加上标记，然后去掉环境中的变量以及被环境中变量所引用的变量（闭包），在这些完成之后仍存在标记的就是要删除的变量了

`引用计数(reference counting)`

在低版本 IE 中经常会出现内存泄露，很多时候就是因为其采用引用计数方式进行垃圾回收。引用计数的策略是跟踪记录每个值被使用的次数，当声明了一个 变量并将一个引用类型赋值给该变量的时候这个值的引用次数就加 1，如果该变量的值变成了另外一个，则这个值得引用次数减 1，当这个值的引用次数变为 0 的时 候，说明没有变量在使用，这个值没法被访问了，因此可以将其占用的空间回收，这样垃圾回收器会在运行的时候清理掉引用次数为 0 的值占用的空间。

在 IE 中虽然 JavaScript 对象通过标记清除的方式进行垃圾回收，但 BOM 与 DOM 对象却是通过引用计数回收垃圾的，也就是说只要涉及 BOM 及 DOM 就会出现循环引用问题。

## Array.isArray or instanceof Array

[ref](https://stackoverflow.com/questions/22289727/difference-between-using-array-isarray-and-instanceof-array)

1. What is the difference between these two solutions?

[isArray](http://ecma-international.org/ecma-262/5.1/#sec-15.4.3.2) is an ES5 method so not supported by older browsers, but it reliably determines if an object is an Array.

[instanceof](http://ecma-international.org/ecma-262/5.1/#sec-11.8.6) only checks if Array.prototype is on an object's [[Prototype]] chain. It fails when checking arrays across frames since the Array constructor used for the instance will likely be different to the one used for the test.

2. Which of these two is the preferred solution?

"Preferred" assumes some criterion （判断的）准则 for selection. Generally, the preferred method is something like:

```js
if (Object.prototype.toString.call(obj) == '[object Array]')
```

which suits ES3 browsers and works across frames. If only ES5 browsers are in consideration, isArray is likely OK.

3. Which has a faster process time?

Largely irrelevant, since the processing time for both is negligible. `Far more important to select the one that is reliable`. An Array.isArray method can be added to browsers that don't have it built–in using:

```js
if (!Array.isArray) {
    Array.isArray = function (obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
    };
}
```

[toStringTag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag)

According to this jsperf, instanceof Array is faster than Array.isArray(). Which makes sense, because Array.isArray() performs more robust checking and therefore takes a slight performance hit.

[jsperf](https://jsperf.com/array-isarray-vs-instanceof-array)

Array.isArray() in some browsers is now significantly faster than instanceof Array

#### 模块化开发

一个模块是实现一个特定功能的一组方法。在最开始的时候，js 只实现一些简单的功能，所以并没有模块的概念 ，但随着程序越来越复杂，代码的模块化开发变得越来越重要。

由于函数具有独立作用域的特点，最原始的写法是使用函数来作为模块，几个函数作为一个模块，但是这种方式容易造成全局变量的污染，并且模块间没有联系。

后面提出了对象写法，通过将函数作为一个对象的方法来实现，这样解决了直接使用函数作为模块的一些缺点，但是这种办法会暴露所有的所有的模块成员，外部代码可以修改内部属性的值。

现在最常用的是立即执行函数的写法，通过利用闭包来实现模块私有作用域的建立，同时不会对全局作用域造成污染。

js 中现在比较成熟的有四种模块加载方案：

-   第一种是 CommonJS 方案，它通过 require 来引入模块，通过 module.exports 定义模块的输出接口。这种模块加载方案是服务器端的解决方案，它是以同步的方式来引入模块的，因为在服务端文件都存储在本地磁盘，所以读取非常快，所以以同步的方式加载没有问题。但如果是在浏览器端，由于模块的加载是使用网络请求，因此使用异步加载的方式更加合适。

-   第二种是 AMD 方案，这种方案采用异步加载的方式来加载模块，模块的加载不影响后面语句的执行，所有依赖这个模块的语句都定义在一个回调函数里，等到加载完成后再执行回调函数。require.js 实现了 AMD 规范。

-   第三种是 CMD 方案，这种方案和 AMD 方案都是为了解决异步模块加载的问题，sea.js 实现了 CMD 规范。它和 require.js 的区别在于模块定义时对依赖的处理不同和对依赖模块的执行时机的处理不同。

-   第四种方案是 ES6 提出的方案，使用 import 和 export 的形式来导入导出模块。

AMD 和 CMD 规范的区别？

1. 第一个方面是在模块定义时对依赖的处理不同。AMD 推崇依赖前置，在定义模块的时候就要声明其依赖的

2. 第二个方面是对依赖模块的执行时机处理不同。首先 AMD 和 CMD 对于模块的加载方式都是异步加载

ES6 模块与 CommonJS 模块、AMD、CMD 的差异

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。

2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。CommonJS 模块就是对象，即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

#### Object 与 Map

1. 内存占用

Object 和 Map 的工程级实现在不同浏览器间存在明显差异，但存储单个键/值对所占用的内存数量都会随键的数量线性增加。批量添加或删除键/值对则取决于各浏览器对该类型内存分配的工程实现。

不同浏览器的情况不同，但给定固定大小的内存，Map 大约可以比 Object 多存储 50%的键/值对。

2. 插入性能

向 Object 和 Map 中插入新键/值对的消耗大致相当，不过插入 Map 在所有浏览器中一般会稍微快一点儿。对这两个类型来说，插入速度并不会随着键/值对数量而线性增加。如果代码涉及大量插入操作，那么显然 Map 的性能更佳。

3. 查找速度

与插入不同，从大型 Object 和 Map 中查找键/值对的性能差异极小，但如果只包含少量键/值对，则 Object 有时候速度更快。在把 Object 当成数组使用的情况下（比如使用连续整数作为属性），浏览器引擎可以进行优化，在内存中使用更高效的布局。这对 Map 来说是不可能的。对这两个类型而言，

查找速度不会随着键/值对数量增加而线性增加。如果代码涉及大量查找操作，那么某些情况下可能选择 Object 更好一些。

4. 删除性能

使用 delete 删除 Object 属性的性能一直以来饱受诟病，目前在很多浏览器中仍然如此。为此，出现了一些伪删除对象属性的操作，包括把属性值设置为 undefined 或 null。但很多时候，这都是一种讨厌的或不适宜的折中。而对大多数浏览器引擎来说，Map 的 delete()操作都比插入和查找更快。

如果代码涉及大量删除操作，那么毫无疑问应该选择 Map
