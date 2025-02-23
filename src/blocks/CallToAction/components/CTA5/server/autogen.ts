'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'
import { cookies } from 'next/headers'
import type { CTA5Fields, Media } from '@/payload-types'
import { generateAndStoreImage, getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

// Define the complete CTA schema
const cta5Schema = z.object({
  title: z.string().min(1).describe('A compelling headline for the CTA section (2-6 words)'),
  subtitle: z
    .string()
    .describe('A brief, engaging description that explains the value proposition (10-20 words)'),
  links: z
    .array(
      z.object({
        link: z.object({
          label: z.string().min(1).describe('A clear, action-oriented button text (2-4 words)'),
        }),
      }),
    )
    .length(1),
})

// Type inference from schema
type CTA5Data = z.infer<typeof cta5Schema>

// Default configurations that match our schema
const DEFAULT_BUTTON_CONFIG = {
  type: 'custom' as const,
  url: '#',
  appearance: 'default' as const,
} as const

/**
 * Transforms raw CTA data by adding default configurations
 */
function transformCTA5Data(data: CTA5Data, media?: Media): CTA5Fields {
  const buttonLabel = data.links[0]?.link?.label || 'Get Started'

  return {
    title: data.title,
    subtitle: data.subtitle,
    image: media?.id || '',
    links: [
      {
        id: '1',
        link: {
          ...DEFAULT_BUTTON_CONFIG,
          label: buttonLabel,
        },
      },
    ],
  }
}

/**
 * Generates CTA5 content using AI with streaming support
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

    const { object } = await getObject(cta5Schema, USER_PROMPT, SYSTEM_PROMPT)

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

    return transformCTA5Data(object, media)
  } catch (error) {
    console.error('Error generating CTA5 content:', error)
    throw error
  }
}
