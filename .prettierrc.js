module.exports = {
  // 基础配置
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  printWidth: 80,
  trailingComma: 'es5',

  // 插件配置
  plugins: ['prettier-plugin-organize-imports'],

  // TypeScript 相关配置
  parser: '@typescript-eslint/typescript-estree',
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
