import type { Meta, StoryObj } from '@storybook/react'
import type { Footer1Fields } from '@/payload-types'
import Footer1 from './Component'

const meta: Meta<typeof Footer1> = {
  title: 'Globals/Footer/Footer1',
  component: Footer1,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Footer1>

const defaultFooter: Footer1Fields['footer'] = {
  logo: {
    id: 'logo-1',
    alt: 'Company Logo',
    url: '/logo-dark.png',
    width: 150,
    height: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  rightLinks: {
    title: 'Follow us on',
    links: [
      {
        link: {
          type: 'custom',
          url: 'https://linkedin.com',
          prefixIcon: 'Linkedin',
          appearance: 'link',
        },
      },
      {
        link: {
          type: 'custom',
          url: 'https://twitter.com',
          prefixIcon: 'Twitter',
          appearance: 'link',
        },
      },
    ],
  },
  sections: [
    {
      title: 'Products',
      links: [
        {
          link: {
            type: 'custom',
            label: 'Features',
            url: '/features',
            appearance: 'link',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Pricing',
            url: '/pricing',
            appearance: 'link',
          },
        },
      ],
    },
    {
      title: 'Resources',
      links: [
        {
          link: {
            type: 'custom',
            label: 'Documentation',
            url: '/docs',
            appearance: 'link',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Blog',
            url: '/blog',
            appearance: 'link',
          },
        },
      ],
    },
    {
      title: 'Company',
      links: [
        {
          link: {
            type: 'custom',
            label: 'About',
            url: '/about',
            appearance: 'link',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Contact',
            url: '/contact',
            appearance: 'link',
          },
        },
      ],
    },
    {
      title: 'Legal',
      links: [
        {
          link: {
            type: 'custom',
            label: 'Privacy',
            url: '/privacy',
            appearance: 'link',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Terms',
            url: '/terms',
            appearance: 'link',
          },
        },
      ],
    },
  ],
  copyright: '© 2024 Your Company. All rights reserved.',
}

export const Default: Story = {
  args: {
    footer: defaultFooter,
  },
}

export const WithoutLogo: Story = {
  args: {
    footer: {
      ...defaultFooter,
      logo: '',
    },
  },
}

export const MinimalSections: Story = {
  args: {
    footer: {
      ...defaultFooter,
      sections: defaultFooter.sections?.slice(0, 2),
    },
  },
}
