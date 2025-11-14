import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import html from '@html-eslint/eslint-plugin'

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'module' } },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.browser } },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      'no-console': 'error',
      'no-debugger': 'error',
      'no-alert': 'error',
      curly: 'error',
      'no-use-before-define': ['error', { functions: false, classes: true }],
      'no-shadow': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'prefer-template': 'error',
      'no-loop-func': 'error',
      'max-depth': ['error', 4],
      'no-duplicate-imports': 'error',
      'no-implied-eval': 'error',
      'no-self-compare': 'error',
      'no-useless-return': 'error',
      'no-unsafe-optional-chaining': 'error',
      'array-callback-return': 'error',
    },
  },
  {
    files: ['**/*.html'],
    plugins: { '@html-eslint': html },
    extends: [html.configs['flat/recommended']],
    rules: {
      '@html-eslint/require-closing-tags': 'error',
      '@html-eslint/no-duplicate-id': 'error',
      '@html-eslint/require-button-type': 'error',
      '@html-eslint/require-li-container': 'error',
      '@html-eslint/no-multiple-h1': 'error',
      '@html-eslint/require-title': 'error',
      '@html-eslint/require-img-alt': 'error',
      '@html-eslint/lowercase': 'error',
      '@html-eslint/no-multiple-empty-lines': 'error',
      '@html-eslint/no-trailing-spaces': 'error',
    },
  },
])