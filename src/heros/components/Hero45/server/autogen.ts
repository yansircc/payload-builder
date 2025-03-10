'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'
import { cookies } from 'next/headers'
import type { Hero45Fields, Media } from '@/payload-types'
import { generateAndStoreImage, getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

// Define the complete Hero45 schema
const hero45Schema = z.object({
  badge: z.string().describe('A short, attention-grabbing badge text (2-3 words)'),
  title: z
    .string()
    .min(1)
    .max(100)
    .describe('A compelling headline for the hero section (5-8 words)'),
  features: z
    .array(
      z.object({
        icon: z.string().describe('Lucide icon name for the feature'),
        title: z.string().min(1).describe('A short, descriptive feature title (2-4 words)'),
        description: z
          .string()
          .min(1)
          .describe('A brief description explaining the feature benefit (8-12 words)'),
      }),
    )
    .length(3)
    .describe('Exactly three feature items with icon, title, and description'),
})

// Type inference from schema
type Hero45Data = z.infer<typeof hero45Schema>

/**
 * Transforms raw Hero45 data by adding default configurations
 */
function transformHero45Data(data: Hero45Data, media?: Media): Hero45Fields {
  return {
    badge: data.badge,
    title: data.title,
    image: media?.id || '',
    features: data.features.map((feature, index) => ({
      id: String(index + 1),
      icon: feature.icon,
      title: feature.title,
      description: feature.description,
    })),
  }
}

/**
 * Generates Hero45 content using AI with streaming support
 */
export async function autogen(): Promise<Hero45Fields> {
  try {
    const payload = await getPayload({ config })

    // Get tenant ID from cookie
    const cookieStore = await cookies()
    const tenantId = cookieStore.get('payload-tenant')?.value

    if (!tenantId) {
      throw new Error('No tenant selected')
    }

    const { object } = await getObject(hero45Schema, USER_PROMPT, SYSTEM_PROMPT)

    // Generate and store the image
    const media = await generateAndStoreImage(
      {
        title: object.title,
        features: object.features.map((f) => f.title).join(', '),
      },
      payload,
      {
        size: '1792x1024',
        quality: 'hd',
        style: 'natural',
      },
      tenantId,
    )

    return transformHero45Data(object, media)
  } catch (error) {
    console.error('Error generating Hero45 content:', error)
    throw error
  }
}
