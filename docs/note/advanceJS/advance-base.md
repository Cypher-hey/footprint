## 一、惰性载入

#### 惰性函数定义
假如同一个函数被大量范围，并且这个函数内部又有许多判断来来检测函数，这样对于一个调用会浪费时间和浏览器资源，所有当第一次判断完成后，直接把这个函数改写，不在需要判断。

#### 两种实现惰性载入的方式
1. 第一种是函数在第一次调用时，对函数本身进行二次处理（`重写函数`），该函数会被覆盖为符合分支条件的函数，这样对原函数的调用就不用再经过执行的分支了

2. 第二种实现惰性载入的方式是在声明函数时就指定适当的函数。这样在第一次调用函数时就不会损失性能了，只在代码加载时会损失一点性能。

以常见的为dom节点添加事件的函数为例：
```js

// 原方法
function addEvent (type, element, fun) {
    if (element.addEventListener) {
        element.addEventListener(type, fun, false);
    }
    else if(element.attachEvent){
        element.attachEvent('on' + type, fun);
    }
    else{
        element['on' + type] = fun;
    }
}

// 采用惰性函数重写函数本身，实现惰性载入
function addEvent (type, element, fun) {
    if (element.addEventListener) {
        addEvent = function (type, element, fun) {
            element.addEventListener(type, fun, false);
        }
    }
    else if(element.attachEvent){
        addEvent = function (type, element, fun) {
            element.attachEvent('on' + type, fun);
        }
    }
    else{
        addEvent = function (type, element, fun) {
            element['on' + type] = fun;
        }
    }
    return addEvent(type, element, fun);
}

// 在声明函数时就指定适当的函数实现惰性载入
var addEvent = (function () {
    if (document.addEventListener) {
        return function (type, element, fun) {
            element.addEventListener(type, fun, false);
        }
    }
    else if (document.attachEvent) {
        return function (type, element, fun) {
            element.attachEvent('on' + type, fun);
        }
    }
    else {
        return function (type, element, fun) {
            element['on' + type] = fun;
        }
    }
})();

```

> 惰性载入函数的优点：只执行一次if分支，避免了函数每次执行时候都要执行if分支和不必要的代码，因此提升了代码性能

```js

//写一个 foo 函数返回首次调用时的 Date 对象
var foo = function() {
    var t = new Date();
    foo = function() {
        return t;
    };
    return foo();
};
```

