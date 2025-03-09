import type { Meta, StoryObj } from '@storybook/react'
import Component from './Component'

const meta: Meta<typeof Component> = {
  title: 'Blocks/Testimonial/Testimonial6',
  component: Component,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    title: 'What Our Clients Say',
    testimonials: [
      {
        id: 'testimonial-1',
        quote:
          'The carousel feature makes it easy to browse through different testimonials. The design is clean and professional.',
        authorName: 'Emma Watson',
        authorRole: 'Product Manager',
        authorImage: {
          id: 'avatar-1',
          alt: 'Emma Watson',
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
          'Exceptional service quality and attention to detail. The team goes above and beyond.',
        authorName: 'John Smith',
        authorRole: 'CEO at TechStart',
        authorImage: {
          id: 'avatar-1',
          alt: 'John Smith',
          url: '/avatar-1.webp',
          width: 36,
          height: 36,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'testimonial-3',
        quote: 'The carousel navigation is smooth and intuitive. Great user experience overall.',
        authorName: 'Sarah Chen',
        authorRole: 'UX Designer',
        authorImage: {
          id: 'avatar-1',
          alt: 'Sarah Chen',
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
    hideAuthorImages: true,
    title: 'Client Testimonials',
    testimonials: [
      {
        id: 'testimonial-1',
        quote: 'Outstanding support and excellent communication throughout the project.',
        authorName: 'Michael Brown',
        authorRole: 'Marketing Director',
      },
      {
        id: 'testimonial-2',
        quote: 'The results exceeded our expectations. Highly recommended!',
        authorName: 'Lisa Anderson',
        authorRole: 'Project Lead',
      },
      {
        id: 'testimonial-3',
        quote: 'Professional team that delivers quality work consistently.',
        authorName: 'David Wilson',
        authorRole: 'Operations Manager',
      },
    ],
  },
}

export const LongContent: Story = {
  args: {
    title: 'Success Stories',
    testimonials: Array(6)
      .fill(null)
      .map((_, index) => ({
        id: `testimonial-${index + 1}`,
        quote:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        authorName: `Test User ${index + 1}`,
        authorRole: 'Client',
      })),
  },
}
