import { z } from 'zod'
import { baseLinkSchema } from '../shared/schema'

// Link schema with specific configuration for CTA15
const cta15LinkSchema = baseLinkSchema.extend({
  suffixIcon: z.literal('ArrowRight'),
})

// Complete CTA15 schema
export const cta15Schema = z.object({
  heading: z.string().describe('The small heading text above the title'),
  title: z.string().min(1).max(100).describe('The main title of the CTA section'),
  subtitle: z.string().describe('The subtitle text that explains the value proposition'),
  image: z.string().describe('The featured image URL or media ID'),
  links: z
    .array(
      z.object({
        link: cta15LinkSchema.describe('CTA button with ArrowRight icon'),
      }),
    )
    .min(1)
    .max(2)
    .describe('CTA buttons'),
})
