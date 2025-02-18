'use server'

import { openai as openaiSDK } from '@ai-sdk/openai'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
import { generateObject } from 'ai'
import OpenAI from 'openai'
import type { ClientField } from 'payload'
import { match } from 'ts-pattern'
import { z } from 'zod'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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
      model: openaiSDK('gpt-4o-mini'),
      prompt,
      schema,
    })

    return object
  } catch (error) {
    console.error('Error generating content:', error)
    throw error
  }
}

export type AIOption = 'continue' | 'improve' | 'shorter' | 'longer' | 'fix' | 'zap'

interface AIRequestParams {
  prompt: string
  option: AIOption
  command?: string
  ip?: string
}

export async function processAIRequest({ prompt, option, command, ip }: AIRequestParams) {
  // Check if the OPENAI_API_KEY is set
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '') {
    throw new Error('Missing OPENAI_API_KEY - make sure to add it to your .env file.')
  }

  // Rate limiting
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN && ip) {
    const ratelimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(50, '1 d'),
    })

    const { success, limit, reset, remaining } = await ratelimit.limit(`novel_ratelimit_${ip}`)

    if (!success) {
      throw new Error(
        JSON.stringify({
          message: 'You have reached your request limit for the day.',
          limit,
          remaining,
          reset,
        }),
      )
    }
  }

  const messages = match(option)
    .with('continue', () => [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that continues existing text based on context from prior text. ' +
          'Give more weight/priority to the later characters than the beginning ones. ' +
          'Limit your response to no more than 200 characters, but make sure to construct complete sentences.' +
          'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ])
    .with('improve', () => [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that improves existing text. ' +
          'Limit your response to no more than 200 characters, but make sure to construct complete sentences.' +
          'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: `The existing text is: ${prompt}`,
      },
    ])
    .with('shorter', () => [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that shortens existing text. ' +
          'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: `The existing text is: ${prompt}`,
      },
    ])
    .with('longer', () => [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that lengthens existing text. ' +
          'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: `The existing text is: ${prompt}`,
      },
    ])
    .with('fix', () => [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that fixes grammar and spelling errors in existing text. ' +
          'Limit your response to no more than 200 characters, but make sure to construct complete sentences.' +
          'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: `The existing text is: ${prompt}`,
      },
    ])
    .with('zap', () => [
      {
        role: 'system',
        content:
          'You area an AI writing assistant that generates text based on a prompt. ' +
          'You take an input from the user and a command for manipulating the text' +
          'Use Markdown formatting when appropriate.',
      },
      {
        role: 'user',
        content: `For this text: ${prompt}. You have to respect the command: ${command}`,
      },
    ])
    .run()

  const completion = await openai.chat.completions.create({
    messages: messages as any,
    model: 'gpt-4',
    max_tokens: 4096,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
  })

  return completion
}
