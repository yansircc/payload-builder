'use server'

import { openai as openaiSDK } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { cta17Schema } from './schema'

/**
 * Generate CTA17 content using AI
 */
export async function getCTA17Content() {
  try {
    const prompt = `You are an AI assistant for a CMS system, please generate content for a Call-to-Action (CTA) section with the following structure:

1. Title: A compelling main heading that grabs attention (max 100 characters)
   - Make it action-oriented and impactful
   - Focus on value proposition
   - Consider the circular pattern background
2. Subtitle: Supporting text that explains the value proposition
   - Keep it concise and impactful
   - Should complement the title's message
3. Links: Generate 1-2 CTA buttons with this structure:
   - Primary button (required):
     * type: 'custom' (fixed)
     * url: '#action-url'
     * label: Clear action verb (e.g., "Get Started", "Learn More")
     * suffixIcon: 'ArrowRight' (fixed)
     * appearance: 'default' (fixed)
   - Secondary button (optional):
     * Similar structure but with 'ghost' appearance

Note: This is a centered CTA section with a circular pattern background.
Make it visually compelling and focused on conversion.`

    const { object } = await generateObject({
      model: openaiSDK('gpt-4o-mini'),
      prompt,
      schema: cta17Schema,
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
            suffixIcon: 'ArrowRight',
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
                  suffixIcon: 'ArrowRight',
                  appearance: 'ghost',
                },
              },
            ]
          : []),
      ],
    }

    return formattedObject
  } catch (error) {
    console.error('Error generating CTA17 content:', error)
    throw new Error('Failed to generate CTA17 content')
  }
}
