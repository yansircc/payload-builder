import type { Meta, StoryObj } from '@storybook/react'
import type { Contact6Fields } from '@/payload-types'
import Contact6 from './Component'

const meta: Meta<typeof Contact6> = {
  title: 'Blocks/Contact/Contact6',
  component: Contact6,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Contact6>

const defaultContact: Contact6Fields = {
  contact: {
    title: 'Get in Touch',
    subtitle: 'Contact Us',
    description: 'Have questions? We are here to help.',
    supportList: {
      supports: [
        {
          icon: 'Phone',
          title: 'Sales Support',
          subtitle: 'Talk to our sales team about enterprise solutions',
          link: {
            type: 'custom',
            label: 'Contact Sales',
            url: '#sales',
            appearance: 'link',
          },
        },
        {
          icon: 'LifeBuoy',
          title: 'Technical Support',
          subtitle: '24/7 technical assistance for our customers',
          link: {
            type: 'custom',
            label: 'Get Support',
            url: '#support',
            appearance: 'link',
          },
        },
      ],
    },
    form: {
      fields: [
        {
          formField: {
            label: 'Full Name',
            placeholder: 'Enter your full name',
            required: 'yes',
            type: 'text',
          },
        },
        {
          formField: {
            label: 'Email Address',
            placeholder: 'you@example.com',
            required: 'yes',
            type: 'email',
          },
        },
        {
          formField: {
            label: 'Message',
            placeholder: 'How can we help you?',
            required: 'yes',
            type: 'textarea',
          },
        },
      ],
      submitButton: {
        label: 'Send Message',
      },
    },
  },
}

export const Default: Story = {
  args: defaultContact,
}

export const SingleSupport: Story = {
  args: {
    contact: {
      ...defaultContact.contact,
      supportList: {
        supports: defaultContact.contact.supportList?.supports?.[0]
          ? [
              {
                icon: defaultContact.contact.supportList.supports[0].icon,
                title: defaultContact.contact.supportList.supports[0].title,
                subtitle: defaultContact.contact.supportList.supports[0].subtitle,
                link: {
                  type: 'custom',
                  label: defaultContact.contact.supportList.supports[0].link.label,
                  url: defaultContact.contact.supportList.supports[0].link.url,
                  appearance: 'link',
                },
              },
            ]
          : [],
      },
    },
  },
}

export const CustomContent: Story = {
  args: {
    contact: {
      title: 'Contact Support',
      subtitle: 'Need Help?',
      description: 'Our support team is here to assist you.',
      supportList: {
        supports: [
          {
            icon: 'MessageSquare',
            title: 'Live Chat',
            subtitle: 'Chat with our support team in real-time',
            link: {
              type: 'custom',
              label: 'Start Chat',
              url: '#chat',
              appearance: 'link',
            },
          },
          {
            icon: 'Mail',
            title: 'Email Support',
            subtitle: 'Send us an email and we will respond within 24 hours',
            link: {
              type: 'custom',
              label: 'Email Us',
              url: '#email',
              appearance: 'link',
            },
          },
        ],
      },
      form: {
        fields: [
          {
            formField: {
              label: 'Email',
              placeholder: 'Your email address',
              required: 'yes',
              type: 'email',
            },
          },
          {
            formField: {
              label: 'Issue Type',
              placeholder: 'Select issue type',
              required: 'yes',
              type: 'select',
              options: [
                { label: 'Technical Issue', value: 'technical' },
                { label: 'Billing Question', value: 'billing' },
                { label: 'General Inquiry', value: 'general' },
              ],
            },
          },
          {
            formField: {
              label: 'Message',
              placeholder: 'Describe your issue',
              required: 'yes',
              type: 'textarea',
            },
          },
        ],
        submitButton: {
          label: 'Submit Request',
        },
      },
    },
  },
}
