import type { Meta, StoryObj } from '@storybook/react'
import type { Contact4Fields } from '@/payload-types'
import Contact4 from './Component'

const meta: Meta<typeof Contact4> = {
  title: 'Blocks/Contact/Contact4',
  component: Contact4,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Contact4>

const defaultContact: Contact4Fields = {
  contact: {
    title: 'Get in touch with us',
    subtitle: 'Contact & Support',
    supportList: {
      supports: [
        {
          title: 'Sales Inquiries',
          subtitle: 'For questions about our products and pricing',
          link: {
            type: 'custom',
            label: 'Contact Sales',
            url: '#sales',
            appearance: 'link',
          },
        },
        {
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
          title: 'Media Relations',
          subtitle: 'Press and media related inquiries',
          link: {
            type: 'custom',
            label: 'Press Contact',
            url: '#press',
            appearance: 'link',
          },
        },
      ],
    },
    locationList: {
      locations: [
        {
          image: {
            id: '1',
            filename: 'sf-office.jpg',
            alt: 'San Francisco Office',
            url: '/website-template-OG.webp',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            mimeType: 'image/jpeg',
            filesize: 1024,
            width: 1920,
            height: 1080,
          },
          title: 'San Francisco',
          subtitle: '100 Market Street, Suite 300, San Francisco, CA 94105',
          link: {
            type: 'custom',
            label: 'See on Google Maps',
            url: '/website-template-OG.webp',
            appearance: 'link',
          },
        },
        {
          image: {
            id: '2',
            filename: 'ny-office.jpg',
            alt: 'New York Office',
            url: '/website-template-OG.webp',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            mimeType: 'image/jpeg',
            filesize: 1024,
            width: 1920,
            height: 1080,
          },
          title: 'New York',
          subtitle: '500 Broadway Street, New York, NY 10012',
          link: {
            type: 'custom',
            label: 'See on Google Maps',
            url: '#ny-map',
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

export const SingleLocation: Story = {
  args: {
    contact: {
      ...defaultContact.contact,
      locationList: {
        locations: defaultContact.contact.locationList?.locations?.[0]
          ? [
              {
                image: defaultContact.contact.locationList.locations[0].image,
                title: defaultContact.contact.locationList.locations[0].title,
                subtitle: defaultContact.contact.locationList.locations[0].subtitle,
                link: {
                  type: 'custom',
                  label: 'See on Google Maps',
                  url: '#sf-map',
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
      title: 'Contact Our Teams',
      subtitle: 'Were here to help',
      supportList: {
        supports: [
          {
            title: 'Enterprise Solutions',
            subtitle: 'For large organizations and business inquiries',
            link: {
              type: 'custom',
              label: 'Enterprise Contact',
              url: '#enterprise',
              appearance: 'link',
            },
          },
          {
            title: 'Customer Success',
            subtitle: 'Get help with your account or service',
            link: {
              type: 'custom',
              label: 'Contact Support',
              url: '#support',
              appearance: 'link',
            },
          },
        ],
      },
      locationList: {
        locations: defaultContact.contact.locationList?.locations || [],
      },
    },
  },
}
