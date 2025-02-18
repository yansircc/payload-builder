import { z } from 'zod'

// Create a type-safe icon enum from Lucide icons
export const LucideIconEnum = z.string().describe('Lucide icon name')

// Base link appearance options
export const LinkAppearanceEnum = z.enum(['default', 'ghost', 'outline', 'secondary'])

// Base link schema that can be extended by specific components
export const baseLinkSchema = z.object({
  type: z.enum(['custom', 'reference']).default('custom'),
  url: z.string().default('#'),
  label: z.string().min(1),
  prefixIcon: LucideIconEnum.optional(),
  suffixIcon: LucideIconEnum.optional(),
  appearance: LinkAppearanceEnum.default('default'),
})

// Type helper for extending the base link schema
export type BaseLinkSchema = typeof baseLinkSchema

// Example of how to extend the base schema:
/*
export const extendedLinkSchema = baseLinkSchema.extend({
  // Add additional fields specific to your component
  customField: z.string(),
  // Override existing fields with more specific requirements
  appearance: z.literal('default'),
})
*/
