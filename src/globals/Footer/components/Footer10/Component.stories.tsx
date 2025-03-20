import type { Meta, StoryObj } from '@storybook/react'
import type { Footer10Fields } from '@/payload-types'
import Footer10 from './Component'

const meta: Meta<typeof Footer10> = {
  title: 'Globals/Footer/Footer10',
  component: Footer10,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Footer10>

const defaultFooter: Footer10Fields['footer'] = {
  logo: {
    id: 'logo-1',
    alt: 'Company Logo',
    url: '/logo-dark.png',
    width: 1370,
    height: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  bottomText: {
    copyright: '© 2024 Your Company. All rights reserved.',
    description: 'Made with ❤️ by the team at Your Company',
  },
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

export const WithoutCopyright: Story = {
  args: {
    footer: {
      ...defaultFooter,
      bottomText: {
        ...defaultFooter.bottomText,
        copyright: '',
      },
    },
  },
}

export const WithoutDescription: Story = {
  args: {
    footer: {
      ...defaultFooter,
      bottomText: {
        ...defaultFooter.bottomText,
        description: '',
      },
    },
  },
}
