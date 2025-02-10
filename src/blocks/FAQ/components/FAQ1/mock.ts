import { z } from 'zod'

export const schema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title should be less than 100 characters')
    .default('FAQ title, should around 10 words')
    .describe('The main title for the FAQ section'),
  faqs: z
    .array(
      z.object({
        question: z
          .string()
          .min(1, 'Question is required')
          .describe('The question text for this FAQ item'),
        answer: z
          .string()
          .min(1, 'Answer is required')
          .describe('The answer text for this FAQ item'),
      }),
    )
    .min(6, 'Exactly 6 FAQ items are required')
    .max(6, 'Exactly 6 FAQ items are required')
    .describe('Array of FAQ items, each containing a question and answer'),
})

export const mockData = {
  title: 'Frequently Asked Questions about Our CMS System',
  faqs: [
    {
      question: 'What is a CMS system?',
      answer:
        'A CMS, or Content Management System, is a software application that allows users to create, edit, manage, and publish digital content without needing specialized technical knowledge.',
    },
    {
      question: 'How do I log in to the CMS?',
      answer:
        "To log in to the CMS, navigate to the login page, enter your username and password, and click the 'Login' button. If you have trouble logging in, please contact support.",
    },
    {
      question: 'Can I customize the design of my website using the CMS?',
      answer:
        'Yes, our CMS offers a variety of templates and design tools that allow you to customize the look and feel of your website to match your brand.',
    },
    {
      question: 'Is there a limit to the number of pages I can create?',
      answer:
        'No, there is no limit to the number of pages you can create using our CMS. You can add as many pages as you need to effectively manage your content.',
    },
    {
      question: 'How do I add a new user to the CMS?',
      answer:
        "To add a new user, go to the 'User Management' section, click 'Add New User', fill in the required details, and assign the appropriate roles and permissions.",
    },
    {
      question: 'What kind of support is available for CMS users?',
      answer:
        'We offer 24/7 customer support through email, phone, and live chat. Additionally, our online help center provides a wealth of resources, including tutorials and FAQs.',
    },
  ],
}
