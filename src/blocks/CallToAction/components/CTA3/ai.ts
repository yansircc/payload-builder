'use server'

import { openai as openaiSDK } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { cta3Schema } from './schema'

/**
 * Generate CTA3 content using AI
 */
export async function getCTA3Content() {
  try {
    const prompt = `You are an AI assistant for a CMS system, please generate content for a Call-to-Action (CTA) section with the following structure:

1. Title: A compelling main heading that grabs attention (max 100 characters)
2. Subtitle: Supporting text that explains the value proposition
3. Buttons (1-2 buttons) with this structure:
   - link: {
     type: 'custom',
     url: '#some-url',
     label: 'Button Text',
     suffixIcon: 'ArrowRight' | 'ChevronRight' | other Lucide icon names,
     appearance: 'default' for primary button
   }
4. Feature List (1-5 items) with this structure:
   - link: {
     type: 'custom',
     url: '#feature-url',
     label: 'Feature Name',
     suffixIcon: 'ChevronRight' | other Lucide icon names,
     appearance: 'ghost'
   }
   - description: 'Brief feature description'

Note: All icons should be valid Lucide icon names (e.g., ArrowRight, ChevronRight, Star, Users, etc.).
Please ensure the content is engaging and conversion-focused.`

    const { object } = await generateObject({
      model: openaiSDK('gpt-4o-mini'),
      prompt,
      schema: cta3Schema,
    })

    // Ensure proper structure for buttons and list
    const formattedObject = {
      ...object,
      buttons:
        object.buttons?.map((button) => ({
          link: {
            ...button.link,
            type: 'custom',
            suffixIcon: button.link.suffixIcon || 'ArrowRight',
          },
        })) || [],
      list:
        object.list?.map((item) => ({
          link: {
            ...item.link,
            type: 'custom',
            suffixIcon: item.link.suffixIcon || 'ChevronRight',
            appearance: 'ghost',
            description: item.description,
          },
        })) || [],
    }

    return formattedObject
  } catch (error) {
    console.error('Error generating CTA3 content:', error)
    throw error
  }
}
