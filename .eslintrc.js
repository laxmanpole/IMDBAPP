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
    'no-tabs': ["error", { allowIndentationTabs: true }
    ],
    'radix': ["error", "as-needed"],
    "quote-props": ["error", "consistent"],
    'max-len': 0,
    'consistent-return': 0,
    'no-else-return': 0
}
};
