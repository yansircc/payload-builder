import type { Meta, StoryObj } from '@storybook/react'
import type { Hero45Fields } from '@/payload-types'
import Hero45 from './Component'

const meta = {
  title: 'Sections/Hero/Hero45',
  component: Hero45,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero45>

export default meta
type Story = StoryObj<typeof Hero45>

const defaultArgs: Hero45Fields = {
  title: 'The Complete Platform for Modern Teams',
  badge: 'New Release v2.0',
  image: {
    id: 'hero-image',
    alt: 'Platform Dashboard',
    width: 1200,
    height: 600,
    url: '/website-template-OG.webp',
    updatedAt: '2024-03-20T00:00:00.000Z',
    createdAt: '2024-03-20T00:00:00.000Z',
  },
  features: [
    {
      icon: 'Zap',
      title: 'Lightning Fast',
      description: 'Optimized performance for quick response times and efficient workflows',
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Advanced security features to protect your business data and privacy',
    },
    {
      icon: 'BarChart',
      title: 'Powerful Analytics',
      description: 'Comprehensive insights to help you make data-driven decisions',
    },
  ],
}

export const Default: Story = {
  args: defaultArgs,
}

export const WithoutBadge: Story = {
  args: {
    ...defaultArgs,
    badge: '',
  },
}

export const LongTitle: Story = {
  args: {
    ...defaultArgs,
    title: 'The Complete Enterprise Platform for Modern Teams and Organizations',
  },
}

export const DifferentFeatures: Story = {
  args: {
    ...defaultArgs,
    features: [
      {
        icon: 'Rocket',
        title: 'Fast Deployment',
        description: 'Deploy your applications quickly and efficiently to production',
      },
      {
        icon: 'Users',
        title: 'Team Collaboration',
        description: 'Tools designed for seamless team coordination and communication',
      },
      {
        icon: 'Cloud',
        title: 'Cloud Integration',
        description: 'Seamlessly integrate with popular cloud services and platforms',
      },
    ],
  },
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: defaultArgs,
}

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: defaultArgs,
}

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: defaultArgs,
}
