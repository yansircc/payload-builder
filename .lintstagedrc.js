/* eslint-disable import/no-anonymous-default-export */
export default {
  // TypeScript, JavaScript files
  '*.{ts,tsx,js,jsx}': (files) => {
    const filesToString = files.join(' ')
    return [
      'bun typecheck',
      `bun run format:write ${filesToString}`,
      `bunx eslint --fix ${filesToString}`,
    ]
  },

  // Other files
  '*.{json,mdx}': (files) => {
    return [`bun run format:write ${files.join(' ')}`]
  },

  // 明确忽略 tsbuildinfo 文件
  '!tsconfig.tsbuildinfo': [],
}
