import type { Meta, StoryObj } from '@storybook/react'
import type { Media, Testimonial19Fields } from '@/payload-types'
import Component from './Component'

const meta: Meta<typeof Component> = {
  title: 'Blocks/Testimonial/Testimonial19',
  component: Component,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Component>

type TestimonialItem = NonNullable<Testimonial19Fields['testimonials']>[number]

const defaultTestimonials: TestimonialItem[] = [
  {
    quote:
      'The platform has revolutionized how we handle our workflow. Efficiency increased by 200%!',
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
  },
  {
    quote: 'Outstanding support and incredible features. Best decision we made this year!',
    authorName: 'Michael Chen',
    authorRole: 'CTO at InnovateCo',
    authorImage: {
      id: 'avatar-2',
      alt: 'Michael Chen',
      url: '/avatar-1.webp',
      width: 400,
      height: 400,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filename: 'avatar-2.webp',
      mimeType: 'image/webp',
    } satisfies Media,
    rating: 5,
  },
  {
    quote: 'The integration was seamless and the results were immediate. Highly recommended!',
    authorName: 'Emily Rodriguez',
    authorRole: 'Head of Operations at GlobalTech',
    authorImage: {
      id: 'avatar-3',
      alt: 'Emily Rodriguez',
      url: '/avatar-1.webp',
      width: 400,
      height: 400,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filename: 'avatar-3.webp',
      mimeType: 'image/webp',
    } satisfies Media,
    rating: 5,
  },
]

export const Default: Story = {
  args: {
    heading: 'Meet our happy clients',
    subheading: 'Join a global network of thought leaders, product developers, and innovators',
    statsText: 'Rated 5 stars by 1000+ clients',
    testimonials: defaultTestimonials,
    viewAll: {
      label: 'View all testimonials',
      suffixIcon: 'ChevronRight',
      appearance: 'link',
    },
  },
}

export const WithoutImages: Story = {
  args: {
    ...Default.args,
    hideAuthorImages: true,
  },
}

export const WithLowerRating: Story = {
  args: {
    ...Default.args,
    testimonials: defaultTestimonials.map((testimonial) => ({
      ...testimonial,
      rating: 4,
    })),
  },
}
