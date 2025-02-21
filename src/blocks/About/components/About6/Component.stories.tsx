import type { Meta, StoryObj } from '@storybook/react'
import type { About6Fields } from '@/payload-types'
import About6 from './Component'

const meta: Meta<typeof About6> = {
  title: 'Blocks/About/About6',
  component: About6,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof About6>

const now = new Date().toISOString()

const defaultAbout6: About6Fields = {
  storySection: {
    title: 'Our Journey Begins',
    description: 'We started with a vision to transform the digital landscape.',
    content: 'Our story is one of innovation, creativity, and growth.',
  },
  leftGallery: {
    mainImage: {
      id: 'left-main-1',
      alt: 'Left Main Image',
      url: '/website-template-OG.webp',
      width: 800,
      height: 600,
      createdAt: now,
      updatedAt: now,
    },
    sideImages: {
      first: {
        id: 'left-side-1',
        alt: 'Left Side Image 1',
        url: '/website-template-OG.webp',
        width: 400,
        height: 300,
        createdAt: now,
        updatedAt: now,
      },
      second: {
        id: 'left-side-2',
        alt: 'Left Side Image 2',
        url: '/website-template-OG.webp',
        width: 400,
        height: 300,
        createdAt: now,
        updatedAt: now,
      },
    },
  },
  rightGallery: {
    mainImage: {
      id: 'right-main-1',
      alt: 'Right Main Image',
      url: '/website-template-OG.webp',
      width: 800,
      height: 600,
      createdAt: now,
      updatedAt: now,
    },
    sideImages: {
      first: {
        id: 'right-side-1',
        alt: 'Right Side Image 1',
        url: '/website-template-OG.webp',
        width: 400,
        height: 300,
        createdAt: now,
        updatedAt: now,
      },
      second: {
        id: 'right-side-2',
        alt: 'Right Side Image 2',
        url: '/website-template-OG.webp',
        width: 400,
        height: 300,
        createdAt: now,
        updatedAt: now,
      },
    },
  },
  workplaceSection: {
    title: 'Our Workplace',
    description: 'A dynamic environment fostering creativity and collaboration.',
    content: 'We believe that a great workspace is the foundation of great work.',
  },
}

export const Default: Story = {
  args: defaultAbout6,
}

export const WithoutLeftGallery: Story = {
  args: {
    ...defaultAbout6,
    leftGallery: {
      ...(defaultAbout6.leftGallery ?? {}),
      mainImage: '',
      sideImages: {
        first: '',
        second: '',
      },
    },
  },
}

export const WithoutRightGallery: Story = {
  args: {
    ...defaultAbout6,
    rightGallery: {
      ...(defaultAbout6.rightGallery ?? {}),
      mainImage: '',
      sideImages: {
        first: '',
        second: '',
      },
    },
  },
}

export const CustomContent: Story = {
  args: {
    storySection: {
      title: 'A New Chapter',
      description: 'Redefining our journey with fresh perspectives.',
      content: 'Innovation drives us forward in this new era of creativity.',
    },
    leftGallery: {
      ...defaultAbout6.leftGallery,
    },
    rightGallery: {
      ...defaultAbout6.rightGallery,
    },
    workplaceSection: {
      title: 'Redefined Workspace',
      description: 'A place where ideas flourish and collaboration thrives.',
      content: 'Our modern workspace is designed to inspire creativity and productivity.',
    },
  },
}
