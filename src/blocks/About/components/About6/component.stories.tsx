import { StoryObj, type Meta } from '@storybook/react'
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

const defaultAbout: About6Fields = {
  storySection: {
    title: 'Our Story',
    description: 'Building innovative solutions since 2010',
    content:
      'We started with a vision to transform digital experiences. Today, we continue to innovate and push boundaries in technology and design, creating solutions that make a difference.',
  },
  leftGallery: {
    mainImage: {
      id: 'main-left',
      alt: 'Team collaboration',
      url: '/website-template-OG.webp',
      width: 700,
      height: 1000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    sideImages: {
      first: {
        id: 'side-1-left',
        alt: 'Office space',
        url: '/website-template-OG.webp',
        width: 1100,
        height: 1000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      second: {
        id: 'side-2-left',
        alt: 'Creative process',
        url: '/website-template-OG.webp',
        width: 700,
        height: 1000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  },
  workplaceSection: {
    title: 'Our Workplace',
    description: 'A space designed for creativity and innovation',
    content:
      'Our workplace is more than just an office - its a hub of creativity, collaboration, and innovation where great ideas come to life.',
  },
  rightGallery: {
    mainImage: {
      id: 'main-right',
      alt: 'Modern workplace',
      url: '/website-template-OG.webp',
      width: 900,
      height: 1000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    sideImages: {
      first: {
        id: 'side-1-right',
        alt: 'Team meeting',
        url: '/website-template-OG.webp',
        width: 800,
        height: 1000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      second: {
        id: 'side-2-right',
        alt: 'Design process',
        url: '/website-template-OG.webp',
        width: 900,
        height: 1000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  },
}

export const Default: Story = {
  args: defaultAbout,
}

export const WithMinimalFeature: Story = {
  args: {
    ...defaultAbout,
    storySection: {
      title: 'Our Journey',
      description: 'Creating digital excellence',
      content: 'A focused approach to delivering innovative solutions.',
    },
    workplaceSection: {
      title: 'Where We Work',
      description: 'Innovation hub',
      content: 'Our creative space where ideas transform into reality.',
    },
  },
}

export const WithoutImages: Story = {
  args: {
    ...defaultAbout,
    leftGallery: {
      mainImage: '',
      sideImages: {
        first: '',
        second: '',
      },
    },
    rightGallery: {
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
    ...defaultAbout,
    storySection: {
      title: 'Pioneering Digital Excellence',
      description: 'Leading the way in digital innovation since 2010',
      content:
        'From humble beginnings to industry leadership, our journey has been defined by continuous innovation and unwavering commitment to excellence.',
    },
    workplaceSection: {
      title: 'Culture of Innovation',
      description: 'Where creativity meets technology',
      content:
        'Our workplace fosters collaboration, creativity, and breakthrough innovations that shape the future of digital experiences.',
    },
  },
}
