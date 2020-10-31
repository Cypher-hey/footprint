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
