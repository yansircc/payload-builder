import type { Meta, StoryObj } from '@storybook/react'
import type { CTA4Fields } from '@/payload-types'
import CTA4 from './Component'

const meta = {
  title: 'Blocks/CTA/CTA4',
  component: CTA4,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CTA4>

export default meta
type Story = StoryObj<typeof CTA4>

const defaultCTA: CTA4Fields = {
  title: 'Accent Card with Features',
  subtitle: 'Discover our key features and benefits with this engaging call-to-action.',
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
  lists: [
    {
      icon: 'Check',
      text: 'Fast and reliable service',
    },
    {
      icon: 'Shield',
      text: 'Secure and protected data',
    },
    {
      icon: 'Star',
      text: 'Premium quality support',
    },
    {
      icon: 'Clock',
      text: '24/7 customer assistance',
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

export const WithoutLists: Story = {
  args: {
    ...defaultCTA,
    lists: [],
  },
}

export const WithDifferentLink: Story = {
  args: {
    ...defaultCTA,
    links: [
      {
        link: {
          type: 'custom',
          label: 'Learn More',
          url: '#',
          appearance: 'default',
          suffixIcon: 'ArrowRight',
        },
      },
    ],
  },
}

export const WithFewerListItems: Story = {
  args: {
    ...defaultCTA,
    lists: defaultCTA.lists?.slice(0, 2),
  },
}
