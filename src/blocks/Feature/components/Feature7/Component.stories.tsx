import type { Meta, StoryObj } from '@storybook/react'
import type { Feature7Fields } from '@/payload-types'
import Feature7 from './Component'

const meta: Meta<typeof Feature7> = {
  title: 'blocks/Feature/Feature7',
  component: Feature7,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Feature7>

const defaultFeature: Feature7Fields = {
  icon: 'Sparkles',
  title: 'Innovative Solutions for Modern Challenges',
  description:
    'Leverage our cutting-edge technology to transform your business operations and achieve unprecedented growth.',
  image: {
    id: 'feature-7-main',
    alt: 'Innovation Solutions',
    url: '/website-template-OG.webp',
    width: 800,
    height: 600,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  features: [
    {
      icon: 'Zap',
      title: 'Lightning Fast Processing',
    },
    {
      icon: 'Lock',
      title: 'Advanced Security Protocols',
    },
    {
      icon: 'BarChart2',
      title: 'Comprehensive Analytics',
    },
    {
      icon: 'RefreshCcw',
      title: 'Seamless Integration',
    },
    {
      icon: 'Clock',
      title: '24/7 System Monitoring',
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
