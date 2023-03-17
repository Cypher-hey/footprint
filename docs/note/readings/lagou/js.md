## Array

### API 整理

#### 改变自身的方法:

基于 ES6，会改变自身值的方法一共有 9 个，分别为 pop、push、reverse、shift、sort、splice、unshift，以及两个 ES6 新增的方法 copyWithin 和 fill。

```js
// pop方法
var array = ['cat', 'dog', 'cow', 'chicken', 'mouse'];
var item = array.pop();
console.log(array); // ["cat", "dog", "cow", "chicken"]
console.log(item); // mouse
// push方法
var array = ['football', 'basketball', 'badminton'];
var i = array.push('golfball');
console.log(array);
// ["football", "basketball", "badminton", "golfball"]
console.log(i); // 4
// reverse方法
var array = [1, 2, 3, 4, 5];
var array2 = array.reverse();
console.log(array); // [5,4,3,2,1]
console.log(array2 === array); // true
// shift方法
var array = [1, 2, 3, 4, 5];
var item = array.shift();
console.log(array); // [2,3,4,5]
console.log(item); // 1
// unshift方法
var array = ['red', 'green', 'blue'];
var length = array.unshift('yellow');
console.log(array); // ["yellow", "red", "green", "blue"]
console.log(length); // 4
// sort方法
var array = ['apple', 'Boy', 'Cat', 'dog'];
var array2 = array.sort();
console.log(array); // ["Boy", "Cat", "apple", "dog"]
console.log(array2 == array); // true
// splice方法
var array = ['apple', 'boy'];
var splices = array.splice(1, 1);
console.log(array); // ["apple"]
console.log(splices); // ["boy"]
// copyWithin方法
var array = [1, 2, 3, 4, 5];
var array2 = array.copyWithin(0, 3);
console.log(array === array2, array2); // true [4, 5, 3, 4, 5]
// fill方法
var array = [1, 2, 3, 4, 5];
var array2 = array.fill(10, 0, 3);
console.log(array === array2, array2);
// true [10, 10, 10, 4, 5], 可见数组区间[0,3]的元素全部替换为10
```

#### 不改变自身的方法

基于 ES7，不会改变自身的方法也有 9 个，分别为 concat、join、slice、toString、toLocaleString、indexOf、lastIndexOf、未形成标准的 toSource，以及 ES7 新增的方法 includes。

```js
// concat方法
var array = [1, 2, 3];
var array2 = array.concat(4, [5, 6], [7, 8, 9]);
console.log(array2); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(array); // [1, 2, 3], 可见原数组并未被修改
// join方法
var array = ['We', 'are', 'Chinese'];
console.log(array.join()); // "We,are,Chinese"
console.log(array.join('+')); // "We+are+Chinese"
// slice方法
var array = ['one', 'two', 'three', 'four', 'five'];
console.log(array.slice()); // ["one", "two", "three","four", "five"]
console.log(array.slice(2, 3)); // ["three"]
// toString方法
var array = ['Jan', 'Feb', 'Mar', 'Apr'];
var str = array.toString();
console.log(str); // Jan,Feb,Mar,Apr
// tolocalString方法
var array = [{name: 'zz'}, 123, 'abc', new Date()];
var str = array.toLocaleString();
console.log(str); // [object Object],123,abc,2016/1/5 下午1:06:23
// indexOf方法
var array = ['abc', 'def', 'ghi', '123'];
console.log(array.indexOf('def')); // 1
// includes方法
var array = [-0, 1, 2];
console.log(array.includes(+0)); // true
console.log(array.includes(1)); // true
var array = [NaN];
console.log(array.includes(NaN)); // true
```

#### 数组遍历的方法

基于 ES6，不会改变自身的遍历方法一共有 12 个，分别为 forEach、every、some、filter、map、reduce、reduceRight，以及 ES6 新增的方法 entries、find、findIndex、keys、values。

