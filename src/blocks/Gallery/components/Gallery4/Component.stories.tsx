import type { Meta, StoryObj } from '@storybook/react'
import type { Gallery4Fields } from '@/payload-types'
import Gallery4 from './Component'

const meta: Meta<typeof Gallery4> = {
  title: 'Blocks/Gallery/Gallery4',
  component: Gallery4,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Gallery4>

const mockGallery: Gallery4Fields = {
  gallery: {
    title: 'Explore Our Latest Work',
    items: [
      {
        id: 'item-1',
        title: 'Project One',
        description: 'A beautiful case study that illustrates our capabilities.',
        href: '/projects/1',
        image: {
          id: 'image-1',
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
        description: 'A detailed look into Project Two, our award-winning project.',
        href: '/projects/2',
        image: {
          id: 'image-2',
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
        description: 'Discover the innovation behind Project Three.',
        href: '/projects/3',
        image: {
          id: 'image-3',
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

export const NoItems: Story = {
  args: {
    gallery: {
      title: 'No Projects Available',
      items: null,
    },
  },
}
