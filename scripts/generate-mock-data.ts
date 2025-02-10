import { readFile, writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { glob } from 'glob'
import ts from 'typescript'
import { z } from 'zod'

interface SchemaInfo {
  schemaPath: string
  dataPath: string
  schema: z.ZodObject<any>
  hasMockData: boolean
}

function findSchemaFiles(): string[] {
  return glob.sync('src/**/data/schema.ts', {
    ignore: ['**/node_modules/**'],
  })
}

function getDataFilePath(schemaPath: string): string {
  return join(dirname(schemaPath), 'mock.ts')
}

async function checkDataFileExists(dataPath: string): Promise<boolean> {
  try {
    await readFile(dataPath, 'utf-8')
    return true
  } catch {
    return false
  }
}

async function extractSchema(schemaPath: string): Promise<SchemaInfo | null> {
  try {
    const content = await readFile(schemaPath, 'utf-8')
    const dataPath = getDataFilePath(schemaPath)

    // Check if data.ts already exists
    const hasMockData = await checkDataFileExists(dataPath)
    if (hasMockData) {
      console.log(`⏭️  Skipping ${schemaPath} - mock.ts already exists`)
      return null
    }

    // Create source file
    const sourceFile = ts.createSourceFile(schemaPath, content, ts.ScriptTarget.Latest, true)

    let schema: z.ZodObject<any> | null = null
    const schemaDefinitions = new Map<string, string>()

    // First pass: collect all schema definitions
    function collectSchemas(node: ts.Node) {
      if (ts.isVariableStatement(node)) {
        const declaration = node.declarationList.declarations[0]
        if (ts.isIdentifier(declaration.name) && declaration.initializer) {
          const name = declaration.name.text
          const schemaText = content.slice(declaration.initializer.pos, declaration.initializer.end)
          schemaDefinitions.set(name, schemaText)
        }
      }
      ts.forEachChild(node, collectSchemas)
    }

    ts.forEachChild(sourceFile, collectSchemas)

    // Create evaluation context with all schema definitions
    const contextCode = Array.from(schemaDefinitions.entries())
      .map(([name, code]) => `const ${name} = ${code}`)
      .join('\n')

    // Add final return statement for the main schema
    const fullCode = `
      ${contextCode}
      return schema
    `

    try {
      const createSchema = new Function('z', fullCode)
      const evalResult = createSchema(z)
      if (evalResult instanceof z.ZodObject) {
        schema = evalResult
      }
    } catch (error) {
      console.error(`❌ Error evaluating schema in ${schemaPath}:`, error)
    }

    if (!schema) {
      console.log(`⏭️  Skipping ${schemaPath} - no valid schema found`)
      return null
    }

    return {
      schemaPath,
      dataPath,
      schema,
      hasMockData,
    }
  } catch (error) {
    console.error(`❌ Error processing ${schemaPath}:`, error)
    return null
  }
}

function generatePrompt(schema: z.ZodObject<any>): string {
  const descriptions: Record<string, string> = {}

  for (const [key, value] of Object.entries(schema.shape)) {
    if (value instanceof z.ZodType && '_def' in value) {
      const description = value._def.description
      if (description) {
        descriptions[key] = description
      }
    }
  }

  const fields = Object.entries(descriptions)
    .map(([key, desc]) => `- ${key}: ${desc}`)
    .join('\n')

  return `You are an AI assistant for a CMS system, please generate content based on the following field descriptions:

${fields}

Please ensure the generated content meets the requirements for each field.`
}

async function generateMockData(schemaInfo: SchemaInfo): Promise<void> {
  try {
    console.log(`🔄 Generating mock data for ${schemaInfo.schemaPath}...`)

    const prompt = generatePrompt(schemaInfo.schema)
    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      prompt,
      schema: schemaInfo.schema,
    })

    // Generate mock.ts content
    const schemaRelativePath = './schema'
    const mockDataString = JSON.stringify(object, null, 2)
    const newContent = `import type { FAQData } from '${schemaRelativePath}'

export const mockData = ${mockDataString} satisfies FAQData
`

    // Write the mock.ts file
    await writeFile(schemaInfo.dataPath, newContent)
    console.log(`✅ Created ${schemaInfo.dataPath}`)
  } catch (error) {
    console.error(`❌ Error generating mock data for ${schemaInfo.schemaPath}:`, error)
  }
}

async function main() {
  try {
    // Find all schema.ts files
    const schemaFiles = findSchemaFiles()
    console.log(`🔍 Found ${schemaFiles.length} schema files`)

    // Extract schemas from each file
    const schemaPromises = schemaFiles.map(extractSchema)
    const schemaResults = await Promise.all(schemaPromises)
    const validSchemas = schemaResults.filter((result): result is SchemaInfo => result !== null)

    if (validSchemas.length === 0) {
      console.log('⚠️  No valid schema files found that need updating')
      return
    }

    console.log(`\n🎯 Found ${validSchemas.length} files to process\n`)

    // Generate mock data for each schema
    for (const schemaInfo of validSchemas) {
      await generateMockData(schemaInfo)
    }

    console.log('\n✨ Mock data generation completed')
  } catch (error) {
    console.error('❌ Error in main process:', error)
    process.exit(1)
  }
}

main()
