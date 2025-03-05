import { StoryObj, type Meta } from '@storybook/react'
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

const defaultAbout: About3Fields = {
  mainSection: {
    title: 'Transforming Ideas into Digital Reality',
    description:
      'We specialize in creating innovative digital solutions that help businesses thrive in the modern world.',
  },
  contentSection: {
    mainImage: {
      id: 'main-1',
      alt: 'Modern workspace',
      url: '/website-template-OG.webp',
      width: 1200,
      height: 800,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    infoBox: {
      icon: {
        id: 'icon-1',
        alt: 'Innovation icon',
        url: '/website-template-OG.webp',
        width: 48,
        height: 48,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      title: 'Innovation at Core',
      description: 'We bring cutting-edge solutions to every project we undertake.',
      buttonLink: {
        type: 'custom',
        label: 'Learn More',
        appearance: 'default',
        url: '#',
      },
    },
    sideImage: {
      id: 'side-1',
      alt: 'Team collaboration',
      url: '/website-template-OG.webp',
      width: 600,
      height: 800,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  clientSection: {
    title: 'Trusted by Industry Leaders',
    clients: [
      {
        logo: {
          id: 'client-1',
          alt: 'Client 1',
          url: '/website-template-OG.webp',
          width: 200,
          height: 60,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        name: 'TechCorp',
      },
      {
        logo: {
          id: 'client-2',
          alt: 'Client 2',
          url: '/website-template-OG.webp',
          width: 200,
          height: 60,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        name: 'InnovateLabs',
      },
      {
        logo: {
          id: 'client-3',
          alt: 'Client 3',
          url: '/website-template-OG.webp',
          width: 200,
          height: 60,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        name: 'FutureWorks',
      },
    ],
  },
  statsSection: {
    title: 'Our Impact in Numbers',
    description: 'We take pride in our achievements and the results we deliver to our clients.',
    stats: [
      { label: 'Projects Completed', value: '500+' },
      { label: 'Happy Clients', value: '200+' },
      { label: 'Team Members', value: '50+' },
      { label: 'Years Experience', value: '15+' },
    ],
  },
}

export const Default: Story = {
  args: defaultAbout,
}

export const WithoutImages: Story = {
  args: {
    ...defaultAbout,
    contentSection: {
      ...defaultAbout.contentSection,
      mainImage: '',
      infoBox: {
        ...defaultAbout.contentSection.infoBox,
        icon: '',
      },
      sideImage: '',
    },
    clientSection: {
      ...defaultAbout.clientSection,
      clients: defaultAbout.clientSection.clients?.map((client) => ({
        ...client,
        logo: '',
      })),
    },
  },
}

export const WithMinimalFeature: Story = {
  args: {
    ...defaultAbout,
    clientSection: {
      title: 'Our Clients',
      clients: [
        {
          logo: {
            id: 'client-1',
            alt: 'Client 1',
            url: '/website-template-OG.webp',
            width: 200,
            height: 60,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          name: 'TechCorp',
        },
      ],
    },
    statsSection: {
      title: 'Key Metrics',
      description: 'Our core performance indicators',
      stats: [
        { label: 'Projects Completed', value: '500+' },
        { label: 'Client Satisfaction', value: '99%' },
      ],
    },
  },
}

export const CustomContent: Story = {
  args: {
    ...defaultAbout,
    mainSection: {
      title: 'Leading the Digital Revolution',
      description: 'Empowering businesses with next-generation solutions for the digital age.',
    },
    statsSection: {
      ...defaultAbout.statsSection,
      title: 'Achievement Highlights',
      description: 'Our journey in numbers that speak for themselves.',
    },
  },
}
