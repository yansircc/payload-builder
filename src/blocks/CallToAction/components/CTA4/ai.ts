'use server'

import { openai as openaiSDK } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { cta4Schema } from './schema'

/**
 * Generate CTA4 content using AI
 */
export async function getCTA4Content() {
  try {
    const prompt = `You are an AI assistant for a CMS system, please generate content for a Call-to-Action (CTA) section with the following structure:

1. Title: A compelling main heading that grabs attention (max 100 characters)
2. Subtitle: Supporting text that explains the value proposition
3. Links: Single CTA button with this structure:
   - type: 'custom' (fixed)
   - url: '#action-url'
   - label: 'Compelling button text'
   - suffixIcon: 'ArrowRight' (fixed)
   - appearance: 'default' (fixed)
4. Lists (1-6 items) with this structure:
   - icon: A Lucide icon name (e.g., Check, Star, Shield)
   - text: Brief feature description

Note: All icons should be valid Lucide icon names.
Please ensure the content is engaging and conversion-focused, with an emphasis on feature benefits.`

    const { object } = await generateObject({
      model: openaiSDK('gpt-4o-mini'),
      prompt,
      schema: cta4Schema,
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
            suffixIcon: 'ArrowRight',
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
    console.error('Error generating CTA4 content:', error)
    throw error
  }
}
