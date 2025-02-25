import type { Meta, StoryObj } from '@storybook/react'
import type { Feature11Fields } from '@/payload-types'
import Feature11 from './Component'

const meta: Meta<typeof Feature11> = {
  title: 'Blocks/Feature/Feature11',
  component: Feature11,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Feature11>

const defaultFeature: Feature11Fields = {
  title: 'Feature 11: Innovate with Precision',
  description:
    'Our platform offers unmatched flexibility and scalability to fit your business needs. Discover powerful features designed to drive efficiency and growth.',
  image: {
    id: 'image-1',
    alt: 'Feature 11',
    url: '/website-template-OG.webp',
    width: 120,
    height: 120,
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
      title: 'Feature 1',
      icon: 'Rocket',
    },
    {
      title: 'Feature 2',
      icon: 'Cloud',
    },
    {
      title: 'Feature 3',
      icon: 'Lock',
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
    buttonGroup: [],
  },
}

export const WithoutFeatures: Story = {
  args: {
    ...defaultFeature,
    features: [],
  },
}

export const WithCustomFeatureTitle: Story = {
  args: {
    ...defaultFeature,
    features: defaultFeature.features.map((feature) => ({
      ...feature,
      title: 'Custom Title for Feature',
    })),
  },
}
