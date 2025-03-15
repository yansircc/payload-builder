import type { Meta, StoryObj } from '@storybook/react'
import { MenuIcon } from 'lucide-react'
import { Header5Fields } from '@/payload-types'
import Component from './Component'

// Mock data for the header
const mockHeaderData: Header5Fields = {
  header: {
    logo: {
      id: '1',
      filename: 'block-1.svg',
      mimeType: 'image/svg+xml',
      filesize: 1000,
      width: 32,
      height: 32,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      url: '/blocks/block-1.svg',
      alt: 'Company Logo',
    },
    title: 'Company Name',
    menu: [
      {
        id: 'menu1',
        parentLink: {
          label: 'Products',
          url: '/products',
        },
        subMenus: [
          {
            id: 'sub1',
            link: {
              label: 'Enterprise Solutions',
              url: '/enterprise',
            },
            description: 'Advanced features for large organizations',
          },
          {
            id: 'sub2',
            link: {
              label: 'Small Business',
              url: '/small-business',
            },
            description: 'Perfect for growing teams',
          },
          {
            id: 'sub3',
            link: {
              label: 'Personal Use',
              url: '/personal',
            },
            description: 'For individual creators',
          },
          {
            id: 'sub4',
            link: {
              label: 'Integrations',
              url: '/integrations',
            },
            description: 'Connect with your tools',
          },
        ],
      },
      {
        id: 'menu2',
        parentLink: {
          label: 'Solutions',
          url: '/solutions',
        },
        subMenus: [
          {
            id: 'sol1',
            link: {
              label: 'Healthcare',
              url: '/healthcare',
            },
            description: 'Solutions for healthcare providers',
          },
          {
            id: 'sol2',
            link: {
              label: 'Finance',
              url: '/finance',
            },
            description: 'Financial service solutions',
          },
        ],
      },
      {
        id: 'menu3',
        parentLink: {
          label: 'Resources',
          url: '/resources',
        },
      },
    ],
    rightSideLinks: [
      {
        link: {
          type: 'custom',
          label: 'Log in',
          url: '/login',
          appearance: 'outline',
        },
        id: 'login',
      },
      {
        link: {
          type: 'custom',
          label: 'Sign up',
          url: '/signup',
          appearance: 'default',
        },
        id: 'signup',
      },
    ],
  },
}

// Create a simplified version with fewer menu items
const simpleHeaderData: Header5Fields = {
  header: {
    logo: mockHeaderData.header.logo,
    title: 'Simple Company',
    menu: [
      {
        id: 'menu1',
        parentLink: {
          label: 'Home',
          url: '/',
        },
      },
      {
        id: 'menu2',
        parentLink: {
          label: 'About',
          url: '/about',
        },
      },
      {
        id: 'menu3',
        parentLink: {
          label: 'Contact',
          url: '/contact',
        },
      },
    ],
    rightSideLinks: [
      {
        link: {
          type: 'custom',
          label: 'Contact Us',
          url: '/contact',
          appearance: 'default',
        },
        id: 'contact',
      },
    ],
  },
}

const meta: Meta<typeof Component> = {
  title: 'Globals/Header/Header5',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: mockHeaderData,
}

export const Simple: Story = {
  args: simpleHeaderData,
}

export const NoLogo: Story = {
  args: {
    header: {
      logo: {
        id: 'empty',
        filename: '',
        mimeType: '',
        filesize: 0,
        width: 0,
        height: 0,
        createdAt: '',
        updatedAt: '',
        url: '',
        alt: '',
      },
      title: mockHeaderData.header.title,
      menu: mockHeaderData.header.menu,
      rightSideLinks: mockHeaderData.header.rightSideLinks,
    },
  },
}

export const NoRightLinks: Story = {
  args: {
    header: {
      ...mockHeaderData.header,
      rightSideLinks: [],
    },
  },
}

export const NoMenu: Story = {
  args: {
    header: {
      ...mockHeaderData.header,
      menu: [],
    },
  },
}
