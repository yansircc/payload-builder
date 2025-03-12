import type { Meta, StoryObj } from '@storybook/react'
import type { CTA5Fields } from '@/payload-types'
import CTA5 from './Component'

const meta = {
  title: 'Blocks/CTA/CTA5',
  component: CTA5,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CTA5>

export default meta
type Story = StoryObj<typeof CTA5>

const defaultCTA: CTA5Fields = {
  title: 'Split Card with Image',
  subtitle: 'Enhance your digital presence with our professional solutions tailored to your needs.',
  image: {
    id: 'mock-image-1',
    alt: 'Professional Services',
    width: 800,
    height: 600,
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
        suffixIcon: 'ArrowRight',
      },
    },
  ],
}

export const Default: Story = {
  args: defaultCTA,
}

export const WithoutSubtitle: Story = {
  args: {
    ...defaultCTA,
    subtitle: '',
  },
}

export const WithoutLinks: Story = {
  args: {
    ...defaultCTA,
    links: [],
  },
}

export const WithMultipleLinks: Story = {
  args: {
    ...defaultCTA,
    links: [
      {
        link: {
          type: 'custom',
          label: 'Get Started',
          url: '#',
          appearance: 'default',
          suffixIcon: 'ArrowRight',
        },
      },
      {
        link: {
          type: 'custom',
          label: 'Learn More',
          url: '#',
          appearance: 'default',
        },
      },
    ],
  },
}

export const WithDifferentImage: Story = {
  args: {
    ...defaultCTA,
    image: {
      id: 'mock-image-2',
      alt: 'Alternative Image',
      width: 800,
      height: 600,
      url: '/website-template-OG.webp',
      updatedAt: '2024-03-20T00:00:00.000Z',
      createdAt: '2024-03-20T00:00:00.000Z',
    },
  },
}

// Responsive Variants
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: defaultCTA,
}

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: defaultCTA,
}

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: defaultCTA,
}
