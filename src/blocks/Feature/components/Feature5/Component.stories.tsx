import type { Meta, StoryObj } from '@storybook/react'
import type { Feature5Fields } from '@/payload-types'
import Feature5 from './Component'

const meta: Meta<typeof Feature5> = {
  title: 'Blocks/Feature/Feature5',
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
      title: 'Feature 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
      icon: 'Zap',
      image: {
        id: 'image-1',
        alt: 'Feature 1 Image',
        url: '/website-template-OG.webp',
        width: 120,
        height: 120,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    {
      title: 'Feature 2',
      description:
        'Suspendisse potenti. Fusce nec facilisis elit. Nulla gravida nisi dui, quis eleifend felis consequat vel.',
      icon: 'Settings',
      image: {
        id: 'image-2',
        alt: 'Feature 2 Image',
        url: '/website-template-OG.webp',
        width: 120,
        height: 120,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    {
      title: 'Feature 3',
      description:
        'Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.',
      icon: 'Rocket',
      image: {
        id: 'image-3',
        alt: 'Feature 3 Image',
        url: '/website-template-OG.webp',
        width: 120,
        height: 120,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  ],
  testimonial: {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.',
    name: 'John Doe',
    role: 'CEO, Example Company',
    company: 'Example Company',
    image: {
      id: 'image-4',
      alt: 'Testimonial Image',
      url: '/website-template-OG.webp',
      width: 120,
      height: 120,
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
    testimonial: {
      quote: 'This is a great feature, I highly recommend it!',
      name: 'Jane Doe',
      role: 'Marketing Lead',
      company: 'Another Company',
      image: undefined,
    },
  },
}

export const WithoutFeatures: Story = {
  args: {
    ...defaultFeature,
    features: [],
  },
}

export const SingleFeature: Story = {
  args: {
    ...defaultFeature,
    features: [
      {
        title: 'Feature 1',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
        icon: 'Zap',
        image: {
          id: 'image-1',
          alt: 'Feature 1 Image',
          url: '/website-template-OG.webp',
          width: 120,
          height: 120,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    ],
  },
}

export const WithoutImage: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.map((feature) => ({
      ...feature,
      image: undefined,
    })),
  },
}

export const WithOutIcon: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.map((feature) => ({
      ...feature,
      icon: undefined,
    })),
  },
}
