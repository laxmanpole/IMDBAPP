module.exports = {
  env: {
    browser: true,
    node:true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  parser:"babel-eslint",
  ecmaFeatures: {
    "jsx": true,
    "modules":true,
    "arrowFunctions":true,
    "classes":true,
    "spread":true,

  },
  "rules": {
    "indent": [
        "warn",
        "tab",
        { "SwitchCase": 2 }
    ],
    "quotes": [
        "warn",
        "single"
    ],
    "semi": [
        "error",
        "never"
    ],
    "no-var": [
        "error"
    ],
    "no-console": [
        "off"
    ],
    "no-unused-vars": [
        "warn"
    ],
    "no-mixed-spaces-and-tabs": [
        "warn"
    ],
    'no-else-return': ['warn',
     { allowElseIf: true }
    ],
    'no-tabs': ["error", { allowIndentationTabs: true }]
}
};
