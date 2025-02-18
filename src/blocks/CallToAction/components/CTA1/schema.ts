import { z } from 'zod'
import { baseLinkSchema } from '../shared/schema'

// Button schema with specific configuration for CTA1
export const buttonSchema = baseLinkSchema.describe('The primary CTA button configuration')

// Complete CTA1 schema
export const cta1Schema = z.object({
  title: z.string().min(1).max(100).describe('The title of the CTA section'),
  subtitle: z.string().describe('The subtitle text that explains the value proposition'),
  icon: z
    .string()
    .describe('A Lucide icon name (e.g., ArrowRight, Star, Users) that appears on the left side'),
  btn: buttonSchema,
})
