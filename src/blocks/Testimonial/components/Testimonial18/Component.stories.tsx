import type { Meta, StoryObj } from '@storybook/react'
import type { Media } from '@/payload-types'
import Component from './Component'

const meta: Meta<typeof Component> = {
  title: 'Blocks/Testimonial/Testimonial18',
  component: Component,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Component>

const defaultTestimonial = {
  quote:
    'The platform has revolutionized how we handle our workflow. Efficiency increased by 200%!',
  description:
    "After implementing this solution, our team's productivity skyrocketed. The intuitive interface and powerful features have made our daily operations smoother than ever. The support team has been incredibly responsive, and the regular updates keep making the platform better and better.",
  authorName: 'Sarah Johnson',
  authorRole: 'CEO at TechCorp',
  authorImage: {
    id: 'avatar-1',
    alt: 'Sarah Johnson',
    url: '/avatar-1.webp',
    width: 400,
    height: 400,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    filename: 'avatar-1.webp',
    mimeType: 'image/webp',
  } satisfies Media,
  rating: 5,
}

export const Default: Story = {
  args: {
    heading: 'Meet our happy clients',
    subheading: 'Join a global network of thought leaders, product developers, and innovators',
    statsText: 'Rated 5 stars by 1000+ clients',
    testimonial: defaultTestimonial,
  },
}

export const WithoutImage: Story = {
  args: {
    ...Default.args,
    hideAuthorImages: true,
    testimonial: {
      ...defaultTestimonial,
    },
  },
}

export const WithLowerRating: Story = {
  args: {
    ...Default.args,
    testimonial: {
      ...defaultTestimonial,
      rating: 4,
    },
  },
}
