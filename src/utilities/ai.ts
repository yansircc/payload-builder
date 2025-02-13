'use server'

import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import type { ClientField } from 'payload'
import { z } from 'zod'

/**
 * 从 schema 中提取字段描述
 */
function getSchemaDescriptions<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  const descriptions: Record<string, string> = {}

  for (const [key, value] of Object.entries(schema.shape)) {
    if (value instanceof z.ZodType && '_def' in value) {
      const description = value._def.description
      if (description) {
        descriptions[key] = description
      }
    }
  }

  return descriptions
}

/**
 * 生成 AI 提示文本
 */
function generatePrompt<T extends z.ZodRawShape>(schema: z.ZodObject<T>): string {
  const descriptions = getSchemaDescriptions(schema)
  const fields = Object.entries(descriptions)
    .map(([key, desc]) => `- ${key}: ${desc}`)
    .join('\n')

  return `You are an AI assistant for a CMS system, please generate content based on the following field descriptions:

${fields}

Please ensure the generated content meets the requirements for each field.`
}

function createSchemaFromField(field: ClientField): z.ZodTypeAny {
  switch (field.type) {
    case 'text':
      const textSchema = z
        .string()
        .describe(typeof field.admin?.description === 'string' ? field.admin.description : '')
      return field.required ? textSchema.min(1) : textSchema.optional()

    case 'upload':
      return z
        .string()
        .describe(typeof field.admin?.description === 'string' ? field.admin.description : '')
        .optional()

    case 'group':
      const shape: Record<string, z.ZodTypeAny> = {}
      field.fields.forEach((subField: ClientField) => {
        if (subField.type === 'row' && 'fields' in subField) {
          subField.fields.forEach((rowField: ClientField) => {
            if ('name' in rowField && rowField.name && 'type' in rowField) {
              shape[rowField.name] = createSchemaFromField(rowField)
            }
          })
        } else if ('name' in subField && subField.name) {
          shape[subField.name] = createSchemaFromField(subField)
        }
      })
      return z
        .object(shape)
        .describe(typeof field.admin?.description === 'string' ? field.admin.description : '')

    default:
      return z.any().optional()
  }
}

/**
 * 使用 AI 生成对象数据
 */
export async function getObject(fields: ClientField[]) {
  try {
    // Create schema from field configuration
    const fieldsSchema: Record<string, z.ZodTypeAny> = {}
    fields.forEach((field: ClientField) => {
      if ('name' in field && field.name) {
        fieldsSchema[field.name] = createSchemaFromField(field)
      }
    })

    const schema = z.object(fieldsSchema)
    const prompt = generatePrompt(schema)

    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      prompt,
      schema,
    })

    return object
  } catch (error) {
    console.error('Error generating content:', error)
    throw error
  }
}
