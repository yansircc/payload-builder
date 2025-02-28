import type { Meta, StoryObj } from '@storybook/react'
import { BannerBlock } from './Component'

const meta: Meta<typeof BannerBlock> = {
  title: 'blocks/Banner',
  component: BannerBlock,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
  },
}

export default meta

type Story = StoryObj<typeof BannerBlock>

export const InfoBanner: Story = {
  args: {
    style: 'info',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Pro tip: You can customize your dashboard layout by dragging and dropping widgets.',
                type: 'text',
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'left',
        indent: 0,
        version: 1,
      },
    },
    className: 'max-w-2xl',
  },
}

export const SuccessBanner: Story = {
  args: {
    style: 'success',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Great job! Your changes have been successfully saved and deployed.',
                type: 'text',
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'left',
        indent: 0,
        version: 1,
      },
    },
    className: 'max-w-2xl',
  },
}

export const WarningBanner: Story = {
  args: {
    style: 'warning',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Warning: Your session will expire in 5 minutes. Please save your work to avoid data loss.',
                type: 'text',
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'left',
        indent: 0,
        version: 1,
      },
    },
    className: 'max-w-2xl',
  },
}
export const ErrorBanner: Story = {
  args: {
    style: 'error',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: ' Unable to connect to the server. Please check your internet connection and try again.',
                type: 'text',
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'left',
        indent: 0,
        version: 1,
      },
    },
    className: 'max-w-2xl',
  },
}

export const RichContentBanner: Story = {
  args: {
    style: 'info',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Welcome to our new platform! ',
                type: 'text',
                version: 1,
              },
              {
                text: 'Check out our getting started guide',
                type: 'text',
                bold: true,
                version: 1,
              },
              {
                text: ' to make the most of your experience.',
                type: 'text',
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        direction: 'ltr',
        format: 'left',
        indent: 0,
        version: 1,
      },
    },
    className: 'max-w-2xl',
  },
}
