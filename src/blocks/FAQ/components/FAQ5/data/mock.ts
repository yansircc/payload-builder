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
        'You can contact customer support via email at support@example.com or by calling our hotline at 1-800-555-0199.',
    },
    {
      question: 'Where can I find the user manual?',
      answer:
        "The user manual is available for download on our website under the 'Resources' section.",
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept various payment methods including credit cards, PayPal, and bank transfers.',
    },
    {
      question: 'How do I reset my password?',
      answer:
        "To reset your password, click on the 'Forgot Password' link on the login page and follow the instructions.",
    },
  ],
} satisfies FAQData
