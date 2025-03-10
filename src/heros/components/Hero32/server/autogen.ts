'use server'

import { z } from 'zod'
import type { Hero32Fields } from '@/payload-types'
import { getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

// Define the complete Hero32 schema
const hero32Schema = z.object({
  title: z.string().min(1).describe('A compelling headline for the hero section (5-8 words)'),
  subtitle: z
    .string()
    .describe('A brief, engaging description that explains the value proposition (10-15 words)'),
  link: z.object({
    label: z.string().min(1).describe('A clear, action-oriented button text (2-4 words)'),
    url: z.string().url().describe('The URL the button should link to'),
  }),
  integrations: z
    .array(
      z.object({
        // We'll use a placeholder string here, but in the transform function
        // we'll handle this differently since we can't generate actual Media objects
        imagePlaceholder: z.string().describe('A placeholder for integration logo/image'),
      }),
    )
    .length(15)
    .describe('A grid of 15 integration logos/images'),
})

// Type inference from schema
type Hero32Data = z.infer<typeof hero32Schema>

/**
 * Transforms raw Hero32 data by adding default configurations
 */
function transformHero32Data(data: Hero32Data): Hero32Fields {
  return {
    title: data.title,
    subtitle: data.subtitle,
    link: {
      label: data.link.label,
      url: data.link.url || '#',
    },
    // For the integrations, we'll return null since we can't generate actual Media references
    // In a real implementation, you would need to handle this differently
    integrations: null,
  }
}

/**
 * Generates Hero32 content using AI with streaming support
 */
export async function autogen() {
  try {
    const { object } = await getObject(hero32Schema, USER_PROMPT, SYSTEM_PROMPT)
    return transformHero32Data(object)
  } catch (error) {
    console.error('Error generating Hero32 content:', error)
    throw error
  }
}
