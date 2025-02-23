import type { Meta, StoryObj } from '@storybook/react'
import type { Contact7Fields } from '@/payload-types'
import Contact7 from './Component'

const meta: Meta<typeof Contact7> = {
  title: 'Blocks/Contact/Contact7',
  component: Contact7,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Contact7>

const defaultContact: Contact7Fields = {
  contact: {
    title: 'Contact & Support',
    subtitle: 'Get Help',
    description: 'Choose the best way to get in touch with our team.',
    supportList: {
      supports: [
        {
          icon: 'Phone',
          title: 'Sales Support',
          subtitle: 'Talk to our sales team about enterprise solutions and pricing',
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
        {
          icon: 'MessageCircle',
          title: 'General Inquiries',
          subtitle: 'Questions about our products or services',
          link: {
            type: 'custom',
            label: 'Send Message',
            url: '#contact',
            appearance: 'link',
          },
        },
      ],
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
      title: 'Need Assistance?',
      subtitle: 'Were Here to Help',
      description: 'Choose your preferred method of contact below.',
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
            subtitle: 'Send us an email and well respond within 24 hours',
            link: {
              type: 'custom',
              label: 'Email Us',
              url: '#email',
              appearance: 'link',
            },
          },
          {
            icon: 'PhoneCall',
            title: 'Phone Support',
            subtitle: 'Call us directly for immediate assistance',
            link: {
              type: 'custom',
              label: 'Call Now',
              url: '#phone',
              appearance: 'link',
            },
          },
        ],
      },
    },
  },
}
