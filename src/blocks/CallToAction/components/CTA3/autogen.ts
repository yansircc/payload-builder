'use server'

import { z } from 'zod'
import type { CTA3Fields } from '@/payload-types'
import { getObjectStream } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../shared/autogen'

// Base link schema
const baseLinkSchema = z.object({
  type: z.literal('custom'),
  url: z.string().default('#'),
  label: z.string().min(1),
  suffixIcon: z.string(),
  appearance: z.enum(['default', 'ghost']),
})

// Define the complete CTA schema
const cta3Schema = z.object({
  title: z.string().min(1).max(100).describe('A compelling headline for the CTA section'),
  subtitle: z
    .string()
    .describe('A brief, engaging description that explains the value proposition'),
  buttons: z
    .array(
      z.object({
        link: baseLinkSchema
          .extend({
            appearance: z.literal('default'),
          })
          .describe('Primary CTA button that should convey a strong call-to-action'),
      }),
    )
    .min(1)
    .max(2),
  list: z
    .array(
      z.object({
        link: baseLinkSchema.extend({
          appearance: z.literal('ghost'),
        }),
        description: z.string().min(1).describe('Brief description of the feature'),
      }),
    )
    .min(1)
    .max(5),
})

// Type inference from schema
type CTAData = z.infer<typeof cta3Schema>

/**
 * Transforms raw CTA data by ensuring proper structure
 */
function transformCTAData(data: CTAData): CTA3Fields {
  return {
    ...data,
    buttons: data.buttons.map((button) => ({
      link: {
        ...button.link,
        type: 'custom',
        suffixIcon: button.link.suffixIcon || 'ArrowRight',
      },
    })),
    list: data.list.map((item) => ({
      link: {
        ...item.link,
        type: 'custom',
        suffixIcon: item.link.suffixIcon || 'ChevronRight',
        appearance: 'ghost',
      },
      description: item.description,
    })),
  }
}

/**
 * Generates CTA content using AI with streaming support
 */
export async function autogen() {
  try {
    const { stream, result } = await getObjectStream({
      schema: cta3Schema,
      prompt: USER_PROMPT,
      systemPrompt: SYSTEM_PROMPT,
    })

    return {
      stream,
      objectPromise: result.then(transformCTAData),
    }
  } catch (error) {
    console.error('Error generating CTA3 content:', error)
    throw error
  }
}
