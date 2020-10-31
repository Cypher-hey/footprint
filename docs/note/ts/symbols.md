# Symbol

## ! 非空断言操作符

在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 `!` 可以用于断言操作对象是非 null 和非 undefined 类型。`具体而言，x! 将从 x 值域中排除 null 和 undefined` 。

### 应用

1. 忽略 undefined 和 null 类型

```ts
function myFunc(maybeString: string | undefined | null) {
    // Type 'string | null | undefined' is not assignable to type 'string'.
    // Type 'undefined' is not assignable to type 'string'.
    const onlyString: string = maybeString; // Error
    const ignoreUndefinedAndNull: string = maybeString!; // Ok
}
```

2. 调用函数时忽略 undefined 类型

```ts
type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
    // Object is possibly 'undefined'.(2532)
    // Cannot invoke an object which is possibly 'undefined'.(2722)
    const num1 = numGenerator(); // Error
    const num2 = numGenerator!(); //OK
}
```

因为 ! 非空断言操作符会从编译生成的 JavaScript 代码中移除，所以在实际使用的过程中，要特别注意。比如下面这个例子：

```ts
const a: number | undefined = undefined;
const b: number = a!;
console.log(b);
```

以上 TS 代码会编译生成以下 ES5 代码：

```js
'use strict';
const a = undefined;
const b = a;
console.log(b);
```

虽然在 TS 代码中，我们使用了非空断言，使得 const b: number = a!; 语句可以通过 TypeScript 类型检查器的检查。但在生成的 ES5 代码中，! 非空断言操作符被移除了，所以在浏览器中执行以上代码，在控制台会输出 undefined。

## ?. 运算符

TypeScript 3.7 实现了呼声最高的 ECMAScript 功能之一：可选链（Optional Chaining）。有了可选链后，我们编写代码时如果遇到 null 或 undefined 就可以立即停止某些表达式的运行。可选链的核心是新的 ?. 运算符，它支持以下语法：

```
obj?.prop
obj?.[expr]
arr?.[index]
func?.(args)
```

### 可选的属性访问

```js
const val = a?.b;

// 编译生成的 ES5 代码：
var val = a === null || a === void 0 ? void 0 : a.b;
```

上述的代码会自动检查对象 a 是否为 null 或 undefined，如果是的话就立即返回 undefined，这样就可以立即停止某些表达式的运行。可以使用 ?. 来替代很多使用 && 执行空检查的代码：

```js
if (a && a.b) {
}

if (a?.b) {
}
/**
 * if(a?.b){ } 编译后的ES5代码
 *
 * if(
 *  a === null || a === void 0
 *  ? void 0 : a.b) {
 * }
 */
```

但需要注意的是，?. 与 && 运算符行为略有不同，&& 专门用于检测 falsy 值，比如空字符串、0、NaN、null 和 false 等。而 `?. 只会验证对象是否为 null 或 undefined`，对于 0 或空字符串来说，并不会出现 “短路”。

### 可选元素访问

可选链除了支持可选属性的访问之外，它还支持可选元素的访问，它的行为类似于可选属性的访问，只是可选元素的访问允许我们访问非标识符的属性，比如任意字符串、数字索引和 Symbol：

```js
// ts
function tryGetArrayElement<T>(arr?: T[], index: number = 0) {
    return arr?.[index];
}

// 以上代码经过编译后会生成以下 ES5 代码：
('use strict');
function tryGetArrayElement(arr, index) {
    if (index === void 0) {
        index = 0;
    }
    return arr === null || arr === void 0 ? void 0 : arr[index];
}
```

### 可选链与函数调用

当尝试调用一个可能不存在的方法时也可以使用可选链。在实际开发过程中，系统中某个方法不可用，有可能是由于版本不一致或者用户设备兼容性问题导致的。函数调用时如果被调用的方法不存在，使用可选链可以使表达式自动返回 undefined 而不是抛出一个异常。

```js
// ts
let result = obj.customMethod?.();

// 该 TypeScript 代码编译生成的 ES5 代码如下：
var result = (_a = obj.customMethod) === null || _a === void 0 ? void 0 : _a.call(obj);
```

可选调用的两个注意事项：

1. 不会验证属性是否为函数类型；
2. 可选链的运算行为被局限在属性的访问、调用以及元素的访问 —— 它不会沿伸到后续的表达式中；

## ?? 空值合并运算符

在 TypeScript 3.7 版本中除了引入了前面介绍的可选链 ?. 之外，也引入了一个新的逻辑运算符 —— 空值合并运算符 `??`。`当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数`。

> 排除掉使用 || 时，一些 falsy 值（''、NaN 或 0）的影响

```js
const foo = null ?? 'default string';
console.log(foo); // 输出："default string"

const baz = 0 ?? 42;
console.log(baz); // 输出：0

// 以上 TS 代码经过编译后，会生成以下 ES5 代码：
('use strict');
var _a, _b;
var foo = (_a = null) !== null && _a !== void 0 ? _a : 'default string';
console.log(foo); // 输出："default string"

var baz = (_b = 0) !== null && _b !== void 0 ? _b : 42;
console.log(baz); // 输出：0
```

#### 短路

当空值合并运算符的左表达式不为 null 或 undefined 时，不会对右表达式进行求值。

```js
function A() {
    console.log('A was called');
    return undefined;
}
function B() {
    console.log('B was called');
    return false;
}
function C() {
    console.log('C was called');
    return 'foo';
}

console.log(A() ?? C());
console.log(B() ?? C());

// output

// A was called
// C was called
// foo
// B was called
// false
```

#### 不能与 && 或 || 操作符共用

若空值合并运算符 ?? 直接与 AND（&&）和 OR（||）操作符组合使用 ?? 是不行的。这种情况下会抛出 SyntaxError。

```js
// '||' and '??' operations cannot be mixed without parentheses.(5076)
null || undefined ?? "foo"; // raises a SyntaxError

// '&&' and '??' operations cannot be mixed without parentheses.(5076)
true && undefined ?? "foo"; // raises a SyntaxError

// 但当使用括号来显式表明优先级时是可行的，比如：
(null || undefined ) ?? "foo"; // 返回 "foo"
```
