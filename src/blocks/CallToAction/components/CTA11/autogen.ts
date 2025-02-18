'use server'

import { z } from 'zod'
import type { CTA11Fields } from '@/payload-types'
import { getObjectStream } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../shared'

// Define the complete CTA schema
const cta11Schema = z.object({
  title: z.string().min(1).describe('A compelling headline for the CTA section (2-6 words)'),
  subtitle: z
    .string()
    .describe('A brief, engaging description that explains the value proposition (10-20 words)'),
  links: z
    .array(
      z.object({
        link: z.object({
          label: z.string().min(1).describe('A clear, action-oriented button text (2-4 words)'),
          appearance: z.enum(['default', 'ghost']).optional(),
        }),
      }),
    )
    .min(1)
    .max(2),
})

// Type inference from schema
type CTA11Data = z.infer<typeof cta11Schema>

// Default configurations that match our schema
const DEFAULT_PRIMARY_BUTTON = {
  type: 'custom' as const,
  url: '#',
  appearance: 'default' as const,
} as const

const DEFAULT_SECONDARY_BUTTON = {
  type: 'custom' as const,
  url: '#',
  appearance: 'ghost' as const,
} as const

/**
 * Transforms raw CTA data by adding default configurations
 */
function transformCTA11Data(data: CTA11Data): CTA11Fields {
  const primaryLabel = data.links[0]?.link?.label || 'Get Started'
  const secondaryLabel = data.links[1]?.link?.label

  return {
    title: data.title,
    subtitle: data.subtitle,
    links: [
      {
        id: '1',
        link: {
          ...DEFAULT_PRIMARY_BUTTON,
          label: primaryLabel,
        },
      },
      // Add secondary button if provided
      ...(secondaryLabel
        ? [
            {
              id: '2',
              link: {
                ...DEFAULT_SECONDARY_BUTTON,
                label: secondaryLabel,
              },
            },
          ]
        : []),
    ],
  }
}

/**
 * Generates CTA11 content using AI with streaming support
 */
export async function autogen() {
  try {
    const { stream, result } = await getObjectStream({
      schema: cta11Schema,
      prompt: USER_PROMPT,
      systemPrompt: SYSTEM_PROMPT,
    })

    return {
      stream,
      objectPromise: result.then(transformCTA11Data),
    }
  } catch (error) {
    console.error('Error generating CTA11 content:', error)
    throw error
  }
}
