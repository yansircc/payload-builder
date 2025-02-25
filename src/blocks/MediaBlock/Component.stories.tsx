import type { Meta, StoryObj } from '@storybook/react'
import { MediaBlock } from './Component'

const meta: Meta<typeof MediaBlock> = {
  title: 'blocks/MediaBlock',
  component: MediaBlock,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof MediaBlock>

export const FullWidthImage: Story = {
  args: {
    media: {
      id: 'image-2',
      alt: 'Urban Architecture',
      url: '/website-template-OG.webp',
      width: 2400,
      height: 1600,
      filename: 'website-template-OG.webp',
      mimeType: 'image/webp',
      filesize: 100000,
      caption: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Full-width image that spans across the entire container width.',
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    className: 'w-full',
    enableGutter: false,
  },
}

export const WithoutCaption: Story = {
  args: {
    media: {
      id: 'image-3',
      alt: 'Abstract Art',
      url: '/website-template-OG.webp',
      width: 1600,
      height: 1067,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    className: 'max-w-2xl',
    enableGutter: true,
  },
}

export const CustomStyle: Story = {
  args: {
    media: {
      id: 'image-4',
      alt: 'Nature Close-up',
      url: '/website-template-OG.webp',
      width: 1920,
      height: 1280,
      filename: 'website-template-OG.webp',
      mimeType: 'image/webp',
      filesize: 100000,
      caption: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Delicate details of nature captured in perfect clarity.',
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    className: 'max-w-3xl',
    enableGutter: true,
    imgClassName: 'shadow-lg hover:shadow-xl transition-shadow duration-300',
    captionClassName: 'text-center italic',
  },
}
