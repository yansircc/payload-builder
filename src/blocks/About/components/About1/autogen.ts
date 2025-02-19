'use server'

import { z } from 'zod'
import type { About1Fields } from '@/payload-types'
import { getObjectStream } from '@/utilities/ai'
import { SYSTEM_PROMPT, USER_PROMPT } from '../shared'

// Define the complete About schema
const about1Schema = z.object({
  mainSection: z.object({
    title: z.string().min(1).describe('A compelling main heading for the section (4-8 words)'),
    description: z
      .string()
      .describe('A clear introduction to your company or product (15-25 words)'),
  }),
  missionSection: z.object({
    label: z.string().describe('A short section label (e.g., "OUR MISSION", "OUR VISION")'),
    description: z
      .string()
      .describe('A concise mission statement that explains your purpose (20-30 words)'),
  }),
  featuresSection: z.object({
    title: z.string().min(1).describe('A compelling section heading (3-6 words)'),
    description: z.string().describe('A brief overview of your features or services (10-20 words)'),
    features: z
      .array(
        z.object({
          icon: z
            .string()
            .describe('A Lucide icon name that represents the feature (e.g., Star, Shield, Zap)'),
          title: z.string().describe('A short feature title (2-4 words)'),
          description: z.string().describe('A brief feature description (8-15 words)'),
        }),
      )
      .min(1)
      .max(3),
  }),
  teamSection: z.object({
    label: z.string().describe('A short section label (e.g., "JOIN OUR TEAM", "OUR PEOPLE")'),
    title: z.string().min(1).describe('An engaging team section heading (3-6 words)'),
    description: z.string().describe('A compelling team or culture description (15-25 words)'),
  }),
})

// Type inference from schema
type About1Data = z.infer<typeof about1Schema>

/**
 * Transforms raw About data by adding default configurations
 * Note: Image fields are excluded from AI generation and must be set manually
 */
function transformAbout1Data(data: About1Data): Partial<About1Fields> {
  return {
    mainSection: {
      title: data.mainSection.title,
      description: data.mainSection.description,
    },
    missionSection: {
      label: data.missionSection.label,
      description: data.missionSection.description,
      image: '', // Image field must be set manually
    },
    featuresSection: {
      title: data.featuresSection.title,
      description: data.featuresSection.description,
      features: data.featuresSection.features.map((feature, index) => ({
        id: String(index + 1),
        icon: feature.icon,
        title: feature.title,
        description: feature.description,
      })),
    },
    teamSection: {
      label: data.teamSection.label,
      title: data.teamSection.title,
      description: data.teamSection.description,
      image: '', // Image field must be set manually
    },
  }
}

/**
 * Generates About1 content using AI with streaming support
 * Images are excluded from generation and must be set manually
 */
export async function autogen() {
  try {
    const { stream, result } = await getObjectStream({
      schema: about1Schema,
      prompt: USER_PROMPT,
      systemPrompt: SYSTEM_PROMPT,
    })

    return {
      stream,
      objectPromise: result.then(transformAbout1Data),
    }
  } catch (error) {
    console.error('Error generating About1 content:', error)
    throw error
  }
}
