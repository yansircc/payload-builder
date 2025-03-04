import type { Meta, StoryObj } from '@storybook/react'
import type { FAQ5Fields } from '@/payload-types'
import FAQ5 from './Component'

const meta: Meta<typeof FAQ5> = {
  title: 'Blocks/FAQ/FAQ5',
  component: FAQ5,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof FAQ5>

const defaultFAQ5: FAQ5Fields = {
  title: 'Frequently Asked Questions',
  subtitle: 'Here are some of the most common questions we get asked.',
  description:
    'These FAQs should give you a quick understanding of how our services work and how we can help you achieve your goals.',
  faqs: [
    {
      question: 'What services do you offer?',
      answer:
        'We offer a full suite of digital services, including web development, mobile app development, digital marketing, and more.',
    },
    {
      question: 'How long does a typical project take?',
      answer:
        'Depending on the complexity of the project, it could range from a few weeks for simple websites to several months for larger, more complex projects.',
    },
    {
      question: 'Do you provide ongoing support after the project is completed?',
      answer:
        'Yes, we offer ongoing support services to help with any maintenance, updates, or troubleshooting after your project is live.',
    },
  ],
}

export const Default: Story = {
  args: defaultFAQ5,
}

export const CustomTitle: Story = {
  args: {
    ...defaultFAQ5,
    title: 'Common Questions About Our Services',
  },
}
export const NoTitle: Story = {
  args: {
    ...defaultFAQ5,
    subtitle: '',
  },
}

export const WithoutFAQ: Story = {
  args: {
    ...defaultFAQ5,
    faqs: [],
  },
}

export const WithoutDescription: Story = {
  args: {
    ...defaultFAQ5,
    description: '',
  },
}

export const DetailedFAQ: Story = {
  args: {
    ...defaultFAQ5,
    faqs: [
      {
        question: 'How do I get started?',
        answer:
          'The first step is to schedule a consultation with our team. From there, we will assess your needs and provide a detailed plan for your project.',
      },
      {
        question: 'What technologies do you use?',
        answer:
          'We use the latest technologies and best practices in web and mobile development, including React, Node.js, and more.',
      },
    ],
  },
}
