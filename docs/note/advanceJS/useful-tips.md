## 按位非运算符(~)及双非(~~)

#### 按位非运算符 “~”

w3c的定义：

>位运算 NOT 由否定号（~）表示，它是 ECMAScript 中为数不多的与二进制算术有关的运算符之一。

>位运算 NOT 是三步的处理过程：

>1. 把运算数转换成 32 位数字
>2. 把二进制数转换成它的二进制反码（0->1, 1->0）
>3. 把二进制数转换成浮点数

简单的理解，对任一数值 x 进行按位非操作的结果为 `-(x + 1)`:

```js
console.log('~null: ', ~null);       // => -1
console.log('~undefined: ', ~undefined);  // => -1
console.log('~0: ', ~0);          // => -1
console.log('~{}: ', ~{});         // => -1
console.log('~[]: ', ~[]);         // => -1
console.log('~(1/0): ', ~(1/0));      // => -1
console.log('~false: ', ~false);      // => -1
console.log('~true: ', ~true);       // => -2
console.log('~1.2543: ', ~1.2543);     // => -2
console.log('~4.9: ', ~4.9);       // => -5
console.log('~(-2.999): ', ~(-2.999));   // => 1
```

~value的使用：

```js
//判断数值中是否有某元素时，以前这样判断：
if(arr.indexOf(ele) > -1){...} //易读

//现在可以这样判断，两者效率：
if(~arr.indexOf(ele)){...} //简洁
```

#### 按位双非运算符 “~~”

~~x就为 `-(-(x+1) + 1)`

```js
console.log('~~null: ', ~~null);       // => 0
console.log('~~undefined: ', ~~undefined);  // => 0
console.log('~~0: ', ~~0);          // => 0
console.log('~~{}: ', ~~{});         // => 0
console.log('~~[]: ', ~~[]);         // => 0
console.log('~~(1/0): ', ~~(1/0));      // => 0
console.log('~~false: ', ~~false);      // => 0
console.log('~~true: ', ~~true);       // => 1
console.log('~~1.2543: ', ~~1.2543);     // => 1
console.log('~~4.9: ', ~~4.9);       // => 4
console.log('~~(-2.999): ', ~~(-2.999));   // => -2
```

~~value的使用：
```js
// 对于浮点数，~~value可以代替parseInt(value)，而且前者效率更高些

parseInt(-2.99) //-2
~~(-2.99) //-2
```