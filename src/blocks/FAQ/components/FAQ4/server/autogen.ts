'use server'

import { z } from 'zod'
import type { FAQ4Fields } from '@/payload-types'
import { getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

// Simplified schema definition, only includes fields needed for AI generation
const faqSchema = z.object({
  title: z.string().min(1).describe('FAQ section title (3-8 words)'),
  subtitle: z.string().min(1).describe('FAQ section context (10-20 words)'),
  description: z.string().min(1).describe('FAQ section description (10-20 words)'),
  faqs: z
    .array(
      z.object({
        question: z.string().min(1).describe('Clear question (5-15 words)'),
        answer: z.string().min(1).describe('Helpful answer (20-50 words)'),
      }),
    )
    .length(6),
  support: z.object({
    title: z.string().min(1).describe('Support section title (4-8 words)'),
    subtitle: z.string().min(1).describe('Encouraging message (15-25 words)'),
    supportLink: z
      .array(
        z.object({
          link: z.object({
            label: z.string().min(1).describe('Support action label'),
          }),
        }),
      )
      .length(1), // Changed to 1 to match Payload config
  }),
})

// Default link configuration
const DEFAULT_LINKS = [{ type: 'custom', url: '#', appearance: 'default' }] as const

/**
 * Generates FAQ content using AI and transforms to required format
 */
export async function autogen(): Promise<FAQ4Fields> {
  try {
    const { object } = await getObject(faqSchema, USER_PROMPT, SYSTEM_PROMPT)

    // Convert data structure directly in return
    return {
      ...object,
      faqs: object.faqs.map((faq, i) => ({ ...faq, id: String(i + 1) })),
      support: {
        ...object.support,
        supportLink: object.support.supportLink.map((item, i) => ({
          id: `support-link-${Date.now()}-${i}`,
          link: { ...item.link, ...DEFAULT_LINKS[i] },
        })),
      },
    }
  } catch (error) {
    console.error('Error generating FAQ content:', error)
    throw error
  }
}
