import { z } from 'zod'
import { baseLinkSchema } from '../shared/schema'

// List item schema for CTA4
const listItemSchema = z.object({
  icon: z.string().describe('A Lucide icon name for the list item'),
  text: z.string().describe('The text content of the list item'),
})

// Link schema with specific configuration for CTA4
const cta4LinkSchema = baseLinkSchema.extend({
  suffixIcon: z.literal('ArrowRight'),
})

// Complete CTA4 schema
export const cta4Schema = z.object({
  title: z.string().min(1).max(100).describe('The title of the CTA section'),
  subtitle: z.string().describe('The subtitle text that explains the value proposition'),
  links: z
    .array(
      z.object({
        link: cta4LinkSchema.describe('Primary CTA button with ArrowRight icon'),
      }),
    )
    .min(1)
    .max(1),
  lists: z.array(listItemSchema).min(1).max(6).describe('List of features with icons'),
})
