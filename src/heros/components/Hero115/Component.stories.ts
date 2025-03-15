import type { Meta, StoryObj } from '@storybook/react'
import type { Hero115Fields } from '@/payload-types'
import Hero115 from './Component'

const meta = {
  title: 'Sections/Hero/Hero115',
  component: Hero115,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero115>

export default meta
type Story = StoryObj<typeof Hero115>

const defaultArgs: Hero115Fields = {
  title: 'Revolutionize Your Workflow with Our Video Platform',
  subtitle:
    'Seamlessly create, edit, and share professional videos with our intuitive platform designed for teams of all sizes',
  trustText: 'Trusted by over 10,000+ companies worldwide',
  image: {
    id: 'hero-image',
    alt: 'Video platform dashboard',
    width: 1200,
    height: 600,
    url: '/website-template-OG.webp',
    updatedAt: '2024-03-20T00:00:00.000Z',
    createdAt: '2024-03-20T00:00:00.000Z',
  },
  links: [
    {
      link: {
        type: 'custom',
        label: 'Start Free Trial',
        url: '#',
        appearance: 'default',
        suffixIcon: 'Zap',
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

export const WithoutTrustText: Story = {
  args: {
    ...defaultArgs,
    trustText: '',
  },
}

export const WithoutLink: Story = {
  args: {
    ...defaultArgs,
    links: [],
  },
}

export const LongTitle: Story = {
  args: {
    ...defaultArgs,
    title:
      'Revolutionize Your Creative Workflow with Our Enterprise-Grade Video Production Platform',
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
