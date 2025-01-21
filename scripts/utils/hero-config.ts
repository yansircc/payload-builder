import fs from 'node:fs'
import path from 'node:path'

// 生成字段导入和使用的代码
export function generateHeroConfig(
  files: string[],
  dirPath: string,
  outputPath: string,
  template: string,
) {
  const fieldNames = files.map((file) => {
    const fileName = path.basename(file, path.extname(file))
    return fileName
  })

  // 生成字段调用代码
  const fieldEntries = fieldNames
    .map((name) => `    fields.${name}(),`)
    .sort() // 按字母顺序排序
    .join('\n')

  const configContent = template.replace('{{FIELD_ENTRIES}}', fieldEntries)
  fs.writeFileSync(path.join(process.cwd(), outputPath), configContent)
}
