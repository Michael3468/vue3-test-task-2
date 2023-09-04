/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',

    'eslint:recommended',
    '@vue/eslint-config-typescript',

    '@vue/eslint-config-airbnb-with-typescript',
    '@vue/eslint-config-airbnb-with-typescript/allow-js-in-vue',

    '@vue/eslint-config-prettier/skip-formatting',
  ],
  rules: {
    'vue/no-required-prop-with-default': 'error',
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
