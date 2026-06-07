// @ts-check

import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['*/', '!assets/']),
  {
    basePath: 'assets',
    files: ['**/*.ts'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    rules: {
      'lines-between-class-members': ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'return', next: '*' },
        { blankLine: 'any', prev: 'block-like', next: '*' },
        { blankLine: 'any', prev: '*', next: 'block-like' },
      ],
      'prefer-template': 'error',
    },
  },
]);
