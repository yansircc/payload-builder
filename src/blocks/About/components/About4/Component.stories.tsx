import type { Meta, StoryObj } from '@storybook/react'
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

const now = new Date().toISOString()

const defaultAbout4: About4Fields = {
  mainSection: {
    title: 'Experience Innovation at Its Best',
    description:
      'We are pioneers in creative digital solutions, driving success through innovation.',
  },
  gallerySection: {
    images: [
      {
        image: {
          id: 'gallery-image-1',
          alt: 'Innovative Design',
          url: '/website-template-OG.webp',
          width: 800,
          height: 600,
          createdAt: now,
          updatedAt: now,
        },
      },
      {
        image: {
          id: 'gallery-image-2',
          alt: 'Creative Workspace',
          url: '/website-template-OG.webp',
          width: 800,
          height: 600,
          createdAt: now,
          updatedAt: now,
        },
      },
      {
        image: {
          id: 'gallery-image-3',
          alt: 'Team Collaboration',
          url: '/website-template-OG.webp',
          width: 800,
          height: 600,
          createdAt: now,
          updatedAt: now,
        },
      },
    ],
  },
  contentSection: {
    vision: {
      title: 'Our Vision',
      description: 'We envision a world where digital innovation meets creative excellence.',
    },
    creators: {
      title: 'Our Creators',
      description:
        'A dynamic team of innovators, designers, and technologists who are redefining possibilities.',
    },
  },
  ctaSection: {
    title: 'Join Our Journey',
    button: {
      label: 'Get Started',
      url: '/website-template-OG.webp',
    },
  },
}

export const Default: Story = {
  args: defaultAbout4,
}

export const WithoutGallery: Story = {
  args: {
    ...defaultAbout4,
    gallerySection: {
      ...(defaultAbout4.gallerySection ?? {}),
      images: [],
    },
  },
}

export const CustomContent: Story = {
  args: {
    mainSection: {
      title: 'Empowering Creativity',
      description: 'Unleash your creative potential with our innovative digital solutions.',
    },
    gallerySection: {
      images: [
        {
          image: {
            id: 'custom-gallery-1',
            alt: 'Creative Burst',
            url: '/website-template-OG.webp',
            width: 800,
            height: 600,
            createdAt: now,
            updatedAt: now,
          },
        },
      ],
    },
    contentSection: {
      vision: {
        title: 'Innovative Vision',
        description: 'A new era of creative design and digital mastery.',
      },
      creators: {
        title: 'Creative Minds',
        description: 'Our team brings fresh ideas and bold solutions to the table.',
      },
    },
    ctaSection: {
      title: 'Connect With Us',
      button: {
        label: 'Contact Now',
        url: '/website-template-OG.webp',
      },
    },
  },
}
