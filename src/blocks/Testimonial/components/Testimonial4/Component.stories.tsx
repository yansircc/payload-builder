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
          'The impact on our business has been transformative. Their solutions are innovative and effective.',
        authorName: 'David Wilson',
        authorRole: 'CTO',
      },
      {
        id: 'testimonial-2',
        quote: 'Exceptional service and remarkable attention to detail. A truly professional team.',
        authorName: 'Emma Thompson',
        authorRole: 'Design Lead',
      },
      {
        id: 'testimonial-3',
        quote: 'They consistently exceed our expectations with their quality of work.',
        authorName: 'James Rodriguez',
        authorRole: 'Project Manager',
      },
      {
        id: 'testimonial-4',
        quote: 'A reliable partner that delivers outstanding results every time.',
        authorName: 'Lisa Chen',
        authorRole: 'Product Owner',
      },
    ],
  },
}
