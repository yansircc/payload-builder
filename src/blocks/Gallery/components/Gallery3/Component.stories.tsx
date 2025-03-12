import type { Meta, StoryObj } from '@storybook/react'
import type { Gallery3Fields } from '@/payload-types'
import Gallery3 from './Component'

const meta: Meta<typeof Gallery3> = {
  title: 'Blocks/Gallery/Gallery3',
  component: Gallery3,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Gallery3>

const mockGallery: Gallery3Fields = {
  gallery: {
    title: 'Our Amazing Projects',
    items: [
      {
        id: 'item-1',
        title: 'Project One',
        description: 'Explore our groundbreaking Project One',
        label: 'Design',
        href: '/projects/1',
        image: {
          id: '/website-template-OG.webp',
          alt: 'Project One Image',
          url: '/website-template-OG.webp',
          width: 1200,
          height: 800,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'item-2',
        title: 'Project Two',
        description: 'Discover the success of Project Two',
        label: 'Development',
        href: '/projects/2',
        image: {
          id: '/website-template-OG.webp',
          alt: 'Project Two Image',
          url: '/website-template-OG.webp',
          width: 1200,
          height: 800,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'item-3',
        title: 'Project Three',
        description: 'The latest innovations in Project Three',
        label: 'Marketing',
        href: '/projects/3',
        image: {
          id: '/website-template-OG.webp',
          alt: 'Project Three Image',
          url: '/website-template-OG.webp',
          width: 1200,
          height: 800,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    ],
  },
}

export const Default: Story = {
  args: mockGallery,
}
