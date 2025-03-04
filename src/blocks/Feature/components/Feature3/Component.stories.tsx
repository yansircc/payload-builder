import type { Meta, StoryObj } from '@storybook/react'
import type { Feature3Fields } from '@/payload-types'
import Feature3 from './Component'

const meta: Meta<typeof Feature3> = {
  title: 'blocks/Feature/Feature3',
  component: Feature3,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Feature3>

const defaultFeature: Feature3Fields = {
  title: 'Our Core Features',
  features: [
    {
      icon: 'Zap',
      title: 'Lightning Fast Performance',
      description: 'Experience blazing-fast load times and smooth interactions across all devices.',
      image: {
        id: 'feature-1',
        alt: 'Performance Feature',
        url: '/website-template-OG.webp',
        width: 400,
        height: 300,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-grade security measures to protect your data and ensure privacy.',
      image: {
        id: 'feature-2',
        alt: 'Security Feature',
        url: '/website-template-OG.webp',
        width: 400,
        height: 300,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    {
      icon: 'Layers',
      title: 'Scalable Architecture',
      description: 'Built to grow with your business, from startup to enterprise scale.',
      image: {
        id: 'feature-3',
        alt: 'Scalability Feature',
        url: '/website-template-OG.webp',
        width: 400,
        height: 300,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  ],
}

export const Default: Story = {
  args: defaultFeature,
}

export const WithoutImages: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.map((feature) => ({
      ...feature,
      image: undefined,
    })),
  },
}

export const SingleFeature: Story = {
  args: {
    title: 'Our Core Features',
    features: [
      {
        title: 'Lightning Fast Performance',
        description:
          'Experience blazing-fast load times and smooth interactions across all devices.',
        icon: 'Zap',
        image: {
          id: 'feature-1',
          alt: 'Performance Feature',
          url: '/website-template-OG.webp',
          width: 400,
          height: 300,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    ],
  },
}
