import type { Meta, StoryObj } from '@storybook/react'
import { Media } from '@/payload-types'
import Gallery4, { Gallery4Fields, Gallery4Props } from './Component'

const meta: Meta<typeof Gallery4> = {
  title: 'Blocks/Gallery/Gallery4',
  component: Gallery4,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Gallery4>

// Mock media type for storybook
const mockMedia: Media = {
  id: 'image-id',
  alt: 'Image Alt Text',
  url: '/website-template-OG.webp',
  width: 1200,
  height: 800,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

// Create a single item that can be reused
const singleItem = {
  id: 'item-1',
  title: 'Project One',
  description: 'A beautiful case study that illustrates our capabilities.',
  href: '/projects/1',
  image: mockMedia,
}

const mockGalleryData: Gallery4Fields = {
  title: 'Explore Our Latest Work',
  items: [
    singleItem,
    {
      id: 'item-2',
      title: 'Project Two',
      description: 'A detailed look into Project Two, our award-winning project.',
      href: '/projects/2',
      image: mockMedia,
    },
    {
      id: 'item-3',
      title: 'Project Three',
      description: 'Discover the innovation behind Project Three.',
      href: '/projects/3',
      image: mockMedia,
    },
    {
      id: 'item-4',
      title: 'Project Four',
      description: 'Discover the innovation behind Project Four.',
      href: '/projects/4',
      image: mockMedia,
    },
    {
      id: 'item-5',
      title: 'Project Five',
      description: 'Discover the innovation behind Project Five.',
      href: '/projects/5',
      image: mockMedia,
    },
    {
      id: 'item-6',
      title: 'Project Six',
      description: 'Discover the innovation behind Project Six.',
      href: '/projects/6',
      image: mockMedia,
    },
    {
      id: 'item-7',
      title: 'Project Seven',
      description: 'Discover the innovation behind Project Seven.',
      href: '/projects/7',
      image: mockMedia,
    },
    {
      id: 'item-8',
      title: 'Project Eight',
      description: 'Discover the innovation behind Project Eight.',
      href: '/projects/8',
      image: mockMedia,
    },
  ],
}

// Create props object that matches the component's expected structure
const mockProps: Gallery4Props = {
  gallery: mockGalleryData,
}

export const Default: Story = {
  args: mockProps,
}

export const SingleItem: Story = {
  args: {
    gallery: {
      title: 'Single Project Showcase',
      items: [singleItem],
    },
  },
}
