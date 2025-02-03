// eslint-disable-next-line import/no-anonymous-default-export
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Features
        'fix', // Bug Fixes
        'docs', // Documentation
        'style', // Styles
        'refactor', // Code Refactoring
        'test', // Tests
        'chore', // Chores
        'revert', // Reverts
        'ci', // CI related changes
      ],
    ],
    'subject-case': [0], // Disable subject case validation
    'body-max-line-length': [0], // Disable body line length validation
  },
}
