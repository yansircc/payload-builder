import type { Meta, StoryObj } from '@storybook/react'
import type { FAQ3Fields } from '@/payload-types'
import FAQ3 from './Component'

const meta: Meta<typeof FAQ3> = {
  title: 'Blocks/FAQ/FAQ3',
  component: FAQ3,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof FAQ3>

const defaultFAQ: FAQ3Fields = {
  title: 'Frequently Asked Questions',
  subtitle: 'Find answers to common questions about our services and solutions.',
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
  support: {
    title: 'Still have questions?',
    subtitle: 'Our support team is here to help. Reach out to us through any of these channels.',
    supportLink: [
      {
        link: {
          type: 'custom',
          newTab: true,
          url: 'mailto:support@example.com',
          label: 'Contact Support',
          appearance: 'default',
        },
        id: 'support-link-1',
      },
      {
        link: {
          type: 'custom',
          newTab: true,
          url: 'https://example.com/chat',
          label: 'Live Chat',
          appearance: 'secondary',
        },
        id: 'support-link-2',
      },
    ],
  },
}

export const Default: Story = {
  args: defaultFAQ,
}

export const CustomTitle: Story = {
  args: {
    ...defaultFAQ,
    title: 'Common Questions About Our Services',
    subtitle: 'Everything you need to know before getting started with our platform.',
  },
}

export const FewerQuestions: Story = {
  args: {
    ...defaultFAQ,
    faqs: defaultFAQ.faqs.slice(0, 3),
  },
}

export const CustomSupport: Story = {
  args: {
    ...defaultFAQ,
    support: {
      ...defaultFAQ.support,
      title: 'Need more information?',
      subtitle: 'Our experts are available 24/7 to answer your questions and provide guidance.',
      supportLink: [
        {
          link: {
            type: 'custom',
            newTab: true,
            url: 'tel:+1234567890',
            label: 'Call Us',
            appearance: 'default',
          },
          id: 'custom-support-1',
        },
        {
          link: {
            type: 'custom',
            newTab: false,
            url: '/schedule-demo',
            label: 'Schedule a Demo',
            appearance: 'secondary',
          },
          id: 'custom-support-2',
        },
        {
          link: {
            type: 'custom',
            newTab: true,
            url: 'https://example.com/knowledge-base',
            label: 'Knowledge Base',
            appearance: 'outline',
          },
          id: 'custom-support-3',
        },
      ],
    },
  },
}
