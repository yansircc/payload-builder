'use server'

import { z } from 'zod'
import { getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../shared/constants'

// Define the complete FAQ schema
const faqSchema = z.object({
  title: z.string().min(1).describe('A clear, descriptive title for the FAQ section (3-8 words)'),
  faqs: z
    .array(
      z.object({
        question: z.string().min(1).describe('A clear, concise question (5-15 words)'),
        answer: z.string().min(1).describe('A helpful, informative answer (20-50 words)'),
      }),
    )
    .min(1)
    .max(6)
    .describe('A list of frequently asked questions and their answers'),
})

/**
 * Generates FAQ content using AI with streaming support
 */
export async function autogen() {
  try {
    const { object } = await getObject(faqSchema, USER_PROMPT, SYSTEM_PROMPT)
    return object
  } catch (error) {
    console.error('Error generating FAQ content:', error)
    throw error
  }
}
