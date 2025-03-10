import type { Meta, StoryObj } from '@storybook/react'
import type { Hero34Fields } from '@/payload-types'
import Hero34 from './Component'

const meta = {
  title: 'Sections/Hero/Hero34',
  component: Hero34,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero34>

export default meta
type Story = StoryObj<typeof Hero34>

const defaultArgs: Hero34Fields = {
  title: 'Modern Solutions for Growing Businesses',
  subtitle: 'Streamline your operations with our powerful platform designed for scale',
  badge: 'New Features Available',
  image: {
    id: 'hero-image',
    alt: 'Business Dashboard',
    width: 800,
    height: 629,
    url: '/website-template-OG.webp',
    updatedAt: '2024-03-20T00:00:00.000Z',
    createdAt: '2024-03-20T00:00:00.000Z',
  },
  links: [
    {
      link: {
        type: 'custom',
        label: 'Get Started',
        url: '#',
        appearance: 'default',
        prefixIcon: 'ArrowRight',
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
  ],
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

export const WithoutBadge: Story = {
  args: {
    ...defaultArgs,
    badge: '',
  },
}

export const LongTitle: Story = {
  args: {
    ...defaultArgs,
    title: 'Modern Enterprise Solutions for Growing Businesses and Organizations',
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
