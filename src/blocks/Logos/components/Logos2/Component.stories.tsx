import type { Meta, StoryObj } from '@storybook/react'
import { Logos2Fields } from '@/payload-types'
import Logos2 from './Component'

const meta: Meta<typeof Logos2> = {
  title: 'Blocks/Logos/Logos2',
  component: Logos2,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Logos2>

const mockLogos: Logos2Fields = {
  logos: {
    title: 'Trusted by Leading Companies',
    description: 'Explore the brands that trust our services.',
    link: {
      label: 'View More',
      url: '/logo-light.png',
      appearance: 'default',
    },
    logos: [
      {
        id: 'logo-1',
        logo: {
          id: 'logo-light-1',
          alt: 'Logo Light',
          url: '/logo-light.png',
          width: 100,
          height: 50,
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
          width: 100,
          height: 50,
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
          width: 100,
          height: 50,
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
export const WithOutDescription: Story = {
  args: {
    logos: {
      ...mockLogos.logos,
      description: null,
    },
  },
}

export const WidthOutLink: Story = {
  args: {
    logos: {
      ...mockLogos.logos,
      link: {
        label: '',
        url: '',
        appearance: 'default',
      },
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
