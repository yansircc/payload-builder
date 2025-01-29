// Import payload types here
import { Block, Field } from 'payload'
import { testimonial14Fields } from './components/testimonial-14/config'
import { testimonial4Fields } from './components/testimonial-4/config'
import { testimonial6Fields } from './components/testimonial-6/config'
import { testimonial7Fields } from './components/testimonial-7/config'

// Import the testimonial fields config here

export const TestimonialBlock: Block = {
  slug: 'testimonial',
  interfaceName: 'TestimonialBlock',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: [
        { label: 'Testimonial 4', value: 'testimonial-4' },
        { label: 'Testimonial 6', value: 'testimonial-6' },
        { label: 'Testimonial 7', value: 'testimonial-7' },
        { label: 'Testimonial 14', value: 'testimonial-14' },
      ],
    },
    {
      ...testimonial4Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-4',
      },
    },
    {
      ...testimonial6Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-6',
      },
    },
    {
      ...testimonial7Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-7',
      },
    },
    {
      ...testimonial14Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-14',
      },
    },
  ],
}

export const TestimonialField: Field = {
  name: 'testimonial',
  type: 'group',
  fields: [
    {
      name: 'style',
      type: 'select',
      options: [{ label: 'Testimonial 14', value: 'testimonial-14' }],
    },
    {
      ...testimonial14Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-14',
      },
    },
  ],
}
