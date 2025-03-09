import { Meta, StoryObj } from '@storybook/react'
import { Gallery9Fields, Media } from '@/payload-types'
import Gallery9 from './Component'

const meta: Meta<typeof Gallery9> = {
  title: 'Blocks/Gallery/Gallery9',
  component: Gallery9,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Gallery9>

interface Section {
  image: string | Media
  title: string
  text: string
  icon: string
  id?: string | null
}

const mockGallery: Gallery9Fields = {
  gallery: {
    title: 'Explore Our Features',
    description: 'Browse through the different features we offer.',
    sections: [
      {
        id: 'section-1',
        title: 'Feature One',
        text: 'This is the first feature of our project.',
        icon: 'Code',
        image: {
          id: 'image-1',
          url: '/website-template-OG.webp',
          alt: 'Feature One Image',
          width: 1200,
          height: 800,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'section-2',
        title: 'Feature Two',
        text: 'The second feature offers unique benefits.',
        icon: 'GitBranch',
        image: {
          id: 'image-2',
          url: '/website-template-OG.webp',
          alt: 'Feature Two Image',
          width: 1200,
          height: 800,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'section-3',
        title: 'Feature Three',
        text: 'Our third feature ensures scalability and efficiency.',
        icon: 'Sparkle',
        image: {
          id: 'image-3',
          url: '/website-template-OG.webp',
          alt: 'Feature Three Image',
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

export const SingleSection: Story = {
  args: {
    gallery: {
      title: 'Feature One',
      description: 'Explore our first feature.',
      sections: mockGallery.gallery.sections ? [mockGallery.gallery.sections[0] as Section] : [],
    },
  },
}
