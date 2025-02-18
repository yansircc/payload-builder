'use server'

import { z } from 'zod'
import type { CTA7Fields } from '@/payload-types'
import { getObjectStream } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../shared'

// Define the complete CTA schema
const cta7Schema = z.object({
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
        icon: z.string().describe('A Lucide icon name (e.g., Check, Star, Shield, Zap)'),
        text: z.string().describe('Brief feature description (5-10 words)'),
      }),
    )
    .min(1)
    .max(6),
})

// Type inference from schema
type CTA7Data = z.infer<typeof cta7Schema>

// Default configurations that match our schema
const DEFAULT_BUTTON_CONFIG = {
  type: 'custom' as const,
  url: '#',
  appearance: 'default' as const,
} as const

/**
 * Transforms raw CTA data by adding default configurations
 */
function transformCTA7Data(data: CTA7Data): CTA7Fields {
  const buttonLabel = data.links[0]?.link?.label || 'Get Started'

  return {
    title: data.title,
    subtitle: data.subtitle.toUpperCase(), // Convert subtitle to uppercase as per design
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
 * Generates CTA7 content using AI with streaming support
 */
export async function autogen() {
  try {
    const { stream, result } = await getObjectStream({
      schema: cta7Schema,
      prompt: USER_PROMPT,
      systemPrompt: SYSTEM_PROMPT,
    })

    return {
      stream,
      objectPromise: result.then(transformCTA7Data),
    }
  } catch (error) {
    console.error('Error generating CTA7 content:', error)
    throw error
  }
}
