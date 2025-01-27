module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: false,
        allowTypedFunctionExpressions: false,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  ignorePatterns: [
    // Build outputs
    '.next/',
    'dist/',
    'build/',
    'out/',

    // Dependencies
    'node_modules/',

    // Config files
    '*.config.js',
    '*.config.ts',
    'next-env.d.ts',

    // Other
    '.vercel/',
    '.coverage/',
    '*.log',
    '.git/',
    '.husky/',
    '.vscode/',

    // Public assets
    'public/',

    // Generated files
    'generated/',
    '*.generated.*',
  ],
}