```js
// forEach方法
var array = [1, 3, 5];
var obj = {name: 'cc'};
var sReturn = array.forEach(function (value, index, array) {
    array[index] = value;
    console.log(this.name); // cc被打印了三次, this指向obj
}, obj);
console.log(array); // [1, 3, 5]
console.log(sReturn); // undefined, 可见返回值为undefined
// every方法
var o = {0: 10, 1: 8, 2: 25, length: 3};
var bool = Array.prototype.every.call(
    o,
    function (value, index, obj) {
        return value >= 8;
    },
    o
);
console.log(bool); // true
// some方法
var array = [18, 9, 10, 35, 80];
var isExist = array.some(function (value, index, array) {
    return value > 20;
});
console.log(isExist); // true
// map 方法
var array = [18, 9, 10, 35, 80];
array.map((item) => item + 1);
console.log(array); // [19, 10, 11, 36, 81]
// filter 方法
var array = [18, 9, 10, 35, 80];
var array2 = array.filter(function (value, index, array) {
    return value > 20;
});
console.log(array2); // [35, 80]
// reduce方法
var array = [1, 2, 3, 4];
var s = array.reduce(function (previousValue, value, index, array) {
    return previousValue * value;
}, 1);
console.log(s); // 24
// ES6写法更加简洁
array.reduce((p, v) => p * v); // 24
// reduceRight方法 (和reduce的区别就是从后往前累计)
var array = [1, 2, 3, 4];
array.reduceRight((p, v) => p * v); // 24
// entries方法
var array = ['a', 'b', 'c'];
var iterator = array.entries();
console.log(iterator.next().value); // [0, "a"]
console.log(iterator.next().value); // [1, "b"]
console.log(iterator.next().value); // [2, "c"]
console.log(iterator.next().value); // undefined, 迭代器处于数组末尾时, 再迭代就会返回undefined
// find & findIndex方法
var array = [1, 3, 5, 7, 8, 9, 10];
function f(value, index, array) {
    return value % 2 == 0; // 返回偶数
}
function f2(value, index, array) {
    return value > 20; // 返回大于20的数
}
console.log(array.find(f)); // 8
console.log(array.find(f2)); // undefined
console.log(array.findIndex(f)); // 4
console.log(array.findIndex(f2)); // -1
// keys方法
[...Array(10).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[...new Array(10).keys()]; // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// values方法
var array = ['abc', 'xyz'];
var iterator = array.values();
console.log(iterator.next().value); //abc
console.log(iterator.next().value); //xyz
```

### 类数组 array-like

在 JavaScript 中有哪些情况下的对象是类数组呢？主要有以下几种：

-   函数里面的参数对象 arguments；

-   用 getElementsByTagName/ClassName/Name 获得的 HTMLCollection；

-   用 querySelector 获得的 NodeList。

#### arguments

在函数中使用的 arguments，它的对象只定义在函数体中，包括了函数的参数和其他属性。

```js
function foo(name, age, sex) {
    console.log(arguments);
    console.log(typeof arguments);
    console.log(Object.prototype.toString.call(arguments));
}
foo('jack', '18', 'male');

// Arguments(3) ["jack", "18", "male", callee: ƒ, Symbol(Symbol.iterator): ƒ]
// 0: "jack"
// 1: "18"
// 2: "male"
// callee: ƒ foo(name, age, sex)
// length: 3
// Symbol(Symbol.iterator): ƒ values()
// __proto__: Object

// object

// [object Arguments]
```

#### HTMLCollection

HTMLCollection 简单来说是 HTML DOM 对象的一个接口，这个接口包含了获取到的 DOM 元素集合，返回的类型是类数组对象，如果用 typeof 来判断的话，它返回的是 'object'。它是及时更新的，当文档中的 DOM 变化时，它也会随之变化。

#### NodeList

NodeList 对象是节点的集合，通常是由 querySlector 返回的。NodeList 不是一个数组，也是一种类数组。虽然 NodeList 不是一个数组，但是可以使用 for...of 来迭代。在一些情况下，NodeList 是一个实时集合，也就是说，如果文档中的节点树发生变化，NodeList 也会随之变化。

### 扁平化处理 flatten

数组的扁平化其实就是将一个嵌套多层的数组 array（嵌套可以是任何层数）转换为只有一层的数组。

#### 普通遍历递归

```js
// 方法1 递归实现，返回新数组
var a = [1, [2, [3, 4, 5]]];
function flatten(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}
flatten(a); //  [1, 2, 3, 4，5]
```

#### reduce 函数迭代

