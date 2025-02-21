import type { Meta, StoryObj } from '@storybook/react'
import type { About5Fields } from '@/payload-types'
import About5 from './Component'

const meta: Meta<typeof About5> = {
  title: 'Blocks/About/About5',
  component: About5,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof About5>

const now = new Date().toISOString()

const defaultAbout5: About5Fields = {
  mainSection: {
    label: 'Who We Are',
    title: 'Innovative Solutions for Tomorrow',
    description:
      'We are pioneers in digital innovation, combining technology and creativity to drive results.',
  },
  imageSection: {
    image: {
      id: 'about5-image-1',
      alt: 'Digital Innovation',
      url: '/website-template-OG.webp',
      width: 1200,
      height: 800,
      createdAt: now,
      updatedAt: now,
    },
    caption: 'Inspiring innovation through technology.',
  },
  partnersSection: {
    title: 'Our Trusted Partners',
    partners: [
      {
        logo: {
          id: 'partner-logo-1',
          alt: 'Partner 1',
          url: '/website-template-OG.webp',
          width: 200,
          height: 100,
          createdAt: now,
          updatedAt: now,
        },
      },
      {
        logo: {
          id: 'partner-logo-2',
          alt: 'Partner 2',
          url: '/website-template-OG.webp',
          width: 200,
          height: 100,
          createdAt: now,
          updatedAt: now,
        },
      },
      {
        logo: {
          id: 'partner-logo-3',
          alt: 'Partner 3',
          url: '/website-template-OG.webp',
          width: 200,
          height: 100,
          createdAt: now,
          updatedAt: now,
        },
      },
      {
        logo: {
          id: 'partner-logo-4',
          alt: 'Partner 4',
          url: '/website-template-OG.webp',
          width: 200,
          height: 100,
          createdAt: now,
          updatedAt: now,
        },
      },
    ],
  },
  missionSection: {
    title: 'Our Mission',
    description:
      'To empower businesses with innovative digital solutions that drive growth and create lasting impact.',
    stats: [
      { value: '200+', label: 'Projects Completed' },
      { value: '150+', label: 'Satisfied Clients' },
      { value: '100%', label: 'Success Rate' },
    ],
    image: {
      id: 'mission-image-1',
      alt: 'Our Mission in Action',
      url: '/website-template-OG.webp',
      width: 800,
      height: 600,
      createdAt: now,
      updatedAt: now,
    },
  },
}

export const Default: Story = {
  args: defaultAbout5,
}

export const WithoutPartners: Story = {
  args: {
    ...defaultAbout5,
    partnersSection: {
      ...(defaultAbout5.partnersSection ?? {}),
      partners: [],
    },
  },
}

export const WithoutStats: Story = {
  args: {
    ...defaultAbout5,
    missionSection: {
      ...defaultAbout5.missionSection,
      stats: [],
    },
  },
}

export const CustomContent: Story = {
  args: {
    mainSection: {
      label: 'About Us',
      title: 'Shaping the Future of Digital Experience',
      description:
        'Our mission is to redefine the digital landscape through innovation and creativity.',
    },
    imageSection: {
      image: {
        id: 'custom-image',
        alt: 'Digital Future',
        url: '/website-template-OG.webp',
        width: 1200,
        height: 800,
        createdAt: now,
        updatedAt: now,
      },
      caption: 'Leading the charge in digital transformation.',
    },
    partnersSection: {
      title: 'Partnering for Success',
      partners: [
        {
          logo: {
            id: 'custom-partner-1',
            alt: 'Custom Partner 1',
            url: '/website-template-OG.webp',
            width: 200,
            height: 100,
            createdAt: now,
            updatedAt: now,
          },
        },
      ],
    },
    missionSection: {
      title: 'Our Vision',
      description:
        'We are committed to delivering digital solutions that empower your business to excel.',
      stats: [
        { value: '300+', label: 'Innovations' },
        { value: '250+', label: 'Global Reach' },
      ],
      image: {
        id: 'custom-mission-image',
        alt: 'Vision in Action',
        url: '/website-template-OG.webp',
        width: 800,
        height: 600,
        createdAt: now,
        updatedAt: now,
      },
    },
  },
}
