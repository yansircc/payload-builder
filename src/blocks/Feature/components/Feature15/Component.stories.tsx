import type { Meta, StoryObj } from '@storybook/react'
import type { Feature15Fields } from '@/payload-types'
import Feature15 from './Component'

const meta: Meta<typeof Feature15> = {
  title: 'blocks/Feature/Feature15',
  component: Feature15,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Feature15>

const defaultFeature: Feature15Fields = {
  title: 'Our Core Features',
  subtitle: 'WHAT WE OFFER',
  description: 'Discover the powerful features that set our platform apart and drive your success.',
  features: [
    {
      icon: 'Zap',
      title: 'High Performance',
      description: 'Lightning-fast performance optimized for scale and efficiency.',
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-grade security protocols to protect your valuable data.',
    },
    {
      icon: 'BarChart',
      title: 'Advanced Analytics',
      description: 'Comprehensive insights and reporting tools for informed decisions.',
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Built-in tools for seamless team coordination and productivity.',
    },
  ],
}

export const Default: Story = {
  args: defaultFeature,
}

export const TwoFeatures: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.slice(0, 2),
  },
}

export const WithoutIcons: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.map((feature) => ({
      title: feature.title,
      description: feature.description,
    })),
  },
}

export const MinimalContent: Story = {
  args: {
    title: defaultFeature.title,
    subtitle: defaultFeature.subtitle,
    description: '',
    features: defaultFeature.features.slice(0, 2),
  },
}
