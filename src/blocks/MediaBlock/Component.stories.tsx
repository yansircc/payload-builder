import type { Meta, StoryObj } from '@storybook/react'
import { MediaBlock } from './Component'

const meta: Meta<typeof MediaBlock> = {
  title: 'blocks/MediaBlock',
  component: MediaBlock,
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

type Story = StoryObj<typeof MediaBlock>

export const HeroImage: Story = {
  args: {
    media: {
      id: 'hero-1',
      alt: 'Modern Architecture',
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
                  text: 'Stunning modern architecture captured in perfect light, showcasing the beauty of contemporary design.',
                  type: 'text',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: 'center',
          indent: 0,
          version: 1,
        },
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    className: 'w-full max-w-7xl mx-auto',
    imgClassName: 'rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300',
    captionClassName: 'text-center text-lg italic mt-6 text-muted-foreground',
  },
}

export const ArtisticPortrait: Story = {
  args: {
    media: {
      id: 'art-1',
      alt: 'Artistic Portrait',
      url: '/website-template-OG.webp',
      width: 1600,
      height: 2400,
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
                  text: 'A moment frozen in time, where light and shadow dance together.',
                  type: 'text',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: 'center',
          indent: 0,
          version: 1,
        },
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    className: 'max-w-2xl mx-auto',
    imgClassName: 'rounded-3xl shadow-lg hover:scale-[1.02] transition-all duration-500',
    captionClassName: 'text-center text-sm font-medium mt-4',
  },
}

export const MinimalistGallery: Story = {
  args: {
    media: {
      id: 'gallery-1',
      alt: 'Minimalist Design',
      url: '/website-template-OG.webp',
      width: 1920,
      height: 1080,
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
                  text: 'Less is more: The beauty of minimalist design in modern spaces.',
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
    className: 'max-w-4xl mx-auto p-6 bg-card rounded-[2rem] shadow-xl',
    imgClassName:
      'rounded-xl ring-1 ring-border/10 hover:ring-primary/20 transition-all duration-300',
    captionClassName:
      'text-center font-serif text-base mt-6 bg-background/90 px-6 py-4 rounded-xl text-foreground',
  },
}

export const FullBleed: Story = {
  args: {
    media: {
      id: 'bleed-1',
      alt: 'Landscape Photography',
      url: '/website-template-OG.webp',
      width: 2400,
      height: 1350,
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
                  text: 'Capturing the essence of natural beauty in its purest form',
                  type: 'text',
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: 'center',
          indent: 0,
          version: 1,
        },
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    className: 'w-full',
    imgClassName: 'hover:opacity-90 transition-opacity duration-300',
    captionClassName:
      'text-center font-serif text-xl tracking-wide mt-8 text-muted-foreground/80 font-light',
    enableGutter: false,
  },
}
