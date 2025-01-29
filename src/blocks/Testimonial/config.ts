// Import payload types here
import { Block, Field } from 'payload'
import { testimonial14Fields } from './components/Testimonial14/config'
import { testimonial15Fields } from './components/Testimonial15/config'
import { testimonial4Fields } from './components/Testimonial4/config'
import { testimonial6Fields } from './components/Testimonial6/config'
import { testimonial7Fields } from './components/Testimonial7/config'

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
        { label: 'Testimonial 15', value: 'testimonial-15' },
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
    {
      ...testimonial15Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-15',
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
