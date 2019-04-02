#javascript-info

## call-apply-decorators

[call-apply-decorators](https://javascript.info/call-apply-decorators)

1、装饰器 decorator: a special function that takes another function and alters its behavior.

2、forwarding:  The wrapper passes everything it gets: the context this and arguments to anotherFunction and returns back its result.

```js
// The wrapper passes everything it gets: the context this and arguments to anotherFunction and returns back its result.
let wrapper = function() {
  return anotherFunction.apply(this, arguments);
};
```

3、func.apply && func.call

```js
func.call(context, arg1, arg2…) // – calls func with given context and arguments.
func.apply(context, args) // – calls func passing context as this and array-like args into a list of arguments.

func.call(context, ...args); // pass an array as list with spread operator
func.apply(context, args);   // is same as using apply
```

method borrowing:

```js
function hash() {
  alert( [].join.call(arguments) ); // 1,2   arguments === this
}

hash(1, 2);
```

4、DOM elements

There are [12 node types](https://dom.spec.whatwg.org/#node). In practice we usually work with 4 of them:

1. document – the “entry point” into DOM.

2. element nodes – HTML-tags, the tree building blocks.

3. text nodes – contain text.

4. comments – sometimes we can put the information there, it won’t be shown, but JS can read it from the DOM.
