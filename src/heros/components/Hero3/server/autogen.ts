'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'
import { cookies } from 'next/headers'
import type { Hero3Fields, Media } from '@/payload-types'
import { generateAndStoreImage, getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

const heroSchema = z.object({
  title: z.string().min(1).describe('A compelling headline for the hero section'),
  subtitle: z
    .string()
    .describe('A brief, engaging description that explains the value proposition'),
  rating: z.number().describe('A rating between 1 and 5'),
  reviewCount: z.number().describe('The number of reviews'),
  links: z
    .array(
      z.object({
        link: z.object({
          label: z
            .string()
            .min(1)
            .describe(
              'A clear, action-oriented button text (2-4 words), first button is primary and second button is secondary',
            ),
        }),
      }),
    )
    .min(1)
    .max(2),
})

// Default configurations that match our schema
const DEFAULT_BUTTON_CONFIG = {
  type: 'custom' as const,
  url: '#',
  suffixIcon: 'ArrowRight',
  appearance: 'default' as const,
} as const

function transformHero3Data(
  object: z.infer<typeof heroSchema>,
  media?: Media,
  avatarMedias: Media[] = [],
): Hero3Fields {
  console.log('avatarMedias', avatarMedias)
  return {
    title: object.title,
    subtitle: object.subtitle,
    image: media?.id || '',
    rating: object.rating,
    reviewCount: object.reviewCount.toString(),
    // Transform the generated avatar media objects into the format expected by Hero3Fields
    // These are professional human face headshots generated at 1024x1024 but displayed at 46x46 in the UI
    avatars: avatarMedias.map((avatarMedia, index) => ({
      id: String(index + 1),
      avatar: avatarMedia.id,
    })),
    links: object.links.map((item, index) => ({
      id: String(index + 1),
      link: {
        ...DEFAULT_BUTTON_CONFIG,
        ...item.link,
      },
    })),
  }
}

export async function autogen(): Promise<Hero3Fields> {
  try {
    const payload = await getPayload({ config })

    // Get tenant ID from cookie
    const cookieStore = await cookies()
    const tenantId = cookieStore.get('payload-tenant')?.value

    if (!tenantId) {
      throw new Error('No tenant selected')
    }

    const { object } = await getObject(heroSchema, USER_PROMPT, SYSTEM_PROMPT)

    // Generate and store the image
    const media = await generateAndStoreImage(
      {
        title: object.title,
        subtitle: object.subtitle,
      },
      payload,
      {
        size: '1792x1024',
        quality: 'hd',
        style: 'natural',
      },
      tenantId,
    )

    // Generate avatar images (5 avatars)
    const avatarPromises = Array.from({ length: 5 }).map((_, index) =>
      generateAndStoreImage(
        {
          title: `Professional headshot avatar ${index + 1}`,
          subtitle: `Close-up portrait of a professional person with a friendly smile, high quality, professional lighting, diverse, clean background, professional attire`,
        },
        payload,
        {
          size: '1024x1024',
          quality: 'hd',
          style: 'vivid', // Using vivid style for more appealing portraits
        },
        tenantId,
      ),
    )

    const avatarMedias = (await Promise.all(avatarPromises)).filter(Boolean) as Media[]

    return transformHero3Data(object, media, avatarMedias)
  } catch (error) {
    console.error('Error generating Hero3 content:', error)
    throw error
  }
}
