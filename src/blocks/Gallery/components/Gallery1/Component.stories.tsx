import type { Meta, StoryObj } from '@storybook/react'
import type { Gallery1Fields } from '@/payload-types'
import Component from './Component'

const meta: Meta<typeof Component> = {
  title: 'Blocks/Gallery/Gallery1',
  component: Component,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Component>

const mockGallery: Gallery1Fields = {
  gallery: {
    title: 'Our Case Studies',
    description: 'Explore our successful projects',
    link: {
      type: 'custom',
      label: 'View All Cases',
      url: '/cases',
      appearance: 'default',
    },
    image: {
      id: 'gallery-main',
      alt: 'Gallery Main Image',
      url: '/website-template-OG.webp',
      width: 1200,
      height: 800,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    items: [
      {
        id: 'item-1',
        title: 'Project One',
        href: '/projects/1',
        company: 'Company One',
        image: {
          id: 'image-1',
          alt: 'Project 1',
          url: '/website-template-OG.webp',
          width: 1200,
          height: 800,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        logo: {
          id: 'logo-1',
          alt: 'Company 1',
          url: '/website-template-OG.webp',
          width: 120,
          height: 24,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        badges: [
          { id: 'badge-1', text: 'Design' },
          { id: 'badge-2', text: 'Development' },
        ],
      },
      {
        id: 'item-2',
        title: 'Project Two',
        href: '/projects/2',
        company: 'Company Two',
        image: {
          id: 'image-2',
          alt: 'Project 2',
          url: '/website-template-OG.webp',
          width: 1200,
          height: 800,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        logo: {
          id: 'logo-2',
          alt: 'Company 2',
          url: '/website-template-OG.webp',
          width: 120,
          height: 24,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        badges: [
          { id: 'badge-3', text: 'UI/UX' },
          { id: 'badge-4', text: 'Branding' },
        ],
      },
      {
        id: 'item-3',
        title: 'Project Three',
        href: '/projects/3',
        company: 'Company Three',
        image: {
          id: 'image-3',
          alt: 'Project 3',
          url: '/website-template-OG.webp',
          width: 1200,
          height: 800,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        logo: {
          id: 'logo-3',
          alt: 'Company 3',
          url: '/website-template-OG.webp',
          width: 120,
          height: 24,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        badges: [
          { id: 'badge-5', text: 'Marketing' },
          { id: 'badge-6', text: 'Web' },
        ],
      },
    ],
  },
}

export const Default: Story = {
  args: mockGallery,
}
