'use server'

import { z } from 'zod'
import type { CTA4Fields } from '@/payload-types'
import { getObjectStream } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../shared'

// Define the complete CTA schema
const cta4Schema = z.object({
  title: z.string().min(1).describe('A compelling headline for the CTA section (2-6 words)'),
  subtitle: z
    .string()
    .describe('A brief, engaging description that explains the value proposition (10-20 words)'),
  links: z
    .array(
      z.object({
        link: z.object({
          label: z.string().min(1).describe('A clear, action-oriented button text (2-4 words)'),
        }),
      }),
    )
    .length(1),
  lists: z
    .array(
      z.object({
        icon: z.string().describe('A Lucide icon name (e.g., Check, Star, Shield)'),
        text: z.string().describe('Brief feature description (5-10 words)'),
      }),
    )
    .min(1)
    .max(6),
})

// Type inference from schema
type CTA4Data = z.infer<typeof cta4Schema>

// Default configurations that match our schema
const DEFAULT_BUTTON_CONFIG = {
  type: 'custom' as const,
  url: '#',
  suffixIcon: 'ArrowRight',
  appearance: 'default' as const,
} as const

/**
 * Transforms raw CTA data by adding default configurations
 */
function transformCTA4Data(data: CTA4Data): CTA4Fields {
  const buttonLabel = data.links[0]?.link?.label || 'Get Started'

  return {
    title: data.title,
    subtitle: data.subtitle,
    links: [
      {
        id: '1',
        link: {
          ...DEFAULT_BUTTON_CONFIG,
          label: buttonLabel,
        },
      },
    ],
    lists: data.lists.map((item, index) => ({
      id: String(index + 1),
      icon: item.icon || 'Check',
      text: item.text,
    })),
  }
}

/**
 * Generates CTA4 content using AI with streaming support
 */
export async function autogen() {
  try {
    const { stream, result } = await getObjectStream({
      schema: cta4Schema,
      prompt: USER_PROMPT,
      systemPrompt: SYSTEM_PROMPT,
    })

    return {
      stream,
      objectPromise: result.then(transformCTA4Data),
    }
  } catch (error) {
    console.error('Error generating CTA4 content:', error)
    throw error
  }
}
