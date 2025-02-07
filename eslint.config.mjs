import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    // Ignore patterns need to be placed at the beginning of the configuration
    ignores: [
      // Build outputs
      '.next/**',
      'dist/**',
      'build/**',
      'out/**',

      // Dependencies
      'node_modules/**',

      // Config files (Remove *.config.js)
      '*.config.ts',
      'next-env.d.ts',

      // Other
      '.vercel/**',
      '.coverage/**',
      '*.log',
      '.git/**',
      '.husky/**',
      '.vscode/**',
      'tsconfig.json',

      // Public assets
      'public/**',

      // Generated files
      'generated/**',
      '*.generated.*',

      // Husky
      '.husky/**',
      '.lintstagedrc.js',

      // Tailwind
      'tailwind.config.mjs',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
]

export default eslintConfig
