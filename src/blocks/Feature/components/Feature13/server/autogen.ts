'use server'

import { z } from 'zod'
import { getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

const feature13Schema = z.object({
  title: z.string().min(1).describe('A compelling headline for the Feature section (2-6 words)'),
  features: z
    .array(
      z.object({
        title: z.string().min(1).describe('The title of the feature'),
        description: z.string().min(1).describe('A description for the feature'),
      }),
    )
    .length(3),
})

export async function autogen() {
  try {
    const { object } = await getObject(feature13Schema, USER_PROMPT, SYSTEM_PROMPT)
    return object
  } catch (error) {
    console.error('Error generating Feature 13 content:', error)
    throw error
  }
}
