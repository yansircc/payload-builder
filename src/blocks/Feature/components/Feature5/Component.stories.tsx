import type { Meta, StoryObj } from '@storybook/react'
import type { Feature5Fields } from '@/payload-types'
import Feature5 from './Component'

const meta: Meta<typeof Feature5> = {
  title: 'blocks/Feature/Feature5',
  component: Feature5,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Feature5>

const defaultFeature: Feature5Fields = {
  features: [
    {
      icon: 'Zap',
      title: 'High Performance',
      description: 'Lightning-fast load times and smooth interactions for optimal user experience.',
      image: {
        id: 'feature-1',
        alt: 'High Performance',
        url: '/website-template-OG.webp',
        width: 800,
        height: 450,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    {
      icon: 'Shield',
      title: 'Enhanced Security',
      description: 'Advanced security features to protect your data and ensure privacy.',
      image: {
        id: 'feature-2',
        alt: 'Enhanced Security',
        url: '/website-template-OG.webp',
        width: 400,
        height: 400,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    {
      icon: 'Layers',
      title: 'Scalable Solutions',
      description: 'Flexible architecture that grows with your business needs.',
      image: {
        id: 'feature-3',
        alt: 'Scalable Solutions',
        url: '/website-template-OG.webp',
        width: 400,
        height: 400,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  ],
  testimonial: {
    quote:
      "This solution has transformed our business operations completely. It's exactly what we needed.",
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'Tech Innovations',
    image: {
      id: 'testimonial-1',
      alt: 'Sarah Johnson',
      url: '/website-template-OG.webp',
      width: 100,
      height: 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
}

export const Default: Story = {
  args: defaultFeature,
}

export const WithoutTestimonial: Story = {
  args: {
    ...defaultFeature,
    testimonial: undefined,
  },
}

export const WithoutImages: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.map((feature) => ({
      ...feature,
      image: undefined,
    })),
    testimonial: {
      ...defaultFeature.testimonial!,
      image: undefined,
    },
  },
}
