import { Block } from 'payload'

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
        { label: 'Self-Hosted', value: 'self-hosted' },
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
        placeholder: 'Enter video URL (YouTube, Vimeo, or other sources)',
        description: 'Ensure the URL is valid for the selected video type.',
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
