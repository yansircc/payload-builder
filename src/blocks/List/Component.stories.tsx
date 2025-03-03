import type { Meta, StoryObj } from '@storybook/react'
import { ListBlock } from './RenderList'

const meta: Meta<typeof ListBlock> = {
  title: 'Blocks/List',
  component: ListBlock,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof ListBlock>

export const OrderedList: Story = {
  args: {
    blockType: 'list',
    type: 'ordered',
    items: [
      { text: 'First step: Plan your project' },
      { text: 'Second step: Design the architecture' },
      { text: 'Third step: Implement core features' },
      { text: 'Fourth step: Test and validate' },
      { text: 'Fifth step: Deploy to production' },
    ],
  },
}

export const UnorderedList: Story = {
  args: {
    blockType: 'list',
    type: 'unordered',
    items: [
      { text: '🛠️ Powerful development tools' },
      { text: '📱 Responsive design principles' },
      { text: '🚀 Performance optimization' },
      { text: '🔒 Security best practices' },
      { text: '📊 Analytics integration' },
    ],
  },
}

export const ShortList: Story = {
  args: {
    blockType: 'list',
    type: 'unordered',
    items: [
      { text: '✨ Simple and clean' },
      { text: '🎯 Straight to the point' },
      { text: '💡 Easy to understand' },
    ],
  },
}

export const LongOrderedList: Story = {
  args: {
    blockType: 'list',
    type: 'ordered',
    items: Array.from({ length: 10 }, (_, i) => ({
      text: `Step ${i + 1}: ${['Research', 'Plan', 'Design', 'Develop', 'Test', 'Review', 'Debug', 'Optimize', 'Deploy', 'Monitor'][i]} phase`,
    })),
  },
}
