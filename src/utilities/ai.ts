'use server'

import { openai as openaiSDK } from '@ai-sdk/openai'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
import { generateObject, streamObject } from 'ai'
import OpenAI from 'openai'
import { match } from 'ts-pattern'
import { z } from 'zod'
import type { Media } from '@/payload-types'
import { getSiteSettingsFromCookie } from '@/utilities/getSiteSettings'

// Remove top-level await
let openai: OpenAI | null = null
let aiSDK: ReturnType<typeof openaiSDK> | null = null

async function getOpenAIClient() {
  if (!openai) {
    const siteSettings = await getSiteSettingsFromCookie()
    if (!siteSettings?.ai?.openai) {
      throw new Error(
        'Missing API Key - please set it in the Site Settings by clicking on "Site Settings" in the sidebar and then going to the "AI" tab.',
      )
    }
    openai = new OpenAI({
      apiKey: siteSettings.ai.openai,
    })
  }
  return openai
}

async function getAISDK() {
  if (!aiSDK) {
    const siteSettings = await getSiteSettingsFromCookie()
    if (!siteSettings?.ai?.openai) {
      throw new Error(
        'Missing API Key - please set it in the Site Settings by clicking on "Site Settings" in the sidebar and then going to the "AI" tab.',
      )
    }
    process.env.OPENAI_API_KEY = siteSettings.ai.openai
    aiSDK = openaiSDK(AI_MODEL)
  }
  return aiSDK
}

const AI_MODEL = 'gpt-4o-mini' as const

// /**
//  * 从 schema 中提取字段描述
//  */
// function getSchemaDescriptions<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
//   const descriptions: Record<string, string> = {}

//   for (const [key, value] of Object.entries(schema.shape)) {
//     if (value instanceof z.ZodType && '_def' in value) {
//       const description = value._def.description
//       if (description) {
//         descriptions[key] = description
//       }
//     }
//   }

//   return descriptions
// }

// /**
//  * 生成 AI 提示文本
//  */
// function generatePrompt<T extends z.ZodRawShape>(schema: z.ZodObject<T>): string {
//   const descriptions = getSchemaDescriptions(schema)
//   const fields = Object.entries(descriptions)
//     .map(([key, desc]) => `- ${key}: ${desc}`)
//     .join('\n')

//   return `You are an AI assistant for a CMS system, please generate content based on the following field descriptions:

// ${fields}

// Please ensure the generated content meets the requirements for each field.`
// }

// function createSchemaFromField(field: ClientField): z.ZodTypeAny {
//   switch (field.type) {
//     case 'text':
//       const textSchema = z
//         .string()
//         .describe(typeof field.admin?.description === 'string' ? field.admin.description : '')
//       return field.required ? textSchema.min(1) : textSchema.optional()

//     case 'upload':
//       return z
//         .string()
//         .describe(typeof field.admin?.description === 'string' ? field.admin.description : '')
//         .optional()

//     case 'group':
//       const shape: Record<string, z.ZodTypeAny> = {}
//       field.fields.forEach((subField: ClientField) => {
//         if (subField.type === 'row' && 'fields' in subField) {
//           subField.fields.forEach((rowField: ClientField) => {
//             if ('name' in rowField && rowField.name && 'type' in rowField) {
//               shape[rowField.name] = createSchemaFromField(rowField)
//             }
//           })
//         } else if ('name' in subField && subField.name) {
//           shape[subField.name] = createSchemaFromField(subField)
//         }
//       })
//       return z
//         .object(shape)
//         .describe(typeof field.admin?.description === 'string' ? field.admin.description : '')

//     default:
//       return z.any().optional()
//   }
// }

/**
 * Use AI to generate object data
 */
export async function getObject<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
  prompt: string,
  systemPrompt?: string,
) {
  try {
    const model = await getAISDK()
    const object = await generateObject({
      model,
      prompt,
      schema,
      system: systemPrompt,
    })

    return object
  } catch (error) {
    console.error('Error generating content:', error)
    throw error
  }
}

