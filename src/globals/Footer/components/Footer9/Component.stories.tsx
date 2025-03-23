import type { Meta, StoryObj } from '@storybook/react'
import type { Footer9Fields } from '@/payload-types'
import Footer9 from './Component'

const meta: Meta<typeof Footer9> = {
  title: 'Globals/Footer/Footer9',
  component: Footer9,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Footer9>

const defaultFooter: Footer9Fields['footer'] = {
  title: 'Start your free trial today',
  subtitle: 'No credit card required. Cancel anytime.',
  copyright: '© 2024 Your Company. All rights reserved.',
  links: [
    {
      link: {
        type: 'custom',
        label: 'Get Started',
        url: '/signup',
        appearance: 'default',
      },
    },
    {
      link: {
        type: 'custom',
        label: 'Learn More',
        url: '/features',
        appearance: 'outline',
      },
    },
  ],
  leftLinks: {
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
    ],
  },
  socialLinks: {
    title: 'Follow us on',
    links: [
      {
        link: {
          type: 'custom',
          label: 'Twitter',
          url: 'https://twitter.com',
          prefixIcon: 'Twitter',
          appearance: 'link',
        },
      },
      {
        link: {
          type: 'custom',
          label: 'Facebook',
          url: 'https://facebook.com',
          prefixIcon: 'Facebook',
          appearance: 'link',
        },
      },
      {
        link: {
          type: 'custom',
          label: 'LinkedIn',
          url: 'https://linkedin.com',
          prefixIcon: 'Linkedin',
          appearance: 'link',
        },
      },
      {
        link: {
          type: 'custom',
          label: 'Instagram',
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

export const WithoutLeftLinks: Story = {
  args: {
    footer: {
      ...defaultFooter,
      leftLinks: {
        links: [],
      },
    },
  },
}

export const ShortSubtitle: Story = {
  args: {
    footer: {
      ...defaultFooter,
      subtitle: 'Get started today.',
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

export const SingleActionButton: Story = {
  args: {
    footer: {
      ...defaultFooter,
      links: defaultFooter.links?.slice(0, 1),
    },
  },
}

export const WithoutActionButtons: Story = {
  args: {
    footer: {
      ...defaultFooter,
      links: [],
    },
  },
}
