import type { Meta, StoryObj } from '@storybook/react'
import type { Feature2Fields } from '@/payload-types'
import Feature2 from './Component'

const meta: Meta<typeof Feature2> = {
  title: 'Blocks/Feature/Feature2',
  component: Feature2,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Feature2>

const defaultFeature: Feature2Fields = {
  title: 'Transform Your Business with Feature2',
  description:
    'Our powerful feature enables you to improve efficiency, reduce costs, and enhance performance with minimal effort.',
  icon: 'Zap',
  image: {
    id: 'image-1',
    alt: 'Feature Image',
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
        label: 'Learn More',
        url: '#',
        appearance: 'default',
        prefixIcon: 'ArrowRight',
        newTab: false,
      },
    },
    {
      link: {
        type: 'custom',
        label: 'Get Started',
        url: '#',
        appearance: 'ghost',
        prefixIcon: 'Info',
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

export const WithSingleButton: Story = {
  args: {
    ...defaultFeature,
    buttonGroup: [
      {
        link: {
          type: 'custom',
          label: 'Contact Us',
          url: '#',
          appearance: 'outline',
          prefixIcon: 'Phone',
          newTab: false,
        },
      },
    ],
  },
}

export const WithCustomDescription: Story = {
  args: {
    ...defaultFeature,
    description: 'This is a custom description for testing purposes.',
  },
}
