import { z } from 'zod'
import { baseLinkSchema } from '../shared/schema'

// Link schema with specific configuration for CTA10
const cta10LinkSchema = baseLinkSchema.extend({
  suffixIcon: z.string().optional(),
})

// Complete CTA10 schema
export const cta10Schema = z.object({
  title: z.string().min(1).max(100).describe('The title of the CTA section'),
  subtitle: z.string().describe('The subtitle text that explains the value proposition'),
  links: z
    .array(
      z.object({
        link: cta10LinkSchema.describe('Primary CTA button'),
      }),
    )
    .min(1)
    .max(2)
    .describe('Up to two CTA buttons'),
})
