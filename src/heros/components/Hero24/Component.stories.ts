import type { Meta, StoryObj } from '@storybook/react'
import type { Hero24Fields } from '@/payload-types'
import Hero24 from './Component'

const meta = {
  title: 'Sections/Hero/Hero24',
  component: Hero24,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero24>

export default meta
type Story = StoryObj<typeof Hero24>

const defaultArgs: Hero24Fields = {
  title: 'Enterprise Solutions for Modern Teams',
  badge: 'Introducing Our Latest Platform',
  logo: {
    id: 'company-logo',
    alt: 'Company Logo',
    width: 120,
    height: 120,
    url: '/website-template-OG.webp',
    updatedAt: '2024-03-20T00:00:00.000Z',
    createdAt: '2024-03-20T00:00:00.000Z',
  },
  links: [
    {
      link: {
        type: 'custom',
        label: 'Get Started',
        url: '#',
        appearance: 'default',
        suffixIcon: 'MoveRight',
      },
    },
  ],
  features: [
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Advanced security features to protect your business data',
    },
    {
      icon: 'Zap',
      title: 'Lightning Fast',
      description: 'Optimized performance for quick response times',
    },
    {
      icon: 'BarChart',
      title: 'Analytics',
      description: 'Comprehensive insights into your business metrics',
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Tools designed for seamless team coordination',
    },
  ],
}

export const Default: Story = {
  args: defaultArgs,
}

export const WithoutBadge: Story = {
  args: {
    ...defaultArgs,
    badge: null,
  },
}

export const LongTitle: Story = {
  args: {
    ...defaultArgs,
    title: 'Enterprise Solutions for Modern Teams and Growing Organizations',
  },
}

export const DifferentIcons: Story = {
  args: {
    ...defaultArgs,
    features: [
      {
        icon: 'Rocket',
        title: 'Fast Deployment',
        description: 'Deploy your applications quickly and efficiently',
      },
      {
        icon: 'Lock',
        title: 'Secure Access',
        description: 'Control who has access to your sensitive data',
      },
      {
        icon: 'LineChart',
        title: 'Performance Tracking',
        description: 'Monitor and optimize your application performance',
      },
      {
        icon: 'Cloud',
        title: 'Cloud Integration',
        description: 'Seamlessly integrate with cloud services',
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
