import type { Meta, StoryObj } from '@storybook/react'
import type { Contact2Fields } from '@/payload-types'
import Contact2 from './Component'

const meta: Meta<typeof Contact2> = {
  title: 'Blocks/Contact/Contact2',
  component: Contact2,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Contact2>

const defaultContact: Contact2Fields = {
  contact: {
    title: 'Get in Touch',
    description:
      'Have questions? Were here to help. Send us a message and well respond as soon as possible.',
    list: [
      { text: 'Email: <a href="mailto:hello@example.com" class="underline">hello@example.com</a>' },
      { text: 'Phone: <a href="tel:+1234567890" class="underline">+1 (234) 567-890</a>' },
      { text: 'Address: 123 Business Street, Suite 100, San Francisco, CA 94111' },
      { text: 'Hours: Monday - Friday, 9:00 AM - 6:00 PM PST' },
    ],
    form: {
      fields: [
        {
          formField: {
            label: 'Full Name',
            placeholder: 'Enter your full name',
            type: 'text',
            required: 'yes',
          },
        },
        {
          formField: {
            label: 'Email Address',
            placeholder: 'you@example.com',
            type: 'email',
            required: 'yes',
          },
        },
        {
          formField: {
            label: 'Subject',
            placeholder: 'How can we help?',
            type: 'text',
            required: 'yes',
          },
        },
        {
          formField: {
            label: 'Message',
            placeholder: 'Tell us more about your needs...',
            type: 'textarea',
            required: 'yes',
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

export const MinimalContact: Story = {
  args: {
    contact: {
      ...defaultContact.contact,
      list: [
        {
          text: 'Email: <a href="mailto:hello@example.com" class="underline">hello@example.com</a>',
        },
        { text: 'Phone: <a href="tel:+1234567890" class="underline">+1 (234) 567-890</a>' },
      ],
    },
  },
}

export const MinimalForm: Story = {
  args: {
    contact: {
      ...defaultContact.contact,
      form: {
        fields: [
          {
            formField: {
              label: 'Email',
              placeholder: 'you@example.com',
              type: 'email',
              required: 'yes',
            },
          },
          {
            formField: {
              label: 'Message',
              placeholder: 'Your message',
              type: 'textarea',
              required: 'yes',
            },
          },
        ],
        submitButton: {
          label: 'Send',
        },
      },
    },
  },
}

export const CustomContent: Story = {
  args: {
    contact: {
      title: 'Contact Our Support Team',
      description:
        'Our dedicated support team is available to assist you with any questions or concerns.',
      list: [
        {
          text: 'Support: <a href="mailto:support@example.com" class="underline">support@example.com</a>',
        },
        {
          text: 'Sales: <a href="mailto:sales@example.com" class="underline">sales@example.com</a>',
        },
        { text: 'Emergency Line: <a href="tel:+1800123456" class="underline">1-800-123-456</a>' },
        { text: '24/7 Support Available' },
      ],
      form: defaultContact.contact.form,
    },
  },
}
