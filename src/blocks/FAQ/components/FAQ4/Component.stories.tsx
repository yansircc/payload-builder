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

const defaultFAQ4: FAQ4Fields = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about our services.',
  description:
    'We have compiled the most common questions that customers ask. Here you can find answers to all your queries.',
  faqs: [
    {
      question: 'What services do you offer?',
      answer:
        'We offer a wide range of digital services including web development, mobile app development, UI/UX design, and digital transformation consulting.',
    },
    {
      question: 'How long does a typical project take?',
      answer:
        'Project timelines vary depending on the scope and complexity of the project. Typically, a small project might take 4-6 weeks, while a larger project could take 3-6 months.',
    },
    {
      question: 'Do you offer ongoing support after the project?',
      answer:
        'Yes, we offer ongoing support and maintenance services to ensure that your product continues to perform optimally.',
    },
  ],
  support: {
    title: 'Need Further Assistance?',
    subtitle: 'Contact our support team for any help you may need.',
    supportLink: [
      {
        link: {
          label: 'Contact Us',
          url: '#',
          appearance: 'default',
        },
      },
    ],
  },
}

export const Default: Story = {
  args: defaultFAQ4,
}

export const CustomTitle: Story = {
  args: {
    ...defaultFAQ4,
    title: 'Common Questions About Our Services',
  },
}
export const NoTitle: Story = {
  args: {
    ...defaultFAQ4,
    subtitle: '',
  },
}

export const WithoutFAQ: Story = {
  args: {
    ...defaultFAQ4,
    faqs: [],
  },
}

export const NoSupportSection: Story = {
  args: {
    ...defaultFAQ4,
    support: {
      title: 'Need Help?',
      subtitle: 'Reach out to us anytime.',
    },
  },
}

export const FullSupport: Story = {
  args: {
    ...defaultFAQ4,
    support: {
      title: 'Support 24/7',
      subtitle: 'Our team is here to assist you at any time.',
      supportLink: [
        {
          link: {
            label: 'Visit Support Center',
            url: '#',
            appearance: 'outline',
          },
        },
      ],
    },
  },
}
