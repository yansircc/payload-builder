import type { Meta, StoryObj } from '@storybook/react'
import CTA11 from './Component'

const meta = {
  title: 'Blocks/CTA/CTA11',
  component: CTA11,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CTA11>

export default meta
type Story = StoryObj<typeof CTA11>

export const Default: Story = {
  args: {
    title: 'Ready to Get Started with Our Platform?',
    subtitle: 'Join thousands of businesses already growing with our solutions.',
    links: [
      {
        link: {
          type: 'custom',
          label: 'Get Started',
          url: '#',
          appearance: 'default',
          suffixIcon: 'ArrowRight',
        },
        id: '1',
      },
      {
        link: {
          type: 'custom',
          label: 'Learn More',
          url: '#',
          appearance: 'ghost',
        },
        id: '2',
      },
    ],
  },
}

export const WithoutSubtitle: Story = {
  args: {
    title: 'Ready to Get Started with Our Platform?',
    links: [
      {
        link: {
          type: 'custom',
          label: 'Get Started',
          url: '#',
          appearance: 'default',
          suffixIcon: 'ArrowRight',
        },
        id: '1',
      },
      {
        link: {
          type: 'custom',
          label: 'Learn More',
          url: '#',
          appearance: 'ghost',
        },
        id: '2',
      },
    ],
  },
}

export const SingleButton: Story = {
  args: {
    title: 'Ready to Get Started with Our Platform?',
    subtitle: 'Join thousands of businesses already growing with our solutions.',
    links: [
      {
        link: {
          type: 'custom',
          label: 'Get Started',
          url: '#',
          appearance: 'default',
          suffixIcon: 'ArrowRight',
        },
        id: '1',
      },
    ],
  },
}
