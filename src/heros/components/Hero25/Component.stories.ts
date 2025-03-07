import type { Meta, StoryObj } from '@storybook/react'
import type { Hero25Fields } from '@/payload-types'
import Hero25 from './Component'

const meta = {
  title: 'Sections/Hero/Hero25',
  component: Hero25,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero25>

export default meta
type Story = StoryObj<typeof Hero25>

const defaultHero: Hero25Fields = {
  hero: {
    title: 'The Platform for Modern Development',
    badge: 'New Release v3.0',
    logo: {
      id: 'company-logo',
      alt: 'Company Logo',
      width: 120,
      height: 120,
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
          suffixIcon: 'MoveRight',
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
    features: [
      {
        icon: 'Zap',
        title: 'Lightning Fast',
      },
      {
        icon: 'Shield',
        title: 'Secure by Default',
      },
      {
        icon: 'BarChart',
        title: 'Analytics Built-in',
      },
      {
        icon: 'Cloud',
        title: 'Cloud Native',
      },
    ],
  },
}

export const Default: Story = {
  args: defaultHero,
}

export const WithoutBadge: Story = {
  args: {
    hero: {
      ...defaultHero.hero,
      badge: null,
    },
  },
}

export const SingleButton: Story = {
  args: {
    hero: {
      ...defaultHero.hero,
      links: [
        {
          link: {
            type: 'custom',
            label: 'Get Started',
            url: '#',
            appearance: 'default',
            suffixIcon: 'MoveRight',
          },
        },
      ],
    },
  },
}

export const FewerFeatures: Story = {
  args: {
    hero: {
      ...defaultHero.hero,
      features: [
        {
          icon: 'Zap',
          title: 'Lightning Fast',
        },
        {
          icon: 'Shield',
          title: 'Secure by Default',
        },
      ],
    },
  },
}

export const LongTitle: Story = {
  args: {
    hero: {
      ...defaultHero.hero,
      title: 'The Comprehensive Platform for Modern Development and Enterprise Solutions',
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
