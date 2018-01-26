## 一、创建数组

#### 使用 new 操作符调用构造函数

```js
var arr = new Array(20)				// 创建了一个包含20项的数组
var arr = new Array('a', 'b', 'c')	// 创建了包含字符串 a b c 的三项数组
```

#### 省略 new 操作符

```js
var arr = Array(20)                 // 仅Array比较特别，可以省略
var arr = Array('a', 'b', 'c')
```
		
#### 数组字面量

```js
var arr = []                        // `字面量方式创建最好`
var arr = ['a', 'b', 'c']
```

#### 【ES6】、Array.of()

* 语法：Array.of(element0[, element1[, ...[, elementN]]])		
* 描述：用于创建数组，用法和 new Array() 一样。弥补 Array() 构造函数的不足（即参数不同，行为不同），Array.of() 的`行为始终一致，将传入的值作为数组的项，产生数组`
* 参数：任意数量任意值
* 返回值：创建的数组

#### 【ES6】、Array.from(obj, func, context)

* 描述：用于将 `类数组对象(拥有length属性的对象) 和 可遍历对象(部署iterable接口的对象，包括 Set/Map) 转为真正的数组`
* 参数：
    * `{Object} obj` 要转为数组的对象
    * `{Function} func` 一个函数，功能类似于数组的map方法，对每一个对象属性执行该函数，并返回由该函数的返回值组成的数组
    * `{Object} context` 第二个函数参数的执行环境(this指向)
* 返回值：生成的数组

## 二、数组检测

#### 使用 instanceof 操作符

```js
if(value instanceof Array){
    // 对数组执行某些操作
}
```
		
#### 使用 Array.isArray() 方法

```js
if(Array.isArray(value)){
    // 对数组执行某些操作
}
```
		
#### 使用 Object.prototype.toString.call()

```js
if(Object.prototype.toString.call(obj) === '[object Array]'){
    // 对数组执行某些操作
}
```

## 三、数组方法

#### 转换方法

###### toString()
* 描述：数组对象重载了对象的toString方法，返回数组元素以,连接的字符串
* 参数：
* 返回值：
    * `{String}` arrayObject 的字符串表示
* 是否改变原数组：否
```js
var months = ['Jan', 'Feb', 'Mar', 'Apr'];
months.toString(); // "Jan,Feb,Mar,Apr"
```

###### toLocalString()
* 描述：把数组使用地区特定的分隔符把生成的字符串连接起来，形成一个本地字符串。
* 参数：
* 返回值：
    * `{String}` arrayObject 的本地字符串表示
* 是否改变原数组：否
```js
var number = 1337;
var date = new Date();
var myArr = [number, date, 'foo'];
var str = myArr.toLocaleString(); 
console.log(str);  
// logs '1337,6.12.2013 19:37:35,foo'
//if run in a German (de-DE) locale with timezone Europe/Berlin
```

###### valueOf()
* 描述：继承于Object的该方法,返回 Array 对象的原始值。
* 参数：
* 返回值：
    * `{Array}` 原始数组
* 是否改变原数组：否
```js
var fruits = ["Banana", "Orange", "Apple", "Mango"];
var v=fruits.valueOf();
```

###### join()
* 描述：以一种连接方式连接数组（类数组对象）中所有元素到一个字符串上，默认以 `,` 连接
* 参数：连接符Separator, 默认 `,` 连接
* 返回值：
    * `{String}` 连接后的字符串
* 是否改变原数组：否
```js
var a = ['Wind', 'Rain', 'Fire'];
a.join();    // 'Wind,Rain,Fire'
a.join('-'); // 'Wind-Rain-Fire'
```

#### 栈/队列 方法

<p class="tip">【注意：栈/队列的这四个方法都会对原数组产生影响】</p>

###### push()
* 描述：向数组的`尾部追加`项，并`返回数组长度`
* 参数：n多个值，会依次推入数组尾部
* 返回值：
    * `{Number}` 数组长度
* 是否改变原数组：是
```js
var numbers = [1, 2, 3];
numbers.push(4);
console.log(numbers); // [1, 2, 3, 4]
numbers.push(5, 6, 7);
console.log(numbers); // [1, 2, 3, 4, 5, 6, 7]
```

###### pop()
* 描述：移除数组`最后一项`，并返回该项
* 参数：无
* 返回值：返回移除项
* 是否改变原数组：是
```js
var a = [1, 2, 3];
a.pop();
console.log(a); // [1, 2]
```

###### shift()
* 描述：移除数组`第一项`，并返回该项
* 参数：无
* 返回值：返回移除项
* 是否改变原数组：是
```js
var a = [1, 2, 3];
var b = a.shift();
console.log(a); // [2, 3]
console.log(b); // 1
```

