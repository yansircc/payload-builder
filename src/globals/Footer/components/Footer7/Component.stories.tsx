import type { Meta, StoryObj } from '@storybook/react'
import type { Footer7Fields } from '@/payload-types'
import Footer7 from './Component'

const meta: Meta<typeof Footer7> = {
  title: 'Globals/Footer/Footer7',
  component: Footer7,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Footer7>

const defaultFooter: Footer7Fields['footer'] = {
  title: 'Company Name',
  subtitle:
    'Building the future together. We provide innovative solutions for modern businesses and help them achieve their goals.',
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
    links: [
      {
        link: {
          type: 'custom',
          label: 'Privacy Policy',
          url: '/privacy',
          appearance: 'link',
        },
      },
      {
        link: {
          type: 'custom',
          label: 'Terms of Service',
          url: '/terms',
          appearance: 'link',
        },
      },
      {
        link: {
          type: 'custom',
          label: 'Cookie Policy',
          url: '/cookies',
          appearance: 'link',
        },
      },
    ],
  },
  socialLinks: {
    links: [
      {
        link: {
          type: 'custom',
          url: 'https://twitter.com',
          prefixIcon: 'Twitter',
          appearance: 'link',
        },
      },
      {
        link: {
          type: 'custom',
          url: 'https://facebook.com',
          prefixIcon: 'Facebook',
          appearance: 'link',
        },
      },
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
          url: 'https://instagram.com',
          prefixIcon: 'Instagram',
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
        {
          link: {
            type: 'custom',
            label: 'Solutions',
            url: '/solutions',
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
        {
          link: {
            type: 'custom',
            label: 'Guides',
            url: '/guides',
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
        {
          link: {
            type: 'custom',
            label: 'Careers',
            url: '/careers',
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

export const WithoutRightLinks: Story = {
  args: {
    footer: {
      ...defaultFooter,
      rightLinks: {
        links: [],
      },
    },
  },
}

export const WithoutSocialLinks: Story = {
  args: {
    footer: {
      ...defaultFooter,
      socialLinks: {
        links: [],
      },
    },
  },
}

export const ShortSubtitle: Story = {
  args: {
    footer: {
      ...defaultFooter,
      subtitle: 'Building the future together.',
    },
  },
}

export const WithoutSubtitle: Story = {
  args: {
    footer: {
      ...defaultFooter,
      subtitle: '',
    },
  },
}
