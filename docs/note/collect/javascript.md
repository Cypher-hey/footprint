#### 5种方式实现值交换
```js

1. var temp = a; a = b; b = temp; (传统，但需要借助临时变量)

2. a ^= b; b ^= a; a ^= b; (需要两个整数)

3. b = [a, a = b][0] (借助数组)

4. [a, b] = [b, a]; (ES6，解构赋值)

5. a = a + b; b = a - b; a = a - b; (小学奥赛题)
```

#### 去掉小数部分
```js

1. parseInt(num)

2. ~~num

3. num >> 0

4. num | 0
```

#### 判断 x 是否是整数
```js

function isInt(x) {
  return (x ^ 0) === x
}
// 2. return Math.round(x) === x
// 3. return (typeof x === 'number') && (x % 1 === 0)
// 4. ES6 -> Number.isInteger()
```

#### 递归求阶乘
```js

function factorial(n) {
  return (n > 1) ? n * f(n - 1) : n
}
```

#### 判断符号是否相同
```js

function sameSign(a, b) {
  return (a ^ b) >= 0
}
```

#### 克隆数组
```js

arr.slice(0)
```

#### 数组去重
```js

// ES6
Array.from(new Set(arr))

// ES5
arr.filter(function(ele, index, array){
    return index===array.indexOf(ele)
})
```

#### 数组最值
```js

function maxArr(arr) {
  return Math.max.apply(null, arr)
}

function minArr(arr) {
  return Math.min.apply(null, arr)
}
```

#### 随机获取数组的一个成员
```js

function randomOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
```

#### 产生随机颜色
```js

function getRandomColor() {
    return `#${Math.random().toString(16).substr(2, 6)}`
}
```

#### 随机生成指定长度的字符串
```js

function randomStr(n) {
  let standard = 'abcdefghijklmnopqrstuvwxyz9876543210'
  let len = standard.length
  let result = ''

  for (let i = 0; i < n; i++) {
    result += standard.charAt(Math.floor(Math.random() * len))
  }

  return result
}
```

#### 随机生成指定长度的字符串
```js

function randomStr(n) {
  let standard = 'abcdefghijklmnopqrstuvwxyz9876543210'
  let len = standard.length
  let result = ''

  for (let i = 0; i < n; i++) {
    result += standard.charAt(Math.floor(Math.random() * len))
  }

  return result
}
```

#### 简单拷贝
```js

JSON.parse(JSON.stringify(obj))
```