###### unshift()
* 描述：在数组`最前端`添加项，并`返回数组长度`
* 参数：n多个值，会依次添加到数组前端
* 返回值：
    * `{Number}` 数组长度
* 是否改变原数组：是
```js
var a = [1, 2, 3];
a.unshift(4, 5);
console.log(a); // [4, 5, 1, 2, 3]
```

#### 排序方法

###### reverse()
* 描述：反转数组项的顺序
* 参数：无
* 返回值：修改后的数组
* 是否改变原数组：是
```
var a = ['one', 'two', 'three'];
a.reverse(); 
console.log(a); // ['three', 'two', 'one']
```

###### sort()
* 描述：对数组进行排序，默认情况下，按照升序排序，sort方法调用每个数组项的 toString() 方法，进行字符串比较
* 参数：【可选】函数
    * 
    ```js
    function compare(a, b) {
      return a - b;
    }
    ```
    * `增序返回正数`，逆序返回负数，并列返回0
* 返回值：排序后的数组
* 是否改变原数组：是	

```js
var fruit = ['cherries', 'apples', 'bananas'];
fruit.sort(); // ['apples', 'bananas', 'cherries']

var scores = [1, 10, 21, 2]; 
scores.sort(); // [1, 10, 2, 21]
// Note that 10 comes before 2,
// because '10' comes before '2' in Unicode code point order.

var things = ['word', 'Word', '1 Word', '2 Words'];
things.sort(); // ['1 Word', '2 Words', 'Word', 'word']
// In Unicode, numbers come before upper case letters,
// which come before lower case letters.
```

#### 操作方法

###### concat()
* 描述：基于当前数组的所有项创建一个`新数组`
* 参数：【可选】任意数量的任意值
* 返回值：返回新数组
* 是否改变原数组：否
```js
var arr1 = ['a', 'b', 'c'];
var arr2 = ['d', 'e', 'f'];
var arr3 = arr1.concat(arr2);
// arr3 is a new array [ "a", "b", "c", "d", "e", "f" ]
```

###### slice()
* 语法：arr.slice(begin, end)
* 描述：基于当前数组一或多个项创建`新数组`（截取数组片段）
* 参数：接收一或两个参数，分别是返回项的起始 start 和结束位置 end
* 返回值：
    * 只传起始位置 start（即一个参数）
      * 返回：从起始位置到数组末尾的项组成的数组
    * 传递两个参数 start && end
      * 返回：从起始位置到结束位置(不包含结束位置)的项组成的数组
    * 传递负数
      * 返回：会用`数组长度加上该负数来确定相应的位置`，并按照1、2的规则返回新数组
    * 起始位置大于结束位置
      * 返回：空数组
* 是否`改变原数组：否`
```js
var a = ['zero', 'one', 'two', 'three'];
var sliced = a.slice(1, 3);
console.log(a);      // ['zero', 'one', 'two', 'three']
console.log(sliced); // ['one', 'two']
```

###### splice()
* 描述：对数组的项进行 `删除、插入、替换` 等操作，功能十分强大
* 参数：
    * 第一个参数：要删除的第一项的位置 `array.splice(start)`
    * 第二个参数：要删除的项数 `array.splice(start, deleteCount)`
    * 第三个参数（第四个、第五个......）：插入的项 `array.splice(start, deleteCount, item1, item2, ...)`
* 返回值：由删除的项组成的数组
* 是否`改变原数组：是`

```js
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];

myFish.splice(2, 0, 'drum'); // insert 'drum' at 2-index position
// myFish is ["angel", "clown", "drum", "mandarin", "sturgeon"]

myFish.splice(2, 1); // remove 1 item at 2-index position (that is, "drum")
// myFish is ["angel", "clown", "mandarin", "sturgeon"]
```

###### 【ES6】copyWithin()
* 描述：在数组内部，将指定位置的成员拷贝到其他位置（会覆盖原有成员）
* 参数：
    * 第一个参数：要拷贝的目标位置(target)  `arr.copyWithin(target)`
    * 第二个参数：从该位置读取数据，默认是0，负值表示倒数  `(target, start)`
    * 第三个参数：读取到该位置结束，默认是 数组的长度，不包含该位置，负值表示倒数  `arr.copyWithin(target, start, end)`
* 返回值：修改后的数组
* 是否`改变原数组：是`
```js
['alpha', 'bravo', 'charlie', 'delta'].copyWithin(2, 0);
// results in ["alpha", "bravo", "alpha", "bravo"]
```

###### 【ES6】fill()
* 描述：使用给定值，填充数组
* 参数：
    * 第一个参数：填充的值
    * 第二个参数：填充的起始位置
    * 第三个参数：填充的结束位置(不包含该位置)  `arr.fill(value, start, end)`
* 返回值：修改后的数组
* 是否`改变原数组：是`
```js
var numbers = [1, 2, 3]
numbers.fill(1);
// results in [1, 1, 1]
```

