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

const defaultFAQ: FAQ5Fields = {
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
      {
        question: 'What industries do you serve?',
        answer:
          'We work with clients across various industries including healthcare, finance, education, e-commerce, and technology. Our diverse experience allows us to understand the unique challenges and requirements of different sectors.',
        id: '8',
      },
    ],
  },
}

export const GettingStartedGuide: Story = {
  args: {
    title: 'Getting Started Guide',
    subtitle: 'QUICK START',
    description: 'Follow these steps to get started with our platform quickly and efficiently.',
    faqs: [
      {
        question: 'Step 1: Create an Account',
        answer:
          'Visit our website and click on the "Sign Up" button. Fill in your details and verify your email address to complete the registration process.',
        id: 'step-1',
      },
      {
        question: 'Step 2: Set Up Your Profile',
        answer:
          'Complete your profile by adding your company information, preferences, and any other relevant details that will help us customize your experience.',
        id: 'step-2',
      },
      {
        question: 'Step 3: Explore the Dashboard',
        answer:
          'Familiarize yourself with the dashboard interface. This is where you will manage your projects, access resources, and communicate with our team.',
        id: 'step-3',
      },
      {
        question: 'Step 4: Start Your First Project',
        answer:
          'Click on "New Project" and follow the guided setup process. Define your project scope, timeline, and requirements to get started.',
        id: 'step-4',
      },
      {
        question: 'Step 5: Request Support if Needed',
        answer:
          'If you need assistance at any point, use the "Help" button in the navigation bar to access our support resources or contact our team directly.',
        id: 'step-5',
      },
    ],
  },
}
