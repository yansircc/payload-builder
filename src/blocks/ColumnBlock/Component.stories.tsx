import type { Meta, StoryObj } from '@storybook/react'
import type { Media } from 'src/payload-types'
import { ColumnsBlock } from './Component'

const meta: Meta<typeof ColumnsBlock> = {
  title: 'blocks/Columns',
  component: ColumnsBlock,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
    docs: {
      description: {
        component: `
# ColumnsBlock

The ColumnsBlock component is a flexible layout component that allows content to be organized into columns with various width ratios.

## Features

- Supports multiple column layout options (50-50, 33-67, 67-33, 25-75, 75-25)
- Responsive design - columns stack on mobile devices
- Supports various content types within columns:
  - Text content with rich text formatting
  - Images with optional captions
  - Videos (YouTube embeds or direct video files)
- Customizable with className prop for additional styling

## Usage

\`\`\`tsx
import { ColumnsBlock } from '@/blocks/ColumnBlock/RenderColumn'

// Example usage
<ColumnsBlock
  layout="50-50"
  columns={[
    {
      content: [
        // Text content
        {
          blockType: 'text',
          content: { /* rich text content */ }
        },
        // Image content
        {
          blockType: 'image',
          image: { /* image data */ }
        }
      ]
    },
    {
      content: [
        // Video content
        {
          blockType: 'video',
          url: 'https://www.youtube.com/watch?v=example'
        }
      ]
    }
  ]}
  className="custom-class"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['50-50', '33-67', '67-33', '25-75', '75-25'],
      description: 'The layout ratio between columns',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '50-50' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the container',
      table: {
        type: { summary: 'string' },
      },
    },
    columns: {
      control: 'object',
      description: 'Array of column objects, each containing content items',
      table: {
        type: { summary: 'array' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ColumnsBlock>

// Mock text content for reuse
const mockTextContent = {
  blockType: 'text' as const,
  content: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
              type: 'text',
              version: 1,
            },
          ],
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: 'left' as const,
      indent: 0,
      version: 1,
    },
  },
}

// Mock image content for reuse
const mockImageContent = {
  blockType: 'image' as const,
  image: {
    id: 'mock-image-1',
    alt: 'Sample Image',
    url: '/website-template-OG.webp',
    width: 1200,
    height: 800,
    filename: 'website-template-OG.webp',
    mimeType: 'image/webp',
    filesize: 100000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as Media,
}

// Mock video content for reuse
const mockVideoContent = {
  blockType: 'video' as const,
  url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
}

export const Layout5050: Story = {
  name: 'Layout 50-50',
  args: {
    layout: '50-50',
    columns: [
      {
        content: [mockTextContent, mockImageContent],
      },
      {
        content: [mockImageContent, mockTextContent],
      },
    ],
    className: 'max-w-7xl mx-auto p-6',
  },
}

export const Layout3367: Story = {
  name: 'Layout 33-67',
  args: {
    layout: '33-67',
    columns: [
      {
        content: [mockTextContent],
      },
      {
        content: [mockImageContent, mockTextContent],
      },
    ],
    className: 'max-w-7xl mx-auto p-6',
  },
}

export const Layout6733: Story = {
  name: 'Layout 67-33',
  args: {
    layout: '67-33',
    columns: [
      {
        content: [mockImageContent, mockTextContent],
      },
      {
        content: [mockTextContent],
      },
    ],
    className: 'max-w-7xl mx-auto p-6',
  },
}

export const Layout2575: Story = {
  name: 'Layout 25-75',
  args: {
    layout: '25-75',
    columns: [
      {
        content: [mockTextContent],
      },
      {
        content: [mockVideoContent, mockTextContent],
      },
    ],
    className: 'max-w-7xl mx-auto p-6',
  },
}

export const Layout7525: Story = {
  name: 'Layout 75-25',
  args: {
    layout: '75-25',
    columns: [
      {
        content: [mockVideoContent, mockTextContent],
      },
      {
        content: [mockTextContent],
      },
    ],
    className: 'max-w-7xl mx-auto p-6',
  },
}
