// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  "globals": {
    "$": true, //添加项目所需没有申明的全局变量
    "sa": true,
    'window': true,
    'CTJSBridge': true,
    'lib': true
  },
  // add your custom rules here
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // standard规范不使用的在下面添加
    // 尾逗号不允许
    'comma-dangle': 0,
    // function前需要空格
    'space-before-function-paren': 0,
    // {}后面加分号
    'semi': 0,
    // 必须使用单引号
    'quotes': 0,
    // 定义字符串穿插正则
    'no-useless-escape': 0,
    // ===
    'eqeqeq': 0,
    'no-mixed-spaces-and-tabs': 0,
    'no-tabs': 0,
    'indent': 0,
    'camelcase': 0,
    "new-cap": 0,
    "one-var": 0,
    "no-cond-assign": 0,
    "no-mixed-operators": 0,
    "no-multiple-empty-lines": 0,
    "prefer-promise-reject-errors": 0
  }
}
