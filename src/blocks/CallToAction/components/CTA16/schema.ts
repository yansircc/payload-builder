import { z } from 'zod'
import { baseLinkSchema } from '../shared/schema'

export const cta16LinkSchema = baseLinkSchema.extend({
  suffixIcon: z.literal('ArrowRight'),
})

export const cta16Schema = z.object({
  title: z.string().min(1).max(100).describe('Main heading text'),
  subtitle: z.string().describe('Supporting text below the title'),
  icon: z.string().describe('Dynamic icon name'),
  backgroundImage: z.string().describe('Background image URL'),
  links: z
    .array(
      z.object({
        link: cta16LinkSchema,
      }),
    )
    .min(1)
    .max(2)
    .describe('CTA buttons (1-2)'),
})
