import type { Meta, StoryObj } from '@storybook/react'
import type { FAQ2Fields } from '@/payload-types'
import FAQ2 from './Component'

const meta: Meta<typeof FAQ2> = {
  title: 'Blocks/FAQ/FAQ2',
  component: FAQ2,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof FAQ2>

const defaultFAQ: FAQ2Fields = {
  title: 'Frequently Asked Questions',
  faqs: [
    {
      question: 'What services do you offer?',
      answer:
        'We offer a comprehensive suite of digital solutions including web development, mobile app development, UI/UX design, cloud services, and digital transformation consulting.',
      id: '1',
    },
    {
      question: 'How long does a typical project take?',
      answer:
        "Project timelines vary depending on scope and complexity. A simple website might take 4-6 weeks, while a complex enterprise solution could take 3-6 months. We'll provide detailed timelines during our initial consultation.",
      id: '2',
    },
    {
      question: 'Do you provide ongoing support?',
      answer:
        'Yes, we offer flexible support and maintenance packages to ensure your solution continues to perform optimally. This includes regular updates, security patches, and technical support.',
      id: '3',
    },
    {
      question: 'What is your development process?',
      answer:
        'We follow an agile methodology with iterative development cycles. This includes discovery, planning, design, development, testing, and deployment phases, with regular client feedback and adjustments throughout.',
      id: '4',
    },
    {
      question: 'How do you handle data security?',
      answer:
        'Security is a top priority. We implement industry-standard security measures, follow best practices for secure coding, and ensure compliance with relevant data protection regulations.',
      id: '5',
    },
  ],
}

export const Default: Story = {
  args: defaultFAQ,
}

export const CustomTitle: Story = {
  args: {
    ...defaultFAQ,
    title: 'Common Questions About Our Services',
  },
}

export const FewerQuestions: Story = {
  args: {
    ...defaultFAQ,
    faqs: defaultFAQ.faqs.slice(0, 3),
  },
}

export const MoreQuestions: Story = {
  args: {
    ...defaultFAQ,
    title: 'Extended FAQ Section',
    faqs: [
      ...defaultFAQ.faqs,
      {
        question: 'What technologies do you specialize in?',
        answer:
          'We specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various cloud platforms like AWS, Azure, and Google Cloud.',
        id: '6',
      },
      {
        question: 'Do you work with clients internationally?',
        answer:
          'Yes, we work with clients globally. Our team is distributed across multiple time zones, allowing us to provide support and collaboration regardless of your location.',
        id: '7',
      },
    ],
  },
}
