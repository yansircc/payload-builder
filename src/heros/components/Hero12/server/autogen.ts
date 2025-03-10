'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'
import { cookies } from 'next/headers'
import type { Hero12Fields, Media } from '@/payload-types'
import { generateAndStoreImage, getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

const heroSchema = z.object({
  title: z.string().min(1).describe('A compelling headline for the hero section'),
  subtitle: z
    .string()
    .describe('A brief, engaging description that explains the value proposition'),
  badge: z.string().describe('A short, attention-grabbing badge text displayed above the title'),
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
    .min(1)
    .max(2)
    .describe('1-2 call-to-action buttons'),
  partners: z
    .array(
      z.object({
        name: z.string().describe('Partner company name (for reference only, not displayed)'),
      }),
    )
    .min(1)
    .max(6)
    .describe('1-6 partner companies to showcase'),
})

// Default configurations that match our schema
const DEFAULT_BUTTON_CONFIG = {
  type: 'custom' as const,
  url: '#',
  appearance: 'default' as const,
} as const

function transformHero12Data(
  object: z.infer<typeof heroSchema>,
  logo?: Media,
  partnerLogos?: Media[],
): Hero12Fields {
  return {
    title: object.title,
    subtitle: object.subtitle,
    badge: object.badge,
    logo: logo?.id || '',
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

export async function autogen(): Promise<Hero12Fields> {
  try {
    const payload = await getPayload({ config })

    // Get tenant ID from cookie
    const cookieStore = await cookies()
    const tenantId = cookieStore.get('payload-tenant')?.value

    if (!tenantId) {
      throw new Error('No tenant selected')
    }

    const { object } = await getObject(heroSchema, USER_PROMPT, SYSTEM_PROMPT)

    // Generate and store the logo
    const logo = await generateAndStoreImage(
      {
        title: 'Company Logo',
        subtitle: `Logo for ${object.title}`,
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
          size: '1024x1024',
          quality: 'standard',
          style: 'natural',
        },
        tenantId,
      )
    })

    const partnerLogos = (await Promise.all(partnerLogosPromises)).filter(
      (logo): logo is Media => !!logo,
    )

    return transformHero12Data(object, logo, partnerLogos)
  } catch (error) {
    console.error('Error generating Hero12 content:', error)
    throw error
  }
}
