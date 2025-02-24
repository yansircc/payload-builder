'use server'

import { z } from 'zod'
import { getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

const feature14Schema = z.object({
  features: z
    .array(
      z.object({
        title: z.string().min(1).describe('The title of the feature'),
        description: z.string().min(1).describe('A description for the feature'),
        list: z.array(
          z.object({
            icon: z
              .string()
              .min(1)
              .describe('A Lucide icon name that represents the feature (e.g., Star, Shield, Zap)'),
            text: z.string().min(1).describe('The text of the feature'),
          }),
        ),
      }),
    )
    .length(3),
})

export async function autogen() {
  try {
    const { object } = await getObject(feature14Schema, USER_PROMPT, SYSTEM_PROMPT)
    return object
  } catch (error) {
    console.error('Error generating Feature 13 content:', error)
    throw error
  }
}
