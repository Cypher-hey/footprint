# ESLint 旧配置示例：eslintrc 年代的规则记录

> 核查日期：2026-10-08。状态：配置结构与年代审阅，未执行。
> 以下是旧版配置记录，部分格式化规则和插件配置在新版本中已变化。不能直接视为现代 flat config，也不承诺所有规则在目标版本仍存在。注释中的“四空格缩进”不是 tab。

根据 JavaScript 编码规范编写的 ESLint 配置

```js
module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parserOptions": {
        "sourceType": "module"
    },
    /* 需要安装 eslint-plugin-vue */
    "plugins": ["vue"],
    "rules": {
        /* 缩进 4 个空格 */
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        /* 使用单引号 */
        "quotes": [
            "error",
            "single"
        ],
        /* 分号必须 */
        "semi": [
            "error",
            "always"
        ],
        /* 函数不允许有重复的参数 */
        "no-dupe-args": "error",
        /* 不允许有多余的分号 */
        "no-extra-semi": "error",
        /* 不允许有多余的空格 */
        "no-multi-spaces": "error",
        /* 禁止变量重复声明 */
        "no-redeclare": "error",
        /* 禁止未使用的变量 */
        "no-unused-vars": "error",
        /**
         * 逗号前不可以有空格，逗号后必须有空格。
         * 变量声明：
         * ✅var a = 1, b = 2
         * 数组：
         * ✅[1, 2]
         * 对象：
         * ✅{a: 1, b: 2}
         * 函数参数：
         * ✅function (a, b) {} 
         * ✅fn(1, 2)
         */
        "comma-spacing": [
            "error",
            {
                "before": false,
                "after": true
            }
        ],
        /**
         * 调用函数时，禁止函数名称与括号间的间隔
         * ❎：fn ()
         * ✅：fn()
         */
        "func-call-spacing": "error",
        /**
         * 对象字面量冒号前不允许有空格，冒号后必须且只有一个空格
         * ✅：{a: 1}
         * ✅：{
         *         a: 1,
         *         b: 2
         *     }
         */
        "key-spacing": [
            "error",
            {
                "beforeColon": false,
                "afterColon": true,
                "mode": "strict"
            }
        ],
        /**
         * 关键字前后各至少一个空格，包括的关键字查看：
         * http://eslint.org/docs/rules/keyword-spacing#rule-details
         */
        "keyword-spacing": [
            "error",
        ],
        /**
         * 变量声明后强制一个空行，生命变量包括使用 var let const 等
         */
        "newline-after-var": "error",
        // 语句块前必须要有空格，语句块只得就是花括号 {}
        "space-before-blocks": "error",
        /**
         * function 关键之与后边第一个圆括号之间必须有空格。包括：匿名函数、命名函数、async修饰的箭头函数
         * ✅：function () {}
         * ✅：function set () {}
         * ✅：class Foo {
         *          constructor () {
         *               // ...
         *          }
         *     }
         * ✅：let foo = {
         *         bar () {
         *               // ...
         *         }
         *     };
         * ✅：let foo = async (a) => await a
         */
        "space-before-function-paren": [
            "error",
            {
                "anonymous": "always",
                "named": "always",
                "asyncArrow": "always"
            }
        ],
        // 多元运算符前后要有空格
        "space-infix-ops": "error",
        /**
         * 一元关键字运算符(操作符)后必须有空格：new, delete, typeof, void, yield 等
         * 一元运算符前后不能有空格如：-, +, --, ++, !, !! 等
         * ✅：new Foo();
         * ✅：++foo;
         * ✅：foo--;
         * ✅：-foo;
         * ✅：+"3";
         */
        "space-unary-ops": [
            "error",
            {
                "words": true,
                "nonwords": false
            }
        ],

        // ================================ 以下是 ES6 规范 ================================

        /**
         * 箭头函数中的箭头前后必须各有一个空格
         * ✅：() => 1
         */
        "arrow-spacing": "error",
        /**
         * 继承时子类的 constructor 方法中必须调用 super 方法
         * ✅：class A extends B {
         *         constructor() {
         *             super();
         *         }
         *     }
         */
        "constructor-super": "error",
        // 不允许给常量(const)赋值
        "no-const-assign": "error",
        // 在 constructor 中不允许在 super 方法被调用之前调用 this 或 super 关键字
        "no-this-before-super": "error",
        // 不允许使用 var 声明变量，使用 let 或 const 代替
        "no-var": "error"
    }
}
```
迁移前阅读 [配置迁移指南](https://eslint.org/docs/latest/use/configure/migration-guide)，按项目版本逐项核对；本轮不改变实际配置文件。
