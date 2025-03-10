import type { Meta, StoryObj } from '@storybook/react'
import Component from './Component'

const meta: Meta<typeof Component> = {
  title: 'Blocks/Team/Team3',
  component: Component,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    team: {
      title: 'Meet Our Amazing Team',
      subtitle: 'The People Behind Our Success',
      description:
        'We are a group of passionate individuals dedicated to delivering exceptional results for our clients.',
      links: [
        {
          link: {
            type: 'custom',
            label: 'Join Our Team',
            url: 'https://example.com/careers',
            appearance: 'default',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'About Us',
            url: 'https://example.com/about',
            appearance: 'secondary',
          },
        },
      ],
      people: [
        {
          id: 'member-1',
          name: 'Sarah Johnson',
          role: 'CEO & Founder',
          description: 'Visionary leader with 15+ years of industry experience',
          avatar: {
            id: 'avatar-1',
            alt: 'Sarah Johnson',
            url: '/avatar-1.webp',
            width: 96,
            height: 96,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          links: [
            {
              link: {
                type: 'custom',
                url: 'https://twitter.com',
                appearance: 'link',
              },
            },
            {
              link: {
                type: 'custom',
                url: 'https://linkedin.com',
                appearance: 'link',
              },
            },
          ],
        },
        {
          id: 'member-2',
          name: 'Michael Chen',
          role: 'CTO',
          description: 'Tech innovator and strategic thinker',
          avatar: {
            id: 'avatar-2',
            alt: 'Michael Chen',
            url: '/avatar-1.webp',
            width: 96,
            height: 96,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          links: [
            {
              link: {
                type: 'custom',
                url: 'https://github.com',
                appearance: 'link',
              },
            },
          ],
        },
        {
          id: 'member-3',
          name: 'Emily Rodriguez',
          role: 'Design Director',
          description: 'Creative force behind our visual identity',
          avatar: {
            id: 'avatar-3',
            alt: 'Emily Rodriguez',
            url: '/avatar-1.webp',
            width: 96,
            height: 96,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          links: [
            {
              link: {
                type: 'custom',
                url: 'https://dribbble.com',
                appearance: 'link',
              },
            },
          ],
        },
        {
          id: 'member-4',
          name: 'David Kim',
          role: 'Lead Developer',
          description: 'Full-stack expert and problem solver',
          avatar: {
            id: 'avatar-4',
            alt: 'David Kim',
            url: '/avatar-1.webp',
            width: 96,
            height: 96,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          links: [
            {
              link: {
                type: 'custom',
                url: 'https://github.com',
                appearance: 'link',
              },
            },
          ],
        },
      ],
    },
  },
}

export const Minimal: Story = {
  args: {
    team: {
      title: 'Our Team',
      subtitle: 'Core Members',
      description: 'Meet the talented individuals who make it all happen.',
      links: [
        {
          link: {
            label: 'Join Our Team',
            type: 'custom',
            url: 'https://example.com/join-us',
            appearance: 'default',
          },
        },
      ],
      people: [
        {
          id: 'member-1',
          name: 'Alex Turner',
          role: 'Product Manager',
          description: 'Product strategy and execution expert',
          avatar: {
            id: 'avatar-1',
            alt: 'Alex Turner',
            url: '/avatar-1.webp',
            width: 96,
            height: 96,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          links: [],
        },
        {
          id: 'member-2',
          name: 'Lisa Wang',
          role: 'UX Designer',
          description: 'User experience and interface specialist',
          avatar: {
            id: 'avatar-2',
            alt: 'Lisa Wang',
            url: '/avatar-1.webp',
            width: 96,
            height: 96,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          links: [],
        },
      ],
    },
  },
}
