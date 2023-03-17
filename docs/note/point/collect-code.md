#### flat 一个 Array，多维数组转化为一维数组，并去重且按升序排列，如:

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

// final: 去重降序
console.log([...new Set(dist)].sort((a, b) => b - a));
```

#### 多级嵌套对象数组-根据某个 id 找出它所属的每层父级的 name 列表

描述：

```js
[
    {
		name: '北京省',
		id: 'a123',
		childs: [
			{
                name: '北京市',
                id: 'd412',
                childs: [
                    {
                        name:  '海淀区',
                        id: 'e312',
                        childs: [
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
		childs: [
			{
                name: '成都市',
                id: 'c312',
                childs: [
                    {
                        name:  '武侯区',
                        id: 'a123',
                        childs: [
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

#### 基于给定的数组，输出包含最多次字母的前缀数字之和；

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

#### 给定任意二维数组，输出所有的排列组合项。

比如 [['A','B'], ['a','b'], [1, 2]]，输出 ['Aa1','Aa2','Ab1','Ab2','Ba1','Ba2','Bb1','Bb2']

```js
let output = [];
function connectArrayItems(arrs, path = '') {
    if (arrs.length === 0) {
        output.push(path);
        return;
    }
    arr = arrs[0];
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

#### 使用原生代码实现一个 Events 模块，可以实现自定义事件的订阅、触发、移除功能

```js
/*
const fn1 = (... args)=>console.log('I want sleep1', ... args)
const fn2 = (... args)=>console.log('I want sleep2', ... args)
const event = new Events();
event.on('sleep', fn1, 1, 2, 3);
event.on('sleep', fn2, 1, 2, 3);
event.fire('sleep', 4, 5, 6);
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6
event.off('sleep', fn1);
event.once('sleep', ()=>console.log('I want sleep));
event.fire('sleep');
*/
class Event {
    constructor() {
        // 放置所有添加的监听事件
        this._events = {};
    }
    on(name, fn, ...argOrg) {
        // 必传参数验证
        if (!name || !fn) {
            throw new Error(`[Events TypeError] Failed to execute 'Events' on '${name}' : 2 arguments required`);
            return;
        }
        // 阻止重复添加相同的监听
        let fns = this._events[name] || [];
        if(fns.find(item => item.fnOrg === fn)){
            return;
        }
        this._events[name] = fns.concat({
            fn: arg => fn.apply(null, [...argOrg, ...arg]),
            fnOrg:fn
        })
    },
    once(name, fn, ...argOrg) {
        const onFn = (...arg) =>{
            fn.apply(null, arg);
            this.off(name, onFn);
        }
        this.on(name, onFn, ...argOrg);
    },
    emit(name, ...arg) {
        (this._events[name] || []).forEach(item =>{
            item.fn(arg);
        });
    },
    off(name,fn) {
        // 无参数: 清掉所有监听
        if(!arguments.length){
            this._events = Object.create(null);
        }
        // 一个参数: 清掉该事件名下所有监听
        if(arguments.length == 1){
            delete this._events[name];
        }
        let fns = this._events[name];
        if(!fns || !fns.length) return;
        this._events[name] = (fns || []).filter(item => {
            return item.fnOrg !== fn
        });
    }
}
```
