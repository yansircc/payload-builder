import { Field, GroupField } from 'payload'

import {
  basicFields,
  createTestimonialField,
  testimonialSchemas,
} from '../shared/base-field'

/**
 * Testimonial 12 field validation and type definitions
 */
export const schemas = {
  authorName: testimonialSchemas.authorName,
  authorRole: testimonialSchemas.authorRole,
  authorImage: testimonialSchemas.authorImage,
  companyName: testimonialSchemas.authorCompany,
  companyLogo: testimonialSchemas.authorImage,
  quote: testimonialSchemas.quote,
}

// Additional fields specific to Testimonial12
const metricsFields: Field[] = [
  {
    name: 'companyName',
    type: 'text',
    required: true,
    admin: {
      description: 'Name of the company',
    },
  },
  {
    name: 'companyLogo',
    type: 'upload',
    relationTo: 'media',
    required: true,
    admin: {
      description: 'Company logo',
    },
  },
  {
    name: 'monthlyActiveUsers',
    type: 'text',
    required: true,
    admin: {
      description: 'Monthly active users metric (e.g. 2.2x)',
    },
  },
  {
    name: 'monthlyActiveUsersLabel',
    type: 'text',
    required: true,
    defaultValue: 'Monthly Active Users',
    admin: {
      description: 'Label for monthly active users metric',
    },
  },
  {
    name: 'monthlyActiveUsersPeriod',
    type: 'text',
    required: true,
    defaultValue: 'Since last month',
    admin: {
      description: 'Time period for monthly active users metric',
    },
  },
  {
    name: 'revenueIncrease',
    type: 'text',
    required: true,
    admin: {
      description: 'Revenue increase metric (e.g. 256%)',
    },
  },
  {
    name: 'revenueIncreaseLabel',
    type: 'text',
    required: true,
    defaultValue: 'Increase in Revenue',
    admin: {
      description: 'Label for revenue increase metric',
    },
  },
  {
    name: 'revenueIncreasePeriod',
    type: 'text',
    required: true,
    defaultValue: 'Since last year',
    admin: {
      description: 'Time period for revenue increase metric',
    },
  },
]

/**
 * Complete configuration for Testimonial 12
 */
export const testimonial12Fields: GroupField = {
  name: 'testimonial-12',
  interfaceName: 'Testimonial12Fields',
  label: false,
  type: 'group',
  admin: {
    description:
      'A carousel testimonial component with metrics and company information',
  },
  fields: [
    ...createTestimonialField({
      arrays: [
        {
          name: 'testimonials',
          fields: [
            basicFields.quote,
            basicFields.authorName,
            basicFields.authorRole,
            basicFields.authorImage,
            ...metricsFields,
          ],
          minRows: 1,
          maxRows: 10,
          admin: {
            description: 'Testimonial items (1-10)',
          },
        },
      ],
    }).fields,
  ],
}
