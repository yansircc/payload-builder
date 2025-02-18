'use server'

import { openai as openaiSDK } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { cta1Schema } from './schema'

/**
 * Generate CTA1 content using AI
 */
export async function getCTA1Content() {
  try {
    const prompt = `You are an AI assistant for a CMS system, please generate content for a Call-to-Action (CTA) section with the following structure:

1. Title: A compelling main heading that grabs attention (max 100 characters)
2. Subtitle: Supporting text that explains the value proposition
3. Icon: A Lucide icon name that represents the CTA's purpose (e.g., ArrowRight, Star, Users)
4. Button with this structure:
   - type: 'custom' (fixed)
   - url: '#action-url'
   - label: 'Compelling button text'
   - suffixIcon: A Lucide icon name (preferably ArrowRight)
   - appearance: 'default' (fixed)

Note: All icons should be valid Lucide icon names.
Please ensure the content is engaging and conversion-focused.`

    const { object } = await generateObject({
      model: openaiSDK('gpt-4o-mini'),
      prompt,
      schema: cta1Schema,
    })

    // Ensure proper structure for the button
    const formattedObject = {
      ...object,
      btn: {
        ...object.btn,
        type: 'custom',
        url: object.btn.url || '#',
        suffixIcon: object.btn.suffixIcon || 'ArrowRight',
        appearance: 'default',
      },
    }
    return formattedObject
  } catch (error) {
    console.error('Error generating CTA1 content:', error)
    throw error
  }
}
