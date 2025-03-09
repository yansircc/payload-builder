import type { Meta, StoryObj } from '@storybook/react'
import { CodeBlock } from './Component'
import type { CodeBlockProps } from './Component'

const meta = {
  title: 'Blocks/Code/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CodeBlock>

export default meta
type Story = StoryObj<typeof CodeBlock>

const defaultCode: CodeBlockProps = {
  blockType: 'code',
  code: `function helloWorld() {
  console.log('Hello, world!');
}`,
  language: 'javascript',
}

// ✅ Default variant
export const Default: Story = {
  args: defaultCode,
}

// ✅ With Python Code
export const PythonExample: Story = {
  args: {
    ...defaultCode,
    code: `def greet():
  print('Hello, world!')`,
    language: 'python',
  },
}

// ✅ Without Language Specified
export const WithoutLanguage: Story = {
  args: {
    ...defaultCode,
    language: '',
  },
}

// ✅ With HTML Code
export const HtmlExample: Story = {
  args: {
    ...defaultCode,
    code: `<div>Hello, world!</div>`,
    language: 'html',
  },
}

// ✅ Responsive Variants
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: defaultCode,
}

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: defaultCode,
}

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: defaultCode,
}
