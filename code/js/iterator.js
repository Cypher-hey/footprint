// get from prototype
let f = Array.prototype[Symbol.iterator];

// iterable obj
let iter = new Array('a', 'b', 'c');
// get iterator
let tor = f.call(iter);

// first iteration
console.error(tor.next());
