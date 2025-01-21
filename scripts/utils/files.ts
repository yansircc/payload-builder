import fs from 'node:fs'
import path from 'node:path'

// 递归获取所有文件
export function getAllFiles(dirPath: string): string[] {
  const files: string[] = []
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)

    if (entry.isDirectory()) {
      // 检查目录中是否有 index.ts/tsx
      const indexFile = fs.readdirSync(fullPath).find((file) => /^index\.(ts|tsx)$/.test(file))

      if (indexFile) {
        files.push(path.join(fullPath, indexFile))
      }
    } else if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.includes('index')) {
      files.push(fullPath)
    }
  }

  return files
}
