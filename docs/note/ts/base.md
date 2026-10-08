# TypeScript 基础：静态契约与运行时边界


> 核查日期：2026-10-08。状态：正文审阅与关键类型语义核查；历史示例保留，未编译实测。

## 阅读重点

TypeScript 在编译阶段帮助检查类型，不会自动验证网络 JSON、用户输入或 LLM 输出。接口、类型断言和非空断言通常不会生成运行时校验。

外部输入优先从 unknown 开始，通过校验和控制流收窄获得可用类型。any 会放宽检查；as T 表达开发者的断言，不是转换或证明。

推荐结合 strictNullChecks 理解空值，使用判别联合表达 loading/success/error 等互斥状态，避免多个布尔字段形成非法组合。标准库 lib 声明表示“类型可见”，不代表目标环境已经提供对应 API。

## 名词

#### interface

Interfaces are designed to declare any arbitrarily crazy structure that might be present in JavaScript.

-   declare the structure of variables
-   are open ended
-   make class followed ensure compatibility by use the `implements` keyword

> Not every interface is implementable easily

#### lib.d.ts

A special declaration file lib.d.ts ships with every installation of TypeScript. This file contains the ambient declarations for various common JavaScript constructs present in JavaScript runtimes and the DOM.

-   This file is automatically included in the compilation context of a TypeScript project.
-   The objective of this file is to make it easy for you to start writing type checked JavaScript code.

You can exclude this file from the compilation context by specifying the --noLib compiler command line flag (or "noLib" : true in tsconfig.json).

#### Freshness

[ref](https://basarat.gitbook.io/typescript/type-system/freshness)

TypeScript provides a concept of Freshness (also called `strict object literal checking`) to make it easier to type check object literals that would otherwise be structurally type compatible.

## Null vs. Undefined

开启 strictNullChecks 时，null 与 undefined 是不同类型；它们不是 TypeScript 的 bottom type，never 才承担该角色。null / undefined 常用来表达缺失值，但具体含义由应用契约决定：

-   Something hasn't been initialized : undefined.
-   Something is currently unavailable: null.

Interestingly in JavaScript with `==`, `null` and `undefined` are only equal to each other:

```js
// Both null and undefined are only `==` to themselves and each other:
console.log(null == null); // true (of course)
console.log(undefined == undefined); // true (of course)
console.log(null == undefined); // true

// You don't have to worry about falsy values making through this check
console.log(0 == undefined); // false
console.log('' == undefined); // false
console.log(false == undefined); // false
```

## number

JavaScript 的 number 使用双精度浮点表示；另有 bigint 表达任意精度整数。二者不能不经转换直接混合算术。

### Decimal

binary floating point numbers do not map correctly to Decimal numbers.

```js
console.log(0.1 + 0.2); // 0.30000000000000004
```

### Integer

The integer limits represented by the built in number type are `Number.MAX_SAFE_INTEGER` and `Number.MIN_SAFE_INTEGER`.

```js
console.log({max: Number.MAX_SAFE_INTEGER, min: Number.MIN_SAFE_INTEGER});
// {max: 9007199254740991, min: -9007199254740991}
```

Safe in this context refers to the fact that the value cannot be the result of a rounding error.（不会是舍入误差的结果。）

The unsafe values are +1 / -1 away from these safe values and any amount of addition / subtraction will round the result.（在之上的 safe value 的加（+）、减（-）操作，可能会导致结果被舍入误差）

```js
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2); // true!
console.log(Number.MIN_SAFE_INTEGER - 1 === Number.MIN_SAFE_INTEGER - 2); // true!

console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1); // 9007199254740992 - Correct
console.log(Number.MAX_SAFE_INTEGER + 2); // 9007199254740992 - Rounded!
console.log(Number.MAX_SAFE_INTEGER + 3); // 9007199254740994 - Rounded - correct by luck
console.log(Number.MAX_SAFE_INTEGER + 4); // 9007199254740996 - Rounded!
```

To check safety you can use ES6 Number.isSafeInteger:

```js
// Safe value
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true

// Unsafe value
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)); // false

// Because it might have been rounded to it due to overflow
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 10)); // false
```

## truthy

JavaScript has a concept of `truthy` i.e. things that evaluate like `true` would in certain positions (e.g. `if` conditions and the boolean `&&` `||` operators).

Something that isn't truthy is called `falsy`.

handy table for reference.

| Variable Type                                        | When it is _falsy_  | When it is _truthy_ |
| ---------------------------------------------------- | ------------------- | ------------------- |
| `boolean`                                            | `false`             | `true`              |
| `string`                                             | `''` (empty string) | any other string    |
| `number`                                             | `0` `NaN`           | any other number    |
| `null`                                               | always              | never               |
| `undefined`                                          | always              | never               |
| Any other Object including empty ones like `{}`,`[]` | never               | always              |

## Iterators

迭代器作为设计模式早于 ES2015；JavaScript 同时定义了具体的 iterator / iterable 协议。以下为简化教学接口，不是 TypeScript 标准库声明的逐字副本：

```ts
// This interface allows to retrieve a value from some collection or sequence which belongs to the object.

interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

interface IteratorResult<T> {
    done: boolean;
    value: T;
}
```

## 练习与来源

将一个“可能含 title 的外部 JSON”设计成 unknown 输入，验证 title 是字符串后再生成卡片。说明为什么给 fetch 返回值加 interface 不能拦截运行时缺字段。

- [TypeScript Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