[Lazy Function Definition Pattern](http://peter.michaux.ca/articles/lazy-function-definition-pattern)

## 二、数组去重

#### 双层循环 

1.原生

优点：兼容性好

```js
var array = [1, 1, '1', '1'];

function unique(array) {
    // res用来存储结果
    var res = [];
    for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
        for (var j = 0, resLen = res.length; j < resLen; j++ ) {
            if (array[i] === res[j]) {
                break;
            }
        }
        // 如果array[i]是唯一的，那么执行完循环，j等于resLen
        if (j === resLen) {
            res.push(array[i])
        }
    }
    return res;
}

console.log(unique(array)); // [1, "1"]
```

2.用 `indexOf` 简化内层的循环

```js
var array = [1, 1, '1'];

function unique(array) {
    var res = [];
    for (var i = 0, len = array.length; i < len; i++) {
        var current = array[i];
        //用 indexOf 简化内层的循环
        if (res.indexOf(current) === -1) {  
            res.push(current)
        }
    }
    return res;
}

console.log(unique(array));
```

3.`排序`后去重 简化内层的循环

原理：先将要去重的数组使用 sort 方法排序后，相同的值就会被排在一起，然后就可以只判断当前元素与上一个元素是否相同，相同就说明重复，不相同就添加进 res
优点：对一个已经排好序的数组去重，这种方法效率高于使用 indexOf

```js
var array = [1, 1, '1'];

function unique(array) {
    var res = [];
    var sortedArray = array.concat().sort();
    var seen;
    for (var i = 0, len = sortedArray.length; i < len; i++) {
        // 如果是第一个元素或者相邻的元素不相同
        if (!i || seen !== sortedArray[i]) {
            res.push(sortedArray[i])
        }
        seen = sortedArray[i];
    }
    return res;
}

console.log(unique(array));
```

4.`filter` 简化外层循环

原理：ES5 提供了 filter 方法，可以用来简化外层循环：
```js
var array = [1, 2, 1, 1, '1'];

function unique(array) {
    var res = array.filter(function(item, index, array){
        return array.indexOf(item) === index;
    })
    return res;
}

console.log(unique(array));
```

#### Object 键值对 判重

原理：利用一个空的 Object 对象，我们把数组的值存成 Object 的 key 值，比如 Object[value1] = true，在判断另一个值的时候，如果 Object[value2]存在的话，就说明该值是重复的。

```js
var array = [{value: 1}, {value: 1}, {value: 2}];

function unique(array) {
    var obj = {};
    return array.filter(function(item, index, array){
        // 使用item + something 区别类型；使用 JSON.stringify 将对象序列化,区别对象
        console.log(typeof item + JSON.stringify(item))
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)
    })
}

console.log(unique(array)); // [{value: 1}, {value: 2}]
```

#### ES6 去重

可以使用 Set 和 Map 数据结构

以 Set 为例，ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

```js
var array = [1, 2, 1, 1, '1'];

function unique(array) {
   return Array.from(new Set(array));
}

console.log(unique(array)); // [1, 2, "1"]

// simplify
function unique(array) {
    return [...new Set(array)];
}

// more simplify
var unique = (a) => [...new Set(a)]
```

Map:

```js
function unique (arr) {
    const seen = new Map()
    return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
}
```

#### 特殊类型比较

```js
var str1 = '1';
var str2 = new String('1');

console.log(str1 == str2); // true
console.log(str1 === str2); // false

console.log(null == null); // true
console.log(null === null); // true

console.log(undefined == undefined); // true
console.log(undefined === undefined); // true

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false

console.log(/a/ == /a/); // false
console.log(/a/ === /a/); // false

console.log({} == {}); // false
console.log({} === {}); // false
```

## 三、类型判断

#### typeof

引用《JavaScript权威指南》中对 typeof 的介绍：
>typeof 是一元`操作符`，放在其单个操作数的前面，操作数可以是任意类型。返回值为表示操作数类型的一个字符串。

在 ES6 前，JavaScript 共六种数据类型，分别是：

Undefined、`Null`、Boolean、Number、String、Object

然而当我们使用 typeof 对这些数据类型的值进行操作的时候，返回的结果却不是一一对应，分别是：

undefined、`object`、boolean、number、string、object

注意以上都是小写的字符串。Null 和 Object 类型都返回了 object 字符串。

尽管不能一一对应，但是 typeof 却能检测出函数类型：

```js
function a() {}

console.log(typeof a); // function
```

所以 typeof 能检测出六种类型的值，但是，除此之外 Object 下还有很多细分的类型呐，如 Array、Function、Date、RegExp、Error 等。

用 typeof 去检测这些类型:
```js
var date = new Date();
var error = new Error();
var arr = Array();
console.log(typeof date); // object
console.log(typeof error); // object
console.log(typeof arr); // object
```

#### Obejct.prototype.toString

[ES5 规范地址](https://es5.github.io/#x15.2.4.2)
>When the toString method is called, the following steps are taken:

>1. If the this value is undefined, return "[object Undefined]".
>2. If the this value is null, return "[object Null]".
>3. Let O be the result of calling ToObject passing the this value as the argument.
>4. Let class be the value of the [[Class]] internal property of O.
>5. Return the String value that is the result of concatenating the three Strings "[object ", class, and "]".

通过规范，我们至少知道了调用 Object.prototype.toString 会返回一个由 "[object " 和 class 和 "]" 组成的字符串，而 class 是要判断的对象的内部属性。

```js
// 可以看到这个 class 值就是识别对象类型的关键！

console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
console.log(Object.prototype.toString.call(null)) // [object Null]

var date = new Date();
console.log(Object.prototype.toString.call(date)) // [object Date]
```

可以用 Object.prototype.toString 方法识别出至少11种类型：
```js
// 以下是11种：
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]

function checkType() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(Object.prototype.toString.call(arguments[i]))
    }
}

checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func)

// 除了以上 11 种之外，还有：
console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]

// 除了以上 13 种之外，还有：
function a() {
    console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
}
a();
```

利用Object.prototype.toString，写个 type 函数识别各种类型的值：
```js
// 
var class2type = {};

// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
})

function type(obj) {
    //  考虑到IE6 中，null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]的兼容性
    // obj == null 为 true
    if (obj == null) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
}
```

#### plainObject

plainObject 来自于 jQuery，可以翻译成纯粹的对象，所谓"纯粹的对象"，就是该对象是通过 "{}" 或 "new Object" 创建的，该对象含有零个或者多个键值对。

之所以要判断是不是 plainObject，是为了跟其他的 JavaScript对象如 null，数组，宿主对象（documents）等作区分，因为这些用 typeof 都会返回object。

jQuery提供了 isPlainObject 方法进行判断:

```js
function Person(name) {
    this.name = name;
}

console.log($.isPlainObject({})) // true

console.log($.isPlainObject(new Object)) // true

console.log($.isPlainObject(Object.create(null))); // true

console.log($.isPlainObject(Object.assign({a: 1}, {b: 2}))); // true

console.log($.isPlainObject(new Person('yayu'))); // false

console.log($.isPlainObject(Object.create({}))); // false
```

#### EmptyObject

Query提供了 isEmptyObject 方法来判断是否是空对象，代码简单:

```js
function isEmptyObject( obj ) {

        var name;

        for ( name in obj ) {
            return false;
        }

        return true;
}
```

isEmptyObject实际上判断的并不仅仅是空对象:
```js
console.log(isEmptyObject({})); // true
console.log(isEmptyObject([])); // true
console.log(isEmptyObject(null)); // true
console.log(isEmptyObject(undefined)); // true
console.log(isEmptyObject(1)); // true
console.log(isEmptyObject('')); // true
console.log(isEmptyObject(true)); // true
```

#### Window对象

Window 对象作为客户端 JavaScript 的全局对象，它有一个 window 属性指向自身,可以利用这个特性判断是否是 Window 对象。

```js
function isWindow( obj ) {
    return obj != null && obj === obj.window;
}
```

#### isArrayLike

jQuery 实现的 isArrayLike，数组和类数组都会返回 true。

```js
function isArrayLike(obj) {

    // obj 必须有 length属性
    var length = !!obj && "length" in obj && obj.length;
    var typeRes = type(obj);

    // 排除掉函数和 Window 对象
    if (typeRes === "function" || isWindow(obj)) {
        return false;
    }

    return typeRes === "array" || length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in obj;
}
```

所以如果 isArrayLike 返回true，至少要满足三个条件之一：

1. 是数组
2. 长度为 0
3. lengths 属性是大于 0 的数字类型，并且obj[length - 1]必须存在

#### isElement

isElement 判断是不是 DOM 元素:
```js
isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
};
```

## 四、深浅拷贝

浅拷贝是一种复制引用的拷贝方法，如果数组元素是基本类型，就会拷贝一份，互不影响，而如果是对象或者数组，就会只拷贝对象和数组的引用，这样我们无论在新旧数组进行了修改，两者都会发生变化。

深拷贝就是指完全的拷贝一个对象，即使嵌套了对象，两者也相互分离，修改一个对象的属性，也不会影响另一个。

#### 数组的浅拷贝

如果是数组，我们可以利用数组的一些方法比如：slice (浅拷贝)、concat (浅拷贝)返回一个新数组的特性来实现拷贝，比如：

```js
// concat 浅拷贝成功
var arr = ['old', 1, true, null, undefined];

var new_arr = arr.concat();

new_arr[0] = 'new';

console.log(arr) // ["old", 1, true, null, undefined]
console.log(new_arr) // ["new", 1, true, null, undefined]

// slice 浅拷贝成功
var new_arr = arr.slice();

// 数组嵌套了对象或者数组 浅拷贝失败
var arr = [{old: 'old'}, ['old']];

var new_arr = arr.concat();

arr[0].old = 'new';
arr[1][0] = 'new';

console.log(arr) // [{old: 'new'}, ['new']]
console.log(new_arr) // [{old: 'new'}, ['new']]
```

#### 数组的深拷贝

简单粗暴 ：JSON.parse( JSON.stringify(arr) )

`适用于数组还适用于对象, 但不能用来拷贝函数`

```js
var arr = ['old', 1, true, ['old1', 'old2'], {old: 1}]

var new_arr = JSON.parse( JSON.stringify(arr) );

console.log(new_arr);
```

#### 浅拷贝的实现

concat、slice、JSON.stringify 都算是技巧类,可以根据实际项目情况选择使用

思考下如何实现一个对象或者数组的浅拷贝:

```js
// 遍历对象，然后把属性和属性值都放在一个新的对象

var shallowCopy = function(obj) {
    // 只拷贝对象
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是对象
    var newObj = obj instanceof Array ? [] : {};
    // 遍历obj，并且判断是obj的属性才拷贝
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
```

#### 深拷贝的实现

使用深拷贝会完全的克隆一个新对象，不会产生副作用，但是深拷贝因为使用递归，性能会不如浅拷贝，在开发中，还是要根据实际情况进行选择。

```js
// 在拷贝的时候判断一下属性值的类型，如果是对象，递归调用深拷贝函数

var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}
```

#### jQuery.extend

引用 jQuery 官网：
>Merge the contents of two or more objects together into the first object.

翻译过来就是，合并两个或者更多的对象的内容到第一个对象中。

extend (浅拷贝)的用法：
```js
jQuery.extend( target [, object1 ] [, objectN ] )
```
第一个参数 target，表示要拓展的目标，可以称它为目标对象。
后面的参数，都传入对象，内容都会复制到目标对象中，可以称它们为待复制对象

```js
var obj1 = {
    a: 1,
    b: { b1: 1, b2: 2 }
};

var obj2 = {
    b: { b1: 3, b3: 4 },
    c: 3
};

var obj3 = {
    d: 4
}

console.log($.extend(obj1, obj2, obj3));

// {
//    a: 1,
//    b: { b1: 3, b3: 4 },
//    c: 3,
//    d: 4
// }
```

当两个对象出现相同字段的时候，后者会覆盖前者，而不会进行深层次的覆盖。

实现：
```js
function extend() {
    var name, options, copy;
    var length = arguments.length;
    var i = 1;
    var target = arguments[0];

    for (; i < length; i++) {
        options = arguments[i];
        if (options != null) {
            for (name in options) {
                copy = options[name];
                if (copy !== undefined){
                    target[name] = copy;
                }
            }
        }
    }

    return target;
};
```

extend (深拷贝)的用法：
```js
jQuery.extend( [deep], target, object1 [, objectN ] )
```
函数的第一个参数可以传一个布尔值，如果为 true，我们就会进行深拷贝，false 依然当做浅拷贝，这个时候，target 就往后移动到第二个参数。



