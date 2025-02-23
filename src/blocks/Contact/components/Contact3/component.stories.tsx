import type { Meta, StoryObj } from '@storybook/react'
import type { Contact3Fields } from '@/payload-types'
import Contact3 from './Component'

const meta: Meta<typeof Contact3> = {
  title: 'Blocks/Contact/Contact3',
  component: Contact3,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Contact3>

const defaultContact: Contact3Fields = {
  contact: {
    title: 'Contact Us',
    subtitle: 'Choose how you want to connect with us',
    links: [
      {
        link: {
          type: 'custom',
          label: 'Start Live Chat',
          url: '#chat',
          appearance: 'secondary',
        },
      },
      {
        link: {
          type: 'custom',
          label: 'Schedule Call',
          url: '#call',
          appearance: 'outline',
        },
      },
    ],
    supportList: {
      supports: [
        {
          icon: 'LifeBuoy',
          title: 'Customer Support',
          subtitle: 'Get help with your account or product',
          link: {
            type: 'custom',
            label: 'Get Help',
            url: '#help',
            appearance: 'link',
          },
        },
        {
          icon: 'MessageCircle',
          title: 'Sales Inquiries',
          subtitle: 'Talk to our sales team about enterprise solutions',
          link: {
            type: 'custom',
            label: 'Contact Sales',
            url: '#sales',
            appearance: 'link',
          },
        },
      ],
    },
    officeList: {
      title: 'Our Global Offices',
      offices: [
        {
          title: 'San Francisco',
          subtitle: '100 Main Street, CA 94105',
        },
        {
          title: 'New York',
          subtitle: '500 Broadway Street, NY 10012',
        },
        {
          title: 'London',
          subtitle: '123 King Street, EC2V 7EH',
        },
      ],
    },
  },
}

export const Default: Story = {
  args: defaultContact,
}

export const MinimalSupport: Story = {
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

export const SingleOffice: Story = {
  args: {
    contact: {
      ...defaultContact.contact,
      officeList: {
        title: 'Our Main Office',
        offices: defaultContact.contact.officeList?.offices?.[0]
          ? [
              {
                title: defaultContact.contact.officeList.offices[0].title,
                subtitle: defaultContact.contact.officeList.offices[0].subtitle,
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
      title: 'Need Help?',
      subtitle: 'Our team is ready to assist you',
      links: [
        {
          link: {
            type: 'custom',
            label: 'Start Live Chat',
            url: '#chat',
            appearance: 'secondary',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Schedule Call',
            url: '#call',
            appearance: 'outline',
          },
        },
      ],
      supportList: {
        supports: [
          {
            icon: 'LifeBuoy',
            title: 'Customer Support',
            subtitle: 'Get help with your account or product',
            link: {
              type: 'custom',
              label: 'Get Help',
              url: '#help',
              appearance: 'link',
            },
          },
          {
            icon: 'Building',
            title: 'Enterprise Solutions',
            subtitle: 'Custom solutions for large organizations',
            link: {
              type: 'custom',
              label: 'Learn More',
              url: '#enterprise',
              appearance: 'link',
            },
          },
        ],
      },
      officeList: defaultContact.contact.officeList,
    },
  },
}
