/* eslint-disable import/no-anonymous-default-export */
export default {
  // Basic configuration
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  printWidth: 80,
  trailingComma: 'es5',

  // Plugin configuration
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
