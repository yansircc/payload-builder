'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'
import { cookies } from 'next/headers'
import type { CTA15Fields, Media } from '@/payload-types'
import { generateAndStoreImage, getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

// Define the complete CTA schema
const cta15Schema = z.object({
  heading: z.string().describe('A short, engaging text above the title (2-4 words)'),
  title: z.string().min(1).describe('A compelling headline for the CTA section (2-6 words)'),
  subtitle: z
    .string()
    .describe('A brief, engaging description that explains the value proposition (10-20 words)'),
  links: z
    .array(
      z.object({
        link: z.object({
          label: z.string().min(1).describe('A clear, action-oriented button text (2-4 words)'),
          appearance: z.enum(['default', 'ghost']).optional(),
        }),
      }),
    )
    .min(1)
    .max(2),
})

// Type inference from schema
type CTA15Data = z.infer<typeof cta15Schema>

// Default configurations that match our schema
const DEFAULT_PRIMARY_BUTTON = {
  type: 'custom',
  url: '#',
  suffixIcon: 'ArrowRight',
  appearance: 'default',
} as const

const DEFAULT_SECONDARY_BUTTON = {
  type: 'custom',
  url: '#',
  suffixIcon: 'ArrowRight',
  appearance: 'ghost',
} as const

/**
 * Transforms raw CTA data by adding default configurations
 */
function transformCTA15Data(data: CTA15Data, media?: Media): Partial<CTA15Fields> {
  const primaryLabel = data.links[0]?.link?.label || 'Get Started'
  const secondaryLabel = data.links[1]?.link?.label

  return {
    heading: data.heading,
    title: data.title,
    subtitle: data.subtitle,
    image: media?.id || '',
    links: [
      {
        id: '1',
        link: {
          ...DEFAULT_PRIMARY_BUTTON,
          label: primaryLabel,
        },
      },
      // Add secondary button if provided
      ...(secondaryLabel
        ? [
            {
              id: '2',
              link: {
                ...DEFAULT_SECONDARY_BUTTON,
                label: secondaryLabel,
              },
            },
          ]
        : []),
    ],
  }
}

/**
 * Generates CTA15 content using AI with streaming support
 */
export async function autogen() {
  try {
    const payload = await getPayload({ config })

    // Get tenant ID from cookie
    const cookieStore = await cookies()
    const tenantId = cookieStore.get('payload-tenant')?.value

    if (!tenantId) {
      throw new Error('No tenant selected')
    }

    const { object } = await getObject(cta15Schema, USER_PROMPT, SYSTEM_PROMPT)

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

    return transformCTA15Data(object, media)
  } catch (error) {
    console.error('Error generating CTA15 content:', error)
    throw error
  }
}
