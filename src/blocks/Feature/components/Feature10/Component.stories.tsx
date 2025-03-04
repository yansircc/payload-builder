import type { Meta, StoryObj } from '@storybook/react'
import type { Feature10Fields } from '@/payload-types'
import Feature10 from './Component'

const meta: Meta<typeof Feature10> = {
  title: 'blocks/Feature/Feature10',
  component: Feature10,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Feature10>

const defaultFeature: Feature10Fields = {
  title: 'Why Choose Our Platform',
  description: 'FEATURES & BENEFITS',
  features: [
    {
      icon: 'Zap',
      title: 'Fast Performance',
      description: 'Lightning-fast response times and optimized processing for maximum efficiency.',
    },
    {
      icon: 'Shield',
      title: 'Secure Platform',
      description: 'Enterprise-grade security measures to protect your valuable data.',
    },
    {
      icon: 'BarChart',
      title: 'Analytics',
      description: 'Comprehensive insights and reporting tools for informed decision-making.',
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Seamless collaboration features for enhanced team productivity.',
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
    title: 'Why Choose Our Platform',
    description: 'FEATURES & BENEFITS',
    features: defaultFeature.features.map((feature) => ({
      title: feature.title,
      description: feature.description,
    })),
  },
}
