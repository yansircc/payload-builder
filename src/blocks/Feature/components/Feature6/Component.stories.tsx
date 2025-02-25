import type { Meta, StoryObj } from '@storybook/react'
import type { Feature6Fields } from '@/payload-types'
import Feature6 from './Component'

const meta: Meta<typeof Feature6> = {
  title: 'Blocks/Feature/Feature6',
  component: Feature6,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Feature6>

const defaultFeature: Feature6Fields = {
  title: 'Feature 6: Enhance Your Experience',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet, nisi euismod euismod facilisis, arcu felis tempus dui, eget ultricies sem turpis sit amet lectus.',
  icon: 'Zap',
  image: {
    id: 'image-1',
    alt: 'Feature 6 Image',
    url: '/website-template-OG.webp',
    width: 120,
    height: 120,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  features: [
    {
      title: 'Feature 1',
      icon: 'CheckCircle',
    },
    {
      title: 'Feature 2',
      icon: 'Settings',
    },
    {
      title: 'Feature 3',
      icon: 'Rocket',
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
export const WithoutTitle: Story = {
  args: {
    ...defaultFeature,
    title: '',
  },
}
export const WithoutDescription: Story = {
  args: {
    ...defaultFeature,
    description: '',
  },
}

export const WithoutFeatures: Story = {
  args: {
    ...defaultFeature,
    features: [],
  },
}

export const WithCustomTitle: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.map((feature) => ({
      ...feature,
      title: 'Custom Title for Feature',
    })),
  },
}
