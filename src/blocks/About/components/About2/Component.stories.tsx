import type { Meta, StoryObj } from '@storybook/react'
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

const now = new Date().toISOString()

const defaultAbout2: About2Fields = {
  mainContent: {
    title: 'Elevate Your Business with Cutting-Edge Solutions',
    description:
      'We offer innovative technology solutions to help your business thrive in the digital era.',
  },
  images: {
    first: {
      id: 'image-1',
      alt: 'Modern workspace',
      url: '/website-template-OG.webp',
      width: 1200,
      height: 800,
      createdAt: now,
      updatedAt: now,
    },
    second: {
      id: 'image-2',
      alt: 'Team brainstorming',
      url: '/website-template-OG.webp',
      width: 1200,
      height: 800,
      createdAt: now,
      updatedAt: now,
    },
    third: {
      id: 'image-3',
      alt: 'Innovative office space',
      url: '/website-template-OG.webp',
      width: 1200,
      height: 800,
      createdAt: now,
      updatedAt: now,
    },
  },
  stats: {
    secondTitle: 'Our Impact in Numbers',
    stats: [
      { value: '100+', label: 'Projects Completed' },
      { value: '50+', label: 'Happy Clients' },
      { value: '10+', label: 'Years of Experience' },
    ],
  },
  partners: {
    trustedByTitle: 'Trusted by Leading Brands',
    partners: [
      {
        logo: {
          id: 'partner-1',
          alt: 'Partner 1 logo',
          url: '/website-template-OG.webp',
          width: 200,
          height: 100,
          createdAt: now,
          updatedAt: now,
        },
        name: 'Partner 1',
      },
      {
        logo: {
          id: 'partner-2',
          alt: 'Partner 2 logo',
          url: '/website-template-OG.webp',
          width: 200,
          height: 100,
          createdAt: now,
          updatedAt: now,
        },
        name: 'Partner 2',
      },
      {
        logo: {
          id: 'partner-3',
          alt: 'Partner 3 logo',
          url: '/website-template-OG.webp',
          width: 200,
          height: 100,
          createdAt: now,
          updatedAt: now,
        },
        name: 'Partner 3',
      },
      {
        logo: {
          id: 'partner-4',
          alt: 'Partner 4 logo',
          url: '/website-template-OG.webp',
          width: 200,
          height: 100,
          createdAt: now,
          updatedAt: now,
        },
        name: 'Partner 4',
      },
    ],
  },
  benefits: {
    benefitsTitle: 'Discover the Benefits',
    benefitsImages: {
      first: {
        id: 'benefit-1',
        alt: 'Benefit image 1',
        url: '/website-template-OG.webp',
        width: 1200,
        height: 800,
        createdAt: now,
        updatedAt: now,
      },
      second: {
        id: 'benefit-2',
        alt: 'Benefit image 2',
        url: '/website-template-OG.webp',
        width: 1200,
        height: 800,
        createdAt: now,
        updatedAt: now,
      },
      third: {
        id: 'benefit-3',
        alt: 'Benefit image 3',
        url: '/website-template-OG.webp',
        width: 1200,
        height: 800,
        createdAt: now,
        updatedAt: now,
      },
    },
    benefitsStats: [
      {
        value: '500+',
        label: 'Satisfied Clients',
        description: 'We have helped numerous clients achieve their digital transformation goals.',
      },
      {
        value: '1200+',
        label: 'Projects Delivered',
        description:
          'Our dedicated team has successfully delivered projects across various industries.',
      },
    ],
  },
  testimonial: {
    logo: {
      id: 'testimonial-logo-1',
      alt: 'Testimonial company logo',
      url: '/website-template-OG.webp',
      width: 100,
      height: 50,
      createdAt: now,
      updatedAt: now,
    },
    companyName: 'Acme Corp',
    quote: 'Their innovative approach transformed our business.',
    author: {
      name: 'John Doe',
      role: 'CEO, Acme Corp',
    },
  },
}

export const Default: Story = {
  args: defaultAbout2,
}

export const WithMinimalStats: Story = {
  args: {
    ...defaultAbout2,
    stats: {
      ...defaultAbout2.stats,
      stats: defaultAbout2.stats.stats?.slice(0, 2) || [],
    },
  },
}

