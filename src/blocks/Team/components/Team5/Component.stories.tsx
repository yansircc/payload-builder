import type { Meta, StoryObj } from '@storybook/react'
import Component from './Component'

const meta: Meta<typeof Component> = {
  title: 'Blocks/Team/Team5',
  component: Component,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    team: {
      title: 'Meet Our Leadership Team',
      subtitle: 'The Innovators',
      description:
        'Get to know the talented individuals who drive our success and innovation forward.',
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
            label: 'Learn More',
            url: 'https://example.com/about',
            appearance: 'secondary',
          },
        },
      ],
      people: [
        {
          id: 'member-1',
          name: 'Emma Thompson',
          role: 'Chief Executive Officer',
          description: 'Strategic visionary with a passion for innovation and growth.',
          avatar: {
            id: 'avatar-1',
            alt: 'Emma Thompson',
            url: '/avatar-1.webp',
            width: 400,
            height: 400,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            filename: 'avatar-1.webp',
            mimeType: 'image/webp',
          },
        },
        {
          id: 'member-2',
          name: 'James Wilson',
          role: 'Head of Design',
          description: 'Creative leader specializing in user-centered design solutions.',
          avatar: {
            id: 'avatar-1',
            alt: 'James Wilson',
            url: '/avatar-1.webp',
            width: 400,
            height: 400,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            filename: 'avatar-1.webp',
            mimeType: 'image/webp',
          },
        },
        {
          id: 'member-3',
          name: 'Sofia Martinez',
          role: 'Technical Director',
          description: 'Technology expert driving our technical innovation and excellence.',
          avatar: {
            id: 'avatar-1',
            alt: 'Sofia Martinez',
            url: '/avatar-1.webp',
            width: 400,
            height: 400,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            filename: 'avatar-1.webp',
            mimeType: 'image/webp',
          },
        },
        {
          id: 'member-1',
          name: 'Daniel Lee',
          role: 'Product Manager',
          description: 'Product strategist focused on delivering exceptional user experiences.',
          avatar: {
            id: 'avatar-1',
            alt: 'Daniel Lee',
            url: '/avatar-1.webp',
            width: 400,
            height: 400,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            filename: 'avatar-1.webp',
            mimeType: 'image/webp',
          },
        },
      ],
    },
  },
}

export const Minimal: Story = {
  args: {
    team: {
      title: 'Our Team',
      subtitle: 'Meet the Team',
      description: 'The talented individuals behind our success.',
      links: [
        {
          link: {
            type: 'custom',
            label: 'Join Us',
            url: 'https://example.com/careers',
            appearance: 'default',
          },
        },
      ],
      people: [
        {
          id: 'member-1',
          name: 'Sarah Chen',
          role: 'Lead Developer',
          description: 'Full-stack developer with expertise in modern web technologies.',
          avatar: {
            id: 'avatar-1',
            alt: 'Sarah Chen',
            url: '/avatar-1.webp',
            width: 400,
            height: 400,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            filename: 'avatar-1.webp',
            mimeType: 'image/webp',
          },
        },
        {
          id: 'member-1',
          name: 'Michael Park',
          role: 'UX Designer',
          description: 'Creating intuitive and engaging user experiences.',
          avatar: {
            id: 'avatar-1',
            alt: 'Michael Park',
            url: '/avatar-1.webp',
            width: 400,
            height: 400,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            filename: 'avatar-1.webp',
            mimeType: 'image/webp',
          },
        },
      ],
    },
  },
}
