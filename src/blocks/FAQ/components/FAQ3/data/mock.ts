import type { FAQData } from './schema'

export const mockData = {
  title: 'Frequently Asked Questions',
  subtitle: 'Your questions answered',
  faqs: [
    {
      question: 'What is the purpose of this CMS?',
      answer:
        'This CMS is designed to help users create, manage, and publish content easily and efficiently.',
    },
    {
      question: 'How do I reset my password?',
      answer:
        "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email.",
    },
    {
      question: 'Can I customize the templates?',
      answer: 'Yes, you can customize the templates to fit your branding and design preferences.',
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes, we offer a mobile app that allows you to manage your content on the go.',
    },
    {
      question: 'How do I contact support?',
      answer:
        'You can contact support through the support section on our website or by emailing support@example.com.',
    },
  ],
  support: {
    title: 'Need More Help?',
    subtitle: "We're here to assist you!",
    supportLink: [
      {
        link: {
          appearances: 'Contact Us',
          label: 'Email Support',
          href: 'mailto:support@example.com',
        },
      },
      {
        link: {
          appearances: 'Visit our Help Center',
          label: 'Help Center',
          href: 'https://www.example.com/help',
        },
      },
    ],
  },
} satisfies FAQData
