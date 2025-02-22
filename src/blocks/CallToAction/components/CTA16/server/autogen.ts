'use server'

import { z } from 'zod'
import type { CTA16Fields } from '@/payload-types'
import { getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

// Define the complete CTA schema
const cta16Schema = z.object({
  title: z.string().min(1).describe('A compelling headline for the CTA section (2-6 words)'),
  subtitle: z
    .string()
    .describe('A brief, engaging description that explains the value proposition (10-20 words)'),
  icon: z
    .string()
    .describe('A Lucide icon name that represents the action or value (e.g., Star, Users, Rocket)'),
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
    .max(2)
    .describe('Primary and secondary CTA buttons'),
})

// Type inference from schema
type CTA16Data = z.infer<typeof cta16Schema>

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
function transformCTA16Data(data: CTA16Data): Partial<CTA16Fields> {
  const primaryLabel = data.links[0]?.link?.label || 'Get Started'
  const secondaryLabel = data.links[1]?.link?.label

  return {
    title: data.title,
    subtitle: data.subtitle,
    icon: data.icon,
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
 * Generates CTA16 content using AI with streaming support
 */
export async function autogen() {
  try {
    const { object } = await getObject(cta16Schema, USER_PROMPT, SYSTEM_PROMPT)
    return transformCTA16Data(object)
  } catch (error) {
    console.error('Error generating CTA16 content:', error)
    throw error
  }
}
