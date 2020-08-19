# 代码规范与检查

## ESLint

`ESLint` 的原理就是一款插件化的 javascript 代码静态检查工具，其核心是对代码解析得到的 `AST （Abstract Syntax Tree 抽象语法树）` 进行模式匹配，定位不符合约定规范的代码。ESLint 是`完全插件化`的。每一个规则都是一个插件并且可以在运行时添加更多的规则。

社区比较知名的代码规范

-   eslint-config-airbnb
    (https://github.com/airbnb/javascript)

-   eslint-config-standard
    (https://github.com/standard/eslint-config-standard)

-   eslint-config-alloy
    (https://github.com/AlloyTeam/eslint-config-alloy)

如果想降低配置成本，可以直接接入上面的开源配置方案，好多开发者是继承它们的规范，然后在原有基础进行部分修改。我们目前选择的方式不是继承，挑选出了一些适合我们的 ESLint 规则(因为是在原有代码重新建立规范，防止改动过大)。

#### My .eslintrc.js

```js
module.exports = {
    env: {
        browser: true,
        es6: true
    },
    //定义ESLint的解析器
    extends: [
        './.eslintRules.js',
        'plugin:prettier/recommended',
        'prettier', // 优先 prettier 中的样式规范
        'prettier/@typescript-eslint'
        // 这里可以加一些prettier不支持，eslint支持的格式化规则，但是个人认为prettier的格式化规则够用了
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    //定义ESLint的解析器
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module'
    },
    // 定义了该eslint文件所依赖的插件
    plugins: ['@typescript-eslint'],
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always']
    }
};
```

#### ESLint 集成

ESLint 使用并不复杂，简单说下 ESLint 的集成。

##### 全局安装

```js

// yarn
yarn add eslint -D
//or npm
npm install eslint -D
```

##### 初始化

```js
eslint --init
```

这个时候在项目中会出现一个 `.eslintrc.js` 的文件。

##### 自定义配置文件

```js
module.exports = {
    parser: {}, //定义ESLint的解析器
    extends: [], // 定义文件继承的子规范
    plugins: [], // 定义了该eslint文件所依赖的插件
    env: {},
    rules: {} // 规则
};
```

###### parser

定义 parser 的解析器，我们常用的解析器应该是 `@typescript-eslint/parser`

###### env

通过 env 配置需要启动的环境

```js
env: {
    es6: true, //  支持新的 ES6 全局变量，同时自动启用 ES6 语法支持
    node: true, // 启动 node 环境
    mocha: true,
},
```

###### extend

extend 提供的是 eslint 现有规则的一系列预设。

> 这里注意的是，“extends”除了可以引入推荐规则，还可以以文件形式引入其它的自定义规则，然后在这些自定义规则的基础上用 rules 去定义个别规则，从而覆盖掉”extends”中引入的规则。

```js
{
    "extends": [
        "./node_modules/coding-standard/eslintDefaults.js",
        // Override eslintDefaults.js
        "./node_modules/coding-standard/.eslintrc-es6",
        // Override .eslintrc-es6
        "./node_modules/coding-standard/.eslintrc-jsx",
    ],
    "rules": {
        // Override any settings from the "parent" configuration
        "eqeqeq": "warn"
    }
}
```

除了在配置文件中指定规则外，还可以在代码中指定规则，代码文件内以注释配置的规则会覆盖配置文件里的规则，即优先级要更高。平时我们常用的就是 `eslint-disable-next-line`。

忽略检查可以通过在项目目录下建立 `.eslintignore` 文件，并在其中配置忽略掉对哪些文件的检查。需要注意的是，不管你有没有在 .eslintignore 中进行配置，eslint 都会默认忽略掉对 /node_modules/\*\* 的检查。也可以在 package.json 文件的 eslintIgnore 字段进行配置。

###### plugins

plugin 则提供了除预设之外的自定义规则，当你在 ESlint 的规则里找不到合适的的时候就可以借用插件来实现了

```js
module.exports = {
    parser: '@typescript-eslint/parser', // 解析器
    extends: [
        './.eslintRules.js',
        'plugin:prettier/recommended',
        'prettier', // 优先 prettier 中的样式规范
        'prettier/@typescript-eslint'
    ], // 继承的规则
    plugins: ['@typescript-eslint'] // 插件
};
```

#### ESLint 重要特性

##### rules

rules 对应的规则，可以去官网查看。找到符合自己项目的规则。

ESLint 规则官网地址: http://eslint.cn/docs/rules/

注意：

1. 在整理总结规则的时候有些是自动检测的规则，就可以不用总结进去了。
2. ESLint 规则的三种级别
    - "off"或者 0，不启用这个规则
    - "warn"或者 1，出现问题会有警告
    - "error"或者 2，出现问题会报错

###### 工作原理

首先来看看 eslint 源码中关于 rules 的编写。eslint 中的 rules 源码存在于 lib/rules 下。每一个 rules 都是一个 node 模块，用 module.exports 导出一个 meta 对象及一个 create 函数。

```js
module.exports = {
    meta: {
        type: 'suggestion',

        docs: {
            description: 'disallow unnecessary semicolons',
            category: 'Possible Errors',
            recommended: true,
            url: 'https://eslint.org/docs/rules/no-extra-semi'
        },
        fixable: 'code',
        schema: [] // no options
    },
    create: function (context) {
        return {
            // callback functions
        };
    }
};
```

meta 代表了这条规则的 元数据，如这条规则的类别，文档，可接收的参数 schema 等等。create 返回一个对象，其中定义了一些在 AST 遍历访问到对应节点需要执行的方法等等。函数接受一个 context 对象作为参数，里面包含了例如可以报告错误或者警告的 context.report()、可以获取源代码的 context.getSourceCode() 等方法，可以简化规则的编写。

```js
function checkLastSegment (node) {
    // report problem for function if last code path segment is reachable
}

module.exports = {
    meta: { ... },
    create: function(context) {
        // declare the state of the rule
        return {
            ReturnStatement: function(node) {
                // 在AST从上向下遍历到ReturnStatement node 时执行
            },
            // 在AST 从下向上遍历到 function expression node 时执行:
            "FunctionExpression:exit": checkLastSegment,
            "ArrowFunctionExpression:exit": checkLastSegment,
            onCodePathStart: function (codePath, node) {
                // 在分析代码路径开始时执行
            },
            onCodePathEnd: function(codePath, node) {
                // 在分析代码路径结束时执行
            }
        };
    }
};
```

遍历 AST 的过程中会以“从上至下”再“从下至上”的顺序经过节点两次，selector 默认会在下行的过程中执行对应的访问函数，如果需要再上行的过程中执行，则需要添加:exit。

## Prettier

Perriter 官网列出几个特点：

-   An opinionated code formatter
-   Supports many languages
-   Integrates with most editors
-   Has few options

#### My .prettierrc.js

```js
module.exports = {
    // Specify the line length that the printer will wrap on. {int}
    printWidth: 120,
    // Specify the number of spaces per indentation-level. {int}
    tabWidth: 4,
    // Print semicolons at the ends of statements. {true|false}
    semi: true,
    // Use single quotes instead of double quotes. {true|false}
    singleQuote: true,
    // Change when properties in objects are quoted. {as-needed|consistent|preserve}
    quoteProps: 'as-needed',
    // Print trailing commas wherever possible when multi-line. {es5|none|all}
    trailingComma: 'none',
    // Print spaces between brackets in object literals. {true|false}
    bracketSpacing: false,
    // Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line (does not apply to self closing elements).
    jsxBracketSameLine: false,
    // Include parentheses around a sole arrow function parameter. {always|avoid}
    arrowParens: 'always',
    // Prettier can insert a special @format marker at the top of files specifying that the file has been formatted with prettier.
    insertPragma: true,
    // "lf" – Line Feed only (\n)
    endOfLine: 'lf'
};
```

#### 集成

##### 安装包

-   `prettier`：Prettier 插件的核心代码。
-   `eslint-config-prettier`：解决 ESLint 中的样式规范和 Prettier 中样式规范的冲突，以 Prettier 的样式规范为准，使 ESLint 中的样式规范自动失效。
-   `eslint-plugin-prettier`：将 prettier 作为 ESLint 规范来使用。

##### 创建 .prettierrc

在项目的根目录下创建 `.prettierrc.js` 文件

```js
module.exports = {
    printWidth: 120,
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: false,
    jsxBracketSameLine: true,
    arrowParens: 'avoid',
    insertPragma: true,
    tabWidth: 4,
    useTabs: false
};
```

##### 更新 .eslintrc.js

在 extends 中添加

```js
extends:[
    './.eslintRules.js',
    'plugin:prettier/recommended',
    'prettier', // 优先 prettier 中的样式规范
    'prettier/@typescript-eslint',
    // 这里可以加一些prettier不支持，eslint支持的格式化规则，但是个人认为prettier的格式化规则够用了
],
```

##### 配置特殊说明

格式冲突和顺序有什么关系没？

1. eslint-config-prettier 源码可以看出，它的代码很简单，它实际就是关闭了 eslint 的所有格式化规则。[源码地址]（https://github.com/prettier/eslint-config-prettier/tree/master/bin）

2. 我们 yarn add 插件的时候 eslint-config-prettier 模块实际是为 eslint-plugin-prettier 插件服务的，在 eslint-plugin-prettier 的源码中调用了 eslint-config-prettier 中相关的配置，然后执行插件中的代码。

3. 看 eslint-config-prettier 中 recommended 部分的源码，源码中也有使用到 eslint-config-prettier（把已有格式化配置关掉），然后自己制定了基础的 recommended 版本，讲到这应该明白为什么在 eslint-plugin-prettier 中有一段最重要的话，`需要把它(eslint-config-prettier)放在所有格式化配置的后面。`

4. prettier/@typescript-eslint 是用来忽略 typescript 中的格式化配置。

## vscode

#### setting.json

```json
{
    "window.zoomLevel": 2,
    "workbench.colorTheme": "One Monokai",
    "workbench.iconTheme": "vscode-icons",
    "editor.fontSize": 14,
    "editor.tabSize": 4,
    "editor.detectIndentation": false, // 根据文件类型自动设置tabsize
    "editor.fontLigatures": false,
    "editor.tabCompletion": "on",
    "oneDarkPro.bold": false,
    "editor.formatOnSave": true, // 每次保存自动格式化
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true // 每次保存的时候将代码按eslint格式进行修复
    },
    "editor.insertSpaces": true,
    "editor.renderWhitespace": "selection",
    "files.autoSave": "afterDelay",
    "files.autoSaveDelay": 1000,
    "terminal.integrated.shell.osx": "/bin/zsh",
    "prettier.printWidth": 120, // Specify the number of spaces per indentation-level. {int}
    "prettier.tabWidth": 4, // Print semicolons at the ends of statements. {true|false}
    "prettier.semi": true, // Use single quotes instead of double quotes. {true|false}
    "prettier.singleQuote": true, // Change when properties in objects are quoted. {as-needed|consistent|preserve}
    "prettier.quoteProps": "as-needed", // Print trailing commas wherever possible when multi-line. {es5|none|all}
    "prettier.trailingComma": "none", // Print spaces between brackets in object literals. {true|false}
    "prettier.bracketSpacing": false, // Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line (does not apply to self closing elements).
    "prettier.jsxBracketSameLine": false, // Include parentheses around a sole arrow function parameter. {always|avoid}
    "prettier.arrowParens": "always", // Prettier can insert a special @format marker at the top of files specifying that the file has been formatted with prettier.
    "prettier.insertPragma": false,
    "prettier.endOfLine": "lf", // "lf" – Line Feed only (\n)
    "eslint.run": "onSave",
    "eslint.options": {},
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[markdown]": {
        "editor.wordWrap": "on",
        "editor.quickSuggestions": false
    }
}
```
