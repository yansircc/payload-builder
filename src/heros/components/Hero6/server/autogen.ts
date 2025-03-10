'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'
import { cookies } from 'next/headers'
import type { Hero6Fields, Media } from '@/payload-types'
import { generateAndStoreImage, getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

const heroSchema = z.object({
  title: z.string().min(1).describe('A compelling headline for the hero section'),
  subtitle: z
    .string()
    .describe('A brief, engaging description that explains the value proposition'),
  links: z
    .array(
      z.object({
        link: z.object({
          label: z
            .string()
            .min(1)
            .describe(
              'A clear, action-oriented button text (2-4 words) for call-to-action buttons',
            ),
        }),
      }),
    )
    .length(3)
    .describe('Exactly 3 call-to-action buttons'),
  partners: z
    .array(
      z.object({
        name: z.string().describe('Partner company name (for reference only, not displayed)'),
      }),
    )
    .length(4)
    .describe('Exactly 4 partner companies to showcase'),
})

// Default configurations that match our schema
const DEFAULT_BUTTON_CONFIG = {
  type: 'custom' as const,
  url: '#',
  suffixIcon: 'ChevronRight',
  appearance: 'default' as const,
} as const

function transformHero6Data(
  object: z.infer<typeof heroSchema>,
  media?: Media,
  secondaryMedia?: Media,
  partnerLogos?: Media[],
): Hero6Fields {
  return {
    title: object.title,
    subtitle: object.subtitle,
    image: media?.id || '',
    secondaryImage: {
      image: secondaryMedia?.id || '',
    },
    links: object.links.map((item, index) => ({
      id: String(index + 1),
      link: {
        ...DEFAULT_BUTTON_CONFIG,
        ...item.link,
      },
    })),
    partners:
      partnerLogos?.map((logo, index) => ({
        id: String(index + 1),
        logo: logo.id,
      })) || [],
  }
}

export async function autogen(): Promise<Hero6Fields> {
  try {
    const payload = await getPayload({ config })

    // Get tenant ID from cookie
    const cookieStore = await cookies()
    const tenantId = cookieStore.get('payload-tenant')?.value

    if (!tenantId) {
      throw new Error('No tenant selected')
    }

    const { object } = await getObject(heroSchema, USER_PROMPT, SYSTEM_PROMPT)

    // Generate and store the main hero image
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

    // Generate and store the secondary image
    const secondaryMedia = await generateAndStoreImage(
      {
        title: `${object.title} - Secondary Image`,
        subtitle: object.subtitle,
      },
      payload,
      {
        size: '1024x1024',
        quality: 'hd',
        style: 'natural',
      },
      tenantId,
    )

    // Generate partner logos
    const partnerLogosPromises = object.partners.map(async (partner, index) => {
      return generateAndStoreImage(
        {
          title: `Partner Logo ${index + 1}`,
          subtitle: partner.name,
        },
        payload,
        {
          size: '512x512',
          quality: 'standard',
          style: 'natural',
        },
        tenantId,
      )
    })

    const partnerLogos = (await Promise.all(partnerLogosPromises)).filter(
      (logo): logo is Media => !!logo,
    )

    return transformHero6Data(object, media, secondaryMedia, partnerLogos)
  } catch (error) {
    console.error('Error generating Hero6 content:', error)
    throw error
  }
}
