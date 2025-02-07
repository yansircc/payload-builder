import fs from 'fs'
import path from 'path'
import ts from 'typescript'
import { getConfigInfo } from './config'
import { collectFields, collectInterfacesAndBlocks } from './field-collector'
import { generateFiles } from './file-generator'
import type { TranslationTemplate } from './types'

function main(): void {
  // Get config info
  const configPath = path.join(__dirname, '../../src/payload.config.ts')
  const configInfo = getConfigInfo(configPath)

  // Read types file
  const typesPath = path.join(__dirname, '../../src/payload-types.ts')
  const sourceFile = ts.createSourceFile(
    typesPath,
    fs.readFileSync(typesPath, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
  )

  // Initialize translation template
  const template: TranslationTemplate = {
    collections: {},
  }

  // Initialize all collections as empty values
  const allCollections = [...configInfo.collections, ...configInfo.globals]
  allCollections.forEach((name) => {
    template.collections[name.toLowerCase()] = {
      singular: { en: '', zh: '' },
      plural: { en: '', zh: '' },
      fields: {},
    }
  })

  // Collect interfaces and blocks
  const { interfaceToCollection, blockInterfaces } = collectInterfacesAndBlocks(
    sourceFile,
    configInfo,
  )

  // Collect fields
  collectFields(sourceFile, template, interfaceToCollection, blockInterfaces)

  // Generate files
  const outputDir = path.join(__dirname, '../../src/i18n')
  generateFiles(outputDir, configInfo, template)
}

main()
