import type { FAQData } from './schema'

export const mockData = {
  title: 'Frequently Asked Questions About Our Services',
  faqs: [
    {
      question: 'What services do you offer to customers?',
      answer:
        'We offer a wide range of services including web development, digital marketing, SEO optimization, and content creation. Our team is dedicated to providing tailored solutions to meet the unique needs of each client.',
    },
    {
      question: 'How can I contact customer support?',
      answer:
        'You can reach our customer support team via email at support@example.com or by calling our hotline at 1-800-123-4567. We are available Monday to Friday from 9 AM to 5 PM.',
    },
    {
      question: 'What is your refund policy for services?',
      answer:
        'Our refund policy allows for a full refund within 30 days of service if you are not satisfied. Please contact our support team to initiate the refund process.',
    },
    {
      question: 'Do you offer custom solutions for businesses?',
      answer:
        'Yes, we specialize in creating custom solutions tailored to the specific needs of businesses. Our team will work closely with you to understand your requirements and deliver the best results.',
    },
    {
      question: 'How long does it take to complete a project?',
      answer:
        'The timeline for project completion varies based on the scope and complexity of the work. Typically, we provide an estimated timeline during the initial consultation.',
    },
    {
      question: 'Can I see examples of your previous work?',
      answer:
        "Absolutely! We have a portfolio showcasing our previous projects. You can view it on our website under the 'Portfolio' section to see the quality of our work.",
    },
  ],
} satisfies FAQData
