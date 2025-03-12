import type { Meta, StoryObj } from '@storybook/react'
import type { CTA3Fields } from '@/payload-types'
import CTA3 from './Component'

const meta = {
  title: 'Blocks/CTA/CTA3',
  component: CTA3,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CTA3>

export default meta
type Story = StoryObj<typeof CTA3>

const defaultCTA: CTA3Fields = {
  title: 'Ready to transform your business?',
  subtitle: 'Get started with our powerful solutions and take your business to the next level.',
  buttons: [
    {
      link: {
        type: 'custom',
        label: 'Get Started',
        url: '#',
        appearance: 'default',
        suffixIcon: 'ArrowRight',
      },
    },
    {
      link: {
        type: 'custom',
        label: 'Learn More',
        url: '#',
        appearance: 'default',
        prefixIcon: 'Info',
      },
    },
  ],
  list: [
    {
      link: {
        type: 'custom',
        label: 'Enterprise Solutions',
        url: '#',
        prefixIcon: 'Building',
        suffixIcon: 'ChevronRight',
        description: 'Scalable solutions for large organizations',
        appearance: 'ghost',
      },
      description: '',
    },
    {
      link: {
        type: 'custom',
        label: 'Small Business Tools',
        url: '#',
        prefixIcon: 'Store',
        suffixIcon: 'ChevronRight',
        description: 'Affordable options for growing businesses',
        appearance: 'ghost',
      },
      description: '',
    },
    {
      link: {
        type: 'custom',
        label: 'Developer Resources',
        url: '#',
        prefixIcon: 'Code',
        suffixIcon: 'ChevronRight',
        description: 'APIs and SDKs for custom integrations',
        appearance: 'ghost',
      },
      description: '',
    },
    {
      link: {
        type: 'custom',
        label: 'Support & Training',
        url: '#',
        prefixIcon: 'LifeBuoy',
        suffixIcon: 'ChevronRight',
        description: '24/7 support and comprehensive training materials',
        appearance: 'ghost',
      },
      description: '',
    },
  ],
}

export const Default: Story = {
  args: defaultCTA,
}

export const WithoutSubtitle: Story = {
  args: {
    ...defaultCTA,
    subtitle: null,
  },
}

export const NoButtons: Story = {
  args: {
    ...defaultCTA,
    buttons: null,
  },
}

export const WithoutList: Story = {
  args: {
    ...defaultCTA,
    list: null,
  },
}

// Define a minimal version with just the required fields
const minimalCTA: CTA3Fields = {
  title: 'Ready to get started?',
  buttons: [
    {
      link: {
        type: 'custom',
        label: 'Contact Us',
        url: '#',
        appearance: 'default',
        suffixIcon: 'ArrowRight',
      },
    },
  ],
  list: null,
}

export const MinimalContent: Story = {
  args: minimalCTA,
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
