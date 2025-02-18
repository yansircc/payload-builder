'use server'

import { openai as openaiSDK } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { cta10Schema } from './schema'

/**
 * Generate CTA10 content using AI
 */
export async function getCTA10Content() {
  try {
    const prompt = `You are an AI assistant for a CMS system, please generate content for a Call-to-Action (CTA) section with the following structure:

1. Title: A compelling main heading that grabs attention (max 100 characters)
   - Make it action-oriented and impactful
   - Focus on value proposition
2. Subtitle: Supporting text that explains the value proposition (50-120 characters)
   - Expand on the title's message
   - Highlight key benefits
3. Links: Generate 1-2 CTA buttons with this structure:
   - Primary button (required):
     * type: 'custom' (fixed)
     * url: '#action-url'
     * label: Clear action verb (e.g., "Get Started", "Learn More")
     * appearance: 'default' (fixed)
   - Secondary button (optional):
     * type: 'custom' (fixed)
     * url: '#action-url'
     * label: Supporting action
     * appearance: 'ghost' (fixed)

Note: This is a full-width banner design, so ensure the content is impactful and drives immediate action.
Make it modern, professional, and persuasive with a clear hierarchy between primary and secondary CTAs.`

    const { object } = await generateObject({
      model: openaiSDK('gpt-4o-mini'),
      prompt,
      schema: cta10Schema,
    })

    // Ensure proper structure for the links
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
        // Add second link if provided
        ...(object.links[1]
          ? [
              {
                link: {
                  type: 'custom',
                  url: object.links[1]?.link?.url || '#',
                  label: object.links[1]?.link?.label || 'Learn More',
                  appearance: 'ghost',
                },
              },
            ]
          : []),
      ],
    }

    return formattedObject
  } catch (error) {
    console.error('Error generating CTA10 content:', error)
    throw new Error('Failed to generate CTA10 content')
  }
}
