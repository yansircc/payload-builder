import type { Meta, StoryObj } from '@storybook/react'
import { Header3Fields } from '@/payload-types'
import Component from './Component'

// Mock data for the header
const mockHeaderData: Header3Fields = {
  header: {
    logo: {
      id: '1',
      filename: 'logo-dark.png',
      mimeType: 'image/png',
      filesize: 1000,
      width: 125,
      height: 40,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      url: '/logo-dark.png',
      alt: 'Company Logo',
    },
    rightLinks: [
      {
        id: 'link1',
        link: {
          type: 'custom',
          label: 'Sign In',
          url: '/sign-in',
          appearance: 'outline',
        },
      },
      {
        id: 'link2',
        link: {
          type: 'custom',
          label: 'Get Started',
          url: '/get-started',
          appearance: 'default',
        },
      },
    ],
  },
  menu: [
    {
      id: 'menu1',
      parentMenu: {
        type: 'custom',
        label: 'Products',
        url: '/products',
      },
      submenu: {
        style: 'style-1',
        style1Config: {
          leftSection: {
            link: {
              title: 'Featured Product',
              description: 'Our most popular product with advanced features',
              url: '/featured-product',
              image: {
                id: '2',
                filename: 'featured.jpg',
                mimeType: 'image/jpeg',
                filesize: 5000,
                width: 398,
                height: 190,
                createdAt: '2023-01-01',
                updatedAt: '2023-01-01',
                url: '/blocks/block-1.svg',
                alt: 'Featured Product',
              },
            },
          },
          rightSection: {
            title: 'PRODUCT CATEGORIES',
            links: [
              {
                id: 'cat1',
                link: {
                  title: 'Enterprise Solutions',
                  description: 'For large organizations and teams',
                  url: '/enterprise',
                  prefixIcon: 'Building',
                },
              },
              {
                id: 'cat2',
                link: {
                  title: 'Small Business',
                  description: 'Perfect for startups and small teams',
                  url: '/small-business',
                  prefixIcon: 'Store',
                },
              },
              {
                id: 'cat3',
                link: {
                  title: 'Personal Use',
                  description: 'For individual creators and freelancers',
                  url: '/personal',
                  prefixIcon: 'User',
                },
              },
              {
                id: 'cat4',
                link: {
                  title: 'Integrations',
                  description: 'Connect with your favorite tools',
                  url: '/integrations',
                  prefixIcon: 'Puzzle',
                },
              },
            ],
          },
        },
      },
    },
    {
      id: 'menu2',
      parentMenu: {
        type: 'custom',
        label: 'Solutions',
        url: '/solutions',
      },
      submenu: {
        style: 'style-2',
        style2Config: {
          leftSection: {
            title: 'SOLUTIONS BY INDUSTRY',
            links: [
              {
                id: 'sol1',
                link: {
                  label: 'Healthcare',
                  url: '/healthcare',
                },
              },
              {
                id: 'sol2',
                link: {
                  label: 'Finance',
                  url: '/finance',
                },
              },
              {
                id: 'sol3',
                link: {
                  label: 'Education',
                  url: '/education',
                },
              },
              {
                id: 'sol4',
                link: {
                  label: 'E-commerce',
                  url: '/ecommerce',
                },
              },
            ],
          },
          rightSection: {
            link: {
              subtitle: 'FEATURED SOLUTION',
              title: 'Industry-Leading Platform',
              description: 'Discover how our platform can transform your business',
              url: '/platform',
              image: {
                id: '3',
                filename: 'blocks-2.svg',
                mimeType: 'image/svg+xml',
                filesize: 5000,
                width: 400,
                height: 200,
                createdAt: '2023-01-01',
                updatedAt: '2023-01-01',
                url: '/blocks/block-2.svg',
                alt: 'Featured Solution',
              },
            },
          },
        },
      },
    },
    {
      id: 'menu3',
      parentMenu: {
        type: 'custom',
        label: 'Resources',
        url: '/resources',
      },
      submenu: {
        style: 'style-3',
        style3Config: {
          leftSection: {
            title: 'Resources Hub',
            description: 'Everything you need to get the most out of our platform',
            links: [
              {
                id: 'res1',
                link: {
                  label: 'Documentation',
                  url: '/docs',
                },
              },
              {
                id: 'res2',
                link: {
                  label: 'Tutorials',
                  url: '/tutorials',
                },
              },
              {
                id: 'res3',
                link: {
                  label: 'Blog',
                  url: '/blog',
                },
              },
              {
                id: 'res4',
                link: {
                  label: 'Community Forum',
                  url: '/forum',
                },
              },
            ],
          },
        },
      },
    },
    {
      id: 'menu4',
      parentMenu: {
        type: 'custom',
        label: 'Pricing',
        url: '/pricing',
      },
    },
    {
      id: 'menu5',
      parentMenu: {
        type: 'custom',
        label: 'About',
        url: '/about',
      },
      submenu: {
        style: 'style-4',
        style4Config: {
          leftSection: {
            title: 'ABOUT US',
            links: [
              {
                id: 'about1',
                link: {
                  title: 'Our Story',
                  description: 'Learn about our mission and values',
                  url: '/our-story',
                },
              },
              {
                id: 'about2',
                link: {
                  title: 'Team',
                  description: 'Meet the people behind our company',
                  url: '/team',
                },
              },
              {
                id: 'about3',
                link: {
                  title: 'Careers',
                  description: 'Join our growing team',
                  url: '/careers',
                },
              },
            ],
          },
          rightSection: {
            title: 'FEATURED',
            links: [
              {
                id: 'feat1',
                link: {
                  title: 'Press Kit',
                  description: 'Resources for media and partners',
                  url: '/press',
                  image: {
                    id: '4',
                    filename: 'blocks-3.svg',
                    mimeType: 'image/svg+xml',
                    filesize: 5000,
                    width: 400,
                    height: 200,
                    createdAt: '2023-01-01',
                    updatedAt: '2023-01-01',
                    url: '/blocks/block-3.svg',
                    alt: 'Press Kit',
                  },
                },
              },
            ],
          },
        },
      },
    },
  ],
}

