import type { Meta, StoryObj } from '@storybook/react'
import type { About1Fields } from '@/payload-types'
import About1 from './Component'

const meta: Meta<typeof About1> = {
  title: 'Blocks/About/About1',
  component: About1,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof About1>

const defaultAbout: About1Fields = {
  mainSection: {
    title: 'Building the future of digital experiences',
    description:
      'We are a team of passionate individuals committed to revolutionizing how businesses interact with their customers in the digital space.',
  },
  missionSection: {
    label: 'Our Mission',
    description:
      'To empower businesses with innovative solutions that drive growth and create meaningful connections with their audience.',
    image: {
      id: 'mission-1',
      alt: 'Team collaboration',
      url: '/website-template-OG.webp',
      width: 1200,
      height: 800,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  featuresSection: {
    title: 'What sets us apart',
    description: 'Our core values and principles that drive everything we do',
    features: [
      {
        icon: 'Rocket',
        title: 'Innovation First',
        description: 'Constantly pushing boundaries and exploring new possibilities in technology',
      },
      {
        icon: 'Users',
        title: 'Customer Focused',
        description: 'Building solutions that address real customer needs and challenges',
      },
      {
        icon: 'Shield',
        title: 'Security Driven',
        description: 'Ensuring the highest standards of security and data protection',
      },
    ],
  },
  teamSection: {
    label: 'Our Team',
    title: 'Meet the people behind our success',
    description:
      'Our diverse team brings together expertise from various fields, united by a common goal to create exceptional digital experiences.',
    image: {
      id: 'team-1',
      alt: 'Team members in a meeting',
      url: '/website-template-OG.webp',
      width: 1200,
      height: 400,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
}

export const Default: Story = {
  args: defaultAbout,
}

export const WithMinimalFeatures: Story = {
  args: {
    ...defaultAbout,
    featuresSection: {
      ...defaultAbout.featuresSection,
      features: defaultAbout.featuresSection.features?.slice(0, 2),
    },
  },
}

export const WithoutImages: Story = {
  args: {
    ...defaultAbout,
    missionSection: {
      ...defaultAbout.missionSection,
      image: '',
    },
    teamSection: {
      ...defaultAbout.teamSection,
      image: '',
    },
  },
}

export const CustomContent: Story = {
  args: {
    mainSection: {
      title: 'Transforming Healthcare Through Technology',
      description:
        'Leveraging artificial intelligence and data analytics to improve patient care and medical outcomes.',
    },
    missionSection: {
      label: 'Why Healthcare?',
      description:
        'Healthcare is ripe for innovation. We believe technology can make healthcare more accessible, efficient, and effective for everyone.',
      image: {
        id: 'healthcare-1',
        alt: 'Modern healthcare facility',
        url: '/website-template-OG.webp',
        width: 1200,
        height: 800,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
    featuresSection: {
      title: 'Our Approach',
      description: 'Key areas where we make a difference',
      features: [
        {
          icon: 'Brain',
          title: 'AI Diagnostics',
          description: 'Advanced AI algorithms for faster and more accurate medical diagnoses',
        },
        {
          icon: 'Activity',
          title: 'Patient Monitoring',
          description: 'Real-time patient monitoring and predictive analytics',
        },
        {
          icon: 'Shield',
          title: 'Data Security',
          description: 'HIPAA-compliant security measures to protect patient information',
        },
      ],
    },
    teamSection: {
      label: 'Leadership',
      title: 'Expert Team in Healthcare Tech',
      description:
        'Our team combines medical expertise with technical innovation to create meaningful healthcare solutions.',
      image: {
        id: 'team-healthcare-1',
        alt: 'Healthcare professionals collaborating',
        url: '/website-template-OG.webp',
        width: 1200,
        height: 400,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  },
}
