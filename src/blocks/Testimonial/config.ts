// Import payload types here
import { Block, Field } from 'payload'
import { testimonial12Fields } from './components/Testimonial12/config'
import { testimonial14Fields } from './components/Testimonial14/config'
import { testimonial15Fields } from './components/Testimonial15/config'
import { testimonial16Fields } from './components/Testimonial16/config'
import { testimonial17Fields } from './components/Testimonial17/config'
import { testimonial18Fields } from './components/Testimonial18/config'
import { testimonial19Fields } from './components/Testimonial19/config'
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
        { label: 'Testimonial 12', value: 'testimonial-12' },
        { label: 'Testimonial 14', value: 'testimonial-14' },
        { label: 'Testimonial 15', value: 'testimonial-15' },
        { label: 'Testimonial 16', value: 'testimonial-16' },
        { label: 'Testimonial 17', value: 'testimonial-17' },
        { label: 'Testimonial 18', value: 'testimonial-18' },
        { label: 'Testimonial 19', value: 'testimonial-19' },
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
      ...testimonial12Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-12',
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
    {
      ...testimonial16Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-16',
      },
    },
    {
      ...testimonial17Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-17',
      },
    },
    {
      ...testimonial18Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-18',
      },
    },
    {
      ...testimonial19Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-19',
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
      options: [
        { label: 'Testimonial 4', value: 'testimonial-4' },
        { label: 'Testimonial 6', value: 'testimonial-6' },
        { label: 'Testimonial 7', value: 'testimonial-7' },
        { label: 'Testimonial 12', value: 'testimonial-12' },
        { label: 'Testimonial 14', value: 'testimonial-14' },
        { label: 'Testimonial 15', value: 'testimonial-15' },
        { label: 'Testimonial 16', value: 'testimonial-16' },
        { label: 'Testimonial 17', value: 'testimonial-17' },
        { label: 'Testimonial 18', value: 'testimonial-18' },
        { label: 'Testimonial 19', value: 'testimonial-19' },
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
      ...testimonial12Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-12',
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
    {
      ...testimonial16Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-16',
      },
    },
    {
      ...testimonial17Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-17',
      },
    },
    {
      ...testimonial18Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-18',
      },
    },
    {
      ...testimonial19Fields,
      admin: {
        condition: (_, siblingData) => siblingData.style === 'testimonial-19',
      },
    },
  ],
}
