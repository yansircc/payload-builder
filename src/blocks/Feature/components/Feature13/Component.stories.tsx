import { Meta, StoryObj } from '@storybook/react'
import type { Feature13Fields, Media } from '@/payload-types'
import Feature13 from './Component'

const meta: Meta<typeof Feature13> = {
  title: 'Blocks/Feature/Feature13',
  component: Feature13,
  parameters: {
    layout: 'centered',
  },
}

type Feature = {
  title: string
  description: string
  image?: string | Media | null
  list: {
    icon?: string | null
    text: string
    id?: string | null
  }[]
  id?: string | null
}

export default meta

type Story = StoryObj<typeof Feature13>

const defaultFeature: Feature13Fields = {
  title: 'Feature 13: Cutting-Edge Solutions',
  features: [
    {
      title: 'High Performance',
      description:
        'Optimized for speed and efficiency, our platform offers exceptional performance.',
      image: {
        id: 'image-1',
        url: '/website-template-OG.webp',
        alt: 'High Performance',
        width: 100,
        height: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    {
      title: 'Scalable Architecture',
      description:
        'Our scalable architecture allows you to grow without limits, adapting to your needs.',
      image: {
        id: 'image-2',
        url: '/website-template-OG.webp',
        alt: 'Scalable Architecture',
        width: 100,
        height: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  ],
}

export const Default: Story = {
  args: defaultFeature,
}

export const WithoutImage: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.map((feature) => ({
      ...feature,
      image: feature.image ? undefined : feature.image,
    })),
  },
}

export const WithoutDescription: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.map((feature) => ({
      ...feature,
      description: '',
    })),
  },
}

export const SingleFeature: Story = {
  args: {
    ...defaultFeature,
    features: [defaultFeature.features[0] as Feature],
  },
}

export const MultipleFeatures: Story = {
  args: {
    ...defaultFeature,
    features: [defaultFeature.features[0] as Feature, defaultFeature.features[1] as Feature],
  },
}
