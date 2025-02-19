'use server'

import { z } from 'zod'
import type { Feature2Fields } from '@/payload-types'
import { getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../shared/constants'

// Define the complete Feature 2 schema
const feature2Schema = z.object({
  title: z.string().min(1).describe('A compelling headline for the Feature section (2-6 words)'),
  description: z
    .string()
    .describe('A brief, engaging description that explains the value proposition (10-20 words)'),
  icon: z.string().min(1).describe('An icon name from the icon library,such as "ArrowRight"'),
  buttonGroup: z
    .array(
      z.object({
        link: z.object({
          label: z.string().min(1).describe('A clear, action-oriented button text (2-4 words)'),
        }),
      }),
    )
    .min(1)
    .max(2),
})

// Type inference from schema
type Feature2Data = z.infer<typeof feature2Schema>

// Default configurations that match our schema
const DEFAULT_BUTTON_GROUP_CONFIG = [
  {
    link: {
      type: 'custom' as const,
      url: '#',
      suffixIcon: 'ArrowRight',
      appearance: 'default' as const,
    },
  },
  {
    link: {
      type: 'custom' as const,
      url: '#',
      suffixIcon: 'ArrowRight',
      appearance: 'outline' as const,
    },
  },
] as const

/**
 * Transforms raw CTA data by adding default configurations
 */
function transformFeature2Data(data: Feature2Data): Partial<Feature2Fields> {
  return {
    ...data,
    buttonGroup: data.buttonGroup.map((button, index) => ({
      link: {
        ...(DEFAULT_BUTTON_GROUP_CONFIG[index]?.link || DEFAULT_BUTTON_GROUP_CONFIG[0].link),
        label: button.link.label,
      },
    })),
  }
}

/**
 * Generates Feature 2 content using AI with streaming support
 */
export async function autogen() {
  try {
    const { object } = await getObject(feature2Schema, USER_PROMPT, SYSTEM_PROMPT)
    return transformFeature2Data(object)
  } catch (error) {
    console.error('Error generating Feature 2 content:', error)
    throw error
  }
}
