import type { Meta, StoryObj } from '@storybook/react'
import type { Feature14Fields } from '@/payload-types'
import Feature14 from './Component'

const meta: Meta<typeof Feature14> = {
  title: 'blocks/Feature/Feature14',
  component: Feature14,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Feature14>

const defaultFeature: Feature14Fields = {
  features: [
    {
      title: 'Enterprise Solutions',
      description: 'Comprehensive enterprise-grade solutions designed for large-scale operations.',
      image: {
        id: 'feature-1',
        alt: 'Enterprise Solutions',
        url: '/website-template-OG.webp',
        width: 800,
        height: 600,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      list: [
        {
          icon: 'Check',
          text: 'Scalable Architecture',
        },
        {
          icon: 'Shield',
          text: 'Enterprise Security',
        },
        {
          icon: 'Zap',
          text: 'High Performance',
        },
      ],
    },
    {
      title: 'Cloud Infrastructure',
      description: 'Modern cloud infrastructure built for reliability and scalability.',
      image: {
        id: 'feature-2',
        alt: 'Cloud Infrastructure',
        url: '/website-template-OG.webp',
        width: 800,
        height: 600,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      list: [
        {
          icon: 'Cloud',
          text: 'Global CDN',
        },
        {
          icon: 'Lock',
          text: 'Advanced Security',
        },
        {
          icon: 'BarChart',
          text: 'Real-time Monitoring',
        },
      ],
    },
  ],
}

export const Default: Story = {
  args: defaultFeature,
}

export const SingleFeature: Story = {
  args: {
    features: [
      {
        title: 'Enterprise Solutions',
        description:
          'Comprehensive enterprise-grade solutions designed for large-scale operations.',
        image: {
          id: 'feature-1',
          alt: 'Enterprise Solutions',
          url: '/website-template-OG.webp',
          width: 800,
          height: 600,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        list: [
          {
            icon: 'Check',
            text: 'Scalable Architecture',
          },
          {
            icon: 'Shield',
            text: 'Enterprise Security',
          },
          {
            icon: 'Zap',
            text: 'High Performance',
          },
        ],
      },
    ],
  },
}

export const WithoutImages: Story = {
  args: {
    features: defaultFeature.features.map((feature) => ({
      title: feature.title,
      description: feature.description,
      list: feature.list,
    })),
  },
}

export const WithoutList: Story = {
  args: {
    features: defaultFeature.features.map((feature) => ({
      title: feature.title,
      description: feature.description,
      image: feature.image,
      list: [], // Add empty list array since it's required
    })),
  },
}
