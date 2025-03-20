import type { Meta, StoryObj } from '@storybook/react'
import type { Footer5Fields } from '@/payload-types'
import Footer5 from './Component'

const meta: Meta<typeof Footer5> = {
  title: 'Globals/Footer/Footer5',
  component: Footer5,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Footer5>

const defaultFooter: Footer5Fields['footer'] = {
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
        {
          link: {
            type: 'custom',
            label: 'Cookies',
            url: '/cookies',
            appearance: 'link',
          },
        },
      ],
    },
  ],
  socialLinks: {
    title: 'Follow us on',
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
  appLinks: {
    title: 'Download our app',
    links: [
      {
        link: {
          type: 'custom',
          url: 'https://apps.apple.com',
          prefixIcon: 'Apple',
          appearance: 'link',
        },
      },
      {
        link: {
          type: 'custom',
          url: 'https://play.google.com',
          prefixIcon: 'Android',
          appearance: 'link',
        },
      },
    ],
  },
  copyright: '© 2024 Your Company. All rights reserved.',
}

export const Default: Story = {
  args: {
    footer: defaultFooter,
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

export const WithoutSocialLinks: Story = {
  args: {
    footer: {
      ...defaultFooter,
      socialLinks: {
        title: '',
        links: [],
      },
    },
  },
}

export const WithoutAppLinks: Story = {
  args: {
    footer: {
      ...defaultFooter,
      appLinks: {
        title: '',
        links: [],
      },
    },
  },
}

export const WithoutSocialAndAppLinks: Story = {
  args: {
    footer: {
      ...defaultFooter,
      socialLinks: {
        title: '',
        links: [],
      },
      appLinks: {
        title: '',
        links: [],
      },
    },
  },
}
