import { Meta, StoryObj } from '@storybook/react'
import { Feature15Fields, Media } from '@/payload-types'
import Feature15 from './Component'

const meta: Meta<typeof Feature15> = {
  title: 'Blocks/Feature/Feature15',
  component: Feature15,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Feature = {
  title: string
  description: string
  image?: string | Media | null
  list: {
    icon?: string | null
    text: string
    id?: string | null
  }[]
  id?: string | null
}

type Story = StoryObj<typeof Feature15>

const defaultFeature: Feature15Fields = {
  title: 'Feature 15: Innovation at Its Best',
  subtitle: 'Driving Growth with Modern Solutions',
  description:
    'We are committed to delivering cutting-edge solutions that empower businesses and drive growth, enabling you to scale effortlessly.',
  features: [
    {
      title: 'Feature 1: High Performance',
      description: 'Optimized for maximum speed and efficiency to handle your growing needs.',
      icon: 'CheckCircle',
      id: 'feature-1',
    },
    {
      title: 'Feature 2: Scalability',
      description: 'Easily scale up as your business expands with our flexible platform.',
      icon: 'ArrowRight',
      id: 'feature-2',
    },
    {
      title: 'Feature 3: Security',
      description:
        'Our top priority is to protect your data with state-of-the-art security protocols.',
      icon: 'Lock',
      id: 'feature-3',
    },
  ],
}

export const Default: Story = {
  args: defaultFeature,
}

export const WithoutIcon: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.map((feature) => ({
      ...feature,
      icon: undefined, // Removing icons to match the variant
    })),
  },
}

export const WithoutDescription: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.map((feature) => ({
      ...feature,
      description: '',
    })),
  },
}

export const SingleFeature: Story = {
  args: {
    ...defaultFeature,
    features: [defaultFeature.features[0] as Feature],
  },
}

export const MultipleFeatures: Story = {
  args: {
    ...defaultFeature,
    features: [defaultFeature?.features[0] as Feature, defaultFeature.features[1] as Feature],
  },
}
