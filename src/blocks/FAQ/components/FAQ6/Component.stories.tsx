import type { Meta, StoryObj } from '@storybook/react'
import type { FAQ6Fields } from '@/payload-types'
import FAQ6 from './Component'

const meta: Meta<typeof FAQ6> = {
  title: 'Blocks/FAQ/FAQ6',
  component: FAQ6,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof FAQ6>

const defaultFAQ6: FAQ6Fields = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about our offerings.',
  description:
    'This section answers some of the most frequently asked questions by our clients and visitors.',
  faqs: [
    {
      question: 'What services do you offer?',
      answer:
        'We offer a variety of services including web development, mobile app development, digital marketing, and more.',
    },
    {
      question: 'What is your pricing model?',
      answer:
        'We offer flexible pricing options based on the scope and complexity of each project. We provide a custom quote after discussing your requirements.',
    },
    {
      question: 'Do you provide ongoing support?',
      answer:
        'Yes, we offer ongoing support and maintenance packages to ensure your solution continues to perform optimally.',
    },
  ],
}

export const Default: Story = {
  args: defaultFAQ6,
}

export const CustomTitle: Story = {
  args: {
    ...defaultFAQ6,
    title: 'Common Questions About Our Services',
  },
}

export const WithoutFAQ: Story = {
  args: {
    ...defaultFAQ6,
    faqs: [],
  },
}

export const WithoutDescription: Story = {
  args: {
    ...defaultFAQ6,
    description: '',
  },
}

export const MoreFAQs: Story = {
  args: {
    ...defaultFAQ6,
    faqs: [
      {
        question: 'How long does a typical project take?',
        answer:
          'It depends on the complexity, but generally, projects take anywhere from a few weeks to a few months.',
      },
      {
        question: 'How can I get started?',
        answer:
          'You can get started by contacting us through the form on our website. We will then arrange a consultation to discuss your project.',
      },
    ],
  },
}
