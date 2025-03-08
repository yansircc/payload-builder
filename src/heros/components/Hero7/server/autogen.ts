'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'
import { cookies } from 'next/headers'
import type { Hero7Fields, Media } from '@/payload-types'
import { generateAndStoreImage, getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

const heroSchema = z.object({
  title: z.string().min(1).describe('A compelling headline for the hero section'),
  subtitle: z
    .string()
    .describe('A brief, engaging description that explains the value proposition'),
  link: z.object({
    label: z
      .string()
      .min(1)
      .describe('A clear, action-oriented button text (2-4 words) for the call-to-action button'),
  }),
  rating: z.object({
    rate: z.number().min(1).max(5).describe('Rating value between 1-5'),
    count: z.number().min(1).describe('Number of ratings/reviews'),
    avatarCount: z.number().min(3).max(5).describe('Number of user avatars to generate (3-5)'),
  }),
})

// Default configurations that match our schema
const DEFAULT_BUTTON_CONFIG = {
  type: 'custom' as const,
  url: '#',
  suffixIcon: 'ArrowRight',
  appearance: 'default' as const,
} as const

function transformHero7Data(object: z.infer<typeof heroSchema>, avatars?: Media[]): Hero7Fields {
  return {
    title: object.title,
    subtitle: object.subtitle,
    link: {
      ...DEFAULT_BUTTON_CONFIG,
      label: object.link.label,
    },
    rating: {
      rate: object.rating.rate,
      count: object.rating.count,
      avatars:
        avatars?.map((avatar, index) => ({
          id: String(index + 1),
          avatar: avatar.id,
        })) || [],
    },
  }
}

export async function autogen(): Promise<Hero7Fields> {
  try {
    const payload = await getPayload({ config })

    // Get tenant ID from cookie
    const cookieStore = await cookies()
    const tenantId = cookieStore.get('payload-tenant')?.value

    if (!tenantId) {
      throw new Error('No tenant selected')
    }

    const { object } = await getObject(heroSchema, USER_PROMPT, SYSTEM_PROMPT)

    // Generate avatar images
    const avatarPromises = Array.from({ length: object.rating.avatarCount }).map(
      async (_, index) => {
        return generateAndStoreImage(
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
        )
      },
    )

    const avatarMedias = (await Promise.all(avatarPromises)).filter(Boolean) as Media[]

    return transformHero7Data(object, avatarMedias)
  } catch (error) {
    console.error('Error generating Hero7 content:', error)
    throw error
  }
}
