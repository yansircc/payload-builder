import type { Meta, StoryObj } from '@storybook/react'
import type { Header1Fields } from '@/payload-types'
import Header1 from './Component'

const meta: Meta<typeof Header1> = {
  title: 'Globals/Header/Header1',
  component: Header1,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Header1>

const defaultHeader: Header1Fields['header'] = {
  logo: {
    id: 'logo-1',
    alt: 'Company Logo',
    url: '/favicon.svg',
    width: 32,
    height: 32,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  title: 'Company Name',
  menu: [
    {
      id: '1',
      parentLink: {
        type: 'custom',
        label: 'Products',
        url: '/products',
        appearance: 'ghost',
      },
      subMenu: [
        {
          id: '1-1',
          link: {
            type: 'custom',
            label: 'Analytics',
            url: '/products/analytics',
            prefixIcon: 'BarChart',
          },
          description: 'Get a better understanding of your traffic',
        },
        {
          id: '1-2',
          link: {
            type: 'custom',
            label: 'Engagement',
            url: '/products/engagement',
            prefixIcon: 'Users',
          },
          description: 'Speak directly to your customers',
        },
        {
          id: '1-3',
          link: {
            type: 'custom',
            label: 'Security',
            url: '/products/security',
            prefixIcon: 'Shield',
          },
          description: "Your customers' data will be safe and secure",
        },
      ],
    },
    {
      id: '2',
      parentLink: {
        type: 'custom',
        label: 'Features',
        url: '/features',
        appearance: 'ghost',
      },
    },
    {
      id: '3',
      parentLink: {
        type: 'custom',
        label: 'Resources',
        url: '/resources',
        appearance: 'ghost',
      },
      subMenu: [
        {
          id: '3-1',
          link: {
            type: 'custom',
            label: 'Documentation',
            url: '/docs',
            prefixIcon: 'FileText',
          },
          description: 'Start integrating products and tools',
        },
        {
          id: '3-2',
          link: {
            type: 'custom',
            label: 'API Reference',
            url: '/api',
            prefixIcon: 'Code2',
          },
          description: 'Detailed API documentation and examples',
        },
      ],
    },
  ],
  rightSideLinks: [
    {
      link: {
        type: 'custom',
        label: 'Sign in',
        url: '/signin',
        appearance: 'ghost',
      },
    },
    {
      link: {
        type: 'custom',
        label: 'Get started',
        url: '/signup',
        appearance: 'default',
      },
    },
  ],
}

export const Default: Story = {
  args: {
    header: defaultHeader,
  },
}

export const WithoutLogo: Story = {
  args: {
    header: {
      ...defaultHeader,
      logo: '',
    },
  },
}

export const SimpleMenu: Story = {
  args: {
    header: {
      ...defaultHeader,
      menu: defaultHeader.menu?.filter((item) => !item.subMenu),
    },
  },
}

export const WithoutRightLinks: Story = {
  args: {
    header: {
      ...defaultHeader,
      rightSideLinks: [],
    },
  },
}
