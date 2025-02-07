import { type GroupField } from 'payload'
import { z } from 'zod'
import {
  aboutSchemas,
  baseFields,
  commonSchemas,
  createArrayField,
  createFieldGroup,
  createSectionField,
} from '../shared/base-field'

/**
 * About2 field validation and type definitions
 */
export const schemas = {
  /** Main content */
  mainContent: z.object({
    title: aboutSchemas.title,
    description: aboutSchemas.description,
  }),

  /** Image gallery */
  imageGallery: z.object({
    first: commonSchemas.media.image.describe('First main image'),
    second: commonSchemas.media.image.describe('Second main image'),
    third: commonSchemas.media.image.describe('Third main image'),
  }),

  /** Stats section */
  stats: {
    title: commonSchemas.content.title,
    items: z
      .array(
        z.object({
          value: z.string().describe('Statistic value'),
          label: z.string().describe('Statistic label'),
        }),
      )
      .length(6),
  },

  /** Partners section */
  partners: {
    title: commonSchemas.content.title,
    items: z
      .array(
        z.object({
          logo: commonSchemas.media.image.describe('Partner company logo'),
          name: z.string().describe('Partner company name'),
        }),
      )
      .min(4)
      .max(8),
  },

  /** Benefits section */
  benefits: {
    title: commonSchemas.content.title,
    stats: z
      .array(
        z.object({
          value: z.string().describe('Benefit statistic value'),
          label: z.string().describe('Benefit statistic label'),
          description: z.string().describe('Benefit description'),
        }),
      )
      .length(2),
    images: z.object({
      first: commonSchemas.media.image.describe('First benefits image'),
      second: commonSchemas.media.image.describe('Second benefits image'),
      third: commonSchemas.media.image.describe('Third benefits image'),
    }),
  },

  /** Testimonial section */
  testimonial: z.object({
    logo: commonSchemas.media.image.describe('Company logo'),
    companyName: z.string().describe('Company name'),
    quote: z.string().describe('Testimonial quote'),
    author: z.object({
      name: z.string().describe('Author name'),
      role: z.string().describe('Author role'),
    }),
  }),
}

/**
 * Complete configuration for About2
 */
export const about2Fields: GroupField = {
  name: 'about-2',
  interfaceName: 'About2Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'Modern about section with statistics, partners, benefits, and testimonials',
  },
  fields: [
    // Main Content Section
    createSectionField({
      name: 'mainContent',
      label: 'Main Content',
      fields: [baseFields.content.title, baseFields.content.description],
    }),

    // Image Gallery
    createFieldGroup({
      name: 'images',
      label: 'Main Images',
      fields: [
        {
          ...baseFields.media.image,
          name: 'first',
          admin: { description: 'First image (largest)' },
        },
        {
          ...baseFields.media.image,
          name: 'second',
          admin: { description: 'Second image (medium)' },
        },
        {
          ...baseFields.media.image,
          name: 'third',
          admin: { description: 'Third image (smallest)' },
        },
      ],
      admin: { description: 'The three main images' },
    }),

    // Stats Section
    createSectionField({
      name: 'stats',
      label: 'Statistics',
      fields: [
        {
          ...baseFields.content.title,
          name: 'secondTitle',
          admin: { description: 'The title above the statistics grid' },
        },
        createArrayField({
          name: 'stats',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: { description: 'The statistic value (e.g., "21M", "12+")' },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: { description: 'The statistic label' },
            },
          ],
          minRows: 6,
          maxRows: 6,
          admin: { description: 'Statistics to display (exactly 6 items)' },
        }),
      ],
    }),

    // Partners Section
    createSectionField({
      name: 'partners',
      label: 'Trusted By',
      fields: [
        {
          ...baseFields.content.title,
          name: 'trustedByTitle',
          admin: { description: 'The title for the trusted by section' },
        },
        createArrayField({
          name: 'partners',
          fields: [
            {
              ...baseFields.media.image,
              name: 'logo',
              admin: { description: 'Partner company logo' },
            },
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: { description: 'Partner company name' },
            },
          ],
          minRows: 4,
          maxRows: 8,
          admin: { description: 'Partner logos and names (4-8 items)' },
        }),
      ],
    }),

    // Benefits Section
    createSectionField({
      name: 'benefits',
      label: 'Benefits',
      fields: [
        {
          ...baseFields.content.title,
          name: 'benefitsTitle',
          admin: { description: 'The title for the benefits section' },
        },
        createArrayField({
          name: 'benefitsStats',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              admin: { description: 'The benefit statistic value' },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: { description: 'The benefit statistic label' },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: { description: 'The benefit description' },
            },
          ],
          minRows: 2,
          maxRows: 2,
          admin: { description: 'Benefits statistics (exactly 2 items)' },
        }),
        createFieldGroup({
          name: 'benefitsImages',
          label: 'Benefits Images',
          fields: [
            {
              ...baseFields.media.image,
              name: 'first',
              admin: { description: 'First benefits image' },
            },
            {
              ...baseFields.media.image,
              name: 'second',
              admin: { description: 'Second benefits image' },
            },
            {
              ...baseFields.media.image,
              name: 'third',
              admin: { description: 'Third benefits image' },
            },
          ],
          admin: { description: 'Images for the benefits section' },
        }),
      ],
    }),

    // Testimonial Section
    createSectionField({
      name: 'testimonial',
      label: 'Customer Testimonial',
      fields: [
        {
          ...baseFields.media.image,
          name: 'logo',
          admin: { description: 'Company logo' },
        },
        {
          name: 'companyName',
          type: 'text',
          required: true,
          admin: { description: 'Company name' },
        },
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          admin: { description: 'Testimonial quote' },
        },
        createFieldGroup({
          name: 'author',
          label: 'Author Details',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: { description: 'Author name' },
            },
            {
              name: 'role',
              type: 'text',
              required: true,
              admin: { description: 'Author role' },
            },
          ],
          admin: { description: 'Testimonial author' },
        }),
      ],
    }),
  ],
}
