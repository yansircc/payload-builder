import type { FAQData } from './schema'

export const mockData = {
  title: 'Frequently Asked Questions',
  subtitle: 'Your Questions Answered',
  description:
    'Welcome to our FAQ section! Here, we address the most common questions and concerns to help you navigate our services with ease. If you have any further inquiries, feel free to reach out to our support team.',
  faqs: [
    {
      question: 'What is the purpose of this FAQ section?',
      answer:
        'The FAQ section is designed to provide quick answers to common questions, helping users find information easily.',
    },
    {
      question: 'How can I contact customer support?',
      answer:
        'You can contact customer support via email at support@example.com or by calling our hotline at 1-800-123-4567.',
    },
    {
      question: 'Where can I find the latest updates and news?',
      answer:
        "Latest updates and news can be found on our website's news section or by subscribing to our newsletter.",
    },
    {
      question: 'What should I do if I forget my password?',
      answer:
        "If you forget your password, click on the 'Forgot Password' link on the login page and follow the instructions to reset it.",
    },
    {
      question: 'Is my personal information secure?',
      answer:
        'Yes, we take your privacy seriously and implement strong security measures to protect your personal information.',
    },
  ],
} satisfies FAQData
