import type { Meta, StoryObj } from '@storybook/react'
import { Logos8Fields } from '@/payload-types'
import Logos8 from './Component'

const meta: Meta<typeof Logos8> = {
  title: 'Blocks/Logos/Logos8',
  component: Logos8,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Logos8>

const mockLogos: Logos8Fields = {
  logos: {
    title: 'Trusted by Leading Brands',
    description: 'These companies trust us with their projects',
    logos: [
      {
        id: 'logo-1',
        logo: {
          id: 'logo-light-1',
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
          id: 'logo-dark-1',
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
          id: 'logo-blue-1',
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

export const WidthOutDescription: Story = {
  args: {
    logos: {
      ...mockLogos.logos,
      description: '',
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
