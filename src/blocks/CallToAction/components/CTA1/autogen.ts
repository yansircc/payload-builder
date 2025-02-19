'use server'

import { z } from 'zod'
import type { CTA1Fields } from '@/payload-types'
import { getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../shared/constants'

const ctaSchema = z.object({
  title: z.string().min(1).describe('A compelling headline for the CTA section'),
  subtitle: z.string().describe('A brief, engaging description'),
  icon: z.string().describe('A Lucide icon name, such as "Star", "Users", "Rocket"'),
  btn: z.object({
    label: z.string().min(1).describe('A clear, action-oriented button text'),
  }),
})

function transformCTA1Data(object: z.infer<typeof ctaSchema>): CTA1Fields {
  return {
    title: object.title,
    subtitle: object.subtitle,
    icon: object.icon,
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
    const { object } = await getObject(ctaSchema, USER_PROMPT, SYSTEM_PROMPT)
    return transformCTA1Data(object)
  } catch (error) {
    console.error('Error generating CTA1 content:', error)
    throw error
  }
}
