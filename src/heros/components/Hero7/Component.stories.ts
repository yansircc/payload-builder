import type { Meta, StoryObj } from '@storybook/react'
import type { Hero7Fields } from '@/payload-types'
import Hero7 from './Component'

const meta = {
  title: 'Sections/Hero/Hero7',
  component: Hero7,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero7>

export default meta
type Story = StoryObj<typeof Hero7>

const defaultArgs: Hero7Fields = {
  title: 'Trusted by Thousands of Customers Worldwide',
  subtitle:
    'Join our growing community of satisfied users who have transformed their business with our platform',
  link: {
    type: 'custom',
    label: 'Get Started Today',
    url: '#',
    appearance: 'default',
    suffixIcon: 'ArrowRight',
  },
  rating: {
    rate: 5,
    count: 2500,
    avatars: [
      {
        avatar: {
          id: 'avatar-1',
          alt: 'User Avatar 1',
          width: 100,
          height: 100,
          url: '/website-template-OG.webp',
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
          url: '/website-template-OG.webp',
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
          url: '/website-template-OG.webp',
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
          url: '/website-template-OG.webp',
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
          url: '/website-template-OG.webp',
          updatedAt: '2024-03-20T00:00:00.000Z',
          createdAt: '2024-03-20T00:00:00.000Z',
        },
      },
    ],
  },
}

export const Default: Story = {
  args: defaultArgs,
}

export const WithoutSubtitle: Story = {
  args: {
    ...defaultArgs,
    subtitle: null,
  },
}

export const WithoutLink: Story = {
  args: {
    ...defaultArgs,
    link: {
      type: 'custom',
      label: '',
      url: '',
      appearance: 'link',
    },
  },
}

export const LowerRating: Story = {
  args: {
    ...defaultArgs,
    rating: {
      ...defaultArgs.rating,
      rate: 4,
    },
  },
}

export const FewerAvatars: Story = {
  args: {
    ...defaultArgs,
    rating: {
      ...defaultArgs.rating,
      avatars: [
        {
          avatar: {
            id: 'avatar-1',
            alt: 'User Avatar 1',
            width: 100,
            height: 100,
            url: '/website-template-OG.webp',
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
            url: '/website-template-OG.webp',
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
            url: '/website-template-OG.webp',
            updatedAt: '2024-03-20T00:00:00.000Z',
            createdAt: '2024-03-20T00:00:00.000Z',
          },
        },
      ],
    },
  },
}

export const LongTitle: Story = {
  args: {
    ...defaultArgs,
    title: 'Trusted by Thousands of Enterprise Customers Across the Globe',
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
