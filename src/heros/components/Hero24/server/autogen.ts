'use server'

import { z } from 'zod'
import type { Hero24Fields } from '@/payload-types'
import { getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

// Define the complete Hero24 schema
const hero24Schema = z.object({
  title: z.string().min(1).describe('A compelling headline for the hero section (5-8 words)'),
  subtitle: z
    .string()
    .describe('A brief, engaging description that explains the value proposition (10-15 words)'),
  badge: z.string().describe('A short, attention-grabbing badge text (2-3 words)'),
  links: z
    .array(
      z.object({
        link: z.object({
          label: z.string().min(1).describe('A clear, action-oriented button text (2-4 words)'),
        }),
      }),
    )
    .length(1),
  features: z
    .array(
      z.object({
        icon: z.string().describe('A Lucide icon name (e.g., Check, Star, Shield, Zap)'),
        title: z.string().describe('Brief feature title (2-4 words)'),
        description: z.string().describe('Brief feature description (5-10 words)'),
      }),
    )
    .length(4),
})

// Type inference from schema
type Hero24Data = z.infer<typeof hero24Schema>

// Default configurations that match our schema
const DEFAULT_BUTTON_CONFIG = {
  type: 'custom' as const,
  url: '#',
  suffixIcon: 'MoveRight',
  appearance: 'default' as const,
} as const

/**
 * Transforms raw Hero24 data by adding default configurations
 */
function transformHero24Data(data: Hero24Data): Hero24Fields {
  const buttonLabel = data.links[0]?.link?.label || 'Get Started'

  return {
    title: data.title,
    subtitle: data.subtitle,
    badge: data.badge,
    links: [
      {
        id: '1',
        link: {
          ...DEFAULT_BUTTON_CONFIG,
          label: buttonLabel,
        },
      },
    ],
    features: data.features.map((item, index) => ({
      id: String(index + 1),
      icon: item.icon || 'Zap',
      title: item.title,
      description: item.description,
    })),
  }
}

/**
 * Generates Hero24 content using AI with streaming support
 */
export async function autogen() {
  try {
    const { object } = await getObject(hero24Schema, USER_PROMPT, SYSTEM_PROMPT)
    return transformHero24Data(object)
  } catch (error) {
    console.error('Error generating Hero24 content:', error)
    throw error
  }
}
