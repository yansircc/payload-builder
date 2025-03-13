import type { Meta, StoryObj } from '@storybook/react'
import Component from './Component'

const meta: Meta<typeof Component> = {
  title: 'Blocks/Logos/Logos8',
  component: Component,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    title: 'Trusted by leading companies',
    description:
      'Join thousands of businesses that trust our products for their needs. Our logos showcase is a testament to the quality and reliability of our services.',
    logos: [
      {
        id: 'logo-1',
        logo: {
          id: 'logo-light-1',
          alt: 'Logo Light',
          url: '/logo-dark.png',
          width: 109,
          height: 48,
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
          width: 109,
          height: 48,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'logo-3',
        logo: {
          id: 'website-template',
          alt: 'Website Template',
          url: '/logo-dark.png',
          width: 109,
          height: 48,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'logo-4',
        logo: {
          id: 'logo-light-2',
          alt: 'Logo Light 2',
          url: '/logo-dark.png',
          width: 109,
          height: 48,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'logo-5',
        logo: {
          id: 'logo-dark-2',
          alt: 'Logo Dark 2',
          url: '/logo-dark.png',
          width: 109,
          height: 48,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'logo-6',
        logo: {
          id: 'website-template-2',
          alt: 'Website Template 2',
          url: '/logo-dark.png',
          width: 109,
          height: 48,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    ],
  },
}
