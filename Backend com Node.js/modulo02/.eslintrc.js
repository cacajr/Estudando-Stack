module.exports = {
  env: {
    es2020: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
  ],
  plugins: [
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': "error",
    'class-methods-use-this': 'off',
    'no-param-reassing': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'linebreak-style': 'off',
  },
};
