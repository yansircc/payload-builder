import { Field, GroupField } from 'payload'
import { testimonialSchemas } from '../shared/base-field'

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

/**
 * Complete configuration for Testimonial 12
 */
export const testimonial12Fields: GroupField = {
  name: 'testimonial-12',
  interfaceName: 'Testimonial12Fields',
  label: false,
  type: 'group',
  admin: {
    description: 'A carousel testimonial component with metrics and company information',
  },
  fields: [
    {
      type: 'array',
      name: 'testimonials',
      fields: [
        {
          name: 'authorName',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the testimonial author',
          },
        } as Field,
        {
          name: 'authorRole',
          type: 'text',
          required: true,
          admin: {
            description: 'Role/position of the author',
          },
        } as Field,
        {
          name: 'authorImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Author profile image',
          },
        } as Field,
        {
          name: 'companyName',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the company',
          },
        } as Field,
        {
          name: 'companyLogo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Company logo',
          },
        } as Field,
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Testimonial quote text',
          },
        } as Field,
        {
          name: 'monthlyActiveUsers',
          type: 'text',
          required: true,
          admin: {
            description: 'Monthly active users metric (e.g. 2.2x)',
          },
        } as Field,
        {
          name: 'monthlyActiveUsersLabel',
          type: 'text',
          required: true,
          defaultValue: 'Monthly Active Users',
          admin: {
            description: 'Label for monthly active users metric',
          },
        } as Field,
        {
          name: 'monthlyActiveUsersPeriod',
          type: 'text',
          required: true,
          defaultValue: 'Since last month',
          admin: {
            description: 'Time period for monthly active users metric',
          },
        } as Field,
        {
          name: 'revenueIncrease',
          type: 'text',
          required: true,
          admin: {
            description: 'Revenue increase metric (e.g. 256%)',
          },
        } as Field,
        {
          name: 'revenueIncreaseLabel',
          type: 'text',
          required: true,
          defaultValue: 'Increase in Revenue',
          admin: {
            description: 'Label for revenue increase metric',
          },
        } as Field,
        {
          name: 'revenueIncreasePeriod',
          type: 'text',
          required: true,
          defaultValue: 'Since last year',
          admin: {
            description: 'Time period for revenue increase metric',
          },
        } as Field,
      ],
      minRows: 1,
      maxRows: 10,
      admin: {
        description: 'Testimonial items (1-10)',
      },
    } as Field,
  ],
}
