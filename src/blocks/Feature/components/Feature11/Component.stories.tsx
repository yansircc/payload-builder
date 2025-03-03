import type { Meta, StoryObj } from '@storybook/react'
import type { Feature11Fields } from '@/payload-types'
import Feature11 from './Component'

const meta: Meta<typeof Feature11> = {
  title: 'blocks/Feature/Feature11',
  component: Feature11,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Feature11>

const defaultFeature: Feature11Fields = {
  title: 'Transform Your Business with Modern Solutions',
  description:
    'Leverage our cutting-edge platform to streamline operations and drive growth with powerful features designed for modern businesses.',
  image: {
    id: 'feature-11-main',
    alt: 'Business Solutions',
    url: '/website-template-OG.webp',
    width: 800,
    height: 600,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  buttonGroup: [
    {
      link: {
        type: 'custom',
        label: 'Get Started',
        url: '#',
        appearance: 'default',
        prefixIcon: 'ArrowRight',
        newTab: false,
      },
    },
    {
      link: {
        type: 'custom',
        label: 'Learn More',
        url: '#',
        appearance: 'ghost',
        prefixIcon: 'Info',
        newTab: false,
      },
    },
  ],
  features: [
    {
      icon: 'Zap',
      title: 'Lightning Fast',
    },
    {
      icon: 'Shield',
      title: 'Secure Platform',
    },
    {
      icon: 'BarChart',
      title: 'Analytics',
    },
    {
      icon: 'Users',
      title: 'Team Features',
    },
  ],
}

export const Default: Story = {
  args: defaultFeature,
}

export const WithoutImage: Story = {
  args: {
    ...defaultFeature,
    image: undefined,
  },
}

export const WithoutButtons: Story = {
  args: {
    ...defaultFeature,
    buttonGroup: undefined,
  },
}

export const MinimalFeatures: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.slice(0, 2),
  },
}
