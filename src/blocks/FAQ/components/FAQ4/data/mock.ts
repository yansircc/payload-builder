import type { FAQData } from './schema'

export const mockData = {
  title: 'Frequently Asked Questions',
  subtitle: 'Your Questions Answered',
  description:
    "Welcome to our FAQ section! Here, you'll find answers to the most common questions about our services, features, and policies. If you have any other questions, feel free to reach out to our support team.",
  faqs: [
    {
      question: 'What services do you offer?',
      answer:
        'We offer a variety of services including web development, digital marketing, and content creation.',
    },
    {
      question: 'How can I contact support?',
      answer:
        'You can contact our support team via email at support@example.com or through our contact form on the website.',
    },
    {
      question: 'What is your refund policy?',
      answer:
        'Our refund policy allows for a full refund within 30 days of purchase if you are not satisfied with our services.',
    },
    {
      question: 'Do you offer custom solutions?',
      answer:
        'Yes, we provide custom solutions tailored to meet the specific needs of our clients.',
    },
    {
      question: 'How long does it take to complete a project?',
      answer:
        'The timeline for project completion varies based on the scope and complexity, but we will provide an estimated timeline during the initial consultation.',
    },
  ],
  support: {
    title: 'Need More Help?',
    subtitle: "We're here for you!",
    supportLink: [
      {
        link: {
          appearances: 'Contact Us',
          label: 'Get in Touch',
          href: 'https://example.com/contact',
        },
      },
    ],
  },
} satisfies FAQData
