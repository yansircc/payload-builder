import type { Meta, StoryObj } from '@storybook/react'
import type { Hero8Fields } from '@/payload-types'
import Hero8 from './Component'

const meta = {
  title: 'Sections/Hero/Hero8',
  component: Hero8,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero8>

export default meta
type Story = StoryObj<typeof Hero8>

const defaultArgs: Hero8Fields = {
  title: 'Build Better Products Faster',
  subtitle:
    'Our platform provides everything you need to create, launch, and scale your digital products with confidence.',
  image: {
    id: 'mock-image-1',
    alt: 'Product Dashboard',
    width: 1400,
    height: 700,
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
        suffixIcon: 'ChevronRight',
      },
    },
    {
      link: {
        type: 'custom',
        label: 'Learn More',
        url: '#',
        appearance: 'outline',
        suffixIcon: 'ChevronRight',
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
          suffixIcon: 'ChevronRight',
        },
      },
    ],
  },
}

export const LongTitle: Story = {
  args: {
    ...defaultArgs,
    title: 'Transform Your Business with Enterprise-Grade Solutions and Expert Guidance',
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
