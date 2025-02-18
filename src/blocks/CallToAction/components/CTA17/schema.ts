import { z } from 'zod'
import { baseLinkSchema } from '../shared/schema'

export const cta17LinkSchema = baseLinkSchema.extend({
  suffixIcon: z.literal('ArrowRight'),
})

export const cta17Schema = z.object({
  title: z.string().min(1).max(100).describe('Main heading text'),
  subtitle: z.string().describe('Supporting text below the title'),
  links: z
    .array(
      z.object({
        link: cta17LinkSchema,
      }),
    )
    .min(1)
    .max(2)
    .describe('CTA buttons (1-2)'),
})
