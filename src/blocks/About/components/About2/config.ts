import { type GroupField } from 'payload'
import { z } from 'zod'
import { aboutSchemas } from '../shared/base-field'

/**
 * About2 field validation and type definitions
 */
export const schemas = {
  title: aboutSchemas.title,
  description: aboutSchemas.description,
  images: z.object({
    first: z.any().describe('First main image'),
    second: z.any().describe('Second main image'),
    third: z.any().describe('Third main image'),
  }),
  secondTitle: z.string().describe('Title above statistics grid'),
  stats: z
    .array(
      z.object({
        value: z.string().describe('Statistic value'),
        label: z.string().describe('Statistic label'),
      }),
    )
    .length(6),
  trustedByTitle: z.string().describe('Trusted by section title'),
  partners: z
    .array(
      z.object({
        logo: z.any().describe('Partner company logo'),
        name: z.string().describe('Partner company name'),
      }),
    )
    .min(4)
    .max(8),
  benefitsTitle: z.string().describe('Benefits section title'),
  benefitsStats: z
    .array(
      z.object({
        value: z.string().describe('Benefit statistic value'),
        label: z.string().describe('Benefit statistic label'),
        description: z.string().describe('Benefit description'),
      }),
    )
    .length(2),
  testimonial: z.object({
    logo: z.any().describe('Company logo'),
    companyName: z.string().describe('Company name'),
    quote: z.string().describe('Testimonial quote'),
    author: z.object({
      name: z.string().describe('Author name'),
      role: z.string().describe('Author role'),
    }),
  }),
  benefitsImages: z.object({
    first: z.any().describe('First benefits image'),
    second: z.any().describe('Second benefits image'),
    third: z.any().describe('Third benefits image'),
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
    description: 'About section 2 fields',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The main title for the about section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The main description text',
      },
    },
    {
      name: 'images',
      type: 'group',
      label: 'Main Images',
      admin: {
        description: 'The three main images',
      },
      fields: [
        {
          name: 'first',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'First image (largest)',
          },
        },
        {
          name: 'second',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Second image (medium)',
          },
        },
        {
          name: 'third',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Third image (smallest)',
          },
        },
      ],
    },
    {
      name: 'secondTitle',
      type: 'text',
      required: true,
      admin: {
        description: 'The title above the statistics grid',
      },
    },
    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 6,
      maxRows: 6,
      admin: {
        description: 'Statistics to display (exactly 6 items)',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'The statistic value (e.g., "21M", "12+")',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'The statistic label',
          },
        },
      ],
    },
    {
      name: 'trustedByTitle',
      type: 'text',
      required: true,
      admin: {
        description: 'The title for the trusted by section',
      },
    },
    {
      name: 'partners',
      type: 'array',
      required: true,
      minRows: 4,
      maxRows: 8,
      admin: {
        description: 'Partner logos and names (4-8 items)',
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Partner company logo',
          },
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Partner company name',
          },
        },
      ],
    },
    {
      name: 'benefitsTitle',
      type: 'text',
      required: true,
      admin: {
        description: 'The title for the benefits section',
      },
    },
    {
      name: 'benefitsStats',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 2,
      admin: {
        description: 'Benefits statistics (exactly 2 items)',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'The benefit statistic value',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'The benefit statistic label',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'The benefit description',
          },
        },
      ],
    },
    {
      name: 'testimonial',
      type: 'group',
      label: 'Customer Testimonial',
      admin: {
        description: 'Customer testimonial',
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Company logo',
          },
        },
        {
          name: 'companyName',
          type: 'text',
          required: true,
          admin: {
            description: 'Company name',
          },
        },
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Testimonial quote',
          },
        },
        {
          name: 'author',
          type: 'group',
          label: 'Author Details',
          admin: {
            description: 'Testimonial author',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: 'Author name',
              },
            },
            {
              name: 'role',
              type: 'text',
              required: true,
              admin: {
                description: 'Author role',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'benefitsImages',
      type: 'group',
      label: 'Benefits Images',
      admin: {
        description: 'Images for the benefits section',
      },
      fields: [
        {
          name: 'first',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'First benefits image',
          },
        },
        {
          name: 'second',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Second benefits image',
          },
        },
        {
          name: 'third',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Third benefits image',
          },
        },
      ],
    },
  ],
}
