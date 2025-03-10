import type { Meta, StoryObj } from '@storybook/react'
import type { Feature13Fields } from '@/payload-types'
import Feature13 from './Component'

const meta: Meta<typeof Feature13> = {
  title: 'blocks/Feature/Feature13',
  component: Feature13,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Feature13>

const defaultFeature: Feature13Fields = {
  title: 'Featured Solutions',
  features: [
    {
      title: 'Enterprise Analytics',
      description: 'Advanced analytics platform for business intelligence',
      image: {
        id: 'feature-1',
        alt: 'Enterprise Analytics',
        url: '/website-template-OG.webp',
        width: 400,
        height: 300,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    {
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud solutions for modern businesses',
      image: {
        id: 'feature-2',
        alt: 'Cloud Infrastructure',
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

export const SingleFeature: Story = {
  args: {
    title: defaultFeature.title,
    features: [
      {
        title: 'Enterprise Analytics',
        description: 'Advanced analytics platform for business intelligence',
        image: {
          id: 'feature-1',
          alt: 'Enterprise Analytics',
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

export const WithoutImages: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.map((feature) => ({
      title: feature.title,
      description: feature.description,
    })),
  },
}
