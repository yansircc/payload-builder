import type { Meta, StoryObj } from '@storybook/react'
import type { CTA7Fields } from '@/payload-types'
import CTA7 from './Component'

const meta = {
  title: 'Blocks/CTA/CTA7',
  component: CTA7,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CTA7>

export default meta
type Story = StoryObj<typeof CTA7>

const defaultCTA: CTA7Fields = {
  title: 'Feature-Rich Call to Action',
  subtitle: 'DISCOVER OUR KEY FEATURES AND BENEFITS',
  links: [
    {
      link: {
        type: 'custom',
        label: 'Get Started',
        url: '#',
        appearance: 'default',
        suffixIcon: 'ArrowRight',
      },
    },
  ],
  lists: [
    {
      icon: 'Check',
      text: 'Responsive design for all devices',
    },
    {
      icon: 'Shield',
      text: 'Enterprise-grade security',
    },
    {
      icon: 'Zap',
      text: 'Lightning-fast performance',
    },
    {
      icon: 'Clock',
      text: '24/7 customer support',
    },
  ],
}

export const Default: Story = {
  args: defaultCTA,
}

export const WithoutSubtitle: Story = {
  args: {
    ...defaultCTA,
    subtitle: null,
  },
}

export const WithFewerFeatures: Story = {
  args: {
    ...defaultCTA,
    lists: defaultCTA.lists?.slice(0, 2),
  },
}

export const WithMoreFeatures: Story = {
  args: {
    ...defaultCTA,
    lists: [
      ...(defaultCTA.lists || []),
      {
        icon: 'Heart',
        text: 'User-friendly interface',
      },
      {
        icon: 'BarChart',
        text: 'Detailed analytics dashboard',
      },
    ],
  },
}

// Responsive Variants
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: defaultCTA,
}

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: defaultCTA,
}

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: defaultCTA,
}
