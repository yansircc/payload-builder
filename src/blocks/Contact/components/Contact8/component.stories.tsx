import type { Meta, StoryObj } from '@storybook/react'
import type { Contact8Fields } from '@/payload-types'
import Contact8 from './Component'

const meta: Meta<typeof Contact8> = {
  title: 'Blocks/Contact/Contact8',
  component: Contact8,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Contact8>

const defaultContact: Contact8Fields = {
  contact: {
    title: 'Contact Us',
    subtitle: 'Get in touch with our team',
    image: {
      id: '1',
      filename: 'contact-image.jpg',
      alt: 'Contact Image',
      url: '/website-template-OG.webp',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      mimeType: 'image/webp',
      filesize: 1024,
      width: 1920,
      height: 1080,
    },
    supportList: {
      title: 'Support Options',
      supports: [
        {
          link: {
            type: 'custom',
            label: 'Technical Support',
            url: '#support',
            appearance: 'link',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Sales Inquiries',
            url: '#sales',
            appearance: 'link',
          },
        },
      ],
    },
    officeList: {
      title: 'Our Offices',
      offices: [
        {
          title: 'San Francisco',
          subtitle: '100 Market Street, Suite 300, CA 94105',
        },
        {
          title: 'New York',
          subtitle: '500 Broadway Street, NY 10012',
        },
      ],
    },
  },
}

export const Default: Story = {
  args: defaultContact,
}

export const SingleOffice: Story = {
  args: {
    contact: {
      ...defaultContact.contact,
      officeList: {
        title: 'Main Office',
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
      title: 'Get in Touch',
      subtitle: 'We had love to hear from you',
      image: {
        id: '2',
        filename: 'custom-contact.jpg',
        alt: 'Custom Contact Image',
        url: '/website-template-OG.webp',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        mimeType: 'image/webp',
        filesize: 1024,
        width: 1920,
        height: 1080,
      },
      supportList: {
        title: 'How Can We Help?',
        supports: [
          {
            link: {
              type: 'custom',
              label: 'Customer Support',
              url: '#customer-support',
              appearance: 'link',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Enterprise Solutions',
              url: '#enterprise',
              appearance: 'link',
            },
          },
        ],
      },
      officeList: {
        title: 'Global Locations',
        offices: [
          {
            title: 'London',
            subtitle: '123 King Street, EC2V 7EH',
          },
          {
            title: 'Singapore',
            subtitle: '50 Raffles Place, 048623',
          },
        ],
      },
    },
  },
}
