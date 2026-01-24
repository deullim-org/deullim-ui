const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const unusedImportsPlugin = require('eslint-plugin-unused-imports');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'warn',
      'no-console': 'warn',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]);
