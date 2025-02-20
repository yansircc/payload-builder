import type { Meta, StoryObj } from '@storybook/react'
import type { FAQ1Fields } from '@/payload-types'
import FAQ1 from './Component'

const meta: Meta<typeof FAQ1> = {
  title: 'Blocks/FAQ/FAQ1',
  component: FAQ1,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof FAQ1>

const defaultFAQ: FAQ1Fields = {
  faq: {
    title: 'Frequently Asked Questions',
    faqs: [
      {
        question: 'What services do you offer?',
        answer:
          'We offer a comprehensive suite of digital solutions including web development, mobile app development, UI/UX design, cloud services, and digital transformation consulting.',
      },
      {
        question: 'How long does a typical project take?',
        answer:
          "Project timelines vary depending on scope and complexity. A simple website might take 4-6 weeks, while a complex enterprise solution could take 3-6 months. We'll provide detailed timelines during our initial consultation.",
      },
      {
        question: 'Do you provide ongoing support?',
        answer:
          'Yes, we offer flexible support and maintenance packages to ensure your solution continues to perform optimally. This includes regular updates, security patches, and technical support.',
      },
      {
        question: 'What is your development process?',
        answer:
          'We follow an agile methodology with iterative development cycles. This includes discovery, planning, design, development, testing, and deployment phases, with regular client feedback and adjustments throughout.',
      },
      {
        question: 'How do you handle data security?',
        answer:
          'Security is a top priority. We implement industry-standard security measures, follow best practices for secure coding, and ensure compliance with relevant data protection regulations.',
      },
    ],
  },
}

export const Default: Story = {
  args: defaultFAQ,
}
export const CustomTitle: Story = {
  args: {
    faq: {
      ...defaultFAQ.faq,
      title: 'Common Questions About Our Services',
    },
  },
}
