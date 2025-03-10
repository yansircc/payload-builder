import type { Meta, StoryObj } from '@storybook/react'
import type { Media, Testimonial15Fields } from '@/payload-types'
import Component from './Component'

const meta: Meta<typeof Component> = {
  title: 'Blocks/Testimonial/Testimonial15',
  component: Component,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Component>

const defaultTestimonials = [
  {
    quote: 'The platform has exceeded our expectations in every way. Highly recommended!',
    authorName: 'Alex Thompson',
    authorImage: {
      id: 'avatar-1',
      alt: 'Alex Thompson',
      url: '/avatar-1.webp',
      width: 400,
      height: 400,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filename: 'avatar-1.webp',
      mimeType: 'image/webp',
    } satisfies Media,
  },
  {
    quote: 'Incredible user experience and outstanding support team.',
    authorName: 'Maria Garcia',
    authorImage: {
      id: 'avatar-1',
      alt: 'Maria Garcia',
      url: '/avatar-1.webp',
      width: 400,
      height: 400,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filename: 'avatar-1.webp',
      mimeType: 'image/webp',
    } satisfies Media,
  },
  {
    quote: 'Game-changing features that have transformed our workflow.',
    authorName: 'David Kim',
    authorImage: {
      id: 'avatar-1',
      alt: 'David Kim',
      url: '/avatar-1.webp',
      width: 400,
      height: 400,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filename: 'avatar-1.webp',
      mimeType: 'image/webp',
    } satisfies Media,
  },
  {
    quote: "Best investment we've made for our business this year.",
    authorName: 'Emma Wilson',
    authorImage: {
      id: 'avatar-1',
      alt: 'Emma Wilson',
      url: '/avatar-1.webp',
      width: 400,
      height: 400,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filename: 'avatar-1.webp',
      mimeType: 'image/webp',
    } satisfies Media,
  },
]

const companyLogos = [
  {
    image: {
      id: 'logo-1',
      alt: 'Company 1',
      url: '/website-template-OG.webp',
      width: 160,
      height: 40,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filename: 'company-1.webp',
      mimeType: 'image/webp',
    } satisfies Media,
  },
  {
    image: {
      id: 'logo-2',
      alt: 'Company 2',
      url: '/website-template-OG.webp',
      width: 160,
      height: 40,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filename: 'company-2.webp',
      mimeType: 'image/webp',
    } satisfies Media,
  },
  {
    image: {
      id: 'logo-3',
      alt: 'Company 3',
      url: '/website-template-OG.webp',
      width: 160,
      height: 40,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filename: 'company-3.webp',
      mimeType: 'image/webp',
    } satisfies Media,
  },
]

export const Default: Story = {
  args: {
    title: 'Explore the Innovators Community Today',
    description:
      'Join a global network of thought leaders, product developers, and innovators to exchange ideas, learn from each other, and participate in unique events and discussions.',
    cta: {
      type: 'custom',
      label: 'Become a Member',
      url: '#',
      appearance: 'default',
    },
    companySection: {
      text: 'Used by leading companies',
      logos: companyLogos,
    },
    testimonials: defaultTestimonials,
  },
}

export const WithoutImages: Story = {
  args: {
    ...Default.args,
    testimonials: defaultTestimonials.map((testimonial) => ({
      ...testimonial,
      authorImage: undefined,
    })),
  },
}

export const WithoutCompanyLogos: Story = {
  args: {
    ...Default.args,
    companySection: {
      text: 'Used by leading companies',
      logos: [],
    },
  },
}

export const WithoutCTA: Story = {
  args: {
    ...Default.args,
    cta: undefined,
  },
}
