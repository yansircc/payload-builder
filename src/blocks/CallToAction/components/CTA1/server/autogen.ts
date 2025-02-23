'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'
import { cookies } from 'next/headers'
import type { CTA1Fields, Media } from '@/payload-types'
import { generateAndStoreImage, getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../../shared/constants'

const ctaSchema = z.object({
  title: z.string().min(1).describe('A compelling headline for the CTA section'),
  subtitle: z.string().describe('A brief, engaging description'),
  icon: z.string().describe('A Lucide icon name, such as "Star", "Users", "Rocket"'),
  btn: z.object({
    label: z.string().min(1).describe('A clear, action-oriented button text'),
  }),
})

function transformCTA1Data(object: z.infer<typeof ctaSchema>, media?: Media): CTA1Fields {
  return {
    title: object.title,
    subtitle: object.subtitle,
    icon: object.icon,
    image: media?.id || '',
    btn: {
      ...DEFAULT_BUTTON_CONFIG,
      label: object.btn.label,
    },
  }
}

const DEFAULT_BUTTON_CONFIG = {
  type: 'custom' as const,
  url: '#',
  suffixIcon: 'ArrowRight',
  appearance: 'default' as const,
} satisfies Partial<CTA1Fields['btn']>

export async function autogen(): Promise<CTA1Fields> {
  try {
    const payload = await getPayload({ config })

    // Get tenant ID from cookie
    const cookieStore = await cookies()
    const tenantId = cookieStore.get('payload-tenant')?.value

    if (!tenantId) {
      throw new Error('No tenant selected')
    }

    const { object } = await getObject(ctaSchema, USER_PROMPT, SYSTEM_PROMPT)

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

    return transformCTA1Data(object, media)
  } catch (error) {
    console.error('Error generating CTA1 content:', error)
    throw error
  }
}
