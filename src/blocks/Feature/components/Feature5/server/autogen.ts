'use server'

import { z } from 'zod'
import { getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

const feature5Schema = z.object({
  features: z
    .array(
      z.object({
        title: z.string().min(1).describe('The title of the feature'),
        description: z.string().min(1).describe('The description of the feature'),
        icon: z.string().min(1).describe('An icon name from the icon library,such as "ArrowRight"'),
      }),
    )
    .length(2),
  testimonial: z.object({
    quote: z.string().min(1).describe('The quote of the testimonial'),
    name: z.string().min(1).describe('The name of the testimonial'),
    role: z.string().min(1).describe('The role of the testimonial'),
    company: z.string().min(1).describe('The company of the testimonial'),
  }),
})

export async function autogen() {
  try {
    const { object } = await getObject(feature5Schema, USER_PROMPT, SYSTEM_PROMPT)
    return object
  } catch (error) {
    console.error('Error generating Feature 5 content:', error)
    throw error
  }
}
