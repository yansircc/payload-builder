import { z } from 'zod'

/**
 * FAQ item schema definition
 */
const faqItemSchema = z.object({
  question: z
    .string()
    .min(1, 'Question is required')
    .describe('The question text for this FAQ item, around 10 words'),
  answer: z
    .string()
    .min(1, 'Answer is required')
    .describe('The answer text for this FAQ item, around 100 words'),
})

/**
 * FAQ schema definition
 */
export const schema = z.object({
  title: z.string().describe('The main title for the FAQ section, around 10 words'),
  faqs: z.array(faqItemSchema).describe('Array of FAQ items, need 6 items'),
})

export type FAQItem = z.infer<typeof faqItemSchema>
export type FAQData = z.infer<typeof schema>

export default schema
