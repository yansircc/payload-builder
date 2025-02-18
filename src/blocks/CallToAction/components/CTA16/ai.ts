'use server'

import { openai as openaiSDK } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { cta16Schema } from './schema'

/**
 * Generate CTA16 content using AI
 */
export async function getCTA16Content() {
  try {
    const prompt = `You are an AI assistant for a CMS system, please generate content for a Call-to-Action (CTA) section with the following structure:

1. Title: A compelling main heading that grabs attention (max 100 characters)
   - Make it action-oriented and impactful
   - Focus on value proposition
2. Subtitle: Supporting text that appears with an icon
   - Keep it concise and impactful
   - Should work well with an icon
3. Icon: Choose one of these icon names:
   - Rocket
   - Sparkles
   - Star
   - Lightning
   - Fire
4. Background Image: A placeholder URL for the background image (use '#' for now)
5. Links: Generate 1-2 CTA buttons with this structure:
   - Primary button (required):
     * type: 'custom' (fixed)
     * url: '#action-url'
     * label: Clear action verb (e.g., "Get Started", "Learn More")
     * suffixIcon: 'ArrowRight' (fixed)
     * appearance: 'default' (fixed)
   - Secondary button (optional):
     * Similar structure but with 'ghost' appearance

Note: This is a full-height hero section with a dark overlay on the background image.
Make it visually compelling and focused on conversion.`

    const { object } = await generateObject({
      model: openaiSDK('gpt-4o-mini'),
      prompt,
      schema: cta16Schema,
    })

    // Ensure proper structure for the links
    const formattedObject = {
      ...object,
      backgroundImage: object.backgroundImage || '#',
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
    console.error('Error generating CTA16 content:', error)
    throw new Error('Failed to generate CTA16 content')
  }
}
