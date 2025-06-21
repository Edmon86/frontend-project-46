import js from '@eslint/js'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from 'eslint/config'

// Импорты для TypeScript ESLint
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default defineConfig([
  {
    files: ['**/*.{js,ts}'],
    ...js.configs.recommended,
    languageOptions: {
      globals: globals.node,
      parser: tsParser, // добавляем парсер TypeScript
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      stylistic,
      '@typescript-eslint': tsPlugin,
    },

    rules: {
      // Стили
      'stylistic/semi': ['error', 'never'],
      'stylistic/quotes': ['error', 'single'],
      'stylistic/indent': ['error', 2],
      'stylistic/comma-dangle': ['error', 'always-multiline'],
      'stylistic/space-before-function-paren': ['error', 'never'],
      'stylistic/object-curly-spacing': ['error', 'always'],
      'stylistic/space-infix-ops': 'error',
      'stylistic/space-before-blocks': ['error', 'always'],
      'stylistic/keyword-spacing': ['error', { before: true, after: true }],
      'stylistic/comma-spacing': ['error', { before: false, after: true }],
      'stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'stylistic/space-in-parens': ['error', 'never'],
      'stylistic/no-trailing-spaces': ['error'],
      'stylistic/semi-spacing': ['error', { before: false, after: true }],

      // Можно добавить правила для TypeScript из плагина
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },
])
