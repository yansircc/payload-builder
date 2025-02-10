import { z } from 'zod'

/**
 * FAQ item schema definition
 */
const faqItemSchema = z.object({
  question: z
    .string()
    .min(1, 'Question is required')
    .describe('The question text for this FAQ item'),
  answer: z.string().min(1, 'Answer is required').describe('The answer text for this FAQ item'),
  id: z.string().optional(),
})

/**
 * FAQ schema definition
 */
export const schema = z.object({
  title: z.string().describe('The main title for the FAQ section'),
  subtitle: z.string().describe('The subtitle/badge text'),
  description: z.string().describe('The description text'),
  faqs: z.array(faqItemSchema).describe('Array of FAQ items'),
})

export type FAQItem = z.infer<typeof faqItemSchema>
export type FAQData = z.infer<typeof schema>

export default schema
