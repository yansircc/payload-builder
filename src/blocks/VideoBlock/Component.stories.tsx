import type { Meta, StoryObj } from '@storybook/react'
import { VideoBlock } from './RenderVideo'

const meta: Meta<typeof VideoBlock> = {
  title: 'blocks/VideoBlock',
  component: VideoBlock,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof VideoBlock>

export const YouTubeVideo: Story = {
  args: {
    videoType: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    caption: 'Sample YouTube Video',
    thumbnail: {
      id: 'thumbnail-1',
      alt: 'Video Thumbnail',
      url: '/website-template-OG.webp',
      width: 1280,
      height: 720,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
}

export const WithoutThumbnail: Story = {
  args: {
    videoType: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    caption: 'Video without thumbnail',
  },
}

export const WithoutCaption: Story = {
  args: {
    videoType: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: {
      id: 'thumbnail-1',
      alt: 'Video Thumbnail',
      url: '/website-template-OG.webp',
      width: 1280,
      height: 720,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
}

export const CustomClassName: Story = {
  args: {
    videoType: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    caption: 'Custom styled video',
    className: 'max-w-2xl mx-auto',
  },
}
