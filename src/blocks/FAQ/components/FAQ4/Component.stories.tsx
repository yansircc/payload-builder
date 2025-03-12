import type { Meta, StoryObj } from '@storybook/react'
import type { FAQ4Fields } from '@/payload-types'
import FAQ4 from './Component'

const meta: Meta<typeof FAQ4> = {
  title: 'Blocks/FAQ/FAQ4',
  component: FAQ4,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof FAQ4>

const defaultFAQ: FAQ4Fields = {
  title: 'Frequently Asked Questions',
  subtitle: 'FAQ',
  description: 'Find answers to common questions about our services and solutions.',
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

export const CustomBadgeAndTitle: Story = {
  args: {
    ...defaultFAQ,
    title: 'Common Questions About Our Services',
    subtitle: 'HELP CENTER',
    description: 'Everything you need to know before getting started with our platform.',
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
            appearance: 'outline',
          },
          id: 'custom-support-2',
        },
      ],
    },
  },
}

export const ExtendedExample: Story = {
  args: {
    title: 'Product Support & Resources',
    subtitle: 'KNOWLEDGE BASE',
    description:
      'Browse through our comprehensive knowledge base to find answers to your questions about our products and services.',
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
    support: {
      title: 'Contact Our Support Team',
      subtitle: 'Our dedicated support team is ready to assist you with any questions or concerns.',
      supportLink: [
        {
          link: {
            type: 'custom',
            newTab: true,
            url: 'https://example.com/knowledge-base',
            label: 'Knowledge Base',
            appearance: 'default',
          },
          id: 'extended-support-1',
        },
        {
          link: {
            type: 'custom',
            newTab: true,
            url: 'https://example.com/community',
            label: 'Community Forum',
            appearance: 'secondary',
          },
          id: 'extended-support-2',
        },
        {
          link: {
            type: 'custom',
            newTab: true,
            url: 'mailto:premium@example.com',
            label: 'Premium Support',
            appearance: 'outline',
          },
          id: 'extended-support-3',
        },
      ],
    },
  },
}
