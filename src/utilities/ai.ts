import { deepseek } from '@ai-sdk/deepseek'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
import { generateObject } from 'ai'
import OpenAI from 'openai'
import { match } from 'ts-pattern'
import { z } from 'zod'
import { getSiteSettings } from '@/utilities/getSiteSettings'

// Remove top-level await
let openai: OpenAI | null = null

async function getOpenAIClient() {
  if (!openai) {
    const siteSettings = await getSiteSettings()
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

export type AIOption = 'continue' | 'improve' | 'shorter' | 'longer' | 'fix' | 'zap'

interface CompanyContext {
  brandIdentity?: string
  otherBrandIdentity?: string
  industryFocus?: string
  otherIndustryFocus?: string
  targetAudience?: string
  secondaryAudiences?: string[]
  audienceNotes?: string
}

interface AIRequestParams {
  prompt: string
  option: AIOption
  command?: string
  ip?: string
  companyContext?: CompanyContext
}

function generateContextPrompt(companyContext?: CompanyContext): string {
  if (!companyContext) return ''

  const contextParts = []

  if (companyContext.brandIdentity || companyContext.otherBrandIdentity) {
    contextParts.push(
      `Brand Identity: ${companyContext.otherBrandIdentity || companyContext.brandIdentity}`,
    )
  }

  if (companyContext.industryFocus || companyContext.otherIndustryFocus) {
    contextParts.push(
      `Industry: ${companyContext.otherIndustryFocus || companyContext.industryFocus}`,
    )
  }

  if (companyContext.targetAudience) {
    contextParts.push(`Primary Audience: ${companyContext.targetAudience}`)
  }

  if (companyContext.secondaryAudiences?.length) {
    contextParts.push(`Secondary Audiences: ${companyContext.secondaryAudiences.join(', ')}`)
  }

  if (companyContext.audienceNotes) {
    contextParts.push(`Additional Context: ${companyContext.audienceNotes}`)
  }

  if (contextParts.length === 0) return ''

  return `Consider the following company context while generating content:
${contextParts.join('\n')}

`
}

export async function processAIRequest({
  prompt,
  option,
  command,
  ip,
  companyContext: providedCompanyContext,
}: AIRequestParams) {
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

  // Get company context from site settings if not provided
  let companyContext = providedCompanyContext
  if (!companyContext) {
    try {
      const siteSettings = await getSiteSettings()
      if (siteSettings) {
        companyContext = {
          brandIdentity: siteSettings.brandIdentity || undefined,
          otherBrandIdentity: siteSettings.otherBrandIdentity || undefined,
          industryFocus: siteSettings.industryFocus || undefined,
          otherIndustryFocus: siteSettings.otherIndustryFocus || undefined,
          targetAudience: siteSettings.targetAudience || undefined,
          secondaryAudiences: siteSettings.secondaryAudiences || undefined,
          audienceNotes: siteSettings.audienceNotes || undefined,
        }
      }
    } catch (error) {
      console.error('Error fetching site settings:', error)
    }
  }

  const contextPrompt = generateContextPrompt(companyContext)

  const messages = match(option)
    .with('continue', () => [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that continues existing text based on context from prior text. ' +
          'Give more weight/priority to the later characters than the beginning ones. ' +
          'Limit your response to no more than 200 characters, but make sure to construct complete sentences.' +
          'Use Markdown formatting when appropriate.\n\n' +
          contextPrompt,
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
          'Use Markdown formatting when appropriate.\n\n' +
          contextPrompt,
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
          'Use Markdown formatting when appropriate.\n\n' +
          contextPrompt,
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
          'Use Markdown formatting when appropriate.\n\n' +
          contextPrompt,
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
          'Use Markdown formatting when appropriate.\n\n' +
          contextPrompt,
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
          'You take an input from the user and a command for manipulating the text. ' +
          'Use Markdown formatting when appropriate.\n\n' +
          contextPrompt,
      },
      {
        role: 'user',
        content: `For this text: ${prompt}. You have to respect the command: ${command}`,
      },
    ])
    .run()

  const completion = await client.chat.completions.create({
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
