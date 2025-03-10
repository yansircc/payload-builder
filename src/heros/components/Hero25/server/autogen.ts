'use server'

import { z } from 'zod'
import type { Hero25Fields } from '@/payload-types'
import { getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

// Define the complete Hero25 schema
const hero25Schema = z.object({
  title: z
    .string()
    .min(1)
    .max(100)
    .describe('A compelling headline for the hero section (5-8 words)'),
  badge: z.string().optional().describe('A short, attention-grabbing badge text (2-3 words)'),
  links: z
    .array(
      z.object({
        link: z.object({
          label: z.string().min(1).describe('A clear, action-oriented button text (2-4 words)'),
        }),
      }),
    )
    .min(1)
    .max(2),
  features: z
    .array(
      z.object({
        icon: z.string().describe('A Lucide icon name (e.g., Check, Star, Shield, Zap)'),
        title: z.string().describe('Brief feature title (2-4 words)'),
      }),
    )
    .min(1)
    .max(4),
})

// Type inference from schema
type Hero25Data = z.infer<typeof hero25Schema>

// Default configurations that match our schema
const DEFAULT_BUTTON_CONFIG = {
  type: 'custom' as const,
  url: '#',
  suffixIcon: 'MoveRight',
  appearance: 'default' as const,
} as const

/**
 * Transforms raw Hero25 data by adding default configurations
 */
function transformHero25Data(data: Hero25Data): Hero25Fields {
  return {
    title: data.title,
    badge: data.badge,
    links: data.links.map((item, index) => ({
      id: String(index + 1),
      link: {
        ...DEFAULT_BUTTON_CONFIG,
        label: item.link.label,
      },
    })),
    features: data.features.map((item, index) => ({
      id: String(index + 1),
      icon: item.icon || 'Zap',
      title: item.title,
    })),
  }
}

/**
 * Generates Hero25 content using AI with streaming support
 */
export async function autogen() {
  try {
    const { object } = await getObject(hero25Schema, USER_PROMPT, SYSTEM_PROMPT)
    return transformHero25Data(object)
  } catch (error) {
    console.error('Error generating Hero25 content:', error)
    throw error
  }
}
