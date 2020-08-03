module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    echarts: false,
    html2canvas: true,
    ROUTER: true,
    Random: true,
    moment: false,
    WxLogin: true
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended'
  ],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'vue/require-default-prop': 0,
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'none'
    }],
  }
}
