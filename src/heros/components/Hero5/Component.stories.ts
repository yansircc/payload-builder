import type { Meta, StoryObj } from '@storybook/react'
import type { Hero5Fields } from '@/payload-types'
import Hero5 from './Component'

const meta = {
  title: 'Sections/Hero/Hero5',
  component: Hero5,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero5>

export default meta
type Story = StoryObj<typeof Hero5>

const defaultHero: Hero5Fields = {
  hero: {
    title: 'Streamlined Solutions for Modern Businesses',
    subtitle: "Empower your team with intuitive tools designed for today's fast-paced environment.",
    image: {
      id: 'mock-image-1',
      alt: 'Business Dashboard',
      width: 1200,
      height: 675,
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
          prefixIcon: 'Download',
        },
      },
    ],
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
      links: [],
    },
  },
}

export const LongContent: Story = {
  args: {
    hero: {
      ...defaultHero.hero,
      title: 'Transform Your Business Operations with Enterprise-Grade Solutions',
      subtitle:
        "Leverage our comprehensive suite of tools designed to streamline workflows, enhance productivity, and drive sustainable growth in today's competitive market.",
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
