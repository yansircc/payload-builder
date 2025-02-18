import { z } from 'zod'
import { baseLinkSchema } from '../shared/schema'

// List item schema for CTA7
const listItemSchema = z.object({
  icon: z.string().describe('A Lucide icon name for the feature item'),
  text: z.string().describe('The text content of the feature item'),
})

// Link schema with specific configuration for CTA7
const cta7LinkSchema = baseLinkSchema.extend({
  suffixIcon: z.string().optional(),
})

// Complete CTA7 schema
export const cta7Schema = z.object({
  title: z.string().min(1).max(100).describe('The title of the CTA section'),
  subtitle: z.string().describe('The subtitle text that explains the value proposition'),
  links: z
    .array(
      z.object({
        link: cta7LinkSchema.describe('Primary CTA button'),
      }),
    )
    .min(1)
    .max(1),
  lists: z.array(listItemSchema).min(1).max(6).describe('List of features with icons'),
})