// Create a simplified version with fewer menu items for the "Simple" story
const simpleHeaderData: Header3Fields = {
  header: {
    logo: mockHeaderData.header.logo,
    rightLinks: [
      {
        id: 'link1',
        link: {
          type: 'custom',
          label: 'Contact',
          url: '/contact',
          appearance: 'default',
        },
      },
    ],
  },
  menu: [
    {
      id: 'menu1',
      parentMenu: {
        type: 'custom',
        label: 'Home',
        url: '/',
      },
    },
    {
      id: 'menu2',
      parentMenu: {
        type: 'custom',
        label: 'Products',
        url: '/products',
      },
    },
    {
      id: 'menu3',
      parentMenu: {
        type: 'custom',
        label: 'About',
        url: '/about',
      },
    },
  ],
}

const meta: Meta<typeof Component> = {
  title: 'Globals/Header/Header3',
  component: Component,
  parameters: {
    layout: 'fullscreen',
    // Mock the DynamicIcon component for Storybook
    mockData: {
      '@/components/DynamicIcon': {
        DynamicIcon: ({ name, className }: { name: string; className?: string }) => (
          <div className={className}>Icon: {name}</div>
        ),
      },
    },
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
  args: {
    header: mockHeaderData.header,
    menu: mockHeaderData.menu,
  },
}

export const Simple: Story = {
  args: {
    header: simpleHeaderData.header,
    menu: simpleHeaderData.menu,
  },
}

export const NoRightLinks: Story = {
  args: {
    header: {
      logo: mockHeaderData.header.logo,
    },
    menu: mockHeaderData.menu,
  },
}

export const NoMenu: Story = {
  args: {
    header: mockHeaderData.header,
    menu: [],
  },
}
