module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  plugins: ['prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-plusplus': 'off',
    'object-curly-newline': 'off',
    'comma-dangle': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'no-mixed-operators': 'off',
    'import/prefer-default-export': 'off',
    'space-before-function-paren': ['error', 'always']
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'max-len': 'off'
      }
    },
    {
      files: ['*.js'],
      rules: {
        'space-before-function-paren': ['error', 'always']
      }
    }
  ],
  parserOptions: {
    parser: 'babel-eslint'
  }
};
