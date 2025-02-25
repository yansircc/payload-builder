import type { Meta, StoryObj } from '@storybook/react'
import type { Feature6Fields } from '@/payload-types'
import Feature6 from './Component'

const meta: Meta<typeof Feature6> = {
  title: 'blocks/Feature/Feature6',
  component: Feature6,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Feature6>

const defaultFeature: Feature6Fields = {
  icon: 'Rocket',
  title: 'Transform Your Business Process',
  description:
    'Streamline your operations and boost productivity with our comprehensive suite of tools and features designed for modern businesses.',
  image: {
    id: 'feature-6-main',
    alt: 'Business Process',
    url: '/website-template-OG.webp',
    width: 800,
    height: 600,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  features: [
    {
      icon: 'CheckCircle',
      title: 'Automated Workflow Management',
    },
    {
      icon: 'Shield',
      title: 'Enterprise-Grade Security',
    },
    {
      icon: 'BarChart',
      title: 'Real-time Analytics Dashboard',
    },
    {
      icon: 'Users',
      title: 'Team Collaboration Tools',
    },
    {
      icon: 'Cloud',
      title: 'Cloud-based Infrastructure',
    },
  ],
}

export const Default: Story = {
  args: defaultFeature,
}

export const WithoutIcon: Story = {
  args: {
    ...defaultFeature,
    icon: undefined,
  },
}

export const WithoutImage: Story = {
  args: {
    ...defaultFeature,
    image: undefined,
  },
}

export const MinimalFeatures: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.slice(0, 3),
  },
}
