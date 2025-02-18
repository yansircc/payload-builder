'use server'

import { openai as openaiSDK } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { cta7Schema } from './schema'

/**
 * Generate CTA7 content using AI
 */
export async function getCTA7Content() {
  try {
    const prompt = `You are an AI assistant for a CMS system, please generate content for a Call-to-Action (CTA) section with the following structure:

1. Title: A compelling main heading that grabs attention (max 100 characters)
2. Subtitle: Supporting text that explains the value proposition (use uppercase for this section)
3. Lists (1-6 items) with this structure:
   - icon: A Lucide icon name (e.g., Check, Star, Shield, Zap)
   - text: Brief feature description
4. Links: Single CTA button with this structure:
   - type: 'custom' (fixed)
   - url: '#action-url'
   - label: 'Compelling button text'
   - appearance: 'default' (fixed)

Note: This is a feature-focused layout with icon highlights, so ensure the content emphasizes key features and benefits.
Please ensure the content is engaging and conversion-focused.`

    const { object } = await generateObject({
      model: openaiSDK('gpt-4o-mini'),
      prompt,
      schema: cta7Schema,
    })

    // Ensure proper structure for the links and lists
    const formattedObject = {
      ...object,
      links: [
        {
          link: {
            type: 'custom',
            url: object.links[0]?.link?.url || '#',
            label: object.links[0]?.link?.label || 'Get Started',
            appearance: 'default',
          },
        },
      ],
      lists: object.lists.map((item) => ({
        icon: item.icon || 'Check',
        text: item.text,
      })),
    }

    return formattedObject
  } catch (error) {
    console.error('Error generating CTA7 content:', error)
    throw error
  }
}
