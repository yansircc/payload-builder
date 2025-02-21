import type { Meta, StoryObj } from '@storybook/react'
import type { Contact5Fields } from '@/payload-types'
import Contact5 from './Component'

const meta: Meta<typeof Contact5> = {
  title: 'Blocks/Contact/Contact5',
  component: Contact5,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Contact5>

const defaultContact: Contact5Fields = {
  contact: {
    title: 'Get in Touch',
    subtitle: 'Contact Us',
    description: 'Fill out the form below and well get back to you as soon as possible.',
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

export const MinimalFields: Story = {
  args: {
    contact: {
      ...defaultContact.contact,
      form: {
        fields: [
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
              placeholder: 'Your message',
              required: 'yes',
              type: 'textarea',
            },
          },
        ],
        submitButton: {
          label: 'Submit',
        },
      },
    },
  },
}

export const CustomContent: Story = {
  args: {
    contact: {
      title: 'Contact Support',
      subtitle: 'Need Help?',
      description: 'Our support team is here to assist you with any questions or concerns.',
      form: {
        fields: [
          {
            formField: {
              label: 'Name',
              placeholder: 'Your name',
              required: 'yes',
              type: 'text',
            },
          },
          {
            formField: {
              label: 'Email',
              placeholder: 'Your email',
              required: 'yes',
              type: 'email',
            },
          },
          {
            formField: {
              label: 'Subject',
              placeholder: 'What is this about?',
              required: 'yes',
              type: 'text',
            },
          },
          {
            formField: {
              label: 'Message',
              placeholder: 'Please describe your issue',
              required: 'yes',
              type: 'textarea',
            },
          },
        ],
        submitButton: {
          label: 'Send Support Request',
        },
      },
    },
  },
}
