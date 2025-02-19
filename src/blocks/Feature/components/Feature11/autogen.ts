'use server'

import { z } from 'zod'
import type { Feature11Fields } from '@/payload-types'
import { getObject } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../shared/constants'

const feature11Schema = z.object({
  title: z.string().min(1).describe('A compelling headline for the Feature section (2-6 words)'),
  description: z.string().min(1).describe('A description for the feature section'),
  buttonGroup: z
    .array(
      z.object({
        link: z.object({
          label: z.string().min(1).describe('A clear, action-oriented button text (2-4 words)'),
        }),
      }),
    )
    .min(1)
    .max(2),
  features: z
    .array(
      z.object({
        title: z.string().min(1).describe('The title of the feature'),
        icon: z.string().min(1).describe('An icon name from the icon library,such as "ArrowRight"'),
      }),
    )
    .length(3),
})

type Feature11Data = z.infer<typeof feature11Schema>

const DEFAULT_BUTTON_GROUP_CONFIG = [
  {
    link: {
      type: 'custom' as const,
      url: '#',
      suffixIcon: 'ArrowRight',
      appearance: 'default' as const,
    },
  },
  {
    link: {
      type: 'custom' as const,
      url: '#',
      suffixIcon: 'ArrowRight',
      appearance: 'outline' as const,
    },
  },
] as const

function transformFeature1Data(data: Feature11Data): Partial<Feature11Fields> {
  return {
    ...data,
    buttonGroup: data.buttonGroup.map((button, index) => ({
      link: {
        ...(DEFAULT_BUTTON_GROUP_CONFIG[index]?.link || DEFAULT_BUTTON_GROUP_CONFIG[0].link),
        label: button.link.label,
      },
    })),
  }
}

export async function autogen() {
  try {
    const { object } = await getObject(feature11Schema, USER_PROMPT, SYSTEM_PROMPT)
    return transformFeature1Data(object)
  } catch (error) {
    console.error('Error generating Feature 11 content:', error)
    throw error
  }
}
