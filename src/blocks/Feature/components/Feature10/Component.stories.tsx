import type { Meta, StoryObj } from '@storybook/react'
import type { Feature10Fields } from '@/payload-types'
import Feature10 from './Component'

const meta: Meta<typeof Feature10> = {
  title: 'Blocks/Feature/Feature10',
  component: Feature10,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Feature10>

const defaultFeature: Feature10Fields = {
  title: 'Feature 10: Innovate Your Future',
  description:
    'Enhance your business operations with features designed to empower growth and maximize productivity. Our platform offers seamless integration, scalability, and customizable options.',
  features: [
    {
      title: 'Feature 1',
      icon: 'CheckCircle',
      description:
        'Streamline your workflows with our powerful automation tools, reducing manual effort and increasing productivity.',
    },
    {
      title: 'Feature 2',
      icon: 'Rocket',
      description:
        'Unlock the potential of scalable infrastructure, ensuring your business is ready to handle future growth with ease.',
    },
    {
      title: 'Feature 3',
      icon: 'Settings',
      description:
        'Customize your experience with flexible configurations, allowing you to tailor solutions that meet your unique needs.',
    },
    {
      title: 'Feature 4',
      icon: 'Cloud',
      description:
        'Leverage secure, cloud-based solutions for greater data access, security, and management flexibility.',
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
      icon: undefined,
    })),
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
