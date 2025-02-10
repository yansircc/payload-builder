import { readFile, writeFile } from 'fs/promises'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { glob } from 'glob'
import ts from 'typescript'
import { z } from 'zod'

interface SchemaInfo {
  filePath: string
  schema: z.ZodObject<any>
  hasMockData: boolean
}

function findMockFiles(): string[] {
  return glob.sync('src/**/mock.ts', {
    ignore: ['**/node_modules/**'],
  })
}

async function extractSchema(filePath: string): Promise<SchemaInfo | null> {
  try {
    const content = await readFile(filePath, 'utf-8')

    // Check if mockData already exists
    const hasMockData = content.includes('export const mockData =')
    if (hasMockData) {
      console.log(`⏭️  Skipping ${filePath} - mockData already exists`)
      return null
    }

    // Create source file
    const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true)

    let schema: z.ZodObject<any> | null = null

    // Find schema export
    function visit(node: ts.Node) {
      if (
        ts.isVariableStatement(node) &&
        node.modifiers?.some((mod) => mod.kind === ts.SyntaxKind.ExportKeyword)
      ) {
        const declaration = node.declarationList.declarations[0]
        if (ts.isIdentifier(declaration.name) && declaration.name.text === 'schema') {
          // Get the schema initialization code
          const schemaText = content.slice(declaration.pos, declaration.end)
          try {
            // Create a function that will execute in the context with z
            const createSchema = new Function('z', `return ${schemaText}`)
            const evalResult = createSchema(z)
            if (evalResult instanceof z.ZodObject) {
              schema = evalResult
            }
          } catch (error) {
            console.error(`❌ Error evaluating schema in ${filePath}:`, error)
          }
        }
      }
      ts.forEachChild(node, visit)
    }

    ts.forEachChild(sourceFile, visit)

    if (!schema) {
      console.log(`⏭️  Skipping ${filePath} - no valid schema found`)
      return null
    }

    return {
      filePath,
      schema,
      hasMockData,
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error)
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
    console.log(`🔄 Generating mock data for ${schemaInfo.filePath}...`)

    const prompt = generatePrompt(schemaInfo.schema)
    const { object } = await generateObject({
      model: openai('gpt-4o'),
      prompt,
      schema: schemaInfo.schema,
    })

    // Read the original file content
    const originalContent = await readFile(schemaInfo.filePath, 'utf-8')

    // Generate new content with mockData
    const mockDataString = JSON.stringify(object, null, 2)
    const newContent = `${originalContent}

export const mockData = ${mockDataString} as const
`

    // Write the updated content back to the file
    await writeFile(schemaInfo.filePath, newContent)
    console.log(`✅ Updated ${schemaInfo.filePath}`)
  } catch (error) {
    console.error(`❌ Error generating mock data for ${schemaInfo.filePath}:`, error)
  }
}

async function main() {
  try {
    // Find all mock.ts files
    const mockFiles = findMockFiles()
    console.log(`🔍 Found ${mockFiles.length} mock files`)

    // Extract schemas from each file
    const schemaPromises = mockFiles.map(extractSchema)
    const schemaResults = await Promise.all(schemaPromises)
    const validSchemas = schemaResults.filter((result): result is SchemaInfo => result !== null)

    if (validSchemas.length === 0) {
      console.log('⚠️  No valid mock files found that need updating')
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
