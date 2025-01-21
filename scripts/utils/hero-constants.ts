import fs from 'node:fs'
import path from 'node:path'

// 生成 Hero 常量条目
function generateHeroEntry(name: string): string {
  // 生成小写的 value
  const value = name.toLowerCase()

  // 生成常量名（在数字前添加下划线）
  const constName = name.replace(/(\d+)/, '_$1').toUpperCase()

  // 生成 label（在数字前添加空格）
  const label = name.replace(/(\d+)/, ' $1')

  return `  ${constName}: {
    value: '${value}',
    label: '${label}',
    Component: heros.${name},
  },`
}

// 生成 Hero 常量文件
export function generateHeroConstants(
  files: string[],
  dirPath: string,
  outputPath: string,
  template: string,
) {
  const heroNames = files.map((file) => {
    const relativePath = path.relative(dirPath, file)
    const dirName = path.basename(path.dirname(relativePath))
    const fileName = path.basename(file, path.extname(file))
    return fileName === 'index' ? dirName : fileName
  })

  const heroEntries = heroNames.map(generateHeroEntry).join('\n')
  const constantsContent = template.replace('{{HERO_ENTRIES}}', heroEntries)

  fs.writeFileSync(path.join(process.cwd(), outputPath), constantsContent)
}
