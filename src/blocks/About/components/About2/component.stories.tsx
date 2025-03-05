import { StoryObj, type Meta } from '@storybook/react'
import type { About2Fields } from '@/payload-types'
import About2 from './Component'

const meta: Meta<typeof About2> = {
  title: 'Blocks/About/About2',
  component: About2,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof About2>

const defaultAbout: About2Fields = {
  mainContent: {
    title: 'Building the Future of Digital Innovation',
    description:
      'We combine cutting-edge technology with creative solutions to transform businesses and enhance user experiences.',
  },
  images: {
    first: {
      id: 'img-1',
      alt: 'Innovation workspace',
      url: '/website-template-OG.webp',
      width: 1200,
      height: 800,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    second: {
      id: 'img-2',
      alt: 'Team collaboration',
      url: '/website-template-OG.webp',
      width: 800,
      height: 600,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    third: {
      id: 'img-3',
      alt: 'Creative process',
      url: '/website-template-OG.webp',
      width: 600,
      height: 800,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  stats: {
    secondTitle: 'Our Impact in Numbers',
    stats: [
      { value: '500+', label: 'Projects Delivered' },
      { value: '100M+', label: 'Users Reached' },
      { value: '50+', label: 'Global Partners' },
      { value: '15+', label: 'Years Experience' },
      { value: '99%', label: 'Client Satisfaction' },
      { value: '24/7', label: 'Support Available' },
    ],
  },
  partners: {
    trustedByTitle: 'Trusted By Industry Leaders',
    partners: [
      {
        logo: {
          id: 'logo-1',
          url: '/website-template-OG.webp',
          alt: 'TechCorp Logo',
          width: 200,
          height: 60,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        name: 'TechCorp',
      },
      {
        logo: {
          id: 'logo-2',
          url: '/website-template-OG.webp',
          alt: 'InnovateLabs Logo',
          width: 200,
          height: 60,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        name: 'InnovateLabs',
      },
      {
        logo: {
          id: 'logo-3',
          url: '/website-template-OG.webp',
          alt: 'FutureWorks Logo',
          width: 200,
          height: 60,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        name: 'FutureWorks',
      },
      {
        logo: {
          id: 'logo-4',
          url: '/website-template-OG.webp',
          alt: 'GlobalTech Logo',
          width: 200,
          height: 60,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        name: 'GlobalTech',
      },
    ],
  },
  benefits: {
    benefitsTitle: 'Why Choose Us',
    benefitsStats: [
      {
        value: '98%',
        label: 'Project Success Rate',
        description:
          'Our proven methodology ensures consistent delivery of high-quality solutions.',
      },
      {
        value: '2x',
        label: 'Faster Development',
        description: 'Accelerated development process without compromising on quality.',
      },
    ],
    benefitsImages: {
      first: {
        id: 'benefit-1',
        url: '/website-template-OG.webp',
        alt: 'Innovation Process',
        width: 800,
        height: 600,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      second: {
        id: 'benefit-2',
        url: '/website-template-OG.webp',
        alt: 'Team Collaboration',
        width: 800,
        height: 600,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      third: {
        id: 'benefit-3',
        url: '/website-template-OG.webp',
        alt: 'Quality Assurance',
        width: 800,
        height: 600,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  },
  testimonial: {
    logo: {
      id: 'testimonial-logo',
      url: '/website-template-OG.webp',
      alt: 'Client Company',
      width: 200,
      height: 60,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    companyName: 'Global Solutions Inc.',
    quote:
      'Their innovative approach and dedication to quality have transformed our digital presence completely.',
    author: {
      name: 'Sarah Johnson',
      role: 'Chief Technology Officer',
    },
  },
}

export const Default: Story = {
  args: defaultAbout,
}

export const WithMinimalFeature: Story = {
  args: {
    ...defaultAbout,
    benefits: {
      benefitsTitle: 'Why Choose Us',
      benefitsStats: [
        {
          value: '98%',
          label: 'Project Success Rate',
          description:
            'Our proven methodology ensures consistent delivery of high-quality solutions.',
        },
      ],
      benefitsImages: {
        first: {
          id: 'benefit-1',
          url: '/website-template-OG.webp',
          alt: 'Innovation Process',
          width: 800,
          height: 600,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        second: '',
        third: '',
      },
    },
    stats: {
      secondTitle: 'Key Statistics',
      stats: [
        { value: '500+', label: 'Projects Delivered' },
        { value: '100M+', label: 'Users Reached' },
      ],
    },
    partners: {
      trustedByTitle: 'Our Partners',
      partners: [
        {
          logo: {
            id: 'logo-1',
            url: '/website-template-OG.webp',
            alt: 'TechCorp Logo',
            width: 200,
            height: 60,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          name: 'TechCorp',
        },
      ],
    },
  },
}

export const WithoutImages: Story = {
  args: {
    mainContent: defaultAbout.mainContent,
    images: {
      first: '',
      second: '',
      third: '',
    },
    stats: defaultAbout.stats,
    partners: {
      trustedByTitle: 'Trusted By Industry Leaders',
      partners: [
        { logo: '', name: 'TechCorp' },
        { logo: '', name: 'InnovateLabs' },
        { logo: '', name: 'FutureWorks' },
        { logo: '', name: 'GlobalTech' },
      ],
    },
    benefits: {
      benefitsTitle: defaultAbout.benefits.benefitsTitle,
      benefitsStats: defaultAbout.benefits.benefitsStats,
      benefitsImages: {
        first: '',
        second: '',
        third: '',
      },
    },
    testimonial: {
      logo: '',
      companyName: defaultAbout.testimonial.companyName,
      quote: defaultAbout.testimonial.quote,
      author: defaultAbout.testimonial.author,
    },
  },
}

export const CustomContent: Story = {
  args: {
    ...defaultAbout,
    mainContent: {
      title: 'Revolutionizing Enterprise Solutions',
      description:
        'Empowering businesses with next-generation technology solutions that drive growth and innovation.',
    },
    stats: {
      ...defaultAbout.stats,
      secondTitle: 'Our Achievement Milestones',
    },
  },
}
