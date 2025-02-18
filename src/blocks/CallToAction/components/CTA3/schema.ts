import { z } from 'zod'
import { baseLinkSchema } from '../shared/schema'

// Extend the base link schema for CTA3's specific needs
const cta3LinkSchema = baseLinkSchema.extend({
  // Override appearance to be more specific for CTA3
  appearance: z.enum(['default', 'ghost']),
})

// Button schema with specific link configuration
export const buttonSchema = z.object({
  link: cta3LinkSchema.describe(
    'Primary CTA button that should convey a strong call-to-action with a directional icon',
  ),
})

// Feature list item schema with specific link configuration
export const listItemSchema = z.object({
  link: cta3LinkSchema.describe(
    'Secondary feature link that should indicate additional information or a sub-action',
  ),
  description: z.string().min(1).describe('Brief description of the feature'),
})

// Complete CTA3 schema
export const cta3Schema = z.object({
  title: z.string().min(1).max(100).describe('The title of the CTA section'),
  subtitle: z.string().describe('The subtitle text below the main title'),
  buttons: z.array(buttonSchema).min(1).max(2).describe('Primary CTA buttons (1-2 buttons)'),
  list: z.array(listItemSchema).min(1).max(5).describe('List of feature links with descriptions'),
})
