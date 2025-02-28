import type { Meta, StoryObj } from '@storybook/react'
import type { Hero32Fields } from '@/payload-types'
import Hero32 from './Component'

const meta = {
  title: 'Sections/Hero/Hero32',
  component: Hero32,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero32>

export default meta
type Story = StoryObj<typeof Hero32>

// Create an array of 15 integration images
const createIntegrations = () => {
  return Array.from({ length: 15 }, (_, i) => ({
    image: {
      id: `integration-${i + 1}`,
      alt: `Integration Logo ${i + 1}`,
      width: 100,
      height: 100,
      url: '/website-template-OG.webp',
      updatedAt: '2024-03-20T00:00:00.000Z',
      createdAt: '2024-03-20T00:00:00.000Z',
    },
  }))
}

const defaultHero: Hero32Fields = {
  hero: {
    title: 'Integrate with Your Favorite Tools',
    subtitle: 'Connect with over 100+ tools and services to streamline your workflow',
    link: {
      type: 'custom',
      label: 'View All Integrations',
      url: '#',
      appearance: 'default',
      suffixIcon: 'ArrowRight',
    },
    integrations: createIntegrations(),
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

export const WithoutLink: Story = {
  args: {
    hero: {
      ...defaultHero.hero,
      link: {
        type: 'custom',
        label: '',
        url: '',
        appearance: 'link',
      },
    },
  },
}

export const LongTitle: Story = {
  args: {
    hero: {
      ...defaultHero.hero,
      title: 'Integrate with Your Favorite Tools and Services for Maximum Productivity',
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
