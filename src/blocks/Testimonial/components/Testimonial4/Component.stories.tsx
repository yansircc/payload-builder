import type { Meta, StoryObj } from '@storybook/react'
import Component from './Component'

const meta: Meta<typeof Component> = {
  title: 'Blocks/Testimonial/Testimonial4',
  component: Component,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    hideAuthorImages: false,
    featuredImage: {
      id: 'featured-1',
      alt: 'Office Environment',
      url: '/website-template-OG.webp',
      width: 1200,
      height: 800,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    testimonials: [
      {
        id: 'testimonial-1',
        quote:
          'Working with this team has been an absolute game-changer for our business. Their innovative solutions and dedication to excellence have helped us achieve remarkable results.',
        authorName: 'Jennifer Smith',
        authorRole: 'CEO at TechCorp',
        authorImage: {
          id: 'avatar-1',
          alt: 'Jennifer Smith',
          url: '/avatar-1.webp',
          width: 36,
          height: 36,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'testimonial-2',
        quote:
          'The attention to detail and level of professionalism is unmatched. They truly understand our needs and deliver beyond expectations.',
        authorName: 'Robert Chen',
        authorRole: 'Product Director',
        authorImage: {
          id: 'avatar-2',
          alt: 'Robert Chen',
          url: '/avatar-1.webp',
          width: 36,
          height: 36,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'testimonial-3',
        quote:
          'Outstanding service and incredible results. The team is responsive, creative, and always delivers on time.',
        authorName: 'Sarah Johnson',
        authorRole: 'Marketing Manager',
        authorImage: {
          id: 'avatar-3',
          alt: 'Sarah Johnson',
          url: '/avatar-1.webp',
          width: 36,
          height: 36,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'testimonial-4',
        quote:
          'Their expertise and dedication have been instrumental in our success. Highly recommended!',
        authorName: 'Michael Lee',
        authorRole: 'Operations Director',
        authorImage: {
          id: 'avatar-4',
          alt: 'Michael Lee',
          url: '/avatar-1.webp',
          width: 36,
          height: 36,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    ],
  },
}

export const WithoutAuthorImages: Story = {
  args: {
    ...Default.args,
    hideAuthorImages: true,
  },
}
