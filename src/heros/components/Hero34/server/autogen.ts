'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'
import { cookies } from 'next/headers'
import type { Hero34Fields, Media } from '@/payload-types'
import { generateAndStoreImage, getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

// Define the complete Hero34 schema
const hero34Schema = z.object({
  title: z
    .string()
    .min(1)
    .max(100)
    .describe('A compelling headline for the hero section (5-8 words)'),
  subtitle: z
    .string()
    .optional()
    .describe('An informative subtitle that explains the value proposition (10-15 words)'),
  badge: z.string().describe('A short, attention-grabbing badge text (2-3 words)'),
  links: z
    .array(
      z.object({
        link: z.object({
          label: z.string().min(1).describe('A clear, action-oriented button text (2-4 words)'),
        }),
      }),
    )
    .min(1)
    .max(1),
})

// Type inference from schema
type Hero34Data = z.infer<typeof hero34Schema>

// Default configurations that match our schema
const DEFAULT_BUTTON_CONFIG = {
  type: 'custom' as const,
  url: '#',
  suffixIcon: 'MoveRight',
  appearance: 'default' as const,
} as const

/**
 * Transforms raw Hero34 data by adding default configurations
 */
function transformHero34Data(data: Hero34Data, media?: Media): Hero34Fields {
  return {
    title: data.title,
    subtitle: data.subtitle || null,
    badge: data.badge,
    image: media?.id || '',
    links: data.links.map((item, index) => ({
      id: String(index + 1),
      link: {
        ...DEFAULT_BUTTON_CONFIG,
        label: item.link.label,
      },
    })),
  }
}

/**
 * Generates Hero34 content using AI with streaming support
 */
export async function autogen() {
  try {
    const payload = await getPayload({ config })
    const { object } = await getObject(hero34Schema, USER_PROMPT, SYSTEM_PROMPT)

    // Get tenant ID from cookie
    const cookieStore = await cookies()
    const tenantId = cookieStore.get('payload-tenant')?.value

    if (!tenantId) {
      throw new Error('No tenant selected')
    }
    // Generate and store the image
    const media = await generateAndStoreImage(
      {
        title: object.title,
      },
      payload,
      {
        size: '1792x1024',
        quality: 'hd',
        style: 'natural',
      },
      tenantId,
    )
    return transformHero34Data(object, media)
  } catch (error) {
    console.error('Error generating Hero34 content:', error)
    throw error
  }
}
