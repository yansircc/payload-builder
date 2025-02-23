'use server'

import { z } from 'zod'
import { getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

// Define the complete Feature 3 schema
const feature3Schema = z.object({
  title: z.string().min(1).describe('A compelling headline for the Feature section (2-6 words)'),
  features: z.array(
    z.object({
      title: z.string().min(1).describe('The title of the feature'),
      description: z.string().min(1).describe('The description of the feature'),
      icon: z.string().min(1).describe('An icon name from the icon library,such as "ArrowRight"'),
    }),
  ),
})

/**
 * Generates Feature 2 content using AI with streaming support
 */
export async function autogen() {
  try {
    const { object } = await getObject(feature3Schema, USER_PROMPT, SYSTEM_PROMPT)
    return object
  } catch (error) {
    console.error('Error generating Feature 3 content:', error)
    throw error
  }
}
