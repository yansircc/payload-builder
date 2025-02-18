import { z } from 'zod'
import { baseLinkSchema } from '../shared/schema'

// Link schema with specific configuration for CTA11
const cta11LinkSchema = baseLinkSchema.extend({
  suffixIcon: z.string().optional(),
})

// Complete CTA11 schema
export const cta11Schema = z.object({
  title: z.string().min(1).max(100).describe('The title of the CTA section'),
  subtitle: z.string().describe('The subtitle text that explains the value proposition'),
  links: z
    .array(
      z.object({
        link: cta11LinkSchema.describe('CTA button'),
      }),
    )
    .min(1)
    .max(2)
    .describe('Primary and secondary CTA buttons'),
})
