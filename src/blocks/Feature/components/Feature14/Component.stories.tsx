import { Meta, StoryObj } from '@storybook/react'
import { Feature14Fields, Media } from '@/payload-types'
import Feature14 from './Component'

const meta: Meta<typeof Feature14> = {
  title: 'Blocks/Feature/Feature14',
  component: Feature14,
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

type Story = StoryObj<typeof Feature14>

const defaultFeature: Feature14Fields = {
  features: [
    {
      title: 'Feature 1',
      description: 'Description for feature 1',
      image: {
        id: 'image-1',
        url: '/website-template-OG.webp',
        alt: 'Feature 1',
        width: 100,
        height: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      list: [
        {
          text: 'Feature 1 list item 1',
        },
        {
          text: 'Feature 1 list item 2',
        },
      ],
    },
    {
      title: 'Feature 2',
      description: 'Description for feature 2',
      image: {
        id: 'image-2',
        url: '/website-template-OG.webp',
        alt: 'Feature 2',
        width: 100,
        height: 100,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      list: [
        {
          text: 'Feature 2 list item 1',
        },
        {
          text: 'Feature 2 list item 2',
        },
      ],
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
      image: undefined,
    })),
  },
}

export const WithoutList: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.map((feature) => ({
      ...feature,
      list: [],
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
