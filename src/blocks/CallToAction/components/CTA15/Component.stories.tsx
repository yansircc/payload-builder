import type { Meta, StoryObj } from '@storybook/react'
import CTA15 from './Component'

const meta = {
  title: 'Blocks/CTA/CTA15',
  component: CTA15,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CTA15>

export default meta
type Story = StoryObj<typeof CTA15>

const image = {
  id: 'featured-1',
  alt: 'Office Environment',
  url: '/website-template-OG.webp',
  width: 1200,
  height: 800,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const Default: Story = {
  args: {
    heading: 'Ready to get started?',
    title: 'Transform Your Business with Our Platform',
    subtitle: 'Join thousands of companies already growing with our comprehensive solutions.',
    image,
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
    heading: 'Ready to get started?',
    title: 'Transform Your Business with Our Platform',
    image,
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

export const CustomHeading: Story = {
  args: {
    heading: 'Special Offer',
    title: 'Transform Your Business with Our Platform',
    subtitle: 'Join thousands of companies already growing with our comprehensive solutions.',
    image,
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
    heading: 'Ready to get started?',
    title: 'Transform Your Business with Our Platform',
    subtitle: 'Join thousands of companies already growing with our comprehensive solutions.',
    image,
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

// Responsive Variants
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: {
    heading: 'Ready to get started?',
    title: 'Transform Your Business with Our Platform',
    subtitle: 'Join thousands of companies already growing with our comprehensive solutions.',
    image,
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

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: {
    heading: 'Ready to get started?',
    title: 'Transform Your Business with Our Platform',
    subtitle: 'Join thousands of companies already growing with our comprehensive solutions.',
    image,
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

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: {
    heading: 'Ready to get started?',
    title: 'Transform Your Business with Our Platform',
    subtitle: 'Join thousands of companies already growing with our comprehensive solutions.',
    image,
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
