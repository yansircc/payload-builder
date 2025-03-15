import type { Meta, StoryObj } from '@storybook/react'
import type { Media, Testimonial14Fields } from '@/payload-types'
import Component from './Component'

const meta: Meta<typeof Component> = {
  title: 'Blocks/Testimonial/Testimonial14',
  component: Component,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Component>

type TestimonialItem = NonNullable<Testimonial14Fields['testimonials']>[number]

const testimonialWithRating: TestimonialItem = {
  quote:
    'The platform has completely transformed our customer experience. The intuitive interface and powerful features have made our website stand out in the market.',
  authorName: 'Emily Chen',
  authorRole: 'Product Manager',
  authorImage: {
    id: 'avatar-1',
    alt: 'Emily Chen',
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

const defaultTestimonials: TestimonialItem[] = [
  testimonialWithRating,
  {
    quote:
      "We've seen a significant increase in user engagement since implementing this solution. The customization options are exactly what we needed.",
    authorName: 'James Wilson',
    authorRole: 'Director of UX',
    authorImage: {
      id: 'avatar-1',
      alt: 'James Wilson',
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
    quote:
      'The support team has been exceptional. They helped us implement complex features with ease and provided timely solutions.',
    authorName: 'Sarah Martinez',
    authorRole: 'Technical Lead',
    authorImage: {
      id: 'avatar-3',
      alt: 'Sarah Martinez',
      url: '/avatar-1.webp',
      width: 400,
      height: 400,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filename: 'avatar-3.webp',
      mimeType: 'image/webp',
    } satisfies Media,
    rating: 4,
  },
]

export const Default: Story = {
  args: {
    testimonials: defaultTestimonials,
  },
}

export const SingleTestimonial: Story = {
  args: {
    testimonials: [testimonialWithRating],
  },
}

export const WithoutImage: Story = {
  args: {
    hideAuthorImages: true,
    testimonials: [
      {
        ...testimonialWithRating,
        authorImage: undefined,
        rating: 5,
      },
    ],
  },
}

export const WithoutRating: Story = {
  args: {
    testimonials: [
      {
        ...testimonialWithRating,
        rating: undefined,
      },
    ],
  },
}
