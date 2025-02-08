import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import type { ConfigInfo } from './types'

/**
 * 从配置文件中获取配置信息
 */
export function getConfigInfo(configPath: string): ConfigInfo {
  const actualConfigPath = configPath.includes('src')
    ? configPath
    : path.join(process.cwd(), 'src', path.basename(configPath))

  const sourceFile = ts.createSourceFile(
    actualConfigPath,
    fs.readFileSync(actualConfigPath, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  )

  const info: ConfigInfo = {
    collections: [],
    globals: [],
    blocks: new Set<string>(),
  }

  function visit(node: ts.Node) {
    if (ts.isArrayLiteralExpression(node)) {
      const parent = node.parent
      if (ts.isPropertyAssignment(parent)) {
        const propertyName = parent.name.getText()
        if (propertyName === 'collections') {
          node.elements.forEach((element) => {
            if (ts.isIdentifier(element)) {
              info.collections.push(element.text)
            }
          })
        } else if (propertyName === 'globals') {
          node.elements.forEach((element) => {
            if (ts.isIdentifier(element)) {
              info.globals.push(element.text)
            }
          })
        }
      }
    }
    ts.forEachChild(node, visit)
  }

  ts.forEachChild(sourceFile, visit)
  return info
}
