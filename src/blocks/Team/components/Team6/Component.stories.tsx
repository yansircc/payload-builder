import type { Meta, StoryObj } from '@storybook/react'
import Component from './Component'

const meta: Meta<typeof Component> = {
  title: 'Blocks/Team/Team6',
  component: Component,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Component>

const defaultAvatar = {
  id: 'avatar-1',
  alt: 'Team Member',
  url: '/avatar-1.webp',
  width: 400,
  height: 400,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  filename: 'avatar-1.webp',
  mimeType: 'image/webp',
}

export const Default: Story = {
  args: {
    team: {
      title: 'Leadership Team',
      subtitle: 'Meet Our Experts',
      description:
        'Our leadership team brings together diverse expertise and proven track records of success.',
      people: [
        {
          id: 'member-1',
          name: 'Alexandra Chen',
          role: 'Chief Technology Officer',
          description:
            'With over 15 years of experience in software architecture and development, Alexandra leads our technical strategy and innovation initiatives.',
          avatar: defaultAvatar,
          links: [
            {
              link: {
                type: 'custom',
                url: 'https://linkedin.com',
                appearance: 'link',
              },
            },
            {
              link: {
                type: 'custom',
                url: 'https://twitter.com',
                appearance: 'link',
              },
            },
          ],
        },
        {
          id: 'member-2',
          name: 'Marcus Rodriguez',
          role: 'Head of Design',
          description:
            'Marcus brings creative vision and user-centered design principles to every project, ensuring exceptional user experiences.',
          avatar: defaultAvatar,
          links: [
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
          id: 'member-3',
          name: 'Sarah Kim',
          role: 'Product Director',
          description:
            'Sarah excels at translating business requirements into successful product strategies and roadmaps.',
          avatar: defaultAvatar,
          links: [
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
          id: 'member-4',
          name: 'David Foster',
          role: 'Marketing Lead',
          description:
            'David drives our marketing initiatives with data-driven strategies and creative campaigns.',
          avatar: defaultAvatar,
          links: [
            {
              link: {
                type: 'custom',
                url: 'https://linkedin.com',
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
      subtitle: 'The People',
      description: 'Meet the talented individuals who make it all possible.',
      people: [
        {
          id: 'member-1',
          name: 'Emily Watson',
          role: 'Senior Developer',
          description: 'Full-stack developer specializing in React and Node.js applications.',
          avatar: defaultAvatar,
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
          id: 'member-2',
          name: 'Tom Chen',
          role: 'UI Designer',
          description: 'Creating beautiful and intuitive interfaces that users love.',
          avatar: defaultAvatar,
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
      ],
    },
  },
}
