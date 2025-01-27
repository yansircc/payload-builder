import { deepseek } from '@ai-sdk/deepseek'
import { generateObject } from 'ai'
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

/**
 * 使用 AI 生成对象数据
 */
export async function getObject<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
): Promise<z.infer<z.ZodObject<T>>> {
  console.log('AI is generating object data')
  const prompt = generatePrompt(schema)

  const { object } = await generateObject({
    model: deepseek('deepseek-chat'),
    prompt,
    schema,
  })

  console.log('AI generated data:', JSON.stringify(object, null, 2))
  return object
}
