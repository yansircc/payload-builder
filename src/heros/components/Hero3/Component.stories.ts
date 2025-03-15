import type { Meta, StoryObj } from '@storybook/react'
import type { Hero3Fields } from '@/payload-types'
import Hero3 from './Component'

const meta = {
  title: 'Sections/Hero/Hero3',
  component: Hero3,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero3>

export default meta
type Story = StoryObj<typeof Hero3>

const defaultArgs: Hero3Fields = {
  title: 'Trusted by Thousands of Businesses Worldwide',
  subtitle:
    'Join the community of satisfied customers who have transformed their operations with our platform.',
  image: {
    id: 'mock-image-1',
    alt: 'Dashboard Interface',
    width: 1200,
    height: 800,
    url: '/website-template-OG.webp',
    updatedAt: '2024-03-20T00:00:00.000Z',
    createdAt: '2024-03-20T00:00:00.000Z',
  },
  avatars: [
    {
      avatar: {
        id: 'avatar-1',
        alt: 'User Avatar 1',
        width: 100,
        height: 100,
        url: '/avatar-1.webp',
        updatedAt: '2024-03-20T00:00:00.000Z',
        createdAt: '2024-03-20T00:00:00.000Z',
      },
    },
    {
      avatar: {
        id: 'avatar-2',
        alt: 'User Avatar 2',
        width: 100,
        height: 100,
        url: '/avatar-1.webp',
        updatedAt: '2024-03-20T00:00:00.000Z',
        createdAt: '2024-03-20T00:00:00.000Z',
      },
    },
    {
      avatar: {
        id: 'avatar-3',
        alt: 'User Avatar 3',
        width: 100,
        height: 100,
        url: '/avatar-1.webp',
        updatedAt: '2024-03-20T00:00:00.000Z',
        createdAt: '2024-03-20T00:00:00.000Z',
      },
    },
    {
      avatar: {
        id: 'avatar-4',
        alt: 'User Avatar 4',
        width: 100,
        height: 100,
        url: '/avatar-1.webp',
        updatedAt: '2024-03-20T00:00:00.000Z',
        createdAt: '2024-03-20T00:00:00.000Z',
      },
    },
    {
      avatar: {
        id: 'avatar-5',
        alt: 'User Avatar 5',
        width: 100,
        height: 100,
        url: '/avatar-1.webp',
        updatedAt: '2024-03-20T00:00:00.000Z',
        createdAt: '2024-03-20T00:00:00.000Z',
      },
    },
  ],
  rating: 5,
  reviewCount: '2500',
  links: [
    {
      link: {
        type: 'custom',
        label: 'Get Started',
        url: '#',
        appearance: 'default',
      },
    },
    {
      link: {
        type: 'custom',
        label: 'View Demo',
        url: '#',
        appearance: 'outline',
        suffixIcon: 'ArrowDownRight',
      },
    },
  ],
}

export const Default: Story = {
  args: defaultArgs,
}

export const WithoutSubtitle: Story = {
  args: {
    ...defaultArgs,
    subtitle: '',
  },
}

export const LowerRating: Story = {
  args: {
    ...defaultArgs,
    rating: 4,
  },
}

export const SingleButton: Story = {
  args: {
    ...defaultArgs,
    links: [
      {
        link: {
          type: 'custom',
          label: 'Get Started',
          url: '#',
          appearance: 'default',
        },
      },
    ],
  },
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: defaultArgs,
}

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: defaultArgs,
}

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: defaultArgs,
}