/**
 * Enhanced object stream with better typing and error handling
 */
export async function getObjectStream<T extends z.ZodRawShape>({
  schema,
  prompt,
  systemPrompt,
}: {
  schema: z.ZodObject<T>
  prompt: string
  systemPrompt?: string
}) {
  const model = await getAISDK()
  const { partialObjectStream, object } = streamObject({
    model,
    schema,
    prompt,
    system: systemPrompt,
  })

  return {
    stream: partialObjectStream,
    result: object,
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
  const client = await getOpenAIClient()

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

  const completion = await client.chat.completions.create({
    messages: messages as any,
    model: AI_MODEL,
    max_tokens: 4096,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
  })

  return completion
}

interface GenerateImageOptions {
  width?: number
  height?: number
  quality?: 'standard' | 'hd'
  style?: 'natural' | 'vivid'
  model?: 'dall-e-2' | 'dall-e-3'
  size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792'
}

/**
 * Generates an image using DALL-E based on provided content
 * @param content - Object containing the content to base the image on
 * @param prompt - Optional custom prompt template
 * @param options - Configuration options for image generation
 * @returns Promise with the generated image URL or undefined if generation fails
 */
export async function generateImage(
  content: Record<string, string>,
  prompt?: string,
  options: GenerateImageOptions = {},
): Promise<string | undefined> {
  const client = await getOpenAIClient()
  try {
    const defaultPrompt = `Create a modern, metaphorical illustration that represents:
Title: "${content.title}"
Subtitle: "${content.subtitle}"

Style guidelines:
- Create a metaphorical and conceptual illustration that captures the essence of the message
- Use modern, minimalist design with clean lines and simple shapes
- Include subtle visual metaphors that relate to growth, progress, or the specific theme
- Incorporate aspirational and positive imagery
- Use a harmonious color palette that evokes the emotion of the message
- Ensure the illustration works well as a website hero or CTA section background
- Keep the design abstract enough to not overshadow text overlay
- Avoid text in the image
- Use soft gradients and lighting effects to create depth
- Include subtle patterns or textures where appropriate

The illustration should enhance the message while maintaining visual simplicity and professionalism.`

    const { quality = 'hd', style = 'natural', model = 'dall-e-3', size = '1792x1024' } = options

    const response = await client.images.generate({
      model,
      prompt: prompt || defaultPrompt,
      n: 1,
      size,
      quality,
      style,
    })

    return response.data[0]?.url
  } catch (error) {
    console.error('Error generating image with DALL-E:', error)
    return undefined
  }
}

async function fetchFileByURL(url: string): Promise<{
  name: string
  data: Buffer
  size: number
  mimetype: string
}> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()
  return {
    name: `ai-generated-${Date.now()}.webp`,
    data: Buffer.from(data),
    mimetype: 'image/webp',
    size: data.byteLength,
  }
}

/**
 * Generates an image using DALL-E and stores it in the Media collection
 * @param content - Object containing the content to base the image on
 * @param payload - Payload instance
 * @param options - Configuration options for image generation
 * @returns Promise with the stored Media object or undefined if generation fails
 */
export async function generateAndStoreImage(
  content: Record<string, string>,
  payload: any,
  options: GenerateImageOptions = {},
  tenant?: string,
): Promise<Media | undefined> {
  try {
    // Generate image URL using DALL-E
    const imageUrl = await generateImage(content, undefined, options)
    if (!imageUrl) return undefined

    // Fetch and prepare the file
    const file = await fetchFileByURL(imageUrl)

    // Store in Media collection with tenant
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: `AI generated image for ${Object.values(content).join(' - ')}`,
        tenant: tenant,
      },
      file: file,
    })

    return media
  } catch (error) {
    console.error('Error generating and storing image:', error)
    return undefined
  }
}
