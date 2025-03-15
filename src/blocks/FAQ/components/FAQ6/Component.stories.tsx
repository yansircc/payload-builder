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

const defaultFAQ: FAQ6Fields = {
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
    {
      question: 'What technologies do you specialize in?',
      answer:
        'We specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various cloud platforms like AWS, Azure, and Google Cloud.',
      id: '6',
    },
  ],
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
    faqs: defaultFAQ.faqs.slice(0, 4),
  },
}

export const MoreQuestions: Story = {
  args: {
    ...defaultFAQ,
    title: 'Extended FAQ Section',
    subtitle: 'KNOWLEDGE BASE',
    description:
      'Browse through our comprehensive knowledge base to find answers to your questions.',
    faqs: [
      ...defaultFAQ.faqs,
      {
        question: 'Do you work with clients internationally?',
        answer:
          'Yes, we work with clients globally. Our team is distributed across multiple time zones, allowing us to provide support and collaboration regardless of your location.',
        id: '7',
      },
      {
        question: 'What industries do you serve?',
        answer:
          'We work with clients across various industries including healthcare, finance, education, e-commerce, and technology. Our diverse experience allows us to understand the unique challenges and requirements of different sectors.',
        id: '8',
      },
    ],
  },
}

export const ProductFeatures: Story = {
  args: {
    title: 'Product Features',
    subtitle: 'FEATURES',
    description: 'Explore the key features that make our product stand out from the competition.',
    faqs: [
      {
        question: 'Intuitive User Interface',
        answer:
          'Our platform features a clean, modern interface designed for ease of use. Navigate effortlessly through complex tasks with minimal learning curve.',
        id: 'feature-1',
      },
      {
        question: 'Advanced Analytics',
        answer:
          'Gain valuable insights with our comprehensive analytics dashboard. Track performance metrics, user behavior, and business outcomes in real-time.',
        id: 'feature-2',
      },
      {
        question: 'Seamless Integration',
        answer:
          'Connect with your existing tools and services through our extensive API and pre-built integrations with popular platforms and services.',
        id: 'feature-3',
      },
      {
        question: 'Enterprise-Grade Security',
        answer:
          'Rest easy knowing your data is protected by industry-leading security measures, including end-to-end encryption, regular security audits, and compliance with global standards.',
        id: 'feature-4',
      },
      {
        question: 'Scalable Infrastructure',
        answer:
          'Our cloud-based solution grows with your business, handling increased loads without compromising performance or requiring significant changes to your setup.',
        id: 'feature-5',
      },
      {
        question: 'Customizable Workflows',
        answer:
          'Tailor the platform to your specific needs with customizable workflows, templates, and automation rules that adapt to your unique business processes.',
        id: 'feature-6',
      },
      {
        question: 'Mobile Accessibility',
        answer:
          'Access your dashboard and perform critical tasks from anywhere with our responsive mobile interface, available on iOS and Android devices.',
        id: 'feature-7',
      },
      {
        question: 'Collaborative Tools',
        answer:
          'Enhance team productivity with built-in collaboration features including real-time editing, commenting, task assignment, and progress tracking.',
        id: 'feature-8',
      },
    ],
  },
}
