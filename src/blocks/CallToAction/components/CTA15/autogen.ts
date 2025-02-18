'use server'

import { z } from 'zod'
import type { CTA15Fields } from '@/payload-types'
import { getObjectStream } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../shared'

// Define the complete CTA schema
const cta15Schema = z.object({
  heading: z.string().describe('A short, engaging text above the title (2-4 words)'),
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
type CTA15Data = z.infer<typeof cta15Schema>

// Default configurations that match our schema
const DEFAULT_PRIMARY_BUTTON = {
  type: 'custom' as const,
  url: '#',
  suffixIcon: 'ArrowRight',
  appearance: 'default' as const,
} as const

const DEFAULT_SECONDARY_BUTTON = {
  type: 'custom' as const,
  url: '#',
  suffixIcon: 'ArrowRight',
  appearance: 'ghost' as const,
} as const

/**
 * Transforms raw CTA data by adding default configurations
 */
function transformCTA15Data(data: CTA15Data): Partial<CTA15Fields> {
  const primaryLabel = data.links[0]?.link?.label || 'Get Started'
  const secondaryLabel = data.links[1]?.link?.label

  return {
    heading: data.heading,
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
 * Generates CTA15 content using AI with streaming support
 */
export async function autogen() {
  try {
    const { stream, result } = await getObjectStream({
      schema: cta15Schema,
      prompt: USER_PROMPT,
      systemPrompt: SYSTEM_PROMPT,
    })

    return {
      stream,
      objectPromise: result.then(transformCTA15Data),
    }
  } catch (error) {
    console.error('Error generating CTA15 content:', error)
    throw error
  }
}
