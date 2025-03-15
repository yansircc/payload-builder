import type { Meta, StoryObj } from '@storybook/react'
import type { Gallery5Fields } from '@/payload-types'
import Gallery5 from './Component'

const meta: Meta<typeof Gallery5> = {
  title: 'Blocks/Gallery/Gallery5',
  component: Gallery5,
  tags: ['autodocs'],
}

export default meta

interface GalleryItem {
  id: string
  title: string
  description: string
  href: string
  image: {
    id: string
    alt: string
    url: string
    width: number
    height: number
    createdAt: string
    updatedAt: string
  }
}

type Story = StoryObj<typeof Gallery5>

const mockGallery: Gallery5Fields = {
  gallery: {
    title: 'Explore Our Latest Projects',
    description: 'Browse through our amazing portfolio of work.',
    links: [
      {
        link: {
          label: 'See All Projects',
          url: '/projects',
          appearance: 'default',
        },
      },
    ],
    items: [
      {
        id: 'item-1',
        title: 'Project One',
        description: 'A stunning project that exemplifies innovation.',
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
        description: 'An innovative solution for modern problems.',
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
        description: 'Exploring new ideas and pushing boundaries.',
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

export const SingleItem: Story = {
  args: {
    gallery: {
      title: 'Single Project',
      description: 'Explore our one project!',
      items: [mockGallery.gallery.items?.[0] as GalleryItem],
    },
  },
}

export const MultipleItems: Story = {
  args: {
    gallery: {
      title: 'Multiple Projects',
      description: 'Browse through multiple projects.',
      items: [
        mockGallery.gallery.items?.[0] as GalleryItem,
        mockGallery.gallery.items?.[1] as GalleryItem,
      ],
    },
  },
}
