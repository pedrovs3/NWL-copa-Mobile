module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
  ],
  parser: '',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: '@typescript-eslint/parser',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    camelcase: 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
  },
};
