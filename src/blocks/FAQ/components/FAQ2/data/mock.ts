import type { FAQData } from './schema'

export const mockData = {
  title: 'Frequently Asked Questions (FAQ)',
  faqs: [
    {
      question: 'What is the purpose of this CMS?',
      answer:
        'This CMS (Content Management System) is designed to help users create, manage, and modify content on a website without needing specialized technical knowledge.',
    },
    {
      question: 'How do I create a new post?',
      answer:
        "To create a new post, navigate to the 'Posts' section in the dashboard, click on 'Add New', and fill in the required fields such as title, content, and categories.",
    },
    {
      question: 'Can I customize the design of my website?',
      answer:
        'Yes, you can customize the design of your website by selecting different themes and using the built-in customization tools to modify layouts, colors, and fonts.',
    },
    {
      question: 'Is it possible to add plugins to enhance functionality?',
      answer:
        "Absolutely! You can add plugins to extend the functionality of your CMS. Simply go to the 'Plugins' section, search for the desired plugin, and install it.",
    },
    {
      question: 'How do I manage user permissions?',
      answer:
        "User permissions can be managed in the 'Users' section of the dashboard, where you can assign roles and set specific permissions for each user.",
    },
    {
      question: 'What should I do if I encounter an error?',
      answer:
        'If you encounter an error, check the error message for details. You can also consult the documentation or contact support for assistance.',
    },
    {
      question: 'How can I back up my content?',
      answer:
        'You can back up your content by using the built-in backup feature in the settings or by exporting your data to a file.',
    },
    {
      question: 'Is there a mobile app for this CMS?',
      answer:
        'Yes, there is a mobile app available for both iOS and Android that allows you to manage your content on the go.',
    },
  ],
} satisfies FAQData
