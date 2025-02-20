import type { Meta, StoryObj } from '@storybook/react'
import type { Contact1Fields } from '@/payload-types'
import Contact1 from './Component'

const meta: Meta<typeof Contact1> = {
  title: 'Blocks/Contact/Contact1',
  component: Contact1,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Contact1>

const defaultContact: Contact1Fields = {
  contact: {
    title: "Let's build something amazing together",
    description:
      "Get in touch with our team to discuss your project. We're here to help you bring your vision to life.",
    list: [
      { icon: 'Check', text: 'Free consultation with our experts' },
      { icon: 'Check', text: 'Detailed project scope and timeline' },
      { icon: 'Check', text: 'Transparent pricing and milestones' },
      { icon: 'Check', text: 'Ongoing support and maintenance' },
    ],
    avatars: [
      {
        image: {
          id: 'avatar-1',
          alt: 'Team member 1',
          url: '/website-template-OG.webp',
          width: 64,
          height: 64,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        image: {
          id: 'avatar-2',
          alt: 'Team member 2',
          url: '/website-template-OG.webp',
          width: 64,
          height: 64,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        image: {
          id: 'avatar-3',
          alt: 'Team member 3',
          url: '/website-template-OG.webp',
          width: 64,
          height: 64,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    ],
    logos: [
      {
        image: {
          id: 'logo-1',
          alt: 'Company 1',
          url: '/website-template-OG.webp',
          width: 120,
          height: 24,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        image: {
          id: 'logo-2',
          alt: 'Company 2',
          url: '/website-template-OG.webp',
          width: 120,
          height: 24,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        image: {
          id: 'logo-3',
          alt: 'Company 3',
          url: '/website-template-OG.webp',
          width: 120,
          height: 24,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
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
            label: 'Company Name',
            placeholder: 'Your company name',
            type: 'text',
            required: 'no',
          },
        },
        {
          formField: {
            label: 'Message',
            placeholder: 'How can we help you?',
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

export const WithoutAvatars: Story = {
  args: {
    contact: {
      ...defaultContact.contact,
      avatars: [],
    },
  },
}

export const WithoutLogos: Story = {
  args: {
    contact: {
      ...defaultContact.contact,
      logos: [],
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
              label: 'Email Address',
              placeholder: 'you@example.com',
              type: 'email',
              required: 'yes',
            },
          },
          {
            formField: {
              label: 'Message',
              placeholder: 'How can we help you?',
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
      title: 'Book Your Free Consultation',
      description:
        'Schedule a no-obligation consultation with our healthcare technology experts to discuss your needs.',
      list: [
        { icon: 'Shield', text: 'HIPAA-compliant solutions' },
        { icon: 'Link', text: 'Integration with existing systems' },
        { icon: 'Clock', text: '24/7 technical support' },
        { icon: 'Settings', text: 'Custom healthcare workflows' },
      ],
      avatars: defaultContact.contact.avatars,
      logos: defaultContact.contact.logos,
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
              label: 'Work Email',
              placeholder: 'you@healthcare.org',
              type: 'email',
              required: 'yes',
            },
          },
          {
            formField: {
              label: 'Healthcare Organization',
              placeholder: 'Your organization name',
              type: 'text',
              required: 'yes',
            },
          },
          {
            formField: {
              label: 'Your Role',
              placeholder: 'e.g., Medical Director, IT Manager',
              type: 'text',
              required: 'yes',
            },
          },
          {
            formField: {
              label: 'How can we help?',
              placeholder: 'Tell us about your needs',
              type: 'textarea',
              required: 'yes',
            },
          },
        ],
        submitButton: {
          label: 'Request Consultation',
        },
      },
    },
  },
}
