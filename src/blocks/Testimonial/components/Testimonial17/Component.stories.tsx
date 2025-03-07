import type { Meta, StoryObj } from '@storybook/react'
import type { Media, Testimonial17Fields } from '@/payload-types'
import Component from './Component'

const meta: Meta<typeof Component> = {
  title: 'Blocks/Testimonial/Testimonial17',
  component: Component,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Component>

type TestimonialItem = NonNullable<Testimonial17Fields['testimonials']>[number]

const defaultTestimonials: TestimonialItem[] = [
  {
    logo: {
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
    logoAlt: 'Company 1 Logo',
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
  },
  {
    logo: {
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
    logoAlt: 'Company 2 Logo',
    quote: 'Outstanding support and incredible features. Best decision we made this year!',
    authorName: 'Michael Chen',
    authorRole: 'CTO at InnovateCo',
    authorImage: {
      id: 'avatar-1',
      alt: 'Michael Chen',
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
    logo: {
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
    logoAlt: 'Company 3 Logo',
    quote: 'The integration was seamless and the results were immediate. Highly recommended!',
    authorName: 'Emily Rodriguez',
    authorRole: 'Head of Operations at GlobalTech',
    authorImage: {
      id: 'avatar-1',
      alt: 'Emily Rodriguez',
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

export const Default: Story = {
  args: {
    heading: 'Teams are thriving with our platform',
    testimonials: defaultTestimonials,
  },
}

export const WithoutImages: Story = {
  args: {
    ...Default.args,
    hideAuthorImages: true,
  },
}

export const SingleTestimonial: Story = {
  args: {
    ...Default.args,
    testimonials: [defaultTestimonials[0]] as TestimonialItem[],
  },
}
