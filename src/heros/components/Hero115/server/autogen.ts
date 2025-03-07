'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'
import { cookies } from 'next/headers'
import type { Hero115Fields, Media } from '@/payload-types'
import { generateAndStoreImage, getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

// Define the complete Hero115 schema
const hero115Schema = z.object({
  title: z
    .string()
    .min(1)
    .max(100)
    .describe('A compelling headline for the hero section (5-8 words)'),
  subtitle: z
    .string()
    .min(1)
    .max(150)
    .describe('A supporting subtitle that expands on the headline (10-15 words)'),
  trustText: z
    .string()
    .min(1)
    .max(100)
    .describe('A short trust-building statement to display below the main content (5-10 words)'),
  links: z
    .array(
      z.object({
        link: z.object({
          label: z.string().min(1).describe('Button text (1-3 words)'),
          href: z.string().min(1).describe('URL for the button'),
          suffixIcon: z.string().default('Zap').describe('Icon to display after the button text'),
        }),
      }),
    )
    .length(1)
    .describe('A single call-to-action button with Zap icon'),
})

// Type inference from schema
type Hero115Data = z.infer<typeof hero115Schema>

/**
 * Transforms raw Hero115 data by adding default configurations
 */
function transformHero115Data(data: Hero115Data, media?: Media): Hero115Fields {
  return {
    title: data.title,
    subtitle: data.subtitle,
    trustText: data.trustText,
    image: media?.id || '',
    links: data.links.map((item, index) => ({
      id: String(index + 1),
      link: {
        type: 'custom',
        url: item.link.href,
        label: item.link.label,
        suffixIcon: item.link.suffixIcon || 'Zap',
      },
    })),
  }
}

/**
 * Generates Hero115 content using AI with streaming support
 */
export async function autogen(): Promise<Hero115Fields> {
  try {
    const payload = await getPayload({ config })

    // Get tenant ID from cookie
    const cookieStore = await cookies()
    const tenantId = cookieStore.get('payload-tenant')?.value

    if (!tenantId) {
      throw new Error('No tenant selected')
    }

    const { object } = await getObject(hero115Schema, USER_PROMPT, SYSTEM_PROMPT)

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

    return transformHero115Data(object, media)
  } catch (error) {
    console.error('Error generating Hero115 content:', error)
    throw error
  }
}
