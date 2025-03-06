'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'
import { cookies } from 'next/headers'
import type { Hero1Fields, Media } from '@/payload-types'
import { generateAndStoreImage, getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

const heroSchema = z.object({
  title: z.string().min(1).describe('A compelling headline for the hero section'),
  subtitle: z
    .string()
    .describe('A brief, engaging description that explains the value proposition'),
  badge: z.string().describe('A short text badge to highlight new features or announcements'),
  links: z.object({
    primary: z.object({
      label: z.string().min(1).describe('A clear, action-oriented primary button text'),
    }),
    secondary: z.object({
      label: z.string().min(1).describe('A complementary secondary button text'),
    }),
  }),
})

function transformHero1Data(object: z.infer<typeof heroSchema>, media?: Media): Hero1Fields {
  return {
    title: object.title,
    subtitle: object.subtitle,
    badge: object.badge,
    image: media?.id || '',
    links: [
      {
        'link-1': {
          type: 'custom',
          label: object.links.primary.label,
          url: '#',
          appearance: 'default',
        },
        'link-2': {
          type: 'custom',
          label: object.links.secondary.label,
          url: '#',
          appearance: 'outline',
          suffixIcon: 'ArrowDownRight',
        },
      },
    ],
  }
}

export async function autogen(): Promise<Hero1Fields> {
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

    return transformHero1Data(object, media)
  } catch (error) {
    console.error('Error generating Hero1 content:', error)
    throw error
  }
}
