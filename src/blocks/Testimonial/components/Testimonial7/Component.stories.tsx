import type { Meta, StoryObj } from '@storybook/react'
import Component from './Component'

const meta: Meta<typeof Component> = {
  title: 'Blocks/Testimonial/Testimonial7',
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
    hideAuthorImages: false,
    title: 'Meet Our Happy Clients',
    description: 'See what our clients have to say about their experience',
    cta: {
      type: 'custom',
      label: 'Get Started Today',
      url: '#',
      appearance: 'default',
    },
    testimonials: [
      {
        id: 'testimonial-1',
        quote:
          'The auto-scrolling feature is innovative and engaging. Great way to showcase testimonials.',
        authorName: 'Alex Johnson',
        authorRole: 'Marketing Director',
        authorImage: {
          id: 'avatar-1',
          alt: 'Alex Johnson',
          url: '/avatar-1.webp',
          width: 36,
          height: 36,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'testimonial-2',
        quote: 'Smooth and professional implementation. Really impressed with the results.',
        authorName: 'Maria Garcia',
        authorRole: 'Product Manager',
        authorImage: {
          id: 'avatar-1',
          alt: 'Maria Garcia',
          url: '/avatar-1.webp',
          width: 36,
          height: 36,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'testimonial-3',
        quote: 'The dual-carousel design is unique and effective. Great user experience.',
        authorName: 'James Wilson',
        authorRole: 'UX Designer',
        authorImage: {
          id: 'avatar-1',
          alt: 'James Wilson',
          url: '/avatar-1.webp',
          width: 36,
          height: 36,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      {
        id: 'testimonial-4',
        quote: 'Excellent service and outstanding results. Highly recommended!',
        authorName: 'Emily Chen',
        authorRole: 'CEO',
        authorImage: {
          id: 'avatar-1',
          alt: 'Emily Chen',
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
    title: 'Client Success Stories',
    description: 'Real feedback from real clients',
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
      {
        id: 'testimonial-4',
        quote: 'A reliable partner that delivers outstanding results every time.',
        authorName: 'Sophie Zhang',
        authorRole: 'Product Owner',
      },
    ],
  },
}

export const LongContent: Story = {
  args: {
    ...Default.args,
    title: 'Success Stories',
    description: 'What our clients are saying',
    testimonials: Array(8)
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
