import type { Meta, StoryObj } from '@storybook/react'
import type { Hero6Fields } from '@/payload-types'
import Hero6 from './Component'

const meta = {
  title: 'Sections/Hero/Hero6',
  component: Hero6,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero6>

export default meta
type Story = StoryObj<typeof Hero6>

const defaultHero: Hero6Fields = {
  hero: {
    title: 'Enterprise Solutions for Modern Businesses',
    subtitle: 'Trusted by leading companies worldwide to deliver exceptional results',
    image: {
      id: 'mock-image-1',
      alt: 'Business Meeting',
      width: 1200,
      height: 800,
      url: '/website-template-OG.webp',
      updatedAt: '2024-03-20T00:00:00.000Z',
      createdAt: '2024-03-20T00:00:00.000Z',
    },
    secondaryImage: {
      image: {
        id: 'mock-image-2',
        alt: 'Product Dashboard',
        width: 800,
        height: 800,
        url: '/website-template-OG.webp',
        updatedAt: '2024-03-20T00:00:00.000Z',
        createdAt: '2024-03-20T00:00:00.000Z',
      },
    },
    links: [
      {
        link: {
          type: 'custom',
          label: 'Get Started',
          url: '#',
          appearance: 'default',
          suffixIcon: 'ChevronRight',
        },
      },
      {
        link: {
          type: 'custom',
          label: 'Learn More',
          url: '#',
          appearance: 'outline',
        },
      },
      {
        link: {
          type: 'custom',
          label: 'View Demo',
          url: '#',
          appearance: 'link',
          suffixIcon: 'ArrowRight',
        },
      },
    ],
    partners: [
      {
        logo: {
          id: 'partner-1',
          alt: 'Partner Logo 1',
          width: 200,
          height: 80,
          url: '/website-template-OG.webp',
          updatedAt: '2024-03-20T00:00:00.000Z',
          createdAt: '2024-03-20T00:00:00.000Z',
        },
      },
      {
        logo: {
          id: 'partner-2',
          alt: 'Partner Logo 2',
          width: 200,
          height: 80,
          url: '/website-template-OG.webp',
          updatedAt: '2024-03-20T00:00:00.000Z',
          createdAt: '2024-03-20T00:00:00.000Z',
        },
      },
      {
        logo: {
          id: 'partner-3',
          alt: 'Partner Logo 3',
          width: 200,
          height: 80,
          url: '/website-template-OG.webp',
          updatedAt: '2024-03-20T00:00:00.000Z',
          createdAt: '2024-03-20T00:00:00.000Z',
        },
      },
      {
        logo: {
          id: 'partner-4',
          alt: 'Partner Logo 4',
          width: 200,
          height: 80,
          url: '/website-template-OG.webp',
          updatedAt: '2024-03-20T00:00:00.000Z',
          createdAt: '2024-03-20T00:00:00.000Z',
        },
      },
    ],
  },
}

export const Default: Story = {
  args: defaultHero,
}

export const WithoutSubtitle: Story = {
  args: {
    hero: {
      ...defaultHero.hero,
      subtitle: null,
    },
  },
}

export const WithoutPartners: Story = {
  args: {
    hero: {
      ...defaultHero.hero,
      partners: [],
    },
  },
}

export const LongTitle: Story = {
  args: {
    hero: {
      ...defaultHero.hero,
      title: 'Comprehensive Enterprise Solutions for Modern Businesses and Organizations',
    },
  },
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: defaultHero,
}

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: defaultHero,
}

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: defaultHero,
}
