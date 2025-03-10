import type { Meta, StoryObj } from '@storybook/react'
import type { Media, Testimonial12Fields } from '@/payload-types'
import Component from './Component'

const meta: Meta<typeof Component> = {
  title: 'Blocks/Testimonial/Testimonial12',
  component: Component,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Component>

type TestimonialItem = NonNullable<Testimonial12Fields['testimonials']>[number]

const singleTestimonial: TestimonialItem = {
  quote:
    'Implementing this solution has revolutionized our workflow. The efficiency gains and user satisfaction have exceeded our expectations by a significant margin.',
  authorName: 'Sarah Johnson',
  authorRole: 'Chief Technology Officer',
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
  companyName: 'TechCorp Solutions',
  companyLogo: {
    id: 'logo-1',
    alt: 'TechCorp Logo',
    url: '/website-template-OG.webp',
    width: 200,
    height: 80,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    filename: 'company-logo-1.webp',
    mimeType: 'image/webp',
  } satisfies Media,
  monthlyActiveUsers: '2.4x',
  monthlyActiveUsersLabel: 'Monthly Active Users',
  monthlyActiveUsersPeriod: 'Since last quarter',
  revenueIncrease: '185%',
  revenueIncreaseLabel: 'Revenue Growth',
  revenueIncreasePeriod: 'Year over year',
}

const defaultTestimonials: TestimonialItem[] = [
  singleTestimonial,
  {
    quote:
      "The platform's scalability and robust feature set have been instrumental in our digital transformation journey.",
    authorName: 'Michael Chen',
    authorRole: 'VP of Engineering',
    authorImage: {
      id: 'avatar-2',
      alt: 'Michael Chen',
      url: '/avatar-1.webp',
      width: 400,
      height: 400,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filename: 'avatar-1.webp',
      mimeType: 'image/webp',
    } satisfies Media,
    companyName: 'InnovateLabs',
    companyLogo: {
      id: 'logo-2',
      alt: 'InnovateLabs Logo',
      url: '/website-template-OG.webp',
      width: 200,
      height: 80,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      filename: 'company-logo-2.webp',
      mimeType: 'image/webp',
    } satisfies Media,
    monthlyActiveUsers: '3.2x',
    monthlyActiveUsersLabel: 'User Engagement',
    monthlyActiveUsersPeriod: 'Month over month',
    revenueIncrease: '220%',
    revenueIncreaseLabel: 'Revenue Increase',
    revenueIncreasePeriod: 'Since implementation',
  },
]

export const Default: Story = {
  args: {
    testimonials: defaultTestimonials,
  },
}

export const SingleTestimonial: Story = {
  args: {
    testimonials: [singleTestimonial],
  },
}

export const WithoutImages: Story = {
  args: {
    testimonials: [
      {
        ...singleTestimonial,
        authorImage: null,
        companyLogo: null as unknown as Media,
      },
    ],
  },
}
