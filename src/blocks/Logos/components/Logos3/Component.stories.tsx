import type { Meta, StoryObj } from '@storybook/react'
import { Logos3Fields } from '@/payload-types'
import Logos3 from './Component'

const meta: Meta<typeof Logos3> = {
  title: 'Blocks/Logos/Logos3',
  component: Logos3,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Logos3>

const mockLogos: Logos3Fields = {
  logos: {
    title: 'Trusted by Leading Brands',
    logos: [
      {
        id: 'logo-1',
        logo: {
          id: '/logo-light.png',
          alt: 'Logo Light',
          url: '/logo-light.png',
          width: 120,
          height: 60,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'logo-2',
        logo: {
          id: '/logo-light.png',
          alt: 'Logo Dark',
          url: '/logo-dark.png',
          width: 120,
          height: 60,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'logo-3',
        logo: {
          id: '/logo-light.png',
          alt: 'Logo Blue',
          url: '/website-template-OG.webp',
          width: 120,
          height: 60,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    ],
  },
}

export const Default: Story = {
  args: mockLogos,
}

export const WidthOutTitle: Story = {
  args: {
    logos: {
      ...mockLogos.logos,
      title: '',
    },
  },
}

export const WidthOutLogos: Story = {
  args: {
    logos: {
      ...mockLogos.logos,
      logos: null,
    },
  },
}