#### 查找/位置方法

###### indexOf()
```js
var a = [2, 9, 9]; 
a.indexOf(2); // 0 
a.indexOf(7); // -1
if (a.indexOf(7) === -1) {
  // element doesn't exist in array
}
```
###### lastIndexOf()
* 描述：在数组中查找某一项的位置 `indexOf() 从前往后查找`， lastIndexOf() 从后往前查找
* 参数：
    * 第一个参数：要查找的项  `arr.indexOf(searchElement[, fromIndex])`
	* 第二个参数：查找起点位置索引
* 返回值：返回查找项在数组中的位置，未找到返回-1
<p class="tip">注意：在查找过程中使用全等操作符(===)</p>

###### 【ES6】find()
* 描述：用于`找到第一个符合条件的数组成员`
* 参数：一个`函数`，函数的参数：1、项。2、项的索引。3、数组对象本身  `arr.find(callback[, thisArg])`
* 返回值：如果有符合添加的项，`返回该项的值`，如果没有找到符合条件的项，返回 `undefined`
```js
function isBigEnough(element) {
  return element >= 15;
}
[12, 5, 8, 130, 44].find(isBigEnough); // 130
```

###### 【ES6】findIndex()
* 描述：与find()方法功能一样，唯一不同的是，返回的是`项的位置`，未找到返回 -1

###### 【ES7】includes()
* 描述：查找数组中是否包含给定值 `true` or `false`
* 参数：  
    * 第一个参数：要查找的值
    * 第二个参数：查找的起始位置，默认是0，负数表示倒数，超出范围会重置为0
* 返回值：`true` 包含， `false` 不包含
```js
var a = [1, 2, 3];
a.includes(2); // true 
a.includes(4); // false
```

<p class="tip">includes 相比于 indexOf 的优势有两点：1、更加语义化，不需要判断返回值是否为 -1。2、由于 indexOf 底层在判断是否相等时使用的是全等操作符 ===，这会导致`使用 indexOf 查找 NaN 时查不到，而 includes 则不存在这样的问题`</p>

#### 迭代方法

###### forEach()
###### every()
###### some()
###### filter()
###### map()
```
    描述：迭代数组，对数组的每一项执行给定函数
    参数：第一个参数：函数
                函数接收三个参数
                    1、数组的项
                    2、该项在数组中的位置
                    3、数组对象本身
            第二个参数：第一个参数的执行环境(this指向)
    返回值：
        forEach() 无返回值
        every() 对数组运行给定函数，如果该函数对每一项都返回true，则返回true
        some() 对数组运行给定函数，如果该函数对任意一项返回true，则返回true
        filter() 对数组执行给定函数，返回该函数返回true的项组成的数组
        map() 对数组执行给定函数，返回每次函数调用结果组成的数组
```
###### 【ES6】entries()，keys()和values()
* 描述：`entries()`，`keys()` 和 `values()` 都用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用 `for...of` 循环进行遍历，唯一的区别是 `keys()` 是对键名的遍历、`values()` 是对键值的遍历，`entries()` 是对键值对的遍历。

#### 归并方法
###### reduce()
###### reduceRight()
* 描述：迭代数组的所有项，构建一个最终的返回值
* 参数：
    ```
    第一个参数：函数，函数接收的参数：
        1、前一项(pre)
        2、当前项(cur)
        3、当前项的索引(index)
        4、数组对象本身(array)
    第二个参数：归并的初始值
    ```
* 返回值：迭代的最终值

<p class="tip">
注意：第一次迭代的时候，pre是数组的第一项，cur是数组的第二项，reduce() 和 reduceRight() 除了迭代方向不一致外，其他完全相同
</p>

#### 去重方法
###### Set() 与 WeakSet()

* 它是一个不可重复的无序列表

* 值与值之间的比较是通过 `Object.is` 方法来进行的，这也意味着5和“5”会占据两个空间

* Set 和 WeakSet 区别在于，WeakSet 只提供了基础的方法，并且是一个弱引用。

数组去重：
```js
[...new Set([1,1,1,2,2,3,3,2,5])]
```

###### Map() 与 WeakMap()

* 它是一个由多个无序键值对组成的集合

* 键名可以是任意的数据类型

* WeakMap 的键名只能是对象，与 WeakSet 类似，它也是一个弱引用

* Map 比 WeakMap 多了几个方法，但是基础的 set get 都是相同的

目前，已知的Map的用途，可能就是来存储私有数据，存储对象引用（可以自动释放），大部分情况下，基本不会用到Map。

```js
let privateData = new WeakMap()

class Pre{
  constructor(name){
    privateData.set(this,{ name })
  }
  preName(){
    return privateData.get(this).name
  }
}

export default Pre
```











