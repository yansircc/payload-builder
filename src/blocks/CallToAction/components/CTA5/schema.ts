import { z } from 'zod'
import { baseLinkSchema } from '../shared/schema'

// Link schema with specific configuration for CTA5
const cta5LinkSchema = baseLinkSchema.extend({
  suffixIcon: z.string().optional(),
})

// Complete CTA5 schema
export const cta5Schema = z.object({
  title: z.string().min(1).max(100).describe('The title of the CTA section'),
  subtitle: z.string().describe('The subtitle text that explains the value proposition'),
  image: z.string().describe('The featured image URL or media ID'),
  links: z
    .array(
      z.object({
        link: cta5LinkSchema.describe('Primary CTA button'),
      }),
    )
    .min(1)
    .max(1),
})
