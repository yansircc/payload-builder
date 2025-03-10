import { StoryObj, type Meta } from '@storybook/react'
import type { About4Fields } from '@/payload-types'
import About4 from './Component'

const meta: Meta<typeof About4> = {
  title: 'Blocks/About/About4',
  component: About4,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof About4>

const defaultAbout: About4Fields = {
  mainSection: {
    title: 'Meet Our Creative Team',
    description:
      'We are a group of passionate individuals dedicated to creating exceptional digital experiences.',
  },
  gallerySection: {
    images: Array(6).fill({
      image: {
        id: 'gallery-1',
        alt: 'Team member',
        url: '/website-template-OG.webp',
        width: 800,
        height: 600,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }),
  },

  contentSection: {
    vision: {
      title: 'Our Vision',
      description:
        'To revolutionize digital experiences through innovative solutions and creative excellence.',
    },
    creators: {
      title: 'The Creators',
      description:
        'A diverse team of experts bringing unique perspectives and skills to every project.',
    },
  },
  ctaSection: {
    title: 'Ready to Start Your Project?',
    button: {
      type: 'custom',
      label: 'Get in Touch',
      appearance: 'outline',
      url: '#contact',
    },
  },
}

export const Default: Story = {
  args: defaultAbout,
}

export const WithMinimalFeature: Story = {
  args: {
    ...defaultAbout,
    gallerySection: {
      images: Array(4).fill({
        image: {
          id: 'gallery-1',
          alt: 'Team member',
          url: '/website-template-OG.webp',
          width: 800,
          height: 600,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }),
    },
    contentSection: {
      vision: {
        title: 'Our Vision',
        description: 'To revolutionize digital experiences through innovative solutions.',
      },
      creators: {
        title: 'The Creators',
        description: 'A diverse team of experts.',
      },
    },
  },
}

export const WithoutImages: Story = {
  args: {
    ...defaultAbout,
    gallerySection: {
      images: Array(6).fill(''),
    },
  },
}

export const CustomContent: Story = {
  args: {
    ...defaultAbout,
    mainSection: {
      title: 'Innovators in Digital Design',
      description:
        'Pushing the boundaries of whats possible in digital experiences and creative solutions.',
    },
    gallerySection: {
      images: Array(6).fill({
        image: {
          id: 'gallery-1',
          alt: 'Team member',
          url: '/website-template-OG.webp',
          width: 800,
          height: 600,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }),
    },
    contentSection: {
      vision: {
        title: 'Looking Forward',
        description:
          'Shaping the future of digital interactions through innovative design and technology.',
      },
      creators: {
        title: 'Our Team',
        description:
          'Bringing together the best talent from around the world to create exceptional experiences.',
      },
    },
    ctaSection: {
      title: 'Lets Create Something Amazing Together',
      button: {
        type: 'custom',
        label: 'Start a Project',
        appearance: 'outline',
        url: '#start',
      },
    },
  },
}
