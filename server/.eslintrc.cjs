module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: '2020',
    sourceType: 'module'
  },
  plugins: ['import'],
  rules: {
    'no-unused-vars': 'warn',
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'import/extensions': ['error', 'never', {
      'js': 'never',
      'jsx': 'never',
    }],
  }
};
