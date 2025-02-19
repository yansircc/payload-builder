'use server'

import { z } from 'zod'
import type { CTA3Fields } from '@/payload-types'
import { getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../shared/constants'

// Define the complete CTA schema
const cta3Schema = z.object({
  title: z.string().min(1).describe('A compelling headline for the CTA section (2-6 words)'),
  subtitle: z
    .string()
    .describe('A brief, engaging description that explains the value proposition (10-20 words)'),
  buttons: z
    .array(
      z.object({
        link: z.object({
          label: z.string().min(1).describe('A clear, action-oriented button text (2-4 words)'),
        }),
      }),
    )
    .min(1)
    .max(2),
  list: z
    .array(
      z.object({
        link: z.object({
          label: z.string().min(1).describe('A feature name or benefit (2-4 words)'),
          description: z
            .string()
            .describe('A brief description of the feature or benefit (10-15 words)'),
        }),
      }),
    )
    .min(1)
    .max(5),
})

// Type inference from schema
type CTA3Data = z.infer<typeof cta3Schema>

// Default configurations that match our schema
const DEFAULT_BUTTON_CONFIG = {
  type: 'custom' as const,
  url: '#',
  suffixIcon: 'ArrowRight',
  appearance: 'default' as const,
} as const

const DEFAULT_LIST_ITEM_CONFIG = {
  type: 'custom' as const,
  url: '#',
  suffixIcon: 'ChevronRight',
  appearance: 'ghost' as const,
} as const

/**
 * Transforms raw CTA data by adding default configurations
 */
function transformCTA3Data(data: CTA3Data): CTA3Fields {
  return {
    title: data.title,
    subtitle: data.subtitle,
    buttons: data.buttons.map(({ link }) => ({
      link: {
        ...DEFAULT_BUTTON_CONFIG,
        label: link.label,
      },
    })),
    list: data.list.map(({ link }) => ({
      description: link.description,
      link: {
        ...DEFAULT_LIST_ITEM_CONFIG,
        label: link.label,
      },
    })),
  }
}

/**
 * Generates CTA3 content using AI with streaming support
 */
export async function autogen() {
  try {
    const { object } = await getObject(cta3Schema, USER_PROMPT, SYSTEM_PROMPT)
    return transformCTA3Data(object)
  } catch (error) {
    console.error('Error generating CTA3 content:', error)
    throw error
  }
}
