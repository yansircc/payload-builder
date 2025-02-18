'use server'

import { z } from 'zod'
import type { CTA1Fields } from '@/payload-types'
import { getObjectStream } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../shared'

// Define the complete CTA schema
const ctaSchema = z.object({
  title: z.string().min(1).describe('A compelling headline for the CTA section (2-6 words)'),
  subtitle: z
    .string()
    .describe('A brief, engaging description that explains the value proposition (10-20 words)'),
  icon: z
    .string()
    .describe('A Lucide icon name that represents the action or value (e.g., Star, Users, Rocket)'),
  btn: z.object({
    label: z.string().min(1).describe('A clear, action-oriented button text (2-4 words)'),
  }),
})

// Type inference from schema
type CTAData = z.infer<typeof ctaSchema>

// Default button configuration that matches our schema
const DEFAULT_BUTTON_CONFIG = {
  type: 'custom' as const,
  url: '#',
  suffixIcon: 'ArrowRight',
  appearance: 'default' as const,
} satisfies Partial<CTA1Fields['btn']>

/**
 * Transforms raw CTA data by adding default button configuration
 */
function transformCTAData(data: CTAData): CTA1Fields {
  return {
    ...data,
    btn: {
      ...DEFAULT_BUTTON_CONFIG,
      label: data.btn.label,
    },
  }
}

/**
 * Generates CTA content using AI with streaming support
 */
export async function autogen() {
  try {
    const { stream, result } = await getObjectStream({
      schema: ctaSchema,
      prompt: USER_PROMPT,
      systemPrompt: SYSTEM_PROMPT,
    })

    return {
      stream,
      objectPromise: result.then(transformCTAData),
    }
  } catch (error) {
    console.error('Error generating CTA content:', error)
    throw error
  }
}
