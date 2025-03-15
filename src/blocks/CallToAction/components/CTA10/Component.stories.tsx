import type { Meta, StoryObj } from '@storybook/react'
import CTA10 from './Component'

const meta = {
  title: 'Blocks/CTA/CTA10',
  component: CTA10,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CTA10>

export default meta
type Story = StoryObj<typeof CTA10>

export const Default: Story = {
  args: {
    title: 'Ready to Transform Your Business?',
    subtitle: 'Join thousands of companies already growing with our platform.',
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
    title: 'Ready to Transform Your Business?',
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
    title: 'Ready to Transform Your Business?',
    subtitle: 'Join thousands of companies already growing with our platform.',
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
