module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended', 'airbnb', 'prettier'],
  globals: {
    $: 'readonly',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'arrow-parens': [2, 'always'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.stories.jsx'],
      },
    ],
    'operator-linebreak': 1,
    'react/jsx-indent': 1,
  },
};
