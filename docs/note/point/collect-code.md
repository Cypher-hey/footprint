# 编码练习：先写合同，再检查边界

> 审阅日期：2026-10-08。状态：静态审阅，未执行。修正升降序不一致、children 字段、隐式全局变量和事件类语法。
> JSON/正则扁平化仅作反例，不支持任意字符串、undefined 和循环；优先 flat 或显式遍历。路径查找需规定重复 ID；前缀数字求和例子假定格式合法且末位为 a–z；笛卡尔积结果规模是各维长度之积，需要限制。

## flat 一个 Array，多维数组转化为一维数组，并去重且按升序排列，如:

[1,[2,[3,1],2],[6,[5,2]],1] to [1,2,3,5,6]

```js
let source = [1, [2, [3, 1], 2], [6, [5, 2]], 1];

let dist;
// 1. arr.flat([depth])
dist = source.flat(Infinity);

// 2. concat + reduce + recursive
function flatDeep(arr, d = 1) {
    return d > 0
        ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
        : arr.slice();
}

dist = flatDeep(source, Infinity);

// 3. 正则
dist = JSON.stringify(source)
    .replace(/[\[\]]/g, '')
    .split(',');

// 4. 递归
let result = [];
let fn = function (ary) {
    for (let i = 0; i < ary.length; i++) {
        let item = ary[i];
        if (Array.isArray(ary[i])) {
            fn(item);
        } else {
            result.push(item);
        }
    }
};
fn(source);
dist = result;

// 5. 扩展运算符
let arr = [].concat(source);
while (arr.some(Array.isArray)) {
    arr = [].concat(...arr);
}
dist = arr;

// final: 去重升序
console.log([...new Set(dist)].sort((a, b) => a - b));
```

## 多级嵌套对象数组-根据某个 id 找出它所属的每层父级的 name 列表

描述：

```js
[
    {
		name: '北京省',
		id: 'a123',
		children: [
			{
                name: '北京市',
                id: 'd412',
                children: [
                    {
                        name:  '海淀区',
                        id: 'e312',
                        children: [
                            {...}
                        ]
                    }
                ]
			},
		]
	},
	{
		name: '四川',
		id: 'b123',
		children: [
			{
                name: '成都市',
                id: 'c312',
                children: [
                    {
                        name:  '武侯区',
                        id: 'a123',
                        children: [
                            {...}
                        ]
                    }
                ]
			},
		]
	},
	... ...
]
```

```js
//递归实现
//@leafId  查找的id，
//@nodes   原始Json数据
//@path    供递归使用
function findPathByLeafId(leafId, nodes, path) {
    if (path === undefined) {
        path = [];
    }
    for (var i = 0; i < nodes.length; i++) {
        var tmpPath = path.concat();
        tmpPath.push(nodes[i].name);
        if (leafId == nodes[i].id) {
            return tmpPath;
        }
        if (nodes[i].children) {
            var findResult = findPathByLeafId(leafId, nodes[i].children, tmpPath);
            if (findResult) {
                return findResult;
            }
        }
    }
}
```

## 基于给定的数组，输出包含最多次字母的前缀数字之和；

['111a','2b','13c','5a']

```js
function countInArray(array) {
    let charArray = [...Array(26)].map(() => []);
    array.forEach((item, index) => {
        charArray[item[item.length - 1].charCodeAt() - 97].push(item.slice(0, item.length - 1));
    });
    charArray.sort((a, b) => b.length - a.length);
    return charArray[0].reduce((cur, acc) => cur + Number(acc), 0);
}

console.error(countInArray(['111a', '2b', '13c', '5a']));
```

## 给定任意二维数组，输出所有的排列组合项。

比如 [['A','B'], ['a','b'], [1, 2]]，输出 ['Aa1','Aa2','Ab1','Ab2','Ba1','Ba2','Bb1','Bb2']

```js
let output = [];
function connectArrayItems(arrs, path = '') {
    if (arrs.length === 0) {
        output.push(path);
        return;
    }
    const arr = arrs[0];
    arr.forEach((item) => {
        connectArrayItems(arrs.slice(1), path + item);
    });
}
connectArrayItems([
    ['A', 'B'],
    ['a', 'b'],
    [1, 2]
]);
console.error(output);
```

## 事件订阅的最小教学实现

```js
class Events {
  constructor() { this.listeners = new Map(); }
  on(name, fn) {
    if (typeof fn !== "function") throw new TypeError("listener");
    if (!this.listeners.has(name)) this.listeners.set(name, new Set());
    this.listeners.get(name).add(fn);
    return () => this.off(name, fn);
  }
  once(name, fn) {
    const wrapped = (...args) => {
      this.off(name, wrapped); // 先解除，避免重入重复调用
      fn(...args);
    };
    return this.on(name, wrapped);
  }
  emit(name, ...args) {
    for (const fn of [...(this.listeners.get(name) ?? [])]) fn(...args);
  }
  off(name, fn) {
    const group = this.listeners.get(name);
    if (!group) return;
    group.delete(fn);
    if (group.size === 0) this.listeners.delete(name);
  }
}
```

本实现允许回调异常向调用者传播，不提供异步队列、优先级或错误隔离。emit 使用快照，期间取消监听的具体语义由此确定。使用 Map 避免特殊对象键冲突。
