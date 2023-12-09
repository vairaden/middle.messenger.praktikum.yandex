module.exports = {
  // extends: 'airbnb',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'max-len': ['error', 100],
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
