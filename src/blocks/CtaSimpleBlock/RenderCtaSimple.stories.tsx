import type { Meta, StoryObj } from '@storybook/react'
import type { CtaSimpleBlock as CtaSimpleBlockProps } from 'src/payload-types'
import { CtaSimpleBlock } from './RenderCtaSimple'

const meta = {
  title: 'Blocks/CtaSimple/CtaSimpleBlock',
  component: CtaSimpleBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CtaSimpleBlock>

export default meta
type Story = StoryObj<typeof CtaSimpleBlock>

const defaultCtaSimpleBlock: CtaSimpleBlockProps = {
  blockType: 'ctaSimple',
  backgroundColor: 'primary',
  heading: 'Join Us Today!',
  description: 'Take the first step towards transforming your business.',
  buttonLabel: 'Learn More',
  buttonUrl: '#',
  buttonStyle: 'solid',
}

export const Default: Story = {
  args: defaultCtaSimpleBlock,
}

export const SecondaryBackground: Story = {
  args: {
    ...defaultCtaSimpleBlock,
    backgroundColor: 'secondary',
  },
}

export const AccentBackground: Story = {
  args: {
    ...defaultCtaSimpleBlock,
    backgroundColor: 'accent',
  },
}

export const LightBackground: Story = {
  args: {
    ...defaultCtaSimpleBlock,
    backgroundColor: 'light',
  },
}

export const DarkBackground: Story = {
  args: {
    ...defaultCtaSimpleBlock,
    backgroundColor: 'dark',
  },
}

export const WithoutDescription: Story = {
  args: {
    ...defaultCtaSimpleBlock,
    description: '',
  },
}

export const OutlineButton: Story = {
  args: {
    ...defaultCtaSimpleBlock,
    buttonStyle: 'outline',
  },
}

export const GhostButton: Story = {
  args: {
    ...defaultCtaSimpleBlock,
    buttonStyle: 'ghost',
  },
}
