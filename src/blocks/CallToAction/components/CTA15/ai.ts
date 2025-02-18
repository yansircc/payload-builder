'use server'

import { openai as openaiSDK } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { cta15Schema } from './schema'

/**
 * Generate CTA15 content using AI
 */
export async function getCTA15Content() {
  try {
    const prompt = `You are an AI assistant for a CMS system, please generate content for a Call-to-Action (CTA) section with the following structure:

1. Heading: A short, engaging text above the title (e.g., "Ready to get started?")
2. Title: A compelling main heading that grabs attention (max 100 characters)
   - Make it action-oriented and impactful
   - Focus on value proposition
3. Subtitle: Supporting text that explains the value proposition (50-120 characters)
   - Expand on the title's message
   - Highlight key benefits
4. Image: A placeholder URL for the featured image (use '#' for now)
5. Links: Generate 1-2 CTA buttons with this structure:
   - Primary button (required):
     * type: 'custom' (fixed)
     * url: '#action-url'
     * label: Clear action verb (e.g., "Get Started", "Learn More")
     * suffixIcon: 'ArrowRight' (fixed)
     * appearance: 'default' (fixed)
   - Secondary button (optional):
     * Similar structure but with 'ghost' appearance

Note: This is a modern split layout with a radial gradient background, so ensure the content is visually compelling and drives action.
Make it professional and focused on conversion.`

    const { object } = await generateObject({
      model: openaiSDK('gpt-4o-mini'),
      prompt,
      schema: cta15Schema,
    })

    // Ensure proper structure for the links
    const formattedObject = {
      ...object,
      image: object.image || '#',
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
    console.error('Error generating CTA15 content:', error)
    throw new Error('Failed to generate CTA15 content')
  }
}
