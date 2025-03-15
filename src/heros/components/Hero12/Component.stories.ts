import type { Meta, StoryObj } from '@storybook/react'
import type { Hero12Fields } from '@/payload-types'
import Hero12 from './Component'

const meta = {
  title: 'Sections/Hero/Hero12',
  component: Hero12,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Hero12>

export default meta
type Story = StoryObj<typeof Hero12>

const defaultArgs: Hero12Fields = {
  title: 'Build Modern Applications with Our Platform',
  subtitle:
    'Powerful tools and frameworks to help developers create exceptional digital experiences',
  logo: {
    id: 'company-logo',
    alt: 'Company Logo',
    width: 200,
    height: 60,
    url: '/website-template-OG.webp',
    updatedAt: '2024-03-20T00:00:00.000Z',
    createdAt: '2024-03-20T00:00:00.000Z',
  },
  badge: 'New Release v2.0',
  links: [
    {
      link: {
        type: 'custom',
        label: 'Get Started',
        url: '#',
        appearance: 'default',
      },
    },
    {
      link: {
        type: 'custom',
        label: 'Documentation',
        url: '#',
        appearance: 'outline',
        suffixIcon: 'ExternalLink',
      },
    },
  ],
  partners: [
    {
      logo: {
        id: 'partner-1',
        alt: 'Partner Logo 1',
        width: 120,
        height: 40,
        url: '/website-template-OG.webp',
        updatedAt: '2024-03-20T00:00:00.000Z',
        createdAt: '2024-03-20T00:00:00.000Z',
      },
    },
    {
      logo: {
        id: 'partner-2',
        alt: 'Partner Logo 2',
        width: 120,
        height: 40,
        url: '/website-template-OG.webp',
        updatedAt: '2024-03-20T00:00:00.000Z',
        createdAt: '2024-03-20T00:00:00.000Z',
      },
    },
    {
      logo: {
        id: 'partner-3',
        alt: 'Partner Logo 3',
        width: 120,
        height: 40,
        url: '/website-template-OG.webp',
        updatedAt: '2024-03-20T00:00:00.000Z',
        createdAt: '2024-03-20T00:00:00.000Z',
      },
    },
    {
      logo: {
        id: 'partner-4',
        alt: 'Partner Logo 4',
        width: 120,
        height: 40,
        url: '/website-template-OG.webp',
        updatedAt: '2024-03-20T00:00:00.000Z',
        createdAt: '2024-03-20T00:00:00.000Z',
      },
    },
  ],
}

export const Default: Story = {
  args: defaultArgs,
}

export const WithoutSubtitle: Story = {
  args: {
    ...defaultArgs,
    subtitle: null,
  },
}

export const WithoutBadge: Story = {
  args: {
    ...defaultArgs,
    badge: null,
  },
}

export const SingleButton: Story = {
  args: {
    ...defaultArgs,
    links: [
      {
        link: {
          type: 'custom',
          label: 'Get Started',
          url: '#',
          appearance: 'default',
        },
      },
    ],
  },
}

export const FewerPartners: Story = {
  args: {
    ...defaultArgs,
    partners: [
      {
        logo: {
          id: 'partner-1',
          alt: 'Partner Logo 1',
          width: 120,
          height: 40,
          url: '/website-template-OG.webp',
          updatedAt: '2024-03-20T00:00:00.000Z',
          createdAt: '2024-03-20T00:00:00.000Z',
        },
      },
      {
        logo: {
          id: 'partner-2',
          alt: 'Partner Logo 2',
          width: 120,
          height: 40,
          url: '/website-template-OG.webp',
          updatedAt: '2024-03-20T00:00:00.000Z',
          createdAt: '2024-03-20T00:00:00.000Z',
        },
      },
    ],
  },
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: defaultArgs,
}

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: defaultArgs,
}

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: defaultArgs,
}
