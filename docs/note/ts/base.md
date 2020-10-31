# base

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

JavaScript (and by extension TypeScript) has two bottom types : null and undefined. They are intended to mean different things:

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

JavaScript has only one number type. It is a double-precision 64-bit `Number`.

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

Iterator itself is not a TypeScript or ES6 feature, Iterator is a `Behavioral Design Pattern` common for Object oriented programming languages. It is, generally, an object which implements the following interface:

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
