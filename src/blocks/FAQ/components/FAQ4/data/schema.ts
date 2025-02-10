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
 * Support link schema definition
 */
const supportLinkSchema = z.object({
  link: z.object({
    appearances: z.string(),
    label: z.string().optional(),
    href: z.string().optional(),
  }),
})

/**
 * Support section schema definition
 */
const supportSchema = z.object({
  title: z.string().describe('Support section title'),
  subtitle: z.string().describe('Support section subtitle'),
  supportLink: z.array(supportLinkSchema).describe('Support links'),
})

/**
 * FAQ schema definition
 */
export const schema = z.object({
  title: z.string().describe('The main title for the FAQ section'),
  subtitle: z.string().describe('The subtitle/badge text'),
  description: z.string().describe('The description text'),
  faqs: z.array(faqItemSchema).describe('Array of FAQ items'),
  support: supportSchema.describe('Support section configuration'),
})

export type FAQItem = z.infer<typeof faqItemSchema>
export type SupportLink = z.infer<typeof supportLinkSchema>
export type Support = z.infer<typeof supportSchema>
export type FAQData = z.infer<typeof schema>

export default schema
