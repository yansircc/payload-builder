'use server'

import { openai as openaiSDK } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { cta5Schema } from './schema'

/**
 * Generate CTA5 content using AI
 */
export async function getCTA5Content() {
  try {
    const prompt = `You are an AI assistant for a CMS system, please generate content for a Call-to-Action (CTA) section with the following structure:

1. Title: A compelling main heading that grabs attention (max 100 characters)
2. Subtitle: Supporting text that explains the value proposition
3. Image: A placeholder URL for the featured image (use '#' for now)
4. Links: Single CTA button with this structure:
   - type: 'custom' (fixed)
   - url: '#action-url'
   - label: 'Compelling button text'
   - appearance: 'default' (fixed)

Note: This is an image-focused layout with side content, so ensure the content complements a visual presentation.
Please ensure the content is engaging and conversion-focused.`

    const { object } = await generateObject({
      model: openaiSDK('gpt-4o-mini'),
      prompt,
      schema: cta5Schema,
    })

    // Ensure proper structure for the links
    const formattedObject = {
      ...object,
      image: object.image || '#',
      links: [
        {
          'link-1': {
            type: 'custom',
            url: object.links[0]?.link?.url || '#',
            label: object.links[0]?.link?.label || 'Get Started',
            appearance: 'default',
          },
        },
      ],
    }

    return formattedObject
  } catch (error) {
    console.error('Error generating CTA5 content:', error)
    throw error
  }
}
