import { StoryObj, type Meta } from '@storybook/react'
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

const defaultAbout: About5Fields = {
  mainSection: {
    label: 'ABOUT US',
    title: 'Building Tomorrows Digital Solutions',
    description:
      'We are a team of passionate innovators dedicated to transforming ideas into impactful digital solutions that drive business growth and user engagement.',
  },
  imageSection: {
    image: {
      id: 'main-1',
      alt: 'Team collaboration',
      url: '/website-template-OG.webp',
      width: 1200,
      height: 675,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    caption: 'Our team collaborating on innovative solutions',
  },
  partnersSection: {
    title: 'Trusted by Industry Leaders Worldwide',
    partners: Array(4).fill({
      logo: {
        id: 'partner-1',
        alt: 'Partner logo',
        url: '/website-template-OG.webp',
        width: 200,
        height: 80,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }),
  },
  missionSection: {
    title: 'Our Mission and Impact',
    description:
      'We strive to create innovative solutions that empower businesses to thrive in the digital age. Through our commitment to excellence and continuous innovation, we help our clients achieve their goals and make a lasting impact.',
    stats: [
      { value: '500+', label: 'Projects Completed' },
      { value: '95%', label: 'Client Satisfaction' },
    ],
    image: {
      id: 'mission-1',
      alt: 'Mission in action',
      url: '/website-template-OG.webp',
      width: 800,
      height: 600,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
}

export const Default: Story = {
  args: defaultAbout,
}

export const WithMinimalFeature: Story = {
  args: {
    ...defaultAbout,
    partnersSection: {
      title: 'Our Partners',
      partners: Array(4)
        .fill({
          logo: {
            id: 'partner-1',
            alt: 'Partner logo',
            url: '/website-template-OG.webp',
            width: 200,
            height: 80,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        })
        .slice(0, 2),
    },
    missionSection: {
      ...defaultAbout.missionSection,
      description:
        'Creating innovative solutions that empower businesses to thrive in the digital age.',
      stats: [{ value: '500+', label: 'Projects' }],
    },
  },
}

export const WithoutImages: Story = {
  args: {
    ...defaultAbout,
    imageSection: {
      image: '',
      caption: 'Image caption placeholder',
    },
    partnersSection: {
      title: 'Our Partners',
      partners: Array(4).fill({
        logo: '',
      }),
    },
    missionSection: {
      ...defaultAbout.missionSection,
      image: '',
    },
  },
}

export const CustomContent: Story = {
  args: {
    ...defaultAbout,
    mainSection: {
      label: 'OUR STORY',
      title: 'Pioneering Digital Excellence',
      description:
        'Leading the way in digital transformation with innovative solutions and unparalleled expertise.',
    },
    missionSection: {
      title: 'Driving Innovation Forward',
      description:
        'Our commitment to excellence and innovation helps businesses navigate the digital landscape and achieve sustainable growth.',
      stats: [
        { value: '10+', label: 'Years Experience' },
        { value: '100%', label: 'Project Success' },
      ],
      image: defaultAbout.missionSection.image,
    },
  },
}
