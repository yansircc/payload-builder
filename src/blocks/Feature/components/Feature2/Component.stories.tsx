import type { Meta, StoryObj } from '@storybook/react'
import type { Feature2Fields } from '@/payload-types'
import Feature2 from './Component'

const meta: Meta<typeof Feature2> = {
  title: 'blocks/Feature/Feature2',
  component: Feature2,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Feature2>

const defaultFeature: Feature2Fields = {
  icon: 'Rocket',
  title: 'Transform Your Business Vision',
  description:
    "Take your business to new heights with our innovative solutions. We provide the tools and expertise you need to succeed in today's competitive landscape.",
  image: {
    id: 'image-2',
    alt: 'Feature 2',
    url: '/website-template-OG.webp',
    width: 120,
    height: 24,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  buttonGroup: [
    {
      link: {
        type: 'custom',
        label: 'Start Now',
        url: '#',
        appearance: 'default',
        prefixIcon: 'ArrowRight',
        newTab: false,
      },
    },
    {
      link: {
        type: 'custom',
        label: 'View Demo',
        url: '#',
        appearance: 'ghost',
        prefixIcon: 'Play',
        newTab: false,
      },
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
