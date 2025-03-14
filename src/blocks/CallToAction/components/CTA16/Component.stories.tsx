import type { Meta, StoryObj } from '@storybook/react'
import CTA16 from './Component'

const meta = {
  title: 'Blocks/CTA/CTA16',
  component: CTA16,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CTA16>

export default meta
type Story = StoryObj<typeof CTA16>

// Image URL for the stories
const imageUrl = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4'

export const Default: Story = {
  args: {
    title: 'Take Your Business to the Next Level',
    subtitle: 'Join thousands of satisfied customers',
    image: imageUrl,
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
          appearance: 'secondary',
        },
        id: '2',
      },
    ],
  },
}

export const WithoutSubtitle: Story = {
  args: {
    title: 'Take Your Business to the Next Level',
    image: imageUrl,
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

export const WithIcon: Story = {
  args: {
    title: 'Take Your Business to the Next Level',
    subtitle: 'Join thousands of satisfied customers',
    icon: 'Star',
    image: imageUrl,
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
    title: 'Take Your Business to the Next Level',
    subtitle: 'Join thousands of satisfied customers',
    image: imageUrl,
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
