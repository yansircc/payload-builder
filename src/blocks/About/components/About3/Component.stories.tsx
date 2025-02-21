import type { Meta, StoryObj } from '@storybook/react'
import type { About3Fields } from '@/payload-types'
import About3 from './Component'

const meta: Meta<typeof About3> = {
  title: 'Blocks/About/About3',
  component: About3,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof About3>

const now = new Date().toISOString()

const defaultAbout3: About3Fields = {
  mainSection: {
    title: 'Discover Our Story',
    description: 'We are committed to delivering excellence in every project we undertake.',
  },
  contentSection: {
    mainImage: {
      id: 'main-image-1',
      alt: 'Our Journey',
      url: '/website-template-OG.webp',
      width: 1200,
      height: 800,
      createdAt: now,
      updatedAt: now,
    },
    infoBox: {
      icon: {
        id: 'icon-1',
        alt: 'Info Icon',
        url: '/website-template-OG.webp',
        width: 50,
        height: 50,
        createdAt: now,
        updatedAt: now,
      },
      title: 'Our Vision',
      description:
        'Committed to innovation and excellence, our journey is defined by creativity and collaboration.',
      buttonLink: {
        label: 'Learn More',
        url: '/website-template-OG.webp',
      },
    },
    sideImage: {
      id: 'side-image-1',
      alt: 'Creative Process',
      url: '/website-template-OG.webp',
      width: 800,
      height: 600,
      createdAt: now,
      updatedAt: now,
    },
  },
  clientSection: {
    title: 'Trusted by Leading Brands',
    clients: [
      {
        logo: {
          id: 'client-logo-1',
          alt: 'Client Logo 1',
          url: '/website-template-OG.webp',
          width: 200,
          height: 100,
          createdAt: now,
          updatedAt: now,
        },
        name: 'Client One',
      },
      {
        logo: {
          id: 'client-logo-2',
          alt: 'Client Logo 2',
          url: '/website-template-OG.webp',
          width: 200,
          height: 100,
          createdAt: now,
          updatedAt: now,
        },
        name: 'Client Two',
      },
    ],
  },
  statsSection: {
    title: 'Our Success in Numbers',
    description: 'Key metrics that showcase our impact and commitment.',
    stats: [
      { label: 'Projects', value: '150+' },
      { label: 'Awards', value: '25' },
      { label: 'Clients', value: '100+' },
    ],
  },
}

export const Default: Story = {
  args: defaultAbout3,
}

export const WithMinimalStats: Story = {
  args: {
    ...defaultAbout3,
    statsSection: {
      ...defaultAbout3.statsSection,
      stats: defaultAbout3.statsSection.stats?.slice(0, 2) || [],
    },
  },
}

export const WithoutMedia: Story = {
  args: {
    ...defaultAbout3,
    contentSection: {
      ...defaultAbout3.contentSection,
      mainImage: '',
      infoBox: {
        ...defaultAbout3.contentSection.infoBox,
        icon: '',
      },
      sideImage: '',
    },
    clientSection: {
      ...defaultAbout3.clientSection,
      clients:
        defaultAbout3.clientSection.clients?.map((client) => ({
          ...client,
          logo: '',
        })) || [],
    },
  },
}

export const CustomContent: Story = {
  args: {
    mainSection: {
      title: 'Innovate and Inspire',
      description:
        'Our creative journey redefines boundaries and inspires a new generation of visionaries.',
    },
    contentSection: {
      mainImage: {
        id: 'custom-main-image',
        alt: 'Inspiration',
        url: '/website-template-OG.webp',
        width: 1200,
        height: 800,
        createdAt: now,
        updatedAt: now,
      },
      infoBox: {
        icon: {
          id: 'custom-icon',
          alt: 'Custom Icon',
          url: '/website-template-OG.webp',
          width: 50,
          height: 50,
          createdAt: now,
          updatedAt: now,
        },
        title: 'What We Do',
        description:
          'From ideation to execution, we deliver creative solutions that make a difference.',
        buttonLink: {
          label: 'Get Started',
          url: '/website-template-OG.webp',
        },
      },
      sideImage: {
        id: 'custom-side-image',
        alt: 'Team Collaboration',
        url: '/website-template-OG.webp',
        width: 800,
        height: 600,
        createdAt: now,
        updatedAt: now,
      },
    },
    clientSection: {
      title: 'Our Esteemed Clients',
      clients: [
        {
          logo: {
            id: 'custom-client-logo-1',
            alt: 'Custom Client 1',
            url: '/website-template-OG.webp',
            width: 200,
            height: 100,
            createdAt: now,
            updatedAt: now,
          },
          name: 'Custom Client One',
        },
        {
          logo: {
            id: 'custom-client-logo-2',
            alt: 'Custom Client 2',
            url: '/website-template-OG.webp',
            width: 200,
            height: 100,
            createdAt: now,
            updatedAt: now,
          },
          name: 'Custom Client Two',
        },
      ],
    },
    statsSection: {
      title: 'Milestones',
      description: 'Our milestones are a testament to our relentless pursuit of excellence.',
      stats: [
        { label: 'Years in Business', value: '20' },
        { label: 'Global Offices', value: '15' },
        { label: 'Clients Served', value: '200+' },
      ],
    },
  },
}
