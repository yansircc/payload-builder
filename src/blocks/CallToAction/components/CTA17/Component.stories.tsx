import type { Meta, StoryObj } from '@storybook/react'
import CTA17 from './Component'

const meta = {
  title: 'Blocks/CTA/CTA17',
  component: CTA17,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CTA17>

export default meta
type Story = StoryObj<typeof CTA17>

export const Default: Story = {
  args: {
    title: 'Ready to Start Your Journey?',
    subtitle: 'Join thousands of customers already using our platform to grow their business.',
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
    title: 'Ready to Start Your Journey?',
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

export const LongTitle: Story = {
  args: {
    title: 'Transform Your Business with Our Comprehensive Platform and Expert Solutions',
    subtitle: 'Join thousands of customers already using our platform to grow their business.',
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
    title: 'Ready to Start Your Journey?',
    subtitle: 'Join thousands of customers already using our platform to grow their business.',
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
    title: 'Ready to Start Your Journey?',
    subtitle: 'Join thousands of customers already using our platform to grow their business.',
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
    title: 'Ready to Start Your Journey?',
    subtitle: 'Join thousands of customers already using our platform to grow their business.',
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
    title: 'Ready to Start Your Journey?',
    subtitle: 'Join thousands of customers already using our platform to grow their business.',
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
