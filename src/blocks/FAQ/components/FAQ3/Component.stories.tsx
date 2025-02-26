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

const defaultFAQ3: FAQ3Fields = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about our services and processes.',
  faqs: [
    {
      question: 'What services do you offer?',
      answer:
        'We offer a wide range of services including web development, mobile app development, UI/UX design, and more.',
    },
    {
      question: 'How long does a typical project take?',
      answer:
        "Project timelines vary depending on scope and complexity. A simple website might take 4-6 weeks, while a complex enterprise solution could take 3-6 months. We'll provide detailed timelines during our initial consultation.",
    },
    {
      question: 'Do you offer support after the project is completed?',
      answer:
        'Yes, we offer ongoing maintenance and support to ensure your solution works flawlessly after deployment.',
    },
  ],
  support: {
    title: 'Need More Help?',
    subtitle: 'Our team is here to assist you at any stage of your project.',
    supportLink: [
      {
        link: {
          label: 'Contact Us',
          url: '#',
          appearance: 'link',
        },
      },
    ],
  },
}

export const Default: Story = {
  args: defaultFAQ3,
}

export const CustomTitle: Story = {
  args: {
    ...defaultFAQ3,
    title: 'Common Questions About Our Services',
  },
}

export const WithoutFAQ: Story = {
  args: {
    ...defaultFAQ3,
    faqs: [],
  },
}

export const NoSupportSection: Story = {
  args: {
    ...defaultFAQ3,
    support: {
      title: 'Need Help?',
      subtitle: 'Feel free to reach out to us.',
    },
  },
}

export const FullSupport: Story = {
  args: {
    ...defaultFAQ3,
    support: {
      title: 'Support Available 24/7',
      subtitle: 'Our dedicated support team is always ready to help you.',
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
