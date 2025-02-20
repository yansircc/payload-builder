import type { Meta, StoryObj } from '@storybook/react'
import type { CTA1Fields } from '@/payload-types'
import CTA1 from './Component'

const meta = {
  title: 'Blocks/CTA/CTA1',
  component: CTA1,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CTA1>

export default meta
type Story = StoryObj<typeof CTA1>

const defaultCTA: CTA1Fields = {
  cta: {
    title: 'Start Your Digital Journey',
    subtitle: 'Transform your business with our cutting-edge solutions and expert guidance.',
    icon: 'Rocket',
    image: {
      id: 'mock-image-1',
      alt: 'Digital Transformation',
      width: 800,
      height: 600,
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
          suffixIcon: 'ArrowRight',
        },
      },
    ],
  },
}

export const Default: Story = {
  args: defaultCTA,
}

export const WithoutIcon: Story = {
  args: {
    cta: {
      ...defaultCTA.cta,
      icon: '',
    },
  },
}

export const WithoutSubtitle: Story = {
  args: {
    cta: {
      ...defaultCTA.cta,
      subtitle: '',
    },
  },
}

export const WithDifferentLink: Story = {
  args: {
    cta: {
      ...defaultCTA.cta,
      links: [
        {
          'link-1': {
            type: 'custom',
            label: 'Learn More',
            url: '#',
            appearance: 'outline',
          },
        },
      ],
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