export const WithoutImages: Story = {
  args: {
    ...defaultAbout2,
    images: {
      first: '',
      second: '',
      third: '',
    },
    benefits: {
      ...defaultAbout2.benefits,
      benefitsImages: {
        first: '',
        second: '',
        third: '',
      },
    },
    testimonial: {
      ...defaultAbout2.testimonial,
      logo: '',
    },
  },
}

export const CustomContent: Story = {
  args: {
    mainContent: {
      title: 'Redefining Innovation in Fintech',
      description:
        'Bringing revolutionary financial technologies to modernize your banking experience.',
    },
    images: {
      first: {
        id: 'fintech-img1',
        alt: 'Fintech dashboard',
        url: '/website-template-OG.webp',
        width: 1200,
        height: 800,
        createdAt: now,
        updatedAt: now,
      },
      second: {
        id: 'fintech-img2',
        alt: 'Digital transactions',
        url: '/website-template-OG.webp',
        width: 1200,
        height: 800,
        createdAt: now,
        updatedAt: now,
      },
      third: {
        id: 'fintech-img3',
        alt: 'Banking innovation',
        url: '/website-template-OG.webp',
        width: 1200,
        height: 800,
        createdAt: now,
        updatedAt: now,
      },
    },
    stats: {
      secondTitle: 'Fintech Achievements',
      stats: [
        { value: '$1B+', label: 'Processed Transactions' },
        { value: '99.9%', label: 'Uptime' },
      ],
    },
    partners: {
      trustedByTitle: 'Trusted by Financial Leaders',
      partners: [
        {
          logo: {
            id: 'fintech-partner1',
            alt: 'Bank 1 logo',
            url: '/website-template-OG.webp',
            width: 200,
            height: 100,
            createdAt: now,
            updatedAt: now,
          },
          name: 'Bank 1',
        },
        {
          logo: {
            id: 'fintech-partner2',
            alt: 'Bank 2 logo',
            url: '/website-template-OG.webp',
            width: 200,
            height: 100,
            createdAt: now,
            updatedAt: now,
          },
          name: 'Bank 2',
        },
        {
          logo: {
            id: 'fintech-partner3',
            alt: 'Bank 3 logo',
            url: '/website-template-OG.webp',
            width: 200,
            height: 100,
            createdAt: now,
            updatedAt: now,
          },
          name: 'Bank 3',
        },
        {
          logo: {
            id: 'fintech-partner4',
            alt: 'Bank 4 logo',
            url: '/website-template-OG.webp',
            width: 200,
            height: 100,
            createdAt: now,
            updatedAt: now,
          },
          name: 'Bank 4',
        },
      ],
    },
    benefits: {
      benefitsTitle: 'Why Choose Us',
      benefitsImages: {
        first: {
          id: 'fintech-benefit1',
          alt: 'Fintech benefit image 1',
          url: '/website-template-OG.webp',
          width: 1200,
          height: 800,
          createdAt: now,
          updatedAt: now,
        },
        second: {
          id: 'fintech-benefit2',
          alt: 'Fintech benefit image 2',
          url: '/website-template-OG.webp',
          width: 1200,
          height: 800,
          createdAt: now,
          updatedAt: now,
        },
        third: {
          id: 'fintech-benefit3',
          alt: 'Fintech benefit image 3',
          url: '/website-template-OG.webp',
          width: 1200,
          height: 800,
          createdAt: now,
          updatedAt: now,
        },
      },
      benefitsStats: [
        {
          value: '150+',
          label: 'Innovative Solutions',
          description: 'Cutting-edge technology solutions tailored for the financial sector.',
        },
        {
          value: '50+',
          label: 'Expert Consultants',
          description: 'Industry experts driving transformation and growth.',
        },
      ],
    },
    testimonial: {
      logo: {
        id: 'fintech-testimonial-logo',
        alt: 'Fintech testimonial logo',
        url: '/website-template-OG.webp',
        width: 100,
        height: 50,
        createdAt: now,
        updatedAt: now,
      },
      companyName: 'FinTech Inc',
      quote: 'Their fintech solutions are game-changers for our business.',
      author: {
        name: 'Jane Smith',
        role: 'CTO, FinTech Inc',
      },
    },
  },
}
