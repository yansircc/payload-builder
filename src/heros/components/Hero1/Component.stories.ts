import type { Meta, StoryObj } from '@storybook/react'
import type { Hero1Fields } from '@/payload-types'
import Hero1 from './Component'

const meta = {
  title: 'Sections/Hero1',
  component: Hero1,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero1>

export default meta
type Story = StoryObj<typeof Hero1>

const defaultHero: Hero1Fields = {
  title: 'Modern Solutions for Growing Businesses',
  subtitle:
    'Empower your business with cutting-edge technology and innovative solutions that drive growth and success.',
  badge: 'New Features Available',
  image: {
    id: 'mock-image-1',
    alt: 'Business Growth Illustration',
    width: 800,
    height: 800,
    url: '/website-template-OG.webp',
    updatedAt: '2024-03-20T00:00:00.000Z',
    createdAt: '2024-03-20T00:00:00.000Z',
  },
  links: [
    {
      'link-1': {
        type: 'custom',
        label: 'Get Started',
        url: '#',
        appearance: 'default',
      },
      'link-2': {
        type: 'custom',
        label: 'Learn More',
        url: '#',
        appearance: 'outline',
      },
    },
  ],
}

export const Default: Story = {
  args: defaultHero,
}

export const WithoutSubtitle: Story = {
  args: {
    title: 'Modern Solutions for Growing Businesses',
    subtitle: null,
  },
}

export const SingleButton: Story = {
  args: {
    title: 'Modern Solutions for Growing Businesses',
    subtitle: null,
    links: [
      {
        'link-1': {
          type: 'custom',
          label: 'Get Started',
          url: '#',
          appearance: 'default',
        },
        'link-2': {
          type: 'custom',
          label: 'Learn More',
          url: '#',
          appearance: 'outline',
        },
      },
    ],
  },
}

export const WithoutBadge: Story = {
  args: {
    title: 'Modern Solutions for Growing Businesses',
    subtitle: null,
  },
}

export const LongContent: Story = {
  args: {
    title: 'Transform Your Business with Enterprise-Grade Solutions and Expert Guidance',
    subtitle:
      "Experience the power of our comprehensive suite of tools and services designed to elevate your business operations, streamline workflows, and drive unprecedented growth in today's competitive market.",
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
