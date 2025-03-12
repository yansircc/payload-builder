import { Meta, StoryObj } from '@storybook/react'
import { Gallery6Fields, Media } from '@/payload-types'
import Gallery6 from './Component'

const meta: Meta<typeof Gallery6> = {
  title: 'Blocks/Gallery/Gallery6',
  component: Gallery6,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Gallery6>

const mockGallery: Gallery6Fields = {
  gallery: {
    title: 'Our Latest Projects',
    link: {
      label: 'See All Projects',
      url: '/projects',
      appearance: 'default',
    },
    cards: [
      {
        title: 'Project One',
        excerpt: 'This is an amazing project we worked on.',
        link: {
          label: 'Read more',
          url: '/website-template-OG.webp',
        },
        image: {
          id: 'image-1',
          url: '/website-template-OG.webp',
          alt: 'Project One Image',
          width: 1200,
          height: 800,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        title: 'Project Two',
        excerpt: 'An innovative solution for modern problems.',
        link: {
          label: 'Read more',
          url: '/projects/2',
        },
        image: {
          id: 'image-2',
          url: '/website-template-OG.webp',
          alt: 'Project Two Image',
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
