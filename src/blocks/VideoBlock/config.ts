import { Block } from 'payload'

interface BlockData {
  videoType?: string
}

export const VideoBlock: Block = {
  slug: 'video',
  interfaceName: 'VideoBlock',
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  fields: [
    {
      name: 'videoType',
      type: 'select',
      label: 'Video Type',
      required: true,
      defaultValue: 'youtube',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
      ],
      admin: {
        description: 'Select the video source.',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Enter video URL (YouTube or Vimeo)',
        description: 'Ensure the URL is valid for the selected video type.',
      },
      validate: (
        value: string | string[] | null | undefined,
        { siblingData }: { siblingData?: BlockData },
      ) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          return 'Video URL is required'
        }

        const input = Array.isArray(value) ? value[0] : value

        if (typeof input !== 'string') {
          return 'Invalid URL format'
        }

        const normalizedUrl = input.trim().toLowerCase()

        try {
          new URL(normalizedUrl)
        } catch (e) {
          return 'Invalid URL format'
        }

        const urlObj = new URL(normalizedUrl)
        const hostname = urlObj.hostname

        const videoType = siblingData?.videoType

        if (videoType === 'youtube') {
          const youtubePattern = /^(.*\.)?(youtube\.com|youtu\.be)$/
          if (!youtubePattern.test(hostname)) {
            return 'YouTube URL must contain youtube.com or youtu.be'
          }
        } else if (videoType === 'vimeo') {
          const vimeoPattern = /^(.*\.)?vimeo\.com$/
          if (!vimeoPattern.test(hostname)) {
            return 'Vimeo URL must contain vimeo.com'
          }
        } else {
          return 'Please select video type first'
        }

        return true
      },
    },
    {
      name: 'caption',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional: Add a description or caption for the video.',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Optional: Upload a custom thumbnail for the video.',
      },
    },
  ],
}