```js
// 方法2 reduce 进行累加操作
var arr = [1, [2, [3, 4]]];
function flatten(arr) {
    return arr.reduce(function (prev, next) {
        return prev.concat(Array.isArray(next) ? flatten(next) : next);
    }, []);
}
console.log(flatten(arr)); //  [1, 2, 3, 4，5]
```

#### 扩展运算符 && some

```js
// 方法3 筛选出数组项进行连接
var arr = [1, [2, [3, 4]]];
function flatten(arr) {
    while (arr.some((item) => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
console.log(flatten(arr)); //  [1, 2, 3, 4，5]
```

#### split && toString

```js
// 方法4 底层toString转字符串再切分为数组
// Array.prototype.toString 会在每一项中中递归作用
var arr = [1, [2, [3, 4]]];
function flatten(arr) {
    return arr
        .toString()
        .split(',')
        .map((item) => Number(item));
}
console.log(flatten(arr)); //  [1, 2, 3, 4]
```

#### ES6 中的 flat

```js
// 方法5
// flat(depth)
var arr = [1, [2, [3, 4]]];
function flatten(arr) {
    return arr.flat(Infinity);
}
console.log(flatten(arr)); //  [1, 2, 3, 4，5]
```

#### 正则 && JSON 方法

```js
// 方法 6 JSON 方法转成字符串转回过程中正则处理
let arr = [1, [2, [3, [4, 5]]], 6];
function flatten(arr) {
    // let str = JSON.stringify(arr);
    // str = str.replace(/(\[|\])/g, '');
    // str = '[' + str + ']';
    // return JSON.parse(str);
    return JSON.parse('[' + JSON.stringify(arr).replace(/(\[|\])/g, '') + ']');
}
console.log(flatten(arr)); //  [1, 2, 3, 4，5]
```

### 数组排序

<img src="/docs/asset/images/algorithm_complexity_chart.png" width="800" />

> 将代码的时间复杂度尽可能的维持在 O(nlogn) 以下

-   比较类排序：通过比较来决定元素间的相对次序，其时间复杂度不能突破 O(nlogn)，因此也称为非线性时间比较类排序。

-   非比较类排序：不通过比较来决定元素间的相对次序，它可以突破基于比较排序的时间下界，以线性时间运行，因此也称为线性时间非比较类排序。

<img src="/docs/asset/images/sort_classification.png" width="600" />

#### 冒泡排序

冒泡排序是一次比较两个元素，如果顺序是错误的就把它们交换过来。走访数列的工作会重复地进行，直到不需要再交换，也就是说该数列已经排序完成。

```js
var a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221];
function bubbleSort(array) {
    const len = array.length;
    if (len < 2) return array;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (array[j] > array[i]) {
                const temp = array[j];
                array[j] = array[i];
                array[i] = temp;
            }
        }
    }
    return array;
}
bubbleSort(a); // [1, 1, 3, 3, 6, 6, 23, 34, 76, 221, 222, 456]
```

#### 快速排序

快速排序的基本思想是通过一趟排序，将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可以分别对这两部分记录继续进行排序，以达到整个序列有序。

```js
var a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221];
var quickSort = function (arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
};
quickSort(a); //  [1, 1, 3, 3, 6, 6, 23, 34, 76, 221, 222, 456]
```

最主要的思路是从数列中挑出一个元素，称为 “基准”（pivot）；然后重新排序数列，所有元素比基准值小的摆放在基准前面、比基准值大的摆在基准的后面；在这个区分搞定之后，该基准就处于数列的中间位置；然后把小于基准值元素的子数列（left）和大于基准值元素的子数列（right）递归地调用 quick 方法排序完成，这就是快排的思路。

#### 插入排序

插入排序算法描述的是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入，从而达到排序的效果。

```js
var a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221];
function insertSort(array) {
    const len = array.length;
    let current;
    let prev;
    for (let i = 1; i < len; i++) {
        current = array[i];
        prev = i - 1;
        while (prev >= 0 && array[prev] > current) {
            array[prev + 1] = array[prev];
            prev--;
        }
        array[prev + 1] = current;
    }
    return array;
}
insertSort(a); // [1, 1, 3, 3, 6, 6, 23, 34, 76, 221, 222, 456]
```
