import type { Meta, StoryObj } from '@storybook/react'
import type { Feature3Fields } from '@/payload-types'
import Feature3 from './Component'

const meta: Meta<typeof Feature3> = {
  title: 'Blocks/Feature/Feature3',
  component: Feature3,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Feature3>

const defaultFeature: Feature3Fields = {
  title: 'Our Amazing Features',
  features: [
    {
      title: 'Feature 1',
      description: 'This is the description for Feature 1. It explains its benefits and usage.',
      icon: 'Star',
      image: {
        id: 'image-1',
        url: '/image-1.jpg',
        alt: 'Feature 1 image',
        width: 120,
        height: 120,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    {
      title: 'Feature 2',
      description: 'This is the description for Feature 2. It explains its benefits and usage.',
      icon: 'Zap',
      image: {
        id: 'image-2',
        url: '/image-2.jpg',
        alt: 'Feature 2 image',
        width: 120,
        height: 120,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    {
      title: 'Feature 3',
      description: 'This is the description for Feature 3. It explains its benefits and usage.',
      icon: 'CheckCircle',
      image: {
        id: 'image-3',
        url: '/image-3.jpg',
        alt: 'Feature 3 image',
        width: 120,
        height: 120,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  ],
}

export const Default: Story = {
  args: defaultFeature,
}

export const WithoutFeatures: Story = {
  args: {
    ...defaultFeature,
    features: [],
  },
}

export const WithNoImage: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.map((feature) => ({
      ...feature,
      image: undefined,
    })),
  },
}

export const WithNoIcon: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.map((feature) => ({
      ...feature,
      icon: undefined,
    })),
  },
}

export const CustomDescription: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.map((feature) => ({
      ...feature,
      description: 'This is a custom description for testing purposes.',
    })),
  },
}
