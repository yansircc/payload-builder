import type { Meta, StoryObj } from '@storybook/react'
import type { Feature1Fields } from '@/payload-types'
import Feature1 from './Component'

const meta: Meta<typeof Feature1> = {
  title: 'blocks/Feature/Feature1',
  component: Feature1,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Feature1>

const defaultFeature: Feature1Fields = {
  feature: {
    icon: 'Zap',
    title: 'Accelerate Your Digital Transformation',
    description:
      'Empower your business with cutting-edge solutions that drive growth and efficiency. Our platform combines innovation with reliability to deliver exceptional results.',
    image: {
      id: 'image-1',
      alt: 'Feature 1',
      url: '/website-template-OG.webp',
      width: 120,
      height: 24,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    links: [
      {
        'link-1': {
          type: 'custom',
          label: 'Get Started',
          url: '#',
          appearance: 'default',
          prefixIcon: 'ArrowRight',
          newTab: false,
        },
        'link-2': {
          type: 'custom',
          label: 'Learn More',
          url: '#',
          appearance: 'ghost',
          prefixIcon: 'Info',
          newTab: false,
        },
      },
    ],
  },
}

export const Default: Story = {
  args: defaultFeature,
}

export const WithoutIcon: Story = {
  args: {
    feature: {
      ...defaultFeature.feature,
      icon: undefined,
    },
  },
}

export const WithoutImage: Story = {
  args: {
    feature: {
      ...defaultFeature.feature,
      image: undefined,
    },
  },
}
